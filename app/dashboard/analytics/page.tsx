'use client';

import React, { useState, useEffect } from 'react';
import { getAnalyticsData, getMenuEngineeringData, MenuEngineeringData } from '../../lib/storage';

export default function AnalyticsPage() {
    const [activeTab, setActiveTab] = useState<'sales' | 'menu'>('sales');
    const [dateRange, setDateRange] = useState<'7d' | '30d' | 'month' | 'year'>('7d');
    const [data, setData] = useState(getAnalyticsData('7d'));
    const [menuData, setMenuData] = useState<MenuEngineeringData | null>(null);

    useEffect(() => {
        setData(getAnalyticsData(dateRange));
        setMenuData(getMenuEngineeringData());

        const handleUpdate = () => {
            setData(getAnalyticsData(dateRange));
            setMenuData(getMenuEngineeringData());
        };

        window.addEventListener('ordersUpdated', handleUpdate);
        window.addEventListener('menuUpdated', handleUpdate);
        window.addEventListener('storage', handleUpdate);
        return () => {
            window.removeEventListener('ordersUpdated', handleUpdate);
            window.removeEventListener('menuUpdated', handleUpdate);
            window.removeEventListener('storage', handleUpdate);
        };
    }, [dateRange]);

    const handleExport = () => {
        if (activeTab === 'sales') {
            const headers = ['Date', 'Revenue'];
            const rows = data.revenueTrend.map(d => `${d.date},${d.amount}`);
            const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `sales_report_${dateRange}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else if (menuData) {
            const headers = ['Item', 'Category', 'Sales', 'Cost', 'Revenue', 'Profit', 'Margin'];
            const rows = menuData.items.map(i => `${i.name},${i.category},${i.sales},${i.cost},${i.revenue},${i.profit},${i.margin}`);
            const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `menu_engineering_report.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 animate-in gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--brand-dark)]">Analytics & Insights</h1>
                    <p className="text-[var(--text-muted)]">Track performance and optimize your menu</p>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    {activeTab === 'sales' && (
                        <select
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value as any)}
                            className="px-4 py-2 rounded-xl border border-[var(--border-light)] bg-white text-[var(--text-main)] outline-none focus:border-[var(--brand-primary)] flex-1 md:flex-none"
                        >
                            <option value="7d">Last 7 Days</option>
                            <option value="30d">Last 30 Days</option>
                            <option value="month">This Month</option>
                            <option value="year">This Year</option>
                        </select>
                    )}
                    <button onClick={handleExport} className="btn btn-primary whitespace-nowrap">Export Report</button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-8 border-b border-gray-200">
                <button
                    onClick={() => setActiveTab('sales')}
                    className={`px-6 py-3 font-bold border-b-2 transition-colors ${activeTab === 'sales' ? 'border-[var(--brand-primary)] text-[var(--brand-primary)]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    Sales Analytics
                </button>
                <button
                    onClick={() => setActiveTab('menu')}
                    className={`px-6 py-3 font-bold border-b-2 transition-colors ${activeTab === 'menu' ? 'border-[var(--brand-primary)] text-[var(--brand-primary)]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    Menu Engineering (AI)
                </button>
            </div>

            {activeTab === 'sales' ? (
                <div className="animate-in fade-in slide-in-from-bottom-4">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <div className="glass-card p-6 rounded-2xl bg-gradient-to-br from-green-50 to-white border-green-100">
                            <div className="text-green-800 text-sm font-bold mb-1 uppercase tracking-wider">Total Revenue</div>
                            <div className="text-4xl font-bold text-green-700">₹{data.summary.totalRevenue}</div>
                            <div className="text-green-600 text-xs mt-2 font-medium">For selected period</div>
                        </div>
                        <div className="glass-card p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-white border-blue-100">
                            <div className="text-blue-800 text-sm font-bold mb-1 uppercase tracking-wider">Total Orders</div>
                            <div className="text-4xl font-bold text-blue-700">{data.summary.totalOrders}</div>
                            <div className="text-blue-600 text-xs mt-2 font-medium">Avg. Order Value: ₹{data.summary.avgOrderValue}</div>
                        </div>
                        <div className="glass-card p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-white border-purple-100">
                            <div className="text-purple-800 text-sm font-bold mb-1 uppercase tracking-wider">Peak Hour</div>
                            <div className="text-4xl font-bold text-purple-700">
                                {data.peakHours.reduce((max, curr) => curr.count > max.count ? curr : max, { hour: 0, count: 0 }).hour}:00
                            </div>
                            <div className="text-purple-600 text-xs mt-2 font-medium">Busiest time of day</div>
                        </div>
                    </div>

                    {/* Charts Area */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        {/* Revenue Chart */}
                        <div className="glass-card p-6 rounded-2xl">
                            <h3 className="font-bold text-[var(--brand-dark)] mb-6 flex items-center gap-2">📈 Revenue Trend</h3>
                            <div className="h-64 flex items-end justify-between gap-2 px-2 border-b border-gray-100 pb-2">
                                {data.revenueTrend.length > 0 ? data.revenueTrend.map((d, i) => {
                                    const maxVal = Math.max(...data.revenueTrend.map(x => x.amount), 1);
                                    const height = (d.amount / maxVal) * 100;
                                    return (
                                        <div key={i} className="w-full flex flex-col justify-end group relative h-full">
                                            <div
                                                className="w-full bg-blue-100 rounded-t-md hover:bg-blue-300 transition-all relative"
                                                style={{ height: `${height}%`, minHeight: '4px' }}
                                            >
                                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                                    ₹{d.amount}
                                                </div>
                                            </div>
                                            <div className="text-[10px] text-center text-gray-400 mt-1 truncate w-full">{d.date}</div>
                                        </div>
                                    );
                                }) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">No data available</div>
                                )}
                            </div>
                        </div>

                        {/* Top Items */}
                        <div className="glass-card p-6 rounded-2xl">
                            <h3 className="font-bold text-[var(--brand-dark)] mb-6 flex items-center gap-2">🏆 Top Selling Items</h3>
                            <div className="space-y-4">
                                {data.topItems.length > 0 ? data.topItems.map((item, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="font-medium text-[var(--text-main)]">{item.name}</span>
                                            <span className="text-[var(--text-muted)]">{item.sales} sold</span>
                                        </div>
                                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-[var(--brand-primary)] rounded-full transition-all duration-500"
                                                style={{ width: `${item.pct}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center py-8 text-gray-400">No sales data yet</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Peak Hours Chart */}
                    <div className="glass-card p-6 rounded-2xl mb-8">
                        <h3 className="font-bold text-[var(--brand-dark)] mb-6 flex items-center gap-2">⏰ Peak Hours Activity</h3>
                        <div className="h-48 flex items-end gap-1">
                            {data.peakHours.map((h, i) => {
                                const maxCount = Math.max(...data.peakHours.map(x => x.count), 1);
                                const height = (h.count / maxCount) * 100;
                                return (
                                    <div key={i} className="flex-1 flex flex-col justify-end group h-full">
                                        <div
                                            className={`w-full rounded-t-sm transition-all ${h.count > 0 ? 'bg-purple-200 hover:bg-purple-400' : 'bg-gray-50'}`}
                                            style={{ height: `${height}%`, minHeight: '2px' }}
                                        >
                                            {h.count > 0 && (
                                                <div className="hidden group-hover:block absolute -mt-8 bg-black text-white text-xs px-2 py-1 rounded z-10">
                                                    {h.count} orders
                                                </div>
                                            )}
                                        </div>
                                        {i % 3 === 0 && (
                                            <div className="text-[10px] text-gray-400 text-center mt-1">{h.hour}</div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="animate-in fade-in slide-in-from-bottom-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        {/* Matrix Explanation */}
                        <div className="glass-card p-6 rounded-2xl">
                            <h3 className="font-bold text-xl mb-4">Menu Engineering Matrix</h3>
                            <div className="grid grid-cols-2 gap-4 h-64 relative bg-gray-50 rounded-xl p-4 border border-gray-200">
                                {/* Quadrants */}
                                <div className="bg-green-100 rounded-lg p-2 flex flex-col items-center justify-center text-center border border-green-200">
                                    <div className="text-2xl">⭐</div>
                                    <div className="font-bold text-green-800">Stars</div>
                                    <div className="text-[10px] text-green-600">High Profit, High Popularity</div>
                                </div>
                                <div className="bg-yellow-100 rounded-lg p-2 flex flex-col items-center justify-center text-center border border-yellow-200">
                                    <div className="text-2xl">🚜</div>
                                    <div className="font-bold text-yellow-800">Plowhorses</div>
                                    <div className="text-[10px] text-yellow-600">Low Profit, High Popularity</div>
                                </div>
                                <div className="bg-blue-100 rounded-lg p-2 flex flex-col items-center justify-center text-center border border-blue-200">
                                    <div className="text-2xl">🧩</div>
                                    <div className="font-bold text-blue-800">Puzzles</div>
                                    <div className="text-[10px] text-blue-600">High Profit, Low Popularity</div>
                                </div>
                                <div className="bg-red-100 rounded-lg p-2 flex flex-col items-center justify-center text-center border border-red-200">
                                    <div className="text-2xl">🐕</div>
                                    <div className="font-bold text-red-800">Dogs</div>
                                    <div className="text-[10px] text-red-600">Low Profit, Low Popularity</div>
                                </div>

                                {/* Axis Labels */}
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 -rotate-90 text-xs font-bold text-gray-400">PROFITABILITY</div>
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-6 text-xs font-bold text-gray-400">POPULARITY</div>
                            </div>
                        </div>

                        {/* Summary Stats */}
                        <div className="space-y-4">
                            <div className="glass-card p-6 rounded-2xl flex items-center justify-between">
                                <div>
                                    <div className="text-sm text-gray-500">Star Items</div>
                                    <div className="text-2xl font-bold text-green-600">{menuData?.stars.length || 0}</div>
                                </div>
                                <div className="text-3xl">⭐</div>
                            </div>
                            <div className="glass-card p-6 rounded-2xl flex items-center justify-between">
                                <div>
                                    <div className="text-sm text-gray-500">Plowhorses</div>
                                    <div className="text-2xl font-bold text-yellow-600">{menuData?.plowhorses.length || 0}</div>
                                </div>
                                <div className="text-3xl">🚜</div>
                            </div>
                            <div className="glass-card p-6 rounded-2xl flex items-center justify-between">
                                <div>
                                    <div className="text-sm text-gray-500">Puzzles</div>
                                    <div className="text-2xl font-bold text-blue-600">{menuData?.puzzles.length || 0}</div>
                                </div>
                                <div className="text-3xl">🧩</div>
                            </div>
                            <div className="glass-card p-6 rounded-2xl flex items-center justify-between">
                                <div>
                                    <div className="text-sm text-gray-500">Dogs</div>
                                    <div className="text-2xl font-bold text-red-600">{menuData?.dogs.length || 0}</div>
                                </div>
                                <div className="text-3xl">🐕</div>
                            </div>
                        </div>
                    </div>

                    {/* Detailed Table */}
                    <div className="glass-card rounded-2xl overflow-hidden">
                        <div className="p-6 border-b border-gray-100">
                            <h3 className="font-bold text-xl">Detailed Analysis</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                                    <tr>
                                        <th className="p-4">Item Name</th>
                                        <th className="p-4">Category</th>
                                        <th className="p-4 text-right">Sales Vol.</th>
                                        <th className="p-4 text-right">Cost</th>
                                        <th className="p-4 text-right">Revenue</th>
                                        <th className="p-4 text-right">Profit</th>
                                        <th className="p-4 text-center">Class</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {menuData?.items.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="p-4 font-medium">{item.name}</td>
                                            <td className="p-4 text-sm text-gray-500">Food</td>
                                            <td className="p-4 text-right">{item.sales}</td>
                                            <td className="p-4 text-right text-red-500">₹{item.cost}</td>
                                            <td className="p-4 text-right text-green-600">₹{item.revenue}</td>
                                            <td className="p-4 text-right font-bold">₹{item.profit}</td>
                                            <td className="p-4 text-center">
                                                <span className={`px-2 py-1 rounded-full text-xs font-bold
                                                    ${item.category === 'Star' ? 'bg-green-100 text-green-700' : ''}
                                                    ${item.category === 'Plowhorse' ? 'bg-yellow-100 text-yellow-700' : ''}
                                                    ${item.category === 'Puzzle' ? 'bg-blue-100 text-blue-700' : ''}
                                                    ${item.category === 'Dog' ? 'bg-red-100 text-red-700' : ''}
                                                `}>
                                                    {item.category}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    {(!menuData?.items || menuData.items.length === 0) && (
                                        <tr>
                                            <td colSpan={7} className="p-8 text-center text-gray-400">
                                                No data available. Start selling to see insights!
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

