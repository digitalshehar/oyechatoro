import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import ws from 'ws';
import { neonConfig } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL;

neonConfig.webSocketConstructor = ws; // Fix for Node environment

const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('Checking Prisma Client keys...');
    const keys = Object.keys(prisma);
    console.log('Keys on prisma instance:', keys);

    // Check prototype or dmmf to see if model exists
    // Actually, accessing .blogComment should be enough
    if (prisma.blogComment) {
        console.log('SUCCESS: prisma.blogComment exists!');
    } else {
        console.error('FAILURE: prisma.blogComment is undefined.');
        console.log('Available models might be:', Object.keys(prisma).filter(k => k.startsWith('blog')));
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
