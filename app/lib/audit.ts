
import { prisma } from './db';
import { auth } from '@/auth';

export type AuditAction =
    | 'CREATE_ORDER'
    | 'UPDATE_ORDER'
    | 'DELETE_MENU_ITEM'
    | 'CREATE_MENU_ITEM'
    | 'UPDATE_MENU_ITEM'
    | 'DELETE_CATEGORY'
    | 'CREATE_POST'
    | 'UPDATE_POST'
    | 'DELETE_POST'
    | 'UPDATE_CUSTOMER';

export async function logAudit(
    action: AuditAction,
    entity: string,
    entityId: string | undefined,
    details: any,
    performedBy?: string
) {
    try {
        const session = await auth();
        const userId = performedBy || session?.user?.email || 'System'; // Or use ID if available

        await prisma.auditLog.create({
            data: {
                action,
                entity,
                entityId,
                details: details ? JSON.stringify(details) : undefined,
                userId,
            }
        });
    } catch (error) {
        console.error('Failed to create audit log:', error);
        // Don't throw, we don't want to break the main action if logging fails
    }
}
