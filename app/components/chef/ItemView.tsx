'use client';
import React from 'react';

interface ItemViewProps {
    items: { [key: string]: number };
}

export default function ItemView({ items }: ItemViewProps) {
    if (Object.keys(items).length === 0) return null;

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 animate-in">
            {Object.entries(items).map(([item, count]) => (
                <div key={item} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-all">
                    <div className="text-5xl font-bold text-[var(--brand-primary)] mb-2">{count}</div>
                    <div className="text-lg font-bold text-gray-800 leading-tight">{item}</div>
                    <div className="mt-4 text-xs text-gray-400 uppercase tracking-wider font-bold">To Prepare</div>
                </div>
            ))}
        </div>
    );
}
