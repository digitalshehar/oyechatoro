
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'app/lib/data.ts');
let content = fs.readFileSync(filePath, 'utf-8');

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

// Helper to find image line relative to name line? 
// The file structure is consistent:
// {
//    name: '...',
//    ...
//    image: '...'
// }
// We can use regex to find the block.

// Regex to capture the object: { ... name: '...', ... image: '...' }
// But across lines.
// Simpler approach: Split by item block start '{' ? No too messy.

// Better approach: Iterate lines. Track current item name. When finding `image: '...'`, replace if matches name.

const lines = content.split('\n');
let currentItemName = '';

const newLines = lines.map(line => {
    // Check for name property
    const nameMatch = line.match(/name:\s*['"](.+)['"]/);
    if (nameMatch) {
        currentItemName = nameMatch[1];
        return line;
    }

    // Check for image property
    if (line.trim().startsWith('image:')) {
        let newImage = null;
        for (const update of updates) {
            if (currentItemName.toLowerCase().includes(update.keyword.toLowerCase())) {
                newImage = update.image;
                break;
            }
        }

        if (newImage) {
            // Preserve indentation and comma
            const indent = line.match(/^\s*/)[0];
            const hasComma = line.trim().endsWith(',');
            return `${indent}image: '${newImage}'${hasComma ? ',' : ''}`;
        }
    }

    return line;
});

fs.writeFileSync(filePath, newLines.join('\n'), 'utf-8');
console.log('Updated app/lib/data.ts');
