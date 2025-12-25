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
    const items = await prisma.menuItem.findMany({
        select: { name: true, translations: true }
    });

    console.log(`Total Items: ${items.length}`);
    const withHindi = items.filter(i => i.translations?.hi?.name);
    console.log(`Items with Hindi Name: ${withHindi.length}`);

    if (withHindi.length < items.length) {
        console.log('\nSample Missing:');
        items.filter(i => !i.translations?.hi?.name).slice(0, 5).forEach(i => console.log(`- ${i.name}`));
    }
}

main().finally(() => prisma.$disconnect());
