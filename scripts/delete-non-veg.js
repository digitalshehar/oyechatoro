
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
    console.log('Deleting non-veg posts...');
    const result = await prisma.blogPost.deleteMany({
        where: {
            OR: [
                { title: { contains: 'Chicken', mode: 'insensitive' } },
                { title: { contains: 'Meat', mode: 'insensitive' } },
                { title: { contains: 'Egg', mode: 'insensitive' } }
            ]
        }
    });

    console.log(`Deleted ${result.count} posts.`);
}

main().finally(async () => await prisma.$disconnect());
