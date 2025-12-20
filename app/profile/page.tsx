'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useFavorites } from '../lib/storage';
import { useDbCustomer, useDbOrders, useDbCart, useDbMenu } from '../lib/db-hooks';

export default function ProfilePage() {
    const { user, loading, updateUser } = useDbCustomer();
    const { orders } = useDbOrders();
    const { items: menuItems } = useDbMenu();
    const router = useRouter();
    const { addToCart } = useDbCart();
    const { favorites } = useFavorites();
    const [activeTab, setActiveTab] = useState('overview');
    const [orderTab, setOrderTab] = useState<'active' | 'past'>('active');

    // State for inputs
    const [newAddress, setNewAddress] = useState({ label: '', text: '' });
    const [isAddingAddress, setIsAddingAddress] = useState(false);

    if (loading || !user) {
        return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin text-4xl">🥘</div></div>;
    }

    const myOrders = orders
        .filter((o: any) => (user && user.id && o.userId === user.id) || (user && o.customer === user.name))
        .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const activeOrders = myOrders.filter((o: any) => ['Pending', 'Cooking', 'Ready'].includes(o.status));
    const pastOrders = myOrders.filter((o: any) => ['Completed', 'Cancelled'].includes(o.status));

    // --- Feature Helpers ---
    const triggerConfetti = () => { /* Confetti logic */ };

    const handleReorder = async (order: any) => {
        // Robust parsing: "Item Name (Qty)" or just "Item Name"
        for (const itemStr of order.items) {
            let name = itemStr;
            let quantity = 1;

            const match = itemStr.match(/(.*) \((\d+)\)/);
            if (match) {
                name = match[1];
                quantity = parseInt(match[2]);
            }

            // Find item in menu to get ID
            const menuItem = menuItems.find(i => i.name.toLowerCase() === name.toLowerCase());
            if (menuItem) {
                await addToCart({ menuItemId: menuItem.id, quantity });
            }
        }
        router.push('/');
    };

    const downloadInvoice = (order: any) => {
        const element = document.createElement("a");
        const file = new Blob([`INVOICE #ORD-${order.id}\nDate: ${new Date(order.createdAt).toLocaleString()}\nTotal: ₹${order.total}`], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `Invoice-${order.id}.txt`;
        document.body.appendChild(element);
        element.click();
    };

    const getStepStatus = (orderStatus: string, step: string) => {
        const steps = ['Pending', 'Cooking', 'Ready', 'Completed'];
        const currentIndex = steps.indexOf(orderStatus);
        const stepIndex = steps.indexOf(step);
        if (orderStatus === 'Cancelled') return 'cancelled';
        if (stepIndex < currentIndex) return 'completed';
        if (stepIndex === currentIndex) return 'current';
        return 'upcoming';
    };

    // --- Actions ---
    const addAddress = () => {
        if (!newAddress.label || !newAddress.text) return;
        const addresses = user.addresses || [];
        updateUser({ addresses: [...addresses, { id: Date.now().toString(), ...newAddress, isDefault: addresses.length === 0 }] });
        setNewAddress({ label: '', text: '' });
        setIsAddingAddress(false);
    };

    const removeAddress = (id: string) => {
        const addresses = user.addresses?.filter((a: any) => a.id !== id) || [];
        updateUser({ addresses });
    };

    const toggleDietary = (pref: string) => {
        const current = user.preferences?.dietary || [];
        const updated = current.includes(pref) ? current.filter((p: any) => p !== pref) : [...current, pref];
        updateUser({ preferences: { ...user.preferences, dietary: updated, language: user.preferences?.language || 'en' } });
    };

    const updateLanguage = (lang: string) => {
        updateUser({ preferences: { ...user.preferences, dietary: user.preferences?.dietary || [], language: lang } });
    };

    const updateDate = (field: 'birthday' | 'anniversary', value: string) => {
        updateUser({ dates: { ...user.dates, birthday: user.dates?.birthday || '', anniversary: user.dates?.anniversary || '', [field]: value } });
    };

    // --- Render Sections ---

    const renderOverview = () => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in">
            {/* User Info Card */}
            <div className="md:col-span-1">
                <div className="glass-card p-6 rounded-2xl text-center sticky top-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-[var(--brand-primary)] to-orange-600 text-white rounded-full flex items-center justify-center text-4xl font-bold mx-auto mb-4 shadow-lg ring-4 ring-orange-100">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    <h2 className="text-xl font-bold mb-1">{user.name}</h2>
                    <p className="text-[var(--text-muted)] text-sm mb-4">{user.email}</p>

                    <div className="flex justify-center gap-2 mb-6">
                        <div className="text-center px-4 py-2 bg-orange-50 rounded-lg">
                            <div className="text-xl font-bold text-orange-600">{user.loyalty?.points || 0}</div>
                            <div className="text-xs text-gray-500">Points</div>
                        </div>
                        <div className="text-center px-4 py-2 bg-blue-50 rounded-lg">
                            <div className="text-xl font-bold text-blue-600">{myOrders.length}</div>
                            <div className="text-xs text-gray-500">Orders</div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="font-bold text-sm text-[var(--text-muted)] mb-2">MY FAVORITES ❤️</h3>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {favorites && favorites.length > 0 ? (
                                favorites.map(fav => (
                                    <span key={fav} className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-medium border border-red-100">{fav}</span>
                                ))
                            ) : <span className="text-xs text-gray-400">No favorites yet</span>}
                        </div>
                    </div>
                </div>
            </div>

            {/* Order History */}
            <div className="md:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-[var(--brand-dark)] flex items-center gap-2"><span>📜</span> Order History</h2>
                    <div className="bg-white p-1 rounded-xl border border-gray-200 flex gap-1">
                        <button
                            onClick={() => setOrderTab('active')}
                            className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${orderTab === 'active' ? 'bg-[var(--brand-primary)] text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            Active ({activeOrders.length})
                        </button>
                        <button
                            onClick={() => setOrderTab('past')}
                            className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${orderTab === 'past' ? 'bg-gray-800 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            Past ({pastOrders.length})
                        </button>
                    </div>
                </div>

                {(orderTab === 'active' ? activeOrders : pastOrders).length === 0 ? (
                    <div className="glass-card p-12 rounded-2xl text-center text-[var(--text-muted)] flex flex-col items-center justify-center min-h-[300px]">
                        <div className="text-6xl mb-4 opacity-50">{orderTab === 'active' ? '🍳' : '🕰️'}</div>
                        <h3 className="text-xl font-bold text-[var(--brand-dark)] mb-2">No {orderTab} orders</h3>
                        <p className="text-sm text-gray-500 mb-6">
                            {orderTab === 'active' ? "You don't have any orders in progress." : "You haven't placed any orders yet."}
                        </p>
                        <Link href="/#menu" className="btn btn-primary btn-glow">Start Ordering</Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {(orderTab === 'active' ? activeOrders : pastOrders).map((order: any) => (
                            <div key={order.id} className="glass-card p-0 rounded-2xl hover:shadow-lg transition-all overflow-hidden border border-gray-100 group">
                                {/* Order Header */}
                                <div className="p-6 border-b bg-gray-50/50 flex justify-between items-start">
                                    <div className="flex gap-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${order.type === 'Delivery' ? 'bg-blue-100 text-blue-600' : order.type === 'Takeaway' ? 'bg-orange-100 text-orange-600' : 'bg-purple-100 text-purple-600'}`}>
                                            {order.type === 'Delivery' ? '🛵' : order.type === 'Takeaway' ? '🛍️' : '🍽️'}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <span className="font-bold text-lg text-[var(--brand-dark)]">Order #{order.id}</span>
                                                <span className="text-xs font-bold text-gray-500 bg-white px-2 py-1 rounded border shadow-sm">{new Date(order.createdAt).toLocaleTimeString()}</span>
                                            </div>
                                            <div className="text-sm text-[var(--text-muted)] font-medium">{order.items.length} Items • {order.type}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-xl text-[var(--brand-primary)]">₹{order.total}</div>
                                        {orderTab === 'past' && (
                                            <button onClick={() => downloadInvoice(order)} className="text-xs text-blue-600 hover:underline mt-1 flex items-center justify-end gap-1 font-bold">
                                                📄 Invoice
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Order Body */}
                                <div className="p-6 bg-white">
                                    {/* Timeline for Active Orders */}
                                    {orderTab === 'active' && (
                                        <div className="mb-8 mt-2">
                                            <div className="relative flex justify-between items-center">
                                                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -z-10 rounded-full"></div>
                                                <div className={`absolute top-1/2 left-0 h-1 bg-[var(--brand-primary)] -z-10 rounded-full transition-all duration-1000`} style={{ width: order.status === 'Pending' ? '15%' : order.status === 'Cooking' ? '50%' : '85%' }}></div>

                                                {['Pending', 'Cooking', 'Ready', 'Completed'].map((step, idx) => {
                                                    const status = getStepStatus(order.status, step);
                                                    const isActive = status === 'current';
                                                    const isCompleted = status === 'completed';

                                                    return (
                                                        <div key={step} className="flex flex-col items-center gap-2 bg-white px-2 relative">
                                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${isCompleted ? 'bg-green-500 text-white scale-110' : isActive ? 'bg-[var(--brand-primary)] text-white shadow-lg shadow-orange-200 scale-125 ring-4 ring-orange-50' : 'bg-gray-100 text-gray-300'}`}>
                                                                {isCompleted ? '✓' : idx + 1}
                                                            </div>
                                                            <div className={`text-xs font-bold transition-colors ${isActive ? 'text-[var(--brand-primary)]' : isCompleted ? 'text-green-600' : 'text-gray-400'}`}>{step}</div>
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            {/* Live Status Message */}
                                            <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                                                <p className="text-sm text-blue-800 font-medium">
                                                    {order.status === 'Pending' && "We've received your order! The kitchen will start soon."}
                                                    {order.status === 'Cooking' && "Your food is being prepared with love! 👨‍🍳"}
                                                    {order.status === 'Ready' && "Your order is ready! Please collect it from the counter."}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Items List */}
                                    <div className="bg-gray-50 rounded-xl p-4 mt-4 border border-gray-100">
                                        <div className="space-y-3 mb-4 border-b border-gray-200 pb-4">
                                            {order.items.map((item: string, idx: number) => (
                                                <div key={idx} className="flex items-center justify-between text-sm text-[var(--text-main)]">
                                                    <div className="flex items-center gap-3">
                                                        <span className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-500 shadow-sm">
                                                            {item.match(/\((\d+)\)/)?.[1] || 1}x
                                                        </span>
                                                        <span className="font-medium">{item.replace(/\s*\(\d+\)$/, '')}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between text-[var(--text-muted)]"><span>Subtotal</span><span>₹{Math.round(order.total / 1.05)}</span></div>
                                            <div className="flex justify-between text-[var(--text-muted)]"><span>Tax (5%)</span><span>₹{order.total - Math.round(order.total / 1.05)}</span></div>
                                            <div className="flex justify-between font-bold text-[var(--brand-dark)] pt-2 border-t mt-2 text-base"><span>Grand Total</span><span>₹{order.total}</span></div>
                                        </div>

                                        {/* Actions */}
                                        <div className="mt-6 pt-4 border-t flex justify-end gap-3">
                                            {orderTab === 'active' ? (
                                                <button className="btn bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 btn-sm py-2 px-4 rounded-lg shadow-sm font-bold">
                                                    💬 Chat Support
                                                </button>
                                            ) : (
                                                <button onClick={() => handleReorder(order)} className="btn btn-primary btn-sm py-2 px-6 rounded-lg shadow-lg shadow-orange-200 flex items-center gap-2 transform hover:scale-105 transition-transform">
                                                    <span>🔄</span> Order Again
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

    const renderPersonalization = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 animate-in">
            <div className="glass-card p-5 md:p-6 rounded-2xl">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">📍 Manage Addresses</h3>
                <div className="space-y-4">
                    {user.addresses?.map((addr: any, i: number) => (
                        <div key={i} className="p-4 border rounded-xl flex justify-between items-center bg-gray-50/50">
                            <div className="flex-1 min-w-0 pr-4">
                                <div className="font-bold text-sm truncate">{addr.label} {addr.isDefault && <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded ml-2 font-black uppercase">Default</span>}</div>
                                <div className="text-xs text-gray-500 truncate">{addr.text}</div>
                            </div>
                            <button onClick={() => removeAddress(addr.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">🗑️</button>
                        </div>
                    ))}

                    {isAddingAddress ? (
                        <div className="p-4 border rounded-2xl bg-gray-50 space-y-3">
                            <input
                                type="text"
                                placeholder="Label (e.g., Home)"
                                className="w-full p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
                                value={newAddress.label}
                                onChange={e => setNewAddress({ ...newAddress, label: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Address Text"
                                className="w-full p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
                                value={newAddress.text}
                                onChange={e => setNewAddress({ ...newAddress, text: e.target.value })}
                            />
                            <div className="flex gap-2">
                                <button onClick={addAddress} className="btn btn-primary btn-sm flex-1 py-2.5">Save</button>
                                <button onClick={() => setIsAddingAddress(false)} className="btn btn-outline btn-sm flex-1 py-2.5">Cancel</button>
                            </div>
                        </div>
                    ) : (
                        <button onClick={() => setIsAddingAddress(true)} className="w-full py-4 border-2 border-dashed border-gray-300 rounded-2xl text-gray-500 hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] transition-all font-bold text-sm">+ Add New Address</button>
                    )}
                </div>
            </div>

            <div className="glass-card p-5 md:p-6 rounded-2xl">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">⚙️ Preferences</h3>
                <div className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Dietary Preferences</label>
                        <div className="flex flex-wrap gap-2">
                            {['Veg', 'Vegan', 'Jain', 'Spicy'].map(opt => (
                                <button
                                    key={opt}
                                    onClick={() => toggleDietary(opt)}
                                    className={`px-4 py-2 rounded-full text-sm font-bold border transition-all ${user.preferences?.dietary.includes(opt) ? 'bg-green-500 border-green-500 text-white shadow-lg shadow-green-100' : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'}`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Language</label>
                        <select
                            className="w-full p-3 border border-gray-200 rounded-xl bg-white outline-none focus:ring-2 focus:ring-[var(--brand-primary)] text-sm font-medium"
                            value={user.preferences?.language || 'en'}
                            onChange={(e) => updateLanguage(e.target.value)}
                        >
                            <option value="en">English</option>
                            <option value="hi">Hindi</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="glass-card p-5 md:p-6 rounded-2xl">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">💳 Payments</h3>
                <div className="space-y-3">
                    <div className="p-4 border rounded-xl flex items-center gap-4 bg-gray-50/50">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-xl shadow-sm">💳</div>
                        <div className="flex-1">
                            <div className="font-bold text-sm">Visa •••• 4242</div>
                            <div className="text-[10px] text-gray-500 font-bold">EXPIRES 12/25</div>
                        </div>
                        <span className="text-[10px] bg-gray-200 px-2 py-0.5 rounded font-black uppercase text-gray-600">Default</span>
                    </div>
                    <button className="w-full py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-[var(--brand-primary)] hover:bg-gray-50 transition-colors">+ Add New Card</button>
                </div>
            </div>

            <div className="glass-card p-5 md:p-6 rounded-2xl">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">📅 Important Dates</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">Birthday</label>
                        <input
                            type="date"
                            className="w-full p-3 border border-gray-200 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
                            value={user.dates?.birthday || ''}
                            onChange={(e) => updateDate('birthday', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">Anniversary</label>
                        <input
                            type="date"
                            className="w-full p-3 border border-gray-200 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
                            value={user.dates?.anniversary || ''}
                            onChange={(e) => updateDate('anniversary', e.target.value)}
                        />
                    </div>
                </div>
                <p className="text-[10px] text-gray-400 mt-4 leading-relaxed font-medium">We'll send you a special treat on these days! 🎁</p>
            </div>
        </div>
    );

    const renderLoyalty = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 animate-in">
            <div className="glass-card p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-900 to-purple-800 text-white md:col-span-2 shadow-xl shadow-purple-100 relative overflow-hidden">
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none text-9xl">🏆</div>

                <div className="flex flex-col sm:flex-row justify-between items-start gap-6 relative z-10">
                    <div>
                        <div className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-2">Total Points Balance</div>
                        <div className="text-6xl font-black mb-6 drop-shadow-md">{user.loyalty?.points || 0}</div>
                        <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full text-sm font-bold backdrop-blur-md border border-white/20">
                            <span className="animate-pulse text-yellow-400">🏆</span> {user.loyalty?.tier || 'Bronze'} Member
                        </div>
                    </div>
                    <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10 w-full sm:w-auto text-center sm:text-right">
                        <div className="text-indigo-200 text-[10px] font-bold uppercase mb-1">Current Streak</div>
                        <div className="text-3xl font-black flex items-center justify-center sm:justify-end gap-2">
                            <span>🔥</span> {user.loyalty?.streak || 0} Days
                        </div>
                    </div>
                </div>
                <div className="mt-10 relative z-10">
                    <div className="flex justify-between text-xs font-bold text-indigo-100 mb-3">
                        <span>PROGRESS TO SILVER</span>
                        <span className="font-mono">350 / 1000 PTS</span>
                    </div>
                    <div className="w-full bg-black/30 h-3 rounded-full overflow-hidden border border-white/10">
                        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 h-full w-[35%] shadow-[0_0_15px_rgba(250,204,21,0.5)]"></div>
                    </div>
                </div>
            </div>

            <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">🤝 Referral Program</h3>
                <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 text-center">
                    <p className="text-xs sm:text-sm text-blue-800 font-bold mb-4 uppercase tracking-tighter">Share code & earn 100 points!</p>
                    <div className="text-3xl font-mono font-black text-blue-600 tracking-[0.2em] mb-4 bg-white p-4 rounded-2xl border border-dashed border-blue-300 shadow-sm">
                        {user.referralCode || 'OYE123'}
                    </div>
                    <button className="text-xs text-blue-600 font-black hover:underline uppercase tracking-widest">📋 Copy Code</button>
                </div>
            </div>

            <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">🏅 Badges</h3>
                <div className="grid grid-cols-4 gap-3">
                    {['🍕', '🥗', '🔥', '⭐'].map((emoji, i) => (
                        <div key={i} className="aspect-square bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center text-3xl grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all cursor-help hover:scale-110 active:scale-95" title="Locked Badge">
                            {emoji}
                        </div>
                    ))}
                </div>
                <p className="text-[10px] text-gray-400 text-center mt-4 font-bold uppercase tracking-widest">Order more to unlock badges!</p>
            </div>
        </div>
    );

    const renderUtility = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 animate-in pb-12">
            <div className="glass-card p-5 md:p-6 rounded-2xl">
                <h3 className="text-lg font-bold mb-4">📊 Feeding Your Cravings</h3>
                <div className="space-y-4">
                    {[{ l: 'Pizza', v: '60%' }, { l: 'Chaat', v: '30%' }, { l: 'Pasta', v: '10%' }].map(stat => (
                        <div key={stat.l}>
                            <div className="flex justify-between text-xs font-bold mb-2">
                                <span className="text-gray-600 uppercase tracking-wider">{stat.l}</span>
                                <span className="text-[var(--brand-primary)]">{stat.v}</span>
                            </div>
                            <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden border border-gray-50">
                                <div
                                    className="bg-gradient-to-r from-[var(--brand-primary)] to-orange-400 h-full rounded-full transition-all duration-1000"
                                    style={{ width: stat.v }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="glass-card p-5 md:p-6 rounded-2xl">
                <h3 className="text-lg font-bold mb-4">🔔 Notification Center</h3>
                <div className="space-y-3 max-h-[250px] overflow-y-auto no-scrollbar pr-1">
                    <div className="flex gap-4 items-start p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                        <span className="text-2xl bg-white w-10 h-10 rounded-xl flex items-center justify-center shadow-sm">🎉</span>
                        <div>
                            <div className="text-sm font-black text-blue-900 mb-1">Welcome Bonus</div>
                            <div className="text-[10px] text-blue-700 font-bold uppercase tracking-tight">You earned 50 points for joining!</div>
                        </div>
                    </div>
                    <div className="flex gap-4 items-start p-4 bg-gray-50/50 rounded-2xl border border-gray-100 opacity-60">
                        <span className="text-2xl bg-white w-10 h-10 rounded-xl flex items-center justify-center shadow-sm">📦</span>
                        <div>
                            <div className="text-sm font-black text-gray-800 mb-1">Order Delivered</div>
                            <div className="text-[10px] text-gray-600 font-bold uppercase tracking-tight">Your order #123 was delivered.</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="glass-card p-5 md:p-8 rounded-3xl md:col-span-2 bg-[var(--brand-dark)] text-white shadow-xl shadow-gray-200">
                <h3 className="text-xl font-black mb-6 flex items-center gap-3"><span>💬</span> Help & Support</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 py-4 bg-green-500 text-white rounded-2xl font-black shadow-lg shadow-green-900/20 hover:opacity-90 transition-all flex items-center justify-center gap-3 active:scale-95">
                        <span className="text-xl">💬</span> WhatsApp Chat
                    </button>
                    <button className="flex-1 py-4 bg-white/10 text-white rounded-2xl font-black border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center gap-3 active:scale-95">
                        <span className="text-xl">📧</span> Email Support
                    </button>
                </div>
                <div className="mt-8 pt-8 border-t border-white/10 text-center">
                    <button className="text-red-400 text-xs font-bold uppercase tracking-widest hover:text-red-300 transition-colors">
                        Delete My Account
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[var(--bg-light)] p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 animate-in">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-[var(--brand-dark)]">My Profile</h1>
                        <p className="text-sm md:text-base text-[var(--text-muted)]">Welcome back, {user.name.split(' ')[0]}!</p>
                    </div>
                    <div className="flex gap-3 w-full sm:w-auto">
                        <Link href="/" className="flex-1 sm:flex-none btn btn-outline py-2.5 text-sm">← Home</Link>
                        <button onClick={() => { signOut({ callbackUrl: '/' }); }} className="flex-1 sm:flex-none btn bg-red-50 text-red-600 hover:bg-red-100 py-2.5 text-sm">Logout</button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex overflow-x-auto gap-2 mb-8 pb-3 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
                    {['overview', 'personalization', 'loyalty', 'utility'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all text-sm ${activeTab === tab
                                ? 'bg-[var(--brand-dark)] text-white shadow-lg scale-105'
                                : 'bg-white text-gray-500 hover:bg-gray-50 border border-transparent hover:border-gray-200'
                                }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Content */}
                {activeTab === 'overview' && renderOverview()}
                {activeTab === 'personalization' && renderPersonalization()}
                {activeTab === 'loyalty' && renderLoyalty()}
                {activeTab === 'utility' && renderUtility()}
            </div>
        </div>
    );
}
