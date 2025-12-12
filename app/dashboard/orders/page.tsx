'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useDbOrders } from '../../lib/db-hooks';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

// Helper function to format order item (handles both string and object formats)
const formatOrderItem = (item: any): string => {
    if (typeof item === 'string') {
        return item;
    } else if (typeof item === 'object' && item !== null) {
        return `${item.name} (${item.quantity || 1})`;
    }
    return String(item);
};

const OrdersPage = () => {
    const { orders, updateOrder, loading } = useDbOrders();
    const [activeTab, setActiveTab] = useState<'live' | 'completed' | 'cancelled' | 'train' | 'all'>('live');
    const [searchQuery, setSearchQuery] = useState('');
    const [isSoundEnabled, setIsSoundEnabled] = useState(true);
    const prevOrderCountRef = useRef(orders.length);
    const [dateFilter, setDateFilter] = useState<'today' | 'week' | 'month' | 'all'>('all');

    const playNotificationSound = () => {
        try {
            const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
            audio.play().catch(() => { });
        } catch { }
    };

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (loading) return;
        if (isFirstRender.current) {
            isFirstRender.current = false;
            prevOrderCountRef.current = orders.length;
            return;
        }
        if (orders.length > prevOrderCountRef.current) {
            if (isSoundEnabled) playNotificationSound();
        }
        prevOrderCountRef.current = orders.length;
    }, [orders.length, isSoundEnabled, loading]);

    const totalRevenue = orders.reduce((sum, order) => order.status !== 'Cancelled' ? sum + Number(order.total) : sum, 0);
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === 'Pending').length;
    const cookingOrders = orders.filter(o => o.status === 'Cooking').length;

    const paidOrders = orders.filter(o => o.paymentStatus === 'Paid' && o.status !== 'Cancelled');
    const unpaidOrders = orders.filter(o => o.paymentStatus === 'Unpaid' && o.status !== 'Cancelled');

    const cashCollected = paidOrders.filter(o => o.paymentMethod === 'Cash').reduce((sum, o) => sum + Number(o.total), 0);
    const upiCollected = paidOrders.filter(o => o.paymentMethod === 'UPI').reduce((sum, o) => sum + Number(o.total), 0);
    const onlineCollected = paidOrders.filter(o => o.paymentMethod === 'Online' || o.paymentMethod === 'Card').reduce((sum, o) => sum + Number(o.total), 0);
    const totalCollected = cashCollected + upiCollected + onlineCollected;
    const pendingCollection = unpaidOrders.reduce((sum, o) => sum + Number(o.total), 0);

    const filteredOrders = orders.filter(order => {
        const orderDate = new Date(order.createdAt || Date.now());
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

        const matchesDate = dateFilter === 'today' ? orderDate >= today : dateFilter === 'week' ? orderDate >= weekAgo : dateFilter === 'month' ? orderDate >= monthAgo : true;

        let matchesTab = true;
        if (activeTab === 'live') matchesTab = ['Pending', 'Cooking', 'Ready'].includes(order.status);
        else if (activeTab === 'completed') matchesTab = order.status === 'Completed';
        else if (activeTab === 'cancelled') matchesTab = order.status === 'Cancelled';
        else if (activeTab === 'train') matchesTab = !!order.trainDetails;

        const query = searchQuery.toLowerCase();
        const matchesSearch = order.id.toString().includes(query) ||
            order.customer.toLowerCase().includes(query) ||
            (order.trainDetails?.pnr || '').includes(query) ||
            (order.mobile || '').includes(query);

        return matchesDate && matchesTab && matchesSearch;
    }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const printBill = (order: any) => {
        const billContent = `<html><head><title>Bill #${order.id}</title><style>body{font-family:monospace;padding:20px;max-width:300px;margin:0 auto;}.header{text-align:center;margin-bottom:20px;border-bottom:1px dashed #000;padding-bottom:10px;}.item{display:flex;justify-content:space-between;margin-bottom:5px;}.total{border-top:1px dashed #000;margin-top:10px;padding-top:10px;display:flex;justify-content:space-between;font-weight:bold;}.footer{text-align:center;margin-top:20px;font-size:12px;}</style></head><body><div class="header"><h2>Oye Chatoro</h2><p>Abu Road, Rajasthan</p><p>Order #${order.id}</p><p>${new Date().toLocaleString()}</p></div><div class="items">${order.items.map((item: any) => `<div class="item"><span>${formatOrderItem(item)}</span></div>`).join('')}</div><div class="total"><span>TOTAL</span><span>₹${order.total}</span></div><div class="footer"><p>Thank you for dining with us!</p></div><script>window.print();</script></body></html>`;
        const printWindow = window.open('', '', 'width=400,height=600');
        if (printWindow) {
            printWindow.document.write(billContent);
            printWindow.document.close();
        }
    };

    const exportCSV = () => {
        const csv = [
            ['Order ID', 'Customer', 'Mobile', 'Items', 'Total', 'Payment Method', 'Payment Status', 'Order Status', 'Date'].join(','),
            ...filteredOrders.map(o => [
                o.id,
                `"${o.customer}"`,
                o.mobile || '',
                `"${o.items.map((item: any) => formatOrderItem(item)).join(', ')}"`,
                o.total,
                o.paymentMethod || '',
                o.paymentStatus || '',
                o.status,
                new Date(o.createdAt || Date.now()).toLocaleString()
            ].join(','))
        ].join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `orders_${dateFilter}_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    if (loading && orders.length === 0) {
        return <div className="p-12 flex justify-center"><LoadingSpinner /></div>;
    }

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            <div className="mb-8 animate-in w-full">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <h1 className="text-3xl font-bold text-[var(--brand-dark)]">Order Management <span className="text-sm font-normal text-gray-400 bg-gray-100 px-2 py-1 rounded-full ml-2">Live Database</span></h1>
                    <div className="flex gap-3 w-full md:w-auto">
                        <div className="relative flex-1 w-full md:w-64">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                            <input placeholder="Search ID, Name, PNR..." className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        </div>
                        <button onClick={() => setIsSoundEnabled(!isSoundEnabled)} className={`p-2 rounded-xl border transition-colors ${isSoundEnabled ? 'bg-white text-[var(--brand-primary)] border-[var(--brand-primary)]' : 'bg-gray-100 text-gray-400 border-gray-200'}`} title={isSoundEnabled ? "Sound On" : "Sound Off"}>
                            {isSoundEnabled ? '🔔' : '🔕'}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full">
                    <div className="glass-card p-4 rounded-xl flex items-center gap-4 bg-white/60">
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-2xl shrink-0">💰</div>
                        <div className="min-w-0"><div className="text-sm text-[var(--text-muted)] truncate">Total Revenue</div><div className="text-2xl font-bold text-[var(--brand-dark)]">₹{totalRevenue.toLocaleString()}</div></div>
                    </div>
                    <div className="glass-card p-4 rounded-xl flex items-center gap-4 bg-white/60">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl shrink-0">📦</div>
                        <div className="min-w-0"><div className="text-sm text-[var(--text-muted)] truncate">Total Orders</div><div className="text-2xl font-bold text-[var(--brand-dark)]">{totalOrders}</div></div>
                    </div>
                    <div className="glass-card p-4 rounded-xl flex items-center gap-4 bg-white/60">
                        <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-2xl shrink-0">⏳</div>
                        <div className="min-w-0"><div className="text-sm text-[var(--text-muted)] truncate">Pending</div><div className="text-2xl font-bold text-yellow-600">{pendingOrders}</div></div>
                    </div>
                    <div className="glass-card p-4 rounded-xl flex items-center gap-4 bg-white/60">
                        <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-2xl shrink-0">🔥</div>
                        <div className="min-w-0"><div className="text-sm text-[var(--text-muted)] truncate">Cooking</div><div className="text-2xl font-bold text-orange-600">{cookingOrders}</div></div>
                    </div>
                </div>

                <div className="mt-4 glass-card p-4 rounded-xl bg-gradient-to-r from-green-50 to-blue-50 border border-green-100">
                    <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2"><span>💳</span> Payment Summary (Today)</h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        <div className="bg-white/80 p-3 rounded-lg text-center border border-green-100"><div className="text-xs text-gray-500 mb-1">💵 Cash</div><div className="text-lg font-bold text-green-600">₹{cashCollected.toLocaleString()}</div></div>
                        <div className="bg-white/80 p-3 rounded-lg text-center border border-purple-100"><div className="text-xs text-gray-500 mb-1">📱 UPI</div><div className="text-lg font-bold text-purple-600">₹{upiCollected.toLocaleString()}</div></div>
                        <div className="bg-white/80 p-3 rounded-lg text-center border border-blue-100"><div className="text-xs text-gray-500 mb-1">💳 Online</div><div className="text-lg font-bold text-blue-600">₹{onlineCollected.toLocaleString()}</div></div>
                        <div className="bg-white/80 p-3 rounded-lg text-center border border-gray-200"><div className="text-xs text-gray-500 mb-1">✅ Total Collected</div><div className="text-lg font-bold text-gray-800">₹{totalCollected.toLocaleString()}</div></div>
                        <div className="bg-white/80 p-3 rounded-lg text-center border border-orange-100"><div className="text-xs text-gray-500 mb-1">⏳ Pending ({unpaidOrders.length})</div><div className="text-lg font-bold text-orange-600">₹{pendingCollection.toLocaleString()}</div></div>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className="text-sm font-medium text-gray-600">🗓️ Period:</span>
                {[{ id: 'today', label: 'Today' }, { id: 'week', label: 'This Week' }, { id: 'month', label: 'This Month' }, { id: 'all', label: 'All Time' }].map(df => (
                    <button key={df.id} onClick={() => setDateFilter(df.id as any)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${dateFilter === df.id ? 'bg-[var(--brand-dark)] text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}>{df.label}</button>
                ))}
                <button onClick={exportCSV} className="ml-auto px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-bold hover:bg-green-700 transition-colors flex items-center gap-2">📥 Export CSV</button>
            </div>

            <div className="flex flex-row overflow-x-auto pb-2 mb-6 gap-2 no-scrollbar w-full">
                {[
                    { id: 'live', label: '🔴 Live Orders', count: orders.filter(o => ['Pending', 'Cooking', 'Ready'].includes(o.status)).length },
                    { id: 'train', label: '🚆 Train Orders', count: orders.filter(o => !!o.trainDetails).length },
                    { id: 'completed', label: '✅ Completed', count: orders.filter(o => o.status === 'Completed').length },
                    { id: 'cancelled', label: '❌ Cancelled', count: orders.filter(o => o.status === 'Cancelled').length },
                    { id: 'all', label: '📂 All Orders', count: orders.length }
                ].map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${activeTab === tab.id ? 'bg-[var(--brand-dark)] text-white shadow-lg scale-105' : 'bg-white text-[var(--text-muted)] hover:bg-gray-50'} whitespace-nowrap flex-shrink-0`}>
                        {tab.label}
                        <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20' : 'bg-gray-100'}`}>{tab.count}</span>
                    </button>
                ))}
            </div>

            <div className="grid gap-4 animate-in pb-24">
                {filteredOrders.length === 0 ? (
                    <div className="text-center py-12 text-[var(--text-muted)]"><div className="text-6xl mb-4 opacity-30">📭</div><p>No orders found matching your search.</p></div>
                ) : (
                    filteredOrders.map((order) => (
                        <div key={order.id} className={`glass-card p-4 md:p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all border-l-4 ${order.status === 'Pending' ? 'border-l-yellow-400 bg-yellow-50/30' : order.status === 'Cooking' ? 'border-l-blue-400 bg-blue-50/30' : order.status === 'Ready' ? 'border-l-green-400 bg-green-50/30' : order.status === 'Cancelled' ? 'border-l-red-400 bg-red-50/30' : 'border-l-gray-400'}`}>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-2 flex-wrap">
                                    <span className="font-bold text-lg text-[var(--brand-dark)] shrink-0">#{order.id}</span>
                                    <span className="text-sm text-[var(--text-muted)] bg-white px-2 py-1 rounded border shrink-0">{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shrink-0 ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : order.status === 'Cooking' ? 'bg-blue-100 text-blue-700' : order.status === 'Ready' ? 'bg-green-100 text-green-700' : order.status === 'Completed' ? 'bg-gray-100 text-gray-700' : 'bg-red-100 text-red-700'}`}>{order.status}</span>
                                    {order.trainDetails && <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold">🚆 Train</span>}
                                    <select value={order.paymentMethod || 'Cash'} onChange={(e) => updateOrder(order.id, { paymentMethod: e.target.value as any })} className={`px-2 py-1 rounded text-xs font-bold border-0 cursor-pointer ${order.paymentMethod === 'Cash' ? 'bg-yellow-100 text-yellow-700' : order.paymentMethod === 'UPI' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                                        <option value="Cash">💵 Cash</option>
                                        <option value="UPI">📱 UPI</option>
                                        <option value="Online">💳 Online</option>
                                        <option value="Card">💳 Card</option>
                                    </select>
                                    {order.paymentStatus && <span className={`px-2 py-1 rounded text-xs font-bold ${order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{order.paymentStatus === 'Paid' ? '✅ Paid' : '⏳ Unpaid'}</span>}
                                </div>
                                <h3 className="font-bold text-[var(--text-main)] mb-1 text-lg truncate">{order.customer || 'Guest'}</h3>
                                {order.mobile && (
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-sm text-gray-600">📱 {order.mobile}</span>
                                        {order.status === 'Ready' && (
                                            <a href={`https://wa.me/91${order.mobile}?text=${encodeURIComponent(`🎉 Hi ${order.customer}! Your order #${order.id} is READY!\n\nItems: ${order.items.map((item: any) => formatOrderItem(item)).join(', ')}\nTotal: ₹${order.total}\n\nThank you from Oye Chatoro! 🍽️`)}`} target="_blank" rel="noopener noreferrer" className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded hover:bg-green-600">📲 Notify</a>
                                        )}
                                    </div>
                                )}
                                {order.trainDetails && (
                                    <div className="bg-red-50 border border-red-100 rounded-lg p-2 mb-2 text-sm text-red-800 grid grid-cols-3 gap-2">
                                        <div><span className="block text-[10px] text-red-400 uppercase">PNR</span><span className="font-bold">{order.trainDetails.pnr}</span></div>
                                        <div><span className="block text-[10px] text-red-400 uppercase">Train</span><span className="font-bold">{order.trainDetails.trainNo}</span></div>
                                        <div><span className="block text-[10px] text-red-400 uppercase">Seat</span><span className="font-bold">{order.trainDetails.coachSeat || 'N/A'}</span></div>
                                    </div>
                                )}
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {order.items.map((item: any, i: number) => (
                                        <span key={i} className="text-sm bg-white px-3 py-1 rounded-full border border-gray-100 text-gray-600">{formatOrderItem(item)}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 mt-2 md:mt-0">
                                <div className="text-right min-w-[100px]"><div className="text-xs text-[var(--text-muted)]">Total Amount</div><div className="font-bold text-xl md:text-2xl text-[var(--brand-primary)]">₹{order.total}</div></div>
                                <div className="flex gap-2 flex-1 md:flex-none justify-end">
                                    <button onClick={() => printBill(order)} className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors" title="Print Bill">🖨️</button>
                                    {order.paymentStatus === 'Unpaid' && <button onClick={() => updateOrder(order.id, { paymentStatus: 'Paid' })} className="p-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-xl font-medium" title="Mark as Paid">💰</button>}
                                    {order.paymentStatus === 'Paid' && <button onClick={() => updateOrder(order.id, { paymentStatus: 'Unpaid' })} className="p-3 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-xl font-medium" title="Mark as Unpaid">↩️</button>}
                                    {order.status === 'Pending' && (
                                        <>
                                            <button onClick={() => updateOrder(order.id, { status: 'Cooking' })} className="flex-1 md:flex-none px-4 md:px-6 py-2 md:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-200 transition-all text-sm md:text-base">Accept & Cook</button>
                                            <button onClick={() => updateOrder(order.id, { status: 'Cancelled' })} className="px-3 md:px-4 py-2 md:py-3 bg-red-100 hover:bg-red-200 text-red-600 rounded-xl font-bold text-sm md:text-base">Reject</button>
                                        </>
                                    )}
                                    {order.status === 'Cooking' && <button onClick={() => updateOrder(order.id, { status: 'Ready' })} className="flex-1 md:flex-none px-4 md:px-6 py-2 md:py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold shadow-lg shadow-orange-200 text-sm md:text-base">Mark Ready</button>}
                                    {order.status === 'Ready' && (
                                        <>
                                            {order.mobile && (
                                                <a
                                                    href={`https://wa.me/91${order.mobile.replace(/\D/g, '')}?text=${encodeURIComponent(`🎉 Hi ${order.customer}!\n\nYour Order #${order.id} is READY! 🍔\n\nPlease collect from the counter.\n\nThank you!\n- Oye Chatoro 🙏`)}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex-1 md:flex-none px-4 md:px-6 py-2 md:py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold shadow-lg shadow-green-200 text-sm md:text-base flex items-center gap-2"
                                                >
                                                    📲 WhatsApp
                                                </a>
                                            )}
                                            <button onClick={() => updateOrder(order.id, { status: 'Completed' })} className="flex-1 md:flex-none px-4 md:px-6 py-2 md:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-200 text-sm md:text-base">Complete ✓</button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default OrdersPage;
