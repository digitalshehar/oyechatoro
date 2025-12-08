import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';

// GET single order
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const order = await prisma.order.findUnique({
            where: { id: parseInt(id) },
        });

        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 });
    }
}

// PATCH update order status
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        const order = await prisma.order.update({
            where: { id: parseInt(id) },
            data: {
                ...(body.status && { status: body.status }),
                ...(body.paymentStatus && { paymentStatus: body.paymentStatus }),
                ...(body.paymentMethod && { paymentMethod: body.paymentMethod }),
                ...(body.waiterCalled !== undefined && { waiterCalled: body.waiterCalled }),
                ...(body.cookingStartedAt && { cookingStartedAt: new Date(body.cookingStartedAt) }),
            },
        });

        return NextResponse.json(order);
    } catch (error) {
        console.error('Error updating order:', error);
        return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    }
}

// DELETE order
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.order.delete({
            where: { id: parseInt(id) },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting order:', error);
        return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 });
    }
}
