import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { auth } from '@/auth';

export async function GET() {
    try {
        const session = await auth();
        if (!session || !['Admin', 'Manager'].includes((session.user as any).role)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Predefined list of high-value local directories for Oye Chatoro in Abu Road
        const localDirectories = [
            { id: 'gmb', name: 'Google Business Profile', url: 'https://business.google.com', importance: 'Critical' },
            { id: 'justdial', name: 'Justdial Abu Road', url: 'https://www.justdial.com/Abu-Road/Restaurants', importance: 'High' },
            { id: 'tripadvisor', name: 'TripAdvisor', url: 'https://www.tripadvisor.com', importance: 'High' },
            { id: 'zomato', name: 'Zomato', url: 'https://www.zomato.com', importance: 'Medium' },
            { id: 'swiggy', name: 'Swiggy', url: 'https://www.swiggy.com', importance: 'Medium' },
            { id: 'facebook', name: 'Facebook Page', url: 'https://facebook.com', importance: 'Medium' },
            { id: 'instagram', name: 'Instagram Business', url: 'https://instagram.com', importance: 'Medium' },
            { id: 'magicpin', name: 'Magicpin', url: 'https://magicpin.in', importance: 'Low' }
        ];

        // Fetch user's custom tracking status from DB
        const citationSettings = await prisma.setting.findUnique({
            where: { key: 'seo_citations' }
        });

        const statusMap = citationSettings?.value as any || {};

        const citations = localDirectories.map(dir => ({
            ...dir,
            status: statusMap[dir.id] || 'Not Verified',
            lastChecked: statusMap[`${dir.id}_date`] || null
        }));

        return NextResponse.json(citations);
    } catch (error) {
        console.error('Citations API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch citations' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session || !['Admin', 'Manager'].includes((session.user as any).role)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id, status } = await req.json();

        const currentSettings = await prisma.setting.findUnique({
            where: { key: 'seo_citations' }
        });

        const statusMap = currentSettings?.value as any || {};
        statusMap[id] = status;
        statusMap[`${id}_date`] = new Date().toISOString();

        await prisma.setting.upsert({
            where: { key: 'seo_citations' },
            update: { value: statusMap },
            create: {
                key: 'seo_citations',
                value: statusMap
            }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Citations Save Error:', error);
        return NextResponse.json({ error: 'Failed to save citation status' }, { status: 500 });
    }
}
