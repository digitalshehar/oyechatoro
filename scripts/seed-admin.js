
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

neonConfig.webSocketConstructor = ws;
const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('--- Seeding Admin User ---');

    const email = 'admin@oyechatoro.com';
    const password = 'admin'; // Default password
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.staff.upsert({
        where: { email },
        update: {
            password: hashedPassword,
            role: 'Admin',
            active: true
        },
        create: {
            name: 'Admin User',
            email,
            phone: '9999999999',
            password: hashedPassword,
            role: 'Admin',
            active: true
        }
    });

    console.log(`Admin User Created/Updated: ${admin.email}`);
    console.log(`Password: ${password}`);
    console.log('--------------------------');
}

main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
