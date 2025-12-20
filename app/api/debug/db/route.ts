
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';

export async function GET(request: NextRequest) {
    const dbUrl = process.env.DATABASE_URL;
    const directUrl = process.env.DIRECT_URL;

    let status = {
        env: {
            NODE_ENV: process.env.NODE_ENV,
            DATABASE_URL_SET: !!dbUrl,
            DATABASE_URL_PREFIX: dbUrl ? dbUrl.split(':')[0] : 'N/A',
            DIRECT_URL_SET: !!directUrl,
        },
        connection: 'Checking...',
        error: null as any
    };

    try {
        // Try a simple count
        const count = await prisma.menuItem.count();
        status.connection = `Connected! Item Count: ${count}`;

        // Try fetching one item to check serialization/model issues
        const sampleItem = await prisma.menuItem.findFirst();
        (status as any).sampleItem = sampleItem;

        return NextResponse.json(status);
    } catch (e: any) {
        console.error('DB Connection Test Failed:', e);
        status.connection = 'FAILED';
        status.error = {
            message: e.message,
            name: e.name,
            code: e.code,
            meta: e.meta
        };
        return NextResponse.json(status, { status: 500 });
    }
}
