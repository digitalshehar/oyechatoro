import { NextRequest, NextResponse } from 'next/server';
import { getGeminiSeoCopy } from '@/app/lib/seo-utils';
import { auth } from '@/auth';

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) return NextResponse.json({ error: 'Gemini API Key missing' }, { status: 500 });

        const prompt = `You are a strategic social media director for "Oye Chatoro", a premium fast-food brand in Abu Road.
        Task: Generate a 7-day high-performance social media content calendar.
        
        Strategy:
        - Mix of Product Showcase, Behind the Scenes, Customer Appreciation, and Local SEO (Abu Road/Mount Abu).
        - Tonality: Hinglish, energetic, and appetizing.
        
        Return a JSON object with a key "days" which is an array of 7 objects. Each object must have:
        - "day": e.g., "Monday", "Day 1"
        - "topic": Engaging post title
        - "type": e.g., "Carousel", "Reel", "Single Image"
        - "caption": Catchy caption with emojis and hashtags
        - "imagePrompt": Detailed AI photo prompt for this post

        Return ONLY the JSON.`;

        const aiResponse = await getGeminiSeoCopy(prompt, apiKey);
        if (!aiResponse) throw new Error('AI returned empty response');

        const cleanJson = aiResponse.replace(/```json/g, '').replace(/```/g, '').trim();
        const data = JSON.parse(cleanJson);

        return NextResponse.json(data);
    } catch (error) {
        console.error('Weekly Social API Error:', error);
        return NextResponse.json({ error: 'Failed to generate weekly plan' }, { status: 500 });
    }
}
