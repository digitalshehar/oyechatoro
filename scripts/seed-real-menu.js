
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

const categories = [
    { name: 'Pizza', id: 'cat_pizza' },
    { name: 'Chaat', id: 'cat_chaat' },
    { name: 'Sandwich', id: 'cat_sandwich' },
    { name: 'Pasta', id: 'cat_pasta' },
    { name: 'Frankie', id: 'cat_frankie' },
    { name: 'Coffee', id: 'cat_coffee' },
    { name: 'Shake', id: 'cat_shake' },
    { name: 'Burger', id: 'cat_burger' },
    { name: 'Fries', id: 'cat_fries' },
];

const items = [
    // Pizza
    { name: 'Margherita Pizza', price: 149, categoryId: 'cat_pizza', badge: 'Best Seller', description: 'Classic cheese pizza with fresh tomato sauce' },
    { name: 'Veg Cheese Pizza', price: 179, categoryId: 'cat_pizza', description: 'Loaded with fresh vegetables and cheese' },
    { name: 'Cheese Corn Pizza', price: 199, categoryId: 'cat_pizza', description: 'Sweet corn and mozzarella cheese delight' },
    { name: 'Paneer Tikka Pizza', price: 219, categoryId: 'cat_pizza', badge: 'Recommended', description: 'Spicy paneer tikka chunks on pizza' },
    { name: 'Tandoori Paneer Pizza', price: 229, categoryId: 'cat_pizza', badge: 'Must Try', description: 'Smoky tandoori flavors' },
    { name: 'Oye Chatoro Special Pizza', price: 249, categoryId: 'cat_pizza', badge: 'Chef Special', description: 'Our signature fully loaded pizza' },

    // Chaat Corner
    { name: 'Bhel Puri', price: 49, categoryId: 'cat_chaat', badge: 'Best Seller', description: 'Crunchy, tangy, and bursting with flavor! Papdi Chaat' },
    { name: 'Bhel Puri Cheese', price: 79, categoryId: 'cat_chaat', description: 'Crunchy, tangy, and bursting with flavor! Papdi Chaat' },
    { name: 'Dhai Papdi Chaat', price: 49, categoryId: 'cat_chaat', badge: 'Best Seller', description: 'Crispy papdi topped with creamy yogurt and chutneys' },
    { name: 'Papdi Chaat Cheese', price: 79, categoryId: 'cat_chaat', description: 'Crispy papdi topped with creamy with chutneys & namkeen' },
    { name: 'Kurkure Bhel', price: 49, categoryId: 'cat_chaat', badge: 'Recommended', description: 'Extra Crunch, Extra Fun!' },
    { name: 'Kurkure Cheese Bhel', price: 79, categoryId: 'cat_chaat', description: 'Extra Crunch, Extra Fun!' },
    { name: 'Crispy Aloo Chaat', price: 69, categoryId: 'cat_chaat', badge: 'Recommended', description: 'Potato Chaat (Delhi Style)' },
    { name: 'Nachos Chaat', price: 99, categoryId: 'cat_chaat', description: 'Indian Cheesy Style' },
    { name: 'Katori Chaat', price: 99, categoryId: 'cat_chaat', badge: 'Best Seller', description: 'Edible bowl filled with chaat goodness' },
    { name: 'Basket Chaat (6 Pcs)', price: 79, categoryId: 'cat_chaat', description: 'Mini baskets of joy!' },
    { name: 'Raj Kachori', price: 149, categoryId: 'cat_chaat', badge: 'Best Choice' },

    // Sandwich
    { name: 'Bread & Butter', price: 49, categoryId: 'cat_sandwich', badge: 'Best Seller' },
    { name: 'Mix Vegetable Sandwich', price: 89, categoryId: 'cat_sandwich', badge: 'Best Seller' },
    { name: 'Cheese Corn Sandwich', price: 79, categoryId: 'cat_sandwich' },
    { name: 'Aloo Matar Masala Sandwich with Cheese', price: 79, categoryId: 'cat_sandwich' },
    { name: 'Veg Grill Sandwich with Cheese', price: 99, categoryId: 'cat_sandwich', badge: 'Recommended' },
    { name: 'Paneer Tikka Cheese Grilled Sandwich', price: 149, categoryId: 'cat_sandwich' },
    { name: 'Aloo Matar Grill Sandwich', price: 79, categoryId: 'cat_sandwich', badge: 'Recommended' },
    { name: 'Bahubali Sandwich with Cheese', price: 149, categoryId: 'cat_sandwich' },
    { name: 'Masala Junglee Sandwich with Cheese', price: 149, categoryId: 'cat_sandwich' },
    { name: 'Veg Mayo Sandwich with Cheese', price: 49, categoryId: 'cat_sandwich' },
    { name: 'Mumbai Biggest Cheese Grilled Sandwich', price: 179, categoryId: 'cat_sandwich' },

    // Pasta
    { name: 'Street Food Pasta (Spicy)', price: 149, categoryId: 'cat_pasta', badge: 'Recommended' },
    { name: 'White Sauce Pasta', price: 149, categoryId: 'cat_pasta', badge: 'Best Seller' },
    { name: 'Red Sauce Pasta', price: 149, categoryId: 'cat_pasta', badge: 'Best Choice' },
    { name: 'Peri Peri Pasta', price: 149, categoryId: 'cat_pasta' },
    { name: 'Masala Pasta', price: 149, categoryId: 'cat_pasta' },

    // Frankie
    { name: 'Classic Veg. Frankie', price: 69, categoryId: 'cat_frankie' },
    { name: 'Veg Frankie with Paneer', price: 99, categoryId: 'cat_frankie' },
    { name: 'Classic Veg. Frankie Paneer & Cheese', price: 119, categoryId: 'cat_frankie' },
    { name: 'Paneer Tikka Frankie With Cheese', price: 149, categoryId: 'cat_frankie', badge: 'Best Seller' },

    // Coffee
    { name: 'Hot Coffee', price: 59, categoryId: 'cat_coffee', badge: 'Recommended' },
    { name: 'Cold Coffee', price: 69, categoryId: 'cat_coffee', badge: 'Best Seller' },
    { name: 'Cold Coffee with Ice Cream', price: 99, categoryId: 'cat_coffee', badge: 'Best Seller' },

    // Shake
    { name: 'Milk Shake', price: 69, categoryId: 'cat_shake' },
    { name: 'Strawberry Shake', price: 69, categoryId: 'cat_shake' },
    { name: 'Oreo Milkshake', price: 79, categoryId: 'cat_shake', badge: 'Best Seller' },
    { name: 'Pineapple Shake', price: 99, categoryId: 'cat_shake' },
    { name: 'KitKat Shake', price: 119, categoryId: 'cat_shake' },
    { name: 'Kesar Badam Rabdi Milk', price: 89, categoryId: 'cat_shake' },

    // Burger
    { name: 'Classic Tikki Burger', price: 49, categoryId: 'cat_burger', badge: 'Recommended' },
    { name: 'Classic Tikki Burger with Cheese Slice', price: 79, categoryId: 'cat_burger', badge: 'Best Seller' },
    { name: 'Double Tikki Burger', price: 99, categoryId: 'cat_burger', badge: 'Best Choice' },
    { name: 'Double Tikki Burger With Cheese Slice', price: 129, categoryId: 'cat_burger' },

    // Fries
    { name: 'Salted French Fries with Sauce', price: 59, categoryId: 'cat_fries' },
    { name: 'Masala French Fries', price: 69, categoryId: 'cat_fries' },
    { name: 'Peri Peri French Fries', price: 79, categoryId: 'cat_fries', badge: 'Best Seller' },
    { name: 'Tandoori Mayo French Fries', price: 99, categoryId: 'cat_fries' },
    { name: 'Chilli Potato French Fries', price: 119, categoryId: 'cat_fries' },
    { name: 'Spicy Potato French Fries', price: 89, categoryId: 'cat_fries' }
];

