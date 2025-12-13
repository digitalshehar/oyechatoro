import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { auth } from '@/auth';
import { logAudit } from '@/app/lib/audit';

// GET all menu items - PUBLIC
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const categoryId = searchParams.get('categoryId') || undefined;
        const isDigital = searchParams.get('digital') === 'true';
        const isTrain = searchParams.get('train') === 'true';

        // Check DB Status before seeding
        // Check DB Status before seeding
        /*
        const count = await prisma.menuItem.count();
        if (count === 0) {
            console.log('Starting Seeding...');

            // Helper to get or create category
            const getOrCreateCategory = async (name: string) => {
                const existing = await prisma.menuCategory.findFirst({ where: { name } });
                if (existing) return existing;
                return await prisma.menuCategory.create({ data: { name } });
            };

            // Seed Categories
            const pizzaCat = await getOrCreateCategory('Pizza');
            const pastaCat = await getOrCreateCategory('Pasta');
            const chaatCat = await getOrCreateCategory('Chaat');

            // Seed Items
            await prisma.menuItem.createMany({
                data: [
                    { name: 'Paneer Tikka Pizza', slug: 'paneer-tikka-pizza', price: 299, description: 'Spicy paneer chunks on a cheesy base', categoryId: pizzaCat.id, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38' },
                    { name: 'Classic Margherita', slug: 'classic-margherita', price: 199, description: 'Classic tomato and basil pizza', categoryId: pizzaCat.id, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002' },
                    { name: 'White Sauce Pasta', slug: 'white-sauce-pasta', price: 249, description: 'Creamy white sauce penne pasta with veggies', categoryId: pastaCat.id, image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb' },
                    { name: 'Red Sauce Pasta', slug: 'red-sauce-pasta', price: 229, description: 'Tangy tomato sauce pasta with basil', categoryId: pastaCat.id, image: 'https://images.unsplash.com/photo-1626844131082-256783844137' },
                    { name: 'Dahi Papdi Chaat', slug: 'dahi-papdi-chaat', price: 129, description: 'Crispy papdi with yogurt and chutneys', categoryId: chaatCat.id, image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027' },
                ]
            });
            console.log('Seeding Complete');
        }
        */

        const items = await prisma.menuItem.findMany({
            where: {
                ...(categoryId && { categoryId }),
                ...(isDigital && { isDigitalMenu: true }),
                ...(isTrain && { isTrainMenu: true }),
            },
            include: { category: true },
            orderBy: [
                { order: 'asc' },
                { name: 'asc' }
            ],
        });

        return NextResponse.json(items);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}

// POST create menu item - Protected
export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

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
                slug: body.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') + '-' + Math.floor(Math.random() * 1000),
            },
        });

        await logAudit('CREATE_MENU_ITEM', 'MenuItem', item.id, { name: item.name });

        return NextResponse.json(item, { status: 201 });
    } catch (error) {
        console.error('Error creating menu item:', error);
        return NextResponse.json({ error: 'Failed to create menu item' }, { status: 500 });
    }
}
