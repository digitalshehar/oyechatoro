'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useOrders } from '../../lib/storage';

export default function KitchenPage() {
    const { orders, updateStatus } = useOrders();
    const [viewMode, setViewMode] = useState<'tickets' | 'items'>('tickets');
    const [currentTime, setCurrentTime] = useState(Date.now());
    const [isSoundEnabled, setIsSoundEnabled] = useState(true);
    const prevOrderCountRef = useRef(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Filter for active orders (Pending or Cooking)
    const activeOrders = orders.filter(o => o.status === 'Pending' || o.status === 'Cooking').sort((a, b) => a.id - b.id);

    // --- Timer Logic ---
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(Date.now()), 10000); // Update every 10s
        return () => clearInterval(timer);
    }, []);

    const getElapsedTime = (order: any) => {
        if (order.status === 'Pending') {
            // For pending orders, maybe show "Waiting" or time since placed
            const diff = currentTime - order.id; // Fallback to ID as timestamp
            return Math.floor(diff / 60000);
        }
        if (order.status === 'Cooking' && order.cookingStartedAt) {
            const diff = currentTime - order.cookingStartedAt;
            return Math.floor(diff / 60000);
        }
        return 0;
    };

    const getStatusColor = (minutes: number) => {
        if (minutes < 10) return 'bg-green-100 text-green-800 border-green-200';
        if (minutes < 20) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        return 'bg-red-100 text-red-800 border-red-200 animate-pulse';
    };

    // --- Sound Logic ---
    useEffect(() => {
        // Initialize Audio Context on first interaction if needed, or just use simple Audio for now
        // Using the same robust AudioContext method as Orders page
        const playSound = () => {
            try {
                const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
                if (!AudioContext) return;
                const ctx = new AudioContext();
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = 'square'; // harsher sound for kitchen
                osc.frequency.setValueAtTime(600, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.5);
                gain.gain.setValueAtTime(0.3, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
                osc.start();
                osc.stop(ctx.currentTime + 0.5);
            } catch (e) { console.error(e); }
        };

        if (activeOrders.length > prevOrderCountRef.current) {
            if (isSoundEnabled) playSound();
        }
        prevOrderCountRef.current = activeOrders.length;
    }, [activeOrders.length, isSoundEnabled]);

    // --- Item Aggregation Logic ---
    const aggregatedItems = activeOrders.reduce((acc: { [key: string]: number }, order) => {
        order.items.forEach((item: string) => {
            // Clean item name (remove existing qty if present, though usually stored as "Name")
            // Assuming item string is just "Name" or "Name (Qty)"
            // For this logic, we'll just count the raw strings or try to parse
            acc[item] = (acc[item] || 0) + 1;
        });
        return acc;
    }, {});

    // --- KOT Print ---
    const printKOT = (order: any) => {
        const content = `
            <html>
            <head>
                <title>KOT #${order.id}</title>
                <style>
                    body { font-family: monospace; padding: 20px; max-width: 300px; }
                    .header { font-size: 20px; font-weight: bold; text-align: center; margin-bottom: 10px; }
                    .meta { font-size: 14px; margin-bottom: 20px; border-bottom: 2px solid #000; padding-bottom: 10px; }
                    .item { font-size: 18px; font-weight: bold; margin-bottom: 10px; }
                </style>
            </head>
            <body>
                <div class="header">KITCHEN TICKET</div>
                <div class="meta">
                    #${order.id}<br>
                    ${order.time}<br>
                    ${order.type}
                </div>
                ${order.items.map((item: string) => `<div class="item">□ ${item}</div>`).join('')}
                <script>window.print();</script>
            </body>
            </html>
        `;
        const win = window.open('', '', 'width=300,height=600');
        if (win) {
            win.document.write(content);
            win.document.close();
        }
    };

    return (
        <div className="p-4 h-full flex flex-col min-h-screen bg-gray-50">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 animate-in">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--brand-dark)]">👨‍🍳 Kitchen Display</h1>
                    <p className="text-[var(--text-muted)]">Live Order Tracking</p>
                </div>

                <div className="flex gap-4 items-center">
                    {/* View Toggle */}
                    <div className="bg-white p-1 rounded-xl border border-gray-200 flex">
                        <button
                            onClick={() => setViewMode('tickets')}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'tickets' ? 'bg-[var(--brand-primary)] text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            🎫 Tickets
                        </button>
                        <button
                            onClick={() => setViewMode('items')}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'items' ? 'bg-[var(--brand-primary)] text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            🍔 Items
                        </button>
                    </div>

                    {/* Sound Toggle */}
                    <button
                        onClick={() => setIsSoundEnabled(!isSoundEnabled)}
                        className={`p-3 rounded-xl border transition-colors ${isSoundEnabled ? 'bg-white text-[var(--brand-primary)] border-[var(--brand-primary)]' : 'bg-gray-100 text-gray-400 border-gray-200'}`}
                    >
                        {isSoundEnabled ? '🔔' : '🔕'}
                    </button>

                    {/* Active Count */}
                    <div className="bg-[var(--brand-dark)] text-white px-6 py-2 rounded-xl text-center">
                        <div className="text-2xl font-bold leading-none">{activeOrders.length}</div>
                        <div className="text-[10px] uppercase tracking-wider opacity-80">Pending</div>
                    </div>
                </div>
            </div>

            {/* Content */}
            {activeOrders.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-[var(--text-muted)] animate-in">
                    <div className="text-8xl mb-6 opacity-20">👨‍🍳</div>
                    <h2 className="text-2xl font-bold text-gray-400">All Caught Up!</h2>
                    <p className="text-gray-400">Kitchen is clear.</p>
                </div>
            ) : (
                <>
                    {viewMode === 'tickets' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in">
                            {activeOrders.map((order) => {
                                const elapsed = getElapsedTime(order);
                                const statusColor = getStatusColor(elapsed);

                                return (
                                    <div key={order.id} className={`bg-white rounded-2xl shadow-sm border-2 flex flex-col overflow-hidden transition-all hover:shadow-md ${order.status === 'Pending' ? 'border-yellow-400' : 'border-blue-500'}`}>
                                        {/* Card Header */}
                                        <div className={`p-4 flex justify-between items-start border-b ${statusColor}`}>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-bold text-lg">#{order.id.toString().slice(-4)}</span>
                                                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-white/50 rounded">{order.type}</span>
                                                </div>
                                                <div className="text-xs font-mono opacity-80">{order.time}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-bold leading-none">{elapsed}m</div>
                                                <div className="text-[10px] uppercase font-bold opacity-80">{order.status === 'Cooking' ? 'Cooking' : 'Waiting'}</div>
                                            </div>
                                        </div>

                                        {/* Items */}
                                        <div className="p-4 flex-1 space-y-3">
                                            {order.items.map((item: string, idx: number) => (
                                                <div key={idx} className="flex items-start gap-3 text-lg font-bold text-gray-800">
                                                    <span className="mt-1.5 w-2 h-2 rounded-full bg-gray-300 shrink-0"></span>
                                                    <span className="leading-tight">{item}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Actions */}
                                        <div className="p-4 bg-gray-50 border-t flex gap-2">
                                            <button
                                                onClick={() => printKOT(order)}
                                                className="p-3 bg-white border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-100"
                                                title="Print KOT"
                                            >
                                                🖨️
                                            </button>
                                            {order.status === 'Pending' ? (
                                                <button
                                                    onClick={() => updateStatus(order.id, 'Cooking')}
                                                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-200 transition-all"
                                                >
                                                    Start Cooking
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => updateStatus(order.id, 'Ready')}
                                                    className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold shadow-lg shadow-green-200 transition-all"
                                                >
                                                    Mark Ready
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 animate-in">
                            {Object.entries(aggregatedItems).map(([item, count]) => (
                                <div key={item} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-all">
                                    <div className="text-5xl font-bold text-[var(--brand-primary)] mb-2">{count}</div>
                                    <div className="text-lg font-bold text-gray-800 leading-tight">{item}</div>
                                    <div className="mt-4 text-xs text-gray-400 uppercase tracking-wider font-bold">To Prepare</div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
