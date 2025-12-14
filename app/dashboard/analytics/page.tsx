
'use client';

import React, { useState } from 'react';
import { useDbAnalytics, useDbFinance } from '../../lib/db-hooks';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ScatterChart, Scatter, ZAxis, Legend } from 'recharts';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

export default function AnalyticsPage() {
    const [period, setPeriod] = useState('7d');
    const { data: analytics, loading: loadingAnalytics } = useDbAnalytics(period);
    const { expenses, addExpense, deleteExpense, loading: loadingExpenses } = useDbFinance();
    const [expenseForm, setExpenseForm] = useState({ category: 'Inventory', description: '', amount: '' });

    // --- KPI Cards ---
    const KPICard = ({ title, value, sub, color }: any) => (
        <div className={`bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between ${color ? `border-l-4 ${color}` : ''}`}>
            <div className="text-gray-500 text-sm font-medium uppercase tracking-wide mb-2">{title}</div>
            <div className="text-3xl font-black text-gray-800">{value}</div>
            {sub && <div className="text-xs text-gray-400 mt-1">{sub}</div>}
        </div>
    );

    // --- Expense Handler ---
    const handleAddExpense = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!expenseForm.amount) return;
        const success = await addExpense({
            date: new Date(),
            ...expenseForm,
            amount: parseFloat(expenseForm.amount)
        });
        if (success) setExpenseForm({ category: 'Inventory', description: '', amount: '' });
    };

    if (loadingAnalytics) return <LoadingSpinner />;

    // --- Chart Data Preparation ---
    const matrixData = analytics?.menuEngineering?.items.map((i: any) => ({
        x: i.popularity, // Sales
        y: i.profit,     // Profit
        z: i.revenue,    // Bubble Size (Revenue)
        name: i.name,
        category: i.category // Star, Dog, etc
    })) || [];

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 border border-gray-200 shadow-xl rounded-xl text-sm">
                    <p className="font-bold mb-1">{label}</p>
                    {payload.map((p: any) => (
                        <p key={p.name} style={{ color: p.color }}>
                            {p.name}: {p.value.toLocaleString()}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-[var(--brand-dark)]">Reports & Analytics</h1>
                    <p className="text-gray-500">Business performance overview.</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1 flex">
                    {['7d', '30d', 'month', 'year'].map(p => (
                        <button
                            key={p}
                            onClick={() => setPeriod(p)}
                            className={`px-4 py-2 rounded-lg text-sm font-bold capitalize transition-all ${period === p ? 'bg-[var(--brand)] text-white shadow-md' : 'text-gray-400 hover:bg-gray-50'}`}
                        >
                            {p === '7d' ? '7 Days' : p === '30d' ? '30 Days' : p}
                        </button>
                    ))}
                </div>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard title="Total Revenue" value={`₹${analytics?.summary.totalRevenue.toLocaleString()}`} color="border-l-green-500" sub="Gross Sales" />
                <KPICard title="Total Orders" value={analytics?.summary.totalOrders} color="border-l-blue-500" sub="Completed Orders" />
                <KPICard title="Avg Order Value" value={`₹${analytics?.summary.avgOrderValue}`} color="border-l-orange-500" sub="Per Transaction" />
                {/* Profit KPI (Mock Calculation since expense API is separate call) */}
                <KPICard title="Projected Profit" value={`₹${(analytics?.summary.totalRevenue * 0.4).toLocaleString()}`} color="border-l-purple-500" sub="Est. ~40% Margin" />
            </div>

            {/* Main Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Trend */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-lg mb-6">Revenue Trend</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={analytics?.revenueTrend || []}>
                                <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} tickFormatter={(value) => `₹${value / 1000}k`} />
                                <CartesianGrid vertical={false} stroke="#f0f0f0" />
                                <Tooltip content={<CustomTooltip />} />
                                <Area type="monotone" dataKey="amount" stroke="#8884d8" fillOpacity={1} fill="url(#colorRev)" strokeWidth={3} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Peak Hours */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-lg mb-6">Peak Hours</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={analytics?.peakHours || []}>
                                <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                                <Bar dataKey="count" fill="#ff7f50" radius={[4, 4, 0, 0]} />
                                <Tooltip cursor={{ fill: '#f8fafc' }} content={<CustomTooltip />} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Menu Engineering & Expenses Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Menu Matrix */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-lg">Menu Matrix (BCG)</h3>
                        <div className="text-xs space-x-2">
                            <span className="text-green-600">★ Star</span>
                            <span className="text-yellow-600">🐴 Plowhorse</span>
                            <span className="text-blue-600">❓ Puzzle</span>
                            <span className="text-red-600">🐶 Dog</span>
                        </div>
                    </div>
                    <p className="text-xs text-gray-400 mb-4">X-Axis: Popularity (Sales), Y-Axis: Profitability</p>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                <CartesianGrid />
                                <XAxis type="number" dataKey="x" name="Sales" unit=" qty" />
                                <YAxis type="number" dataKey="y" name="Profit" unit=" ₹" />
                                <ZAxis type="number" dataKey="z" range={[50, 400]} name="Revenue" unit=" ₹" />
                                <Tooltip cursor={{ strokeDasharray: '3 3' }} content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        const data = payload[0].payload;
                                        return (
                                            <div className="bg-white p-2 border shadow-lg rounded text-xs">
                                                <p className="font-bold">{data.name}</p>
                                                <p>{data.category}</p>
                                                <p>Sales: {data.x}</p>
                                                <p>Profit: ₹{data.y}</p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }} />
                                <Legend />
                                {['Star', 'Plowhorse', 'Puzzle', 'Dog'].map(cat => (
                                    <Scatter
                                        key={cat}
                                        name={cat}
                                        data={matrixData.filter((i: any) => i.category === cat)}
                                        fill={cat === 'Star' ? '#16a34a' : cat === 'Plowhorse' ? '#ca8a04' : cat === 'Puzzle' ? '#2563eb' : '#dc2626'}
                                    />
                                ))}
                            </ScatterChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Expenses Manager */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                    <h3 className="font-bold text-lg mb-4">Quick Expenses</h3>

                    {/* Add Form */}
                    <form onSubmit={handleAddExpense} className="bg-gray-50 p-4 rounded-xl mb-4 text-sm">
                        <div className="grid grid-cols-2 gap-2 mb-2">
                            <select
                                className="p-2 border rounded-lg"
                                value={expenseForm.category}
                                onChange={e => setExpenseForm({ ...expenseForm, category: e.target.value })}
                            >
                                <option>Inventory</option>
                                <option>Utilities</option>
                                <option>Salaries</option>
                                <option>Maintenance</option>
                                <option>Other</option>
                            </select>
                            <input
                                type="number"
                                placeholder="Amount (₹)"
                                className="p-2 border rounded-lg"
                                value={expenseForm.amount}
                                onChange={e => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                            />
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Description (Optional)"
                                className="flex-1 p-2 border rounded-lg"
                                value={expenseForm.description}
                                onChange={e => setExpenseForm({ ...expenseForm, description: e.target.value })}
                            />
                            <button type="submit" disabled={loadingExpenses} className="bg-black text-white px-4 py-2 rounded-lg font-bold">
                                {loadingExpenses ? '...' : '+ Add'}
                            </button>
                        </div>
                    </form>

                    {/* List */}
                    <div className="flex-1 overflow-y-auto max-h-60 space-y-2">
                        {expenses.length === 0 ? <p className="text-center text-gray-400 py-4 text-xs">No expenses logged for today.</p> : null}
                        {expenses.map(exp => (
                            <div key={exp.id} className="flex justify-between items-center p-3 bg-white border rounded-lg text-sm hover:shadow-sm">
                                <div>
                                    <div className="font-bold text-gray-800">{exp.category}</div>
                                    <div className="text-xs text-gray-400">{exp.description || 'No description'}</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="font-bold text-red-500">-₹{exp.amount}</div>
                                    <button onClick={() => deleteExpense(exp.id)} className="text-gray-300 hover:text-red-500">×</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
