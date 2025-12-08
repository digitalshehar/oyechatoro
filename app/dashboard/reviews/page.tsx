'use client';

import React from 'react';

// Mock Data
const REVIEWS = [
    { id: 1, author: 'Narsingh Ranga', rating: 5, date: '4 days ago', text: 'Fast, friendly, and efficient—Oye Chattore of Abu Road stands out. The staff ensures you\'re well taken care of.', source: 'Google' },
    { id: 2, author: 'Sagar Sachan 7173', rating: 5, date: '5 days ago', text: 'Very tasty pizza in Abu road like dominos pizza. Must visit place.', source: 'Google' },
    { id: 3, author: 'Rider Boy', rating: 4, date: '3 weeks ago', text: 'Good food, a bit crowded on weekends but worth the wait.', source: 'Google' },
    { id: 4, author: 'Pritam Yadav', rating: 5, date: '2 weeks ago', text: 'Better food than other in abu road. Hygiene is very good.', source: 'Google' },
];

export default function ReviewsPage() {
    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-8 animate-in">
                <h1 className="text-3xl font-bold text-[var(--brand-dark)]">Customer Reviews</h1>
                <div className="flex gap-4 items-center">
                    <div className="glass-card px-4 py-2 rounded-xl flex items-center gap-2">
                        <span className="text-2xl font-bold text-[var(--brand-dark)]">4.9</span>
                        <div className="flex flex-col">
                            <span className="text-[var(--brand-accent)] text-xs">⭐⭐⭐⭐⭐</span>
                            <span className="text-[var(--text-muted)] text-xs">Overall Rating</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 animate-in" style={{ animationDelay: '0.1s' }}>
                {REVIEWS.map((review) => (
                    <div key={review.id} className="glass-card p-6 rounded-2xl hover:bg-white/40 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[var(--brand-primary)] text-white flex items-center justify-center font-bold text-lg">
                                    {review.author.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-[var(--text-main)]">{review.author}</h3>
                                    <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                                        <span>{review.source} Review</span>
                                        <span>•</span>
                                        <span>{review.date}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 bg-white/50 px-2 py-1 rounded-lg border border-[var(--border-light)]">
                                <span className="text-[var(--brand-accent)]">⭐</span>
                                <span className="font-bold text-[var(--brand-dark)]">{review.rating}.0</span>
                            </div>
                        </div>

                        <p className="text-[var(--text-muted)] leading-relaxed mb-4">"{review.text}"</p>

                        <div className="flex gap-3">
                            <button className="text-sm text-[var(--brand-primary)] font-medium hover:underline">Reply</button>
                            <button className="text-sm text-[var(--text-muted)] hover:text-[var(--text-main)]">Share</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
