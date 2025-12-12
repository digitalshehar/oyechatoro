'use client';

import React, { useState, useEffect } from 'react';

export function PrintButton() {
    return (
        <button
            onClick={() => window.print()}
            className="flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-800 transition-colors"
        >
            <span>🖨️</span> Print Recipe
        </button>
    );
}

export function OrderCTA({ itemName }: { itemName: string }) {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 z-50 animate-in">
            <div className="bg-white/95 backdrop-blur-md border border-[var(--brand-primary)] p-4 rounded-xl shadow-2xl flex items-center gap-4 max-w-sm ml-auto relative">
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute -top-2 -right-2 bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold text-gray-600 hover:bg-red-100 hover:text-red-500"
                >
                    ✕
                </button>
                <div className="w-12 h-12 rounded-lg bg-[var(--brand-primary)] flex items-center justify-center text-xl shadow-md">
                    🥡
                </div>
                <div className="flex-1">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Craving this?</p>
                    <h4 className="font-bold text-[var(--brand-dark)] leading-tight line-clamp-1">{itemName}</h4>
                </div>
                <a
                    href="/menu"
                    className="px-6 py-2 bg-[var(--brand-primary)] text-white font-bold rounded-full shadow-lg hover:bg-orange-600 hover:scale-105 transition-all text-sm whitespace-nowrap"
                >
                    Order Now
                </a>
            </div>
        </div>
    );
}

interface Comment {
    id: string;
    user: string;
    text: string;
    rating: number;
    createdAt: string;
}

export function CommentSection({ slug }: { slug?: string }) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [user, setUser] = useState('');
    const [rating, setRating] = useState(5);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (!slug) return;
        fetch(`/api/blog/comments?slug=${slug}`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setComments(data);
            })
            .catch(err => console.error('Failed to load comments', err));
    }, [slug]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim() || !user.trim() || !slug) return;

        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const res = await fetch('/api/blog/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    slug,
                    user,
                    text: newComment,
                    rating
                })
            });

            if (res.ok) {
                const comment = await res.json();
                setComments([comment, ...comments]);
                setNewComment('');
                setUser('');
                setRating(5);
                setSuccess(true);
                setTimeout(() => setSuccess(false), 3000);
            } else {
                const errorData = await res.json();
                setError(errorData.error || 'Failed to post comment. Please try again.');
            }
        } catch (error) {
            console.error('Failed to post comment', error);
            setError('Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mt-16">
            <h3 className="text-2xl font-black text-[var(--brand-dark)] mb-8 flex items-center gap-3">
                💬 Discussion <span className="text-lg text-gray-400 font-medium">({comments.length})</span>
            </h3>

            {/* Comment Form */}
            <form onSubmit={handleSubmit} className="mb-12">
                <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xl shrink-0">
                        👤
                    </div>
                    <div className="flex-1 space-y-3">
                        <input
                            type="text"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            placeholder="Your Name"
                            className="w-full p-3 rounded-xl bg-gray-50 border-2 border-transparent focus:border-orange-100 focus:bg-white outline-none transition-all font-bold"
                            required
                        />
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Share your thoughts or ask a question..."
                            className="w-full p-4 rounded-xl bg-gray-50 border-2 border-transparent focus:border-orange-100 focus:bg-white outline-none transition-all min-h-[100px] resize-y"
                            required
                        />
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="flex gap-1 text-2xl cursor-pointer transition-all">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        onClick={() => setRating(star)}
                                        className={`transition-transform hover:scale-125 ${rating >= star ? 'grayscale-0 opacity-100' : 'grayscale opacity-30 text-gray-300'}`}
                                        title={`Rate ${star} stars`}
                                        role="button"
                                        aria-label={`Rate ${star} stars`}
                                    >
                                        ⭐
                                    </span>
                                ))}
                            </div>
                            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                                {error && <span className="text-red-500 text-sm font-bold animate-pulse">{error}</span>}
                                {success && <span className="text-green-500 text-sm font-bold animate-in fade-in slide-in-from-bottom-2">Posted!</span>}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-6 py-2 bg-[var(--brand-dark)] text-white font-bold rounded-lg hover:bg-black transition-colors disabled:opacity-50 whitespace-nowrap"
                                >
                                    {loading ? 'Posting...' : 'Post Comment'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            {/* Comments List */}
            <div className="space-y-8">
                {comments.length === 0 ? (
                    <p className="text-center text-gray-400">No comments yet. Be the first to start the discussion!</p>
                ) : (
                    comments.map(comment => (
                        <div key={comment.id} className="flex gap-4 animate-in fade-in slide-in-from-bottom-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-500 font-bold text-xl shrink-0">
                                {comment.user?.charAt(0) || 'G'}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <h4 className="font-bold text-gray-900">{comment.user}</h4>
                                    <span className="text-xs font-bold text-gray-400">
                                        {new Date(comment.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </span>
                                </div>
                                <div className="flex text-yellow-400 text-sm mb-2">
                                    {'★'.repeat(comment.rating || 5)}
                                    {'☆'.repeat(5 - (comment.rating || 5))}
                                </div>
                                <p className="text-gray-600 leading-relaxed">{comment.text}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export function TOC({ headings }: { headings: { id: string; text: string; level: number }[] }) {
    if (headings.length === 0) return null;

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24 mb-6">
            <h4 className="font-bold text-[var(--brand-dark)] mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                📋 On this page
            </h4>
            <nav className="flex flex-col gap-2">
                {headings.map(h => (
                    <a
                        key={h.id}
                        href={`#${h.id}`}
                        className={`text-sm hover:text-[var(--brand-primary)] transition-colors py-1 block ${h.level === 3 ? 'pl-4 text-gray-500' : 'font-bold text-gray-700'
                            }`}
                        onClick={(e) => {
                            e.preventDefault();
                            document.querySelector(`#${h.id}`)?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        {h.text}
                    </a>
                ))}
            </nav>
        </div>
    );
}
