import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { auth } from '@/auth';

export async function GET(request: NextRequest) {
    const session = await auth();
    if (!session || !session.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const customer = await prisma.customer.findUnique({
            where: { id: session.user.id }
        });

        if (!customer) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        const { password, details, ...base } = customer;
        const detailsObj = (details as Record<string, any>) || {};

        // Merge details into user object for frontend compatibility
        const user = {
            ...base,
            ...detailsObj,
            loyalty: {
                points: base.loyaltyPoints,
                tier: base.loyaltyPoints > 1000 ? 'Gold' : base.loyaltyPoints > 350 ? 'Silver' : 'Bronze',
                streak: 0
            }
        };

        return NextResponse.json(user);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    const session = await auth();
    if (!session || !session.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();

        // Fetch current to merge details
        const current = await prisma.customer.findUnique({ where: { id: session.user.id } });
        if (!current) return NextResponse.json({ error: 'Not found' }, { status: 404 });

        const currentDetails = (current.details as Record<string, any>) || {};
        const newDetails = { ...currentDetails, ...body };

        const updated = await prisma.customer.update({
            where: { id: session.user.id },
            data: {
                details: newDetails
            }
        });

        const { password, details, ...base } = updated;
        const detailsObj = (details as Record<string, any>) || {};

        const user = {
            ...base,
            ...detailsObj,
            loyalty: {
                points: base.loyaltyPoints,
                tier: base.loyaltyPoints > 1000 ? 'Gold' : base.loyaltyPoints > 350 ? 'Silver' : 'Bronze',
                streak: 0
            }
        };

        return NextResponse.json(user);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Update failed' }, { status: 500 });
    }
}
