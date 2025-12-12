export interface MenuItem {
    name: string;
    price: number;
    category: string;
    desc: string;
    veg: boolean;
    image?: string;
    emoji: string;
    badge?: string; // Best Seller, Recommended, Best Choice
}

export const MENU_ITEMS: MenuItem[] = [
    // ========== PIZZA ==========
    {
        name: 'Classic Margherita (Regular 7")',
        price: 149,
        category: 'pizza',
        desc: 'Fresh tomato sauce with mozzarella cheese.',
        veg: true,
        emoji: '🍕',
        badge: 'Best Seller',
        image: '/images/menu/margherita.png'
    },
    {
        name: 'Garden Feast (Regular 7")',
        price: 189,
        category: 'pizza',
        desc: 'Loaded with fresh garden vegetables.',
        veg: true,
        emoji: '🍕',
        image: '/images/menu/pizza.png'
    },
    {
        name: 'Paneer Tikka Pizza (Regular 7")',
        price: 199,
        category: 'pizza',
        desc: 'Spicy paneer tikka with onions & capsicum.',
        veg: true,
        emoji: '🍕',
        badge: 'Best Seller',
        image: '/images/menu/paneer_pizza.png'
    },
    {
        name: 'Veggie Supreme (Regular 7")',
        price: 199,
        category: 'pizza',
        desc: 'Ultimate veggie loaded pizza.',
        veg: true,
        emoji: '🍕',
        badge: 'Recommended',
        image: '/images/menu/veggie_pizza.png'
    },
    {
        name: 'Veg Loaded (Regular 7")',
        price: 169,
        category: 'pizza',
        desc: 'Extra vegetables, extra taste!',
        veg: true,
        emoji: '🍕',
        image: '/images/menu/pizza.png'
    },
    {
        name: 'Farm Fresh Pizza (Regular 7")',
        price: 189,
        category: 'pizza',
        desc: 'Fresh farm vegetables with herbs.',
        veg: true,
        emoji: '🍕',
        image: '/images/menu/pizza.png'
    },
    {
        name: 'Cheese Overload (Regular 7")',
        price: 189,
        category: 'pizza',
        desc: 'Extra cheese for cheese lovers!',
        veg: true,
        emoji: '🍕',
        badge: 'Best Choice',
        image: '/images/menu/pizza.png'
    },
    {
        name: 'Peri Peri Veggie (Regular 7")',
        price: 199,
        category: 'pizza',
        desc: 'Spicy peri peri flavored veggie pizza.',
        veg: true,
        emoji: '🍕',
        image: '/images/menu/pizza.png'
    },
    {
        name: 'Creamy Mushroom Garlic (Regular 7")',
        price: 209,
        category: 'pizza',
        desc: 'Creamy garlic sauce with mushrooms.',
        veg: true,
        emoji: '🍕',
        image: '/images/menu/pizza.png'
    },
    {
        name: 'Paneer Tikka Butter Masala (Regular 7")',
        price: 199,
        category: 'pizza',
        desc: 'Butter masala base with paneer tikka.',
        veg: true,
        emoji: '🍕',
        badge: 'Best Seller',
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&h=400&fit=crop'
    },
    {
        name: 'Tandoori Paneer Blast (Regular 7")',
        price: 209,
        category: 'pizza',
        desc: 'Tandoori flavored paneer pizza.',
        veg: true,
        emoji: '🍕',
        image: '/images/menu/paneer_pizza.png'
    },
    {
        name: 'Mexican Treat (Regular 7")',
        price: 199,
        category: 'pizza',
        desc: 'Mexican style spicy pizza.',
        veg: true,
        emoji: '🍕',
        image: '/images/menu/pizza.png'
    },
    {
        name: '5 Pepper Pizza (Regular 7")',
        price: 219,
        category: 'pizza',
        desc: 'Five different peppers for spice lovers!',
        veg: true,
        emoji: '🍕',
        badge: 'Best Choice',
        image: '/images/menu/pizza.png'
    },
    {
        name: 'Abu Road Supreme (Regular 7")',
        price: 219,
        category: 'pizza',
        desc: 'Our signature special pizza!',
        veg: true,
        emoji: '🍕',
        badge: 'Best Seller',
        image: '/images/menu/pizza.png'
    },
    {
        name: 'Spicy Volcano (Regular 7")',
        price: 199,
        category: 'pizza',
        desc: 'Extra hot & spicy pizza.',
        veg: true,
        emoji: '🍕',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=400&fit=crop'
    },
    {
        name: 'Corn & Cheese Burst (Regular 7")',
        price: 169,
        category: 'pizza',
        desc: 'Sweet corn with cheesy burst.',
        veg: true,
        emoji: '🍕',
        image: '/images/menu/corn_pizza.png'
    },
    {
        name: 'Desi Masala Tadka (Regular 7")',
        price: 179,
        category: 'pizza',
        desc: 'Indian masala flavored pizza.',
        veg: true,
        emoji: '🍕',
        badge: 'Recommended',
        image: '/images/menu/pizza.png'
    },
    {
        name: 'Veg Supreme Deluxe (Regular 7")',
        price: 199,
        category: 'pizza',
        desc: 'Premium veggie supreme with extra toppings.',
        veg: true,
        emoji: '🍕',
        image: '/images/menu/pizza.png'
    },

    // ========== CHAAT CORNER ==========
    {
        name: 'Bhel Puri',
        price: 49,
        category: 'chaat',
        desc: 'Crunchy, tangy, and bursting with flavor! Papdi chaat.',
        veg: true,
        emoji: '🥘',
        badge: 'Best Seller',
        image: '/images/menu/chaat.png'
    },
    {
        name: 'Bhel Puri Cheese',
        price: 79,
        category: 'chaat',
        desc: 'Classic bhel puri with extra cheese topping.',
        veg: true,
        emoji: '🥘',
        image: '/images/menu/chaat.png'
    },
    {
        name: 'Dahi Papdi Chaat',
        price: 49,
        category: 'chaat',
        desc: 'Crispy papdi topped with creamy yogurt and chutneys.',
        veg: true,
        emoji: '🥘',
        badge: 'Best Seller',
        image: '/images/menu/dahi_papdi.png'
    },
    {
        name: 'Papdi Chaat Cheese',
        price: 79,
        category: 'chaat',
        desc: 'Crispy papdi topped with creamy chutneys & namkeen.',
        veg: true,
        emoji: '🥘',
        image: '/images/menu/chaat.png'
    },
    {
        name: 'Kurkure Bhel',
        price: 49,
        category: 'chaat',
        desc: 'Extra crunch, extra fun!',
        veg: true,
        emoji: '🥘',
        badge: 'Recommended',
        image: '/images/menu/chaat.png'
    },
    {
        name: 'Kurkure Cheese Bhel',
        price: 79,
        category: 'chaat',
        desc: 'Extra crunch with cheesy goodness!',
        veg: true,
        emoji: '🥘',
        image: '/images/menu/chaat.png'
    },
    {
        name: 'Crispy Aloo Chaat',
        price: 69,
        category: 'chaat',
        desc: 'Potato chaat (Delhi Style).',
        veg: true,
        emoji: '🥘',
        badge: 'Recommended',
        image: '/images/menu/chaat.png'
    },
    {
        name: 'Nachos Chaat',
        price: 99,
        category: 'chaat',
        desc: 'Indian cheesy style nachos.',
        veg: true,
        emoji: '🥘',
        image: '/images/menu/chaat.png'
    },
    {
        name: 'Katori Chaat',
        price: 49,
        category: 'chaat',
        desc: 'Edible bowl filled with chaat goodness.',
        veg: true,
        emoji: '🥘',
        badge: 'Best Seller',
        image: '/images/menu/basket_chaat.png'
    },
    {
        name: 'Basket Chaat (6 pcs)',
        price: 79,
        category: 'chaat',
        desc: 'Mini baskets of joy!',
        veg: true,
        emoji: '🥘',
        image: '/images/menu/basket_chaat.png'
    },
    {
        name: 'Raj Kachori',
        price: 149,
        category: 'chaat',
        desc: 'Royal crispy kachori filled with curd, chutneys & more.',
        veg: true,
        emoji: '🥘',
        badge: 'Best Choice',
        image: '/images/menu/kachori.png'
    },

    // ========== SANDWICH - NON GRILLED ==========
    {
        name: 'Bread & Butter',
        price: 49,
        category: 'sandwich',
        desc: 'Simple and classic bread with butter.',
        veg: true,
        emoji: '🥪',
        badge: 'Best Seller',
        image: '/images/menu/plain_sandwich.png'
    },
    {
        name: 'Mix Vegetable Sandwich',
        price: 89,
        category: 'sandwich',
        desc: 'Fresh veggies layered in soft bread.',
        veg: true,
        emoji: '🥪',
        badge: 'Best Seller',
        image: '/images/menu/plain_sandwich.png'
    },
    {
        name: 'Cheese Corn Sandwich',
        price: 79,
        category: 'sandwich',
        desc: 'Sweet corn and melted cheese in bread.',
        veg: true,
        emoji: '🥪',
        image: '/images/menu/corn_pizza.png'
    },

    // ========== SANDWICH - GRILLED ==========
    {
        name: 'Aloo Matar Masala Sandwich',
        price: 79,
        category: 'sandwich',
        desc: 'Grilled sandwich with aloo matar filling & cheese.',
        veg: true,
        emoji: '🥪',
        image: '/images/menu/sandwich.png'
    },
    {
        name: 'Veg Grill Sandwich',
        price: 99,
        category: 'sandwich',
        desc: 'Loaded veggies grilled with cheese.',
        veg: true,
        emoji: '🥪',
        badge: 'Recommended',
        image: '/images/menu/sandwich.png'
    },
    {
        name: 'Paneer Tikka Cheese Grilled Sandwich',
        price: 149,
        category: 'sandwich',
        desc: 'Spiced paneer tikka with melted cheese.',
        veg: true,
        emoji: '🥪',
        image: '/images/menu/sandwich.png'
    },
    {
        name: 'Aloo Matar Grill Sandwich',
        price: 79,
        category: 'sandwich',
        desc: 'Classic aloo matar grilled to perfection.',
        veg: true,
        emoji: '🥪',
        badge: 'Recommended',
        image: '/images/menu/sandwich.png'
    },
    {
        name: 'Bahubali Sandwich',
        price: 149,
        category: 'sandwich',
        desc: 'Mega grilled sandwich loaded with cheese.',
        veg: true,
        emoji: '🥪',
        image: '/images/menu/sandwich.png'
    },
    {
        name: 'Masala Junglee Sandwich',
        price: 149,
        category: 'sandwich',
        desc: 'Spicy masala filling with cheese.',
        veg: true,
        emoji: '🥪',
        image: '/images/menu/sandwich.png'
    },
    {
        name: 'Veg Mayo Sandwich',
        price: 49,
        category: 'sandwich',
        desc: 'Creamy mayo with fresh veggies.',
        veg: true,
        emoji: '🥪',
        image: '/images/menu/sandwich.png'
    },
    {
        name: 'Mumbai Biggest Cheese Grilled Sandwich',
        price: 179,
        category: 'sandwich',
        desc: 'Live & Fresh – Preparation Time 15-20 Min.',
        veg: true,
        emoji: '🥪',
        image: '/images/menu/sandwich.png'
    },

    // ========== PASTA ==========
    {
        name: 'Street Food Pasta (Spicy)',
        price: 149,
        category: 'pasta',
        desc: 'Hot & spicy street style pasta.',
        veg: true,
        emoji: '🍝',
        badge: 'Recommended',
        image: '/images/menu/pasta.png'
    },
    {
        name: 'White Sauce Pasta',
        price: 149,
        category: 'pasta',
        desc: 'Creamy cheesy sauce with exotic vegetables.',
        veg: true,
        emoji: '🍝',
        badge: 'Best Seller',
        image: '/images/menu/pasta.png'
    },
    {
        name: 'Red Sauce Pasta',
        price: 149,
        category: 'pasta',
        desc: 'Tangy tomato basil sauce with italian herbs.',
        veg: true,
        emoji: '🍝',
        badge: 'Best Choice',
        image: '/images/menu/red_pasta.png'
    },
    {
        name: 'Peri Peri Pasta',
        price: 149,
        category: 'pasta',
        desc: 'Spicy peri peri sauce with veggies.',
        veg: true,
        emoji: '🍝',
        image: '/images/menu/pasta.png'
    },
    {
        name: 'Masala Pasta',
        price: 149,
        category: 'pasta',
        desc: 'Indian style masala pasta.',
        veg: true,
        emoji: '🍝',
        image: '/images/menu/pasta.png'
    },

    // ========== FRANKIE ==========
    {
        name: 'Classic Veg Frankie',
        price: 69,
        category: 'frankie',
        desc: 'Classic vegetable frankie roll.',
        veg: true,
        emoji: '🌯',
        image: '/images/menu/frankie.png'
    },
    {
        name: 'Veg Frankie with Paneer',
        price: 99,
        category: 'frankie',
        desc: 'Frankie roll stuffed with paneer.',
        veg: true,
        emoji: '🌯',
        image: '/images/menu/frankie.png'
    },
    {
        name: 'Classic Veg Frankie Paneer & Cheese',
        price: 119,
        category: 'frankie',
        desc: 'Loaded with paneer and cheese.',
        veg: true,
        emoji: '🌯',
        image: '/images/menu/frankie.png'
    },
    {
        name: 'Paneer Tikka Frankie with Cheese',
        price: 149,
        category: 'frankie',
        desc: 'Tandoori paneer with a tikka twist.',
        veg: true,
        emoji: '🌯',
        badge: 'Best Seller',
        image: '/images/menu/frankie.png'
    },

    // ========== BURGER ==========
    {
        name: 'Classic Tikki Burger',
        price: 49,
        category: 'burger',
        desc: 'Hot & spicy classic tikki burger.',
        veg: true,
        emoji: '🍔',
        badge: 'Recommended',
        image: '/images/menu/burger.png'
    },
    {
        name: 'Classic Tikki Burger with Cheese Slice',
        price: 79,
        category: 'burger',
        desc: 'Tikki burger with melted cheese slice.',
        veg: true,
        emoji: '🍔',
        badge: 'Best Seller',
        image: '/images/menu/burger.png'
    },
    {
        name: 'Double Tikki Burger',
        price: 99,
        category: 'burger',
        desc: 'Double the patty, double the taste!',
        veg: true,
        emoji: '🍔',
        badge: 'Best Choice',
        image: '/images/menu/burger.png'
    },
    {
        name: 'Double Tikki Burger with Cheese Slice',
        price: 129,
        category: 'burger',
        desc: 'Double tikki with cheese slice.',
        veg: true,
        emoji: '🍔',
        image: '/images/menu/burger.png'
    },

    // ========== FRENCH FRIES ==========
    {
        name: 'Salted French Fries',
        price: 59,
        category: 'fries',
        desc: 'Classic salted fries with sauce.',
        veg: true,
        emoji: '🍟',
        image: '/images/menu/fries.png'
    },
    {
        name: 'Masala French Fries',
        price: 69,
        category: 'fries',
        desc: 'Fries with Indian masala sprinkle.',
        veg: true,
        emoji: '🍟',
        image: '/images/menu/fries.png'
    },
    {
        name: 'Peri Peri French Fries',
        price: 79,
        category: 'fries',
        desc: 'Spicy peri peri seasoned fries.',
        veg: true,
        emoji: '🍟',
        badge: 'Best Seller',
        image: '/images/menu/peri_peri_fries.png'
    },
    {
        name: 'Tandoori Mayo French Fries',
        price: 99,
        category: 'fries',
        desc: 'Fries with tandoori mayo dip.',
        veg: true,
        emoji: '🍟',
        image: '/images/menu/fries.png'
    },
    {
        name: 'Chilli Potato French Fries',
        price: 119,
        category: 'fries',
        desc: 'Indo-Chinese style chilli potato fries.',
        veg: true,
        emoji: '🍟',
        image: '/images/menu/peri_peri_fries.png'
    },
    {
        name: 'Spicy Potato French Fries',
        price: 89,
        category: 'fries',
        desc: 'Extra spicy potato fries.',
        veg: true,
        emoji: '🍟',
        image: '/images/menu/fries.png'
    },

    // ========== COFFEE ==========
    {
        name: 'Hot Coffee',
        price: 59,
        category: 'beverages',
        desc: 'Strong & premium hot coffee.',
        veg: true,
        emoji: '☕',
        badge: 'Recommended',
        image: '/images/menu/hot_coffee.png'
    },
    {
        name: 'Cold Coffee',
        price: 69,
        category: 'beverages',
        desc: 'Chilled creamy cold coffee.',
        veg: true,
        emoji: '☕',
        badge: 'Best Seller',
        image: '/images/menu/cold_coffee.png'
    },
    {
        name: 'Cold Coffee with Ice Cream',
        price: 99,
        category: 'beverages',
        desc: 'Cold coffee topped with ice cream.',
        veg: true,
        emoji: '☕',
        badge: 'Best Seller',
        image: '/images/menu/cold_coffee.png'
    },

    // ========== SHAKES ==========
    {
        name: 'Milk Shake',
        price: 69,
        category: 'beverages',
        desc: 'Classic creamy milkshake.',
        veg: true,
        emoji: '🥤',
        image: '/images/menu/shake.png'
    },
    {
        name: 'Strawberry Shake',
        price: 69,
        category: 'beverages',
        desc: 'Fresh strawberry flavored shake.',
        veg: true,
        emoji: '🥤',
        image: '/images/menu/strawberry_shake.png'
    },
    {
        name: 'Oreo Milkshake',
        price: 79,
        category: 'beverages',
        desc: 'Oreo cookie blended shake.',
        veg: true,
        emoji: '🥤',
        badge: 'Best Seller',
        image: '/images/menu/oreo_shake.png'
    },
    {
        name: 'Pineapple Shake',
        price: 99,
        category: 'beverages',
        desc: 'Tropical pineapple shake.',
        veg: true,
        emoji: '🥤',
        image: '/images/menu/shake.png'
    },
    {
        name: 'KitKat Shake',
        price: 119,
        category: 'beverages',
        desc: 'Rich KitKat chocolate shake.',
        veg: true,
        emoji: '🥤',
        image: '/images/menu/kitkat_shake.png'
    },
    {
        name: 'Kesar Badam Rabdi Milk',
        price: 89,
        category: 'beverages',
        desc: 'Traditional kesar badam with rabdi.',
        veg: true,
        emoji: '🥛',
        image: '/images/menu/shake.png'
    }
];
