'use client';

import React, { useMemo, useState } from 'react';
import { useDbOrders, useDbMenu, useDbCustomers } from '../../lib/db-hooks';
import Link from 'next/link';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

export default function OverviewPage() {
    const [showRevenue, setShowRevenue] = useState(false);
    const { orders, loading: ordersLoading } = useDbOrders();
    const { items, loading: menuLoading } = useDbMenu();
    const { customers, loading: customersLoading } = useDbCustomers();

    const loading = ordersLoading || menuLoading || customersLoading;

    // Calculate Daily Stats Dynamically from Live Orders
    const dailyStats = useMemo(() => {
        const today = new Date().toISOString().split('T')[0];

        // Filter orders created today
        const todayOrders = orders.filter(o =>
            new Date(o.createdAt).toISOString().split('T')[0] === today &&
            o.status !== 'Cancelled'
        );

        const totalSales = todayOrders.reduce((acc, o) => acc + Number(o.total), 0);
        const totalOrders = todayOrders.length;

        const cashSales = todayOrders
            .filter(o => o.paymentMethod === 'Cash')
            .reduce((acc, o) => acc + Number(o.total), 0);

        const onlineSales = todayOrders
            .filter(o => o.paymentMethod === 'UPI' || o.paymentMethod === 'Online' || o.paymentMethod === 'Card')
            .reduce((acc, o) => acc + Number(o.total), 0);

        return { totalSales, totalOrders, cashSales, onlineSales };
    }, [orders]);

    const activeMenuItems = items.filter(i => i.status === 'Active').length;
    const outOfStockItems = items.filter(i => i.status === 'OutOfStock');

    if (loading && orders.length === 0) {
        return <div className="p-8 flex justify-center"><LoadingSpinner /></div>;
    }

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-[var(--brand-dark)] mb-8 animate-in">Dashboard Overview</h1>

            {/* 1. 📅 Today's Stats Section */}
            <div className="mb-8 animate-in">
                <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center gap-2">
                    📅 Today's Performance <span className="text-xs font-normal text-gray-400 bg-gray-100 px-2 py-1 rounded-full">Live Database</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-card p-6 rounded-2xl bg-gradient-to-br from-green-50 to-white border-green-100 relative group cursor-pointer" onClick={() => setShowRevenue(!showRevenue)}>
                        <div className="flex justify-between items-center mb-1">
                            <div className="text-green-800 text-sm font-bold uppercase tracking-wider">Today's Revenue</div>
                            <button className="text-green-600 hover:text-green-800 transition-colors">
                                {showRevenue ? '👁️' : '🙈'}
                            </button>
                        </div>
                        <div className="text-4xl font-bold text-green-700">
                            {showRevenue ? `₹${dailyStats.totalSales.toLocaleString()}` : '₹ •••••'}
                        </div>
                        <div className="text-green-600 text-xs mt-2 font-medium">
                            {showRevenue ?
                                `Cash: ₹${dailyStats.cashSales.toLocaleString()} • Online: ₹${dailyStats.onlineSales.toLocaleString()}` :
                                'Tap to reveal details'
                            }
                        </div>
                    </div>
                    <div className="glass-card p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-white border-blue-100">
                        <div className="text-blue-800 text-sm mb-1 font-bold uppercase tracking-wider">Today's Orders</div>
                        <div className="text-4xl font-bold text-blue-700">{dailyStats.totalOrders}</div>
                        <div className="text-blue-600 text-xs mt-2 font-medium">
                            Avg. Ticket: ₹{dailyStats.totalOrders > 0 ? Math.round(dailyStats.totalSales / dailyStats.totalOrders) : 0}
                        </div>
                    </div>
                    <div className="glass-card p-6 rounded-2xl bg-gradient-to-br from-yellow-50 to-white border-yellow-100">
                        <div className="text-yellow-800 text-sm mb-1 font-bold uppercase tracking-wider">Pending Now</div>
                        <div className="text-4xl font-bold text-yellow-700">{orders.filter(o => o.status === 'Pending').length}</div>
                        <div className="text-yellow-600 text-xs mt-2 font-medium">Requires attention</div>
                    </div>
                </div>
            </div>

            {/* 2. 🚀 5 New Options (Widgets) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

                {/* Widget 1: Quick Actions */}
                <div className="glass-card p-6 rounded-2xl animate-in" style={{ animationDelay: '0.1s' }}>
                    <h3 className="font-bold text-[var(--brand-dark)] mb-4 flex items-center gap-2">⚡ Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <Link href="/dashboard/orders" className="p-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-center font-bold text-sm transition-colors">
                            + New Order
                        </Link>
                        <Link href="/dashboard/menu" className="p-3 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-xl text-center font-bold text-sm transition-colors">
                            + Add Item
                        </Link>
                        <Link href="/dashboard/kitchen" className="p-3 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl text-center font-bold text-sm transition-colors">
                            👨‍🍳 Kitchen
                        </Link>
                        <Link href="/dashboard/analytics" className="p-3 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl text-center font-bold text-sm transition-colors">
                            📊 Reports
                        </Link>
                    </div>
                </div>

                {/* Widget 2: Revenue Trend (Mock Graph - To be connected to analytics API) */}
                <div className="glass-card p-6 rounded-2xl animate-in" style={{ animationDelay: '0.2s' }}>
                    <h3 className="font-bold text-[var(--brand-dark)] mb-4 flex items-center gap-2">📉 Revenue Trend <span className="text-xs text-gray-400 font-normal ml-auto">Last 7 Days (Demo)</span></h3>
                    <div className="flex items-end justify-between h-32 gap-2">
                        {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                            <div key={i} className="w-full bg-blue-100 rounded-t-lg relative group hover:bg-blue-200 transition-colors" style={{ height: `${h}%` }}>
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">₹{h * 100}</div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-400 font-mono">
                        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                </div>

                {/* Widget 3: Low Stock Alerts */}
                <div className="glass-card p-6 rounded-2xl animate-in" style={{ animationDelay: '0.3s' }}>
                    <h3 className="font-bold text-[var(--brand-dark)] mb-4 flex items-center gap-2">⚠️ Low Stock Alerts</h3>
                    {outOfStockItems.length === 0 ? (
                        <div className="text-center py-8 text-green-600 bg-green-50 rounded-xl">
                            <div className="text-2xl mb-1">✅</div>
                            <div className="font-bold text-sm">All items in stock</div>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {outOfStockItems.slice(0, 3).map(item => (
                                <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 text-red-700 rounded-xl border border-red-100">
                                    <span className="font-bold text-sm">{item.name}</span>
                                    <span className="text-xs bg-white px-2 py-1 rounded border border-red-200 font-bold">Out of Stock</span>
                                </div>
                            ))}
                            {outOfStockItems.length > 3 && (
                                <div className="text-center text-xs text-gray-500 mt-2">
                                    + {outOfStockItems.length - 3} more items
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Widget 4: Customer Insights */}
                <div className="glass-card p-6 rounded-2xl animate-in" style={{ animationDelay: '0.4s' }}>
                    <h3 className="font-bold text-[var(--brand-dark)] mb-4 flex items-center gap-2">👥 Customer Insights</h3>
                    <div className="flex items-center gap-6">
                        <div className="relative w-24 h-24 rounded-full border-8 border-blue-100 flex items-center justify-center">
                            <span className="text-xl font-bold text-blue-600">
                                {customers.length > 0 ? 'Active' : '0%'}
                            </span>
                            <svg className="absolute top-0 left-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="8" className="text-blue-500" strokeDasharray="289" strokeDashoffset="43" />
                            </svg>
                        </div>
                        <div>
                            <div className="mb-2">
                                <div className="text-xs text-gray-400 uppercase font-bold">Total Customers</div>
                                <div className="text-lg font-bold text-gray-800">{customers.length} Users</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-400 uppercase font-bold">Returning</div>
                                <div className="text-lg font-bold text-gray-800">
                                    {customers.filter(c => c.totalOrders > 1).length} Users
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Widget 5: Recent Activity (Live Feed) */}
                <div className="glass-card p-4 md:p-6 rounded-2xl animate-in md:col-span-2 lg:col-span-2" style={{ animationDelay: '0.5s' }}>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-[var(--brand-dark)] flex items-center gap-2">📡 Recent Activity</h3>
                        <Link href="/dashboard/orders" className="text-xs text-[var(--brand-primary)] font-bold hover:underline">View All</Link>
                    </div>
                    <div className="space-y-3">
                        {orders.slice(0, 5).map(order => (
                            <div key={order.id} className="flex items-center justify-between p-2 md:p-3 bg-gray-50 rounded-xl border border-gray-100 hover:bg-white hover:shadow-sm transition-all">
                                <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm md:text-lg shrink-0 ${order.type === 'DineIn' ? 'bg-orange-100 text-orange-600' :
                                        order.type === 'Takeaway' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                                        }`}>
                                        {order.type === 'DineIn' ? '🍽️' : order.type === 'Takeaway' ? '🛍️' : '🛵'}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="font-bold text-xs md:text-sm text-gray-800 truncate">
                                            {order.customer} <span className="text-[10px] md:text-xs font-normal text-gray-500">#{order.id}</span>
                                        </div>
                                        <div className="text-[10px] md:text-xs text-gray-500 truncate">
                                            {order.items.length} items • {order.type} • {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right shrink-0">
                                    <div className="font-bold text-xs md:text-sm text-gray-800">₹{order.total}</div>
                                    <span className={`text-[8px] md:text-[10px] px-1.5 md:px-2 py-0.5 rounded-full font-bold uppercase ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                        order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                            order.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                                        }`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {orders.length === 0 && (
                            <div className="text-center py-8 text-gray-400 text-sm">No recent activity</div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}

