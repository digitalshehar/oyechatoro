
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
    console.log('--- Testing Stock Deduction ---');

    // 1. Get a Menu Item with a Recipe
    const menuItem = await prisma.menuItem.findFirst({
        where: { name: { contains: 'Margherita' } }
    });

    if (!menuItem) throw new Error('Margherita Pizza not found');
    console.log(`Testing with Item: ${menuItem.name}`);

    // 2. Get Ingredient "Pizza Base"
    const ingredientName = 'Pizza Base (7")';
    let base = await prisma.inventoryItem.findFirst({
        where: { name: ingredientName }
    });

    if (!base) throw new Error(`${ingredientName} not found`);
    const startStock = base.currentStock;
    console.log(`Initial Stock of ${ingredientName}: ${startStock}`);

    // 3. Setup Recipe for Testing (If missing)
    if (!menuItem.recipe) {
        console.log('Recipe missing. Adding temporary recipe for testing...');
        const tempRecipe = [
            { inventoryItemId: base.id, quantity: 1, unit: 'pcs' }
        ];
        await prisma.menuItem.update({
            where: { id: menuItem.id },
            data: { recipe: tempRecipe }
        });
        menuItem.recipe = tempRecipe;
    }

    console.log('Simulating Order Placement...');
    const qtyOrdered = 2;

    // Deduct (Simulate same logic as in api/orders/route.ts)
    const recipe = menuItem.recipe;
    if (Array.isArray(recipe)) {
        for (const ingredient of recipe) {
            if (ingredient.inventoryItemId === base.id) {
                const deduction = ingredient.quantity * qtyOrdered;

                await prisma.inventoryItem.update({
                    where: { id: base.id },
                    data: { currentStock: { decrement: deduction } }
                });

                console.log(`Deducted ${deduction} from ${base.name}`);
            }
        }
    }

    // 4. Check Stock Again
    const updatedBase = await prisma.inventoryItem.findUnique({ where: { id: base.id } });
    console.log(`Final Stock of ${ingredientName}: ${updatedBase.currentStock}`);

    const expectedStock = startStock - (1 * qtyOrdered);
    if (Math.abs(updatedBase.currentStock - expectedStock) < 0.01) {
        console.log('SUCCESS: Stock deducted correctly!');
    } else {
        console.log(`WARNING: Stock mismatch. Expected ${expectedStock}, got ${updatedBase.currentStock}`);
        const recipeItem = Array.isArray(recipe) ? recipe.find(r => r.inventoryItemId === base.id) : null;
        console.log(`Recipe requires: ${recipeItem ? recipeItem.quantity : 'N/A'}`);
    }
}

main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
