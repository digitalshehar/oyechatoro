import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { prisma } from '@/app/lib/db';
import { getGoogleAuthClient } from '@/app/lib/google-auth';

const searchconsole = google.searchconsole('v1');

export async function POST(req: Request) {
    try {
        const setting = await prisma.setting.findUnique({
            where: { key: 'seo_settings' }
        });

        const config = (setting?.value as any) || {};
        if (!config.serviceAccountEmail || !config.serviceAccountKey) {
            return NextResponse.json({ error: 'Search Console not connected' }, { status: 400 });
        }

        const auth = await getGoogleAuthClient(
            { clientEmail: config.serviceAccountEmail, privateKey: config.serviceAccountKey },
            ['https://www.googleapis.com/auth/webmasters.readonly']
        );

        const propertyUrl = config.googleSearchConsole?.propertyUrl || 'https://oyechatoro.com'; // Default or from config

        const response = await searchconsole.searchanalytics.query({
            auth,
            siteUrl: propertyUrl,
            requestBody: {
                startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Last 30 days
                endDate: new Date().toISOString().split('T')[0],
                dimensions: ['date'],
                rowLimit: 30
            }
        });

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error('GSC API Error:', error);
        return NextResponse.json({ error: error.message || 'Failed to fetch GSC data' }, { status: 500 });
    }
}
