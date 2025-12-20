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
            const order = await prisma.order.findUnique({ where: { id: parseInt(orderId) } });
            const updated = await prisma.order.update({
                where: { id: parseInt(orderId) },
                data: {
                    waiterCalled: true,
                    notes: message ? `${order?.notes || ''}\n[CHEF CALL: ${message}]` : undefined
                }
            });
            return NextResponse.json({ success: true, order: updated });
        }

        if (action === 'resolve_waiter') {
            const updated = await prisma.order.update({
                where: { id: parseInt(orderId) },
                data: {
                    waiterCalled: false
                }
            });
            return NextResponse.json({ success: true, order: updated });
        }

        return new NextResponse('Invalid Action', { status: 400 });
    } catch (err) {
        console.error('Kitchen Comms API Error:', err);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
