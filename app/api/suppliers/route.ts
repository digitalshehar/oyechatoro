import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { auth } from '@/auth';

// GET all suppliers
export async function GET() {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const suppliers = await prisma.supplier.findMany({
            where: { active: true },
            include: {
                _count: { select: { orders: true } }
            },
            orderBy: { name: 'asc' }
        });

        return NextResponse.json(suppliers);
    } catch (error) {
        console.error('Error fetching suppliers:', error);
        return NextResponse.json({ error: 'Failed to fetch suppliers' }, { status: 500 });
    }
}

// POST create supplier
export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { name, contactPerson, phone, email, address, gstNumber, paymentTerms } = body;

        if (!name) {
            return NextResponse.json({ error: 'Supplier name is required' }, { status: 400 });
        }

        const supplier = await prisma.supplier.create({
            data: {
                name,
                contactPerson,
                phone,
                email,
                address,
                gstNumber,
                paymentTerms
            }
        });

        return NextResponse.json(supplier, { status: 201 });
    } catch (error) {
        console.error('Error creating supplier:', error);
        return NextResponse.json({ error: 'Failed to create supplier' }, { status: 500 });
    }
}
