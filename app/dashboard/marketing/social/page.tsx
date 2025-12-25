'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface CalendarDay {
    day: string;
    topic: string;
    type: string;
    caption?: string;
    imagePrompt?: string;
}

export default function SocialPlannerPage() {
    const [calendar, setCalendar] = useState<CalendarDay[]>([]);
    const [generating, setGenerating] = useState(false);
    const [saving, setSaving] = useState(false);
    const [markdown, setMarkdown] = useState('');

    const fetchCalendar = useCallback(async () => {
        try {
            const res = await fetch('/api/seo/ai/social/calendar');
            const data = await res.json();
            if (data.content) {
                setMarkdown(data.content);
                parseMarkdown(data.content);
            }
        } catch (e) {
            console.error('Failed to fetch calendar');
        }
    }, []);

    useEffect(() => {
        fetchCalendar();
    }, [fetchCalendar]);

    const parseMarkdown = (md: string) => {
        const lines = md.split('\n');
        const days: CalendarDay[] = [];
        let currentDay: Partial<CalendarDay> = {};

        lines.forEach(line => {
            if (line.startsWith('## Day')) {
                if (currentDay.day) days.push(currentDay as CalendarDay);
                currentDay = { day: line.replace('## ', '') };
            } else if (line.startsWith('- **Topic**:')) {
                currentDay.topic = line.replace('- **Topic**: ', '');
            } else if (line.startsWith('- **Type**:')) {
                currentDay.type = line.replace('- **Type**: ', '');
            } else if (line.startsWith('- **AI Caption**:')) {
                currentDay.caption = line.replace('- **AI Caption**: ', '');
            } else if (line.startsWith('- **Image Prompt**:')) {
                currentDay.imagePrompt = line.replace('- **Image Prompt**: ', '');
            }
        });
        if (currentDay.day) days.push(currentDay as CalendarDay);
        setCalendar(days);
    };

    const generatePlan = async () => {
        setGenerating(true);
        try {
            const res = await fetch('/api/marketing/social/generate-week', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();

            if (data.days && Array.isArray(data.days)) {
                setCalendar(data.days);

                // Convert to Markdown
                let md = '# 📅 Weekly Social Media Planner\n\n';
                data.days.forEach((d: CalendarDay) => {
                    md += `## ${d.day}\n`;
                    md += `- **Topic**: ${d.topic}\n`;
                    md += `- **Type**: ${d.type}\n`;
                    md += `- **AI Caption**: ${d.caption}\n`;
                    md += `- **Image Prompt**: ${d.imagePrompt}\n\n`;
                });
                setMarkdown(md);

                // Save to file
                await fetch('/api/seo/ai/social/calendar', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ content: md })
                });
            } else {
                throw new Error('Invalid plan format');
            }
        } catch (e) {
            alert('Generation failed: ' + (e as Error).message);
        } finally {
            setGenerating(false);
        }
    };

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 animate-in">
            <div className="flex justify-between items-center">
                <div className="text-left">
                    <Link href="/dashboard/marketing" className="text-sm font-bold text-gray-400 hover:text-gray-600 flex items-center gap-2 mb-2">
                        ← Back to Marketing
                    </Link>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">AI Social Planner ✨</h1>
                    <p className="text-gray-500 font-medium">Strategic 7-day content calendar powered by Gemini.</p>
                </div>
                <button
                    onClick={generatePlan}
                    disabled={generating}
                    className="btn btn-primary px-8 py-4 rounded-2xl shadow-xl shadow-orange-100 hover:scale-105 active:scale-95 transition-all text-sm font-bold tracking-widest uppercase disabled:opacity-50"
                >
                    {generating ? '✨ Orchestrating...' : 'Generate 7-Day Plan'}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Visual Calendar */}
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-700 flex items-center gap-2 px-2">
                        <span>📅</span> Content Pipeline
                    </h3>
                    <div className="space-y-4">
                        {calendar.map((day, idx) => (
                            <div key={idx} className="glass-card p-6 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full translate-x-16 -translate-y-16 group-hover:bg-orange-50 transition-colors"></div>
                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">{day.day}</span>
                                            <h4 className="text-lg font-black text-gray-900">{day.topic}</h4>
                                        </div>
                                        <span className="bg-gray-100 px-3 py-1 rounded-full text-[10px] font-black text-gray-500 uppercase">{day.type}</span>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 group-hover:bg-white transition-colors">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Caption</p>
                                            <p className="text-sm text-gray-600 leading-relaxed italic">"{day.caption}"</p>
                                        </div>
                                        {day.imagePrompt && (
                                            <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                                                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2">Image Gen Prompt</p>
                                                <p className="text-[10px] text-blue-900 leading-relaxed font-mono opacity-70">{day.imagePrompt}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {calendar.length === 0 && (
                            <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200 text-gray-400">
                                <span className="text-6xl mb-4 block">📸</span>
                                <p className="font-bold">No plan generated yet.</p>
                                <p className="text-sm">Click "Generate 7-Day Plan" to start.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Raw Markdown / Bulk Edit */}
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-700 flex items-center gap-2 px-2">
                        <span>📝</span> Strategic Markdown
                    </h3>
                    <div className="glass-card bg-gray-900 rounded-[3rem] shadow-2xl overflow-hidden h-full flex flex-col border-4 border-gray-800">
                        <div className="p-6 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
                            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">weekly_content_calendar.md</span>
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                        </div>
                        <textarea
                            value={markdown}
                            onChange={(e) => {
                                setMarkdown(e.target.value);
                                // Potentially re-parse on pause
                            }}
                            className="flex-1 w-full p-8 bg-transparent text-gray-300 font-mono text-sm outline-none resize-none no-scrollbar h-[800px]"
                            spellCheck={false}
                        />
                        <div className="p-6 bg-gray-800 border-t border-gray-700 flex justify-end gap-4">
                            <button
                                onClick={async () => {
                                    setSaving(true);
                                    await fetch('/api/seo/ai/social/calendar', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ content: markdown })
                                    });
                                    parseMarkdown(markdown);
                                    setSaving(false);
                                    alert('Calendar updated!');
                                }}
                                className="px-6 py-2 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all"
                            >
                                {saving ? 'Saving...' : 'Sync Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
