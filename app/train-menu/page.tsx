'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { useMenu, MenuItem, createOrder } from '../lib/storage';
import { useRouter } from 'next/navigation';

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    veg: boolean;
}

export default function TrainMenuPage() {
    const router = useRouter();
    const { items } = useMenu();
    const [cart, setCart] = useState<CartItem[]>([]);
    const [pnr, setPnr] = useState('');
    const [trainNo, setTrainNo] = useState('');
    const [seatNo, setSeatNo] = useState('');
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState('All');

    // Filter only Train Menu items
    const trainItems = useMemo(() => {
        return items.filter(item => item.isTrainMenu === true && item.status === 'Active');
    }, [items]);

    const categories = useMemo(() => {
        const cats = new Set(trainItems.map(i => i.categoryId));
        // Map IDs to names if possible, but for now we might need to fetch categories too or just use IDs
        // Let's just use "All" and filter by type for simplicity in this specific view
        return ['All', 'Thali', 'Mains', 'Breads', 'Rice', 'Combos'];
    }, [trainItems]);

    const filteredItems = useMemo(() => {
        if (activeCategory === 'All') return trainItems;
        // Simple keyword matching for demo purposes since we didn't strictly map category IDs to these names yet
        return trainItems.filter(item => {
            const name = item.name.toLowerCase();
            const desc = item.description.toLowerCase();
            const cat = activeCategory.toLowerCase();
            return name.includes(cat) || desc.includes(cat) || (activeCategory === 'Thali' && name.includes('thali'));
        });
    }, [trainItems, activeCategory]);

    const addToCart = (item: MenuItem) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) {
                return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1, veg: item.veg }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (itemId: string) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === itemId);
            if (existing && existing.quantity > 1) {
                return prev.map(i => i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i);
            }
            return prev.filter(i => i.id !== itemId);
        });
    };

    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const checkout = () => {
        if (cart.length === 0) return;
        if (!pnr && !trainNo) {
            alert('Please enter PNR or Train Number');
            return;
        }

        // 1. Create Order in Dashboard
        const orderItems = cart.map(item => `${item.name} (${item.quantity})`);
        createOrder({
            customer: `Train Passenger (PNR: ${pnr})`,
            items: orderItems,
            total: cartTotal,
            type: 'Delivery',
            trainDetails: {
                pnr,
                trainNo,
                coachSeat: seatNo
            },
            paymentStatus: 'Unpaid',
            paymentMethod: 'Cash' // Default for now
        });

        // 2. Redirect to WhatsApp
        let message = `🚆 *TRAIN ORDER - ABU ROAD* 🚆\n\n`;
        message += `PNR: ${pnr || 'N/A'}\n`;
        message += `Train: ${trainNo || 'N/A'}\n`;
        message += `Seat: ${seatNo || 'N/A'}\n\n`;
        message += `*Order Details:*\n`;
        cart.forEach(item => {
            message += `- ${item.quantity}x ${item.name} - ₹${item.price * item.quantity}\n`;
        });
        message += `\n*Total to Pay: ₹${cartTotal}*`;

        const phone = '919509913792';
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');

        // Clear cart after successful order
        setCart([]);
        setIsCartOpen(false);
        alert('Order placed successfully! Redirecting to WhatsApp...');
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans pb-32">
            {/* Header */}
            <header className="bg-[#d32f2f] text-white p-4 shadow-md sticky top-0 z-50">
                <div className="max-w-md mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#d32f2f] font-bold text-xl">
                            🚆
                        </div>
                        <div>
                            <h1 className="font-bold text-lg leading-tight">Abu Road Food Delivery</h1>
                            <p className="text-xs opacity-90">Authorized IRCTC Partner</p>
                        </div>
                    </div>
                    <button onClick={() => router.push('/')} className="text-xs bg-white/20 px-3 py-1 rounded-full">
                        Home
                    </button>
                </div>
            </header>

            <main className="max-w-md mx-auto p-4">
                {/* Delivery Details Form */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
                    <h2 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <span className="text-[#d32f2f]">📍</span> Delivery Details
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                        <input
                            type="text"
                            placeholder="PNR Number"
                            value={pnr}
                            onChange={(e) => setPnr(e.target.value)}
                            className="p-2 border rounded-lg text-sm bg-gray-50 outline-none focus:border-[#d32f2f]"
                        />
                        <input
                            type="text"
                            placeholder="Train Number"
                            value={trainNo}
                            onChange={(e) => setTrainNo(e.target.value)}
                            className="p-2 border rounded-lg text-sm bg-gray-50 outline-none focus:border-[#d32f2f]"
                        />
                        <input
                            type="text"
                            placeholder="Coach/Seat (Optional)"
                            value={seatNo}
                            onChange={(e) => setSeatNo(e.target.value)}
                            className="col-span-2 p-2 border rounded-lg text-sm bg-gray-50 outline-none focus:border-[#d32f2f]"
                        />
                    </div>
                </div>

                {/* Categories */}
                <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar mb-2">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-1.5 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${activeCategory === cat
                                ? 'bg-[#d32f2f] text-white shadow-md'
                                : 'bg-white text-gray-600 border border-gray-200'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Menu Grid */}
                <div className="space-y-4">
                    {filteredItems.map(item => (
                        <div key={item.id} className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex gap-3">
                            <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0 relative overflow-hidden">
                                {item.image ? (
                                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-2xl">🍱</div>
                                )}
                                {item.isFeatured && (
                                    <span className="absolute top-0 left-0 bg-yellow-400 text-[10px] font-bold px-1.5 py-0.5 rounded-br-lg">
                                        BESTSELLER
                                    </span>
                                )}
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-gray-800 leading-tight">{item.name}</h3>
                                        <div className={`w-3 h-3 rounded-sm border flex items-center justify-center ${item.veg ? 'border-green-500' : 'border-red-500'}`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${item.veg ? 'bg-green-500' : 'bg-red-500'}`} />
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500 line-clamp-2 mt-1">{item.description}</p>
                                </div>
                                <div className="flex justify-between items-end mt-2">
                                    <span className="font-bold text-lg">₹{item.price}</span>
                                    <button
                                        onClick={() => addToCart(item)}
                                        className="bg-[#fff0f0] text-[#d32f2f] border border-[#d32f2f] px-4 py-1 rounded-lg text-xs font-bold uppercase hover:bg-[#d32f2f] hover:text-white transition-colors"
                                    >
                                        ADD +
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {filteredItems.length === 0 && (
                        <div className="text-center py-10 text-gray-400">
                            <p>No items found in this category.</p>
                        </div>
                    )}
                </div>
            </main>

            {/* Cart Sheet */}
            {cart.length > 0 && (
                <div className={`fixed bottom-0 left-0 right-0 bg-white shadow-[0_-5px_20px_rgba(0,0,0,0.1)] rounded-t-2xl z-50 transition-transform duration-300 ${isCartOpen ? 'translate-y-0' : 'translate-y-[calc(100%-80px)]'}`}>
                    {/* Handle bar */}
                    <div
                        className="w-full h-6 flex items-center justify-center cursor-pointer"
                        onClick={() => setIsCartOpen(!isCartOpen)}
                    >
                        <div className="w-12 h-1 bg-gray-300 rounded-full" />
                    </div>

                    <div className="p-4 pt-0">
                        <div className="flex justify-between items-center mb-4 cursor-pointer" onClick={() => setIsCartOpen(!isCartOpen)}>
                            <div>
                                <p className="text-xs text-gray-500 font-bold uppercase">Your Order</p>
                                <p className="text-lg font-bold">{cart.reduce((a, b) => a + b.quantity, 0)} Items | ₹{cartTotal}</p>
                            </div>
                            <button className="bg-[#d32f2f] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-red-200">
                                {isCartOpen ? 'View Details' : 'View Cart'}
                            </button>
                        </div>

                        {isCartOpen && (
                            <div className="space-y-4 max-h-[50vh] overflow-y-auto pb-4">
                                {cart.map(item => (
                                    <div key={item.id} className="flex justify-between items-center border-b border-gray-50 pb-3">
                                        <div>
                                            <p className="font-medium text-sm">{item.name}</p>
                                            <p className="text-xs text-gray-500">₹{item.price} x {item.quantity}</p>
                                        </div>
                                        <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                                            <button onClick={() => removeFromCart(item.id)} className="w-6 h-6 flex items-center justify-center font-bold text-gray-600">-</button>
                                            <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                            <button onClick={() => addToCart(item as any)} className="w-6 h-6 flex items-center justify-center font-bold text-green-600">+</button>
                                        </div>
                                    </div>
                                ))}

                                <button
                                    onClick={checkout}
                                    className="w-full bg-[#25D366] text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 mt-4 shadow-lg shadow-green-100"
                                >
                                    <span>Confirm via WhatsApp</span>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
