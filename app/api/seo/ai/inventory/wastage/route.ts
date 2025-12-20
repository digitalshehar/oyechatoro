import { NextRequest, NextResponse } from 'next/server';
import { analyzeWastage } from '@/app/lib/seo-utils';
import { auth } from '@/auth';

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const body = await req.json();
        const { logs } = body;

        if (!logs || !Array.isArray(logs)) {
            return NextResponse.json({ error: 'Wastage logs required' }, { status: 400 });
        }

        const reports = await analyzeWastage(logs, process.env.GEMINI_API_KEY!);
        return NextResponse.json({ reports });
    } catch (error) {
        console.error('AI Wastage API Error:', error);
        return NextResponse.json({ error: 'Failed to generate wastage analysis' }, { status: 500 });
    }
}
