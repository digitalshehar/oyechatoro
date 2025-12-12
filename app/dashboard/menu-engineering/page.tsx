'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useDbMenu, useDbOrders } from '../../lib/db-hooks';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

interface MenuItemWithStats {
    id: string;
    name: string;
    price: number;
    costPrice: number;
    margin: number;
    marginPercent: number;
    totalSold: number;
    revenue: number;
    profit: number;
    category: 'Star' | 'Plow Horse' | 'Puzzle' | 'Dog';
}

export default function MenuEngineeringPage() {
    const { items, categories, loading: menuLoading } = useDbMenu();
    const { orders, loading: ordersLoading } = useDbOrders();
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    // Calculate menu item stats
    const itemStats = useMemo(() => {
        if (!items.length || !orders.length) return [];

        // Count sold quantities from completed orders
        const soldCounts: Record<string, number> = {};
        orders
            .filter(o => o.status === 'Completed')
            .forEach(order => {
                const orderItems = order.items as any[];
                orderItems.forEach(item => {
                    const key = item.name; // Match by name since items might not have consistent IDs
                    soldCounts[key] = (soldCounts[key] || 0) + (item.quantity || 1);
                });
            });

        // Calculate stats for each menu item
        const stats: MenuItemWithStats[] = items.map(item => {
            const cost = item.costPrice || item.price * 0.35; // Default 35% food cost if not set
            const margin = item.price - cost;
            const marginPercent = (margin / item.price) * 100;
            const totalSold = soldCounts[item.name] || 0;
            const revenue = totalSold * item.price;
            const profit = totalSold * margin;

            return {
                id: item.id,
                name: item.name,
                price: item.price,
                costPrice: cost,
                margin,
                marginPercent,
                totalSold,
                revenue,
                profit,
                category: 'Star' as const // Will be calculated below
            };
        });

        // Calculate averages for categorization
        const avgMargin = stats.reduce((s, i) => s + i.marginPercent, 0) / stats.length;
        const avgSold = stats.reduce((s, i) => s + i.totalSold, 0) / stats.length;

        // Categorize items (Menu Engineering Matrix)
        stats.forEach(item => {
            const highMargin = item.marginPercent >= avgMargin;
            const highPopularity = item.totalSold >= avgSold;

            if (highMargin && highPopularity) {
                item.category = 'Star'; // High margin, high popularity
            } else if (!highMargin && highPopularity) {
                item.category = 'Plow Horse'; // Low margin, high popularity
            } else if (highMargin && !highPopularity) {
                item.category = 'Puzzle'; // High margin, low popularity
            } else {
                item.category = 'Dog'; // Low margin, low popularity
            }
        });

        return stats;
    }, [items, orders]);

    // Filter by category
    const filteredStats = useMemo(() => {
        if (selectedCategory === 'all') return itemStats;
        return itemStats.filter(item => {
            const menuItem = items.find(i => i.id === item.id);
            return menuItem?.categoryId === selectedCategory;
        });
    }, [itemStats, selectedCategory, items]);

    // Summary stats
    const summary = useMemo(() => ({
        stars: filteredStats.filter(i => i.category === 'Star').length,
        plowHorses: filteredStats.filter(i => i.category === 'Plow Horse').length,
        puzzles: filteredStats.filter(i => i.category === 'Puzzle').length,
        dogs: filteredStats.filter(i => i.category === 'Dog').length,
        totalProfit: filteredStats.reduce((s, i) => s + i.profit, 0),
        avgMargin: filteredStats.reduce((s, i) => s + i.marginPercent, 0) / (filteredStats.length || 1)
    }), [filteredStats]);

    if (menuLoading || ordersLoading) {
        return <div className="p-12 flex justify-center"><LoadingSpinner /></div>;
    }

    const categoryColors: Record<string, string> = {
        Star: 'bg-yellow-100 text-yellow-700 border-yellow-300',
        'Plow Horse': 'bg-blue-100 text-blue-700 border-blue-300',
        Puzzle: 'bg-purple-100 text-purple-700 border-purple-300',
        Dog: 'bg-red-100 text-red-700 border-red-300'
    };

    const categoryIcons: Record<string, string> = {
        Star: '⭐',
        'Plow Horse': '🐴',
        Puzzle: '🧩',
        Dog: '🐕'
    };

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[var(--brand-dark)]">
                    📊 Menu Engineering
                    <span className="text-sm font-normal text-gray-400 bg-gray-100 px-2 py-1 rounded-full ml-2">
                        Profit Analysis
                    </span>
                </h1>
                <p className="text-[var(--text-muted)]">Analyze profitability and popularity of menu items</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-yellow-50 p-4 rounded-2xl border border-yellow-200">
                    <div className="text-3xl mb-1">⭐</div>
                    <div className="text-2xl font-bold text-yellow-700">{summary.stars}</div>
                    <div className="text-sm text-yellow-600">Stars</div>
                    <div className="text-xs text-yellow-500">High margin, popular</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200">
                    <div className="text-3xl mb-1">🐴</div>
                    <div className="text-2xl font-bold text-blue-700">{summary.plowHorses}</div>
                    <div className="text-sm text-blue-600">Plow Horses</div>
                    <div className="text-xs text-blue-500">Low margin, popular</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-2xl border border-purple-200">
                    <div className="text-3xl mb-1">🧩</div>
                    <div className="text-2xl font-bold text-purple-700">{summary.puzzles}</div>
                    <div className="text-sm text-purple-600">Puzzles</div>
                    <div className="text-xs text-purple-500">High margin, unpopular</div>
                </div>
                <div className="bg-red-50 p-4 rounded-2xl border border-red-200">
                    <div className="text-3xl mb-1">🐕</div>
                    <div className="text-2xl font-bold text-red-700">{summary.dogs}</div>
                    <div className="text-sm text-red-600">Dogs</div>
                    <div className="text-xs text-red-500">Low margin, unpopular</div>
                </div>
            </div>

            {/* Profit Overview */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div className="bg-green-50 p-6 rounded-2xl border border-green-200">
                    <div className="text-sm text-green-600 font-semibold mb-1">Total Profit</div>
                    <div className="text-3xl font-bold text-green-700">₹{summary.totalProfit.toLocaleString()}</div>
                </div>
                <div className="bg-orange-50 p-6 rounded-2xl border border-orange-200">
                    <div className="text-sm text-orange-600 font-semibold mb-1">Average Margin</div>
                    <div className="text-3xl font-bold text-orange-700">{summary.avgMargin.toFixed(1)}%</div>
                </div>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${selectedCategory === 'all'
                            ? 'bg-gray-800 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    All Items
                </button>
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${selectedCategory === cat.id
                                ? 'bg-[var(--brand-primary)] text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            {/* Items Table */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-left p-4 text-xs font-bold text-gray-500 uppercase">Item</th>
                            <th className="text-right p-4 text-xs font-bold text-gray-500 uppercase">Price</th>
                            <th className="text-right p-4 text-xs font-bold text-gray-500 uppercase">Cost</th>
                            <th className="text-right p-4 text-xs font-bold text-gray-500 uppercase">Margin</th>
                            <th className="text-right p-4 text-xs font-bold text-gray-500 uppercase">Sold</th>
                            <th className="text-right p-4 text-xs font-bold text-gray-500 uppercase">Profit</th>
                            <th className="text-center p-4 text-xs font-bold text-gray-500 uppercase">Category</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {filteredStats.sort((a, b) => b.profit - a.profit).map(item => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="p-4">
                                    <div className="font-semibold text-gray-800">{item.name}</div>
                                </td>
                                <td className="p-4 text-right font-medium">₹{item.price}</td>
                                <td className="p-4 text-right text-gray-500">₹{item.costPrice.toFixed(0)}</td>
                                <td className="p-4 text-right">
                                    <span className={`font-bold ${item.marginPercent >= 50 ? 'text-green-600' : item.marginPercent >= 30 ? 'text-orange-600' : 'text-red-600'}`}>
                                        {item.marginPercent.toFixed(0)}%
                                    </span>
                                </td>
                                <td className="p-4 text-right font-medium">{item.totalSold}</td>
                                <td className="p-4 text-right font-bold text-green-600">₹{item.profit.toFixed(0)}</td>
                                <td className="p-4 text-center">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${categoryColors[item.category]}`}>
                                        {categoryIcons[item.category]} {item.category}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Legend */}
            <div className="mt-6 p-4 bg-gray-50 rounded-xl text-sm text-gray-600">
                <div className="font-bold mb-2">📚 Menu Engineering Categories:</div>
                <div className="grid md:grid-cols-2 gap-2">
                    <div>⭐ <strong>Stars</strong>: Keep promoting - your best items!</div>
                    <div>🐴 <strong>Plow Horses</strong>: Consider raising prices slightly</div>
                    <div>🧩 <strong>Puzzles</strong>: Promote more or reposition on menu</div>
                    <div>🐕 <strong>Dogs</strong>: Consider removing or reinventing</div>
                </div>
            </div>
        </div>
    );
}
