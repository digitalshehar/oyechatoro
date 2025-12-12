import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { auth } from '@/auth';

// GET all purchase orders
export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const supplierId = searchParams.get('supplierId');
        const status = searchParams.get('status');

        const where: any = {};
        if (supplierId) where.supplierId = supplierId;
        if (status) where.status = status;

        const orders = await prisma.purchaseOrder.findMany({
            where,
            include: {
                supplier: { select: { name: true, phone: true } }
            },
            orderBy: { orderDate: 'desc' }
        });

        return NextResponse.json(orders);
    } catch (error) {
        console.error('Error fetching purchase orders:', error);
        return NextResponse.json({ error: 'Failed to fetch purchase orders' }, { status: 500 });
    }
}

// POST create purchase order
export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { supplierId, items, totalAmount, deliveryDate, notes } = body;

        if (!supplierId || !items || !totalAmount) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const order = await prisma.purchaseOrder.create({
            data: {
                supplierId,
                items,
                totalAmount,
                deliveryDate: deliveryDate ? new Date(deliveryDate) : null,
                notes
            },
            include: {
                supplier: { select: { name: true } }
            }
        });

        return NextResponse.json(order, { status: 201 });
    } catch (error) {
        console.error('Error creating purchase order:', error);
        return NextResponse.json({ error: 'Failed to create purchase order' }, { status: 500 });
    }
}
