import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { auth } from '@/auth';

export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        // Only Admin/Manager can view finances
        if (!session || ((session.user as any).role !== 'Admin' && (session.user as any).role !== 'Manager')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const date = request.nextUrl.searchParams.get('date');

        let where = {};
        if (date) {
            const start = new Date(date);
            const end = new Date(date);
            end.setDate(end.getDate() + 1);
            where = {
                date: {
                    gte: start,
                    lt: end
                }
            };
        }

        const expenses = await prisma.expense.findMany({
            where,
            orderBy: { date: 'desc' }
        });

        return NextResponse.json(expenses);
    } catch (error) {
        console.error('Error fetching expenses:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session || ((session.user as any).role !== 'Admin' && (session.user as any).role !== 'Manager')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { date, category, description, amount } = body;

        const expense = await prisma.expense.create({
            data: {
                date: new Date(date),
                category,
                description,
                amount: parseFloat(amount)
            }
        });

        return NextResponse.json(expense);
    } catch (error) {
        console.error('Error creating expense:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
