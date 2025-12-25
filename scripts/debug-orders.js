
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import ws from 'ws';
import dotenv from 'dotenv';
dotenv.config();

const connectionString = process.env.DATABASE_URL;
const prisma = new PrismaClient({
    adapter: new PrismaNeon({ connectionString: connectionString || "" })
});

async function checkDb() {
    try {
        const stores = await prisma.store.findMany();
        console.log('Stores:', stores.map(s => ({ id: s.id, name: s.name, code: s.code })));

        const orders = await prisma.order.findMany({
            take: 10,
            orderBy: { createdAt: 'desc' }
        });
        console.log('Recent Orders:', orders.map(o => ({ id: o.id, customer: o.customer, storeId: o.storeId, createdAt: o.createdAt })));

        const staff = await prisma.staff.findMany();
        console.log('Staff:', staff.map(s => ({ id: s.id, name: s.name, role: s.role, storeId: s.storeId })));
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

checkDb();
