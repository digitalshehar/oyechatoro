'use client';

import React, { memo } from 'react';
import Image from 'next/image';

interface FooterProps {
    year: number;
}

const Footer = memo(function Footer({ year }: FooterProps) {
    return (
        <footer className="footer bg-white border-t border-gray-100 pt-20 pb-32 md:pb-10">
            <div className="container">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="relative w-10 h-10">
                                <Image src="/logowhite.PNG" alt="Logo" fill className="object-contain" />
                            </div>
                            <span className="text-2xl font-black text-gray-900">Oye Chatoro</span>
                        </div>
                        <p className="text-gray-500 leading-relaxed max-w-sm">
                            Authentic Indian Vegetarian Street Food in Abu Road. Fresh, Hygienic, and Delicious. Serving happiness since 2024.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 mb-6">Quick Links</h4>
                        <ul className="space-y-4">
                            {['Home', 'Menu', 'Reviews', 'Contact'].map(item => (
                                <li key={item}><a href={`#${item.toLowerCase()}`} className="text-gray-500 hover:text-[var(--brand-primary)] transition-colors">{item}</a></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 mb-6">Connect</h4>
                        <ul className="space-y-4">
                            <li><a href="https://instagram.com/oyechatoro" target="_blank" className="text-gray-500 hover:text-pink-600 transition-colors flex items-center gap-2">📸 Instagram</a></li>
                            <li><a href="https://facebook.com/oyechatoro" target="_blank" className="text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-2">👥 Facebook</a></li>
                            <li><a href="https://share.google/i1ls8jxzjEOxQ5gd8" target="_blank" className="text-gray-500 hover:text-green-600 transition-colors flex items-center gap-2">🗺️ Google Maps</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-100 pt-8 text-center text-gray-400 text-sm">
                    <p>&copy; <span id="year">{year}</span> Oye Chatoro. All rights reserved. • Website by Akshay Tiwari</p>
                    <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-4 opacity-90 hover:opacity-100 transition-opacity">
                        <div className="relative w-24 h-12 md:w-28 md:h-14">
                            <Image src="/fssai.png" alt="FSSAI" fill className="object-contain" />
                        </div>
                        <div className="text-center md:text-left">
                            <p className="text-xs uppercase font-bold text-gray-500 tracking-wider mb-1">License No.</p>
                            <p className="font-mono text-lg font-bold text-gray-800 tracking-wide">22225023000513</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
});

export default Footer;
