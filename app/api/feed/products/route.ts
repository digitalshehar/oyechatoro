import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';

export async function GET(req: NextRequest) {
    const baseUrl = 'https://oyechatoro.com';

    const items = await prisma.menuItem.findMany({
        where: { status: 'Active' },
        include: { category: true }
    });

    const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
    <title>Oye Chatoro Menu</title>
    <link>${baseUrl}</link>
    <description>Premium Street Food in Mount Abu</description>
    ${items.map(item => `
    <item>
        <g:id>${item.id}</g:id>
        <g:title><![CDATA[${item.name}]]></g:title>
        <g:description><![CDATA[${item.description || item.name}]]></g:description>
        <g:link>${baseUrl}/menu/${item.slug}</g:link>
        <g:image_link>${item.image || `${baseUrl}/og-image.jpg`}</g:image_link>
        <g:condition>new</g:condition>
        <g:availability>in_stock</g:availability>
        <g:price>${item.price} INR</g:price>
        <g:brand>Oye Chatoro</g:brand>
        <g:google_product_category>Food, Beverages &amp; Tobacco &gt; Food Items</g:google_product_category>
        <g:custom_label_0>${item.category.name}</g:custom_label_0>
        <g:custom_label_1>${item.veg ? 'Veg' : 'Non-Veg'}</g:custom_label_1>
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
}
