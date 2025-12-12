
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { auth } from '@/auth';

// GET all categories
export async function GET() {
    try {
        const categories = await prisma.blogCategory.findMany({
            orderBy: { name: 'asc' },
        });
        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }
}

// POST create category
export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        // if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const body = await request.json();
        const category = await prisma.blogCategory.create({
            data: {
                name: body.name,
                slug: body.slug || body.name.toLowerCase().replace(/ /g, '-'),
            },
        });
        return NextResponse.json(category, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
    }
}
