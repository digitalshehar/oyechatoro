import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';
import { getPrepForecasting } from '../../../lib/seo-utils';
import { auth } from '../../../../auth';

export async function GET() {
    try {
        const session = await auth();
        if (!session || !['Chef', 'Admin', 'Manager'].includes((session.user as any).role)) {
            return new NextResponse('Unauthorized', { status: 403 });
        }

        const [items, orders] = await Promise.all([
            prisma.menuItem.findMany({ where: { status: 'Active' } }),
            prisma.order.findMany({
                take: 50,
                orderBy: { createdAt: 'desc' },
                where: { status: 'Completed' }
            })
        ]);

        const suggestions = await getPrepForecasting(items, orders, process.env.GEMINI_API_KEY || '');

        return NextResponse.json(suggestions);
    } catch (err) {
        console.error('Prep API Error:', err);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
