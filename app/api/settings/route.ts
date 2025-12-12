import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { auth } from '@/auth';

export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        // Settings might be needed by everyone?
        // But modification is Admin only.
        // Let's secure simple GET for now, maybe public needed for "Receipt Header"?
        // Staff needs it for receipt printing.
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const settingsList = await prisma.setting.findMany();
        const settingsMap: Record<string, any> = {};

        settingsList.forEach(s => {
            settingsMap[s.key] = s.value;
        });

        // Default structure if empty
        const defaultSettings = {
            name: 'Oye Chatoro',
            address: 'Abu Road',
            phone: '',
            email: '',
            currency: '₹',
            taxRate: 5,
            serviceCharge: 0,
            storeHours: {
                Monday: { open: '09:00', close: '23:00', closed: false },
                Tuesday: { open: '09:00', close: '23:00', closed: false },
                Wednesday: { open: '09:00', close: '23:00', closed: false },
                Thursday: { open: '09:00', close: '23:00', closed: false },
                Friday: { open: '09:00', close: '23:00', closed: false },
                Saturday: { open: '09:00', close: '23:00', closed: false },
                Sunday: { open: '09:00', close: '23:00', closed: false }
            },
            receipt: {
                header: 'Thank you!',
                footer: 'Visit again.',
                showLogo: true
            }
        };

        return NextResponse.json({ ...defaultSettings, ...settingsMap });

    } catch (error) {
        console.error('Error fetching settings:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session || ((session.user as any).role !== 'Admin')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();

        // Upsert each key
        const updates = Object.entries(body).map(([key, value]) => {
            // value must be valid JSON
            return prisma.setting.upsert({
                where: { key },
                update: { value: value as any },
                create: { key, value: value as any }
            });
        });

        await prisma.$transaction(updates);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating settings:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
