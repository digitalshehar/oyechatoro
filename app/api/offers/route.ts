import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { auth } from '@/auth';

export async function GET(request: NextRequest) {
    try {
        // Offers might be public if we show them to customers?
        // But dashboard fetching usually authenticated.
        // Let's allow authenticated users (Staff need to see offers to apply?)
        // Or actually, `useDbOffers` is for dashboard management.
        // Public offers for Homepage
        // const session = await auth();
        // if (!session) {
        //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        // }

        const offers = await prisma.offer.findMany({
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(offers);
    } catch (error) {
        console.error('Error fetching offers:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session || ((session.user as any).role !== 'Admin' && (session.user as any).role !== 'Manager')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();

        // Basic validation
        if (!body.code || !body.discount || !body.expiry) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const offer = await prisma.offer.create({
            data: {
                code: body.code.toUpperCase(),
                discount: body.discount,
                type: body.type || 'Percentage',
                expiry: new Date(body.expiry),
                status: body.status || 'Active',
                description: body.description,
                bgColor: body.bgColor,
                usage: 0
            }
        });

        return NextResponse.json(offer);
    } catch (error) {
        console.error('Error creating offer:', error);
        // Handle unique constraint
        if ((error as any).code === 'P2002') {
            return NextResponse.json({ error: 'Coupon code already exists' }, { status: 400 });
        }
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
