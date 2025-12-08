'use client';

import React from 'react';
import Image from 'next/image';

interface HeroSectionProps {
    scrollY: number;
    isVisible: boolean;
}

export default function HeroSection({ scrollY, isVisible }: HeroSectionProps) {
    return (
        <section id="home" className={`hero min-h-[70vh] md:min-h-[85vh] flex items-center relative overflow-hidden ${isVisible ? 'animate-in' : ''}`}>
            <div className="absolute inset-0 bg-[#fff7ed] opacity-50 z-0">
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#991b1b 1px, transparent 1px)', backgroundSize: '30px 30px', opacity: 0.05 }}></div>
            </div>
            <div className="container relative z-10 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="hero-content text-left" style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
                    <span className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-[#991b1b] px-4 py-2 rounded-full font-bold text-sm mb-6 shadow-sm">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        100% Pure Vegetarian
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 text-gray-900">
                        Authentic <span className="text-[#991b1b]">Desi Flavors</span> <br />
                        Delivered Fresh.
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-lg font-medium">
                        Experience the true taste of Abu Road. From spicy Chaats to rich Thalis, we serve tradition on a plate.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <a href="#menu" className="btn btn-primary text-lg px-8 py-4 rounded-full shadow-xl shadow-red-900/20 hover:shadow-2xl hover:scale-105 transition-all text-center">Order Now 🥘</a>
                        <a href="#offers" className="btn btn-outline text-lg px-8 py-4 rounded-full border-2 hover:bg-red-50 transition-all text-center">View Offers %</a>
                    </div>
                    <div className="mt-12 flex items-center gap-6">
                        <div className="flex -space-x-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-12 h-12 rounded-full border-4 border-white shadow-md overflow-hidden">
                                    <Image src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 5}`} alt="User" width={48} height={48} />
                                </div>
                            ))}
                        </div>
                        <div>
                            <div className="flex text-yellow-500 text-lg">⭐⭐⭐⭐⭐</div>
                            <p className="text-sm font-bold text-gray-500">Trusted by 5000+ Foodies</p>
                        </div>
                    </div>
                </div>
                <div className="hero-image relative h-[400px] md:h-[600px] flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-tr from-red-100 to-transparent rounded-full filter blur-3xl opacity-40 animate-pulse"></div>
                    <div className="relative w-full h-full max-w-[500px] max-h-[500px] animate-float">
                        <div className="absolute inset-0 bg-[#991b1b]/5 rounded-full blur-2xl transform rotate-12"></div>
                        <div className="relative w-full h-full bg-white/40 backdrop-blur-md border border-white/60 p-6 rounded-[3rem] shadow-2xl flex items-center justify-center overflow-hidden">
                            <div className="text-[10rem] md:text-[12rem] filter drop-shadow-2xl transform hover:scale-110 transition-transform duration-700 cursor-pointer">🍛</div>
                            <div className="absolute top-8 right-8 bg-white p-3 rounded-2xl shadow-lg animate-bounce-subtle flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-xl">🥬</div>
                                <div><p className="text-xs text-gray-500 font-bold uppercase">Pure</p><p className="font-bold text-gray-900">Veg</p></div>
                            </div>
                            <div className="absolute bottom-8 left-8 bg-white p-3 rounded-2xl shadow-lg animate-bounce-subtle" style={{ animationDelay: '1s' }}>
                                <div className="flex items-center gap-2 mb-1"><span className="text-yellow-500 font-black text-xl">4.9</span><span className="text-xs text-gray-400">/ 5.0</span></div>
                                <p className="text-xs font-bold text-gray-900">Top Rated in Abu Road</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
