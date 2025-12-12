
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { auth } from '@/auth';
import { cookies } from 'next/headers';
import crypto from 'crypto';

const CART_SESSION_COOKIE = 'cart-session';

async function getCartId() {
    const session = await auth();
    const cookieStore = await cookies();

    if (session?.user?.id) {
        return { userId: session.user.id };
    }

    let sessionToken = cookieStore.get(CART_SESSION_COOKIE)?.value;
    if (!sessionToken) {
        sessionToken = crypto.randomUUID();
        // Determine how to set cookie - usually in response
    }
    return { sessionToken, isNew: !cookieStore.get(CART_SESSION_COOKIE) };
}

export async function GET(request: NextRequest) {
    const session = await auth();
    const cookieStore = await cookies();

    let userId = session?.user?.id;
    let sessionToken = cookieStore.get(CART_SESSION_COOKIE)?.value;

    if (!userId && !sessionToken) {
        return NextResponse.json({ items: [] });
    }

    const cart = await prisma.cart.findFirst({
        where: userId ? { userId } : { sessionToken },
        include: { items: { include: { menuItem: true } } }
    });

    return NextResponse.json(cart || { items: [] });
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json(); // { menuItemId, quantity, options }
        const session = await auth();
        const cookieStore = await cookies();

        let userId = session?.user?.id;
        let sessionToken = cookieStore.get(CART_SESSION_COOKIE)?.value;
        let setCookie = false;

        if (!userId && !sessionToken) {
            sessionToken = crypto.randomUUID();
            setCookie = true;
        }

        // Find or Create Cart
        let cart = await prisma.cart.findFirst({
            where: userId ? { userId } : { sessionToken }
        });

        if (!cart) {
            cart = await prisma.cart.create({
                data: userId ? { userId } : { sessionToken: sessionToken! }
            });
        }

        // Check if item exists
        const existingItem = await prisma.cartItem.findFirst({
            where: {
                cartId: cart.id,
                menuItemId: body.menuItemId,
                // Simplify: we ignore options matching for now or need deep compare
            }
        });

        // Fetch MenuItem for name/price
        const menuItem = await prisma.menuItem.findUnique({
            where: { id: body.menuItemId }
        });

        if (!menuItem) return NextResponse.json({ error: 'Item not found' }, { status: 404 });

        if (existingItem) {
            await prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + (body.quantity || 1) }
            });
        } else {
            await prisma.cartItem.create({
                data: {
                    cartId: cart.id,
                    menuItemId: body.menuItemId,
                    name: menuItem.name,
                    price: menuItem.price,
                    quantity: body.quantity || 1,
                    image: menuItem.image,
                    options: body.options
                }
            });
        }

        // Return updated cart
        const updatedCart = await prisma.cart.findUnique({
            where: { id: cart.id },
            include: { items: { include: { menuItem: true } } }
        });

        const response = NextResponse.json(updatedCart);
        if (setCookie) {
            response.cookies.set(CART_SESSION_COOKIE, sessionToken!, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/' });
        }
        return response;
    } catch (error) {
        console.error('Cart error:', error);
        return NextResponse.json({ error: 'Failed to update cart' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    const session = await auth();
    const cookieStore = await cookies();

    let userId = session?.user?.id;
    let sessionToken = cookieStore.get(CART_SESSION_COOKIE)?.value;

    if (userId || sessionToken) {
        // Find cart and delete items
        const cart = await prisma.cart.findFirst({
            where: userId ? { userId } : { sessionToken }
        });

        if (cart) {
            await prisma.cartItem.deleteMany({
                where: { cartId: cart.id }
            });
        }
    }

    return NextResponse.json({ success: true, items: [] });
}
