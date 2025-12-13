'use client';

import React, { useState, useMemo } from 'react';
import { useDbCustomers, useDbOrders, Customer, Order } from '../../lib/db-hooks';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

export default function CustomersPage() {
    const { customers, loading: loadingCustomers } = useDbCustomers();
    const { orders } = useDbOrders();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

    // Filter Logic
    const filteredCustomers = useMemo(() => {
        return customers.filter(c =>
            c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.phone.includes(searchTerm)
        );
    }, [customers, searchTerm]);

    // Stats Calculation
    const stats = useMemo(() => {
        const totalCustomers = customers.length;
        const totalRevenue = customers.reduce((sum, c) => sum + (c.totalSpent || 0), 0);
        const vipCount = customers.filter(c => (c.totalSpent || 0) > 2000).filter(c => c.phone.length === 10).length; // Simple VIP logic
        const activeToday = orders.filter(o => new Date(o.createdAt).toDateString() === new Date().toDateString()).length;

        return { totalCustomers, totalRevenue, vipCount, activeToday };
    }, [customers, orders]);

    // Get Customer History
    const getCustomerHistory = (phone: string) => {
        return orders.filter(o => o.mobile === phone || o.customer.includes(phone)).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .substring(0, 2)
            .toUpperCase();
    };

    if (loadingCustomers && customers.length === 0) {
        return <div className="h-[60vh] flex items-center justify-center"><LoadingSpinner /></div>;
    }

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-4 animate-in">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Customer CRM
                    </h1>
                    <p className="text-gray-500 mt-1">Manage relationships & track loyalty</p>
                </div>
                <div className="relative w-full md:w-72">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                    <input
                        type="text"
                        placeholder="Search name or phone..."
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Stats Dashboard */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in slide-in-from-bottom-5">
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                    <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Total Customers</span>
                    <span className="text-2xl font-bold text-gray-800 mt-1">{stats.totalCustomers}</span>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                    <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Total Revenue</span>
                    <span className="text-2xl font-bold text-green-600 mt-1">₹{stats.totalRevenue.toLocaleString()}</span>
                </div>
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-5 rounded-2xl shadow-lg text-white flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 text-5xl">👑</div>
                    <span className="text-white/80 text-xs font-bold uppercase tracking-wider relative z-10">VIP Members</span>
                    <span className="text-2xl font-bold mt-1 relative z-10">{stats.vipCount}</span>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                    <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Today's Orders</span>
                    <span className="text-2xl font-bold text-blue-600 mt-1">{stats.activeToday}</span>
                </div>
            </div>

            {/* Customer List Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-in fade-in duration-500">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50/50 border-b border-gray-100">
                            <tr>
                                <th className="text-left p-4 pl-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Customer</th>
                                <th className="text-left p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Contact</th>
                                <th className="text-center p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Stats</th>
                                <th className="text-center p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Loyalty</th>
                                <th className="text-right p-4 pr-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredCustomers.length > 0 ? (
                                filteredCustomers.map((customer) => (
                                    <tr
                                        key={customer.id}
                                        className="hover:bg-gray-50/80 transition-colors cursor-pointer group"
                                        onClick={() => setSelectedCustomer(customer)}
                                    >
                                        <td className="p-4 pl-6">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-sm ${(customer.totalSpent || 0) > 2000
                                                        ? 'bg-gradient-to-br from-yellow-300 to-yellow-500 text-yellow-900 border-2 border-white ring-2 ring-yellow-100'
                                                        : 'bg-indigo-50 text-indigo-600'
                                                    }`}>
                                                    {getInitials(customer.name)}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-800 flex items-center gap-1">
                                                        {customer.name}
                                                        {(customer.totalSpent || 0) > 2000 && <span title="VIP Customer">👑</span>}
                                                    </div>
                                                    <div className="text-[10px] text-gray-400">ID: {customer.id.substring(0, 6)}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="font-medium text-gray-700">{customer.phone}</div>
                                            <div className="text-xs text-gray-400">{customer.email || 'No email'}</div>
                                        </td>
                                        <td className="p-4 text-center">
                                            <div className="flex flex-col items-center">
                                                <span className="font-bold text-gray-800">{customer.totalOrders} <span className="text-xs text-gray-400 font-normal">orders</span></span>
                                                <span className="text-xs font-bold text-green-600">₹{customer.totalSpent}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-center">
                                            <div className="inline-flex flex-col items-center bg-purple-50 px-3 py-1 rounded-lg">
                                                <span className="text-purple-700 font-bold">{customer.loyaltyPoints}</span>
                                                <span className="text-[10px] text-purple-400 uppercase font-bold">Points</span>
                                            </div>
                                        </td>
                                        <td className="p-4 pr-6 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={e => e.stopPropagation()}>
                                                <a
                                                    href={`tel:${customer.phone}`}
                                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                                                    title="Call"
                                                >
                                                    📞
                                                </a>
                                                <a
                                                    href={`https://wa.me/91${customer.phone.replace(/\D/g, '').slice(-10)}`}
                                                    target="_blank"
                                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                                                    title="WhatsApp"
                                                    rel="noreferrer"
                                                >
                                                    💬
                                                </a>
                                                <button
                                                    className="px-3 py-1 rounded-lg bg-gray-100 text-gray-600 text-xs font-bold hover:bg-gray-200 transition-colors"
                                                    onClick={() => setSelectedCustomer(customer)}
                                                >
                                                    View
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="p-12 text-center text-gray-400">
                                        <div className="text-3xl mb-2">🤷‍♂️</div>
                                        No customers found. Try searching differently.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Customer Details Modal */}
            {selectedCustomer && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        {/* Modal Header */}
                        <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 text-white flex justify-between items-start">
                            <div className="flex items-center gap-4">
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold bg-white/10 text-white backdrop-blur-md border border-white/20`}>
                                    {getInitials(selectedCustomer.name)}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h2 className="text-2xl font-bold">{selectedCustomer.name}</h2>
                                        {(selectedCustomer.totalSpent || 0) > 2000 && <span className="bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">VIP</span>}
                                    </div>
                                    <p className="text-gray-300 flex items-center gap-2 text-sm mt-1">
                                        <span>📞 {selectedCustomer.phone}</span>
                                        <span>•</span>
                                        <span>📍 {selectedCustomer.address || 'No Address'}</span>
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedCustomer(null)}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 max-h-[60vh] overflow-y-auto">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Order History</h3>
                            <div className="space-y-3">
                                {getCustomerHistory(selectedCustomer.phone).length > 0 ? (
                                    getCustomerHistory(selectedCustomer.phone).map(order => (
                                        <div key={order.id} className="border rounded-xl p-4 flex justify-between items-center hover:border-indigo-200 transition-colors bg-gray-50 group">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-bold text-gray-800">Order #{order.id.slice(-6)}</span>
                                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                                            order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                                                                'bg-orange-100 text-orange-700'
                                                        }`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1">
                                                    {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold text-lg text-gray-800">₹{order.total}</div>
                                                <div className="text-xs text-gray-400">{order.type}</div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-gray-400 border-2 border-dashed rounded-xl">
                                        No order history found for this phone number.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="bg-gray-50 p-4 flex justify-end gap-2 border-t">
                            <a
                                href={`tel:${selectedCustomer.phone}`}
                                className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm flex items-center gap-2"
                            >
                                📞 Call
                            </a>
                            <button
                                onClick={() => setSelectedCustomer(null)}
                                className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium text-sm transition-colors shadow-lg shadow-gray-200"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
