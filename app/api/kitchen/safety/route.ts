import { NextResponse } from 'next/server';
import { detectAllergens } from '../../../lib/seo-utils';
import { auth } from '../../../../auth';

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session || !['Chef', 'Admin', 'Manager'].includes((session.user as any).role)) {
            return new NextResponse('Unauthorized: Kitchen access restricted to Chef/Admin', { status: 403 });
        }

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({ detected: false, summary: "ERROR: GEMINI_API_KEY is missing from environment" }, { status: 500 });
        }

        const { note } = await req.json();
        const analysis = await detectAllergens(note, process.env.GEMINI_API_KEY);

        return NextResponse.json(analysis);
    } catch (err) {
        console.error('Safety API Error:', err);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
