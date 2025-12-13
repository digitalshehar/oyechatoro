import { MetadataRoute } from 'next';
import { prisma } from './lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://oyechatoro.com';

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1 },
        { url: `${baseUrl}/menu`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
        { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
        { url: `${baseUrl}/train-menu`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
        { url: `${baseUrl}/scan`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
        { url: `${baseUrl}/login`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3 },
        { url: `${baseUrl}/signup`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3 },
    ];

    try {
        const posts = await prisma.blogPost.findMany({
            where: { status: 'Published' },
            select: { slug: true, updatedAt: true }
        });

        const menuItems = await prisma.menuItem.findMany({
            where: { status: 'Active' },
            select: { slug: true, updatedAt: true }
        });

        const blogPages: MetadataRoute.Sitemap = posts.map(post => ({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: post.updatedAt,
            changeFrequency: 'weekly' as const,
            priority: 0.6
        }));

        const menuPages: MetadataRoute.Sitemap = menuItems.map(item => ({
            url: `${baseUrl}/menu/${item.slug}`,
            lastModified: item.updatedAt,
            changeFrequency: 'weekly' as const,
            priority: 0.7
        }));

        return [...staticPages, ...blogPages, ...menuPages];
    } catch (error) {
        console.error('Failed to generate sitemap:', error);
        return staticPages;
    }
}
