'use client';

import React from 'react';

interface CheckoutModalProps {
    show: boolean;
    onClose: () => void;
    showSuccess: boolean;
    cartTotal: number;
    cartCount: number;
    subtotal: number;
    discountAmount: number;
    parcelAmount: number;
    taxAmount: number;
    tipAmount: number;
    paymentMethod: 'Cash' | 'UPI' | 'Card';
    setPaymentMethod: (v: 'Cash' | 'UPI' | 'Card') => void;
    amountTendered: number;
    setAmountTendered: (v: number) => void;
    changeAmount: number;
    onConfirm: () => void;
    onPayLater: () => void;
}

export default function CheckoutModal({
    show, onClose, showSuccess, cartTotal, cartCount, subtotal, discountAmount, parcelAmount, taxAmount, tipAmount,
    paymentMethod, setPaymentMethod, amountTendered, setAmountTendered, changeAmount, onConfirm, onPayLater
}: CheckoutModalProps) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
                {showSuccess ? (
                    <div className="text-center py-8">
                        <div className="text-6xl mb-4">✅</div>
                        <h3 className="text-2xl font-bold text-green-600 mb-2">Order Placed!</h3>
                        <p className="text-gray-500">Printing receipt...</p>
                        {changeAmount > 0 && (
                            <div className="mt-4 p-4 bg-green-50 rounded-xl">
                                <div className="text-lg">Return Change</div>
                                <div className="text-3xl font-bold text-green-600">₹{changeAmount}</div>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <h3 className="text-xl font-bold mb-4">💳 Payment</h3>
                        <div className="bg-gray-50 rounded-xl p-3 mb-4 text-sm space-y-1">
                            <div className="flex justify-between"><span>Items ({cartCount})</span><span>₹{subtotal}</span></div>
                            {discountAmount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-₹{discountAmount}</span></div>}
                            {parcelAmount > 0 && <div className="flex justify-between text-blue-600"><span>Parcel</span><span>+₹{parcelAmount}</span></div>}
                            <div className="flex justify-between"><span>GST</span><span>₹{taxAmount}</span></div>
                            {tipAmount > 0 && <div className="flex justify-between text-pink-600"><span>Tip</span><span>+₹{tipAmount}</span></div>}
                        </div>
                        <div className="bg-orange-50 rounded-xl p-4 mb-4">
                            <div className="flex justify-between text-2xl font-bold">
                                <span>Total</span>
                                <span className="text-orange-600">₹{cartTotal}</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mb-4">
                            {(['Cash', 'UPI', 'Card'] as const).map(m => (
                                <button key={m} onClick={() => setPaymentMethod(m)} className={`py-3 rounded-xl font-semibold transition-all ${paymentMethod === m ? 'bg-orange-500 text-white' : 'bg-gray-100'}`}>
                                    {m === 'Cash' && '💵'} {m === 'UPI' && '📱'} {m === 'Card' && '💳'} {m}
                                </button>
                            ))}
                        </div>
                        <button onClick={onPayLater} className="w-full py-3 mb-4 rounded-xl font-bold text-sm bg-yellow-100 text-yellow-700 border border-yellow-300">🕒 Pay Later</button>
                        {paymentMethod === 'Cash' && (
                            <div className="mb-4 p-3 bg-yellow-50 rounded-xl">
                                <label className="text-sm font-semibold text-gray-600 mb-2 block">💵 Amount Received:</label>
                                <div className="flex gap-2 mb-2">
                                    {[cartTotal, Math.ceil(cartTotal / 100) * 100, Math.ceil(cartTotal / 500) * 500].map(amt => (
                                        <button key={amt} onClick={() => setAmountTendered(amt)} className={`px-3 py-2 rounded-lg text-sm font-semibold ${amountTendered === amt ? 'bg-green-500 text-white' : 'bg-white border'}`}>₹{amt}</button>
                                    ))}
                                </div>
                                <input type="number" value={amountTendered || ''} onChange={(e) => setAmountTendered(Number(e.target.value))} placeholder="Enter amount..." className="w-full px-4 py-3 rounded-xl border text-xl font-bold text-center" />
                                {amountTendered >= cartTotal && <div className="mt-3 p-3 bg-green-100 rounded-lg text-center"><div className="text-sm text-green-600">Change Due</div><div className="text-3xl font-bold text-green-700">₹{changeAmount}</div></div>}
                                {amountTendered > 0 && amountTendered < cartTotal && <div className="mt-3 p-3 bg-red-100 rounded-lg text-center"><div className="text-sm text-red-600">Amount Short</div><div className="text-xl font-bold text-red-700">₹{cartTotal - amountTendered}</div></div>}
                            </div>
                        )}
                        <div className="flex gap-3">
                            <button onClick={onClose} className="flex-1 py-3 rounded-xl font-semibold bg-gray-100">Cancel</button>
                            <button onClick={onConfirm} disabled={paymentMethod === 'Cash' && amountTendered < cartTotal && amountTendered > 0} className="flex-1 py-3 rounded-xl font-semibold bg-gradient-to-r from-orange-500 to-red-500 text-white disabled:opacity-50">✓ Confirm</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
