import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { auth } from '@/auth';

export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        // Strict Role Check - Cast to any to avoid TS error
        const user = session?.user as any;
        if (!user?.role || !['Admin', 'Manager', 'Chef'].includes(user.role)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const period = searchParams.get('period') || 'today';

        let startDate = new Date();
        const now = new Date();

        // Determine Date Range
        if (period === 'today') {
            startDate.setHours(0, 0, 0, 0);
        } else if (period === 'week') {
            startDate.setDate(now.getDate() - 7);
            startDate.setHours(0, 0, 0, 0);
        } else if (period === 'month') {
            startDate.setMonth(now.getMonth() - 1);
            startDate.setHours(0, 0, 0, 0);
        } else {
            // All time (or reasonable default like year)
            startDate = new Date(0); // 1970
        }

        // Fetch Orders with Items
        const orders = await prisma.order.findMany({
            where: {
                createdAt: { gte: startDate },
            },
            select: {
                id: true,
                total: true,
                createdAt: true,
                items: true,
                type: true,
                paymentMethod: true,
            },
            orderBy: { createdAt: 'asc' }
        });

        // --- Aggregation Logic ---

        // 1. Summary Cards
        const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
        const totalOrders = orders.length;
        const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

        // 2. Efficiently fetch all recipes for items in these orders
        const allOrderedItemIds = new Set<string>();
        orders.forEach(order => {
            const items = order.items as any[];
            if (Array.isArray(items)) {
                items.forEach(item => {
                    if (item.menuItemId) allOrderedItemIds.add(item.menuItemId);
                });
            }
        });

        const menuItemsWithRecipes = await prisma.menuItem.findMany({
            where: { id: { in: Array.from(allOrderedItemIds) } },
            select: { id: true, recipe: true, name: true, price: true }
        });

        // Fetch all inventory items for costs
        const inventoryItems = await prisma.inventoryItem.findMany({
            select: { id: true, costPerUnit: true }
        });
        const inventoryCostMap = new Map(inventoryItems.map(i => [i.id, i.costPerUnit || 0]));

        // Calculate cost per MenuItem
        const menuCostMap = new Map<string, number>();
        menuItemsWithRecipes.forEach(mi => {
            let cost = 0;
            if (mi.recipe && Array.isArray(mi.recipe)) {
                (mi.recipe as any[]).forEach(ing => {
                    const unitCost = inventoryCostMap.get(ing.inventoryItemId) || 0;
                    cost += (ing.quantity || 0) * unitCost;
                });
            }
            menuCostMap.set(mi.id, cost);
        });

        // 3. Trends and Stats
        const trendMap: Record<string, number> = {};
        const hoursMap: Record<number, number> = {};
        const itemStats: Record<string, { count: number, revenue: number, cost: number }> = {};

        orders.forEach(order => {
            const date = new Date(order.createdAt);
            const dateKey = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            trendMap[dateKey] = (trendMap[dateKey] || 0) + order.total;

            const hour = date.getHours();
            hoursMap[hour] = (hoursMap[hour] || 0) + 1;

            const items = order.items as any[];
            if (Array.isArray(items)) {
                items.forEach(item => {
                    const name = item.name || 'Unknown';
                    const qty = item.quantity || 1;
                    const price = item.price || 0;
                    const totalItemRev = price * qty;

                    // Use actual cost from map or fallback to 30% if recipe missing
                    const itemCostPerUnit = menuCostMap.get(item.menuItemId);
                    const totalItemCost = itemCostPerUnit !== undefined ? (itemCostPerUnit * qty) : (totalItemRev * 0.3);

                    if (!itemStats[name]) itemStats[name] = { count: 0, revenue: 0, cost: 0 };
                    itemStats[name].count += qty;
                    itemStats[name].revenue += totalItemRev;
                    itemStats[name].cost += totalItemCost;
                });
            }
        });

        // Format outputs
        const revenueTrend = Object.entries(trendMap).map(([date, amount]) => ({ date, amount }));
        const peakHours = Object.entries(hoursMap).map(([hour, count]) => ({
            hour: `${hour}:00`,
            count
        })).sort((a, b) => parseInt(a.hour) - parseInt(b.hour));

        const allItems = Object.entries(itemStats).map(([name, stats]) => ({
            name,
            sales: stats.count,
            revenue: stats.revenue,
            profit: stats.revenue - stats.cost,
        }));

        const topItems = [...allItems].sort((a, b) => b.revenue - a.revenue).slice(0, 5).map(i => ({
            ...i,
            pct: totalRevenue > 0 ? Math.round((i.revenue / totalRevenue) * 100) : 0
        }));

        // Menu Engineering
        const avgSales = allItems.reduce((acc, i) => acc + i.sales, 0) / (allItems.length || 1);
        const avgProfit = allItems.reduce((acc, i) => acc + i.profit, 0) / (allItems.length || 1);

        const engineeringItems = allItems.map(item => {
            let category = 'Puzzle';
            if (item.sales >= avgSales && item.profit >= avgProfit) category = 'Star';
            else if (item.sales >= avgSales && item.profit < avgProfit) category = 'Plowhorse';
            else if (item.sales < avgSales && item.profit >= avgProfit) category = 'Puzzle';
            else category = 'Dog';

            return {
                name: item.name,
                popularity: item.sales,
                profit: item.profit,
                revenue: item.revenue,
                sales: item.sales,
                category
            };
        });

        const paymentMethods: Record<string, number> = {};
        orders.forEach(order => {
            const method = order.paymentMethod || 'Unknown';
            paymentMethods[method] = (paymentMethods[method] || 0) + 1;
        });

        return NextResponse.json({
            summary: { totalRevenue, totalOrders, avgOrderValue },
            revenueTrend,
            peakHours,
            topItems,
            menuEngineering: { items: engineeringItems },
            paymentData: Object.entries(paymentMethods).map(([name, value]) => ({ name, value }))
        });

    } catch (error) {
        console.error('Analytics Error:', error);
        return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
    }
}
