
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function checkDb() {
    try {
        const categoryCount = await prisma.menuCategory.count();
        const itemCount = await prisma.menuItem.count();
        console.log(`Categories: ${categoryCount}`);
        console.log(`Items: ${itemCount}`);

        if (itemCount > 0) {
            const firstItem = await prisma.menuItem.findFirst();
            console.log('Sample Item:', firstItem);
        }
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

checkDb();
