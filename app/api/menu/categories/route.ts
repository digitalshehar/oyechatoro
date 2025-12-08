import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';

// GET all categories
export async function GET() {
    try {
        const categories = await prisma.menuCategory.findMany({
            include: { items: true },
            orderBy: { name: 'asc' },
        });

        return NextResponse.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }
}

// POST create category
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const category = await prisma.menuCategory.create({
            data: { name: body.name },
        });

        return NextResponse.json(category, { status: 201 });
    } catch (error) {
        console.error('Error creating category:', error);
        return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
    }
}
