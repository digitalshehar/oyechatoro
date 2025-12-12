'use client';

import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { useOffers } from '../lib/storage';
import { useDbCustomer, useDbMenu, useDbCart } from '../lib/db-hooks';
import MobileNav from '../components/MobileNav';

export default function CartPage() {
    const { cart, updateQuantity, removeFromCart, clearCart, addToCart } = useDbCart();
    const { offers } = useOffers();
    const { user } = useDbCustomer();
    const { items: dbItems } = useDbMenu();

    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
    const [couponError, setCouponError] = useState('');
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);

    // Calculate Totals
    const itemTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = Math.round(itemTotal * 0.05); // 5% Tax
    const deliveryCharge = itemTotal > 500 ? 0 : 40;

    let discountAmount = 0;
    if (appliedCoupon) {
        if (appliedCoupon.type === 'PERCENTAGE') {
            discountAmount = Math.round((itemTotal * appliedCoupon.value) / 100);
        } else {
            discountAmount = appliedCoupon.value;
        }
    }

    const grandTotal = itemTotal + tax + deliveryCharge - discountAmount;

    // Upsell Logic: Items not in cart, prioritized by price (low to high)
    const upsellItems = dbItems
        .filter(item => !cart.find(c => c.name === item.name) && item.status === 'Active')
        .sort((a, b) => a.price - b.price)
        .slice(0, 5);

    const handleApplyCoupon = () => {
        const coupon = offers.find(o => o.code === couponCode.toUpperCase() && o.status === 'Active');
        if (coupon) {
            setAppliedCoupon(coupon);
            setCouponError('');
        } else {
            setCouponError('Invalid or expired coupon');
            setAppliedCoupon(null);
        }
    };

    const handleCheckout = async () => {
        if (cart.length === 0) return;

        // 1. Submit to API so it appears in Dashboard
        try {
            const orderData = {
                customer: user ? user.name : 'Website Guest',
                items: cart.map(i => ({ name: i.name, quantity: i.quantity, price: i.price })),
                total: grandTotal,
                type: 'Delivery',
                paymentMethod: 'Cash',
                paymentStatus: 'Unpaid',
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

        // 2. WhatsApp
        let message = `New Order from Website:\n\n`;
        cart.forEach(item => {
            message += `- ${item.quantity}x ${item.name} (₹${item.price * item.quantity})\n`;
        });
        message += `\nItem Total: ₹${itemTotal}`;
        message += `\nTax (5%): ₹${tax}`;
        message += `\nDelivery: ₹${deliveryCharge}`;
        if (appliedCoupon) message += `\nDiscount (${appliedCoupon.code}): -₹${discountAmount}`;
        message += `\n*Grand Total: ₹${grandTotal}*`;

        const phone = '919509913792';
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');

        setIsOrderPlaced(true);
        clearCart();
    };

    if (isOrderPlaced) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h1 className="text-2xl font-bold mb-2">Order Placed!</h1>
                <p className="text-gray-600 mb-6">Redirecting you to WhatsApp to finalize...</p>
                <Link href="/" className="btn btn-primary px-8 py-3 rounded-full">Back to Home</Link>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 text-center">
                <div className="text-6xl mb-4">🛒</div>
                <h1 className="text-2xl font-bold mb-2">Your Cart is Empty</h1>
                <p className="text-gray-600 mb-6">Add some delicious food to get started!</p>
                <Link href="/menu" className="btn btn-primary px-8 py-3 rounded-full">Browse Menu</Link>
                <MobileNav />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-32">
            {/* Header */}
            <div className="bg-white p-4 shadow-sm sticky top-0 z-10">
                <h1 className="text-xl font-bold flex items-center gap-2">
                    <Link href="/" className="text-gray-500">←</Link>
                    Cart ({cart.length} Items)
                </h1>
            </div>

            <div className="max-w-2xl mx-auto p-4 space-y-6">
                {/* Cart Items */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    {cart.map((item, index) => (
                        <div key={index} className="flex gap-4 p-4 border-b last:border-0">
                            <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative">
                                {item.image ? (
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                        sizes="80px"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-2xl">🥘</div>
                                )}
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-bold text-gray-800">{item.name}</h3>
                                    <span className="font-bold">₹{item.price * item.quantity}</span>
                                </div>
                                <p className="text-xs text-gray-500 mb-3">Customizable</p>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center border rounded-lg overflow-hidden">
                                        <button onClick={() => updateQuantity(item.name, -1)} className="px-3 py-1 hover:bg-gray-50 text-green-600 font-bold">-</button>
                                        <span className="px-2 text-sm font-bold">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.name, 1)} className="px-3 py-1 hover:bg-gray-50 text-green-600 font-bold">+</button>
                                    </div>
                                    <button onClick={() => removeFromCart(item.name)} className="text-xs text-red-500 font-medium">Remove</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Upsell Carousel */}
                <div>
                    <h2 className="font-bold text-gray-700 mb-3 px-1">Complete your meal with</h2>
                    <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x">
                        {upsellItems.map((item, idx) => (
                            <div key={idx} className="snap-center flex-shrink-0 w-40 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                                <div className="h-24 bg-gray-100 relative">
                                    {item.image && (
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                            sizes="160px"
                                        />
                                    )}
                                    <button
                                        onClick={() => addToCart({ menuItemId: item.id, quantity: 1 })}
                                        className="absolute bottom-2 right-2 bg-white text-green-600 px-3 py-1 rounded-lg text-xs font-bold shadow-md"
                                    >
                                        ADD
                                    </button>
                                </div>
                                <div className="p-3">
                                    <div className="text-xs text-green-600 font-bold mb-1">Veg</div>
                                    <h4 className="font-bold text-sm truncate">{item.name}</h4>
                                    <p className="text-gray-500 text-xs">₹{item.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Offers & Coupons */}
                <div className="bg-white rounded-2xl shadow-sm p-4">
                    <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <span>🏷️</span> Offers & Coupons
                    </h3>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Enter Coupon Code"
                            className="flex-1 border rounded-xl px-4 py-2 uppercase font-bold text-sm outline-none focus:border-orange-500"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                        />
                        <button
                            onClick={handleApplyCoupon}
                            className="bg-gray-900 text-white px-6 py-2 rounded-xl font-bold text-sm"
                        >
                            APPLY
                        </button>
                    </div>
                    {couponError && <p className="text-red-500 text-xs mt-2">{couponError}</p>}
                    {
                        appliedCoupon && (
                            <div className="mt-3 bg-green-50 text-green-700 p-3 rounded-xl text-sm flex justify-between items-center">
                                <span>✅ Coupon <b>{appliedCoupon.code}</b> applied!</span>
                                <button onClick={() => setAppliedCoupon(null)} className="text-xs font-bold">REMOVE</button>
                            </div>
                        )
                    }
                </div>

                {/* Bill Details */}
                <div className="bg-white rounded-2xl shadow-sm p-4">
                    <h3 className="font-bold text-gray-800 mb-4">Bill Details</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-gray-600">
                            <span>Item Total</span>
                            <span>₹{itemTotal}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Taxes & Charges (5%)</span>
                            <span>₹{tax}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Delivery Partner Fee</span>
                            <span>{deliveryCharge === 0 ? <span className="text-green-600">FREE</span> : `₹${deliveryCharge}`}</span>
                        </div>
                        {appliedCoupon && (
                            <div className="flex justify-between text-green-600 font-medium">
                                <span>Discount ({appliedCoupon.code})</span>
                                <span>-₹{discountAmount}</span>
                            </div>
                        )}
                        <div className="border-t pt-3 mt-3 flex justify-between font-bold text-lg">
                            <span>Grand Total</span>
                            <span>₹{grandTotal}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Bottom Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg z-20 pb-safe">
                <div className="max-w-2xl mx-auto flex gap-4 items-center">
                    <div className="flex-1">
                        <div className="text-xs text-gray-500 uppercase font-bold">Total to Pay</div>
                        <div className="text-xl font-black">₹{grandTotal}</div>
                    </div>
                    <button
                        onClick={handleCheckout}
                        className="bg-[var(--brand-primary)] text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg shadow-orange-200 flex items-center gap-2"
                    >
                        Place Order 🚀
                    </button>
                </div>
            </div>

            <div className="md:hidden">
                <MobileNav />
            </div>
        </div>
    );
}
