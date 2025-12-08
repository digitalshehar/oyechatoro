'use client';

import React from 'react';

interface OnlineOrderModalProps {
    show: boolean;
    onClose: () => void;
    customer: { name: string; phone: string; address: string };
    setCustomer: (v: { name: string; phone: string; address: string }) => void;
    onStartOrder: () => void;
}

export default function OnlineOrderModal({ show, onClose, customer, setCustomer, onStartOrder }: OnlineOrderModalProps) {
    if (!show) return null;
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
                <h3 className="text-xl font-bold mb-4">📞 Online/Phone Order</h3>
                <p className="text-sm text-gray-500 mb-4">Customer details for delivery/pickup</p>
                <div className="space-y-3">
                    <input type="text" placeholder="👤 Customer Name *" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border focus:border-orange-500 outline-none" />
                    <input type="tel" placeholder="📱 Phone Number *" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl border focus:border-orange-500 outline-none" />
                    <textarea placeholder="🏠 Delivery Address (if delivery)" value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} className="w-full px-4 py-3 rounded-xl border focus:border-orange-500 outline-none resize-none" rows={3} />
                </div>
                <div className="flex gap-3 mt-6">
                    <button onClick={onClose} className="flex-1 py-3 rounded-xl font-semibold bg-gray-100">Cancel</button>
                    <button onClick={onStartOrder} className="flex-1 py-3 rounded-xl font-semibold bg-gradient-to-r from-teal-500 to-green-500 text-white">Start Order →</button>
                </div>
            </div>
        </div>
    );
}
