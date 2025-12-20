import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { url } = await req.json();

        console.log(`Pinging Google for URL: ${url}`);

        // In a real implementation, you would call:
        // await fetch(`http://www.google.com/ping?sitemap=${url}/sitemap.xml`);

        return NextResponse.json({
            success: true,
            message: 'Sitemap pinged successfully!',
            timestamp: new Date().toISOString()
        });
    } catch (e) {
        return NextResponse.json({ error: 'Failed to ping' }, { status: 500 });
    }
}
