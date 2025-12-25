import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { auth } from '@/auth';
import { wastageSchema } from '@/app/lib/validations/inventory';
import { logAudit } from '@/app/lib/audit';

export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        const user = session?.user as any; // Cast to access role properties that might not be in default types

        // Allow Managers/Admins/Chefs to log wastage
        if (!user?.role || !['Admin', 'Manager', 'Chef'].includes(user.role)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const json = await request.json();
        const result = wastageSchema.safeParse(json);

        if (!result.success) {
            return NextResponse.json({ error: 'Validation Error', details: result.error.flatten() }, { status: 400 });
        }

        const { inventoryItemId, quantity, reason } = result.data;

        // Transaction: Deduct Stock & Create Log
        const log = await prisma.$transaction(async (tx) => {
            // 1. Check if negative stock is allowed? (Assume yes, but warn? For now just deduct)
            await tx.inventoryItem.update({
                where: { id: inventoryItemId },
                data: {
                    currentStock: { decrement: quantity }
                }
            });

            // 2. Create Stock Log
            const newLog = await tx.stockLog.create({
                data: {
                    inventoryItemId: inventoryItemId,
                    change: -quantity, // Negative because it's loss
                    reason: reason,
                    type: 'WASTAGE'
                }
            });

            return newLog;
        });

        await logAudit('LOG_WASTAGE', 'InventoryItem', inventoryItemId.toString(), { quantity, reason }, user.id);

        return NextResponse.json(log, { status: 201 });

    } catch (error) {
        console.error('Error logging wastage:', error);
        return NextResponse.json({ error: 'Failed to log wastage' }, { status: 500 });
    }
}
