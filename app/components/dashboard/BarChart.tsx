'use client';

import React from 'react';

interface BarChartData {
    label: string;
    value: number;
}

interface BarChartProps {
    title: string;
    icon?: string;
    data: BarChartData[];
    height?: string;
    barColor?: string;
    formatValue?: (v: number) => string;
}

export default function BarChart({ title, icon, data, height = 'h-64', barColor = 'bg-blue-100 hover:bg-blue-300', formatValue = (v) => `₹${v}` }: BarChartProps) {
    const maxVal = Math.max(...data.map(d => d.value), 1);

    return (
        <div className="glass-card p-6 rounded-2xl">
            <h3 className="font-bold text-[var(--brand-dark)] mb-6 flex items-center gap-2">{icon} {title}</h3>
            <div className={`${height} flex items-end justify-between gap-2 px-2 border-b border-gray-100 pb-2`}>
                {data.length > 0 ? data.map((d, i) => {
                    const heightPct = (d.value / maxVal) * 100;
                    return (
                        <div key={i} className="w-full flex flex-col justify-end group relative h-full">
                            <div className={`w-full ${barColor} rounded-t-md transition-all relative`} style={{ height: `${heightPct}%`, minHeight: '4px' }}>
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                    {formatValue(d.value)}
                                </div>
                            </div>
                            <div className="text-[10px] text-center text-gray-400 mt-1 truncate w-full">{d.label}</div>
                        </div>
                    );
                }) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">No data available</div>
                )}
            </div>
        </div>
    );
}
