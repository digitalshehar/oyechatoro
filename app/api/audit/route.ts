import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { auth } from '@/auth';

// GET all audit logs (Protected)
export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Optional: Check for admin role
        // if ((session.user as any).role !== 'admin') { ... }

        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '100');
        const entity = searchParams.get('entity');
        const action = searchParams.get('action');

        const where: any = {};
        if (entity) where.entity = entity;
        if (action) where.action = action;

        const logs = await prisma.auditLog.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            take: limit,
        });

        // Enrich logs with user info if needed? 
        // Currently userId is a string. If you have a User model, you could include it.
        // But AuditLog userId might be just a name/email or id depending on how we stored it.
        // In audit.ts we stored: session?.user?.email || 'System' for userId if auth, or 'System' if not.

        return NextResponse.json(logs);
    } catch (error) {
        console.error('Error fetching audit logs:', error);
        return NextResponse.json({ error: 'Failed to fetch audit logs' }, { status: 500 });
    }
}
