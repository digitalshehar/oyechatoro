'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Topic {
    id: string;
    title: string;
    description: string;
    status: 'Ready' | 'Generating' | 'Drafted' | 'Failed';
    draft?: any;
}

const INITIAL_TOPICS: Topic[] = [
    { id: '1', title: 'Top 10 Street Foods in Abu Road', description: 'Focus on local favorites like Rabri, Dal Bada, and Oye Chatoro Specials.', status: 'Ready' },
    { id: '2', title: 'Weekend Guide to Mount Abu', description: 'Comprehensive travel guide for tourists staying in Abu Road.', status: 'Ready' },
    { id: '3', title: 'Why Oye Chatoro is the Best Pure Veg Spot', description: 'Branding post highlighting hygiene, live kitchen, and taste.', status: 'Ready' },
    { id: '4', title: 'The Secret Behind Our Maharaja Pizza', description: 'Recipe style post for the most popular menu item.', status: 'Ready' },
    { id: '5', title: 'Abu Road Railway Station Food Guide', description: 'Targeting travelers looking for quality food near the station.', status: 'Ready' }
];

export default function BlogAutomationPage() {
    const [topics, setTopics] = useState<Topic[]>(INITIAL_TOPICS);
    const [generating, setGenerating] = useState<string | null>(null);

    const generateDraft = async (topic: Topic) => {
        setGenerating(topic.id);
        setTopics(prev => prev.map(t => t.id === topic.id ? { ...t, status: 'Generating' } : t));

        try {
            const res = await fetch('/api/seo/ai/blog', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic: topic.title })
            });
            const data = await res.json();

            setTopics(prev => prev.map(t => t.id === topic.id ? {
                ...t,
                status: 'Drafted',
                draft: data
            } : t));
        } catch (e) {
            setTopics(prev => prev.map(t => t.id === topic.id ? { ...t, status: 'Failed' } : t));
        } finally {
            setGenerating(null);
        }
    };

    const publishDraft = async (topic: Topic) => {
        if (!topic.draft) return;

        try {
            const res = await fetch('/api/blog', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...topic.draft,
                    status: 'Draft' // Save as draft first for manual review
                })
            });
            if (res.ok) {
                alert('Success! Draft saved to Blog Management.');
                setTopics(prev => prev.map(t => t.id === topic.id ? { ...t, status: 'Ready', draft: undefined } : t));
            } else {
                throw new Error('Failed to publish');
            }
        } catch (e) {
            alert('Error publishing draft');
        }
    };

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 animate-in">
            <div className="flex justify-between items-center">
                <div className="text-left">
                    <Link href="/dashboard/marketing" className="text-sm font-bold text-gray-400 hover:text-gray-600 flex items-center gap-2 mb-2">
                        ← Back to Marketing
                    </Link>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">AI Blog Studio ✍️</h1>
                    <p className="text-gray-500 font-medium">Automated content engine for SEO & Branding.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Topic Backlog */}
                <div className="lg:col-span-1 space-y-6">
                    <h3 className="text-xl font-bold text-gray-700 flex items-center gap-2 px-2">
                        <span>📋</span> Content Backlog
                    </h3>
                    <div className="space-y-4">
                        {topics.map((topic) => (
                            <div
                                key={topic.id}
                                className={`glass-card p-6 rounded-3xl border transition-all ${topic.status === 'Generating' ? 'border-blue-200 bg-blue-50/50' : 'border-gray-100 bg-white hover:border-orange-200'}`}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest ${topic.status === 'Drafted' ? 'bg-green-100 text-green-600' :
                                            topic.status === 'Generating' ? 'bg-blue-100 text-blue-600 animate-pulse' :
                                                'bg-gray-100 text-gray-400'
                                        }`}>
                                        {topic.status}
                                    </span>
                                </div>
                                <h4 className="font-bold text-gray-800 mb-2 leading-tight">{topic.title}</h4>
                                <p className="text-xs text-gray-500 mb-6 line-clamp-2">{topic.description}</p>

                                {topic.status === 'Ready' || topic.status === 'Failed' ? (
                                    <button
                                        onClick={() => generateDraft(topic)}
                                        disabled={!!generating}
                                        className="w-full py-2 bg-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 transition-all disabled:opacity-50"
                                    >
                                        Generate Draft
                                    </button>
                                ) : topic.status === 'Drafted' ? (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => publishDraft(topic)}
                                            className="flex-1 py-2 bg-green-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-green-700 transition-all"
                                        >
                                            Save as Draft
                                        </button>
                                        <button
                                            onClick={() => setTopics(prev => prev.map(t => t.id === topic.id ? { ...t, status: 'Ready' } : t))}
                                            className="px-3 bg-gray-100 text-gray-400 rounded-xl hover:bg-gray-200"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ) : null}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Preview Window */}
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-xl font-bold text-gray-700 flex items-center gap-2 px-2">
                        <span>👁️</span> AI Draft Preview
                    </h3>
                    <div className="glass-card bg-white rounded-[3rem] border border-gray-100 shadow-2xl h-full min-h-[600px] overflow-hidden flex flex-col">
                        {generating ? (
                            <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
                                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
                                    <span className="text-4xl text-orange-500 italic">G</span>
                                </div>
                                <h4 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">Gemini is Researching...</h4>
                                <p className="text-gray-500 text-sm max-w-sm">Gathering local Abu Road data, optimizing for SEO, and crafting a unique culinary narrative.</p>
                                <div className="mt-8 flex gap-2">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                                </div>
                            </div>
                        ) : topics.find(t => t.status === 'Drafted') ? (
                            <div className="flex-1 overflow-y-auto p-12 no-scrollbar">
                                {(() => {
                                    const draft = topics.find(t => t.status === 'Drafted')?.draft;
                                    if (!draft) return null;
                                    return (
                                        <article className="prose prose-orange max-w-none">
                                            <div className="flex items-center gap-4 mb-8">
                                                <span className="bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{draft.category}</span>
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{draft.readingTime}</span>
                                            </div>
                                            <h1 className="text-5xl font-black text-gray-900 mb-8 leading-tight">{draft.title}</h1>
                                            <div className="bg-gray-50 p-6 rounded-3xl mb-12 border border-gray-100 italic text-gray-600">
                                                {draft.excerpt}
                                            </div>
                                            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed font-serif text-lg">
                                                {draft.content}
                                            </div>
                                            <div className="mt-12 p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100">
                                                <h4 className="text-sm font-black text-blue-800 uppercase tracking-widest mb-4">SEO Intelligence Output</h4>
                                                <div className="grid grid-cols-2 gap-8 text-xs">
                                                    <div>
                                                        <p className="font-black text-blue-400 uppercase mb-1">SEO Title</p>
                                                        <p className="font-medium text-blue-900">{draft.seoTitle}</p>
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-blue-400 uppercase mb-1">SEO Meta</p>
                                                        <p className="font-medium text-blue-900">{draft.seoDescription}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                    );
                                })()}
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-center p-12 text-gray-300">
                                <span className="text-8xl mb-6 opacity-20">✍️</span>
                                <p className="font-bold text-xl mb-2">Select a topic from the backlog</p>
                                <p className="text-sm max-w-xs">AI will generate a full blog post with SEO metadata, reading time, and excerpts.</p>
                            </div>
                        )}

                        <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">Gemini 2.5 Flash Engine v1.0</span>
                            <div className="flex gap-4">
                                {topics.find(t => t.status === 'Drafted') && (
                                    <button
                                        onClick={() => publishDraft(topics.find(t => t.status === 'Drafted')!)}
                                        className="btn btn-primary px-8 py-3 rounded-xl shadow-lg shadow-orange-100 hover:scale-105 active:scale-95 transition-all text-xs font-black uppercase tracking-widest"
                                    >
                                        Confirm & Save Draft
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
