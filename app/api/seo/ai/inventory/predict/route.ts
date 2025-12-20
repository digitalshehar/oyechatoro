import { NextRequest, NextResponse } from 'next/server';
import { getInventoryPredictions } from '@/app/lib/seo-utils';
import { prisma } from '@/app/lib/db';
import { auth } from '@/auth';

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const body = await req.json();
        const { inventory } = body;

        if (!inventory || !Array.isArray(inventory)) {
            return NextResponse.json({ error: 'Inventory data required' }, { status: 400 });
        }

        // Fetch recent orders to analyze usage patterns (last 100 orders)
        const recentOrders = await prisma.order.findMany({
            take: 100,
            orderBy: { createdAt: 'desc' },
            select: { items: true, createdAt: true }
        });

        const predictions = await getInventoryPredictions(inventory, recentOrders, process.env.GEMINI_API_KEY!);
        return NextResponse.json({ predictions });
    } catch (error) {
        console.error('AI Inventory Prediction API Error:', error);
        return NextResponse.json({ error: 'Failed to generate predictions' }, { status: 500 });
    }
}
