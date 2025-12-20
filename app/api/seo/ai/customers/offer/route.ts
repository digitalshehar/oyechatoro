import { NextRequest, NextResponse } from 'next/server';
import { generatePersonalizedOffer } from '@/app/lib/seo-utils';
import { prisma } from '@/app/lib/db';
import { auth } from '@/auth';

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const body = await req.json();
        const { customerData } = body;

        if (!customerData) {
            return NextResponse.json({ error: 'Customer data required' }, { status: 400 });
        }

        // Fetch menu for recommendations
        const menu = await prisma.menuItem.findMany({
            where: { status: 'Active' },
            select: { name: true }
        });

        const offer = await generatePersonalizedOffer(customerData, menu, process.env.GEMINI_API_KEY!);
        return NextResponse.json({ offer });
    } catch (error) {
        console.error('AI Personalized Offer API Error:', error);
        return NextResponse.json({ error: 'Failed to generate offer' }, { status: 500 });
    }
}
