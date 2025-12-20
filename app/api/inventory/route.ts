import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { auth } from '@/auth';

// GET all inventory items
export async function GET() {
    try {
        const session = await auth();
        // Allow Chef/Manager/Admin to view. But Auth logic: 'Staff' (Waiter) might not need it?
        // client-layout hides it from Staff. Middleware prevents? Not yet middleware.
        // For now, check session exists.
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const storeId = (session.user as any).storeId;
        const where: any = {};
        if (storeId) {
            where.storeId = storeId;
        }

        const items = await prisma.inventoryItem.findMany({
            where,
            orderBy: { name: 'asc' }
        });

        // Map to match frontend expectations if necessary
        const mappedItems = items.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.currentStock, // mapping currentStock to quantity
            unit: item.unit,
            minLevel: item.lowStockAlert,
            category: item.category,
            status: item.currentStock === 0 ? 'Out of Stock' : (item.currentStock < item.lowStockAlert ? 'Low Stock' : 'In Stock'),
            supplier: null // DB doesn't have supplier relation yet, maybe JSON or relation later. For now null.
        }));

        return NextResponse.json(mappedItems);
    } catch (error) {
        console.error('Error fetching inventory:', error);
        return NextResponse.json({ error: 'Failed to fetch inventory' }, { status: 500 });
    }
}

// POST create new item
export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        // Restrict to Admin/Manager?
        if (!session || (session.user as any)?.role === 'Staff') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const storeId = (session.user as any).storeId;

        // Validate?

        const newItem = await prisma.inventoryItem.create({
            data: {
                storeId: storeId,
                name: body.name,
                unit: body.unit,
                currentStock: parseFloat(body.quantity),
                lowStockAlert: parseFloat(body.minLevel),
                category: body.category || 'General',
                costPerUnit: 0, // Not in frontend form yet
                // Supplier? Schema doesn't have it. Store in JSON or ignore?
                // Schema doesn't support supplier info directly. I'll skip it for now.
            }
        });

        return NextResponse.json(newItem, { status: 201 });
    } catch (error) {
        console.error('Error creating inventory item:', error);
        return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
    }
}
