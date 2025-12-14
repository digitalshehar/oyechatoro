
'use client';

import { useEffect, useState } from 'react';

interface TopItem {
    name: string;
    count: number;
    revenue: number;
}

export default function TopSellingWidget() {
    const [items, setItems] = useState<TopItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/analytics/top-items')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setItems(data);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return null;
    if (items.length === 0) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <div className="md:col-span-1 flex items-center p-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl text-white shadow-lg shadow-orange-500/20">
                <div>
                    <div className="text-xs font-bold opacity-80 uppercase tracking-wider mb-1">Trending Now</div>
                    <div className="text-2xl font-black">🔥 Hot Picks</div>
                </div>
            </div>
            {items.slice(0, 4).map((item, i) => (
                <div key={item.name} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-2xl">{i === 0 ? '👑' : i === 1 ? '🥈' : '🥉'}</span>
                        <span className="text-xs font-bold bg-green-50 text-green-700 px-2 py-1 rounded-full">
                            {item.count} Sold
                        </span>
                    </div>
                    <div>
                        <div className="font-bold text-gray-800 text-sm truncate" title={item.name}>{item.name}</div>
                        <div className="text-xs text-gray-400 font-medium">₹{item.revenue.toLocaleString()} Revenue</div>
                    </div>
                </div>
            ))}
        </div>
    );
}
