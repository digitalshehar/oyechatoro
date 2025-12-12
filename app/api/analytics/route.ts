import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { auth } from '@/auth';

export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        // Analytics likely Admin/Manager only
        if (!session || (session.user as any)?.role === 'Staff') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const searchParams = request.nextUrl.searchParams;
        const period = searchParams.get('period') || '7d';

        let startDate = new Date();
        if (period === '7d') startDate.setDate(startDate.getDate() - 7);
        else if (period === '30d') startDate.setDate(startDate.getDate() - 30);
        else if (period === 'month') startDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
        else if (period === 'year') startDate = new Date(startDate.getFullYear(), 0, 1);

        const orders = await prisma.order.findMany({
            where: {
                createdAt: { gte: startDate },
                status: { not: 'Cancelled' }
            },
            select: {
                total: true,
                createdAt: true,
                items: true
            }
        });

        const menuItems = await prisma.menuItem.findMany({
            include: { category: true }
        });

        // --- Aggregation ---
        const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
        const totalOrders = orders.length;
        const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

        // Revenue Trend (Daily)
        const trendMap = new Map<string, number>();
        orders.forEach(o => {
            const date = new Date(o.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
            trendMap.set(date, (trendMap.get(date) || 0) + o.total);
        });
        // Fill gaps? Maybe simplified for now.
        const revenueTrend = Array.from(trendMap.entries()).map(([date, amount]) => ({ date, amount }));

        // Peak Hours
        const hoursMap = new Array(24).fill(0);
        orders.forEach(o => {
            const h = new Date(o.createdAt).getHours();
            hoursMap[h]++;
        });
        const peakHours = hoursMap.map((count, hour) => ({ hour, count }));

        // Item Sales & Menu Engineering
        const itemStats = new Map<string, { count: number, revenue: number }>();

        orders.forEach(o => {
            const items = o.items as any[]; // JSON
            if (Array.isArray(items)) {
                items.forEach(item => {
                    const existing = itemStats.get(item.name) || { count: 0, revenue: 0 };
                    existing.count += item.quantity || 1;
                    existing.revenue += (item.price || 0) * (item.quantity || 1);
                    itemStats.set(item.name, existing);
                });
            }
        });

        // Top Items
        const topItems = Array.from(itemStats.entries())
            .map(([name, stats]) => ({ name, sales: stats.count, revenue: stats.revenue, pct: 0 }))
            .sort((a, b) => b.sales - a.sales)
            .slice(0, 5);

        const maxSales = topItems[0]?.sales || 1;
        topItems.forEach(i => i.pct = Math.round((i.sales / maxSales) * 100));

        // Menu Engineering (Stars, Plowhorses, etc)
        const engineeringItems = menuItems.map(m => {
            const stats = itemStats.get(m.name) || { count: 0, revenue: 0 };
            const cost = m.costPrice || (m.price * 0.3); // Mock cost if missing (30%)
            const profit = m.price - cost;
            const totalProfit = profit * stats.count;

            return {
                id: m.id,
                name: m.name,
                category: m.category ? 'Food' : 'Food', // Simplified
                sales: stats.count,
                cost,
                revenue: stats.revenue,
                profit: Math.round(profit),
                totalProfit,
                popularity: stats.count
            };
        });

        // Classification
        const avgPopularity = engineeringItems.reduce((sum, i) => sum + i.sales, 0) / (engineeringItems.length || 1);
        const avgProfit = engineeringItems.reduce((sum, i) => sum + i.profit, 0) / (engineeringItems.length || 1);

        const classifiedItems = engineeringItems.map(i => {
            const highPop = i.sales >= avgPopularity;
            const highProf = i.profit >= avgProfit;
            let cat = '';
            if (highPop && highProf) cat = 'Star';
            else if (highPop && !highProf) cat = 'Plowhorse';
            else if (!highPop && highProf) cat = 'Puzzle';
            else cat = 'Dog';
            return { ...i, category: cat };
        });

        const menuEngineering = {
            items: classifiedItems,
            stars: classifiedItems.filter(i => i.category === 'Star'),
            plowhorses: classifiedItems.filter(i => i.category === 'Plowhorse'),
            puzzles: classifiedItems.filter(i => i.category === 'Puzzle'),
            dogs: classifiedItems.filter(i => i.category === 'Dog'),
        };

        return NextResponse.json({
            summary: { totalRevenue, totalOrders, avgOrderValue },
            revenueTrend,
            peakHours,
            topItems,
            menuEngineering
        });

    } catch (error) {
        console.error('Error fetching analytics:', error);
        return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
    }
}
