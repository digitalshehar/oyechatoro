import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { auth } from '@/auth';
import { logAudit } from '@/app/lib/audit';

// SAMPLE DATA FOR SEEDING
const SAMPLE_POSTS = [
    {
        title: 'The Ultimate Guide to Indian Spices',
        slug: 'ultimate-guide-indian-spices',
        excerpt: 'Unlock the secrets of Indian cooking with this comprehensive guide to essential spices, from turmeric to cardamom.',
        content: `
# The Magic of Indian Spices

Indian cuisine is a symphony of flavors, orchestrated by a vast array of spices. Whether you are a beginner or a seasoned chef, understanding these "masalas" is key to mastering the art of Indian cooking.

## The Holy Trinity
Most Indian dishes start with these three:
1. **Turmeric (Haldi):** The golden spice, known for its earthy flavor and healing properties.
2. **Cumin (Jeera):** Adds a warm, nutty aroma.
3. **Coriander (Dhaniya):** Provides a citrusy, floral base note.

## Heating Things Up
- **Red Chili Powder:** For heat and color.
- **Black Pepper:** The "King of Spices" for a sharp bite.

> **Pro Tip:** Always bloom your spices in hot oil/ghee to release their essential oils before adding other ingredients.

Stay tuned for more spicy secrets!
        `,
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=80',
        author: 'Chef Akshat',
        category: 'Guides',
        tags: ['Spices', 'Cooking Tips', 'Indian Food'],
        seoTitle: 'Ultimate Guide to Indian Spices | Oye Chatoro',
        seoDescription: 'Learn about essential Indian spices like turmeric, cumin, and coriander. A beginner-friendly guide to mastering Indian flavors.',
        readingTime: '5 min read',
        status: 'Published',
        isRecipe: false,
    },
    {
        title: 'Top 5 Street Foods in Delhi You Must Try',
        slug: 'top-5-street-foods-delhi',
        excerpt: 'A foodie tour through the bustling streets of Delhi. From Golgappe to Chole Bhature, here is what you cannot miss.',
        content: `
# Delhi Belly: A Street Food Paradise

Delhi is not just the capital of India; it is the capital of street food.

## 1. Golgappe (Pani Puri)
Crispy hollow balls filled with spicy tamarind water. A burst of flavor in every bite!

## 2. Chole Bhature
Spicy chickpeas served with fluffy fried bread. Best enjoyed with a glass of Lassi.

## 3. Aloo Tikki
Golden fried potato patties, topped with yogurt and chutneys.

## 4. Momos
Steamed dumplings that have become a Delhi staple.

## 5. Rabri Falooda
A sweet ending to your spicy trail.

Which one is your favorite? Let us know in the comments!
        `,
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80',
        author: 'Foodie Priya',
        category: 'Travel',
        tags: ['Street Food', 'Delhi', 'Travel'],
        seoTitle: 'Best Street Food in Delhi - Top 5 List',
        seoDescription: 'Discover the top 5 must-try street foods in Delhi, including Golgappe, Chole Bhature, and more.',
        readingTime: '4 min read',
        status: 'Published',
        isRecipe: false,
    },
    {
        title: 'Classic Butter Chicken',
        slug: 'classic-butter-chicken',
        excerpt: 'The world-famous creamy, tomato-based chicken curry. Authentic restaurant-style taste at home.',
        content: `
# Restaurant-Style Butter Chicken

There is nothing quite like a bowl of creamy Butter Chicken (Murgh Makhani) to comfort the soul.

## The Secret Sauce
The key lies in the "Makhani" gravy – a silky blend of tomatoes, butter, cream, and cashews.

## Marination is Key
Marinate the chicken for at least 4 hours for the tenderest results. Grill it before adding to the sauce for that smoky flavor.

Serve hot with Naan or Jeera Rice!
        `,
        image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1200&q=80',
        author: 'Chef Akshat',
        category: 'Main Course',
        tags: ['Chicken', 'Curry', 'North Indian'],
        seoTitle: 'Best Butter Chicken Recipe | Authentic Style',
        seoDescription: 'Learn how to make authentic restaurant-style Butter Chicken at home with this easy step-by-step recipe.',
        readingTime: '45 min',
        status: 'Published',
        isRecipe: true,
        recipeDetails: {
            prepTime: '20 mins',
            cookTime: '30 mins',
            servings: '4',
            calories: '450 kcal',
            ingredients: ['500g Chicken Thighs', '1 cup Yogurt', '2 tbsp Ginger Garlic Paste', '4 Tomatoes (pureed)', '2 tbsp Butter', '1/2 cup Fresh Cream']
        }
    }
];

// GET all blog posts - PUBLIC
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const category = searchParams.get('category');
        const featured = searchParams.get('featured') === 'true';
        const limit = parseInt(searchParams.get('limit') || '50');

        // Lazy Seed: Check if empty
        // Disabled during migration to avoid schema conflict
        /* 
        const count = await prisma.blogPost.count();
        if (count === 0) {
            console.log('Seeding sample blog posts...');
            for (const post of SAMPLE_POSTS) {
                await prisma.blogPost.create({ data: post as any });
            }
        }
        */

        const posts = await prisma.blogPost.findMany({
            where: {
                ...(status && { status: status as any }),
                ...(category && { category: { name: category } }),
                ...(featured && { featured: true }),
            },
            include: { category: true },
            orderBy: { createdAt: 'desc' },
            take: limit,
        });

        return NextResponse.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }
}

// POST create blog post - Protected
export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();

        const post = await prisma.blogPost.create({
            data: {
                title: body.title,
                slug: body.slug || body.title.toLowerCase().replace(/\s+/g, '-'),
                excerpt: body.excerpt,
                content: body.content,
                image: body.image,
                author: body.author || 'Admin',

                // Handle Category Relation
                category: body.categoryId
                    ? { connect: { id: body.categoryId } }
                    : (body.category && (typeof body.category === 'string' || body.category.name)
                        ? {
                            connectOrCreate: {
                                where: { name: typeof body.category === 'string' ? body.category : body.category.name },
                                create: {
                                    name: typeof body.category === 'string' ? body.category : body.category.name,
                                    slug: (typeof body.category === 'string' ? body.category : body.category.name).toLowerCase().replace(/\s+/g, '-')
                                }
                            }
                        }
                        : undefined),

                // Handle Tags Relation (Many-to-Many)
                tags: {
                    connect: (body.tags || []).map((t: any) => ({
                        name: typeof t === 'string' ? t : t.name
                    }))
                },

                seoTitle: body.seoTitle,
                seoDescription: body.seoDescription,
                readingTime: body.readingTime,
                status: body.status || 'Draft',
                isRecipe: body.isRecipe || false,
                featured: body.featured || false,
                recipeDetails: body.recipeDetails,
            },
        });

        await logAudit('CREATE_POST', 'BlogPost', post.id, { title: post.title });

        return NextResponse.json(post, { status: 201 });
    } catch (error) {
        console.error('Error creating post:', error);
        return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
    }
}
