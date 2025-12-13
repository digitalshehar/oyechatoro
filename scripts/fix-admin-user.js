
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

const prisma = new PrismaClient();

async function main() {
    console.log('--- Fixing Admin User Credentials ---');

    const email = 'admin@oyechatoro.com';
    const passwordRaw = '8233779844';

    console.log(`Hashing password for: ${email}`);
    const hashedPassword = await bcrypt.hash(passwordRaw, 10);

    // Update or Create Admin User
    try {
        const admin = await prisma.staff.upsert({
            where: { email: email },
            update: {
                password: hashedPassword,
                role: 'Admin',
                active: true,
                name: 'Super Admin'
            },
            create: {
                email: email,
                password: hashedPassword,
                role: 'Admin',
                active: true,
                name: 'Super Admin',
                phone: passwordRaw
            }
        });
        console.log('✅ Admin User Updated Successfully!');
        console.log(`   ID: ${admin.id}`);
        console.log(`   Email: ${admin.email}`);
        console.log(`   Role: ${admin.role}`);

    } catch (e) {
        console.error('❌ Error updating Admin:', e);
    }

    console.log('-------------------------------------');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
