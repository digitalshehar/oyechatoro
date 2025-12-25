import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function checkDb() {
    try {
        console.log("Attempting to connect to database...");
        const categoryCount = await prisma.menuCategory.count();
        const itemCount = await prisma.menuItem.count();
        console.log(`Categories: ${categoryCount}`);
        console.log(`Items: ${itemCount}`);
    } catch (e) {
        console.error("Connection failed:", e.message);
    } finally {
        await prisma.$disconnect();
    }
}

checkDb();
