import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { auth } from '@/auth';

// GET: Fetch content
export async function GET(request: NextRequest) {
    try {
        let content = await prisma.franchisePageContent.findUnique({
            where: { id: 'main' }
        });

        if (!content) {
            // Create default if not exists
            content = await prisma.franchisePageContent.create({
                data: { id: 'main' }
            });
        }

        return NextResponse.json(content);
    } catch (error) {
        console.error('Error fetching content:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

// PUT: Update content (Admin Only)
export async function PUT(request: NextRequest) {
    try {
        const session = await auth();
        if (!session || ((session.user as any).role !== 'Admin' && (session.user as any).role !== 'Manager')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { id, createdAt, updatedAt, ...data } = body;

        const updated = await prisma.franchisePageContent.update({
            where: { id: 'main' },
            data: data
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error('Error updating content:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
