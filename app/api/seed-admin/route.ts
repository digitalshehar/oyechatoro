
import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import bcrypt from 'bcryptjs';

export async function GET() {
    try {
        const email = 'admin@oyechatoro.com';
        const password = await bcrypt.hash('123456', 10);

        // Check if exists
        const existing = await prisma.staff.findFirst({ where: { email } });

        if (existing) {
            // Reset password if exists
            await prisma.staff.update({
                where: { id: existing.id },
                data: { password }
            });
            return NextResponse.json({ message: "Admin user updated! Login with: admin@oyechatoro.com / 123456" });
        }

        // Create new
        await prisma.staff.create({
            data: {
                name: 'Super Admin',
                email,
                password,
                role: 'Admin',
                active: true,
                phone: '9999999999'
            }
        });

        return NextResponse.json({ message: "Admin user created! Login with: admin@oyechatoro.com / 123456" });

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
