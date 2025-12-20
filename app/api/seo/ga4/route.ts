import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { prisma } from '@/app/lib/db';
import { getGoogleAuthClient } from '@/app/lib/google-auth';

const analyticsdata = google.analyticsdata('v1beta');

export async function POST(req: Request) {
    try {
        const setting = await prisma.setting.findUnique({
            where: { key: 'seo_settings' }
        });

        const config = (setting?.value as any) || {};
        if (!config.serviceAccountEmail || !config.serviceAccountKey) {
            return NextResponse.json({ error: 'Analytics not connected' }, { status: 400 });
        }

        const auth = await getGoogleAuthClient(
            { clientEmail: config.serviceAccountEmail, privateKey: config.serviceAccountKey },
            ['https://www.googleapis.com/auth/analytics.readonly']
        );

        const propertyId = config.googleAnalytics?.propertyId || ''; // GA4 Property ID is required
        if (!propertyId) {
            return NextResponse.json({ error: 'GA4 Property ID missing in settings' }, { status: 400 });
        }

        const response = await analyticsdata.properties.runRealtimeReport({
            auth,
            property: `properties/${propertyId}`,
            requestBody: {
                metrics: [{ name: 'activeUsers' }],
                dimensions: [{ name: 'country' }]
            }
        });

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error('GA4 API Error:', error);
        return NextResponse.json({ error: error.message || 'Failed to fetch GA4 data' }, { status: 500 });
    }
}
