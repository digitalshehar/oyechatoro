import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { auth } from '@/auth';

// POST: Create a new franchise inquiry
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        console.log('Franchise Submission Body:', body);

        if (!body.name || !body.email || !body.phone || !body.budget) {
            console.error('Validation failed. Missing fields:', body);
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const inquiry = await prisma.franchiseInquiry.create({
            data: {
                name: body.name,
                email: body.email,
                phone: body.phone,
                location: body.location || 'Not Specified',
                budget: body.budget,
                message: body.message,
                status: 'New'
            }
        });

        return NextResponse.json(inquiry);
    } catch (error: any) {
        console.error('Error creating franchise inquiry:', error);
        return NextResponse.json({ error: error.message || 'Failed' }, { status: 500 });
    }
}

// GET: List all inquiries (Admin protected)
export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        // Allow Admins or Managers
        if (!session || ((session.user as any).role !== 'Admin' && (session.user as any).role !== 'Manager')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const inquiries = await prisma.franchiseInquiry.findMany({
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(inquiries);
    } catch (error) {
        console.error('Error fetching inquiries:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

// PATCH: Update an inquiry (Admin/Manager)
export async function PATCH(request: NextRequest) {
    try {
        const session = await auth();
        // Allow Admins or Managers
        if (!session || ((session.user as any).role !== 'Admin' && (session.user as any).role !== 'Manager')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { id, ...data } = body;

        if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

        const updated = await prisma.franchiseInquiry.update({
            where: { id },
            data: data
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error('Error updating inquiry:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
