'use client';
// Force rebuild

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDbMenu, MenuItem, useDbSettings as useSettings, addServiceRequest, useDbCart, useDbOffers } from '../lib/db-hooks';

import OffersCarousel from '../components/OffersCarousel';


export default function MenuPage() {
    const router = useRouter();
    const { categories, items, loading: menuLoading, error: menuError } = useDbMenu();
    const { settings } = useSettings();
    const { cart, addToCart, removeFromCart, clearCart, updateQuantity } = useDbCart(); // Use Global Cart
    const [isCartOpen, setIsCartOpen] = useState(false);

    // --- Error UI ---
    if (menuError) {
        return (
            <div className="min-h-screen bg-[var(--bg-light)] flex flex-col items-center justify-center p-4 text-center">
                <div className="text-4xl mb-4">⚠️</div>
                <h1 className="text-xl font-bold text-[var(--brand-dark)] mb-2">Unavailable</h1>
                <p className="text-gray-500 mb-6">{menuError}</p>
                <button onClick={() => window.location.reload()} className="btn btn-primary px-8">Retry</button>
            </div>
        );
    }
    const [showToast, setShowToast] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [mounted, setMounted] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [lang, setLang] = useState<'en' | 'hi'>('en');
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');

    const [tableNumber, setTableNumber] = useState<string | null>(null);
    const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

    // Coupon State
    const { offers } = useDbOffers();
    const [couponCode, setCouponCode] = useState('');
    const [appliedOffer, setAppliedOffer] = useState<any>(null);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [discountError, setDiscountError] = useState('');

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

            const langParam = params.get('lang');
            if (langParam === 'hi') setLang('hi');

            const handleScroll = () => setScrolled(window.scrollY > 50);
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, [categories]);

    const digitalMenuItems = useMemo(() => {
        return items
            .filter((item: MenuItem) => item.isDigitalMenu !== false && item.status === 'Active' && item.veg)
            .sort((a, b) => a.price - b.price);
    }, [items]);

    const filteredItems = useMemo(() => {
        if (!searchQuery) return digitalMenuItems;
        const lowerQuery = searchQuery.toLowerCase();
        return digitalMenuItems.filter((item: MenuItem) => {
            const nameEN = item.name.toLowerCase();
            const descEN = (item.description || '').toLowerCase();
            const nameHI = (item.translations?.hi?.name || '').toLowerCase();
            const descHI = (item.translations?.hi?.description || '').toLowerCase();

            return nameEN.includes(lowerQuery) ||
                descEN.includes(lowerQuery) ||
                nameHI.includes(lowerQuery) ||
                descHI.includes(lowerQuery);
        });
    }, [digitalMenuItems, searchQuery]);

    const groupedItems = useMemo(() => {
        const grouped: Record<string, MenuItem[]> = {};
        categories.forEach(cat => {
            const catItems = filteredItems.filter(item => item.categoryId === cat.id);
            if (catItems.length > 0) grouped[cat.id] = catItems;
        });
        return grouped;
    }, [categories, filteredItems]);

    if (mounted && settings?.digitalMenu?.isActive === false) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4 text-center">
                <h1 className="text-4xl font-bold mb-4">We'll be back soon! 👨‍🍳</h1>
                <p className="text-lg text-gray-400">Our digital menu is currently undergoing maintenance.</p>
            </div>
        );
    }

    const handleAddToCart = (item: MenuItem) => {
        addToCart({
            menuItemId: item.id,
            quantity: 1
        });
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
    };

    const handleRemoveFromCart = (item: MenuItem) => {
        // Reading file firstem by menuItemId logic if possible, or name
        const cartItem = cart.find(i => i.name === item.name);
        if (cartItem) {
            updateQuantity(cartItem.id, cartItem.quantity - 1);
        }
    };

    const getItemQty = (itemId: string) => cart.find(i => i.menuItemId === itemId)?.quantity || 0;
    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const handleApplyCoupon = () => {
        setDiscountError('');
        const offer = offers.find(o => o.code === couponCode && o.status === 'Active');

        if (!offer) {
            setDiscountError('Invalid or inactive coupon');
            return;
        }

        // Logic (could be expanded)
        let discount = 0;
        if (offer.type === 'Percentage') {
            // Extract number from string like "20%" or "20"
            const val = parseFloat(offer.discount);
            discount = Math.round((cartTotal * val) / 100);
        } else {
            const val = parseFloat(offer.discount);
            discount = val;
        }

        if (discount > cartTotal) discount = cartTotal;

        setAppliedOffer(offer);
        setDiscountAmount(discount);
        setCouponCode('');
    };

    const handleDirectOrder = async () => {
        if (cart.length === 0) return;

        const finalTotal = cartTotal - discountAmount;

        try {
            const orderData = {
                items: cart.map(item => ({
                    id: item.menuItemId,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price
                })),
                total: finalTotal,
                type: 'DineIn',
                table: tableNumber || undefined,
                customer: customerName || (tableNumber ? `Table ${tableNumber}` : 'Digital Menu Customer'),
                mobile: customerPhone || undefined,
                paymentStatus: 'Unpaid',
                paymentMethod: 'Cash',
                discount: appliedOffer ? { code: appliedOffer.code, amount: discountAmount } : null,
                status: 'Pending'
            };

            await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });

            // Success
            alert('✅ Order Placed! Kitchen has received your order.');
            clearCart();
            setIsCartOpen(false);
            setAppliedOffer(null);
            setDiscountAmount(0);
        } catch (e) {
            console.error('Failed to submit order:', e);
            alert('Something went wrong. Please call waiter.');
        }
    };

    const handleWhatsAppOrder = async () => {
        if (cart.length === 0) return;
        const finalTotal = cartTotal - discountAmount;

        // Open WhatsApp
        let message = `*New Order Details*\n`;
        if (customerName) message += `Customer: ${customerName}\n`;
        if (customerPhone) message += `Phone: ${customerPhone}\n`;
        message += `Table: ${tableNumber || 'Digital'}\n\n`;

        cart.forEach(item => message += `- ${item.quantity}x ${item.name} - ₹${item.price * item.quantity}\n`);

        if (appliedOffer) {
            message += `\nSubtotal: ₹${cartTotal}`;
            message += `\nDiscount (${appliedOffer.code}): -₹${discountAmount}`;
        }

        message += `\n*Total Pay: ₹${finalTotal}*`;
        window.open(`https://wa.me/919509913792?text=${encodeURIComponent(message)}`, '_blank');

        // Note: For digital menu, we might NOT submit to API automatically if they choose WhatsApp, 
        // or we can to track it. Let's submit invisibly as backup.
        try {
            const orderData = {
                items: cart.map(item => ({
                    id: item.menuItemId,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price
                })),
                total: finalTotal,
                type: 'DineIn',
                table: tableNumber || undefined,
                customer: customerName || 'WhatsApp Order',
                mobile: customerPhone || undefined,
                paymentStatus: 'Unpaid',
                paymentMethod: 'Cash',
                status: 'Pending'
            };
            fetch('/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(orderData) });
        } catch (e) { }

        // Clear cart after order
        clearCart();
        setIsCartOpen(false);
        setAppliedOffer(null);
        setDiscountAmount(0);
    };

    const handleServiceRequest = (type: 'Call' | 'Bill' | 'Water') => {
        if (tableNumber) {
            addServiceRequest({ table: tableNumber, type });
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
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Noto+Sans+Devanagari:wght@400;700&display=swap');
                body { font-family: 'Poppins', 'Noto Sans Devanagari', sans-serif; }
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
                        backgroundImage: settings?.digitalMenu?.bannerImage
                            ? `url(${settings.digitalMenu.bannerImage})`
                            : 'url(https://images.unsplash.com/photo-1589301760014-dd836a8dfe9f?auto=format&fit=crop&w=1000&q=80)'
                    }}
                />
                <div className="relative z-20 h-full flex flex-col items-center justify-center text-white p-4 text-center">
                    <div className="w-28 h-28 rounded-full glass border-2 border-orange-500/30 overflow-hidden mb-4 shadow-2xl animate-float animate-glow">
                        <Image src="/logowhite.PNG" alt="Oye Chatoro" width={112} height={112} className="object-cover w-full h-full" />
                    </div>

                    {/* Pure Veg Badge */}
                    <div className="absolute top-4 right-4 animate-slide-up" style={{ animationDelay: '0.5s' }}>
                        <div className="glass px-3 py-1.5 rounded-full flex items-center gap-2 border border-green-500/30 shadow-lg shadow-green-900/20">
                            <div className="w-4 h-4 border-2 border-green-500 flex items-center justify-center rounded-[2px]">
                                <div className="w-2 h-2 bg-green-500 rounded-full" />
                            </div>
                            <span className="text-xs font-bold text-green-400 uppercase tracking-wider">{lang === 'hi' ? '100% शुद्ध शाकाहारी' : '100% Pure Veg'}</span>
                        </div>
                    </div>

                    <h1 className="text-5xl font-black mb-2 gradient-text drop-shadow-2xl">Oye Chatoro</h1>
                    <p className="text-white/70 text-sm font-medium tracking-widest uppercase mb-4">{lang === 'hi' ? 'प्रीमियम स्ट्रीट फूड का अनुभव' : 'Premium Street Food Experience'}</p>

                    <a href="tel:9509913792" className="glass px-6 py-2 rounded-full flex items-center gap-2 group hover:bg-white/10 transition-all border border-orange-500/30">
                        <span className="text-xl group-hover:scale-110 transition-transform">📞</span>
                        <span className="text-sm font-bold tracking-wider text-orange-400 group-hover:text-orange-300">9509913792</span>
                    </a>

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

            {/* Special Offers Carousel */}
            <OffersCarousel />

            {/* Sticky Navigation */}
            <div className={`sticky top-0 z-40 transition-all duration-500 ${scrolled ? 'glass-dark shadow-2xl' : ''}`}>
                <div className="p-4 pb-3">
                    <div className="relative max-w-2xl mx-auto">
                        <input
                            type="text"
                            placeholder={lang === 'hi' ? 'अपनी पसंदीदा डिश खोजें...' : 'Search your favorite dish...'}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-14 pr-6 py-4 rounded-2xl glass text-white placeholder-white/40 outline-none focus:border-orange-500/50 transition-all text-base font-medium"
                        />
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none opacity-50" />
                    <nav ref={navRef} className="flex overflow-x-auto px-6 pb-4 gap-3 no-scrollbar scroll-smooth snap-x">
                        <div className="flex mx-auto gap-3">
                            {categories.map((cat, i) => {
                                const getHindiCat = (name: string) => {
                                    if (name.includes('Pizza')) return 'पिज्जा';
                                    if (name.includes('Burger')) return 'बर्गर';
                                    if (name.includes('Chaat')) return 'चाट';
                                    if (name.includes('Beverages')) return 'कोल्ड ड्रिंक्स';
                                    if (name.includes('Sandwich')) return 'सैंडविच';
                                    if (name.includes('Chinese')) return 'चाइनीज़';
                                    if (name.includes('Pasta')) return 'पास्ता';
                                    if (name.includes('Momos')) return 'मोमोज';
                                    return name;
                                };
                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => scrollToCategory(cat.id)}
                                        style={{ animationDelay: `${i * 0.05}s` }}
                                        className={`animate-slide-up snap-center whitespace-nowrap px-6 py-3 rounded-2xl text-sm font-bold transition-all flex-shrink-0 border ${activeSection === cat.id
                                            ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white border-orange-400 shadow-xl shadow-orange-500/30 scale-105'
                                            : 'glass text-white/70 border-white/5 hover:text-white hover:bg-white/10'
                                            }`}
                                    >
                                        {lang === 'hi' ? getHindiCat(cat.name) : cat.name}
                                    </button>
                                );
                            })}
                        </div>
                    </nav>
                    <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10 pointer-events-none">
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-white/30 animate-pulse text-xs">scroll →</div>
                    </div>
                </div>
            </div>

            {/* Menu Content */}
            <main className="relative z-10 p-4 pb-36 max-w-4xl mx-auto">
                {Object.keys(groupedItems).length === 0 ? (
                    <div className="text-center py-24 animate-slide-up">
                        <div className="text-9xl mb-8 animate-float">🍕</div>
                        <p className="text-2xl font-bold mb-2">{lang === 'hi' ? 'कोई डिश नहीं मिली' : 'No dishes found'}</p>
                        <p className="text-white/50">{lang === 'hi' ? 'कुछ और खोजने की कोशिश करें' : 'Try searching for something else'}</p>
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
                                                    <Link href={`/menu/${item.slug}`} className="w-32 h-36 flex-shrink-0 relative overflow-hidden cursor-pointer">
                                                        {item.image ? (
                                                            <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="128px" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center bg-white/5 text-4xl">🥘</div>
                                                        )}
                                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a]/80" />
                                                    </Link>

                                                    {/* Content */}
                                                    <div className="flex-1 p-4 flex flex-col justify-between">
                                                        <div>
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <div className={`w-4 h-4 rounded flex items-center justify-center border-2 ${item.veg ? 'border-green-500' : 'border-red-500'}`}>
                                                                    <div className={`w-2 h-2 rounded-full ${item.veg ? 'bg-green-500' : 'bg-red-500'}`} />
                                                                </div>
                                                                {item.isFeatured && (
                                                                    <span className="text-[9px] font-black bg-gradient-to-r from-orange-500 to-red-500 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                                                        ⭐ {lang === 'hi' ? 'श्रेष्ठ' : 'Best'}
                                                                    </span>
                                                                )}
                                                                {item.tags && item.tags.slice(0, 3).map(tag => (
                                                                    <span key={tag} className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${tag === 'Spicy' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                                                                        tag === 'Vegan' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                                                                            tag === 'New' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                                                                                'bg-white/10 text-white/70 border border-white/10'
                                                                        }`}>
                                                                        {tag === 'Spicy' ? '🌶️ ' : ''}{tag}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                            <Link href={`/menu/${item.slug}`}>
                                                                <h3 className="font-bold text-base mb-1 text-white leading-tight hover:text-orange-500 transition-colors cursor-pointer">
                                                                    {lang === 'hi' ? (
                                                                        item.translations?.hi?.name ||
                                                                        item.name.replace(/Pizza/gi, 'पिज्जा')
                                                                            .replace(/Burger/gi, 'बर्गर')
                                                                            .replace(/Chaat/gi, 'चाट')
                                                                            .replace(/Sandwich/gi, 'सैंडविच')
                                                                            .replace(/Pasta/gi, 'पास्ता')
                                                                            .replace(/Momos/gi, 'मोमोज')
                                                                            .replace(/Special/gi, 'स्पेशल')
                                                                            .replace(/Hot/gi, 'हॉट')
                                                                            .replace(/Veg/gi, 'वेज')
                                                                            .replace(/Paneer/gi, 'पनीर')
                                                                            .replace(/Cheese/gi, 'चीज़')
                                                                            .replace(/Garlic/gi, 'गार्लिक')
                                                                            .replace(/Corn/gi, 'कॉर्न')
                                                                            .replace(/Fried/gi, 'फ्राइड')
                                                                            .replace(/Rice/gi, 'राइस')
                                                                            .replace(/Noodles/gi, 'नूडल्स')
                                                                            .replace(/Masala/gi, 'मसाला')
                                                                    ) : item.name}
                                                                </h3>
                                                            </Link>
                                                            <p className="text-xs text-white/40 mb-2">
                                                                {lang === 'hi' ? (
                                                                    item.translations?.hi?.description ||
                                                                    (item.description || '').replace(/Delicious/gi, 'स्वादिष्ट')
                                                                        .replace(/Fresh/gi, 'ताज़ा')
                                                                        .replace(/Served with/gi, 'के साथ परोसा गया')
                                                                        .replace(/Pizza/gi, 'पिज्जा')
                                                                        .replace(/Burger/gi, 'बर्गर')
                                                                ) : item.description}
                                                            </p>
                                                        </div>

                                                        <div className="flex items-center justify-between">
                                                            <span className="text-xl font-black gradient-text">₹{item.price}</span>

                                                            {qty === 0 ? (
                                                                <button
                                                                    onClick={() => handleAddToCart(item)}
                                                                    className="px-5 py-2 rounded-xl font-bold text-xs bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30 active:scale-95 transition-all uppercase tracking-wide hover:shadow-orange-500/50"
                                                                >
                                                                    {lang === 'hi' ? 'लें' : 'ADD'}
                                                                </button>
                                                            ) : (
                                                                <div className="flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg shadow-orange-500/30 overflow-hidden">
                                                                    <button onClick={() => handleRemoveFromCart(item)} className="w-9 h-9 flex items-center justify-center hover:bg-white/20 font-bold text-lg transition-colors">−</button>
                                                                    <span className="w-6 text-center font-black text-sm">{qty}</span>
                                                                    <button onClick={() => handleAddToCart(item)} className="w-9 h-9 flex items-center justify-center hover:bg-white/20 font-bold text-lg transition-colors">+</button>
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
                {/* Language Switcher */}
                <div className="flex bg-black/60 backdrop-blur-md p-1 rounded-2xl border border-white/10 self-end scale-90 origin-bottom-right shadow-2xl">
                    <button
                        onClick={() => setLang('en')}
                        className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${lang === 'en' ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white'}`}
                    >
                        English
                    </button>
                    <button
                        onClick={() => setLang('hi')}
                        className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${lang === 'hi' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'text-white/40 hover:text-white'}`}
                    >
                        हिन्दी
                    </button>
                </div>

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
                            <div className="text-[10px] font-medium opacity-80 uppercase tracking-wider">{lang === 'hi' ? 'कार्ट देखें' : 'View Cart'}</div>
                            <div className="font-black text-lg">₹{cartTotal}</div>
                        </div>
                    </button>
                )}
            </div>

            {/* Toast */}
            <div className={`fixed bottom-24 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-2xl shadow-2xl shadow-green-500/30 flex items-center gap-3 z-[60] transition-all duration-500 ${showToast ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95 pointer-events-none'}`}>
                <span className="text-2xl">✓</span>
                <span className="font-bold">{lang === 'hi' ? 'कार्ट में जोड़ा गया!' : 'Added to cart!'}</span>
            </div>

            {/* Service Modal */}
            {isServiceModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget) setIsServiceModalOpen(false) }}>
                    <div className="glass rounded-3xl p-8 w-full max-w-sm text-center shadow-2xl animate-slide-up border border-orange-500/20">
                        <h3 className="text-2xl font-black mb-8 gradient-text">{lang === 'hi' ? 'क्या मदद चाहिए?' : 'Need Help?'}</h3>
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            <button onClick={() => handleServiceRequest('Call')} className="flex flex-col items-center gap-3 p-4 rounded-2xl glass hover:bg-white/10 transition-all active:scale-95">
                                <span className="text-4xl">👋</span>
                                <span className="text-xs font-bold uppercase tracking-wider text-blue-400">{lang === 'hi' ? 'वेटर' : 'Call'}</span>
                            </button>
                            <button onClick={() => handleServiceRequest('Water')} className="flex flex-col items-center gap-3 p-4 rounded-2xl glass hover:bg-white/10 transition-all active:scale-95">
                                <span className="text-4xl">💧</span>
                                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">{lang === 'hi' ? 'पानी' : 'Water'}</span>
                            </button>
                            <button onClick={() => handleServiceRequest('Bill')} className="flex flex-col items-center gap-3 p-4 rounded-2xl glass hover:bg-white/10 transition-all active:scale-95">
                                <span className="text-4xl">🧾</span>
                                <span className="text-xs font-bold uppercase tracking-wider text-green-400">{lang === 'hi' ? 'बिल' : 'Bill'}</span>
                            </button>
                        </div>
                        <button onClick={() => setIsServiceModalOpen(false)} className="w-full py-4 rounded-2xl font-bold glass hover:bg-white/10 transition-all text-white/70">{lang === 'hi' ? 'रद्द करें' : 'Cancel'}</button>
                    </div>
                </div>
            )}

            {/* Cart Drawer */}
            {isCartOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex justify-end" onClick={(e) => { if (e.target === e.currentTarget) setIsCartOpen(false) }}>
                    <div className="w-full max-w-md h-full glass-dark flex flex-col shadow-2xl animate-slide-up border-l border-orange-500/20">
                        <div className="p-6 border-b border-white/10 flex justify-between items-center">
                            <h3 className="text-2xl font-black gradient-text">{lang === 'hi' ? 'आपका ऑर्डर' : 'Your Order'}</h3>
                            <button onClick={() => setIsCartOpen(false)} className="w-10 h-10 glass rounded-full flex items-center justify-center text-xl font-bold hover:bg-white/10 transition-all">×</button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {/* Customer Details (Optional) */}
                            {cart.length > 0 && (
                                <div className="space-y-3 mb-6 animate-slide-up">
                                    <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">{lang === 'hi' ? 'आपका विवरण (वैकल्पिक)' : 'Your Details (Optional)'}</h4>
                                    <div className="grid grid-cols-1 gap-3">
                                        <div className="relative group">
                                            <input
                                                type="text"
                                                placeholder={lang === 'hi' ? 'आपका नाम (वैकल्पिक)' : 'Your Name (Optional)'}
                                                value={customerName}
                                                onChange={(e) => setCustomerName(e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-4 outline-none focus:border-orange-500/50 transition-all font-medium text-white placeholder-white/20"
                                            />
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl opacity-40 group-focus-within:opacity-100 transition-opacity">👤</span>
                                        </div>
                                        <div className="relative group">
                                            <input
                                                type="tel"
                                                placeholder={lang === 'hi' ? 'मोबाइल नंबर (वैकल्पिक)' : 'Mobile Number (Optional)'}
                                                value={customerPhone}
                                                onChange={(e) => setCustomerPhone(e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-4 outline-none focus:border-orange-500/50 transition-all font-medium text-white placeholder-white/20"
                                            />
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl opacity-40 group-focus-within:opacity-100 transition-opacity">📱</span>
                                        </div>
                                    </div>
                                    <div className="h-px bg-white/10 my-6" />
                                </div>
                            )}

                            {cart.map((item) => (
                                <div key={item.name} className="flex gap-4 items-center p-4 glass rounded-2xl">
                                    <div className={`w-4 h-4 rounded flex items-center justify-center border-2 flex-shrink-0 disabled shadow-none opacity-50 bg-green-500/10`}>
                                        {/* Simple veg dot, dynamic check removed for CartItem simplicity, assuming mostly veg */}
                                        <div className={`w-2 h-2 rounded-full bg-green-500`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-bold text-sm leading-tight">
                                            {lang === 'hi' ? (
                                                item.name.replace(/Pizza/gi, 'पिज्जा')
                                                    .replace(/Burger/gi, 'बर्गर')
                                                    .replace(/Chaat/gi, 'चाट')
                                                    .replace(/Sandwich/gi, 'सैंडविच')
                                                    .replace(/Pasta/gi, 'पास्ता')
                                                    .replace(/Momos/gi, 'मोमोज')
                                                    .replace(/Veg/gi, 'वेज')
                                                    .replace(/Special/gi, 'स्पेशल')
                                                    .replace(/Paneer/gi, 'पनीर')
                                                    .replace(/Corn/gi, 'कॉर्न')
                                            ) : item.name}
                                        </div>
                                        <div className="text-sm text-orange-400 font-bold">₹{item.price}</div>
                                    </div>
                                    <div className="flex items-center gap-1 glass rounded-xl p-1">
                                        <button className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-lg font-bold transition-colors" onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                                        <span className="font-bold text-sm w-6 text-center">{item.quantity}</span>
                                        <button className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-lg font-bold transition-colors" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                    </div>
                                    <div className="font-black text-lg w-16 text-right gradient-text">₹{item.price * item.quantity}</div>
                                </div>
                            ))}
                            {cart.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-64">
                                    <div className="text-8xl mb-6 animate-float">🛒</div>
                                    <p className="text-xl font-bold mb-2">{lang === 'hi' ? 'कार्ट खाली है' : 'Cart is empty'}</p>
                                    <button onClick={() => setIsCartOpen(false)} className="mt-4 text-orange-500 font-bold hover:underline">{lang === 'hi' ? 'मेनू देखें' : 'Browse Menu'}</button>
                                </div>
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div className="p-6 border-t border-white/10 glass-dark">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-lg font-bold text-white/70">{lang === 'hi' ? 'उप-योग' : 'Subtotal'}</span>
                                    <span className="text-2xl font-bold text-white">₹{cartTotal}</span>
                                </div>

                                {/* Coupon Section */}
                                <div className="mb-6">
                                    {appliedOffer ? (
                                        <div className="bg-green-500/20 border border-green-500/30 p-3 rounded-xl flex justify-between items-center">
                                            <div>
                                                <div className="text-green-400 font-bold text-sm">Coupon Applied</div>
                                                <div className="text-xs text-white/60">{appliedOffer.code}</div>
                                            </div>
                                            <button onClick={() => { setAppliedOffer(null); setDiscountAmount(0); }} className="text-white/40 hover:text-white px-2">×</button>
                                        </div>
                                    ) : (
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="Coupon Code"
                                                value={couponCode}
                                                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-orange-500/50 text-sm font-bold uppercase placeholder-white/20"
                                            />
                                            <button
                                                onClick={handleApplyCoupon}
                                                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-sm transition-colors"
                                            >
                                                Apply
                                            </button>
                                        </div>
                                    )}
                                    {discountError && <div className="text-red-400 text-xs font-bold mt-2 ml-1">{discountError}</div>}
                                </div>

                                {appliedOffer && (
                                    <div className="flex justify-between items-center mb-6 text-green-400">
                                        <span className="text-lg font-bold">Discount</span>
                                        <span className="text-xl font-black">-₹{discountAmount}</span>
                                    </div>
                                )}

                                <div className="flex justify-between items-center mb-6 border-t border-white/10 pt-4">
                                    <span className="text-lg font-bold text-white/70">{lang === 'hi' ? 'कुल भुगतान' : 'Total Pay'}</span>
                                    <span className="text-4xl font-black gradient-text">₹{cartTotal - discountAmount}</span>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={handleWhatsAppOrder}
                                        className="py-4 rounded-xl border border-white/20 hover:bg-white/10 font-bold text-green-400 flex items-center justify-center gap-2 transition-all"
                                    >
                                        <span className="text-xl">📱</span> WhatsApp
                                    </button>
                                    <button
                                        onClick={handleDirectOrder}
                                        className="py-4 bg-gradient-to-r from-orange-500 to-red-500 font-black text-lg rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                    >
                                        <span>{lang === 'hi' ? 'अभी ऑर्डर करें' : 'Order Now'}</span>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" /></svg>
                                    </button>
                                </div>
                                {/* <p className="text-center text-xs text-white/40 mt-4">Order via WhatsApp 📱</p> */ null}
                            </div>
                        )}
                    </div>
                </div>
            )
            }
        </div >
    );
}
