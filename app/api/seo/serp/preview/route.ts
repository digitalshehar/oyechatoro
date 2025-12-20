import { NextResponse } from 'next/server';

export async function GET() {
    // Generate a simulated SERP representation for Oye Chatoro
    const preview = {
        title: 'Oye Chatoro | Best Fast Food & Authentic Indian Street Food in Abu Road',
        url: 'https://oyechatoro.com',
        description: 'Experience the best burger, pizza, and authentic Raj Kachori in Abu Road. Oye Chatoro offers premium vegetarian fast food with lightning-fast delivery. Order live menu now!',
        sitelinks: [
            { title: 'Full Menu', url: '/menu', desc: 'Browse our range of Pizzas, Burgers, and Chaat.' },
            { title: 'Online Order', url: '/order', desc: 'Fastest home delivery in Abu Road station area.' },
            { title: 'Special Offers', url: '/offers', desc: 'Get 20% off on your first order this weekend.' },
            { title: 'Contact Us', url: '/contact', desc: 'Visit us near Mount Abu road for a premium experience.' }
        ],
        knowledgePanel: {
            rating: 4.8,
            reviews: 124,
            address: 'Abu Road, Rajasthan 307026',
            hours: '11:00 am – 11:00 pm',
            phone: 'Not public',
            images: [
                'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop', // Mock pizza
                'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop'  // Mock burger
            ]
        }
    };

    return NextResponse.json(preview);
}
