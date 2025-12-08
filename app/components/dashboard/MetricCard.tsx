'use client';

import React, { memo } from 'react';

interface MetricCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    colorScheme: 'green' | 'blue' | 'purple' | 'orange' | 'red';
}

const MetricCard = memo(function MetricCard({ title, value, subtitle, colorScheme }: MetricCardProps) {
    const colors = {
        green: { bg: 'from-green-50', border: 'border-green-100', title: 'text-green-800', value: 'text-green-700', sub: 'text-green-600' },
        blue: { bg: 'from-blue-50', border: 'border-blue-100', title: 'text-blue-800', value: 'text-blue-700', sub: 'text-blue-600' },
        purple: { bg: 'from-purple-50', border: 'border-purple-100', title: 'text-purple-800', value: 'text-purple-700', sub: 'text-purple-600' },
        orange: { bg: 'from-orange-50', border: 'border-orange-100', title: 'text-orange-800', value: 'text-orange-700', sub: 'text-orange-600' },
        red: { bg: 'from-red-50', border: 'border-red-100', title: 'text-red-800', value: 'text-red-700', sub: 'text-red-600' }
    };
    const c = colors[colorScheme];

    return (
        <div className={`glass-card p-6 rounded-2xl bg-gradient-to-br ${c.bg} to-white ${c.border}`}>
            <div className={`${c.title} text-sm font-bold mb-1 uppercase tracking-wider`}>{title}</div>
            <div className={`text-4xl font-bold ${c.value}`}>{value}</div>
            {subtitle && <div className={`${c.sub} text-xs mt-2 font-medium`}>{subtitle}</div>}
        </div>
    );
});

export default MetricCard;
