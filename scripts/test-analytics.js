
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function checkAnalytics() {
    try {
        console.log('--- Analytics Verification ---');

        // 1. Check Orders Count (Today)
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const ordersToday = await prisma.order.findMany({
            where: { createdAt: { gte: startOfDay } }
        });

        console.log(`Orders Today: ${ordersToday.length}`);
        const totalSales = ordersToday.reduce((acc, o) => acc + o.total, 0);
        console.log(`Total Sales Today: ${totalSales}`);

        // 2. Check Top Items
        const itemCounts = {};
        for (const order of ordersToday) {
            const items = order.items; // JSON
            if (Array.isArray(items)) {
                items.forEach(i => {
                    itemCounts[i.name] = (itemCounts[i.name] || 0) + (i.quantity || 1);
                });
            }
        }
        console.log('Top Items Today:', itemCounts);

    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

checkAnalytics();
