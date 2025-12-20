import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { auth } from '@/auth';

// GET Table Configuration
export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Fetch from Settings
        const setting = await prisma.setting.findUnique({
            where: { key: 'table_config' }
        });

        const config = setting?.value || { count: 10 };

        return NextResponse.json(config);
    } catch (error) {
        console.error('Error fetching tables:', error);
        // Default fallbacks if DB fails somehow
        return NextResponse.json({ count: 10 });
    }
}

// POST Update Table Data
export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        // @ts-ignore
        if (!session || !['Admin', 'Manager'].includes(session.user?.role || '')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const body = await request.json();

        // Validation
        if (typeof body.count !== 'number' || body.count < 1) {
            return NextResponse.json({ error: 'Invalid table count' }, { status: 400 });
        }

        // Upsert Setting
        const updated = await prisma.setting.upsert({
            where: { key: 'table_config' },
            create: {
                key: 'table_config',
                value: { count: body.count }
            },
            update: {
                value: { count: body.count }
            }
        });

        return NextResponse.json(updated.value);
    } catch (error) {
        console.error('Error saving tables:', error);
        return NextResponse.json({ error: 'Failed to save tables' }, { status: 500 });
    }
}
