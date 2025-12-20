'use client';

import React, { useState } from 'react';
import { useDbReviews, Review } from '../../lib/db-hooks';

const FALLBACK_REVIEWS: Review[] = [
    {
        id: '1',
        name: "Narsingh Ranga",
        avatar: null,
        rating: 5,
        date: "4 days ago",
        comment: "Fast, friendly, and efficient—Oye Chattore of Abu Road stands out. The staff ensures you're well taken care of."
    },
    {
        id: '2',
        name: "Sagar Sachan 7173",
        avatar: null,
        rating: 5,
        date: "5 days ago",
        comment: "Very tasty pizza in Abu road like dominos pizza. Must visit place."
    }
];

export default function ReviewsPage() {
    const { reviews, loading } = useDbReviews(FALLBACK_REVIEWS);
    const [analyzing, setAnalyzing] = useState(false);
    const [sentiment, setSentiment] = useState<any>(null);
    const [replies, setReplies] = useState<Record<string, { text: string; loading: boolean }>>({});

    const runSentiment = async () => {
        setAnalyzing(true);
        try {
            const res = await fetch('/api/seo/ai/sentiment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reviews })
            });
            const data = await res.json();
            setSentiment(data);
        } catch (e) {
            console.error(e);
        } finally {
            setAnalyzing(false);
        }
    };

    const generateReply = async (review: Review) => {
        setReplies(prev => ({ ...prev, [review.id]: { text: '', loading: true } }));
        try {
            const res = await fetch('/api/seo/ai/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reviewText: review.comment, rating: review.rating })
            });
            const data = await res.json();
            setReplies(prev => ({ ...prev, [review.id]: { text: data.response, loading: false } }));
        } catch (e) {
            console.error(e);
            setReplies(prev => ({ ...prev, [review.id]: { text: 'Failed to generate reply.', loading: false } }));
        }
    };

    const avgRating = reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : '5.0';

    if (loading) return <div className="p-8 text-center text-gray-500">Loading Reviews...</div>;

    return (
        <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 animate-in">
                <div>
                    <h1 className="text-4xl font-black text-[var(--brand-dark)] tracking-tight">Customer Intelligence</h1>
                    <p className="text-[var(--text-muted)] font-medium">Real-time feedback & AI-powered sentiment extraction.</p>
                </div>
                <div className="flex gap-4 items-center">
                    <div className="glass-card bg-white px-8 py-4 rounded-3xl flex items-center gap-4 shadow-xl border border-gray-100">
                        <span className="text-4xl font-black text-[var(--brand-dark)]">{avgRating}</span>
                        <div className="flex flex-col">
                            <span className="text-yellow-400 text-sm">{'★'.repeat(Math.round(Number(avgRating)))}</span>
                            <span className="text-[var(--text-muted)] text-[10px] font-black uppercase tracking-widest">Global Rating</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Sentiment Summary */}
            <div className={`glass-card p-8 rounded-[40px] bg-black text-white relative overflow-hidden transition-all ${sentiment ? 'scale-100' : 'hover:scale-[1.02]'}`}>
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <span className="text-8xl">🤖</span>
                </div>
                <div className="relative z-10">
                    <h2 className="text-2xl font-black mb-2">Market Sentiment Insight</h2>
                    {!sentiment ? (
                        <div className="space-y-4">
                            <p className="text-gray-400 text-sm max-w-lg mb-6 leading-relaxed">Let AI analyze all current reviews to find hidden trends, common complaints, and areas of excellence.</p>
                            <button
                                onClick={runSentiment}
                                disabled={analyzing}
                                className="px-8 py-4 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[var(--brand-secondary)] transition-all disabled:opacity-50"
                            >
                                {analyzing ? '🔍 Deciphering Feedback...' : 'Analyze Market Sentiment'}
                            </button>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-3 gap-8 mt-8 animate-in slide-in-from-bottom-5">
                            <div className="space-y-4">
                                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Overall Score</p>
                                <div className="text-3xl font-black text-green-400">{sentiment.overallSentiment}</div>
                            </div>
                            <div className="space-y-4">
                                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Key Pros</p>
                                <ul className="text-sm space-y-2 text-gray-300">
                                    {sentiment.topPros.map((pro: string, i: number) => <li key={i} className="flex gap-2"><span>✨</span> {pro}</li>)}
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Opportunities</p>
                                <ul className="text-sm space-y-2 text-gray-300">
                                    {sentiment.topCons.map((con: string, i: number) => <li key={i} className="flex gap-2"><span>⚠️</span> {con}</li>)}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid gap-6 animate-in" style={{ animationDelay: '0.1s' }}>
                {reviews.map((review) => (
                    <div key={review.id} className="glass-card bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-2xl transition-all group overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-1 h-full bg-gray-50 group-hover:bg-[var(--brand-primary)] transition-colors"></div>

                        <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-gray-50 text-[var(--brand-primary)] flex items-center justify-center font-black text-xl shadow-inner group-hover:bg-[var(--brand-primary)] group-hover:text-white transition-all">
                                    {review.avatar ? (
                                        <img src={review.avatar} className="w-full h-full object-cover rounded-2xl" alt="" />
                                    ) : (
                                        review.name.charAt(0)
                                    )}
                                </div>
                                <div className="text-left">
                                    <h3 className="font-black text-xl text-gray-900">{review.name}</h3>
                                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                        <span>Google Customer</span>
                                        <span>•</span>
                                        <span>{new Date(review.date).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                                <span className="text-yellow-400 text-lg">★</span>
                                <span className="font-black text-gray-900">{review.rating}.0</span>
                            </div>
                        </div>

                        <p className="text-gray-600 leading-relaxed mb-8 italic text-lg font-serif">"{review.comment}"</p>

                        <div className="flex flex-col space-y-4">
                            <div className="flex gap-4">
                                <button
                                    onClick={() => generateReply(review)}
                                    disabled={replies[review.id]?.loading}
                                    className="px-6 py-3 bg-gray-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[var(--brand-primary)] transition-all disabled:opacity-50 flex items-center gap-2"
                                >
                                    {replies[review.id]?.loading ? '🤖 Crafting Response...' : '✨ Generate AI Reply'}
                                </button>
                                <button className="px-6 py-3 bg-gray-50 text-gray-400 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-100 transition-all">Share</button>
                            </div>

                            {replies[review.id]?.text && (
                                <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 animate-in slide-in-from-top-2">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-xs font-black text-blue-600 uppercase tracking-[0.2em]">Automated Reply Draft</span>
                                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                                    </div>
                                    <p className="text-sm text-blue-900 leading-relaxed font-medium">{replies[review.id].text}</p>
                                    <div className="mt-4 flex gap-2">
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(replies[review.id].text);
                                                alert('Response copied to clipboard!');
                                            }}
                                            className="text-[10px] font-black text-blue-600 hover:underline uppercase"
                                        >
                                            Copy to Clipboard
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
