'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useDbOrders, Order, useDbMenu } from '../../lib/db-hooks';
import { ChefHeader, TicketCard, ItemView, PrepView } from '../../components/chef';

export default function KitchenPage() {
    const { orders: allOrders, updateOrder, refetch: refetchOrders } = useDbOrders();
    const { items: menuItems, categories } = useDbMenu();

    const [viewMode, setViewMode] = useState<'active' | 'history' | 'stats' | 'prep'>('active');
    const [currentTime, setCurrentTime] = useState(Date.now());
    const [isSoundEnabled, setIsSoundEnabled] = useState(true);
    const [isTVMode, setIsTVMode] = useState(false);
    const [orderTypeFilter, setOrderTypeFilter] = useState<'all' | 'dine-in' | 'takeaway'>('all');
    const [stationFilter, setStationFilter] = useState<string>('all');

    // History State
    const [historyOrders, setHistoryOrders] = useState<Order[]>([]);
    const [loadingHistory, setLoadingHistory] = useState(false);

    // Modals state (placeholders)
    const [showPrepModal, setShowPrepModal] = useState(false);
    const [showWasteModal, setShowWasteModal] = useState(false);

    const prevOrderCountRef = useRef(0);

    // Live Kitchen Polling (30s)
    useEffect(() => {
        const interval = setInterval(() => {
            if (viewMode === 'active') refetchOrders();
        }, 30000);
        return () => clearInterval(interval);
    }, [viewMode, refetchOrders]);

    // Timer Logic
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(Date.now()), 10000);
        return () => clearInterval(timer);
    }, []);

    // Fetch History when mode changes
    useEffect(() => {
        if (viewMode === 'history') {
            setLoadingHistory(true);
            fetch('/api/orders?status=Completed&limit=50')
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) setHistoryOrders(data);
                })
                .catch(err => console.error(err))
                .finally(() => setLoadingHistory(false));
        }
    }, [viewMode]);

    // Filter Logic
    const filteredOrders = useMemo(() => {
        // Source depends on mode
        let source = viewMode === 'history' ? historyOrders : allOrders.filter(o => o.status === 'Pending' || o.status === 'Cooking');

        // Sorting: Active = Oldest First (FIFO), History = Newest First
        source = source.sort((a, b) => {
            const timeA = new Date(a.createdAt).getTime();
            const timeB = new Date(b.createdAt).getTime();
            return viewMode === 'history' ? timeB - timeA : timeA - timeB;
        });

        if (orderTypeFilter !== 'all') {
            if (orderTypeFilter === 'dine-in') {
                source = source.filter(o => o.type === 'DineIn');
            } else {
                source = source.filter(o => o.type === 'Takeaway' || o.type === 'Delivery');
            }
        }

        // Dynamic Station Filtering
        if (stationFilter !== 'all') {
            const targetCatId = categories.find(c => c.name === stationFilter)?.id;
            if (targetCatId) {
                // Find all item names in this category
                const validNames = new Set(
                    menuItems
                        .filter(i => i.categoryId === targetCatId)
                        .map(i => i.name.toLowerCase())
                );

                source = source.filter(o => {
                    const items = o.items as any[];
                    // Keep order if ANY item belongs to this category
                    return items.some(i => validNames.has(i.name.toLowerCase()));
                });
            }
        }

        return source;
    }, [allOrders, historyOrders, viewMode, orderTypeFilter, stationFilter, categories, menuItems]);

    // Sound Logic (Only for Active View)
    useEffect(() => {
        const activeCount = allOrders.filter(o => o.status === 'Pending').length;

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

        if (activeCount > prevOrderCountRef.current) {
            if (isSoundEnabled) playSound();
        }
        prevOrderCountRef.current = activeCount;
    }, [allOrders, isSoundEnabled]);

    // Item Aggregation (Production View)
    const aggregatedItems = useMemo(() => {
        const activeOrders = allOrders.filter(o => o.status === 'Pending' || o.status === 'Cooking');

        return activeOrders.reduce((acc: { [key: string]: number }, order) => {
            const items = order.items as any[];
            if (Array.isArray(items)) {
                items.forEach((item) => {
                    // Apply station filter if needed
                    if (stationFilter !== 'all') {
                        const targetCatId = categories.find(c => c.name === stationFilter)?.id;
                        if (targetCatId) {
                            const itemDef = menuItems.find(m => m.name.toLowerCase() === item.name.toLowerCase());
                            if (!itemDef || itemDef.categoryId !== targetCatId) return;
                        }
                    }

                    const name = item.name;
                    const qty = item.quantity || 1;
                    acc[name] = (acc[name] || 0) + qty;
                });
            }
            return acc;
        }, {});
    }, [allOrders, stationFilter, categories, menuItems]);

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
                categories={categories.map(c => c.name)} // Pass dynamic categories
            />

            {filteredOrders.length === 0 && viewMode === 'active' ? (
                <div className="flex-1 flex flex-col items-center justify-center text-[var(--text-muted)] animate-in">
                    <div className="text-8xl mb-6 opacity-20">👨‍🍳</div>
                    <h2 className="text-2xl font-bold text-gray-400">All Caught Up!</h2>
                    <p className="text-gray-400">Kitchen is clear.</p>
                </div>
            ) : (
                <>
                    {(viewMode === 'active' || viewMode === 'history') && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in">
                            {filteredOrders.map(order => (
                                <TicketCard
                                    key={order.id}
                                    order={order}
                                    onUpdateStatus={(id, status) => updateOrder(id, { status })}
                                    onPrintKOT={printKOT}
                                    currentTime={currentTime}
                                    isHistory={viewMode === 'history'}
                                />
                            ))}
                        </div>
                    )}

                    {viewMode === 'stats' && (
                        <ItemView items={aggregatedItems} />
                    )}
                </>
            )}
        </div>
    );
}
