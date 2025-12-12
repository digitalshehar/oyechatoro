import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
    try {
        const { name, email, phone, password } = await request.json();

        if (!name || !email || !phone || !password) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Check if exists
        const existing = await prisma.customer.findFirst({
            where: {
                OR: [
                    { email: email },
                    { phone: phone }
                ]
            }
        });

        if (existing) {
            return NextResponse.json({ error: 'User with this email or phone already exists' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const customer = await prisma.customer.create({
            data: {
                name,
                email, // Optional in schema? Changed to String? in my head, but schema has it as String?
                phone,
                // @ts-ignore
                password: hashedPassword,
                // Default values for others
            }
        });

        return NextResponse.json({ success: true, customerId: customer.id }, { status: 201 });
    } catch (e) {
        console.error('Registration error:', e);
        return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
    }
}
