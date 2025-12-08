'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useMenu, useSettings, MenuItem, addServiceRequest } from '../lib/storage';
import { useRouter } from 'next/navigation';

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    veg: boolean;
}

export default function MenuPage() {
    const router = useRouter();
    const { categories, items } = useMenu();
    const { settings } = useSettings();
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [mounted, setMounted] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const [tableNumber, setTableNumber] = useState<string | null>(null);
    const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        setMounted(true);
        if (categories.length > 0) {
            setActiveSection(categories[0].id);
        }

        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const table = params.get('table');
            if (table) setTableNumber(table);

            const handleScroll = () => setScrolled(window.scrollY > 50);
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, [categories]);

    const digitalMenuItems = useMemo(() => {
        return items.filter(item => item.isDigitalMenu !== false && item.status === 'Active');
    }, [items]);

    const filteredItems = useMemo(() => {
        if (!searchQuery) return digitalMenuItems;
        const lowerQuery = searchQuery.toLowerCase();
        return digitalMenuItems.filter(item =>
            item.name.toLowerCase().includes(lowerQuery) ||
            item.description.toLowerCase().includes(lowerQuery)
        );
    }, [digitalMenuItems, searchQuery]);

    const groupedItems = useMemo(() => {
        const grouped: Record<string, MenuItem[]> = {};
        categories.forEach(cat => {
            const catItems = filteredItems.filter(item => item.categoryId === cat.id);
            if (catItems.length > 0) grouped[cat.id] = catItems;
        });
        return grouped;
    }, [categories, filteredItems]);

    if (mounted && settings.digitalMenu?.isActive === false) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4 text-center">
                <h1 className="text-4xl font-bold mb-4">We'll be back soon! 👨‍🍳</h1>
                <p className="text-lg text-gray-400">Our digital menu is currently undergoing maintenance.</p>
            </div>
        );
    }

    const addToCart = (item: MenuItem) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
            return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1, veg: item.veg }];
        });
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
    };

    const removeFromCart = (itemId: string) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === itemId);
            if (existing && existing.quantity > 1) return prev.map(i => i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i);
            return prev.filter(i => i.id !== itemId);
        });
    };

    const getItemQty = (itemId: string) => cart.find(i => i.id === itemId)?.quantity || 0;
    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const checkout = () => {
        if (cart.length === 0) return;
        let message = `New Order from Table ${tableNumber || 'Unknown'}:\n\n`;
        cart.forEach(item => message += `- ${item.quantity}x ${item.name} - ₹${item.price * item.quantity}\n`);
        message += `\n*Total: ₹${cartTotal}*`;
        window.open(`https://wa.me/919509913792?text=${encodeURIComponent(message)}`, '_blank');
    };

    const handleServiceRequest = (type: 'Call' | 'Bill' | 'Water') => {
        if (tableNumber) {
            addServiceRequest(tableNumber, type);
            alert(`Request sent: ${type}`);
            setIsServiceModalOpen(false);
        }
    };

    const scrollToCategory = (catId: string) => {
        setActiveSection(catId);
        const element = document.getElementById(catId);
        if (element) {
            const offset = 200;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans relative overflow-x-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full filter blur-[150px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-red-500/15 rounded-full filter blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-amber-500/10 rounded-full filter blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');
                body { font-family: 'Poppins', sans-serif; }
                @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
                @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes glow { 0%, 100% { box-shadow: 0 0 20px rgba(249, 115, 22, 0.3); } 50% { box-shadow: 0 0 40px rgba(249, 115, 22, 0.5); } }
                .animate-float { animation: float 3s ease-in-out infinite; }
                .animate-slide-up { animation: slideUp 0.6s ease-out forwards; }
                .animate-glow { animation: glow 2s ease-in-out infinite; }
                .glass { background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.1); }
                .glass-dark { background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.1); }
                .gradient-text { background: linear-gradient(135deg, #f97316, #ef4444, #f59e0b); -webkit-background-clip: text; background-clip: text; color: transparent; }
                .gradient-border { background: linear-gradient(135deg, rgba(249,115,22,0.3), rgba(239,68,68,0.3)); padding: 1px; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            {/* Hero Header */}
            <header className="relative h-80 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-[#0a0a0a] z-10" />
                <div
                    className="absolute inset-0 bg-cover bg-center scale-110"
                    style={{
                        backgroundImage: settings.digitalMenu?.bannerImage
                            ? `url(${settings.digitalMenu.bannerImage})`
                            : 'url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80)'
                    }}
                />
                <div className="relative z-20 h-full flex flex-col items-center justify-center text-white p-4 text-center">
                    <div className="w-28 h-28 rounded-full glass border-2 border-orange-500/30 overflow-hidden mb-4 shadow-2xl animate-float animate-glow">
                        <Image src="/logowhite.PNG" alt="Oye Chatoro" width={112} height={112} className="object-cover w-full h-full" />
                    </div>
                    <h1 className="text-5xl font-black mb-2 gradient-text drop-shadow-2xl">Oye Chatoro</h1>
                    <p className="text-white/70 text-sm font-medium tracking-widest uppercase">Premium Street Food Experience</p>
                    {tableNumber && (
                        <div className="mt-4 glass px-6 py-2 rounded-full text-sm font-bold border border-orange-500/30 shadow-lg">
                            🪑 Table {tableNumber}
                        </div>
                    )}
                </div>
                <button
                    onClick={() => router.push('/')}
                    className="absolute top-4 left-4 z-30 p-3 glass-dark rounded-full text-white hover:bg-white/10 transition-all"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                </button>
            </header>

            {/* Sticky Navigation */}
            <div className={`sticky top-0 z-40 transition-all duration-500 ${scrolled ? 'glass-dark shadow-2xl' : ''}`}>
                <div className="p-4 pb-3">
                    <div className="relative max-w-2xl mx-auto">
                        <input
                            type="text"
                            placeholder="Search your favorite dish..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-14 pr-6 py-4 rounded-2xl glass text-white placeholder-white/40 outline-none focus:border-orange-500/50 transition-all text-base font-medium"
                        />
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
                        </div>
                    </div>
                </div>

                <nav ref={navRef} className="flex overflow-x-auto px-4 pb-4 gap-3 no-scrollbar scroll-smooth">
                    {categories.map((cat, i) => (
                        <button
                            key={cat.id}
                            onClick={() => scrollToCategory(cat.id)}
                            style={{ animationDelay: `${i * 0.05}s` }}
                            className={`animate-slide-up whitespace-nowrap px-6 py-3 rounded-2xl text-sm font-bold transition-all flex-shrink-0 ${activeSection === cat.id
                                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30 scale-105'
                                    : 'glass text-white/70 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Menu Content */}
            <main className="relative z-10 p-4 pb-36 max-w-4xl mx-auto">
                {Object.keys(groupedItems).length === 0 ? (
                    <div className="text-center py-24 animate-slide-up">
                        <div className="text-9xl mb-8 animate-float">🍕</div>
                        <p className="text-2xl font-bold mb-2">No dishes found</p>
                        <p className="text-white/50">Try searching for something else</p>
                    </div>
                ) : (
                    categories.map((cat, catIndex) => {
                        const catItems = groupedItems[cat.id];
                        if (!catItems) return null;

                        return (
                            <section key={cat.id} id={cat.id} className="mb-12 scroll-mt-52">
                                <div className="flex items-center gap-4 mb-6" style={{ animationDelay: `${catIndex * 0.1}s` }}>
                                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
                                    <h2 className="text-2xl font-black gradient-text uppercase tracking-wider">{cat.name}</h2>
                                    <span className="glass px-3 py-1 rounded-full text-xs font-bold text-orange-400">{catItems.length}</span>
                                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {catItems.map((item, itemIndex) => {
                                        const qty = getItemQty(item.id);
                                        return (
                                            <div
                                                key={item.id}
                                                style={{ animationDelay: `${itemIndex * 0.05}s` }}
                                                className="animate-slide-up glass rounded-3xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:border-orange-500/30 group"
                                            >
                                                <div className="flex h-full">
                                                    {/* Image */}
                                                    <div className="w-32 h-36 flex-shrink-0 relative overflow-hidden">
                                                        {item.image ? (
                                                            <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="128px" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center bg-white/5 text-4xl">🥘</div>
                                                        )}
                                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a]/80" />
                                                    </div>

                                                    {/* Content */}
                                                    <div className="flex-1 p-4 flex flex-col justify-between">
                                                        <div>
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <div className={`w-4 h-4 rounded flex items-center justify-center border-2 ${item.veg ? 'border-green-500' : 'border-red-500'}`}>
                                                                    <div className={`w-2 h-2 rounded-full ${item.veg ? 'bg-green-500' : 'bg-red-500'}`} />
                                                                </div>
                                                                {item.isFeatured && (
                                                                    <span className="text-[9px] font-black bg-gradient-to-r from-orange-500 to-red-500 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                                                        ⭐ Best
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <h3 className="font-bold text-base mb-1 text-white leading-tight line-clamp-1">{item.name}</h3>
                                                            <p className="text-xs text-white/40 line-clamp-2 mb-2">{item.description}</p>
                                                        </div>

                                                        <div className="flex items-center justify-between">
                                                            <span className="text-xl font-black gradient-text">₹{item.price}</span>

                                                            {qty === 0 ? (
                                                                <button
                                                                    onClick={() => addToCart(item)}
                                                                    className="px-5 py-2 rounded-xl font-bold text-xs bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30 active:scale-95 transition-all uppercase tracking-wide hover:shadow-orange-500/50"
                                                                >
                                                                    ADD
                                                                </button>
                                                            ) : (
                                                                <div className="flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg shadow-orange-500/30 overflow-hidden">
                                                                    <button onClick={() => removeFromCart(item.id)} className="w-9 h-9 flex items-center justify-center hover:bg-white/20 font-bold text-lg transition-colors">−</button>
                                                                    <span className="w-6 text-center font-black text-sm">{qty}</span>
                                                                    <button onClick={() => addToCart(item)} className="w-9 h-9 flex items-center justify-center hover:bg-white/20 font-bold text-lg transition-colors">+</button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        );
                    })
                )}
            </main>

            {/* Floating Buttons */}
            <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
                {tableNumber && (
                    <button onClick={() => setIsServiceModalOpen(true)} className="w-14 h-14 glass-dark rounded-full shadow-2xl flex items-center justify-center active:scale-95 transition-all animate-float text-2xl">🔔</button>
                )}

                {cartCount > 0 && (
                    <button onClick={() => setIsCartOpen(true)} className="h-16 px-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-2xl shadow-orange-500/40 flex items-center gap-4 active:scale-95 transition-all animate-glow">
                        <div className="relative">
                            <span className="text-2xl">🛒</span>
                            <span className="absolute -top-2 -right-2 bg-white text-orange-600 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">{cartCount}</span>
                        </div>
                        <div className="text-left">
                            <div className="text-[10px] font-medium opacity-80 uppercase tracking-wider">View Cart</div>
                            <div className="font-black text-lg">₹{cartTotal}</div>
                        </div>
                    </button>
                )}
            </div>

            {/* Toast */}
            <div className={`fixed bottom-24 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-2xl shadow-2xl shadow-green-500/30 flex items-center gap-3 z-[60] transition-all duration-500 ${showToast ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95 pointer-events-none'}`}>
                <span className="text-2xl">✓</span>
                <span className="font-bold">Added to cart!</span>
            </div>

            {/* Service Modal */}
            {isServiceModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget) setIsServiceModalOpen(false) }}>
                    <div className="glass rounded-3xl p-8 w-full max-w-sm text-center shadow-2xl animate-slide-up border border-orange-500/20">
                        <h3 className="text-2xl font-black mb-8 gradient-text">Need Help?</h3>
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            <button onClick={() => handleServiceRequest('Call')} className="flex flex-col items-center gap-3 p-4 rounded-2xl glass hover:bg-white/10 transition-all active:scale-95">
                                <span className="text-4xl">👋</span>
                                <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Call</span>
                            </button>
                            <button onClick={() => handleServiceRequest('Water')} className="flex flex-col items-center gap-3 p-4 rounded-2xl glass hover:bg-white/10 transition-all active:scale-95">
                                <span className="text-4xl">💧</span>
                                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Water</span>
                            </button>
                            <button onClick={() => handleServiceRequest('Bill')} className="flex flex-col items-center gap-3 p-4 rounded-2xl glass hover:bg-white/10 transition-all active:scale-95">
                                <span className="text-4xl">🧾</span>
                                <span className="text-xs font-bold uppercase tracking-wider text-green-400">Bill</span>
                            </button>
                        </div>
                        <button onClick={() => setIsServiceModalOpen(false)} className="w-full py-4 rounded-2xl font-bold glass hover:bg-white/10 transition-all text-white/70">Cancel</button>
                    </div>
                </div>
            )}

            {/* Cart Drawer */}
            {isCartOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex justify-end" onClick={(e) => { if (e.target === e.currentTarget) setIsCartOpen(false) }}>
                    <div className="w-full max-w-md h-full glass-dark flex flex-col shadow-2xl animate-slide-up border-l border-orange-500/20">
                        <div className="p-6 border-b border-white/10 flex justify-between items-center">
                            <h3 className="text-2xl font-black gradient-text">Your Order</h3>
                            <button onClick={() => setIsCartOpen(false)} className="w-10 h-10 glass rounded-full flex items-center justify-center text-xl font-bold hover:bg-white/10 transition-all">×</button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {cart.map((item) => (
                                <div key={item.id} className="flex gap-4 items-center p-4 glass rounded-2xl">
                                    <div className={`w-4 h-4 rounded flex items-center justify-center border-2 flex-shrink-0 ${item.veg ? 'border-green-500' : 'border-red-500'}`}>
                                        <div className={`w-2 h-2 rounded-full ${item.veg ? 'bg-green-500' : 'bg-red-500'}`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-bold truncate">{item.name}</div>
                                        <div className="text-sm text-orange-400 font-bold">₹{item.price}</div>
                                    </div>
                                    <div className="flex items-center gap-1 glass rounded-xl p-1">
                                        <button className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-lg font-bold transition-colors" onClick={() => removeFromCart(item.id)}>−</button>
                                        <span className="font-bold text-sm w-6 text-center">{item.quantity}</span>
                                        <button className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-lg font-bold transition-colors" onClick={() => addToCart(item as any)}>+</button>
                                    </div>
                                    <div className="font-black text-lg w-16 text-right gradient-text">₹{item.price * item.quantity}</div>
                                </div>
                            ))}
                            {cart.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-64">
                                    <div className="text-8xl mb-6 animate-float">🛒</div>
                                    <p className="text-xl font-bold mb-2">Cart is empty</p>
                                    <button onClick={() => setIsCartOpen(false)} className="mt-4 text-orange-500 font-bold hover:underline">Browse Menu</button>
                                </div>
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div className="p-6 border-t border-white/10 glass-dark">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-lg font-bold text-white/70">Total</span>
                                    <span className="text-4xl font-black gradient-text">₹{cartTotal}</span>
                                </div>
                                <button
                                    onClick={checkout}
                                    className="w-full py-5 bg-gradient-to-r from-orange-500 to-red-500 font-black text-xl rounded-2xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                                >
                                    <span>Place Order</span>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" /></svg>
                                </button>
                                <p className="text-center text-xs text-white/40 mt-4">Order via WhatsApp 📱</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
