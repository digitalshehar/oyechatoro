
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { auth } from '@/auth';

// GET all tags
export async function GET() {
    try {
        const tags = await prisma.blogTag.findMany({
            orderBy: { name: 'asc' },
        });
        return NextResponse.json(tags);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 });
    }
}

// POST create tag
export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        // if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const body = await request.json();
        const tag = await prisma.blogTag.create({
            data: {
                name: body.name,
                slug: body.slug || body.name.toLowerCase().replace(/ /g, '-'),
            },
        });
        return NextResponse.json(tag, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create tag' }, { status: 500 });
    }
}
