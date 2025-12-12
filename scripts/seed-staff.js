
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
    console.log('--- Seeding Staff Users ---');

    // 1. Create Chef
    const chefPass = await bcrypt.hash('chef123', 10);
    const chef = await prisma.staff.upsert({
        where: { email: 'chef@oyechatoro.com' },
        update: {
            password: chefPass,
            role: 'Chef',
            active: true
        },
        create: {
            name: 'Head Chef Singh',
            email: 'chef@oyechatoro.com',
            phone: '9876543210',
            password: chefPass,
            role: 'Chef',
            active: true
        }
    });
    console.log(`👨‍🍳 Chef Created: ${chef.email} | Pass: chef123`);

    // 2. Create Staff (Waiter/POS)
    const staffPass = await bcrypt.hash('staff123', 10);
    const staff = await prisma.staff.upsert({
        where: { email: 'staff@oyechatoro.com' },
        update: {
            password: staffPass,
            role: 'Staff',
            active: true
        },
        create: {
            name: 'Rahul Waiter',
            email: 'staff@oyechatoro.com',
            phone: '9876543211',
            password: staffPass,
            role: 'Staff',
            active: true
        }
    });
    console.log(`🛒 Staff Created: ${staff.email} | Pass: staff123`);

    console.log('--------------------------');
}

main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
