import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { auth } from '@/auth';

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await auth();
        // Admin/Manager only
        if (!session || ((session.user as any).role !== 'Admin' && (session.user as any).role !== 'Manager')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;

        await prisma.offer.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting offer:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
