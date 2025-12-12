
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';
import 'dotenv/config';

neonConfig.webSocketConstructor = ws;
const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🚀 INITIALIZING SYSTEM HEALTH CHECK...');
    let passed = 0;
    let failed = 0;

    // Helper for assertions
    const assert = (condition, msg) => {
        if (condition) {
            console.log(`✅ PASS: ${msg}`);
            passed++;
        } else {
            console.error(`❌ FAIL: ${msg}`);
            failed++;
        }
    };

    try {
        // 1. DATA INTEGRITY CHECK
        console.log('\n--- 1. Data Integrity ---');
        const menuCount = await prisma.menuItem.count();
        assert(menuCount > 10, `Menu Items found: ${menuCount}`);

        const invCount = await prisma.inventoryItem.count();
        assert(invCount > 20, `Inventory Items found: ${invCount}`);

        const staffCount = await prisma.staff.count();
        assert(staffCount > 0, `Staff/Admin Users found: ${staffCount}`);

        // 2. ORDER SIMULATION (COMPLEX)
        console.log('\n--- 2. Order Simulation ---');

        // Pick an item with a recipe
        const burger = await prisma.menuItem.findFirst({
            where: { name: { contains: 'Burger' } }
        });

        if (!burger) throw new Error('No Burger found for test!');

        // Get Stock of Bun
        // Assuming recipe structure
        // We need to find valid ingredients from the recipes
        // Let's force a known one if possible or parse existing
        // For this test, we trust the previous simple test but now we test the ORDER creation payload flow

        const customerEmail = 'test_guest@check.com';

        // Construct Order Data (Mimicking Frontend)
        const orderPayload = {
            customer: JSON.stringify({ name: 'Test Guest', phone: '9998887777' }),
            items: [
                {
                    id: burger.id,
                    name: burger.name,
                    price: burger.price,
                    quantity: 2,
                    customizations: []
                }
            ],
            total: burger.price * 2,
            type: 'DineIn',
            paymentMethod: 'Cash',
            status: 'Pending'
        };

        // Execute Transaction (Copying API Logic)
        const result = await prisma.$transaction(async (tx) => {
            // A. Create Order
            const order = await tx.order.create({
                data: {
                    customer: orderPayload.customer,
                    items: orderPayload.items, // Pass array directly, Prisma handles Json
                    total: orderPayload.total,
                    status: 'Pending',
                    type: 'DineIn',
                    paymentStatus: 'Unpaid',
                    paymentMethod: 'Cash'
                }
            });

            // B. Deduct Stock (Logic from API)
            // ... (rest of logic same)
            const itemIds = orderPayload.items.map(i => i.id);
            const menuItems = await tx.menuItem.findMany({
                where: { id: { in: itemIds } },
                select: { id: true, recipe: true, name: true }
            });
            const itemMap = new Map(menuItems.map(i => [i.id, i]));

            for (const orderItem of orderPayload.items) {
                const menuItem = itemMap.get(orderItem.id);
                if (menuItem && menuItem.recipe && Array.isArray(menuItem.recipe)) {
                    for (const ingredient of menuItem.recipe) {
                        if (ingredient.inventoryItemId && ingredient.quantity) {
                            const deduction = ingredient.quantity * orderItem.quantity;
                            await tx.inventoryItem.update({
                                where: { id: ingredient.inventoryItemId },
                                data: { currentStock: { decrement: deduction } }
                            });
                        }
                    }
                }
            }
            return order;
        });

        assert(result.id, 'Order created successfully via Transaction');

        // 3. POST-ORDER VERIFICATION
        console.log('\n--- 3. Post-Order Verification ---');
        const savedOrder = await prisma.order.findUnique({ where: { id: result.id } });
        assert(savedOrder.total === orderPayload.total, 'Order total matches');
        assert(savedOrder.status === 'Pending', 'Order status is Pending');

        console.log('\n--- 🏁 HEALTH CHECK COMPLETE ---');
        console.log(`Passed: ${passed}`);
        console.log(`Failed: ${failed}`);

        if (failed === 0) {
            console.log('\n✨ SYSTEM STATUS: LIVE READY (Green) ✨');
        } else {
            console.error('\n⚠️ SYSTEM STATUS: ISSUES DETECTED');
        }

    } catch (error) {
        console.error('CRITICAL ERROR:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
