import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { auth } from '@/auth';
import { logAudit } from '@/app/lib/audit';

// GET all customers - Protected
export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search');
        const limit = parseInt(searchParams.get('limit') || '100');

        // Data Isolation: Filter customers who have ordered from this store
        const storeId = (session.user as any).storeId;
        const where: any = {};

        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { phone: { contains: search } },
            ];
        }

        if (storeId) {
            where.orders = {
                some: { storeId: storeId } // Only customers who have ordered from this store
            };
        }

        const customers = await prisma.customer.findMany({
            where,
            orderBy: { lastVisit: 'desc' },
            take: limit,
        });

        return NextResponse.json(customers);
    } catch (error: any) {
        console.error('Error fetching customers:', error);
        console.error('Debug Info:', { storeId: (request as any).headers?.get('storeId') }); // Just hypothetical
        return NextResponse.json({ error: error.message || 'Failed to fetch customers', details: error }, { status: 500 });
    }
}

// POST create/update customer - Protected
export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();

        // Upsert - create or update based on phone
        const customer = await prisma.customer.upsert({
            where: { phone: body.phone },
            update: {
                name: body.name,
                email: body.email,
                totalOrders: { increment: body.orderTotal ? 1 : 0 },
                totalSpent: { increment: body.orderTotal || 0 },
                loyaltyPoints: { increment: Math.floor((body.orderTotal || 0) / 100) },
                lastVisit: new Date(),
            },
            create: {
                name: body.name,
                phone: body.phone,
                email: body.email,
                totalOrders: 1,
                totalSpent: body.orderTotal || 0,
                loyaltyPoints: Math.floor((body.orderTotal || 0) / 100),
            },
        });

        await logAudit('UPDATE_CUSTOMER', 'Customer', customer.id, { name: customer.name, phone: customer.phone });

        return NextResponse.json(customer, { status: 201 });
    } catch (error) {
        console.error('Error creating customer:', error);
        return NextResponse.json({ error: 'Failed to create customer' }, { status: 500 });
    }
}
