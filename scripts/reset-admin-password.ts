import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';
import bcrypt from 'bcryptjs';

neonConfig.webSocketConstructor = ws;

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
    const email = 'admin@oyechatoro.com';
    const newPassword = 'Admin@123';
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const user = await prisma.staff.update({
        where: { email },
        data: { password: hashedPassword }
    });

    console.log('Password reset successfully for:', user.email);
    console.log('New Hash:', hashedPassword);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
