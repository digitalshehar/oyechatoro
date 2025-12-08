import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';

// GET all customers
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search');
        const limit = parseInt(searchParams.get('limit') || '100');

        const customers = await prisma.customer.findMany({
            where: search ? {
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { phone: { contains: search } },
                ],
            } : undefined,
            orderBy: { lastVisit: 'desc' },
            take: limit,
        });

        return NextResponse.json(customers);
    } catch (error) {
        console.error('Error fetching customers:', error);
        return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 });
    }
}

// POST create/update customer
export async function POST(request: NextRequest) {
    try {
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

        return NextResponse.json(customer, { status: 201 });
    } catch (error) {
        console.error('Error creating customer:', error);
        return NextResponse.json({ error: 'Failed to create customer' }, { status: 500 });
    }
}
