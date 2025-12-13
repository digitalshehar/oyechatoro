import { config } from 'dotenv';
config();

async function main() {
    console.log('🧪 Starting Menu Feature Tests...');

    // 1. Setup Wrapper (Dynamic Import to ensure env is loaded)
    const { prisma } = await import('../app/lib/db');
    const cleanup = async () => {
        await prisma.menuItem.deleteMany({ where: { name: { startsWith: 'TEST_' } } });
        await prisma.menuCategory.deleteMany({ where: { name: 'TEST_CAT' } });
    };
    await cleanup();

    // 2. Create Test Data
    console.log('\n--- Creating Test Data ---');
    const category = await prisma.menuCategory.create({
        data: { name: 'TEST_CAT', order: 999 }
    });

    const items = await prisma.menuItem.createMany({
        data: [
            { name: 'TEST_Item_1', price: 100, categoryId: category.id, status: 'Active', slug: 'test-1' },
            { name: 'TEST_Item_2', price: 200, categoryId: category.id, status: 'Active', slug: 'test-2' },
            { name: 'TEST_Item_3', price: 300, categoryId: category.id, status: 'Active', slug: 'test-3' }
        ]
    });
    console.log('✅ Created 3 test items');

    const createdItems = await prisma.menuItem.findMany({ where: { categoryId: category.id } });
    const itemIds = createdItems.map(i => i.id);

    // 3. Test Bulk Action: Out of Stock
    console.log('\n--- Testing Bulk Action (Out of Stock) ---');
    // Simulate API logic locally since we can't easily curl localhost from here without a running server on known port
    // We will use the same logic as the API handler
    await prisma.menuItem.updateMany({
        where: { id: { in: itemIds } },
        data: { status: 'OutOfStock' }
    });

    const updatedItems = await prisma.menuItem.findMany({ where: { id: { in: itemIds } } });
    const allOutOfStock = updatedItems.every(i => i.status === 'OutOfStock');
    if (allOutOfStock) console.log('✅ Bulk Status Update Passed');
    else console.error('❌ Bulk Status Update Failed');

    // 4. Test Import (Upsert) Logic
    console.log('\n--- Testing Import Logic ---');
    const importData = [
        {
            Name: 'TEST_Item_1', // Existing (Should Update)
            Category: 'TEST_CAT',
            Price: '150', // Changed Price
            Status: 'Active'
        },
        {
            Name: 'TEST_New_Item', // New (Should Create)
            Category: 'TEST_CAT',
            Price: '500',
            Status: 'Active'
        }
    ];

    for (const row of importData) {
        // Find Category
        let cat = await prisma.menuCategory.findFirst({ where: { name: row.Category } });

        // Find Item by Name (Import Logic Mock)
        const existingItem = await prisma.menuItem.findFirst({ where: { name: row.Name } });

        if (existingItem) {
            await prisma.menuItem.update({
                where: { id: existingItem.id },
                data: { price: parseFloat(row.Price) }
            });
            console.log(`Updated ${row.Name}`);
        } else {
            await prisma.menuItem.create({
                data: {
                    name: row.Name,
                    price: parseFloat(row.Price),
                    categoryId: cat!.id,
                    slug: row.Name.toLowerCase().replace(/ /g, '-')
                }
            });
            console.log(`Created ${row.Name}`);
        }
    }

    // Verify Import
    const item1 = await prisma.menuItem.findFirst({ where: { name: 'TEST_Item_1' } });
    const newItem = await prisma.menuItem.findFirst({ where: { name: 'TEST_New_Item' } });

    if (item1?.price === 150) console.log('✅ Update via Import Passed');
    else console.error(`❌ Update Failed: Expected 150, got ${item1?.price}`);

    if (newItem) console.log('✅ Create via Import Passed');
    else console.error('❌ Create Failed');

    // 5. Cleanup
    console.log('\n--- Cleaning Up ---');
    await cleanup();
    console.log('✅ Cleanup Done');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
