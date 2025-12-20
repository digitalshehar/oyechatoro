import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { auth } from '@/auth';

// GET content by slug
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const slug = searchParams.get('slug');

        if (!slug) return NextResponse.json({ error: 'Slug required' }, { status: 400 });

        let page = await prisma.pageContent.findUnique({
            where: { slug }
        });

        if (!page) {
            // Return empty object if not found (frontend will handle defaults)
            return NextResponse.json({});
        }

        return NextResponse.json(page.content);
    } catch (error) {
        console.error('Error fetching content:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

// POST update content
export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session || ((session.user as any).role !== 'Admin' && (session.user as any).role !== 'Manager')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { slug, content } = body;

        if (!slug || !content) return NextResponse.json({ error: 'Missing slug or content' }, { status: 400 });

        const updated = await prisma.pageContent.upsert({
            where: { slug },
            update: { content },
            create: { slug, content }
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error('Error updating content:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
