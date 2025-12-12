
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { auth } from '@/auth';
import { cookies } from 'next/headers';

const CART_SESSION_COOKIE = 'cart-session';

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json(); // { quantity }
        const session = await auth();
        const cookieStore = await cookies();

        let userId = session?.user?.id;
        let sessionToken = cookieStore.get(CART_SESSION_COOKIE)?.value;

        // Verify ownership
        const cartItem = await prisma.cartItem.findUnique({
            where: { id },
            include: { cart: true }
        });

        if (!cartItem) return NextResponse.json({ error: 'Item not found' }, { status: 404 });

        // Check ownership
        if (cartItem.cart.userId !== userId && (!sessionToken || cartItem.cart.sessionToken !== sessionToken)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        if (body.quantity < 1) {
            await prisma.cartItem.delete({ where: { id } });
        } else {
            await prisma.cartItem.update({
                where: { id },
                data: { quantity: body.quantity }
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await auth();
        const cookieStore = await cookies();

        let userId = session?.user?.id;
        let sessionToken = cookieStore.get(CART_SESSION_COOKIE)?.value;

        const cartItem = await prisma.cartItem.findUnique({
            where: { id },
            include: { cart: true }
        });

        if (!cartItem) return NextResponse.json({ error: 'Item not found' }, { status: 404 });

        // Check ownership
        if (cartItem.cart.userId !== userId && (!sessionToken || cartItem.cart.sessionToken !== sessionToken)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        await prisma.cartItem.delete({ where: { id } });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
    }
}
