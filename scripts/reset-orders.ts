import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    try {
        console.log('🗑️ Deleting all orders...');
        const deleteOrders = await prisma.order.deleteMany({});
        console.log(`✅ Deleted ${deleteOrders.count} orders.`);
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
