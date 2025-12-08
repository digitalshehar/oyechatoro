'use client';

import React from 'react';

interface TabsProps {
    tabs: { id: string; label: string }[];
    activeTab: string;
    onChange: (id: string) => void;
}

export default function Tabs({ tabs, activeTab, onChange }: TabsProps) {
    return (
        <div className="flex gap-4 mb-8 border-b border-gray-200">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => onChange(tab.id)}
                    className={`px-6 py-3 font-bold border-b-2 transition-colors ${activeTab === tab.id ? 'border-[var(--brand-primary)] text-[var(--brand-primary)]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
