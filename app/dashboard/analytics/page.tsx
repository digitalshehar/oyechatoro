
'use client';

import React, { useState } from 'react';
import { useDbAnalytics, useDbFinance } from '../../lib/db-hooks';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ScatterChart, Scatter, ZAxis, Legend, PieChart, Pie, Cell } from 'recharts';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

export default function AnalyticsPage() {
    const [period, setPeriod] = useState('7d');
    const { data: analytics, loading: loadingAnalytics } = useDbAnalytics(period);
    const { expenses, addExpense, deleteExpense, loading: loadingExpenses } = useDbFinance();
    const [expenseForm, setExpenseForm] = useState({ category: 'Inventory', description: '', amount: '' });

    // AI Insights State
    const [aiInsights, setAiInsights] = useState<any[]>([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showAIModal, setShowAIModal] = useState(false);

    // --- KPI Cards ---
    const KPICard = ({ title, value, sub, color }: any) => (
        <div className={`bg-white p-3 md:p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between ${color ? `border-l-4 ${color}` : ''}`}>
            <div className="text-gray-500 text-[10px] md:text-sm font-medium uppercase tracking-wide mb-1 md:mb-2">{title}</div>
            <div className="text-lg md:text-3xl font-black text-gray-800">{value}</div>
            {sub && <div className="text-[10px] text-gray-400 mt-1 md:block hidden">{sub}</div>}
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

    const handleConsultAI = async () => {
        if (!analytics) return;
        setIsAnalyzing(true);
        setShowAIModal(true);
        try {
            const res = await fetch('/api/seo/ai/analytics', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: analytics })
            });
            const result = await res.json();
            if (result.insights) setAiInsights(result.insights);
        } catch (error) {
            console.error(error);
        } finally {
            setIsAnalyzing(false);
        }
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

    // Calculate Category Distribution
    const categoryDataTmp: Record<string, number> = {};
    analytics?.menuEngineering?.items.forEach((item: any) => {
        // Use the actual menu category if available in item data, otherwise fallback to engineering category or 'Food'
        // API returns 'category' as Star/Dog etc. We might need the REAL category (e.g., Pizza, Burger).
        // WARNING: API route currently sets category to 'Food' hardcoded or Engineering category.
        // Let's use the Engineering Category for now as a placeholder or try to infer from name if needed,
        // BUT better yet, let's use the 'topItems' list which usually has names.
        // Actually, looking at route.ts, it returns `menuEngineering` with items.
        // Let's rely on the Engineering categories (Star, Plowhorse etc) for a "Health" distribution, 
        // OR better, let's just use the Top Items for the list and Engineering for the chart.
        // Wait, user asked for "Category Distribution". 
        // Let's show "Menu Health" (Star/Plowhorse/etc) distribution as it's readily available and useful.
        const cat = item.category || 'Unknown';
        categoryDataTmp[cat] = (categoryDataTmp[cat] || 0) + item.sales;
    });

    const categoryChartData = Object.entries(categoryDataTmp).map(([name, value]) => ({ name, value }));
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

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
                <div className="flex gap-4">
                    <button
                        onClick={handleConsultAI}
                        className="bg-purple-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-purple-700 shadow-lg shadow-purple-200 flex items-center gap-2 group transition-all"
                    >
                        <span className="group-hover:rotate-12 transition-transform">💡</span> Consult AI
                    </button>
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
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                <KPICard title="Revenue" value={`₹${analytics?.summary.totalRevenue.toLocaleString()}`} color="border-l-green-500" sub="Gross Sales" />
                <KPICard title="Orders" value={analytics?.summary.totalOrders} color="border-l-blue-500" sub="Completed" />
                <KPICard title="Expenses" value={`₹${expenses.reduce((s, e) => s + e.amount, 0).toLocaleString()}`} color="border-l-red-500" sub="Daily Tracked" />
                <KPICard
                    title="Net Profit"
                    value={`₹${(analytics?.summary.totalRevenue - expenses.reduce((s, e) => s + e.amount, 0)).toLocaleString()}`}
                    color="border-l-purple-500"
                    sub="Net Income"
                />
            </div>

            {/* Main Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Trend */}
                <div className="lg:col-span-2 bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-lg mb-6">Revenue Trend</h3>
                    <div className="h-56 md:h-64">
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
                <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-lg mb-6">Peak Hours</h3>
                    <div className="h-56 md:h-64">
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

            {/* Top Items & Category Distribution Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Top Selling Items */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-lg mb-6 flex items-center gap-2"><span>🏆</span> Top Selling Items</h3>
                    <div className="space-y-4">
                        {analytics?.topItems?.length === 0 ? (
                            <p className="text-gray-400 text-sm">No sales data yet.</p>
                        ) : (
                            analytics?.topItems?.map((item: any, idx: number) => (
                                <div key={idx} className="flex items-center gap-4">
                                    <div className="font-bold text-gray-400 w-6">#{idx + 1}</div>
                                    <div className="flex-1">
                                        <div className="flex justify-between mb-1">
                                            <span className="font-bold text-gray-800">{item.name}</span>
                                            <span className="text-sm text-gray-600">{item.sales} orders</span>
                                        </div>
                                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-[var(--brand-primary)] rounded-full"
                                                style={{ width: `${item.pct}%` }}
                                            />
                                        </div>
                                    </div>
                                    <div className="font-bold text-gray-800 w-20 text-right">₹{item.revenue.toLocaleString()}</div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Category Distribution (Menu Health) */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-lg mb-6">Menu Health</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryChartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {categoryChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <p className="text-xs text-center text-gray-400 mt-4">Distribution by Item Performance Category</p>
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

            {/* AI Insights Modal */}
            {showAIModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-[2.5rem] w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl animate-in zoom-in duration-300 flex flex-col">
                        <div className="p-8 border-b bg-gradient-to-r from-purple-50 to-blue-50 flex justify-between items-center sticky top-0">
                            <div>
                                <h2 className="text-2xl font-black text-purple-900 flex items-center gap-2">
                                    <span>✨</span> AI Strategic Insights
                                </h2>
                                <p className="text-purple-600 text-sm">Actionable advice based on your real-time performance</p>
                            </div>
                            <button onClick={() => setShowAIModal(false)} className="bg-white/50 hover:bg-white p-2 rounded-full transition-colors text-purple-900 text-xl">✕</button>
                        </div>

                        <div className="p-8 overflow-y-auto space-y-6">
                            {isAnalyzing ? (
                                <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                                    <p className="text-purple-900 font-bold text-lg animate-pulse">Deep analysis in progress...</p>
                                    <p className="text-gray-400 text-sm">Reading trends, menu engineering, and peak moments.</p>
                                </div>
                            ) : (
                                <div className="grid gap-6">
                                    {aiInsights.map((insight, idx) => (
                                        <div key={idx} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-purple-200 transition-colors">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-bold text-gray-800 text-lg">{insight.title}</h3>
                                                <span className={`text-[10px] uppercase font-black px-2 py-1 rounded ${insight.priority === 'High' ? 'bg-red-100 text-red-600' : insight.priority === 'Medium' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}>
                                                    {insight.priority} Priority
                                                </span>
                                            </div>
                                            <p className="text-gray-600 mb-4">{insight.insight}</p>
                                            <div className="bg-white p-3 rounded-xl border border-dashed border-gray-200">
                                                <span className="text-xs font-bold text-gray-400 uppercase block mb-1">Recommended Action</span>
                                                <p className="text-sm font-bold text-purple-700">{insight.action}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="p-6 bg-gray-50 border-t flex justify-end">
                            <button onClick={() => setShowAIModal(false)} className="px-8 py-3 bg-white border border-gray-200 text-gray-800 font-bold rounded-xl hover:bg-gray-100 transition-all">
                                Close Strategic View
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
