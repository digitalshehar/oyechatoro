import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { auth } from '@/auth';
import { logAudit } from '@/app/lib/audit';

// PATCH update menu item - Protected
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();

        // Remove id from body if present to avoid unique constraint error
        const { id: _, ...updateData } = body;

        const item = await prisma.menuItem.update({
            where: { id },
            data: updateData,
        });

        await logAudit('UPDATE_MENU_ITEM', 'MenuItem', item.id, { updates: Object.keys(updateData) });

        return NextResponse.json(item);
    } catch (error) {
        console.error('Error updating menu item:', error);
        return NextResponse.json({ error: 'Failed to update menu item' }, { status: 500 });
    }
}

// DELETE menu item - Protected
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

        // Delete related cart items first to avoid FK constraint error
        await prisma.cartItem.deleteMany({
            where: { menuItemId: id },
        });

        const item = await prisma.menuItem.delete({
            where: { id },
        });

        await logAudit('DELETE_MENU_ITEM', 'MenuItem', id, { name: item.name });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting menu item:', error);
        return NextResponse.json({ error: 'Failed to delete menu item' }, { status: 500 });
    }
}
