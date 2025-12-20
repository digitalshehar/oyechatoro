import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile, mkdir, access } from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'shift-logs.json');

import { auth } from '../../../../auth';

// Helper ensure data
async function getLogs() {
    try {
        await access(DATA_FILE);
        const data = await readFile(DATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

async function saveLogs(logs: any[]) {
    await mkdir(DATA_DIR, { recursive: true });
    await writeFile(DATA_FILE, JSON.stringify(logs, null, 2));
}

export async function GET() {
    try {
        const session = await auth();
        if (!session || !['Chef', 'Admin', 'Manager'].includes((session.user as any).role)) {
            return new NextResponse('Unauthorized', { status: 403 });
        }
        const logs = await getLogs();
        return NextResponse.json(logs);
    } catch (e) {
        return NextResponse.json({ error: 'Failed to fetch logs' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        if (!body.content) return NextResponse.json({ error: 'Content required' }, { status: 400 });

        const logs = await getLogs();
        const newLog = {
            id: Date.now().toString(),
            content: body.content,
            author: body.author || 'Chef',
            type: body.type || 'Info',
            createdAt: new Date().toISOString()
        };

        logs.unshift(newLog); // Newest first
        // Keep only last 50 logs
        if (logs.length > 50) logs.length = 50;

        await saveLogs(logs);
        return NextResponse.json(newLog);
    } catch (e) {
        return NextResponse.json({ error: 'Failed to save log' }, { status: 500 });
    }
}
