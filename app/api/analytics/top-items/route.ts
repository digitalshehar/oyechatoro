
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { auth } from '@/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        // @ts-ignore
        if (!session || !['Admin', 'Manager', 'Staff'].includes(session.user?.role || '')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Fetch all orders
        // specific filter: only COMPLETED or PAID orders? 
        // For 'Top Selling', we usually count everything that was ordered (even if pending payment in a restaurant context usually means eating).
        // Let's exclude 'Cancelled'.
        const orders = await prisma.order.findMany({
            where: {
                status: { not: 'Cancelled' }
            },
            select: {
                items: true
            }
        });

        const itemMap = new Map<string, { count: number, revenue: number }>();

        orders.forEach(order => {
            const items = order.items as any[];
            if (Array.isArray(items)) {
                items.forEach(item => {
                    if (item.name) {
                        const current = itemMap.get(item.name) || { count: 0, revenue: 0 };
                        const qty = Number(item.quantity) || 0;
                        const price = Number(item.price) || 0;

                        itemMap.set(item.name, {
                            count: current.count + qty,
                            revenue: current.revenue + (qty * price)
                        });
                    }
                });
            }
        });

        const topItems = Array.from(itemMap.entries())
            .map(([name, stats]) => ({
                name,
                count: stats.count,
                revenue: stats.revenue
            }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5); // Status: Top 5

        return NextResponse.json(topItems);
    } catch (error) {
        console.error('Analytics ID error:', error);
        return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
    }
}
