
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log("Testing Prisma Connection for Customers...");
    try {
        const customers = await prisma.customer.findMany({
            take: 5
        });
        console.log("✅ Successfully fetched " + customers.length + " customers.");
        console.log(customers);
    } catch (e) {
        console.error("❌ Prisma Error:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
