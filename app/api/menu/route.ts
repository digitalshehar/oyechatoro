import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';

// GET all menu items with categories
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const categoryId = searchParams.get('category');
        const isDigital = searchParams.get('digital') === 'true';
        const isTrain = searchParams.get('train') === 'true';

        const items = await prisma.menuItem.findMany({
            where: {
                ...(categoryId && { categoryId }),
                ...(isDigital && { isDigitalMenu: true }),
                ...(isTrain && { isTrainMenu: true }),
            },
            include: { category: true },
            orderBy: { name: 'asc' },
        });

        return NextResponse.json(items);
    } catch (error) {
        console.error('Error fetching menu:', error);
        return NextResponse.json({ error: 'Failed to fetch menu' }, { status: 500 });
    }
}

// POST create menu item
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const item = await prisma.menuItem.create({
            data: {
                name: body.name,
                price: body.price,
                description: body.description,
                veg: body.veg ?? true,
                status: body.status || 'Active',
                image: body.image,
                isDigitalMenu: body.isDigitalMenu ?? true,
                isTrainMenu: body.isTrainMenu ?? false,
                isFeatured: body.isFeatured ?? false,
                costPrice: body.costPrice,
                recipe: body.recipe,
                categoryId: body.categoryId,
            },
        });

        return NextResponse.json(item, { status: 201 });
    } catch (error) {
        console.error('Error creating menu item:', error);
        return NextResponse.json({ error: 'Failed to create menu item' }, { status: 500 });
    }
}
