import { NextResponse } from 'next/server';

export async function GET() {
    // Mocking competitor data for Abu Road
    // In a real app, this could be fetched from a scraper, a specialized SEO API like Ahrefs/Semrush, 
    // or manually curated and stored in the DB.

    const competitors = [
        {
            id: 'comp1',
            name: 'Udvada Palace',
            distance: '1.2 km',
            reviews: 450,
            rating: 4.2,
            growth: '-2%',
            keywords: ['Dinner', 'Family'],
            gmbLink: 'https://maps.google.com/?cid=123'
        },
        {
            id: 'comp2',
            name: 'Kailash Hill View',
            distance: '0.8 km',
            reviews: 1200,
            rating: 4.5,
            growth: '+5%',
            keywords: ['Stay', 'Restaurant'],
            gmbLink: 'https://maps.google.com/?cid=456'
        },
        {
            id: 'comp3',
            name: 'Arbuda Restaurant',
            distance: '0.5 km',
            reviews: 800,
            rating: 4.0,
            growth: '+10%',
            keywords: ['Fast Food', 'Lunch'],
            gmbLink: 'https://maps.google.com/?cid=789'
        },
        {
            id: 'comp4',
            name: 'Oye Chatoro (YOU)',
            distance: '0 km',
            reviews: 320,
            rating: 4.8,
            growth: '+25%',
            keywords: ['Fast Food', 'Best Burger'],
            isMain: true
        }
    ];

    return NextResponse.json(competitors);
}
