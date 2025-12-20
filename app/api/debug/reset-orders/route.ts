import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';

export async function GET() {
    try {
        const deleted = await prisma.order.deleteMany({});
        return NextResponse.json({ success: true, count: deleted.count });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
