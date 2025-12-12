'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useDbOrders, Order } from '../../lib/db-hooks';
import { ChefHeader, TicketCard, ItemView } from '../../components/chef';

export default function KitchenPage() {
    const { orders: allOrders, updateOrder } = useDbOrders();
    const [viewMode, setViewMode] = useState<'active' | 'history' | 'stats'>('active');
    const [currentTime, setCurrentTime] = useState(Date.now());
    const [isSoundEnabled, setIsSoundEnabled] = useState(true);
    const [isTVMode, setIsTVMode] = useState(false);
    const [orderTypeFilter, setOrderTypeFilter] = useState<'all' | 'dine-in' | 'takeaway'>('all');
    const [stationFilter, setStationFilter] = useState<'all' | 'tandoor' | 'chinese' | 'curry'>('all');

    // Modals state (placeholders for now)
    const [showPrepModal, setShowPrepModal] = useState(false);
    const [showWasteModal, setShowWasteModal] = useState(false);

    const prevOrderCountRef = useRef(0);

    // Filter Logic
    const filteredOrders = useMemo(() => {
        let orders = allOrders.filter(o => o.status === 'Pending' || o.status === 'Cooking');

        if (orderTypeFilter !== 'all') {
            if (orderTypeFilter === 'dine-in') {
                orders = orders.filter(o => o.type === 'DineIn');
            } else {
                orders = orders.filter(o => o.type === 'Takeaway' || o.type === 'Delivery');
            }
        }

        // Station filtering logic (filtering ITEMS within orders or flagging orders?)
        // For KDS, usually we filter orders that *contain* items from that station.
        // Or strictly show only items from that station.
        // For now, let's filter orders that have at least one item from the station?
        // Actually, simpler: in Item View it filters items. In Ticket View... it's tricky.
        // Let's implement naive text match on item names for now since we don't have explicit station mapping in DB yet.
        if (stationFilter !== 'all') {
            const keywords: Record<string, string[]> = {
                tandoor: ['tandoor', 'tikka', 'naan', 'roti', 'kebab'],
                chinese: ['noodles', 'manchurian', 'rice', 'soup', 'chilli'],
                curry: ['paneer', 'dal', 'kofta', 'masala', 'curry']
            };
            const matchWords = keywords[stationFilter] || [];
            orders = orders.filter(o => {
                const items = o.items as any[];
                return items.some(i => matchWords.some(w => i.name.toLowerCase().includes(w)));
            });
        }

        return orders.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }, [allOrders, orderTypeFilter, stationFilter]);

    // Timer Logic
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(Date.now()), 10000);
        return () => clearInterval(timer);
    }, []);

    // Sound Logic
    useEffect(() => {
        const playSound = () => {
            try {
                const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
                if (!AudioContext) return;
                const ctx = new AudioContext();
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = 'square';
                osc.frequency.setValueAtTime(600, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.5);
                gain.gain.setValueAtTime(0.3, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
                osc.start();
                osc.stop(ctx.currentTime + 0.5);
            } catch (e) { console.error(e); }
        };

        if (filteredOrders.length > prevOrderCountRef.current) {
            if (isSoundEnabled) playSound();
        }
        prevOrderCountRef.current = filteredOrders.length;
    }, [filteredOrders.length, isSoundEnabled]);

    // Item Aggregation
    const aggregatedItems = useMemo(() => {
        return filteredOrders.reduce((acc: { [key: string]: number }, order) => {
            const items = order.items as any[];
            if (Array.isArray(items)) {
                items.forEach((item) => {
                    // Apply station filter to items too if active
                    if (stationFilter !== 'all') {
                        const keywords: Record<string, string[]> = {
                            tandoor: ['tandoor', 'tikka', 'naan', 'roti', 'kebab'],
                            chinese: ['noodles', 'manchurian', 'rice', 'soup', 'chilli'],
                            curry: ['paneer', 'dal', 'kofta', 'masala', 'curry']
                        };
                        const matchWords = keywords[stationFilter] || [];
                        if (!matchWords.some(w => item.name.toLowerCase().includes(w))) return;
                    }

                    const name = item.name;
                    const qty = item.quantity || 1;
                    acc[name] = (acc[name] || 0) + qty;
                });
            }
            return acc;
        }, {});
    }, [filteredOrders, stationFilter]);

    const printKOT = (order: Order) => {
        const time = new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const itemsList = (order.items as any[]).map(i => `<div>□ ${i.quantity}x ${i.name}</div>`).join('');

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
                    ${time}<br>
                    ${order.type}
                </div>
                ${itemsList}
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
            <ChefHeader
                soundEnabled={isSoundEnabled}
                setSoundEnabled={setIsSoundEnabled}
                setIsTVMode={setIsTVMode}
                setShowPrepModal={setShowPrepModal}
                setShowWasteModal={setShowWasteModal}
                viewMode={viewMode}
                setViewMode={setViewMode}
                filter={orderTypeFilter}
                setFilter={setOrderTypeFilter}
                stationFilter={stationFilter}
                setStationFilter={setStationFilter}
                displayedCount={filteredOrders.length}
                onLogout={() => { }}
            />

            {/* Content using new viewMode logic from Header */}
            {/* Header uses 'active' | 'history' | 'stats'. Original code used 'tickets' | 'items' */}
            {/* Let's map 'active' to Ticket View and maybe add a toggle for Items within Active? */}
            {/* Or assume Active = Tickets and maybe Stats = Items? */}
            {/* Actually, let's keep it simple: Active Mode shows tickets. We need a secondary toggle for Item View if requested, 
               but ChefHeader has ViewMode which seems to replace the old toggle. 
               Let's interpret: 'active' -> Tickets, 'stats' -> Items (aggregated) for now, or just add the sub-toggle back if needed.
               Wait, ChefHeader has 'active', 'history', 'stats'. 
               Let's match: Active = Tickets. We can add a sub-toggle below header if we want "Active Items".
               But for now let's just use 'active' for Tickets. Where do Items go? 
               Maybe 'stats' shows the aggregated items view? That makes sense for "Production Stats".
            */}

            {filteredOrders.length === 0 && viewMode === 'active' ? (
                <div className="flex-1 flex flex-col items-center justify-center text-[var(--text-muted)] animate-in">
                    <div className="text-8xl mb-6 opacity-20">👨‍🍳</div>
                    <h2 className="text-2xl font-bold text-gray-400">All Caught Up!</h2>
                    <p className="text-gray-400">Kitchen is clear.</p>
                </div>
            ) : (
                <>
                    {viewMode === 'active' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in">
                            {filteredOrders.map(order => (
                                <TicketCard
                                    key={order.id}
                                    order={order}
                                    onUpdateStatus={(id, status) => updateOrder(id, { status })}
                                    onPrintKOT={printKOT}
                                    currentTime={currentTime}
                                />
                            ))}
                        </div>
                    )}

                    {viewMode === 'stats' && (
                        <ItemView items={aggregatedItems} />
                    )}

                    {viewMode === 'history' && (
                        <div className="text-center text-gray-500 mt-20">History view coming soon...</div>
                    )}
                </>
            )}
        </div>
    );
}
