import { NextResponse } from 'next/server';
import { generateBlogPostContent } from '@/app/lib/seo-utils';

export async function POST(req: Request) {
    try {
        const { topic } = await req.json();
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ error: 'Gemini API Key missing' }, { status: 500 });
        }

        if (!topic) {
            return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
        }

        const blogData = await generateBlogPostContent(topic, apiKey);

        return NextResponse.json(blogData);
    } catch (e: any) {
        console.error('Blog AI API Error:', e);
        return NextResponse.json({ error: 'Failed to generate blog content', debug: e.message }, { status: 500 });
    }
}
