import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';

// GET single post by id or slug
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Try to find by ID first, then by slug
        let post = await prisma.blogPost.findUnique({
            where: { id },
        });

        if (!post) {
            post = await prisma.blogPost.findUnique({
                where: { slug: id },
            });
        }

        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        // Increment views
        await prisma.blogPost.update({
            where: { id: post.id },
            data: { views: { increment: 1 } },
        });

        return NextResponse.json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
    }
}

// PATCH update post
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        const post = await prisma.blogPost.update({
            where: { id },
            data: body,
        });

        return NextResponse.json(post);
    } catch (error) {
        console.error('Error updating post:', error);
        return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
    }
}

// DELETE post
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.blogPost.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting post:', error);
        return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
    }
}
