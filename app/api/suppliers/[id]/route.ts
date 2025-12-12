import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { auth } from '@/auth';

// GET single supplier
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
        const supplier = await prisma.supplier.findUnique({
            where: { id },
            include: {
                orders: {
                    orderBy: { orderDate: 'desc' },
                    take: 10
                }
            }
        });

        if (!supplier) {
            return NextResponse.json({ error: 'Supplier not found' }, { status: 404 });
        }

        return NextResponse.json(supplier);
    } catch (error) {
        console.error('Error fetching supplier:', error);
        return NextResponse.json({ error: 'Failed to fetch supplier' }, { status: 500 });
    }
}

// PATCH update supplier
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

        const supplier = await prisma.supplier.update({
            where: { id },
            data: body
        });

        return NextResponse.json(supplier);
    } catch (error) {
        console.error('Error updating supplier:', error);
        return NextResponse.json({ error: 'Failed to update supplier' }, { status: 500 });
    }
}

// DELETE supplier (soft delete)
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
        
        // Soft delete by marking inactive
        await prisma.supplier.update({
            where: { id },
            data: { active: false }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting supplier:', error);
        return NextResponse.json({ error: 'Failed to delete supplier' }, { status: 500 });
    }
}
