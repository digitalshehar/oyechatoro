
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';
import 'dotenv/config';

// Configure WebSocket for Node.js environment
neonConfig.webSocketConstructor = ws;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    console.error('Error: DATABASE_URL environment variable is missing.');
    process.exit(1);
}

// Setup Neon Adapter
const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

const ingredients = [
    { name: 'Pizza Base (7")', unit: 'pcs', lowStockAlert: 20, currentStock: 100, category: 'Base' },
    { name: 'Burger Bun', unit: 'pcs', lowStockAlert: 20, currentStock: 100, category: 'Base' },
    { name: 'Sandwich Bread', unit: 'pcs', lowStockAlert: 20, currentStock: 50, category: 'Base' }, // Loaf or Slices? Assuming slices/pcs for simplicity
    { name: 'Frankie Roti', unit: 'pcs', lowStockAlert: 20, currentStock: 100, category: 'Base' },

    { name: 'Mozzarella Cheese', unit: 'kg', lowStockAlert: 5, currentStock: 20, category: 'Dairy' },
    { name: 'Slice Cheese', unit: 'pcs', lowStockAlert: 50, currentStock: 200, category: 'Dairy' },
    { name: 'Milk', unit: 'l', lowStockAlert: 10, currentStock: 50, category: 'Dairy' },
    { name: 'Paneer', unit: 'kg', lowStockAlert: 5, currentStock: 15, category: 'Dairy' },
    { name: 'Butter', unit: 'kg', lowStockAlert: 2, currentStock: 10, category: 'Dairy' },
    { name: 'Ice Cream (Vanilla)', unit: 'l', lowStockAlert: 5, currentStock: 20, category: 'Dairy' },

    { name: 'Tomato', unit: 'kg', lowStockAlert: 5, currentStock: 20, category: 'Produce' },
    { name: 'Onion', unit: 'kg', lowStockAlert: 5, currentStock: 20, category: 'Produce' },
    { name: 'Capsicum', unit: 'kg', lowStockAlert: 5, currentStock: 15, category: 'Produce' },
    { name: 'Potato', unit: 'kg', lowStockAlert: 10, currentStock: 50, category: 'Produce' },
    { name: 'Sweet Corn', unit: 'kg', lowStockAlert: 2, currentStock: 10, category: 'Produce' },

    { name: 'Pizza Sauce', unit: 'kg', lowStockAlert: 2, currentStock: 10, category: 'Sauce' },
    { name: 'Mayonnaise', unit: 'kg', lowStockAlert: 2, currentStock: 10, category: 'Sauce' },
    { name: 'Tandoori Sauce', unit: 'kg', lowStockAlert: 1, currentStock: 5, category: 'Sauce' },
    { name: 'Tomato Ketchup', unit: 'kg', lowStockAlert: 5, currentStock: 20, category: 'Sauce' },
    { name: 'Red Pasta Sauce', unit: 'kg', lowStockAlert: 2, currentStock: 10, category: 'Sauce' },
    { name: 'White Pasta Sauce', unit: 'kg', lowStockAlert: 2, currentStock: 10, category: 'Sauce' },

    { name: 'French Fries (Frozen)', unit: 'kg', lowStockAlert: 10, currentStock: 50, category: 'Frozen' },
    { name: 'Aloo Tikki (Frozen)', unit: 'pcs', lowStockAlert: 20, currentStock: 100, category: 'Frozen' },

    { name: 'Coffee Powder', unit: 'kg', lowStockAlert: 1, currentStock: 5, category: 'Pantry' },
    { name: 'Sugar', unit: 'kg', lowStockAlert: 5, currentStock: 20, category: 'Pantry' },
    { name: 'Salt', unit: 'kg', lowStockAlert: 2, currentStock: 10, category: 'Pantry' },
    { name: 'Oil', unit: 'l', lowStockAlert: 10, currentStock: 50, category: 'Pantry' },
    { name: 'Pasta (Raw)', unit: 'kg', lowStockAlert: 5, currentStock: 20, category: 'Pantry' },
    { name: 'Sev (Nylon)', unit: 'kg', lowStockAlert: 2, currentStock: 10, category: 'Pantry' },
    { name: 'Papdi', unit: 'kg', lowStockAlert: 2, currentStock: 10, category: 'Pantry' },
    { name: 'Puffed Rice (Mamra)', unit: 'kg', lowStockAlert: 2, currentStock: 10, category: 'Pantry' },
    { name: 'KitKat', unit: 'pcs', lowStockAlert: 10, currentStock: 50, category: 'Pantry' },
    { name: 'Oreo', unit: 'pcs', lowStockAlert: 10, currentStock: 50, category: 'Pantry' },
];

