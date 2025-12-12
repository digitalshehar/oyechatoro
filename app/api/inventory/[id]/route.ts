import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { auth } from '@/auth';

// PATCH update item
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        // Restrict to Admin/Manager?
        if (!session || (session.user as any)?.role === 'Staff') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();

        // Handle quantity update or full update
        const data: any = {};
        if (body.quantity !== undefined) data.currentStock = parseFloat(body.quantity);
        if (body.minLevel !== undefined) data.lowStockAlert = parseFloat(body.minLevel);
        if (body.name) data.name = body.name;
        if (body.unit) data.unit = body.unit;
        if (body.category) data.category = body.category;

        const updatedItem = await prisma.inventoryItem.update({
            where: { id: parseInt(id) },
            data
        });

        // Audit Log? (Maybe later)

        return NextResponse.json(updatedItem);
    } catch (error) {
        console.error('Error updating inventory item:', error);
        return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
    }
}

// DELETE item
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session || (session.user as any)?.role === 'Staff') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;

        await prisma.inventoryItem.delete({
            where: { id: parseInt(id) }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting inventory item:', error);
        return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
    }
}
