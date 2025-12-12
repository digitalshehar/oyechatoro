import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { auth } from '@/auth';

export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { itemId, quantity, reason } = body;

        if (!itemId || !quantity) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        const result = await prisma.$transaction(async (tx) => {
            // 1. Update Stock
            const item = await tx.inventoryItem.update({
                where: { id: Number(itemId) },
                data: {
                    currentStock: { decrement: Number(quantity) }
                }
            });

            // 2. Create Log
            const log = await tx.stockLog.create({
                data: {
                    inventoryItemId: Number(itemId),
                    change: -Number(quantity),
                    type: 'WASTAGE',
                    reason: reason || 'Wastage Recorded'
                },
                include: { inventoryItem: true }
            });

            return log;
        });

        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        console.error('Error recording wastage:', error);
        return NextResponse.json({ error: 'Failed to record wastage' }, { status: 500 });
    }
}
