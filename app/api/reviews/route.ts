
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { auth } from '@/auth';

// GET all approved reviews - PUBLIC
export async function GET() {
    try {
        const reviews = await prisma.review.findMany({
            where: { status: 'Approved' },
            orderBy: { date: 'desc' },
            take: 10,
        });

        return NextResponse.json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        return NextResponse.json({ error: 'Failed to fetch reviews', details: (error as Error).message, stack: (error as Error).stack }, { status: 500 });
    }
}

// POST create review - PUBLIC (but could be protected or rate-limited in improved version)
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Basic validation
        if (!body.name || !body.comment || !body.rating) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const review = await prisma.review.create({
            data: {
                name: body.name,
                rating: parseInt(body.rating),
                comment: body.comment,
                avatar: body.avatar || null,
                status: 'Approved', // Auto-approve for now, or change to 'Pending' if content moderation needed
            },
        });

        return NextResponse.json(review, { status: 201 });
    } catch (error) {
        console.error('Error creating review:', error);
        return NextResponse.json({ error: 'Failed to create review' }, { status: 500 });
    }
}
