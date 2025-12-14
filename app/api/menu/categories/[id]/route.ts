import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { auth } from '@/auth';
import { logAudit } from '@/app/lib/audit';

// DELETE category - Protected
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;

        const { searchParams } = new URL(request.url);
        const force = searchParams.get('force') === 'true';

        // Check for usage
        const itemCount = await prisma.menuItem.count({
            where: { categoryId: id }
        });

        if (itemCount > 0 && !force) {
            return NextResponse.json({
                error: `Cannot delete: Category has ${itemCount} items.`,
                count: itemCount
            }, { status: 400 });
        }

        if (force && itemCount > 0) {
            // Delete associated items first
            await prisma.menuItem.deleteMany({
                where: { categoryId: id }
            });
        }


        const category = await prisma.menuCategory.delete({
            where: { id },
        });

        await logAudit('DELETE_CATEGORY', 'MenuCategory', id, { name: category.name });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting category:', error);
        return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
    }
}
