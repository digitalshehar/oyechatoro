import { NextRequest, NextResponse } from 'next/server';
import { analyzeBusinessPerformance } from '@/app/lib/seo-utils';
import { auth } from '@/auth';

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const body = await req.json();
        const { data } = body;

        if (!data) return NextResponse.json({ error: 'Data required' }, { status: 400 });

        const insights = await analyzeBusinessPerformance(data, process.env.GEMINI_API_KEY!);
        return NextResponse.json({ insights });
    } catch (error) {
        console.error('AI Analytics API Error:', error);
        return NextResponse.json({ error: 'Failed to generate insights' }, { status: 500 });
    }
}
