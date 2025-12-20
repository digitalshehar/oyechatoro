import { NextResponse } from 'next/server';

export async function GET() {
    // Mocking a weekly report summary
    // In a real implementation, this would aggregate data from GSC, GA4, and internal review DB
    // over the last 7 days.

    const report = {
        weekRange: 'Dec 12 - Dec 19',
        summary: {
            totalClicks: 420,
            clickGrowth: '+15%',
            impressions: 12400,
            impressionGrowth: '+8%',
            avgPosition: 3.2,
            positionGrowth: '+0.5'
        },
        reviewMomentum: {
            newReviews: 14,
            avgRating: 4.9,
            topKeyword: 'Best Burger Abu Road'
        },
        insights: [
            'Clicks are up 15% following the GMB "New Dish" posts.',
            'Visibility in "Fast Food" category has reached a new record high.',
            'Direct traffic from WhatsApp Review Booster accounts for 12% of new visits.'
        ],
        charts: {
            dailyPerformance: [
                { day: 'Mon', clicks: 45, impressions: 1200 },
                { day: 'Tue', clicks: 52, impressions: 1350 },
                { day: 'Wed', clicks: 48, impressions: 1100 },
                { day: 'Thu', clicks: 65, impressions: 1800 },
                { day: 'Fri', clicks: 82, impressions: 2100 },
                { day: 'Sat', clicks: 95, impressions: 2900 },
                { day: 'Sun', clicks: 33, impressions: 1950 },
            ]
        }
    };

    return NextResponse.json(report);
}
