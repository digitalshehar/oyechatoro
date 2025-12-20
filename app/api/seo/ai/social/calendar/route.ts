import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const CALENDAR_PATH = path.join(process.cwd(), 'weekly_content_calendar.md');

export async function GET() {
    try {
        const content = await fs.readFile(CALENDAR_PATH, 'utf-8');
        return NextResponse.json({ content });
    } catch (error) {
        return NextResponse.json({ content: '' });
    }
}

export async function POST(req: Request) {
    try {
        const { content } = await req.json();
        await fs.writeFile(CALENDAR_PATH, content, 'utf-8');
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to save calendar' }, { status: 500 });
    }
}
