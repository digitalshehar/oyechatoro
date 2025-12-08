'use client';

import React from 'react';

interface ContactSectionProps {
    isVisible: boolean;
}

export default function ContactSection({ isVisible }: ContactSectionProps) {
    return (
        <section id="contact" className={`section py-12 md:py-24 bg-gray-50 ${isVisible ? 'animate-in' : ''}`}>
            <div className="container">
                <div className="section-header text-center mb-16">
                    <h2 className="section-title text-4xl font-black mb-4">Visit Us 📍</h2>
                    <p className="section-subtitle text-xl text-gray-500">We are waiting to serve you!</p>
                </div>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <div className="feature-card glass-card p-8 rounded-3xl bg-white border border-gray-100 hover:shadow-xl transition-all text-left h-full flex flex-col justify-between">
                        <div>
                            <h3 className="text-2xl font-bold text-[var(--brand-primary)] mb-6">Oye Chatoro</h3>
                            <div className="space-y-4 text-gray-600">
                                <p className="flex gap-3"><span className="text-xl">📍</span><span>Abu Central Mall, G-5, Riico Check Post Road, Abu Road, Rajasthan 307026</span></p>
                                <p className="flex gap-3"><span className="text-xl">🕒</span><span>Daily 5:00 PM – 11:00 PM</span></p>
                                <p className="flex gap-3"><span className="text-xl">📞</span><a href="tel:+919509913792" className="hover:text-[var(--brand-primary)] font-bold">+91-9509913792</a></p>
                            </div>
                        </div>
                        <a href="https://share.google/JVyw8Lyd9XfsMw3m1" target="_blank" className="btn btn-primary btn-glow w-full mt-8 rounded-xl py-4 shadow-lg shadow-orange-100">Get Directions 🗺️</a>
                    </div>
                    <div className="feature-card glass-card p-8 rounded-3xl bg-gradient-to-br from-orange-50 to-white border border-orange-100 hover:shadow-xl transition-all text-left relative overflow-hidden">
                        <span className="absolute top-4 right-4 bg-black text-white px-2 py-1 rounded text-xs font-bold">AD</span>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Need a Website? 💻</h3>
                        <p className="text-gray-500 mb-6">Get a premium business website like this one.</p>
                        <div className="text-3xl font-black text-[var(--brand-secondary)] mb-6">
                            ₹9,999 <span className="text-lg text-gray-400 line-through font-normal">₹24,999</span>
                        </div>
                        <a href="https://wa.me/919509913792?text=I am interested in Website Development" target="_blank" className="btn btn-outline w-full rounded-xl py-4 border-2 font-bold hover:bg-gray-900 hover:border-gray-900 hover:text-white">Contact Developer 👨‍💻</a>
                    </div>
                </div>
            </div>
        </section>
    );
}
