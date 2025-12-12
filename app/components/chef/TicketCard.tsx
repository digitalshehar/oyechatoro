'use client';

import React, { useState, useEffect } from 'react';
import { Order } from '../../lib/db-hooks';

interface TicketCardProps {
    order: Order;
    onUpdateStatus: (orderId: number, status: Order['status']) => void;
    onPrintKOT: (order: Order) => void;
    currentTime: number;
}

export default function TicketCard({ order, onUpdateStatus, onPrintKOT, currentTime }: TicketCardProps) {
    const getElapsedTime = () => {
        const created = new Date(order.createdAt).getTime();
        if (order.status === 'Pending') {
            const diff = currentTime - created;
            return Math.floor(diff / 60000);
        }
        if (order.status === 'Cooking' && order.cookingStartedAt) {
            const started = new Date(order.cookingStartedAt).getTime();
            const diff = currentTime - started;
            return Math.floor(diff / 60000);
        }
        const diff = currentTime - created;
        return Math.floor(diff / 60000);
    };

    const getStatusColor = (minutes: number) => {
        if (minutes < 10) return 'bg-green-100 text-green-800 border-green-200';
        if (minutes < 20) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        return 'bg-red-100 text-red-800 border-red-200 animate-pulse';
    };

    const elapsed = getElapsedTime();
    const statusColor = getStatusColor(elapsed);
    const timeStr = new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const items = order.items as any[];

    return (
        <div className={`bg-white rounded-2xl shadow-sm border-2 flex flex-col overflow-hidden transition-all hover:shadow-md ${order.status === 'Pending' ? 'border-yellow-400' : 'border-blue-500'}`}>
            {/* Card Header */}
            <div className={`p-4 flex justify-between items-start border-b ${statusColor}`}>
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-lg">#{order.id}</span>
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-white/50 rounded">{order.type}</span>
                    </div>
                    <div className="text-xs font-mono opacity-80">{timeStr}</div>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-bold leading-none">{elapsed}m</div>
                    <div className="text-[10px] uppercase font-bold opacity-80">{order.status === 'Cooking' ? 'Cooking' : 'Waiting'}</div>
                </div>
            </div>

            {/* Items */}
            <div className="p-4 flex-1 space-y-3">
                {Array.isArray(items) && items.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-start gap-3 text-lg font-bold text-gray-800">
                        <span className="mt-1.5 w-2 h-2 rounded-full bg-gray-300 shrink-0"></span>
                        <span className="leading-tight">
                            {item.quantity}x {item.name}
                            {item.modifiers && item.modifiers.length > 0 && (
                                <div className="text-sm font-normal text-gray-500">
                                    {item.modifiers.map((m: any) => `+ ${m.name}`).join(', ')}
                                </div>
                            )}
                            {item.note && <div className="text-sm font-normal text-red-500 italic">Note: {item.note}</div>}
                        </span>
                    </div>
                ))}
            </div>

            {/* Actions */}
            <div className="p-4 bg-gray-50 border-t flex gap-2">
                <button
                    onClick={() => onPrintKOT(order)}
                    className="p-3 bg-white border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-100"
                    title="Print KOT"
                >
                    🖨️
                </button>
                {order.status === 'Pending' ? (
                    <button
                        onClick={() => onUpdateStatus(order.id, 'Cooking')}
                        className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-200 transition-all"
                    >
                        Start Cooking
                    </button>
                ) : (
                    <button
                        onClick={() => onUpdateStatus(order.id, 'Ready')}
                        className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold shadow-lg shadow-green-200 transition-all"
                    >
                        Mark Ready
                    </button>
                )}
            </div>
        </div>
    );
}
