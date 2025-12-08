'use client';

import React, { useState } from 'react';

export default function MarketingPage() {
    const [message, setMessage] = useState('');
    const [segment, setSegment] = useState('All Customers');
    const [isSending, setIsSending] = useState(false);
    const [sentSuccess, setSentSuccess] = useState(false);

    const handleSend = () => {
        if (!message) return;
        setIsSending(true);
        // Simulate API call
        setTimeout(() => {
            setIsSending(false);
            setSentSuccess(true);
            setMessage('');
            setTimeout(() => setSentSuccess(false), 3000);
        }, 2000);
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-8 animate-in">
                <h1 className="text-3xl font-bold text-[var(--brand-dark)]">WhatsApp Marketing</h1>
                <div className="glass-card px-4 py-2 rounded-xl flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-sm font-medium text-[var(--text-muted)]">WhatsApp API Connected</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Campaign Builder */}
                <div className="lg:col-span-2 glass-card p-8 rounded-2xl animate-in" style={{ animationDelay: '0.1s' }}>
                    <h3 className="font-bold text-xl text-[var(--brand-dark)] mb-6">New Campaign</h3>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-muted)] mb-2">Select Audience</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {['All Customers', 'VIPs', 'Loyal', 'New'].map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => setSegment(s)}
                                        className={`px-4 py-3 rounded-xl border text-sm font-bold transition-all ${segment === s
                                                ? 'border-[var(--brand-primary)] bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]'
                                                : 'border-[var(--border-light)] text-[var(--text-muted)] hover:bg-gray-50'
                                            }`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-muted)] mb-2">Message Content</label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Hey {Name}, try our new Paneer Tikka Pizza today and get 20% off! Use code: PIZZA20"
                                className="w-full h-40 px-4 py-3 rounded-xl border border-[var(--border-light)] outline-none focus:border-[var(--brand-primary)] resize-none"
                            ></textarea>
                            <div className="flex justify-between mt-2 text-xs text-[var(--text-muted)]">
                                <span>Variables: {'{Name}'}, {'{LastOrder}'}</span>
                                <span>{message.length} chars</span>
                            </div>
                        </div>

                        <button
                            onClick={handleSend}
                            disabled={isSending || !message}
                            className={`w-full py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 ${isSending ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 shadow-lg shadow-green-500/30'
                                }`}
                        >
                            {isSending ? (
                                <>Sending...</>
                            ) : sentSuccess ? (
                                <>Sent Successfully! ✅</>
                            ) : (
                                <>🚀 Send Campaign</>
                            )}
                        </button>
                    </div>
                </div>

                {/* Preview & History */}
                <div className="space-y-6 animate-in" style={{ animationDelay: '0.2s' }}>
                    {/* Mobile Preview */}
                    <div className="glass-card p-6 rounded-2xl bg-gray-100">
                        <h3 className="font-bold text-sm text-[var(--text-muted)] mb-4 uppercase tracking-wider">Preview</h3>
                        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 max-w-[280px] mx-auto">
                            <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
                                <div className="w-8 h-8 rounded-full bg-orange-500"></div>
                                <div className="text-xs font-bold">Oye Chatoro</div>
                            </div>
                            <div className="bg-[#dcf8c6] p-3 rounded-lg rounded-tl-none text-sm text-gray-800 shadow-sm">
                                {message || "Your message preview will appear here..."}
                                <div className="text-[10px] text-gray-500 text-right mt-1">12:30 PM</div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Campaigns */}
                    <div className="glass-card p-6 rounded-2xl">
                        <h3 className="font-bold text-[var(--brand-dark)] mb-4">Recent Campaigns</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center pb-3 border-b border-[var(--border-light)]">
                                <div>
                                    <div className="font-bold text-sm text-[var(--text-main)]">Weekend Special</div>
                                    <div className="text-xs text-[var(--text-muted)]">Sent to 450 customers</div>
                                </div>
                                <span className="text-green-600 text-xs font-bold bg-green-100 px-2 py-1 rounded">Delivered</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="font-bold text-sm text-[var(--text-main)]">New Menu Launch</div>
                                    <div className="text-xs text-[var(--text-muted)]">Sent to 1,200 customers</div>
                                </div>
                                <span className="text-green-600 text-xs font-bold bg-green-100 px-2 py-1 rounded">Delivered</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
