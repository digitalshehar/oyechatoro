'use client';

import React from 'react';
import { Order } from '../../lib/db-hooks';

interface RecentOrdersModalProps {
    show: boolean;
    onClose: () => void;
    orders: Order[];
    onPrintReceipt: (order: Order) => void;
    onSettlePayment: (orderId: number, method: 'Cash' | 'Online') => void;
}

export default function RecentOrdersModal({ show, onClose, orders, onPrintReceipt, onSettlePayment }: RecentOrdersModalProps) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">🕒 Recent Orders</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-3">
                    {orders.length === 0 ? (
                        <div className="text-center text-gray-500 py-10">No recent orders today.</div>
                    ) : (
                        orders.map(order => (
                            <div key={order.id} className="border rounded-xl p-3 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors">
                                <div>
                                    <div className="flex gap-2 items-center mb-1">
                                        <span className="font-bold text-gray-800">#{order.id}</span>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                            order.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                                            }`}>{order.status}</span>
                                        <span className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleTimeString()}</span>
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {order.table && <span className="mr-2">🪑 {order.table}</span>}
                                        {order.type}
                                    </div>
                                    <div className="text-xs text-gray-500 truncate max-w-[200px]">
                                        {/* @ts-ignore */}
                                        {order.items?.map((i: any) => `${i.quantity}x ${i.name}`).join(', ')}
                                    </div>
                                    {/* Unpaid Badge */}
                                    {order.paymentStatus === 'Unpaid' && (
                                        <div className="mt-1">
                                            <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Unpaid (Pay Later)</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <div className="font-bold text-lg">₹{order.total}</div>
                                    <div className="flex gap-2">
                                        {order.paymentStatus === 'Unpaid' && order.status !== 'Cancelled' && (
                                            <button
                                                onClick={() => {
                                                    const method = prompt("Settle Payment via: Cash or Online?", "Cash");
                                                    if (method) {
                                                        // Normalize input slightly
                                                        const cleanMethod = method.toLowerCase().includes('online') || method.toLowerCase().includes('upi') ? 'Online' : 'Cash';
                                                        onSettlePayment(order.id, cleanMethod as 'Cash' | 'Online');
                                                    }
                                                }}
                                                className="px-3 py-1 bg-green-500 text-white shadow-sm rounded-lg text-xs font-semibold hover:bg-green-600 animate-pulse"
                                            >
                                                ✅ Settle
                                            </button>
                                        )}
                                        <button
                                            onClick={() => onPrintReceipt(order)}
                                            className="px-3 py-1 bg-white border shadow-sm rounded-lg text-xs font-semibold hover:bg-gray-50"
                                        >
                                            🖨 Print
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
