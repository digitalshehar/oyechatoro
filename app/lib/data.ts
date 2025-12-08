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
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&h=400&fit=crop'
    },
    {
        name: 'Garden Feast (Regular 7")',
        price: 189,
        category: 'pizza',
        desc: 'Loaded with fresh garden vegetables.',
        veg: true,
        emoji: '🍕',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&h=400&fit=crop'
    },
    {
        name: 'Paneer Tikka Pizza (Regular 7")',
        price: 199,
        category: 'pizza',
        desc: 'Spicy paneer tikka with onions & capsicum.',
        veg: true,
        emoji: '🍕',
        badge: 'Best Seller',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=400&fit=crop'
    },
    {
        name: 'Veggie Supreme (Regular 7")',
        price: 199,
        category: 'pizza',
        desc: 'Ultimate veggie loaded pizza.',
        veg: true,
        emoji: '🍕',
        badge: 'Recommended',
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&h=400&fit=crop'
    },
    {
        name: 'Veg Loaded (Regular 7")',
        price: 169,
        category: 'pizza',
        desc: 'Extra vegetables, extra taste!',
        veg: true,
        emoji: '🍕',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&h=400&fit=crop'
    },
    {
        name: 'Farm Fresh Pizza (Regular 7")',
        price: 189,
        category: 'pizza',
        desc: 'Fresh farm vegetables with herbs.',
        veg: true,
        emoji: '🍕',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=400&fit=crop'
    },
    {
        name: 'Cheese Overload (Regular 7")',
        price: 189,
        category: 'pizza',
        desc: 'Extra cheese for cheese lovers!',
        veg: true,
        emoji: '🍕',
        badge: 'Best Choice',
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&h=400&fit=crop'
    },
    {
        name: 'Peri Peri Veggie (Regular 7")',
        price: 199,
        category: 'pizza',
        desc: 'Spicy peri peri flavored veggie pizza.',
        veg: true,
        emoji: '🍕',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&h=400&fit=crop'
    },
    {
        name: 'Creamy Mushroom Garlic (Regular 7")',
        price: 209,
        category: 'pizza',
        desc: 'Creamy garlic sauce with mushrooms.',
        veg: true,
        emoji: '🍕',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=400&fit=crop'
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
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&h=400&fit=crop'
    },
    {
        name: 'Mexican Treat (Regular 7")',
        price: 199,
        category: 'pizza',
        desc: 'Mexican style spicy pizza.',
        veg: true,
        emoji: '🍕',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=400&fit=crop'
    },
    {
        name: '5 Pepper Pizza (Regular 7")',
        price: 219,
        category: 'pizza',
        desc: 'Five different peppers for spice lovers!',
        veg: true,
        emoji: '🍕',
        badge: 'Best Choice',
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&h=400&fit=crop'
    },
    {
        name: 'Abu Road Supreme (Regular 7")',
        price: 219,
        category: 'pizza',
        desc: 'Our signature special pizza!',
        veg: true,
        emoji: '🍕',
        badge: 'Best Seller',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&h=400&fit=crop'
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
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&h=400&fit=crop'
    },
    {
        name: 'Desi Masala Tadka (Regular 7")',
        price: 179,
        category: 'pizza',
        desc: 'Indian masala flavored pizza.',
        veg: true,
        emoji: '🍕',
        badge: 'Recommended',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&h=400&fit=crop'
    },
    {
        name: 'Veg Supreme Deluxe (Regular 7")',
        price: 199,
        category: 'pizza',
        desc: 'Premium veggie supreme with extra toppings.',
        veg: true,
        emoji: '🍕',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=400&fit=crop'
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
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&h=400&fit=crop'
    },
    {
        name: 'Bhel Puri Cheese',
        price: 79,
        category: 'chaat',
        desc: 'Classic bhel puri with extra cheese topping.',
        veg: true,
        emoji: '🥘',
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&h=400&fit=crop'
    },
    {
        name: 'Dahi Papdi Chaat',
        price: 49,
        category: 'chaat',
        desc: 'Crispy papdi topped with creamy yogurt and chutneys.',
        veg: true,
        emoji: '🥘',
        badge: 'Best Seller',
        image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500&h=400&fit=crop'
    },
    {
        name: 'Papdi Chaat Cheese',
        price: 79,
        category: 'chaat',
        desc: 'Crispy papdi topped with creamy chutneys & namkeen.',
        veg: true,
        emoji: '🥘',
        image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500&h=400&fit=crop'
    },
    {
        name: 'Kurkure Bhel',
        price: 49,
        category: 'chaat',
        desc: 'Extra crunch, extra fun!',
        veg: true,
        emoji: '🥘',
        badge: 'Recommended',
        image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&h=400&fit=crop'
    },
    {
        name: 'Kurkure Cheese Bhel',
        price: 79,
        category: 'chaat',
        desc: 'Extra crunch with cheesy goodness!',
        veg: true,
        emoji: '🥘',
        image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&h=400&fit=crop'
    },
    {
        name: 'Crispy Aloo Chaat',
        price: 69,
        category: 'chaat',
        desc: 'Potato chaat (Delhi Style).',
        veg: true,
        emoji: '🥘',
        badge: 'Recommended',
        image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&h=400&fit=crop'
    },
    {
        name: 'Nachos Chaat',
        price: 99,
        category: 'chaat',
        desc: 'Indian cheesy style nachos.',
        veg: true,
        emoji: '🥘',
        image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=500&h=400&fit=crop'
    },
    {
        name: 'Katori Chaat',
        price: 49,
        category: 'chaat',
        desc: 'Edible bowl filled with chaat goodness.',
        veg: true,
        emoji: '🥘',
        badge: 'Best Seller',
        image: 'https://images.unsplash.com/photo-1589301760014-dd836a8dfe9f?w=500&h=400&fit=crop'
    },
    {
        name: 'Basket Chaat (6 pcs)',
        price: 79,
        category: 'chaat',
        desc: 'Mini baskets of joy!',
        veg: true,
        emoji: '🥘',
        image: 'https://images.unsplash.com/photo-1589301760014-dd836a8dfe9f?w=500&h=400&fit=crop'
    },
    {
        name: 'Raj Kachori',
        price: 149,
        category: 'chaat',
        desc: 'Royal crispy kachori filled with curd, chutneys & more.',
        veg: true,
        emoji: '🥘',
        badge: 'Best Choice',
        image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=500&h=400&fit=crop'
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
        image: 'https://images.unsplash.com/photo-1528736235302-52922df5c122?w=500&h=400&fit=crop'
    },
    {
        name: 'Mix Vegetable Sandwich',
        price: 89,
        category: 'sandwich',
        desc: 'Fresh veggies layered in soft bread.',
        veg: true,
        emoji: '🥪',
        badge: 'Best Seller',
        image: 'https://images.unsplash.com/photo-1528736235302-52922df5c122?w=500&h=400&fit=crop'
    },
    {
        name: 'Cheese Corn Sandwich',
        price: 79,
        category: 'sandwich',
        desc: 'Sweet corn and melted cheese in bread.',
        veg: true,
        emoji: '🥪',
        image: 'https://images.unsplash.com/photo-1528736235302-52922df5c122?w=500&h=400&fit=crop'
    },

    // ========== SANDWICH - GRILLED ==========
    {
        name: 'Aloo Matar Masala Sandwich',
        price: 79,
        category: 'sandwich',
        desc: 'Grilled sandwich with aloo matar filling & cheese.',
        veg: true,
        emoji: '🥪',
        image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=500&h=400&fit=crop'
    },
    {
        name: 'Veg Grill Sandwich',
        price: 99,
        category: 'sandwich',
        desc: 'Loaded veggies grilled with cheese.',
        veg: true,
        emoji: '🥪',
        badge: 'Recommended',
        image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=500&h=400&fit=crop'
    },
    {
        name: 'Paneer Tikka Cheese Grilled Sandwich',
        price: 149,
        category: 'sandwich',
        desc: 'Spiced paneer tikka with melted cheese.',
        veg: true,
        emoji: '🥪',
        image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=500&h=400&fit=crop'
    },
    {
        name: 'Aloo Matar Grill Sandwich',
        price: 79,
        category: 'sandwich',
        desc: 'Classic aloo matar grilled to perfection.',
        veg: true,
        emoji: '🥪',
        badge: 'Recommended',
        image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=500&h=400&fit=crop'
    },
    {
        name: 'Bahubali Sandwich',
        price: 149,
        category: 'sandwich',
        desc: 'Mega grilled sandwich loaded with cheese.',
        veg: true,
        emoji: '🥪',
        image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=500&h=400&fit=crop'
    },
    {
        name: 'Masala Junglee Sandwich',
        price: 149,
        category: 'sandwich',
        desc: 'Spicy masala filling with cheese.',
        veg: true,
        emoji: '🥪',
        image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=500&h=400&fit=crop'
    },
    {
        name: 'Veg Mayo Sandwich',
        price: 49,
        category: 'sandwich',
        desc: 'Creamy mayo with fresh veggies.',
        veg: true,
        emoji: '🥪',
        image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=500&h=400&fit=crop'
    },
    {
        name: 'Mumbai Biggest Cheese Grilled Sandwich',
        price: 179,
        category: 'sandwich',
        desc: 'Live & Fresh – Preparation Time 15-20 Min.',
        veg: true,
        emoji: '🥪',
        image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=500&h=400&fit=crop'
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
        image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=500&h=400&fit=crop'
    },
    {
        name: 'White Sauce Pasta',
        price: 149,
        category: 'pasta',
        desc: 'Creamy cheesy sauce with exotic vegetables.',
        veg: true,
        emoji: '🍝',
        badge: 'Best Seller',
        image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&h=400&fit=crop'
    },
    {
        name: 'Red Sauce Pasta',
        price: 149,
        category: 'pasta',
        desc: 'Tangy tomato basil sauce with italian herbs.',
        veg: true,
        emoji: '🍝',
        badge: 'Best Choice',
        image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=500&h=400&fit=crop'
    },
    {
        name: 'Peri Peri Pasta',
        price: 149,
        category: 'pasta',
        desc: 'Spicy peri peri sauce with veggies.',
        veg: true,
        emoji: '🍝',
        image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500&h=400&fit=crop'
    },
    {
        name: 'Masala Pasta',
        price: 149,
        category: 'pasta',
        desc: 'Indian style masala pasta.',
        veg: true,
        emoji: '🍝',
        image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500&h=400&fit=crop'
    },

    // ========== FRANKIE ==========
    {
        name: 'Classic Veg Frankie',
        price: 69,
        category: 'frankie',
        desc: 'Classic vegetable frankie roll.',
        veg: true,
        emoji: '🌯',
        image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500&h=400&fit=crop'
    },
    {
        name: 'Veg Frankie with Paneer',
        price: 99,
        category: 'frankie',
        desc: 'Frankie roll stuffed with paneer.',
        veg: true,
        emoji: '🌯',
        image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500&h=400&fit=crop'
    },
    {
        name: 'Classic Veg Frankie Paneer & Cheese',
        price: 119,
        category: 'frankie',
        desc: 'Loaded with paneer and cheese.',
        veg: true,
        emoji: '🌯',
        image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500&h=400&fit=crop'
    },
    {
        name: 'Paneer Tikka Frankie with Cheese',
        price: 149,
        category: 'frankie',
        desc: 'Tandoori paneer with a tikka twist.',
        veg: true,
        emoji: '🌯',
        badge: 'Best Seller',
        image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500&h=400&fit=crop'
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
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=400&fit=crop'
    },
    {
        name: 'Classic Tikki Burger with Cheese Slice',
        price: 79,
        category: 'burger',
        desc: 'Tikki burger with melted cheese slice.',
        veg: true,
        emoji: '🍔',
        badge: 'Best Seller',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=400&fit=crop'
    },
    {
        name: 'Double Tikki Burger',
        price: 99,
        category: 'burger',
        desc: 'Double the patty, double the taste!',
        veg: true,
        emoji: '🍔',
        badge: 'Best Choice',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=400&fit=crop'
    },
    {
        name: 'Double Tikki Burger with Cheese Slice',
        price: 129,
        category: 'burger',
        desc: 'Double tikki with cheese slice.',
        veg: true,
        emoji: '🍔',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=400&fit=crop'
    },

    // ========== FRENCH FRIES ==========
    {
        name: 'Salted French Fries',
        price: 59,
        category: 'fries',
        desc: 'Classic salted fries with sauce.',
        veg: true,
        emoji: '🍟',
        image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&h=400&fit=crop'
    },
    {
        name: 'Masala French Fries',
        price: 69,
        category: 'fries',
        desc: 'Fries with Indian masala sprinkle.',
        veg: true,
        emoji: '🍟',
        image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&h=400&fit=crop'
    },
    {
        name: 'Peri Peri French Fries',
        price: 79,
        category: 'fries',
        desc: 'Spicy peri peri seasoned fries.',
        veg: true,
        emoji: '🍟',
        badge: 'Best Seller',
        image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&h=400&fit=crop'
    },
    {
        name: 'Tandoori Mayo French Fries',
        price: 99,
        category: 'fries',
        desc: 'Fries with tandoori mayo dip.',
        veg: true,
        emoji: '🍟',
        image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&h=400&fit=crop'
    },
    {
        name: 'Chilli Potato French Fries',
        price: 119,
        category: 'fries',
        desc: 'Indo-Chinese style chilli potato fries.',
        veg: true,
        emoji: '🍟',
        image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&h=400&fit=crop'
    },
    {
        name: 'Spicy Potato French Fries',
        price: 89,
        category: 'fries',
        desc: 'Extra spicy potato fries.',
        veg: true,
        emoji: '🍟',
        image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&h=400&fit=crop'
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
        image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&h=400&fit=crop'
    },
    {
        name: 'Cold Coffee',
        price: 69,
        category: 'beverages',
        desc: 'Chilled creamy cold coffee.',
        veg: true,
        emoji: '☕',
        badge: 'Best Seller',
        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&h=400&fit=crop'
    },
    {
        name: 'Cold Coffee with Ice Cream',
        price: 99,
        category: 'beverages',
        desc: 'Cold coffee topped with ice cream.',
        veg: true,
        emoji: '☕',
        badge: 'Best Seller',
        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&h=400&fit=crop'
    },

    // ========== SHAKES ==========
    {
        name: 'Milk Shake',
        price: 69,
        category: 'beverages',
        desc: 'Classic creamy milkshake.',
        veg: true,
        emoji: '🥤',
        image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&h=400&fit=crop'
    },
    {
        name: 'Strawberry Shake',
        price: 69,
        category: 'beverages',
        desc: 'Fresh strawberry flavored shake.',
        veg: true,
        emoji: '🥤',
        image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=500&h=400&fit=crop'
    },
    {
        name: 'Oreo Milkshake',
        price: 79,
        category: 'beverages',
        desc: 'Oreo cookie blended shake.',
        veg: true,
        emoji: '🥤',
        badge: 'Best Seller',
        image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&h=400&fit=crop'
    },
    {
        name: 'Pineapple Shake',
        price: 99,
        category: 'beverages',
        desc: 'Tropical pineapple shake.',
        veg: true,
        emoji: '🥤',
        image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&h=400&fit=crop'
    },
    {
        name: 'KitKat Shake',
        price: 119,
        category: 'beverages',
        desc: 'Rich KitKat chocolate shake.',
        veg: true,
        emoji: '🥤',
        image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&h=400&fit=crop'
    },
    {
        name: 'Kesar Badam Rabdi Milk',
        price: 89,
        category: 'beverages',
        desc: 'Traditional kesar badam with rabdi.',
        veg: true,
        emoji: '🥛',
        image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=500&h=400&fit=crop'
    }
];
