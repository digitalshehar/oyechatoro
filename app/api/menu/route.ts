import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { auth } from '@/auth';
import { logAudit } from '@/app/lib/audit';
import { translateToHindi } from '@/app/lib/local-translator';
import { translateContent } from '@/app/lib/seo-utils';
import { menuItemSchema } from '@/app/lib/validations/menu';
import { z } from 'zod';

// GET all menu items - PUBLIC
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const categoryId = searchParams.get('categoryId') || undefined;
        const isDigital = searchParams.get('digital') === 'true';
        const isTrain = searchParams.get('train') === 'true';

        // Check DB Status before seeding
        // Check DB Status before seeding
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
            const drinksCat = await getOrCreateCategory('Drinks');

            // Seed Items
            await prisma.menuItem.createMany({
                data: [
                    { name: 'Paneer Tikka Pizza', slug: 'paneer-tikka-pizza', price: 299, description: 'Spicy paneer chunks on a cheesy base', categoryId: pizzaCat.id, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38' },
                    { name: 'Classic Margherita', slug: 'classic-margherita', price: 199, description: 'Classic tomato and basil pizza', categoryId: pizzaCat.id, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002' },
                    { name: 'White Sauce Pasta', slug: 'white-sauce-pasta', price: 249, description: 'Creamy white sauce penne pasta with veggies', categoryId: pastaCat.id, image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb' },
                    { name: 'Red Sauce Pasta', slug: 'red-sauce-pasta', price: 229, description: 'Tangy tomato sauce pasta with basil', categoryId: pastaCat.id, image: 'https://images.unsplash.com/photo-1626844131082-256783844137' },
                    { name: 'Dahi Papdi Chaat', slug: 'dahi-papdi-chaat', price: 129, description: 'Crispy papdi with yogurt and chutneys', categoryId: chaatCat.id, image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027' },
                    { name: 'Basket Chaat', slug: 'basket-chaat', price: 149, description: 'Crispy basket filled with sprouts and yogurt', categoryId: chaatCat.id, image: 'https://images.unsplash.com/photo-1515543958914-aa4d690a9c8b?auto=format&fit=crop&q=80' },
                    { name: 'Cold Coffee', slug: 'cold-coffee', price: 149, description: 'Chilled creamy coffee', categoryId: drinksCat.id, image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e' },
                ]
            });
            console.log('Seeding Complete');
        }

        const items = await prisma.menuItem.findMany({
            where: {
                ...(categoryId && { categoryId }),
                ...(isDigital && { isDigitalMenu: true }),
                ...(isTrain && { isTrainMenu: true }),
            },
            include: { category: true },
            orderBy: { order: 'asc' },
        });

        return NextResponse.json(items);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}