async function main() {
    console.log('Start seeding REAL menu data...');

    // 1. Cleanup
    console.log('Cleaning up old menu items and categories...');
    await prisma.menuItem.deleteMany({});
    await prisma.menuCategory.deleteMany({});

    // 2. Create Categories
    console.log('Creating Categories...');
    for (const cat of categories) {
        await prisma.menuCategory.create({
            data: {
                id: cat.id,
                name: cat.name
            }
        });
    }

    // 3. Create Items
    // Image Mappings
    const updates = [
        { keyword: 'Margherita', image: '/images/menu/margherita.png' },
        { keyword: 'Veggie Supreme', image: '/images/menu/veggie_pizza.png' },
        { keyword: 'Vegetable Sandwich', image: '/images/menu/plain_sandwich.png' },
        { keyword: 'Corn', image: '/images/menu/corn_pizza.png' },
        { keyword: 'Dahi Papdi', image: '/images/menu/dahi_papdi.png' },
        { keyword: 'Kachori', image: '/images/menu/kachori.png' },
        { keyword: 'Basket', image: '/images/menu/basket_chaat.png' },
        { keyword: 'Katori', image: '/images/menu/basket_chaat.png' },
        { keyword: 'Bread', image: '/images/menu/plain_sandwich.png' },
        { keyword: 'Peri Peri French', image: '/images/menu/peri_peri_fries.png' },
        { keyword: 'Chilli Potato', image: '/images/menu/peri_peri_fries.png' },
        { keyword: 'Red Sauce', image: '/images/menu/red_pasta.png' },
        { keyword: 'Hot Coffee', image: '/images/menu/hot_coffee.png' },
        { keyword: 'Cold Coffee', image: '/images/menu/cold_coffee.png' },
        { keyword: 'Strawberry', image: '/images/menu/strawberry_shake.png' },
        { keyword: 'KitKat', image: '/images/menu/kitkat_shake.png' },
        { keyword: 'Oreo', image: '/images/menu/oreo_shake.png' },
        { keyword: 'Paneer Tikka Pizza', image: '/images/menu/paneer_pizza.png' },
        { keyword: 'Tandoori Paneer', image: '/images/menu/paneer_pizza.png' },

        { keyword: 'Pizza', image: '/images/menu/pizza.png' },
        { keyword: 'Chaat', image: '/images/menu/chaat.png' },
        { keyword: 'Bhel', image: '/images/menu/chaat.png' },
        { keyword: 'Puri', image: '/images/menu/chaat.png' },
        { keyword: 'Sandwich', image: '/images/menu/sandwich.png' },
        { keyword: 'Burger', image: '/images/menu/burger.png' },
        { keyword: 'Pasta', image: '/images/menu/pasta.png' },
        { keyword: 'Fries', image: '/images/menu/fries.png' },
        { keyword: 'Shake', image: '/images/menu/shake.png' },
        { keyword: 'Coffee', image: '/images/menu/hot_coffee.png' },
        { keyword: 'Frankie', image: '/images/menu/frankie.png' }
    ];

    console.log('Creating Items...');
    for (const item of items) {
        const slug = item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

        let image = null;
        for (const update of updates) {
            if (item.name.toLowerCase().includes(update.keyword.toLowerCase())) {
                image = update.image;
                break;
            }
        }

        await prisma.menuItem.create({
            data: {
                name: item.name,
                slug: slug,
                price: item.price,
                description: item.description,
                badge: item.badge,
                categoryId: item.categoryId,
                veg: true,
                image: image,
                isDigitalMenu: true,
                status: 'Active',
                isFeatured: !!item.badge // If it has a badge, mark as featured for filtering ease if needed
            }
        });
        console.log(`Created: ${item.name}`);
    }

    console.log('Seeding finished successfully.');
}

main()
    .catch((e) => {
        console.error('Seeding error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
