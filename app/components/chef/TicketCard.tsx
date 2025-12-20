'use client';

import React, { useState, useEffect } from 'react';
import { Order } from '../../lib/db-hooks';
import ItemTimer from './ItemTimer';

interface TicketCardProps {
    order: Order;
    onUpdateStatus: (orderId: number, updates: Partial<Order>) => void;
    onPrintKOT: (order: Order) => void;
    currentTime: number;
    isHistory?: boolean;
    tvMode?: boolean;
    stationFilter?: string;
    getItemCategory?: (itemName: string) => string;
    isUpdated?: boolean;
    onClearUpdate?: (id: number) => void;
}

export default function TicketCard({
    order,
    onUpdateStatus,
    onPrintKOT,
    currentTime,
    isHistory = false,
    tvMode = false,
    stationFilter = 'all',
    getItemCategory,
    isUpdated = false,
    onClearUpdate
}: TicketCardProps) {
    const [callingWaiter, setCallingWaiter] = useState(false);

    const handleCallWaiter = async (method: 'portal' | 'whatsapp' = 'portal') => {
        setCallingWaiter(true);
        try {
            await fetch('/api/kitchen/comms', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId: order.id, action: 'call_waiter', message: method === 'whatsapp' ? 'Called via WhatsApp' : undefined })
            });
            onUpdateStatus(order.id, { waiterCalled: true });

            if (method === 'whatsapp') {
                const phone = '919509913792'; // Staff/Manager phone
                const message = encodeURIComponent(`👨‍🍳 *KITCHEN ALERT*\nOrder: #${order.id}\nTable: ${order.table || 'N/A'}\nType: ${order.type}\nStatus: ${order.status}\n\n*Please attend immediately!*`);
                window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
            }
        } catch (e) {
            console.error(e);
        } finally {
            setCallingWaiter(false);
        }
    };

    // Safety / Allergy Detection
    const items = order.items as any[];
    const itemNames = Array.isArray(items) ? items.map((i: any) => i.name).join(' ') : '';
    const noteText = (order.notes || '') + ' ' + (Array.isArray(items) ? items.map((i: any) => i.note || '').join(' ') : '') + ' ' + itemNames;
    const lowerNote = noteText.toLowerCase();

    const isAllergy = lowerNote.includes('allergy') || lowerNote.includes('allergic') || lowerNote.includes('peanut') || lowerNote.includes('nuts');
    const isJain = lowerNote.includes('jain') || (order.dietary && order.dietary.includes('Jain'));
    const isVegan = lowerNote.includes('vegan') || (order.dietary && order.dietary.includes('Vegan'));
    const isGlutenFree = lowerNote.includes('gluten free') || lowerNote.includes('gf');

    const [aiSafety, setAiSafety] = useState<any>(null);

    useEffect(() => {
        if (isAllergy && noteText.length > 5) {
            fetch('/api/kitchen/safety', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ note: noteText })
            })
                .then(res => res.json())
                .then(data => setAiSafety(data))
                .catch(console.error);
        }
    }, [isAllergy, noteText]);

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
        if (tvMode) {
            if (minutes < 10) return 'bg-gray-800 text-white border-gray-700';
            if (minutes < 20) return 'bg-yellow-900 text-yellow-100 border-yellow-700';
            return 'bg-red-900 text-red-100 border-red-700 animate-pulse';
        }
        if (isHistory) return 'bg-gray-100 text-gray-600 border-gray-200';
        if (minutes < 10) return 'bg-green-100 text-green-800 border-green-200';
        if (minutes < 20) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        return 'bg-red-100 text-red-800 border-red-200 animate-pulse';
    };

    const getBorderColor = (status: Order['status']) => {
        if (tvMode) {
            if (status === 'Pending') return 'border-yellow-700';
            if (status === 'Cooking') return 'border-blue-700';
            if (status === 'Ready') return 'border-green-700';
            return 'border-gray-700';
        }
        if (isHistory) return 'border-gray-200';
        if (status === 'Pending') return 'border-yellow-400';
        if (status === 'Cooking') return 'border-blue-500';
        if (status === 'Ready') return 'border-green-500';
        return 'border-gray-200';
    };

    const elapsed = getElapsedTime();
    let statusColor = getStatusColor(elapsed);

    if (isAllergy) {
        statusColor = tvMode ? 'bg-purple-900 text-purple-100 border-purple-500 animate-pulse ring-4 ring-purple-500'
            : 'bg-purple-100 text-purple-900 border-purple-500 animate-pulse ring-4 ring-purple-300';
    } else if (isJain) {
        statusColor = tvMode ? 'bg-green-900 text-green-100 border-green-500 border-l-8'
            : 'bg-green-50 text-green-900 border-green-500 border-l-8';
    }

    const timeStr = new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Auto-clear update status after 1 minute of interaction or immediately on click?
    // Let's provide a dismiss button or just clear on status change.
    // Actually, user wants to see it on top.

    return (
        <div
            className={`
                relative flex flex-col rounded-xl overflow-hidden transition-all duration-300
                ${tvMode ? 'bg-gray-800 text-white border-2 border-gray-700' : 'bg-white shadow-md border border-gray-100'}
                ${isHistory ? 'opacity-80' : ''}
                ${isUpdated ? 'ring-4 ring-blue-500 shadow-blue-200 scale-[1.02] z-10' : ''}
            `}
        >
            {isUpdated && (
                <div
                    className="absolute top-0 left-0 right-0 bg-blue-600 text-white text-center text-sm font-bold py-1 animate-pulse cursor-pointer z-20"
                    onClick={() => onClearUpdate && onClearUpdate(order.id)}
                >
                    UPDATED - NEW ITEMS ADDED (Click to Dismiss)
                </div>
            )}

            {/* Safety Banner */}
            {isAllergy && (
                <div className={`${tvMode ? 'py-4 text-3xl' : 'py-2 text-xl'} bg-red-600 text-white text-center font-black animate-pulse ring-4 ring-red-300 ring-inset uppercase tracking-tighter`}>
                    ⚠️ SEVERE ALLERGY ALERT ⚠️
                </div>
            )}

            {order.waiterCalled && (
                <div className={`${tvMode ? 'py-3 text-2xl' : 'py-1.5 text-sm'} bg-orange-500 text-white text-center font-black animate-pulse border-b border-orange-600 uppercase tracking-widest`}>
                    🛎️ Server Requested by Kitchen 🛎️
                </div>
            )}

            {aiSafety?.detected && (
                <div className={`text-white p-3 border-b text-center ${tvMode ? 'text-xl' : 'text-sm'} ${aiSafety.severity === 'High' ? 'bg-red-600 animate-pulse' : 'bg-purple-600'}`}>
                    <div className="font-black flex items-center justify-center gap-2">
                        <span>🚩 AI ALERT:</span>
                        <span className="uppercase">{aiSafety.summary}</span>
                    </div>
                    {aiSafety.allergies?.length > 0 && (
                        <div className="mt-1 flex flex-wrap justify-center gap-2">
                            {aiSafety.allergies.map((a: string) => (
                                <span key={a} className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-bold">🚫 {a}</span>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Card Header */}
            <div className={`p-4 flex justify-between items-start border-b ${statusColor} ${isUpdated ? 'pt-8' : ''}`}>
                <div className={`${tvMode ? 'p-6' : 'p-4'} border-b flex justify-between items-start bg-gray-50/50`}>
                    <div className="flex flex-col">
                        <span className={`${tvMode ? 'text-2xl' : 'text-lg'} font-black text-gray-900`}>#{order.id}</span>
                        <span className={`${tvMode ? 'text-lg' : 'text-xs'} text-gray-500 font-bold uppercase tracking-widest`}>{order.type}</span>
                    </div>
                    {/* Nutritional/Safety Icons */}
                    <div className="flex gap-2 items-center">
                        {isJain && (
                            <div className="flex flex-col items-center">
                                <span className="text-2xl" title="Jain (No Onion Garlic)">🥬</span>
                                <span className="text-[8px] font-black text-green-600 uppercase">JAIN</span>
                            </div>
                        )}
                        {isVegan && (
                            <div className="flex flex-col items-center">
                                <span className="text-2xl" title="Vegan">🌱</span>
                                <span className="text-[8px] font-black text-green-700 uppercase">VEGAN</span>
                            </div>
                        )}
                        {isAllergy && <span className="text-2xl animate-bounce" title="Allergy Warning">🥜</span>}
                        {isGlutenFree && (
                            <div className="bg-orange-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded shadow-sm">GF</div>
                        )}
                    </div>
                </div>
                <div className="text-right flex flex-col items-end gap-2">
                    <div className={`${tvMode ? 'text-4xl' : 'text-2xl'} font-bold leading-none`}>{elapsed}m</div>
                    <div className="flex gap-1">
                        <button
                            onClick={() => handleCallWaiter('portal')}
                            disabled={callingWaiter || order.waiterCalled}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all shadow-sm ${order.waiterCalled
                                ? 'bg-orange-500 text-white cursor-default'
                                : 'bg-white/80 hover:bg-orange-100 text-gray-700 hover:text-orange-700 border border-black/5 active:scale-95'
                                }`}
                        >
                            {callingWaiter ? '...' : order.waiterCalled ? 'Server ✓' : '🛎️ Call'}
                        </button>
                        {!tvMode && (
                            <button
                                onClick={() => handleCallWaiter('whatsapp')}
                                disabled={callingWaiter}
                                className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg text-[10px] font-black uppercase transition-all shadow-sm active:scale-95"
                                title="Call via WhatsApp"
                            >
                                💬 WA
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Items */}
            <div className="p-4 flex-1 space-y-3">
                {Array.isArray(items) && items.map((item: any, idx: number) => {
                    // Station Filtering Logic
                    const itemCat = getItemCategory ? getItemCategory(item.name) : '';
                    const isRelevant = stationFilter === 'all' || itemCat === stationFilter;
                    const opacityClass = isRelevant ? 'opacity-100' : 'opacity-20 grayscale';

                    return (
                        <div key={idx} className={`${tvMode ? 'p-4' : 'p-3'} bg-white border border-gray-100 rounded-xl shadow-sm flex justify-between items-center group transition-all hover:border-indigo-200`}>
                            <div className="flex items-center gap-3">
                                <span className={`${tvMode ? 'w-10 h-10 text-xl' : 'w-7 h-7 text-xs'} flex items-center justify-center bg-indigo-600 text-white font-black rounded-lg shadow-indigo-100 shadow-md`}>
                                    {item.quantity}
                                </span>
                                <span className={`${tvMode ? 'text-xl' : 'text-sm'} font-bold text-gray-800`}>{item.name}</span>
                            </div>
                            {!isHistory && !tvMode && (
                                <span className="ml-2 relative inline-block align-middle">
                                    <ItemTimer id={`${order.id}-${idx}`} />
                                </span>
                            )}
                            {item.modifiers && item.modifiers.length > 0 && (
                                <div className={`text-sm font-normal ${tvMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {item.modifiers.map((m: any) => `+ ${m.name}`).join(', ')}
                                </div>
                            )}
                            {item.note && <div className="text-sm font-normal text-red-600 bg-red-50 px-2 py-1 rounded mt-1 italic">Note: {item.note}</div>}
                        </div>
                    );
                })}
            </div>

            {/* Actions (Hidden in TV Mode mostly) */}
            {!tvMode && (
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
                                onClick={() => {
                                    const msg = prompt('Enter message for waiter (optional):', 'Please attend table');
                                    onUpdateStatus(order.id, {
                                        waiterCalled: !order.waiterCalled,
                                        notes: msg ? `${order.notes || ''}\n[CHEF]: ${msg}` : order.notes
                                    });
                                }}
                                className={`p-3 border rounded-xl transition-all ${order.waiterCalled ? 'bg-red-100 text-red-600 border-red-200 animate-pulse' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-100'}`}
                                title="Call Waiter"
                            >
                                {order.waiterCalled ? '🔔' : '🔕'}
                            </button>

                            {order.status === 'Pending' ? (
                                <button
                                    onClick={() => onUpdateStatus(order.id, { status: 'Cooking' })}
                                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-200 transition-all"
                                >
                                    Start Cooking
                                </button>
                            ) : order.status === 'Cooking' ? (
                                <button
                                    onClick={() => onUpdateStatus(order.id, { status: 'Ready' })}
                                    className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold shadow-lg shadow-green-200 transition-all"
                                >
                                    Mark Ready
                                </button>
                            ) : (
                                <button
                                    onClick={() => onUpdateStatus(order.id, { status: 'Completed' })}
                                    className="flex-1 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-xl font-bold shadow-lg transition-all"
                                >
                                    Complete & Client Serve
                                </button>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
