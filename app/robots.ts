import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/dashboard/', '/api/', '/chef/', '/admin/'],
            },
        ],
        sitemap: 'https://oyechatoro.com/sitemap.xml',
    };
}
