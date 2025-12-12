import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    if (!slug) {
        return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    try {
        const comments = await prisma.blogComment.findMany({
            where: {
                post: { slug },
                isApproved: true
            },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { slug, user, text, rating } = body;

        if (!slug || !user || !text) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const post = await prisma.blogPost.findUnique({
            where: { slug }
        });

        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        const comment = await prisma.blogComment.create({
            data: {
                postId: post.id,
                user,
                text,
                rating: rating || 5, // Default to 5 if not provided
                isApproved: true     // Auto-approve for now
            }
        });

        return NextResponse.json(comment);
    } catch (error: any) {
        console.error('Error posting comment:', error);
        return NextResponse.json({ error: error.message || 'Failed to post comment' }, { status: 500 });
    }
}
