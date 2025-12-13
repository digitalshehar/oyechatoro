
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { auth } from '@/auth';

export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        // @ts-ignore
        if (!session || !['Admin', 'Manager'].includes(session.user?.role || '')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { action, itemIds, data } = body;
        // action: 'delete' | 'updateStatus'
        // itemIds: string[]
        // data: { status: 'Active' | 'OutOfStock' } (optional)

        if (!Array.isArray(itemIds) || itemIds.length === 0) {
            return NextResponse.json({ error: 'No items selected' }, { status: 400 });
        }

        if (action === 'delete') {
            await prisma.menuItem.deleteMany({
                where: { id: { in: itemIds } }
            });
            return NextResponse.json({ success: true, message: `Deleted ${itemIds.length} items` });
        }

        if (action === 'updateStatus') {
            if (!data?.status) return NextResponse.json({ error: 'Status required' }, { status: 400 });
            await prisma.menuItem.updateMany({
                where: { id: { in: itemIds } },
                data: { status: data.status }
            });
            return NextResponse.json({ success: true, message: `Updated ${itemIds.length} items` });
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    } catch (error) {
        console.error('Bulk action error:', error);
        return NextResponse.json({ error: 'Failed to perform bulk action' }, { status: 500 });
    }
}
