import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';

export async function GET(req: NextRequest) {
    const baseUrl = process.env.NEXTAUTH_URL || 'https://oyechatoro.com';
    const type = req.nextUrl.searchParams.get('format') || 'xml';

    try {
        const items = await prisma.menuItem.findMany({
            where: { status: 'Active' },
            include: { category: true }
        });

        if (type === 'json') {
            const jsonFeed = items.map(item => ({
                id: item.id,
                title: item.name,
                description: item.description || item.name,
                link: `${baseUrl}/menu/${item.slug}`,
                image_link: item.image || `${baseUrl}/logo.png`,
                price: `${item.price} INR`,
                availability: 'in_stock',
                brand: 'Oye Chatoro',
                category: item.category?.name,
                dietary: item.veg ? 'Veg' : 'Non-Veg'
            }));
            return NextResponse.json(jsonFeed);
        }

        const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
    <title>Oye Chatoro - Official Menu Feed</title>
    <link>${baseUrl}</link>
    <description>Authentic Indian Street Food &amp; Fusion Delicacies</description>
    <language>en-us</language>
    ${items.map(item => `
    <item>
        <g:id>${item.id}</g:id>
        <g:title><![CDATA[${item.name}]]></g:title>
        <g:description><![CDATA[${item.description || item.name}]]></g:description>
        <g:link>${baseUrl}/menu/${item.slug}</g:link>
        <g:image_link>${item.image || `${baseUrl}/logo.png`}</g:image_link>
        <g:condition>new</g:condition>
        <g:availability>in_stock</g:availability>
        <g:price>${item.price} INR</g:price>
        <g:brand>Oye Chatoro</g:brand>
        <g:google_product_category>Food, Beverages &amp; Tobacco &gt; Food Items</g:google_product_category>
        <g:product_type><![CDATA[Restaurant > ${item.category?.name || 'Main Course'}]]></g:product_type>
        <g:custom_label_0>${item.veg ? 'Vegetarian' : 'Non-Vegetarian'}</g:custom_label_0>
        <g:identifier_exists>no</g:identifier_exists>
    </item>`).join('')}
</channel>
</rss>`;

        return new NextResponse(xml, {
            headers: {
                'Content-Type': 'application/xml',
                'Cache-Control': 's-maxage=3600, stale-while-revalidate'
            }
        });
    } catch (error) {
        console.error('Feed API Error:', error);
        return NextResponse.json({ error: 'Failed to generate feed' }, { status: 500 });
    }
}
