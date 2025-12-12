
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';
import 'dotenv/config';

neonConfig.webSocketConstructor = ws;
const connectionString = process.env.DATABASE_URL;
// Use adapter if URL implies neon, else just prisma
// Assuming the user setup is consistent with migrate-posts.js
const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

async function updateMenuImages() {
    console.log('Starting menu image update...');

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
        { keyword: 'Chilli Potato', image: '/images/menu/peri_peri_fries.png' }, // Spicy/Red check
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

    const items = await prisma.menuItem.findMany();
    console.log(`Found ${items.length} items.`);

    for (const item of items) {
        let newImage = null;
        for (const update of updates) {
            if (item.name.toLowerCase().includes(update.keyword.toLowerCase())) {
                newImage = update.image;
                break; // Stop at first match
            }
        }

        if (newImage) {
            await prisma.menuItem.update({
                where: { id: item.id },
                data: { image: newImage }
            });
            console.log(`Updated ${item.name} -> ${newImage}`);
        }
    }

    console.log('Menu images updated successfully.');
}

updateMenuImages()
    .catch(console.error)
    .finally(async () => await prisma.$disconnect());
