
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
        const { type, items } = body; // type: 'category' | 'item', items: { id, order }[]

        if (!Array.isArray(items)) {
            return NextResponse.json({ error: 'Invalid items array' }, { status: 400 });
        }

        // Use transaction to update all
        await prisma.$transaction(
            items.map((item: any) => {
                if (type === 'category') {
                    return prisma.menuCategory.update({
                        where: { id: item.id },
                        data: { order: item.order }
                    });
                } else {
                    return prisma.menuItem.update({
                        where: { id: item.id },
                        data: { order: item.order }
                    });
                }
            })
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Reorder error:', error);
        return NextResponse.json({ error: 'Failed to reorder' }, { status: 500 });
    }
}
