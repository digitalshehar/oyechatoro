
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { auth } from '@/auth';

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        // if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { id } = await params;

        // Check for dependencies (posts using this category)
        const postsCount = await prisma.blogPost.count({
            where: { categoryId: id }
        });

        if (postsCount > 0) {
            return NextResponse.json({
                error: 'Cannot delete category with associated posts',
                count: postsCount
            }, { status: 400 });
        }

        await prisma.blogCategory.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete error:', error);
        return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
    }
}
