import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { sendWhatsAppMessage } from '@/app/lib/whatsapp';

// POST - Send test message
export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { phone } = await request.json();

        if (!phone) {
            return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
        }

        const testMessage = `🧪 *Test Message from Oye Chatoro*

This is a test notification to verify your WhatsApp integration is working correctly.

If you received this message, your setup is complete! ✅

- Team Oye Chatoro 🍔`;

        const result = await sendWhatsAppMessage(phone, testMessage);

        if (result.success) {
            return NextResponse.json({ success: true, messageId: result.messageId });
        } else {
            return NextResponse.json({ error: result.error }, { status: 500 });
        }
    } catch (error: any) {
        console.error('WhatsApp Test Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
