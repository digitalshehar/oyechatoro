import { NextResponse } from 'next/server';
import { generateReviewResponse } from '@/app/lib/seo-utils';

export async function POST(req: Request) {
    try {
        const { reviewText, rating } = await req.json();
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ error: 'Server configuration error: Gemini API Key missing' }, { status: 500 });
        }

        if (!reviewText) {
            return NextResponse.json({ error: 'Review text is required' }, { status: 400 });
        }

        const aiResponse = await generateReviewResponse(reviewText, rating || 5, apiKey);

        return NextResponse.json({ response: aiResponse });
    } catch (e: any) {
        console.error('Review AI Error:', e);
        return NextResponse.json({ error: 'Failed to generate review response', debug: e.message }, { status: 500 });
    }
}
