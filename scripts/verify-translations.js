import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';
import 'dotenv/config';

neonConfig.webSocketConstructor = ws;
const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
    const items = await prisma.menuItem.findMany();
    console.log(`Checking ${items.length} items...`);

    items.forEach(item => {
        const hi = item.translations?.hi?.name;
        if (hi) {
            console.log(`[OK] ${item.name} -> ${hi}`);
        } else {
            console.warn(`[MISSING] ${item.name}`);
        }
    });

    const categories = await prisma.menuCategory.findMany();
    categories.forEach(cat => {
        const hi = cat.translations?.hi?.name;
        console.log(`[CAT] ${cat.name} -> ${hi || 'MISSING'}`);
    });
}

main().finally(() => prisma.$disconnect());
