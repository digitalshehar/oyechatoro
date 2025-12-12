import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';
import bcrypt from 'bcryptjs';

neonConfig.webSocketConstructor = ws;

async function main() {
    console.log('--- CUSTOMER MANAGEMENT SCRIPT (NEON ADAPTER) ---');

    const envPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
        const envConfig = fs.readFileSync(envPath, 'utf8');
        const lines = envConfig.split(/\r?\n/);
        lines.forEach(line => {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith('#')) return;
            const match = trimmed.match(/^([^=]+)=(.*)$/);
            if (match) {
                const key = match[1].trim();
                let val = match[2].trim();
                if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
                else if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
                process.env[key] = val;
            }
        });
    }

    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
        console.error('ERROR: DATABASE_URL not found');
        return;
    }

    const adapter = new PrismaNeon({ connectionString });
    const prisma = new PrismaClient({ adapter });

    try {
        console.log('Using Neon Adapter to connect...');
        // 3. Ensure Test User Exists
        const testEmail = 'test@oyechatoro.com';
        const testPhone = '9999999999';
        const testPassword = 'User@123';

        console.log(`Checking for user ${testEmail}...`);
        let testUser = await prisma.customer.findFirst({
            where: { OR: [{ email: testEmail }, { phone: testPhone }] }
        });

        if (!testUser) {
            console.log('Creating Test User...');
            const hashedPassword = await bcrypt.hash(testPassword, 10);
            testUser = await prisma.customer.create({
                data: {
                    name: 'Test Manual User',
                    email: testEmail,
                    phone: testPhone,
                    password: hashedPassword,
                    loyaltyPoints: 100,
                    details: {
                        address: ['123 Test St, Food City'],
                        preferences: ['Veg', 'Spicy']
                    }
                }
            });
            console.log(`✅ Created Test User: ${testEmail} / ${testPassword}`);
        } else {
            console.log(`ℹ️ Test User ${testUser.email} already exists.`);
            // Update password just in case
            const hashedPassword = await bcrypt.hash(testPassword, 10);
            await prisma.customer.update({
                where: { id: testUser.id },
                data: { password: hashedPassword }
            });
            console.log(`✅ Reset password for Test User to: ${testPassword}`);
        }

    } catch (e) {
        console.error('Prisma Error:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main().catch(console.error);
