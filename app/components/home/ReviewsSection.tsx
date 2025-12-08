'use client';

import React from 'react';
import Image from 'next/image';

interface Review {
    author_name: string;
    rating: number;
    relative_time_description: string;
    text: string;
}

interface ReviewsSectionProps {
    reviews: Review[];
    isVisible: boolean;
}

export default function ReviewsSection({ reviews, isVisible }: ReviewsSectionProps) {
    const getRandomColor = () => {
        const colors = ['#f97316', '#ea580c', '#d97706', '#c2410c', '#b45309'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    return (
        <section id="reviews" className={`section py-24 bg-white ${isVisible ? 'animate-in' : ''}`}>
            <div className="container">
                <div className="section-header text-center mb-16">
                    <h2 className="section-title text-4xl md:text-5xl font-black mb-4">Customer Love ❤️</h2>
                    <div className="flex items-center justify-center gap-4 mb-6 bg-orange-50 inline-flex px-6 py-3 rounded-2xl border border-orange-100">
                        <span className="text-4xl font-black text-gray-900">5.0</span>
                        <div className="text-2xl text-yellow-400">⭐⭐⭐⭐⭐</div>
                        <span className="text-gray-500 font-medium">(30+ Google Reviews)</span>
                    </div>
                    <p className="section-subtitle text-xl text-gray-500 mb-8">What people are saying about Oye Chatoro</p>
                    <a href="https://www.google.com/search?q=Oye+Chatoro+Abu+Road#lrd=0x395c5b0042401a9d:0x633535252873130,3,,,," target="_blank" className="btn btn-outline px-6 py-3 rounded-xl hover:bg-gray-50">Write a Review ✍️</a>
                </div>
                <div className="reviews-scroller flex gap-6 overflow-x-auto pb-8 px-4 snap-x snap-mandatory no-scrollbar">
                    {reviews.map((r, i) => (
                        <div key={i} className="review-card glass-card min-w-[350px] p-8 rounded-3xl border border-gray-100 snap-center hover:border-orange-200 transition-all duration-300 bg-white" style={{ animationDelay: `${i * 0.1}s` }}>
                            <div className="review-header flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md" style={{ background: getRandomColor() }}>
                                    {r.author_name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-lg">{r.author_name}</h4>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                                        <span>• Google</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600 leading-relaxed mb-6 italic">"{r.text}"</p>
                            <small className="block text-gray-400 font-medium">{r.relative_time_description}</small>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
