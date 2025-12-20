import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { auth } from '@/auth';

// GET all stores (Admin only)
export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        // Only Admin can see list of stores
        if (!session || (session.user as any).role !== 'Admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const stores = await prisma.store.findMany({
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(stores);
    } catch (error) {
        console.error('Error fetching stores:', error);
        return NextResponse.json({ error: 'Failed to fetch stores' }, { status: 500 });
    }
}

// POST create new store
export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session || (session.user as any).role !== 'Admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();

        // Validation
        if (!body.name || !body.code) {
            return NextResponse.json({ error: 'Name and Code are required' }, { status: 400 });
        }

        // Unique Code check
        const existing = await prisma.store.findUnique({ where: { code: body.code } });
        if (existing) {
            return NextResponse.json({ error: 'Store Code already exists' }, { status: 400 });
        }

        const newStore = await prisma.store.create({
            data: {
                name: body.name,
                code: body.code.toUpperCase(), // Ensure code is uppercase
                address: body.address,
                phone: body.phone,
                active: true
            }
        });

        return NextResponse.json(newStore, { status: 201 });

    } catch (error) {
        console.error('Error creating store:', error);
        return NextResponse.json({ error: 'Failed to create store' }, { status: 500 });
    }
}
