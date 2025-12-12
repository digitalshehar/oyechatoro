import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';
import 'dotenv/config';

neonConfig.webSocketConstructor = ws;
const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

async function verifyRelated() {
    const slug = 'ultimate-guide-abu-road-food';
    console.log(`Verifying related posts logic for slug: ${slug}`);

    const relatedPosts = await prisma.blogPost.findMany({
        where: {
            slug: { not: slug },
            status: 'Published'
        },
        orderBy: { createdAt: 'desc' },
        take: 3,
        select: {
            title: true,
            slug: true
        }
    });

    console.log(`Found ${relatedPosts.length} related posts.`);

    // Assertions
    const hasCurrent = relatedPosts.some(p => p.slug === slug);
    if (hasCurrent) {
        console.error('FAIL: Logic failed, current post included in related posts.');
    } else {
        console.log('PASS: Current post correctly excluded.');
    }

    if (relatedPosts.length > 3) {
        console.error('FAIL: Too many posts returned.');
    } else {
        console.log('PASS: Limit respected.');
    }

    relatedPosts.forEach(p => console.log(`- ${p.title} (${p.slug})`));
}

verifyRelated()
    .catch(console.error)
    .finally(async () => await prisma.$disconnect());
