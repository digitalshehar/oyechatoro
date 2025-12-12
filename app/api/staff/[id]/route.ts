import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { auth } from '@/auth';
import bcrypt from 'bcryptjs';

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await auth();
        if (!session || (session.user as any).role !== 'Admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();
        const { name, email, phone, role, password } = body;

        // Prepare update data
        const updateData: any = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (phone) updateData.phone = phone;
        if (role) updateData.role = role;

        // Only hash and update password if provided and not empty
        if (password && password.trim() !== '') {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const updatedStaff = await prisma.staff.update({
            where: { id },
            data: updateData,
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                role: true,
                active: true,
                createdAt: true
            }
        });

        return NextResponse.json({ success: true, user: updatedStaff });

    } catch (error) {
        console.error('Error updating staff:', error);
        return NextResponse.json({ error: 'Failed to update staff' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await auth();
        if (!session || (session.user as any).role !== 'Admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;

        // Prevent deleting self?
        if ((session.user as any).id === id) {
            return NextResponse.json({ error: 'Cannot delete yourself' }, { status: 400 });
        }

        await prisma.staff.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting staff:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
