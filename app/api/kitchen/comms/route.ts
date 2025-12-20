import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';
import { auth } from '../../../../auth';

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session || !['Chef', 'Admin', 'Manager'].includes((session.user as any).role)) {
            return new NextResponse('Unauthorized', { status: 403 });
        }

        const body = await req.json();
        const { orderId, action, message } = body;

        if (action === 'call_waiter') {
            await prisma.order.update({
                where: { id: parseInt(orderId) },
                data: {
                    waiterCalled: true,
                    notes: message ? `[CHEF CALL: ${message}]` : undefined
                }
            });
            return NextResponse.json({ success: true, message: 'Waiter called' });
        }

        return new NextResponse('Invalid Action', { status: 400 });
    } catch (err) {
        console.error('Kitchen Comms API Error:', err);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
