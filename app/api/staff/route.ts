import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { auth } from '@/auth';
import bcrypt from 'bcryptjs';

export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        // Only Admin/Manager can view staff? Maybe just Admin.
        // Let's stick to Admin for sensitive stuff.
        if (!session || (session.user as any).role !== 'Admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Data Isolation: Admin sees all? Or Head Office Admin sees all?
        // Decisions: 
        // 1. Global Admin (Head Office) sees ALL staff? Or just Head Office staff?
        //    Ideally Global Admin sees all. But let's start with Isolation: You see users in your store.
        //    If Head Office wants to see all, they can switch context (future).
        // 2. Head Office is just a store.

        const storeId = (session.user as any).storeId;
        const where: any = {};
        if (storeId) {
            where.storeId = storeId;
        }

        const staff = await prisma.staff.findMany({
            where,
            orderBy: { name: 'asc' },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                role: true,
                active: true,
                createdAt: true
                // Do not return password/pin
            }
        });

        return NextResponse.json(staff);
    } catch (error) {
        console.error('Error fetching staff:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session || (session.user as any).role !== 'Admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { name, email, phone, password, role } = body;
        const storeId = (session.user as any).storeId;

        // Basic validation
        if (!name || !email || !password) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Check duplicate
        const existing = await prisma.staff.findUnique({ where: { email } });
        if (existing) {
            return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newStaff = await prisma.staff.create({
            data: {
                storeId, // Assign to creator's store
                name,
                email,
                phone,
                role: role || 'Staff',
                password: hashedPassword,
                active: true
            }
        });

        return NextResponse.json({
            success: true,
            user: { id: newStaff.id, name: newStaff.name, email: newStaff.email, role: newStaff.role }
        });

    } catch (error) {
        console.error('Error creating staff:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
