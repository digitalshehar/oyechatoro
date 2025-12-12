
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
    console.log('Searching for non-veg posts...');
    const nonVegPosts = await prisma.blogPost.findMany({
        where: {
            OR: [
                { title: { contains: 'Chicken', mode: 'insensitive' } },
                { title: { contains: 'Meat', mode: 'insensitive' } },
                { title: { contains: 'Egg', mode: 'insensitive' } },
                { content: { contains: 'Chicken', mode: 'insensitive' } }
            ]
        },
        select: { id: true, title: true, slug: true }
    });

    console.log('Found Non-Veg Posts:', nonVegPosts);
}

main().finally(async () => await prisma.$disconnect());
