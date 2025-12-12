
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';
import 'dotenv/config';

neonConfig.webSocketConstructor = ws;

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    console.error('Error: DATABASE_URL environment variable is missing.');
    process.exit(1);
}

const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

async function check() {
    console.log('--- Checking DB Content ---');

    // 1. Count Categories
    const catCount = await prisma.menuCategory.count();
    console.log(`Categories count: ${catCount}`);

    // 2. Count Items
    const itemCount = await prisma.menuItem.count();
    console.log(`Items count: ${itemCount}`);

    // 3. List Categories
    const categories = await prisma.menuCategory.findMany();
    console.log('Categories:', categories.map(c => `${c.name} (${c.id})`));

    // 4. List Items
    const items = await prisma.menuItem.findMany({ take: 5 });
    console.log('Sample Items:', items.map(i => `${i.name} [${i.status}] (Cat: ${i.categoryId})`));

    // 5. Simulate API logic
    const apiItems = await prisma.menuItem.findMany({
        where: {},
        include: { category: true },
        orderBy: { name: 'asc' },
    });
    console.log(`API would return ${apiItems.length} items`);
}

check()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
