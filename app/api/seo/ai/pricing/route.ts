import { NextRequest, NextResponse } from 'next/server';
import { getDynamicPricingSuggestions } from '@/app/lib/seo-utils';
import { prisma } from '@/app/lib/db';
import { auth } from '@/auth';

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const body = await req.json();
        const { action, pricingData } = body;

        // Action 1: Get Suggestions
        if (action === 'suggest') {
            const menuItems = await prisma.menuItem.findMany({
                where: { status: 'Active' },
                include: { category: true }
            });

            const recentOrders = await prisma.order.findMany({
                where: { createdAt: { gte: new Date(Date.now() - 3 * 60 * 60 * 1000) } }, // Last 3 hours
                select: { createdAt: true }
            });

            const suggestions = await getDynamicPricingSuggestions(menuItems, recentOrders, process.env.GEMINI_API_KEY!);
            return NextResponse.json({ suggestions });
        }

        // Action 2: Apply Bulk Updates
        if (action === 'apply' && pricingData) {
            const updates = pricingData.map((item: any) =>
                prisma.menuItem.update({
                    where: { id: item.id },
                    data: { price: item.suggestedPrice }
                })
            );
            await prisma.$transaction(updates);
            return NextResponse.json({ success: true, count: updates.length });
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    } catch (error) {
        console.error('AI Pricing API Error:', error);
        return NextResponse.json({ error: 'Failed to process pricing' }, { status: 500 });
    }
}
