'use client';

import React from 'react';
import Image from 'next/image';

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    veg: boolean;
    image?: string;
    note?: string;
}

interface CartViewProps {
    cart: CartItem[];
    tableNumber: string;
    setTableNumber: (v: string) => void;
    orderType: 'Dine In' | 'Takeaway' | 'Delivery';
    selectedStaff: string;
    onStaffChange: (staff: string) => void;
    staffList: string[];
    onAddToCart: (item: any) => void;
    onRemoveFromCart: (id: string) => void;
    onUpdateNote: (id: string, note: string) => void;
    editingNoteId: string | null;
    setEditingNoteId: (id: string | null) => void;
    subtotal: number;
    discountAmount: number;
    parcelAmount: number;
    taxAmount: number;
    tipAmount: number;
    cartTotal: number;
    cartCount: number;
    discountType: 'percent' | 'flat';
    discountValue: number;
    setDiscountType: (v: 'percent' | 'flat') => void;
    setDiscountValue: (v: number) => void;
    parcelCharge: boolean;
    setParcelCharge: (v: boolean) => void;
    setTipAmount: (v: number) => void;
    parcelChargeAmount: number;
    onCheckout: (method: 'Cash' | 'UPI' | 'Card') => void;
    onSplitBill: () => void;
    onPrint: () => void;
    onHold: () => void;
    onClear: () => void;
    onKOT: () => void;
    kotPrinted: boolean;
    onCustomerSearch: () => void;
    selectedCustomer: { name: string } | null;
    orderNotes: string;
    setOrderNotes: (v: string) => void;
    orderTypeIsDineIn: boolean;
}

