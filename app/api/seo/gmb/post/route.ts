import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';

export async function POST(req: Request) {
    try {
        const { text, type, image } = await req.json();

        // 1. Fetch GMB Settings
        const settingsRes = await prisma.setting.findUnique({
            where: { key: 'seo_settings' }
        });

        if (!settingsRes) {
            return NextResponse.json({ error: 'SEO Settings not found' }, { status: 404 });
        }

        const config = JSON.parse(settingsRes.value as string);

        if (!config.googleBusinessProfile?.connected) {
            return NextResponse.json({ error: 'GMB not connected in Setup' }, { status: 400 });
        }

        // 2. Log the post attempt (Mocking the actual Google API call for now)
        // In a production environment, this would call:
        // https://mybusiness.googleapis.com/v4/accounts/{accountId}/locations/{locationId}/localPosts

        console.log('Sending GMB Post for Oye Chatoro:', { text, type, image });

        // Simulate successful API call
        return NextResponse.json({
            success: true,
            message: 'Post sent to Google Business Profile!',
            postId: 'gmb_' + Math.random().toString(36).substr(2, 9),
            postedAt: new Date().toISOString()
        });

    } catch (e) {
        console.error('GMB Post Error:', e);
        return NextResponse.json({ error: 'Failed to post to GMB' }, { status: 500 });
    }
}
