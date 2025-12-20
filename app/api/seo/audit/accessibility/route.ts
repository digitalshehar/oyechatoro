import { NextResponse } from 'next/server';

export async function GET() {
    // Accessibility & Alt-Text Audit mocking
    // Ideally this scans the DB for menu items/posts without alt text and suggests them via AI

    const audit = {
        score: 72,
        missingAltCount: 12,
        recommendations: [
            {
                type: 'Menu Item',
                name: 'Peri Peri Burger',
                image: '/menu/burger.jpg',
                suggestedAlt: 'Spicy Peri Peri Burger with fresh lettuce and cheese in Abu Road oye chatoro'
            },
            {
                type: 'Menu Item',
                name: 'Cheese Corn Pizza',
                image: '/menu/pizza.jpg',
                suggestedAlt: 'Delicious Cheese Corn Pizza with molten mozzarella - Best Pizza in Abu Road'
            },
            {
                type: 'Blog Decoration',
                name: 'Restaurant Interior',
                image: '/blog/interior.jpg',
                suggestedAlt: 'Cozy and premium interior of Oye Chatoro Restaurant in Abu Road'
            }
        ],
        totalImagesScanned: 45
    };

    return NextResponse.json(audit);
}
