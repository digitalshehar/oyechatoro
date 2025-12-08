import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';

// GET all blog posts
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const category = searchParams.get('category');
        const featured = searchParams.get('featured') === 'true';
        const limit = parseInt(searchParams.get('limit') || '50');

        const posts = await prisma.blogPost.findMany({
            where: {
                ...(status && { status: status as any }),
                ...(category && { category }),
                ...(featured && { featured: true }),
            },
            orderBy: { createdAt: 'desc' },
            take: limit,
        });

        return NextResponse.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }
}

// POST create blog post
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const post = await prisma.blogPost.create({
            data: {
                title: body.title,
                slug: body.slug || body.title.toLowerCase().replace(/\s+/g, '-'),
                excerpt: body.excerpt,
                content: body.content,
                image: body.image,
                author: body.author || 'Admin',
                category: body.category || 'News',
                tags: body.tags || [],
                seoTitle: body.seoTitle,
                seoDescription: body.seoDescription,
                readingTime: body.readingTime,
                status: body.status || 'Draft',
                isRecipe: body.isRecipe || false,
                featured: body.featured || false,
                recipeDetails: body.recipeDetails,
            },
        });

        return NextResponse.json(post, { status: 201 });
    } catch (error) {
        console.error('Error creating post:', error);
        return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
    }
}
