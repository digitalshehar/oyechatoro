import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';

export async function GET() {
    try {
        const setting = await prisma.setting.findUnique({
            where: { key: 'seo_settings' }
        });

        return NextResponse.json(setting?.value || {});
    } catch (error) {
        console.error('Error fetching SEO settings:', error);
        return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Validate or sanitize body if needed
        const updatedSetting = await prisma.setting.upsert({
            where: { key: 'seo_settings' },
            update: { value: body },
            create: {
                key: 'seo_settings',
                value: body
            }
        });

        return NextResponse.json({ success: true, settings: updatedSetting.value });
    } catch (error) {
        console.error('Error saving SEO settings:', error);
        return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
    }
}
