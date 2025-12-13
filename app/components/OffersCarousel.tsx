
'use client';

import React from 'react';
import { useDbOffers } from '../lib/db-hooks';

interface OffersCarouselProps {
    theme?: 'light' | 'dark';
}

export default function OffersCarousel({ theme = 'dark' }: OffersCarouselProps) {
    const { offers } = useDbOffers();
    const activeOffers = offers.filter(o => o.status === 'Active');

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        alert(`Code ${text} copied!`);
    };

    if (activeOffers.length === 0) {
        if (theme === 'light') {
            return (
                <div className="text-center py-12 text-gray-400 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                    <p className="text-lg font-medium">No active offers right now. Check back soon! 🎁</p>
                </div>
            );
        }
        return null;
    }

    const containerClass = theme === 'dark'
        ? "relative z-30 -mt-10 mb-8 max-w-7xl mx-auto px-4"
        : "container mx-auto px-4";

    const titleClass = theme === 'dark'
        ? "text-white/80 font-bold uppercase tracking-widest text-xs mb-3 pl-2"
        : "hidden"; // Homepage usually has its own section header

    return (
        <div className={containerClass}>
            <h2 className={titleClass}>Special Offers</h2>
            <div className={`flex overflow-x-auto gap-4 py-4 no-scrollbar snap-x ${theme === 'light' ? 'justify-start md:justify-center' : ''}`}>
                {activeOffers.map((offer) => (
                    <div
                        key={offer.id}
                        className={`flex-shrink-0 w-72 h-32 rounded-xl bg-gradient-to-br ${offer.bgColor || 'from-orange-400 to-red-500'} text-white relative overflow-hidden shadow-lg snap-center group transition-transform hover:scale-[1.02] cursor-pointer`}
                        onClick={() => copyToClipboard(offer.code)}
                    >
                        {/* Circles for Ticket Effect */}
                        <div className={`absolute -left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full z-10 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'}`} />
                        <div className={`absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full z-10 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'}`} />
                        <div className="absolute top-1/2 left-3 right-3 h-px border-t-2 border-dashed border-white/20" />

                        <div className="h-full flex flex-col justify-between p-4 relative z-20">
                            <div className="flex justify-between items-start">
                                <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase backdrop-blur-sm">
                                    {offer.type === 'Percentage' ? '% OFF' : 'FLAT OFF'}
                                </span>
                                <span className="font-mono font-bold text-sm opacity-80">{new Date(offer.expiry).toLocaleDateString()}</span>
                            </div>

                            <div className="flex justify-between items-end">
                                <div>
                                    <div className="text-3xl font-black leading-none">{offer.discount}</div>
                                    <div className="text-[10px] font-medium opacity-90 mt-1 max-w-[140px] truncate">{offer.description || 'Save big today!'}</div>
                                </div>
                                <div className="bg-white text-black font-mono font-bold text-xs px-2 py-1 rounded border-2 border-dashed border-gray-300">
                                    {offer.code}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
