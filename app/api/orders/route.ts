import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { auth } from '@/auth';
import { logAudit } from '@/app/lib/audit';

// GET all orders - Protected (Staff sees all, Customer sees theirs)
export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const type = searchParams.get('type');
        const start = searchParams.get('start');
        const end = searchParams.get('end');
        const limit = parseInt(searchParams.get('limit') || '50');

        const where: any = {};

        // Role-based filtering
        // @ts-ignore
        const userRole = session.user?.role;
        if (userRole === 'Customer') {
            if (session.user?.id) {
                where.userId = session.user.id;
            } else {
                return NextResponse.json([]); // No ID
            }
        } else if (userRole === 'Admin') {
            // Admins see everything
        } else {
            // Managers/Staff: Data Isolation: Restrict to their store OR Guest orders (storeId: null)
            const storeId = (session.user as any).storeId;
            if (storeId) {
                where.OR = [
                    { storeId: storeId },
                    { storeId: null }
                ];
            } else {
                // SECURITY: If storeId is missing and not Admin/Customer, DO NOT SHOW ALL.
                // But allow seeing Guest orders (null storeId) if they are staff.
                where.storeId = null;
            }
        }

        if (status) where.status = status;
        if (type) where.type = type;
        if (start && end) {
            where.createdAt = {
                gte: new Date(start),
                lte: new Date(end)
            };
        }

        // If date range specified, we might want more than 50
        const take = (start && end) ? undefined : limit;

        const orders = await prisma.order.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            take
        });

        return NextResponse.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }
}

// POST create new order - Public (Guest or Auth)
export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        const body = await request.json();

        // If session exists, link it
        const userId = session?.user?.id || body.userId;
        const storeId = (session?.user as any)?.storeId || body.storeId; // Prioritize session store, else body (for customers)

        // Start a transaction to ensure Order, Customer, and Inventory are consistent
        const result = await prisma.$transaction(async (tx) => {
            let finalUserId = userId;

            // 1. CRM Integration: Upsert Customer if mobile is provided
            if (body.mobile) {
                const customer = await tx.customer.upsert({
                    where: { phone: body.mobile },
                    update: {
                        name: body.customer, // Update name in case it changed
                        totalOrders: { increment: 1 },
                        totalSpent: { increment: Number(body.total) },
                        lastVisit: new Date(),
                    },
                    create: {
                        name: body.customer,
                        phone: body.mobile,
                        totalOrders: 1,
                        totalSpent: Number(body.total),
                        loyaltyPoints: Math.floor(Number(body.total) / 100), // Basic loyalty: 1 point per 100rs
                    },
                });
                finalUserId = customer.id;
            }

            // 2. Create the Order
            const order = await tx.order.create({
                data: {
                    storeId: storeId,
                    customer: body.customer,
                    items: body.items,
                    total: body.total,
                    status: body.status || 'Pending',
                    type: body.type || 'DineIn',
                    table: body.table,
                    userId: finalUserId,
                    mobile: body.mobile,
                    paymentStatus: body.paymentStatus || 'Unpaid',
                    paymentMethod: body.paymentMethod,
                    discount: body.discount, // Saves { code, amount } as JSON
                    tip: body.tip,
                    waiterName: body.waiterName,
                    dietary: body.dietary || [],
                    trainDetails: body.trainDetails,
                    notes: body.notes,
                },
            });

            // 2. Handle Inventory Deduction (Recipe Logic)
            if (body.items && Array.isArray(body.items)) {
                // Get IDs of all ordered items
                // Use a Set to avoid duplicates if same item added twice (though logic below handles array)
                const itemIds = body.items.map((i: any) => i.id).filter((id: any) => typeof id === 'string'); // Ensure IDs are strings (CUIDs)

                if (itemIds.length > 0) {
                    // Fetch MenuItems with their recipes
                    const menuItems = await tx.menuItem.findMany({
                        where: { id: { in: itemIds } },
                        select: { id: true, recipe: true, name: true }
                    });

                    // Map for quick lookup
                    const itemMap = new Map(menuItems.map(i => [i.id, i]));

                    // Iterate ordered items and deduct stock
                    for (const orderItem of body.items) {
                        const menuItem = itemMap.get(orderItem.id);
                        // Check if item exists and has a recipe (recipe is stored as JSON, strictly typed in app but here it's JsonValue)
                        if (menuItem && menuItem.recipe && Array.isArray(menuItem.recipe)) {
                            const recipe = menuItem.recipe as any[]; // Cast as array of { inventoryItemId, quantity }

                            for (const ingredient of recipe) {
                                if (ingredient.inventoryItemId && ingredient.quantity) {
                                    const deduction = ingredient.quantity * (orderItem.quantity || 1);

                                    // Update Inventory Item
                                    // specific logic: decrement currentStock. 
                                    // We use decrement to be atomic-safe(ish) within transaction.
                                    await tx.inventoryItem.update({
                                        where: { id: ingredient.inventoryItemId },
                                        data: {
                                            currentStock: { decrement: deduction }
                                        }
                                    });

                                    // Log Consumption
                                    await tx.stockLog.create({
                                        data: {
                                            inventoryItemId: ingredient.inventoryItemId,
                                            change: -deduction, // Negative for consumption
                                            type: 'CONSUMPTION',
                                            reason: `Order #${order.id}`
                                        }
                                    });
                                }
                            }
                        }
                    }
                }
            }

            // 3. Log Audit
            await logAudit('CREATE_ORDER', 'Order', order.id.toString(), { total: order.total, customer: order.customer }, session?.user?.id || 'GUEST');

            return order;
        });

        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        console.error('Error creating order:', error);
        return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }
}


