import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { auth } from '@/auth';
import { logAudit } from '@/app/lib/audit';

// GET single post by id or slug - PUBLIC
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

// PATCH update post - Protected
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();

        const post = await prisma.blogPost.update({
            where: { id },
            data: body,
        });

        await logAudit('UPDATE_POST', 'BlogPost', post.id, { title: post.title });

        return NextResponse.json(post);
    } catch (error) {
        console.error('Error updating post:', error);
        return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
    }
}

// DELETE post - Protected
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const post = await prisma.blogPost.delete({
            where: { id },
        });

        await logAudit('DELETE_POST', 'BlogPost', id, { title: post.title });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting post:', error);
        return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
    }
}
