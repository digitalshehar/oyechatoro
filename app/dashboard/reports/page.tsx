'use client';

import React, { useState } from 'react';
import { useDbAnalytics } from '../../lib/db-hooks';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Cell, PieChart, Pie, Legend
} from 'recharts';

const COLORS = ['#FF8042', '#00C49F', '#FFBB28', '#0088FE', '#8884d8'];

export default function ReportsPage() {
    const [period, setPeriod] = useState('today');
    const { data, loading } = useDbAnalytics(period);

    if (loading || !data) {
        return (
            <div className="flex items-center justify-center p-20">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[var(--brand-primary)] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500 font-medium">Crunching the numbers...</p>
                </div>
            </div>
        );
    }

    const { summary, salesTrend, topItems, paymentData } = data;

    return (
        <div className="p-4 md:p-8 animate-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--brand-dark)]">Business Reports</h1>
                    <p className="text-gray-500">Insights into sales performance and trends.</p>
                </div>
                <div className="bg-white p-1 rounded-xl shadow-sm border flex">
                    {['today', 'week', 'month', 'all'].map((p) => (
                        <button
                            key={p}
                            onClick={() => setPeriod(p)}
                            className={`px-4 py-2 rounded-lg text-sm font-bold capitalize transition-all ${period === p ? 'bg-[var(--brand-primary)] text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-purple-200">
                    <div className="text-purple-100 font-medium mb-1 uppercase tracking-wide text-xs">Total Revenue</div>
                    <div className="text-4xl font-black">₹{summary.totalRevenue.toLocaleString()}</div>
                    <div className="text-purple-200 text-sm mt-2 flex items-center gap-1">
                        <span className="bg-white/20 px-1.5 py-0.5 rounded text-xs font-bold">↑ 12%</span>
                        vs last period
                    </div>
                </div>

                <div className="bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl p-6 text-white shadow-lg shadow-orange-200">
                    <div className="text-orange-100 font-medium mb-1 uppercase tracking-wide text-xs">Total Orders</div>
                    <div className="text-4xl font-black">{summary.totalOrders}</div>
                    <div className="text-orange-100 text-sm mt-2">
                        Avg Order Value: <strong>₹{summary.avgOrderValue}</strong>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <div className="text-gray-500 font-medium mb-1 uppercase tracking-wide text-xs">Top Selling Item</div>
                    <div className="text-2xl font-bold text-gray-800 truncate">
                        {topItems.length > 0 ? topItems[0].name : '-'}
                    </div>
                    <div className="text-[var(--brand-primary)] font-bold text-lg">
                        {topItems.length > 0 ? topItems[0].value : 0} <span className="text-gray-400 text-sm font-normal">orders</span>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Sales Chart */}
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <span>📈</span> Sales Trend
                    </h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={salesTrend}>
                                <defs>
                                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#FB923C" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#FB923C" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                                    tickFormatter={(val) => `₹${val}`}
                                />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    itemStyle={{ color: '#F97316', fontWeight: 'bold' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="sales"
                                    stroke="#FB923C"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorSales)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Top Items */}
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <span>🏆</span> Popular Items
                    </h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={topItems} layout="vertical" margin={{ left: 40 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                                <XAxis type="number" hide />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    width={100}
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#4B5563', fontSize: 12, fontWeight: 500 }}
                                />
                                <Tooltip
                                    cursor={{ fill: '#FFF7ED' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}
                                />
                                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                                    {topItems.map((entry: any, index: number) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm col-span-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Payment Methods</h3>
                    <div className="h-[250px] flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={paymentData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {paymentData.map((entry: any, index: number) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Placeholder for AI Insights */}
                <div className="bg-[var(--brand-dark)] p-6 rounded-3xl text-white col-span-2 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <span>✨</span> AI Business Insights
                    </h3>
                    <div className="space-y-4">
                        <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                            <h4 className="font-bold text-yellow-400 mb-1">Peak Hour Detected</h4>
                            <p className="text-sm text-gray-300">Sales consistently peak between <strong>7 PM - 9 PM</strong>. Consider scheduling extra staff during this window.</p>
                        </div>
                        <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                            <h4 className="font-bold text-green-400 mb-1">Menu Engineering</h4>
                            <p className="text-sm text-gray-300"><strong>Puran Poli</strong> is a high-volume, high-margin item. Promote it on the homepage to boost profitability.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
