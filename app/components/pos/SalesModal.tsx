'use client';

import React from 'react';

interface SalesModalProps {
    show: boolean;
    onClose: () => void;
    totalRevenue: number;
    cashAmount: number;
    upiAmount: number;
    totalOrders: number;
}

export default function SalesModal({ show, onClose, totalRevenue, cashAmount, upiAmount, totalOrders }: SalesModalProps) {
    if (!show) return null;
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl" onClick={e => e.stopPropagation()}>
                <h3 className="text-xl font-bold mb-6">📊 Today's Sales</h3>
                <div className="space-y-4">
                    <div className="bg-orange-50 p-4 rounded-xl flex justify-between items-center">
                        <span className="text-gray-600">Total Revenue</span>
                        <span className="text-2xl font-bold text-orange-600">₹{totalRevenue}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-green-50 p-3 rounded-xl">
                            <div className="text-xs text-gray-500 mb-1">Cash</div>
                            <div className="text-lg font-bold text-green-600">₹{cashAmount}</div>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-xl">
                            <div className="text-xs text-gray-500 mb-1">Online/UPI</div>
                            <div className="text-lg font-bold text-blue-600">₹{upiAmount}</div>
                        </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl flex justify-between">
                        <span className="text-gray-600">Total Orders</span>
                        <span className="font-bold">{totalOrders}</span>
                    </div>
                </div>
                <button onClick={onClose} className="w-full mt-6 py-3 rounded-xl font-semibold bg-gray-100">Close</button>
            </div>
        </div>
    );
}
