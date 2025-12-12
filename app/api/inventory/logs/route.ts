import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { auth } from '@/auth';

export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const itemId = searchParams.get('itemId');

        const where: any = {};
        if (itemId) {
            where.inventoryItemId = Number(itemId);
        }

        const logs = await prisma.stockLog.findMany({
            where,
            include: {
                inventoryItem: { select: { name: true, unit: true } }
            },
            orderBy: { createdAt: 'desc' },
            take: 100 // Limit to last 100 entries for performance
        });

        return NextResponse.json(logs);
    } catch (error) {
        console.error('Error fetching inventory logs:', error);
        return NextResponse.json({ error: 'Failed to fetch logs' }, { status: 500 });
    }
}