async function main() {
    console.log('Seeding Inventory...');

    // 1. Upsert Ingredients (prevent duplicates)
    // We map name -> ID for recipe mapping later
    const ingredientMap = {};

    for (const ing of ingredients) {
        // Find or create
        const existing = await prisma.inventoryItem.findFirst({
            where: { name: ing.name }
        });

        let item;
        if (existing) {
            item = await prisma.inventoryItem.update({
                where: { id: existing.id },
                data: ing
            });
            console.log(`Updated: ${item.name}`);
        } else {
            item = await prisma.inventoryItem.create({
                data: {
                    name: ing.name,
                    unit: ing.unit,
                    currentStock: ing.currentStock,
                    lowStockAlert: ing.lowStockAlert,
                    category: ing.category
                }
            });
            console.log(`Created: ${item.name}`);
        }
        ingredientMap[item.name] = item.id;
    }

    // 2. Map Recipes
    console.log('Mapping Recipes to Menu Items...');
    const menuItems = await prisma.menuItem.findMany();

    // Helper to get ID
    const getID = (name) => {
        if (!ingredientMap[name]) console.warn(`Warning: Ingredient '${name}' not found!`);
        return ingredientMap[name];
    };

    for (const item of menuItems) {
        let recipe = [];
        const name = item.name.toLowerCase();
        const cat = item.categoryId; // cat_pizza, cat_burger, etc.

        // --- PIZZA ---
        if (cat === 'cat_pizza') {
            recipe.push({ inventoryItemId: getID('Pizza Base (7")'), quantity: 1 });
            recipe.push({ inventoryItemId: getID('Pizza Sauce'), quantity: 0.05 }); // 50g
            recipe.push({ inventoryItemId: getID('Mozzarella Cheese'), quantity: 0.1 }); // 100g

            if (name.includes('corn')) recipe.push({ inventoryItemId: getID('Sweet Corn'), quantity: 0.05 });
            if (name.includes('paneer')) recipe.push({ inventoryItemId: getID('Paneer'), quantity: 0.05 });
            if (name.includes('veggie') || name.includes('farm')) {
                recipe.push({ inventoryItemId: getID('Onion'), quantity: 0.03 });
                recipe.push({ inventoryItemId: getID('Capsicum'), quantity: 0.03 });
                recipe.push({ inventoryItemId: getID('Tomato'), quantity: 0.03 });
            }
        }

        // --- BURGER ---
        if (cat === 'cat_burger') {
            recipe.push({ inventoryItemId: getID('Burger Bun'), quantity: 1 });
            recipe.push({ inventoryItemId: getID('Aloo Tikki (Frozen)'), quantity: name.includes('double') ? 2 : 1 });
            recipe.push({ inventoryItemId: getID('Mayonnaise'), quantity: 0.02 });
            recipe.push({ inventoryItemId: getID('Onion'), quantity: 0.02 });
            recipe.push({ inventoryItemId: getID('Tomato'), quantity: 0.02 });
            if (name.includes('cheese')) recipe.push({ inventoryItemId: getID('Slice Cheese'), quantity: 1 });
        }

        // --- SANDWICH ---
        if (cat === 'cat_sandwich') {
            recipe.push({ inventoryItemId: getID('Sandwich Bread'), quantity: name.includes('bahubali') ? 3 : 2 });
            recipe.push({ inventoryItemId: getID('Butter'), quantity: 0.01 });
            if (name.includes('cheese')) recipe.push({ inventoryItemId: getID('Mozzarella Cheese'), quantity: 0.03 });
            if (name.includes('corn')) recipe.push({ inventoryItemId: getID('Sweet Corn'), quantity: 0.03 });
            if (name.includes('paneer')) recipe.push({ inventoryItemId: getID('Paneer'), quantity: 0.05 });
            if (name.includes('veg') || name.includes('masala')) {
                recipe.push({ inventoryItemId: getID('Potato'), quantity: 0.05 }); // Aloo masala base
            }
        }

        // --- FRIES ---
        if (cat === 'cat_fries') {
            recipe.push({ inventoryItemId: getID('French Fries (Frozen)'), quantity: 0.2 }); // 200g
            recipe.push({ inventoryItemId: getID('Oil'), quantity: 0.02 }); // Absorption
            if (name.includes('peri peri') || name.includes('masala')) recipe.push({ inventoryItemId: getID('Salt'), quantity: 0.005 });
        }

        // --- PASTA ---
        if (cat === 'cat_pasta') {
            recipe.push({ inventoryItemId: getID('Pasta (Raw)'), quantity: 0.15 }); // 150g
            if (name.includes('red')) recipe.push({ inventoryItemId: getID('Red Pasta Sauce'), quantity: 0.1 });
            if (name.includes('white')) recipe.push({ inventoryItemId: getID('White Pasta Sauce'), quantity: 0.1 });
            recipe.push({ inventoryItemId: getID('Mozzarella Cheese'), quantity: 0.02 });
        }

        // --- COFFEE ---
        if (item.name === 'Hot Coffee') {
            recipe.push({ inventoryItemId: getID('Milk'), quantity: 0.15 }); // 150ml
            recipe.push({ inventoryItemId: getID('Coffee Powder'), quantity: 0.01 }); // 10g
            recipe.push({ inventoryItemId: getID('Sugar'), quantity: 0.01 });
        }

        if (item.name.includes('Cold Coffee')) {
            recipe.push({ inventoryItemId: getID('Milk'), quantity: 0.25 }); // 250ml
            recipe.push({ inventoryItemId: getID('Coffee Powder'), quantity: 0.01 });
            recipe.push({ inventoryItemId: getID('Sugar'), quantity: 0.02 });
            if (name.includes('ice cream')) recipe.push({ inventoryItemId: getID('Ice Cream (Vanilla)'), quantity: 0.05 }); // 1 scoop
        }

        // --- SHAKE ---
        if (cat === 'cat_shake') {
            recipe.push({ inventoryItemId: getID('Milk'), quantity: 0.3 }); // 300ml
            recipe.push({ inventoryItemId: getID('Sugar'), quantity: 0.02 });
            if (name.includes('oreo')) recipe.push({ inventoryItemId: getID('Oreo'), quantity: 3 });
            if (name.includes('kitkat')) recipe.push({ inventoryItemId: getID('KitKat'), quantity: 1 });
            if (name.includes('strawberry')) recipe.push({ inventoryItemId: getID('Ice Cream (Vanilla)'), quantity: 0.05 }); // Base
        }

        // --- CHAAT ---
        if (cat === 'cat_chaat') {
            if (name.includes('puri') || name.includes('bhel')) {
                recipe.push({ inventoryItemId: getID('Puffed Rice (Mamra)'), quantity: 0.1 });
                recipe.push({ inventoryItemId: getID('Sev (Nylon)'), quantity: 0.02 });
            }
            if (name.includes('papdi')) recipe.push({ inventoryItemId: getID('Papdi'), quantity: 0.1 });
            if (name.includes('cheese')) recipe.push({ inventoryItemId: getID('Mozzarella Cheese'), quantity: 0.03 });
        }


        // Update Recipe in DB
        if (recipe.length > 0) {
            // Filter out any undefineds if ID lookup failed
            const validRecipe = recipe.filter(r => r.inventoryItemId);

            await prisma.menuItem.update({
                where: { id: item.id },
                data: {
                    recipe: validRecipe // Set the JSON field
                }
            });
            console.log(`Mapped recipe for: ${item.name} (${validRecipe.length} ingredients)`);
        }
    }

    console.log('Inventory Seeding & Recipe Mapping Complete.');
}

main()
    .catch((e) => {
        console.error('Error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
