import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { auth } from '@/auth';

// GET - Protected (Staff only)
export async function GET(request: NextRequest) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const where: any = {};
    if (status) where.status = status;

    try {
        const requests = await prisma.serviceRequest.findMany({
            where,
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(requests);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch requests' }, { status: 500 });
    }
}

// POST - Public (Customers)
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        if (!body.table) {
            return NextResponse.json({ error: 'Table number required' }, { status: 400 });
        }

        const newRequest = await prisma.serviceRequest.create({
            data: {
                type: body.type || 'Waiter',
                table: body.table,
                status: 'Pending'
            }
        });

        return NextResponse.json(newRequest, { status: 201 });
    } catch (error) {
        console.error('Error creating service request:', error);
        return NextResponse.json({ error: 'Failed to create request' }, { status: 500 });
    }
}
