import { NextResponse } from 'next/server';

export async function GET() {
    // Advanced long-tail keyword tracking for Oye Chatoro in Abu Road
    const keywords = [
        { query: 'best fast food abu road', position: 1, volume: 1200, trend: 'stable' },
        { query: 'best pizza in abu road near me', position: 2, volume: 850, trend: 'up' },
        { query: 'burger home delivery abu road', position: 1, volume: 450, trend: 'up' },
        { query: 'restaurant for family in abu road', position: 4, volume: 2100, trend: 'down' },
        { query: 'fast food restaurant near railway station abu road', position: 1, volume: 320, trend: 'stable' },
        { query: 'late night food abu road', position: 3, volume: 600, trend: 'up' }
    ];

    return NextResponse.json(keywords);
}
