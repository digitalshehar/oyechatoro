'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth, useOrders, useCart, useFavorites } from '../lib/storage';

export default function ProfilePage() {
    const { user, logout, updateUser } = useAuth();
    const { orders } = useOrders();
    const router = useRouter();
    const { addToCart } = useCart();
    const { favorites } = useFavorites();
    const [activeTab, setActiveTab] = useState('overview');
    const [orderTab, setOrderTab] = useState<'active' | 'past'>('active');

    // State for inputs
    const [newAddress, setNewAddress] = useState({ label: '', text: '' });
    const [isAddingAddress, setIsAddingAddress] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!user && typeof window !== 'undefined' && !localStorage.getItem('oye_chatoro_current_user')) {
                router.push('/login');
            }
        }, 100);
        return () => clearTimeout(timer);
    }, [user, router]);

    if (!user) return null;

    const myOrders = orders.filter(o => o.userId === user.id || o.customer === user.name).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

    const activeOrders = myOrders.filter(o => ['Pending', 'Cooking', 'Ready'].includes(o.status));
    const pastOrders = myOrders.filter(o => ['Completed', 'Cancelled'].includes(o.status));

    // --- Feature Helpers ---
    const triggerConfetti = () => { /* Confetti logic */ };

    const handleReorder = (order: any) => {
        // Robust parsing: "Item Name (Qty)" or just "Item Name"
        order.items.forEach((itemStr: string) => {
            let name = itemStr;
            let quantity = 1;

            const match = itemStr.match(/(.*) \((\d+)\)/);
            if (match) {
                name = match[1];
                quantity = parseInt(match[2]);
            }

            // In a real app, we'd look up the price. Here we default to 0 or try to parse if available.
            addToCart({ name, price: 0, quantity });
        });
        router.push('/');
    };

    const downloadInvoice = (order: any) => {
        const element = document.createElement("a");
        const file = new Blob([`INVOICE #ORD-${order.id}\nDate: ${order.time}\nTotal: ₹${order.total}`], { type: 'text/plain' });
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
        const addresses = user.addresses?.filter(a => a.id !== id) || [];
        updateUser({ addresses });
    };

    const toggleDietary = (pref: string) => {
        const current = user.preferences?.dietary || [];
        const updated = current.includes(pref) ? current.filter(p => p !== pref) : [...current, pref];
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
                        {(orderTab === 'active' ? activeOrders : pastOrders).map(order => (
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
                                                <span className="text-xs font-bold text-gray-500 bg-white px-2 py-1 rounded border shadow-sm">{order.time}</span>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in">
            <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">📍 Manage Addresses</h3>
                <div className="space-y-4">
                    {user.addresses?.map((addr, i) => (
                        <div key={i} className="p-4 border rounded-xl flex justify-between items-center bg-gray-50">
                            <div>
                                <div className="font-bold text-sm">{addr.label} {addr.isDefault && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded ml-2">Default</span>}</div>
                                <div className="text-xs text-gray-500">{addr.text}</div>
                            </div>
                            <button onClick={() => removeAddress(addr.id)} className="text-red-500 hover:text-red-700">🗑️</button>
                        </div>
                    ))}

                    {isAddingAddress ? (
                        <div className="p-4 border rounded-xl bg-gray-50 space-y-2">
                            <input
                                type="text"
                                placeholder="Label (e.g., Home)"
                                className="w-full p-2 border rounded text-sm"
                                value={newAddress.label}
                                onChange={e => setNewAddress({ ...newAddress, label: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Address Text"
                                className="w-full p-2 border rounded text-sm"
                                value={newAddress.text}
                                onChange={e => setNewAddress({ ...newAddress, text: e.target.value })}
                            />
                            <div className="flex gap-2">
                                <button onClick={addAddress} className="btn btn-primary btn-sm flex-1">Save</button>
                                <button onClick={() => setIsAddingAddress(false)} className="btn btn-outline btn-sm flex-1">Cancel</button>
                            </div>
                        </div>
                    ) : (
                        <button onClick={() => setIsAddingAddress(true)} className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] transition-colors">+ Add New Address</button>
                    )}
                </div>
            </div>

            <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">⚙️ Preferences</h3>
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Preferences</label>
                        <div className="flex gap-2">
                            {['Veg', 'Vegan', 'Jain', 'Spicy'].map(opt => (
                                <button
                                    key={opt}
                                    onClick={() => toggleDietary(opt)}
                                    className={`px-3 py-1 rounded-full text-sm border transition-colors ${user.preferences?.dietary.includes(opt) ? 'bg-green-50 border-green-500 text-green-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                        <select
                            className="w-full p-2 border rounded-lg bg-white"
                            value={user.preferences?.language || 'en'}
                            onChange={(e) => updateLanguage(e.target.value)}
                        >
                            <option value="en">English</option>
                            <option value="hi">Hindi</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">💳 Payment Methods</h3>
                <div className="space-y-3">
                    <div className="p-3 border rounded-lg flex items-center gap-3 bg-gray-50">
                        <span className="text-xl">💳</span>
                        <div className="flex-1">
                            <div className="font-medium text-sm">Visa ending in 4242</div>
                            <div className="text-xs text-gray-500">Expires 12/25</div>
                        </div>
                        <span className="text-xs bg-gray-200 px-2 py-1 rounded">Default</span>
                    </div>
                    <button className="text-sm text-[var(--brand-primary)] font-medium">+ Add Card</button>
                </div>
            </div>

            <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">📅 Important Dates</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Birthday</label>
                        <input
                            type="date"
                            className="w-full p-2 border rounded-lg text-sm"
                            value={user.dates?.birthday || ''}
                            onChange={(e) => updateDate('birthday', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Anniversary</label>
                        <input
                            type="date"
                            className="w-full p-2 border rounded-lg text-sm"
                            value={user.dates?.anniversary || ''}
                            onChange={(e) => updateDate('anniversary', e.target.value)}
                        />
                    </div>
                </div>
                <p className="text-xs text-gray-400 mt-2">We'll send you a special treat on these days! 🎁</p>
            </div>
        </div>
    );

    const renderLoyalty = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in">
            <div className="glass-card p-8 rounded-2xl bg-gradient-to-br from-indigo-900 to-purple-800 text-white md:col-span-2">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="text-indigo-200 text-sm font-medium mb-1">TOTAL POINTS</div>
                        <div className="text-5xl font-bold mb-4">{user.loyalty?.points || 0}</div>
                        <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                            🏆 {user.loyalty?.tier || 'Bronze'} Member
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-indigo-200 text-sm mb-1">Current Streak</div>
                        <div className="text-3xl font-bold">🔥 {user.loyalty?.streak || 0} Days</div>
                    </div>
                </div>
                <div className="mt-8">
                    <div className="flex justify-between text-xs text-indigo-200 mb-2">
                        <span>Progress to Silver</span>
                        <span>350 / 1000 Points</span>
                    </div>
                    <div className="w-full bg-black/20 h-2 rounded-full overflow-hidden">
                        <div className="bg-yellow-400 h-full w-[35%]"></div>
                    </div>
                </div>
            </div>

            <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-lg font-bold mb-4">🤝 Referral Program</h3>
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-center">
                    <p className="text-sm text-blue-800 mb-2">Share your code and earn 100 points!</p>
                    <div className="text-2xl font-mono font-bold text-blue-600 tracking-widest my-2 bg-white p-2 rounded border border-dashed border-blue-300">
                        {user.referralCode || 'OYE123'}
                    </div>
                    <button className="text-xs text-blue-600 font-medium hover:underline">Copy Code</button>
                </div>
            </div>

            <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-lg font-bold mb-4">🏅 Badges</h3>
                <div className="grid grid-cols-4 gap-2">
                    {['🍕', '🥗', '🔥', '⭐'].map((emoji, i) => (
                        <div key={i} className="aspect-square bg-gray-50 rounded-xl flex items-center justify-center text-2xl grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-help" title="Locked Badge">
                            {emoji}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderUtility = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in">
            <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-lg font-bold mb-4">📊 What You Eat Most</h3>
                <div className="space-y-3">
                    {[{ l: 'Pizza', v: '60%' }, { l: 'Chaat', v: '30%' }, { l: 'Pasta', v: '10%' }].map(stat => (
                        <div key={stat.l}>
                            <div className="flex justify-between text-sm mb-1">
                                <span>{stat.l}</span>
                                <span>{stat.v}</span>
                            </div>
                            <div className="w-full bg-gray-100 h-2 rounded-full">
                                <div className="bg-[var(--brand-primary)] h-full rounded-full" style={{ width: stat.v }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-lg font-bold mb-4">🔔 Notification Center</h3>
                <div className="space-y-4 max-h-[200px] overflow-y-auto">
                    <div className="flex gap-3 items-start p-3 bg-blue-50 rounded-lg">
                        <span className="text-lg">🎉</span>
                        <div>
                            <div className="text-sm font-bold text-blue-900">Welcome Bonus</div>
                            <div className="text-xs text-blue-700">You earned 50 points for joining!</div>
                        </div>
                    </div>
                    <div className="flex gap-3 items-start p-3 bg-gray-50 rounded-lg opacity-60">
                        <span className="text-lg">📦</span>
                        <div>
                            <div className="text-sm font-bold">Order Delivered</div>
                            <div className="text-xs text-gray-600">Your order #123 has been delivered.</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="glass-card p-6 rounded-2xl md:col-span-2">
                <h3 className="text-lg font-bold mb-4">💬 Help & Support</h3>
                <div className="flex gap-4">
                    <button className="flex-1 py-3 bg-green-50 text-green-700 rounded-xl font-medium border border-green-100 hover:bg-green-100">Chat on WhatsApp</button>
                    <button className="flex-1 py-3 bg-gray-50 text-gray-700 rounded-xl font-medium border border-gray-200 hover:bg-gray-100">Email Support</button>
                </div>
            </div>

            <div className="md:col-span-2 text-center">
                <button className="text-red-500 text-sm hover:underline">Delete Account</button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[var(--bg-light)] p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-[var(--brand-dark)]">My Profile</h1>
                        <p className="text-[var(--text-muted)]">Welcome back, {user.name.split(' ')[0]}!</p>
                    </div>
                    <div className="flex gap-4">
                        <Link href="/" className="btn btn-outline">← Home</Link>
                        <button onClick={() => { logout(); router.push('/'); }} className="btn bg-red-50 text-red-600 hover:bg-red-100">Logout</button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex overflow-x-auto gap-2 mb-8 pb-2 no-scrollbar">
                    {['overview', 'personalization', 'loyalty', 'utility'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all ${activeTab === tab
                                ? 'bg-[var(--brand-dark)] text-white shadow-lg scale-105'
                                : 'bg-white text-gray-500 hover:bg-gray-50'
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
