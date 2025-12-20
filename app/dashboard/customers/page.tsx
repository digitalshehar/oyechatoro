'use client';

import React, { useState, useMemo } from 'react';
import { useDbCustomers, useDbOrders, Customer, Order } from '../../lib/db-hooks';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

export default function CustomersPage() {
    const { customers, loading: loadingCustomers } = useDbCustomers();
    const { orders } = useDbOrders();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

    // Selection States
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [isBulkOffering, setIsBulkOffering] = useState(false);
    const [bulkOfferContent, setBulkOfferContent] = useState<{ dish: string, message: string } | null>(null);

    // AI States
    const [isSegmenting, setIsSegmenting] = useState(false);
    const [customerSegments, setCustomerSegments] = useState<Record<string, string>>({});
    const [isGeneratingOffer, setIsGeneratingOffer] = useState(false);
    const [currentOffer, setCurrentOffer] = useState<{ dish: string, message: string } | null>(null);

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

    const handleAISegment = async () => {
        setIsSegmenting(true);
        try {
            const res = await fetch('/api/seo/ai/customers/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ customers })
            });
            const data = await res.json();
            if (data.segments) setCustomerSegments(data.segments);
        } catch (err) {
            console.error('Segmentation error:', err);
        } finally {
            setIsSegmenting(false);
        }
    };

    const handleGenerateOffer = async (customer: Customer) => {
        setIsGeneratingOffer(true);
        setCurrentOffer(null);
        try {
            const lastOrder = getCustomerHistory(customer.phone)[0];
            const lastItem = lastOrder ? lastOrder.items[0]?.name : 'anything';

            const res = await fetch('/api/seo/ai/customers/offer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customerData: {
                        name: customer.name,
                        segment: customerSegments[customer.id] || 'Regular',
                        lastItem
                    }
                })
            });
            const data = await res.json();
            if (data.offer) setCurrentOffer(data.offer);
        } catch (err) {
            console.error('Offer error:', err);
        } finally {
            setIsGeneratingOffer(false);
        }
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
                <div className="flex gap-3 w-full md:w-auto">
                    {selectedIds.size > 0 && (
                        <div className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl animate-in fade-in slide-in-from-right-4">
                            <span className="font-bold text-sm">{selectedIds.size} Selected</span>
                            <button
                                onClick={() => setIsBulkOffering(true)}
                                className="bg-white text-indigo-600 px-3 py-1 rounded-lg font-bold text-xs hover:bg-indigo-50"
                            >
                                🎁 Bulk Offer
                            </button>
                            <button onClick={() => setSelectedIds(new Set())} className="text-white/70 hover:text-white">✕</button>
                        </div>
                    )}
                    <button
                        onClick={handleAISegment}
                        disabled={isSegmenting}
                        className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all ${isSegmenting ? 'bg-gray-100 text-gray-400' : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-100'}`}
                    >
                        {isSegmenting ? <span className="animate-spin">🔄</span> : '🪄'} {isSegmenting ? 'Segmenting...' : 'AI Segment'}
                    </button>
                    <div className="relative flex-1 md:w-72">
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

            {/* Mobile Card View */}
            <div className="md:hidden grid gap-4">
                {filteredCustomers.length > 0 ? (
                    filteredCustomers.map((customer) => (
                        <div
                            key={customer.id}
                            onClick={() => setSelectedCustomer(customer)}
                            className={`bg-white p-4 rounded-2xl border border-gray-100 shadow-sm animate-in fade-in transition-all active:scale-95 ${selectedIds.has(customer.id) ? 'ring-2 ring-indigo-500' : ''}`}
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold shadow-sm ${(customer.totalSpent || 0) > 2000
                                    ? 'bg-gradient-to-br from-yellow-300 to-yellow-500 text-yellow-900 border-2 border-white'
                                    : 'bg-indigo-50 text-indigo-600'
                                    }`}>
                                    {getInitials(customer.name)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-bold text-gray-800 text-lg truncate flex items-center gap-1">
                                        {customer.name}
                                        {(customer.totalSpent || 0) > 2000 && <span>👑</span>}
                                    </div>
                                    <div className="text-sm text-gray-500 flex items-center gap-2">
                                        <span>📱 {customer.phone}</span>
                                        {customerSegments[customer.id] && (
                                            <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase ${customerSegments[customer.id] === 'VIP' ? 'bg-yellow-100 text-yellow-700' :
                                                customerSegments[customer.id] === 'Churn Risk' ? 'bg-red-100 text-red-700' :
                                                    'bg-green-100 text-green-700'
                                                }`}>
                                                {customerSegments[customer.id]}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase leading-none">
                                        Pts
                                        <div className="text-base">{customer.loyaltyPoints}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 mb-3 bg-gray-50 p-2 rounded-xl border border-gray-100">
                                <div className="text-center border-r border-gray-200">
                                    <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Orders</div>
                                    <div className="font-bold text-gray-800">{customer.totalOrders}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Total Spent</div>
                                    <div className="font-bold text-green-600">₹{customer.totalSpent}</div>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <a
                                    href={`tel:${customer.phone}`}
                                    className="flex-1 py-2.5 bg-blue-50 text-blue-600 rounded-xl font-bold text-sm flex items-center justify-center gap-2 active:bg-blue-100"
                                    onClick={e => e.stopPropagation()}
                                >
                                    📞 Call
                                </a>
                                <a
                                    href={`https://wa.me/91${customer.phone.replace(/\D/g, '').slice(-10)}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex-1 py-2.5 bg-green-50 text-green-600 rounded-xl font-bold text-sm flex items-center justify-center gap-2 active:bg-green-100"
                                    onClick={e => e.stopPropagation()}
                                >
                                    💬 WhatsApp
                                </a>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 text-gray-400 opacity-50">
                        <div className="text-6xl mb-2">🤷‍♂️</div>
                        <p>No customers found.</p>
                    </div>
                )}
            </div>

            {/* Customer List Table - Hidden on Mobile */}
            <div className="hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-in fade-in duration-500">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50/50 border-b border-gray-100">
                            <tr>
                                <th className="p-4 pl-6 w-10">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        checked={selectedIds.size === filteredCustomers.length && filteredCustomers.length > 0}
                                        onChange={(e) => {
                                            if (e.target.checked) setSelectedIds(new Set(filteredCustomers.map(c => c.id)));
                                            else setSelectedIds(new Set());
                                        }}
                                    />
                                </th>
                                <th className="text-left p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Customer</th>
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
                                        className={`hover:bg-gray-50/80 transition-colors cursor-pointer group ${selectedIds.has(customer.id) ? 'bg-indigo-50/50' : ''}`}
                                        onClick={() => setSelectedCustomer(customer)}
                                    >
                                        <td className="p-4 pl-6" onClick={e => e.stopPropagation()}>
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                checked={selectedIds.has(customer.id)}
                                                onChange={() => {
                                                    const next = new Set(selectedIds);
                                                    if (next.has(customer.id)) next.delete(customer.id);
                                                    else next.add(customer.id);
                                                    setSelectedIds(next);
                                                }}
                                            />
                                        </td>
                                        <td className="p-4">
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
                                            <div className="flex flex-col items-center gap-1">
                                                <div className="inline-flex flex-col items-center bg-purple-50 px-3 py-1 rounded-lg">
                                                    <span className="text-purple-700 font-bold">{customer.loyaltyPoints}</span>
                                                    <span className="text-[10px] text-purple-400 uppercase font-bold">Points</span>
                                                </div>
                                                {customerSegments[customer.id] && (
                                                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter ${customerSegments[customer.id] === 'VIP' ? 'bg-yellow-100 text-yellow-700' :
                                                        customerSegments[customer.id] === 'Churn Risk' ? 'bg-red-100 text-red-700' :
                                                            customerSegments[customer.id] === 'Loyal' ? 'bg-green-100 text-green-700' :
                                                                'bg-gray-100 text-gray-600'
                                                        }`}>
                                                        {customerSegments[customer.id]}
                                                    </span>
                                                )}
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
                                        <span>📍 {selectedCustomer.details?.address || 'No Address'}</span>
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
                                                    <span className="font-bold text-gray-800">Order #{String(order.id)}</span>
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

                        {/* AI Smart Offer Section */}
                        <div className="px-6 pb-6 mt-4">
                            {!currentOffer ? (
                                <button
                                    onClick={() => handleGenerateOffer(selectedCustomer)}
                                    disabled={isGeneratingOffer}
                                    className="w-full py-3 bg-indigo-50 text-indigo-700 font-bold rounded-xl border-2 border-dashed border-indigo-200 hover:bg-indigo-100 transition-all flex items-center justify-center gap-2"
                                >
                                    {isGeneratingOffer ? <span className="animate-spin text-xl">✨</span> : '🎁'}
                                    {isGeneratingOffer ? 'Analyzing taste profile...' : 'Generate Smart Offer'}
                                </button>
                            ) : (
                                <div className="bg-indigo-900 rounded-2xl p-5 text-white animate-in zoom-in-95">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl">🪄</span>
                                            <div>
                                                <div className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">Recommended Dish</div>
                                                <div className="font-bold text-lg leading-tight">{currentOffer.dish}</div>
                                            </div>
                                        </div>
                                        <button onClick={() => setCurrentOffer(null)} className="text-indigo-400 hover:text-white">✕</button>
                                    </div>
                                    <div className="bg-white/10 p-4 rounded-xl text-sm italic mb-4 border border-white/10 backdrop-blur-sm">
                                        "{currentOffer.message}"
                                    </div>
                                    <button
                                        onClick={() => {
                                            const encoded = encodeURIComponent(currentOffer.message);
                                            window.open(`https://wa.me/91${selectedCustomer.phone.replace(/\D/g, '').slice(-10)}?text=${encoded}`, '_blank');
                                        }}
                                        className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-900/20"
                                    >
                                        <span>💬</span> Send via WhatsApp
                                    </button>
                                </div>
                            )}
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
            {/* Bulk Offer Modal */}
            {isBulkOffering && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 animate-in zoom-in-95">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">🎁 Bulk AI Smart Offer</h2>
                        <p className="text-gray-500 text-sm mb-6">Generating a special offer for your {selectedIds.size} selected customers.</p>

                        {!bulkOfferContent ? (
                            <button
                                onClick={async () => {
                                    setIsGeneratingOffer(true);
                                    try {
                                        const res = await fetch('/api/seo/ai/customers/offer', {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({
                                                customerData: {
                                                    name: "our valuable customers",
                                                    segment: "Loyal Group",
                                                    lastItem: "favorite dishes"
                                                }
                                            })
                                        });
                                        const data = await res.json();
                                        if (data.offer) setBulkOfferContent(data.offer);
                                    } catch (err) {
                                        console.error(err);
                                    } finally {
                                        setIsGeneratingOffer(false);
                                    }
                                }}
                                disabled={isGeneratingOffer}
                                className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-200"
                            >
                                {isGeneratingOffer ? <span className="animate-spin">✨</span> : '🚀'}
                                {isGeneratingOffer ? 'Creating group magic...' : 'Generate Group Offer'}
                            </button>
                        ) : (
                            <div className="space-y-4">
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Theme</div>
                                    <div className="font-bold text-indigo-700">{bulkOfferContent.dish}</div>
                                    <div className="mt-2 text-sm text-gray-700 italic">"{bulkOfferContent.message}"</div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            // Open multiple WA links or use a broadcast approach (mocked for now)
                                            alert(`Sending to ${selectedIds.size} customers via broadcast...`);
                                            setIsBulkOffering(false);
                                            setSelectedIds(new Set());
                                        }}
                                        className="flex-1 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 shadow-lg shadow-green-100"
                                    >
                                        📲 Launch Broadcast
                                    </button>
                                    <button
                                        onClick={() => setBulkOfferContent(null)}
                                        className="px-4 py-3 bg-gray-100 text-gray-500 font-bold rounded-xl hover:bg-gray-200"
                                    >
                                        🔄
                                    </button>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={() => { setIsBulkOffering(false); setBulkOfferContent(null); }}
                            className="w-full mt-4 text-gray-400 text-sm hover:text-gray-600"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
