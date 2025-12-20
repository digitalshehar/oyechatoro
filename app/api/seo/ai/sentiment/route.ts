import { NextResponse } from 'next/server';
import { analyzeReviewSentiment } from '@/app/lib/seo-utils';

export async function POST(req: Request) {
    try {
        const { reviews } = await req.json();
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ error: 'Server configuration error: Gemini API Key missing' }, { status: 500 });
        }

        if (!reviews || !Array.isArray(reviews) || reviews.length === 0) {
            return NextResponse.json({ error: 'A non-empty array of reviews is required' }, { status: 400 });
        }

        const sentimentAnalysis = await analyzeReviewSentiment(reviews, apiKey);

        return NextResponse.json(sentimentAnalysis);
    } catch (e: any) {
        console.error('Sentiment Analysis Error:', e);
        return NextResponse.json({ error: 'Failed to analyze sentiment', debug: e.message }, { status: 500 });
    }
}
