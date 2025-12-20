'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
// import { useCart } from '@/app/lib/storage'; // Removed
import { useDbCustomer, useDbMenu, useDbCart } from '@/app/lib/db-hooks';
import MobileNav from '@/app/components/MobileNav';
import { Footer } from '@/app/components/home';

interface CartItem {
    name: string;
    price: number;
    quantity: number;
    image?: string;
}

interface SiteLayoutProps {
    children: React.ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [customerMobile, setCustomerMobile] = useState('');
    const [paymentMethod, setPaymentMethod] = useState<'COD' | 'UPI' | 'Online'>('COD');
    const [year, setYear] = useState(2024);
    const [showToast, setShowToast] = useState(false);

    const { user } = useDbCustomer();
    const { items: dbItems } = useDbMenu();
    const { cart, addToCart, removeFromCart, updateQuantity, clearCart } = useDbCart();
    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Sync Year
    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    // Listen for openCart event
    useEffect(() => {
        const handleOpenCart = () => setIsCartOpen(true);
        window.addEventListener('openCart', handleOpenCart);
        return () => window.removeEventListener('openCart', handleOpenCart);
    }, []);

    const checkout = async () => {
        if (cart.length === 0) return;

        if (!customerMobile || customerMobile.length < 10) {
            alert('Please enter a valid 10-digit mobile number');
            return;
        }

        try {
            const orderData = {
                customer: user ? user.name : 'Online Customer',
                items: cart.map(i => ({ name: i.name, quantity: i.quantity, price: i.price })),
                total: cartTotal,
                type: 'Delivery',
                mobile: customerMobile,
                paymentMethod: paymentMethod === 'COD' ? 'Cash' : paymentMethod === 'UPI' ? 'UPI' : 'Online',
                paymentStatus: paymentMethod === 'COD' ? 'Unpaid' : 'Paid',
                status: 'Pending'
            };

            await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });
            console.log('✅ Order submitted to dashboard');
        } catch (e) {
            console.error('Failed to submit order:', e);
        }

        let message = "New Order from Website:\n\n";
        cart.forEach(item => {
            message += `- ${item.quantity}x ${item.name} (₹${item.price * item.quantity})\n`;
        });
        message += `\n*Total: ₹${cartTotal}*`;
        message += `\n📱 Mobile: ${customerMobile}`;

        const phone = '919509913792';
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');

        await clearCart();
        setIsCartOpen(false);
    };

    const handleAddToCart = (item: any) => {
        addToCart({
            menuItemId: item.id,
            quantity: 1
        });
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <header className="header sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
                <div className="container header-inner flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8">
                    <Link href="/" className="logo-container group flex items-center">
                        <div className="relative w-10 h-10 mr-2 transform group-hover:rotate-12 transition-transform duration-300">
                            <Image
                                src="/logowhite.PNG"
                                alt="Oye Chatoro"
                                fill
                                className="object-contain drop-shadow-lg"
                                priority
                            />
                        </div>
                        <span className="logo-text text-xl font-black tracking-tight group-hover:text-[var(--brand-secondary)] transition-colors text-gray-900">Oye Chatoro</span>
                    </Link>

                    <nav className={`nav-links ${isMobileMenuOpen ? 'flex flex-col absolute top-full left-0 right-0 bg-white p-6 shadow-2xl border-t border-gray-100' : 'hidden md:flex items-center gap-8'}`}>
                        {['Home', 'Menu', 'Offers', 'Reviews', 'Contact'].map((item) => (
                            <Link
                                key={item}
                                href={`/#${item.toLowerCase()}`}
                                className="nav-link text-sm font-bold uppercase tracking-wider text-gray-600 hover:text-[var(--brand-primary)] relative group"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--brand-primary)] transition-all group-hover:w-full"></span>
                            </Link>
                        ))}
                        <Link href="/blog" className="nav-link font-bold text-orange-600" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
                        {user ? (
                            <Link href="/profile" className="nav-link font-bold text-[var(--brand-primary)] flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">👤</div>
                                {user.name.split(' ')[0]}
                            </Link>
                        ) : (
                            <Link href="/login" className="nav-link font-bold hover:text-[var(--brand-primary)]" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                        )}
                        <button onClick={() => { setIsCartOpen(true); setIsMobileMenuOpen(false); }} className="btn btn-primary md:hidden w-full mt-4 bg-[var(--brand-primary)] text-white px-4 py-2 rounded-full">Cart ({cartCount})</button>
                        <a href="https://wa.me/919509913792" className="btn btn-primary hidden md:inline-flex bg-[var(--brand-primary)] text-white px-6 py-2 rounded-full font-bold shadow-lg shadow-orange-200 hover:shadow-orange-300 transform hover:-translate-y-0.5 transition-all" target="_blank">Order Now 🚀</a>
                    </nav>

                    <button className="mobile-menu-btn md:hidden text-gray-700" aria-label="Menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <span className="text-2xl">☰</span>
                    </button>
                </div>
            </header>

            <main className="flex-1">
                {children}
            </main>

            {/* Footer */}
            <Footer year={year} />

            {/* Cart UI */}
            <div className="cart-floating-btn fixed bottom-24 right-4 z-40 bg-[var(--brand-primary)] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl shadow-orange-500/50 hover:scale-110 transition-transform active:scale-95 cursor-pointer md:bottom-8" onClick={() => setIsCartOpen(true)}>
                <span className="text-2xl">🛒</span>
                {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">{cartCount}</span>}
            </div>

            {/* Cart Sidebar */}
            <div className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity ${isCartOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={(e) => { if (e.target === e.currentTarget) setIsCartOpen(false) }}>
                <div className={`absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="cart-header bg-white border-b border-gray-100 p-6 flex justify-between items-center">
                        <h3 className="text-xl font-black text-gray-900">Your Order 🛍️</h3>
                        <button className="close-cart w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-2xl" onClick={() => setIsCartOpen(false)}>×</button>
                    </div>
                    <div className="cart-items p-6 space-y-6 overflow-y-auto flex-1">
                        {cart.length === 0 ? (
                            <div className="empty-cart-msg flex flex-col items-center justify-center h-full text-gray-400">
                                <span className="text-6xl mb-4">🛒</span>
                                <p className="text-lg font-medium">Your cart is empty</p>
                                <p className="text-sm">Add some delicious items!</p>
                            </div>
                        ) : (
                            cart.map((item, index) => (
                                <div key={index} className="cart-item flex gap-4 items-center">
                                    <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 relative">
                                        {item.image ? (
                                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-2xl">🥘</div>
                                        )}
                                    </div>
                                    <div className="cart-item-details flex-1">
                                        <div className="cart-item-title font-bold text-gray-900 line-clamp-1">{item.name}</div>
                                        <div className="cart-item-price text-[var(--brand-primary)] font-bold">₹{item.price}</div>
                                        <div className="cart-item-controls flex items-center gap-3 mt-2">
                                            <button className="qty-btn w-6 h-6 rounded-full border flex items-center justify-center hover:bg-gray-50" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                            <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                            <button className="qty-btn w-6 h-6 rounded-full border flex items-center justify-center hover:bg-gray-50" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                        </div>
                                    </div>
                                    <div className="font-bold text-gray-900">₹{item.price * item.quantity}</div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Upsell Section */}
                    {cart.length > 0 && (
                        <div className="p-6 bg-orange-50 border-t border-orange-100">
                            <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                                <span>✨</span> Complete your meal with...
                            </h4>
                            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                                {dbItems
                                    .filter(item => item.price < 100 && !cart.find(c => c.name === item.name) && item.status === 'Active')
                                    .slice(0, 5)
                                    .map((item, i) => (
                                        <div key={i} className="min-w-[140px] bg-white p-3 rounded-xl border border-orange-100 shadow-sm flex flex-col items-center text-center">
                                            <div className="w-12 h-12 rounded-full bg-orange-100 mb-2 overflow-hidden relative">
                                                {item.image ? (
                                                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                                                ) : (
                                                    <span className="text-xl leading-[3rem]">🥘</span>
                                                )}
                                            </div>
                                            <div className="text-xs font-bold text-gray-800 line-clamp-1 mb-1">{item.name}</div>
                                            <div className="text-xs font-bold text-orange-600 mb-2">₹{item.price}</div>
                                            <button
                                                onClick={() => handleAddToCart(item)}
                                                className="text-xs bg-orange-100 text-orange-700 font-bold px-3 py-1 rounded-full hover:bg-orange-200 transition-colors w-full"
                                            >
                                                Add +
                                            </button>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}
                    <div className="cart-footer p-6 border-t border-gray-100 bg-gray-50">
                        <div className="mb-4">
                            <label className="text-sm font-bold text-gray-700 mb-2 block">📱 Mobile Number *</label>
                            <input
                                type="tel"
                                placeholder="Enter 10-digit mobile number"
                                value={customerMobile}
                                onChange={(e) => setCustomerMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[var(--brand-primary)] focus:outline-none text-lg font-medium"
                                maxLength={10}
                            />
                        </div>
                        <div className="mb-4">
                            <p className="text-sm font-bold text-gray-700 mb-2">Payment Method</p>
                            <div className="grid grid-cols-3 gap-2">
                                {[
                                    { id: 'COD', label: '💵 Cash', desc: 'Pay on Delivery' },
                                    { id: 'UPI', label: '📱 UPI', desc: 'GPay/PhonePe' },
                                    { id: 'Online', label: '💳 Online', desc: 'Paid Already' }
                                ].map(pm => (
                                    <button
                                        key={pm.id}
                                        onClick={() => setPaymentMethod(pm.id as any)}
                                        className={`p-3 rounded-xl border-2 text-center transition-all ${paymentMethod === pm.id
                                            ? 'border-[var(--brand-primary)] bg-orange-50 text-[var(--brand-primary)]'
                                            : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                                            }`}
                                    >
                                        <div className="text-lg font-bold">{pm.label}</div>
                                        <div className="text-[10px] text-gray-500">{pm.desc}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="cart-total flex justify-between items-center mb-4 text-xl font-black text-gray-900">
                            <span>Total:</span>
                            <span className="text-[var(--brand-primary)]">₹{cartTotal}</span>
                        </div>
                        <button className="btn btn-primary btn-block btn-glow w-full py-4 rounded-xl shadow-lg shadow-orange-200 text-lg bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-secondary)] transition-colors" onClick={checkout}>
                            {paymentMethod === 'COD' ? 'Order (Cash on Delivery) 🚀' : paymentMethod === 'UPI' ? 'Order & Pay via UPI 📱' : 'Confirm Paid Order ✅'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Toast Notification */}
            <div className={`toast-notification fixed bottom-24 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-4 z-50 transition-all duration-300 ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
                <span className="font-medium">Item added to cart! 🛒</span>
                <button onClick={() => setIsCartOpen(true)} className="text-sm font-bold text-orange-400 hover:text-orange-300 underline">View Cart</button>
            </div>

            {/* Mobile Navigation */}
            <MobileNav />
        </div>
    );
}
