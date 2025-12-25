import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;

const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('--- Current Staff Users ---');
    const staff = await prisma.staff.findMany();
    staff.forEach(s => {
        console.log(`Role: ${s.role} | Email: ${s.email} | Name: ${s.name}`);
    });
    console.log('--------------------------');
}

main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
