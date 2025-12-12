'use client';

import React, { useState } from 'react';

export default function NewsletterWidget() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        // Mock API call
        setStatus('success');
        setEmail('');
    };

    if (status === 'success') {
        return (
            <div className="bg-green-50 border border-green-100 p-8 rounded-3xl text-center">
                <div className="text-4xl mb-4">🎉</div>
                <h3 className="font-bold text-green-800 mb-2">Welcome to the family!</h3>
                <p className="text-green-600">You're now on the list for spicy updates.</p>
                <button
                    onClick={() => setStatus('idle')}
                    className="mt-4 text-sm font-bold text-green-700 underline"
                >
                    Add another email
                </button>
            </div>
        );
    }

    return (
        <div className="bg-[var(--brand-dark)] p-8 rounded-3xl text-white relative overflow-hidden">
            {/* Decor Circles */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-red-500 rounded-full blur-3xl opacity-20 pointer-events-none"></div>

            <div className="relative z-10">
                <div className="w-12 h-12 bg-white/10 backdrop-blur rounded-xl flex items-center justify-center text-2xl mb-6">
                    📩
                </div>
                <h3 className="text-2xl font-black mb-2">Don't Miss a Bite!</h3>
                <p className="text-white/70 mb-8 font-medium">Join 10,000+ foodies getting secret recipes and offers every week.</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full py-3 bg-[var(--brand-primary)] text-white font-bold rounded-xl hover:bg-orange-600 transition-transform active:scale-95 shadow-lg shadow-orange-900/20"
                    >
                        Subscribe Free
                    </button>
                </form>
                <p className="text-xs text-white/30 mt-4 text-center">No spam, just ham (and chicken). Unsubscribe anytime.</p>
            </div>
        </div>
    );
}
