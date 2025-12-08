'use client';

import React from 'react';
import Image from 'next/image';

export default function ScanPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-5 font-sans relative overflow-hidden">
            {/* Background Decoration */}
            <div className="bg-decor"></div>

            {/* Floating Shapes */}
            <div className="floating-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
            </div>

            <div className="relative z-10 w-full max-w-[400px] p-8 glass-card rounded-3xl animate-in">
                <div className="relative w-[120px] h-[120px] mx-auto mb-6">
                    <Image
                        src="/logowhite.PNG"
                        alt="Oye Chatoro"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

                <h1 className="text-3xl font-bold text-[var(--brand-dark)] mb-2">Oye Chatoro</h1>
                <p className="text-[var(--text-muted)] text-sm tracking-widest uppercase mb-8">Premium Vegetarian Dining</p>

                <div className="bg-white p-4 rounded-2xl inline-block mb-8 shadow-lg transition-transform hover:scale-105 duration-300 border border-[var(--border-light)]">
                    <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://oyechatoro.com/menu&color=ea580c&bgcolor=ffffff&margin=10"
                        alt="Scan for Menu"
                        className="w-[200px] h-[200px] block"
                    />
                </div>

                <p className="font-display text-2xl text-[var(--text-main)] mb-3">Scan to view <span className="text-gradient italic">Digital Menu</span></p>
                <p className="text-[var(--text-muted)] text-sm">Contactless Ordering Experience</p>

                <div className="mt-8">
                    <a href="/menu" className="btn btn-primary btn-glow w-full">View Menu Directly</a>
                </div>
            </div>

            <div className="relative z-10 mt-10 text-xs text-[var(--text-light)]">
                &copy; 2024 Oye Chatoro. All rights reserved.
            </div>
        </div>
    );
}
