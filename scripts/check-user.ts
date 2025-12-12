import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
    const email = 'admin@oyechatoro.com';
    const user = await prisma.staff.findUnique({
        where: { email }
    });
    console.log('User found:', user);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
