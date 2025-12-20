import { prisma } from '../app/lib/db';

async function testConnection() {
    console.log('--- Database Connection Test ---');
    try {
        console.log('Attempting to count menu items...');
        const itemCount = await prisma.menuItem.count();
        console.log(`Success! Menu items count: ${itemCount}`);

        console.log('Attempting to count reviews...');
        const reviewCount = await prisma.review.count();
        console.log(`Success! Reviews count: ${reviewCount}`);

        console.log('Attempting to count blog posts...');
        const postCount = await prisma.blogPost.count();
        console.log(`Success! Blog posts count: ${postCount}`);

        console.log('--- Test Completed Successfully ---');
    } catch (error: any) {
        console.error('--- Test Failed ---');
        console.error('Error Name:', error.name);
        console.error('Error Message:', error.message);
        if (error.code) console.error('Error Code:', error.code);
        process.exit(1);
    }
}

testConnection();
