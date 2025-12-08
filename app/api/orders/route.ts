import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';

// GET all orders
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const type = searchParams.get('type');
        const limit = parseInt(searchParams.get('limit') || '50');

        const orders = await prisma.order.findMany({
            where: {
                ...(status && { status: status as any }),
                ...(type && { type: type as any }),
            },
            orderBy: { createdAt: 'desc' },
            take: limit,
        });

        return NextResponse.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }
}

// POST create new order
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const order = await prisma.order.create({
            data: {
                customer: body.customer,
                items: body.items,
                total: body.total,
                status: body.status || 'Pending',
                type: body.type || 'DineIn',
                table: body.table,
                userId: body.userId,
                mobile: body.mobile,
                paymentStatus: body.paymentStatus || 'Unpaid',
                paymentMethod: body.paymentMethod,
                discount: body.discount,
                tip: body.tip,
                waiterName: body.waiterName,
                dietary: body.dietary || [],
                trainDetails: body.trainDetails,
            },
        });

        return NextResponse.json(order, { status: 201 });
    } catch (error) {
        console.error('Error creating order:', error);
        return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }
}
