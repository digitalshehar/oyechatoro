import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { auth } from '@/auth';

// GET single PO
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const order = await prisma.purchaseOrder.findUnique({
            where: { id },
            include: { supplier: true }
        });

        if (!order) {
            return NextResponse.json({ error: 'PO not found' }, { status: 404 });
        }

        return NextResponse.json(order);
    } catch (error) {
        console.error('Error fetching PO:', error);
        return NextResponse.json({ error: 'Failed to fetch PO' }, { status: 500 });
    }
}

// PATCH update PO status
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();

        // Special handling for Receiving logic
        if (body.status === 'Received') {
            const result = await prisma.$transaction(async (tx) => {
                // 1. Verify PO exists and isn't already received
                const existingPO = await tx.purchaseOrder.findUnique({ where: { id } });
                if (!existingPO) throw new Error('PO not found');
                if (existingPO.status === 'Received') {
                    // If already received, just return it (idempotent-ish) or throw
                    return existingPO;
                }

                // 2. Update PO Status
                const updatedPO = await tx.purchaseOrder.update({
                    where: { id },
                    data: {
                        status: 'Received',
                        deliveryDate: new Date()
                    }
                });

                // 3. Process Items & Update Stock
                const items = existingPO.items as any[];

                for (const item of items) {
                    // Try to find matching inventory item
                    const invItem = await tx.inventoryItem.findFirst({
                        where: { name: { equals: item.name, mode: 'insensitive' } }
                    });

                    if (invItem) {
                        // Update existing
                        await tx.inventoryItem.update({
                            where: { id: invItem.id },
                            data: {
                                currentStock: { increment: numberfy(item.quantity) },
                                costPerUnit: numberfy(item.unitPrice) // Update latest cost
                            }
                        });

                        // Log
                        await tx.stockLog.create({
                            data: {
                                inventoryItemId: invItem.id,
                                change: numberfy(item.quantity),
                                type: 'RESTOCK',
                                reason: `PO #${existingPO.id.slice(-6)}`
                            }
                        });
                    } else {
                        // Create new item
                        const newItem = await tx.inventoryItem.create({
                            data: {
                                name: item.name,
                                unit: item.unit || 'unit',
                                currentStock: numberfy(item.quantity),
                                costPerUnit: numberfy(item.unitPrice),
                                category: 'General'
                            }
                        });

                        // Log
                        await tx.stockLog.create({
                            data: {
                                inventoryItemId: newItem.id,
                                change: numberfy(item.quantity),
                                type: 'RESTOCK',
                                reason: `PO #${existingPO.id.slice(-6)} (New)`
                            }
                        });
                    }
                }

                return updatedPO;
            });
            return NextResponse.json(result);
        }

        const order = await prisma.purchaseOrder.update({
            where: { id },
            data: body
        });

        return NextResponse.json(order);
    } catch (error) {
        console.error('Error updating PO:', error);
        return NextResponse.json({ error: 'Failed to update PO' }, { status: 500 });
    }
}

function numberfy(val: any): number {
    return Number(val) || 0;
}

// DELETE PO
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        await prisma.purchaseOrder.delete({ where: { id } });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting PO:', error);
        return NextResponse.json({ error: 'Failed to delete PO' }, { status: 500 });
    }
}
