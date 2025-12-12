
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';
import 'dotenv/config';

// Configure WebSocket for Node.js environment
neonConfig.webSocketConstructor = ws;

const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('Testing Comment Insertion...');

    // 1. Get a post (or create one if none)
    let post = await prisma.blogPost.findFirst();
    if (!post) {
        console.log('No post found, creating one...');
        post = await prisma.blogPost.create({
            data: {
                title: 'Test Post',
                slug: 'test-post',
                content: 'This is a test post.',
            }
        });
    }
    console.log(`Using Post: ${post.title} (${post.id})`);

    // 2. Create Comment
    try {
        const comment = await prisma.blogComment.create({
            data: {
                postId: post.id,
                user: 'Test User',
                text: 'This is a test comment from script.',
                rating: 5,
                isApproved: true
            }
        });
        console.log('Comment created successfully:', comment);
    } catch (e) {
        console.error('Failed to create comment:', e);
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
