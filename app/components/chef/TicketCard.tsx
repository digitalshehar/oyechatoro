'use client';

import React, { useState, useEffect } from 'react';
import { Order } from '../../lib/db-hooks';

interface TicketCardProps {
    order: Order;
    onUpdateStatus: (orderId: number, status: Order['status']) => void;
    onPrintKOT: (order: Order) => void;
    currentTime: number;
    isHistory?: boolean;
}

export default function TicketCard({ order, onUpdateStatus, onPrintKOT, currentTime, isHistory = false }: TicketCardProps) {
    const getElapsedTime = () => {
        const created = new Date(order.createdAt).getTime();
        // If completed/ready, fixed time calculation might be better (e.g. from completedAt if exists, else just total duration)
        // For now, keep dynamic relative to currentTime to show "how long ago" or total duration.
        // If history, showing "Completed X mins ago" or just the Time is better.
        // Let's stick to simple elapsed for Active, and just Time for History.

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
        if (isHistory) return 'bg-gray-100 text-gray-600 border-gray-200'; // Grey for history
        if (minutes < 10) return 'bg-green-100 text-green-800 border-green-200';
        if (minutes < 20) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        return 'bg-red-100 text-red-800 border-red-200 animate-pulse';
    };

    const elapsed = getElapsedTime();
    // basic status color
    let statusColor = getStatusColor(elapsed);

    // Safety / Allergy Detection
    const noteText = (order.notes || '') + ' ' + (Array.isArray(order.items) ? order.items.map((i: any) => i.note || '').join(' ') : '');
    const lowerNote = noteText.toLowerCase();

    // Keywords
    const isAllergy = lowerNote.includes('allergy') || lowerNote.includes('allergic');
    const isJain = lowerNote.includes('jain') || (order.dietary && order.dietary.includes('Jain'));
    const isVegan = lowerNote.includes('vegan') || (order.dietary && order.dietary.includes('Vegan'));

    // Override colors for safety
    if (isAllergy) {
        statusColor = 'bg-purple-100 text-purple-900 border-purple-500 animate-pulse ring-4 ring-purple-300';
    } else if (isJain) {
        statusColor = 'bg-green-50 text-green-900 border-green-500 border-l-8';
    }

    const timeStr = new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const items = order.items as any[];

    return (
        <div className={`bg-white rounded-2xl shadow-sm border-2 flex flex-col overflow-hidden transition-all hover:shadow-md ${isAllergy ? 'border-purple-600 scale-105 z-10' : (isHistory ? 'border-gray-200 opacity-90' : (order.status === 'Pending' ? 'border-yellow-400' : 'border-blue-500'))}`}>

            {/* Safety Banner */}
            {isAllergy && (
                <div className="bg-purple-600 text-white text-center font-bold text-sm py-1 animate-pulse">
                    ⚠️ ALLERGY ALERT ⚠️
                </div>
            )}

            {/* Card Header */}
            <div className={`p-4 flex justify-between items-start border-b ${statusColor}`}>
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-lg">#{order.id}</span>
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-white/50 rounded">{order.type}</span>
                    </div>
                    <div className="flex gap-1 mt-1">
                        {isJain && <span className="text-[10px] font-bold bg-green-200 text-green-800 px-1.5 py-0.5 rounded border border-green-300">🟢 JAIN</span>}
                        {isVegan && <span className="text-[10px] font-bold bg-green-200 text-green-800 px-1.5 py-0.5 rounded border border-green-300">🌱 VEGAN</span>}
                    </div>
                    <div className="text-xs font-mono opacity-80 mt-1">{timeStr}</div>
                </div>
                <div className="text-right">
                    {!isHistory && <div className="text-2xl font-bold leading-none">{elapsed}m</div>}
                    <div className="text-[10px] uppercase font-bold opacity-80">{order.status}</div>
                </div>
            </div>

            {/* Special Instructions / Notes Highlighting */}
            {order.notes && (
                <div className={`px-4 py-2 text-sm font-bold border-b flex items-start gap-2 ${isAllergy ? 'bg-purple-50 text-purple-800' : 'bg-yellow-50 text-yellow-800'}`}>
                    <span>📝</span>
                    <span>{order.notes}</span>
                </div>
            )}

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
                            {item.note && <div className="text-sm font-normal text-red-600 bg-red-50 px-2 py-1 rounded mt-1 italic">Note: {item.note}</div>}
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

                {!isHistory && (
                    <>
                        <button
                            onClick={() => onUpdateStatus(order.id, { waiterCalled: !order.waiterCalled } as any)}
                            className={`p-3 border rounded-xl transition-all ${order.waiterCalled ? 'bg-red-100 text-red-600 border-red-200 animate-pulse' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-100'}`}
                            title="Call Waiter"
                        >
                            {order.waiterCalled ? '🔔' : '🔕'}
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
                    </>
                )}

                {isHistory && (
                    <div className="flex-1 py-3 text-center font-bold text-gray-400 bg-gray-100 rounded-xl">
                        Completed
                    </div>
                )}
            </div>
        </div>
    );
}
