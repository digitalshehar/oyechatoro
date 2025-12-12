
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { auth } from '@/auth';

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        // if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { id } = await params;

        // Simplify: Just delete. The relation M-M will handle link removal from pivot table automatically?
        // Prisma implicit many-to-many: deleting a record from one side (Tag) removes entries from join table.
        // But we should check if it's widely used maybe?
        // For now, allow deletion.

        await prisma.blogTag.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete error:', error);
        return NextResponse.json({ error: 'Failed to delete tag' }, { status: 500 });
    }
}
