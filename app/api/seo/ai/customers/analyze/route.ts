import { NextRequest, NextResponse } from 'next/server';
import { analyzeCustomerSegments } from '@/app/lib/seo-utils';
import { auth } from '@/auth';

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const body = await req.json();
        const { customers } = body;

        if (!customers || !Array.isArray(customers)) {
            return NextResponse.json({ error: 'Customer data required' }, { status: 400 });
        }

        const segments = await analyzeCustomerSegments(customers, process.env.GEMINI_API_KEY!);
        return NextResponse.json({ segments });
    } catch (error) {
        console.error('AI CRM Analysis API Error:', error);
        return NextResponse.json({ error: 'Failed to analyze customers' }, { status: 500 });
    }
}
