'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';

interface MenuItem {
    id: string;
    name: string;
    price: number;
    description?: string;
    veg: boolean;
    image?: string;
    categoryId: string;
    status?: string;
}

interface MenuCategory {
    id: string;
    name: string;
}

interface CartItem extends MenuItem {
    quantity: number;
}

export default function KioskPage() {
    const [items, setItems] = useState<MenuItem[]>([]);
    const [categories, setCategories] = useState<MenuCategory[]>([]);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [showCart, setShowCart] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [customerName, setCustomerName] = useState('');
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [orderNumber, setOrderNumber] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch menu data
    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const [itemsRes, catsRes] = await Promise.all([
                    fetch('/api/menu'),
                    fetch('/api/menu/categories')
                ]);
                if (itemsRes.ok && catsRes.ok) {
                    const itemsData = await itemsRes.json();
                    const catsData = await catsRes.json();
                    setItems(itemsData.filter((i: MenuItem) => i.status === 'Active'));
                    setCategories(catsData);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchMenu();
    }, []);

    const filteredItems = useMemo(() => {
        const base = activeCategory === 'all' ? items : items.filter(item => item.categoryId === activeCategory);
        return [...base].sort((a, b) => a.price - b.price);
    }, [items, activeCategory]);

    const cartTotal = useMemo(() =>
        cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);

    const cartCount = useMemo(() =>
        cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

    const addToCart = useCallback((item: MenuItem) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) {
                return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    }, []);

    const removeFromCart = useCallback((itemId: string) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === itemId);
            if (existing && existing.quantity > 1) {
                return prev.map(i => i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i);
            }
            return prev.filter(i => i.id !== itemId);
        });
    }, []);

    const placeOrder = async () => {
        try {
            const orderData = {
                items: cart.map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price
                })),
                total: Math.round(cartTotal * 1.05), // Include 5% GST
                type: 'Takeaway',
                customer: customerName || 'Kiosk Customer',
                paymentMethod: 'UPI',
                paymentStatus: 'Paid'
            };

            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });

            if (res.ok) {
                const order = await res.json();
                setOrderNumber(order.id);
                setOrderPlaced(true);
                setShowPayment(false);

                // Reset after delay
                setTimeout(() => {
                    setCart([]);
                    setCustomerName('');
                    setOrderPlaced(false);
                    setOrderNumber(null);
                }, 10000);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const getItemQty = (itemId: string) => cart.find(i => i.id === itemId)?.quantity || 0;

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                <div className="text-white text-2xl animate-pulse">Loading Menu...</div>
            </div>
        );
    }

    // Order Success Screen
    if (orderPlaced) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center p-8">
                <div className="bg-white rounded-3xl p-12 text-center max-w-md shadow-2xl animate-in">
                    <div className="text-8xl mb-6">✅</div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Order Placed!</h1>
                    <div className="text-6xl font-bold text-green-600 mb-4">#{orderNumber}</div>
                    <p className="text-xl text-gray-600 mb-8">
                        Please wait for your order to be called
                    </p>
                    <div className="text-sm text-gray-400">
                        Screen will reset in a moment...
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Header */}
            <header className="bg-gradient-to-r from-orange-500 to-red-500 p-4 shadow-lg">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center gap-3">
                        <span className="text-4xl">🍔</span>
                        <div>
                            <h1 className="text-2xl font-bold text-white">Oye Chatoro</h1>
                            <p className="text-white/80 text-sm">Touch to Order</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowCart(true)}
                        className="relative bg-white/20 hover:bg-white/30 p-4 rounded-2xl transition-all"
                    >
                        <span className="text-3xl">🛒</span>
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </header>

            {/* Categories */}
            <div className="bg-white shadow-md sticky top-0 z-10">
                <div className="flex gap-2 p-4 overflow-x-auto max-w-7xl mx-auto">
                    <button
                        onClick={() => setActiveCategory('all')}
                        className={`px-6 py-3 rounded-full font-bold text-lg whitespace-nowrap transition-all ${activeCategory === 'all'
                            ? 'bg-orange-500 text-white shadow-lg scale-105'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        🍽️ All Items
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-6 py-3 rounded-full font-bold text-lg whitespace-nowrap transition-all ${activeCategory === cat.id
                                ? 'bg-orange-500 text-white shadow-lg scale-105'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Menu Grid */}
            <main className="flex-1 p-4 max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredItems.map(item => {
                        const qty = getItemQty(item.id);
                        return (
                            <div
                                key={item.id}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-all"
                            >
                                {/* Image */}
                                <div className="relative h-40 bg-gradient-to-br from-orange-100 to-orange-50">
                                    {item.image ? (
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-6xl">
                                            🥗
                                        </div>
                                    )}
                                    {/* Veg indicator (Always Veg) */}
                                    <div className="absolute top-2 left-2 w-6 h-6 rounded border-2 flex items-center justify-center border-green-600 bg-white">
                                        <div className="w-3 h-3 rounded-full bg-green-600" />
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="p-4">
                                    <h3 className="font-bold text-lg text-gray-800 mb-1 line-clamp-1">{item.name}</h3>
                                    <p className="text-2xl font-bold text-orange-600 mb-3">₹{item.price}</p>

                                    {/* Add/Remove Buttons */}
                                    {qty === 0 ? (
                                        <button
                                            onClick={() => addToCart(item)}
                                            className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl text-lg transition-all active:scale-95"
                                        >
                                            ADD +
                                        </button>
                                    ) : (
                                        <div className="flex items-center justify-between bg-orange-500 rounded-xl overflow-hidden">
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="px-5 py-3 text-white text-2xl font-bold hover:bg-orange-600 transition-all"
                                            >
                                                −
                                            </button>
                                            <span className="text-white text-xl font-bold">{qty}</span>
                                            <button
                                                onClick={() => addToCart(item)}
                                                className="px-5 py-3 text-white text-2xl font-bold hover:bg-orange-600 transition-all"
                                            >
                                                +
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>

            {/* Fixed Bottom Bar */}
            {cartCount > 0 && !showCart && (
                <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t p-4">
                    <button
                        onClick={() => setShowCart(true)}
                        className="w-full max-w-xl mx-auto flex items-center justify-between bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-2xl font-bold text-lg"
                    >
                        <span>{cartCount} items in cart</span>
                        <span className="flex items-center gap-2">
                            ₹{cartTotal} <span className="text-2xl">→</span>
                        </span>
                    </button>
                </div>
            )}

            {/* Cart Modal */}
            {showCart && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center">
                    <div className="bg-white w-full max-w-2xl rounded-t-3xl max-h-[90vh] flex flex-col animate-in slide-in-from-bottom">
                        {/* Cart Header */}
                        <div className="p-4 border-b flex items-center justify-between">
                            <h2 className="text-2xl font-bold">Your Order</h2>
                            <button
                                onClick={() => setShowCart(false)}
                                className="text-3xl text-gray-400 hover:text-gray-600"
                            >
                                ×
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {cart.map(item => (
                                <div key={item.id} className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
                                    <div className="flex-1">
                                        <div className="font-bold text-lg">{item.name}</div>
                                        <div className="text-orange-600 font-semibold">₹{item.price} each</div>
                                    </div>
                                    <div className="flex items-center gap-3 bg-white rounded-xl border">
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="px-4 py-2 text-xl font-bold text-orange-600"
                                        >
                                            −
                                        </button>
                                        <span className="text-xl font-bold w-8 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => addToCart(item)}
                                            className="px-4 py-2 text-xl font-bold text-orange-600"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div className="text-xl font-bold w-20 text-right">
                                        ₹{item.price * item.quantity}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Cart Footer */}
                        <div className="p-4 border-t bg-gray-50">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="font-semibold">₹{cartTotal}</span>
                            </div>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-600">GST (5%)</span>
                                <span className="font-semibold">₹{Math.round(cartTotal * 0.05)}</span>
                            </div>
                            <div className="flex justify-between items-center text-2xl font-bold mb-4">
                                <span>Total</span>
                                <span className="text-orange-600">₹{Math.round(cartTotal * 1.05)}</span>
                            </div>
                            <button
                                onClick={() => { setShowCart(false); setShowPayment(true); }}
                                className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-xl rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all"
                            >
                                Proceed to Pay →
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Payment Modal */}
            {showPayment && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-md rounded-3xl p-8 animate-in">
                        <h2 className="text-2xl font-bold text-center mb-6">Complete Payment</h2>

                        {/* Name Input */}
                        <input
                            type="text"
                            placeholder="Your Name (Optional)"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="w-full px-4 py-4 rounded-xl border-2 text-lg mb-6 focus:border-orange-500 outline-none"
                        />

                        {/* QR Code Placeholder */}
                        <div className="bg-gray-100 rounded-2xl p-8 text-center mb-6">
                            <div className="text-6xl mb-4">📱</div>
                            <p className="text-gray-600 mb-2">Scan to Pay</p>
                            <div className="bg-white p-4 rounded-xl inline-block">
                                <div className="w-48 h-48 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                                    <span className="text-gray-500">UPI QR</span>
                                </div>
                            </div>
                            <p className="text-2xl font-bold text-orange-600 mt-4">
                                ₹{Math.round(cartTotal * 1.05)}
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowPayment(false)}
                                className="flex-1 py-4 bg-gray-100 text-gray-600 font-bold rounded-xl text-lg"
                            >
                                Back
                            </button>
                            <button
                                onClick={placeOrder}
                                className="flex-1 py-4 bg-green-500 text-white font-bold rounded-xl text-lg hover:bg-green-600 transition-all"
                            >
                                Payment Done ✓
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
