import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { auth } from '@/auth';

// PATCH - Update status (Protected)
export async function PATCH(request: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const updatedRequest = await prisma.serviceRequest.update({
            where: { id: params.id },
            data: { status: body.status }
        });
        return NextResponse.json(updatedRequest);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update request' }, { status: 500 });
    }
}

// DELETE - Protected
export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        await prisma.serviceRequest.delete({
            where: { id: params.id }
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete request' }, { status: 500 });
    }
}