export default function CartView({
    cart, tableNumber, setTableNumber, orderType, selectedStaff, onStaffChange, staffList,
    onAddToCart, onRemoveFromCart, onUpdateNote, editingNoteId, setEditingNoteId,
    subtotal, discountAmount, parcelAmount, taxAmount, tipAmount, cartTotal, cartCount,
    discountType, discountValue, setDiscountType, setDiscountValue,
    parcelCharge, setParcelCharge, setTipAmount, parcelChargeAmount,
    onCheckout, onSplitBill, onPrint, onHold, onClear, onKOT, kotPrinted,
    onCustomerSearch, selectedCustomer, orderNotes, setOrderNotes, orderTypeIsDineIn
}: CartViewProps) {
    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-3 border-b bg-gradient-to-r from-gray-50 to-gray-100">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-bold text-gray-800">🛒 Current Order</h2>
                    <div className="flex gap-1">
                        {cart.length > 0 && (
                            <>
                                <button onClick={onKOT} className={`px-2 py-1 rounded text-xs font-semibold ${kotPrinted ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                    {kotPrinted ? '✓ KOT' : '🍳 KOT'}
                                </button>
                                <button onClick={onHold} className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs font-semibold">⏸️ Hold</button>
                                <button onClick={onClear} className="px-2 py-1 bg-red-100 text-red-600 rounded text-xs font-semibold">🗑️</button>
                            </>
                        )}
                    </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                    {orderTypeIsDineIn && (
                        <input type="text" placeholder="🪑 Table #" value={tableNumber} onChange={(e) => setTableNumber(e.target.value)} className="w-20 px-2 py-1.5 rounded-lg border text-xs" />
                    )}
                    <select value={selectedStaff} onChange={(e) => onStaffChange(e.target.value)} className={`px-2 py-1.5 rounded-lg border text-xs ${!selectedStaff ? 'animate-pulse border-red-400' : ''}`}>
                        <option value="">👤 Staff</option>
                        {staffList.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <button onClick={onCustomerSearch} className={`px-2 py-1.5 rounded-lg text-xs font-semibold ${selectedCustomer ? 'bg-green-100 text-green-600' : 'bg-gray-100'}`}>
                        {selectedCustomer ? `✓ ${selectedCustomer.name.split(' ')[0]}` : '👤 Customer'}
                    </button>
                </div>
                <input type="text" placeholder="📝 Order notes..." value={orderNotes} onChange={(e) => setOrderNotes(e.target.value)} className="w-full mt-2 px-2 py-1.5 rounded-lg border text-xs" />
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                        <span className="text-5xl mb-3">🛒</span>
                        <p className="font-semibold text-sm">Cart is empty</p>
                    </div>
                ) : (
                    cart.map(item => (
                        <div key={item.id} className="p-2 bg-gray-50 rounded-xl">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-lg bg-gray-200 overflow-hidden relative flex-shrink-0">
                                    {item.image ? <Image src={item.image} alt={item.name} fill className="object-cover" sizes="40px" /> : <div className="w-full h-full flex items-center justify-center text-lg">🥘</div>}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-xs text-gray-800 truncate">{item.name}</h4>
                                    <p className="text-orange-600 font-bold text-xs">₹{item.price}</p>
                                </div>
                                <div className="flex items-center gap-1 bg-white rounded-lg border p-0.5">
                                    <button onClick={() => onRemoveFromCart(item.id)} className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded font-bold text-sm">−</button>
                                    <span className="w-5 text-center font-semibold text-xs">{item.quantity}</span>
                                    <button onClick={() => onAddToCart(item)} className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded font-bold text-sm">+</button>
                                </div>
                                <div className="font-bold text-gray-800 w-12 text-right text-xs">₹{item.price * item.quantity}</div>
                            </div>
                            {editingNoteId === item.id ? (
                                <input type="text" placeholder="Add note..." defaultValue={item.note || ''} autoFocus onBlur={(e) => onUpdateNote(item.id, e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') onUpdateNote(item.id, (e.target as HTMLInputElement).value); }} className="w-full mt-1 px-2 py-1 rounded border text-xs" />
                            ) : (
                                <button onClick={() => setEditingNoteId(item.id)} className="mt-1 text-xs text-gray-400 hover:text-orange-500">{item.note ? `✏️ ${item.note}` : '+ Add Note'}</button>
                            )}
                        </div>
                    ))
                )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
                <div className="border-t p-3 bg-gradient-to-b from-gray-50 to-gray-100 space-y-2">
                    <div className="flex gap-2 items-center">
                        <select value={discountType} onChange={(e) => setDiscountType(e.target.value as any)} className="px-2 py-1.5 rounded-lg border text-xs"><option value="percent">%</option><option value="flat">₹</option></select>
                        <input type="number" placeholder="Discount" value={discountValue || ''} onChange={(e) => setDiscountValue(Number(e.target.value))} className="w-16 px-2 py-1.5 rounded-lg border text-xs" />
                        <button onClick={() => setDiscountValue(10)} className="px-2 py-1.5 bg-green-100 text-green-600 rounded-lg text-xs font-semibold">10%</button>
                        <button onClick={() => setDiscountValue(20)} className="px-2 py-1.5 bg-green-100 text-green-600 rounded-lg text-xs font-semibold">20%</button>
                        {!orderTypeIsDineIn && (
                            <button onClick={() => setParcelCharge(!parcelCharge)} className={`px-2 py-1.5 rounded-lg text-xs font-semibold ${parcelCharge ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>📦 +₹{parcelChargeAmount}</button>
                        )}
                    </div>
                    <div className="flex gap-2 items-center">
                        <span className="text-xs text-gray-500">💝 Tip:</span>
                        {[20, 50, 100].map(t => <button key={t} onClick={() => setTipAmount(t)} className={`px-2 py-1 rounded text-xs ${tipAmount === t ? 'bg-pink-500 text-white' : 'bg-pink-100 text-pink-600'}`}>₹{t}</button>)}
                        <input type="number" placeholder="Custom" value={tipAmount || ''} onChange={(e) => setTipAmount(Number(e.target.value))} className="w-16 px-2 py-1 rounded border text-xs" />
                        {tipAmount > 0 && <button onClick={() => setTipAmount(0)} className="text-xs text-red-500">✕</button>}
                    </div>
                    <div className="space-y-1 text-xs bg-white rounded-lg p-2">
                        <div className="flex justify-between text-gray-600"><span>Subtotal ({cartCount})</span><span>₹{subtotal}</span></div>
                        {discountAmount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-₹{discountAmount}</span></div>}
                        {parcelAmount > 0 && <div className="flex justify-between text-blue-600"><span>Parcel</span><span>+₹{parcelAmount}</span></div>}
                        <div className="flex justify-between text-gray-600"><span>GST (5%)</span><span>₹{taxAmount}</span></div>
                        {tipAmount > 0 && <div className="flex justify-between text-pink-600"><span>Tip</span><span>+₹{tipAmount}</span></div>}
                        <div className="flex justify-between text-xl font-bold text-gray-800 pt-2 border-t"><span>Total</span><span className="text-orange-600">₹{cartTotal}</span></div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        {(['Cash', 'UPI', 'Card'] as const).map(m => (
                            <button key={m} onClick={() => onCheckout(m)} className="py-2.5 rounded-xl font-semibold text-xs bg-gradient-to-r from-orange-500 to-red-500 text-white">
                                {m === 'Cash' && '💵'} {m === 'UPI' && '📱'} {m === 'Card' && '💳'} {m}
                            </button>
                        ))}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <button onClick={onSplitBill} className="py-2 rounded-xl font-semibold text-xs bg-purple-100 text-purple-600">✂️ Split</button>
                        <button onClick={onPrint} className="py-2 rounded-xl font-semibold text-xs bg-gray-100 text-gray-600">🖨️ Print</button>
                    </div>
                </div>
            )}
        </div>
    );
}
