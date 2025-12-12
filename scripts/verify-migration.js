
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
    const post = await prisma.blogPost.findUnique({
        where: { slug: 'ultimate-guide-abu-road-food' }
    });

    if (post) {
        console.log('Post Found:');
        console.log(`Title: ${post.title}`);
        console.log(`Category: ${post.category}`);
        console.log(`Content Length: ${post.content.length}`);
        console.log(`Status: ${post.status}`);
    } else {
        console.error('Post NOT Found!');
    }
}

main().finally(async () => await prisma.$disconnect());
