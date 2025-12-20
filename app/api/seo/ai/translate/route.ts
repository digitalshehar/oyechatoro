import { NextRequest, NextResponse } from 'next/server';
import { translateContent } from '@/app/lib/seo-utils';
import { auth } from '@/auth';

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const body = await req.json();
        const { content, targetLang } = body;

        if (!content || !targetLang) {
            return NextResponse.json({ error: 'Missing content or targetLang' }, { status: 400 });
        }

        const translation = await translateContent(content, targetLang, process.env.GEMINI_API_KEY!);
        return NextResponse.json({ translation });
    } catch (error) {
        console.error('Translation API Error:', error);
        return NextResponse.json({ error: 'Failed to translate' }, { status: 500 });
    }
}
