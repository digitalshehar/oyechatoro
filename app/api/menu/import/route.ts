import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { items } = body;

        if (!items || !Array.isArray(items)) {
            return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
        }

        const results = { success: 0, failed: 0, errors: [] as string[] };

        // Process sequentially to handle category creation properly
        for (const row of items) {
            try {
                // Skip empty rows
                if (!row.Name || !row.Category) continue;

                // 1. Find or Create Category
                let category = await prisma.menuCategory.findFirst({
                    where: { name: { equals: row.Category, mode: 'insensitive' } }
                });

                if (!category) {
                    category = await prisma.menuCategory.create({
                        data: { name: row.Category }
                    });
                }

                // 2. Prepare Item Data
                const itemData = {
                    name: row.Name,
                    price: parseFloat(row.Price) || 0,
                    description: row.Description || '',
                    veg: row.Veg === 'Yes',
                    status: row.Status || 'Active',
                    categoryId: category.id,
                    image: row.Image || '',
                    tags: row.Tags ? row.Tags.split(',').map((t: string) => t.trim()) : [],
                    slug: row.Name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') + '-' + Math.floor(Math.random() * 1000)
                };

                // 3. Upsert Item (by ID if present, otherwise Create)
                if (row.ID) {
                    await prisma.menuItem.upsert({
                        where: { id: row.ID },
                        update: {
                            name: itemData.name,
                            price: itemData.price,
                            description: itemData.description,
                            veg: itemData.veg,
                            status: itemData.status as any,
                            categoryId: itemData.categoryId,
                            tags: itemData.tags,
                            image: itemData.image
                        },
                        create: itemData
                    });
                } else {
                    await prisma.menuItem.create({ data: itemData });
                }

                results.success++;
            } catch (err: any) {
                console.error('Row Import Error:', err);
                results.failed++;
                results.errors.push(`Failed to import ${row.Name}: ${err.message}`);
            }
        }

        return NextResponse.json({ message: 'Import completed', results });

    } catch (error) {
        console.error('Import API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
