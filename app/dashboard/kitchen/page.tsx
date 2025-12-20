'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useDbOrders, Order, useDbMenu } from '../../lib/db-hooks';
import { getSocket } from '../../lib/socket';
import { ChefHeader, TicketCard, ItemView, PrepView, ShiftLogView } from '../../components/chef';

export default function KitchenPage() {
    const { orders: allOrders, updateOrder, refetch: refetchOrders } = useDbOrders();
    const { items: menuItems, categories, updateItem } = useDbMenu();

    const [viewMode, setViewMode] = useState<'new' | 'active' | 'history' | 'stats' | 'prep' | 'logs'>('new');
    const [currentTime, setCurrentTime] = useState(Date.now());
    const [isSoundEnabled, setIsSoundEnabled] = useState(true);

    useEffect(() => {
        const saved = localStorage.getItem('chef_sound_enabled');
        if (saved !== null) setIsSoundEnabled(saved === 'true');
    }, []);

    const toggleSound = (val: boolean) => {
        setIsSoundEnabled(val);
        localStorage.setItem('chef_sound_enabled', val.toString());
    };
    const [isTVMode, setIsTVMode] = useState(false);
    const [orderTypeFilter, setOrderTypeFilter] = useState<'all' | 'dine-in' | 'takeaway'>('all');
    const [stationFilter, setStationFilter] = useState<string>('all');

    // History State
    const [historyOrders, setHistoryOrders] = useState<Order[]>([]);
    const [loadingHistory, setLoadingHistory] = useState(false);
    const [updatedOrderIds, setUpdatedOrderIds] = useState<Set<number>>(new Set());

    // Modals state (placeholders)
    const [showPrepModal, setShowPrepModal] = useState(false);
    const [showWasteModal, setShowWasteModal] = useState(false);

    const prevOrderCountRef = useRef(0);

    // Live Kitchen Polling (30s)
    useEffect(() => {
        const interval = setInterval(() => {
            if (viewMode === 'active' || viewMode === 'new') refetchOrders();
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
        let source = allOrders;

        if (viewMode === 'history') {
            source = historyOrders;
        } else if (viewMode === 'new') {
            source = allOrders.filter(o => o.status === 'Pending' || updatedOrderIds.has(o.id));
        } else if (viewMode === 'active') {
            source = allOrders.filter(o => o.status === 'Cooking' || o.status === 'Ready');
        } else {
            // Other modes might not use this list, but safe fallback
            source = allOrders.filter(o => o.status === 'Pending' || o.status === 'Cooking');
        }

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

    // Enhanced Sound Helper with Voice
    const playSound = (type: 'new' | 'update' = 'new') => {
        if (!isSoundEnabledRef.current) return;

        try {
            // 1. Premium "Ding-Dong" Tone using AudioContext
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioContext) {
                const ctx = new AudioContext();

                const playNote = (freq: number, start: number, duration: number) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
                    gain.gain.setValueAtTime(0, ctx.currentTime + start);
                    gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + start + 0.1);
                    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + start + duration);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(ctx.currentTime + start);
                    osc.stop(ctx.currentTime + start + duration);
                };

                // Play a double chime for new orders
                playNote(880, 0, 0.4); // A5
                if (type === 'new') playNote(1108.73, 0.15, 0.6); // C#6
            }

            // 2. Voice Announcement (Hinglish / Brand Voice)
            if ('speechSynthesis' in window) {
                // Cancel any ongoing speech
                window.speechSynthesis.cancel();

                const text = type === 'new'
                    ? "Oye Chatoro! You have a new order."
                    : "Chef, an order has been updated.";

                const utterance = new SpeechSynthesisUtterance(text);
                utterance.pitch = 1.1;
                utterance.rate = 0.95;
                utterance.volume = 1.0;

                // Try to find a premium/clean voice
                const voices = window.speechSynthesis.getVoices();
                const preferredVoice = voices.find(v => (v.lang.includes('IN') || v.lang.includes('GB')) && v.name.includes('Google'))
                    || voices.find(v => v.lang.includes('en'));

                if (preferredVoice) utterance.voice = preferredVoice;

                window.speechSynthesis.speak(utterance);
            }
        } catch (e) {
            console.error('Audio notification failed:', e);
        }
    };

    // Sound Logic for NEW Orders (Pending count increase)
    useEffect(() => {
        const activeCount = allOrders.filter(o => o.status === 'Pending').length;

        if (activeCount > prevOrderCountRef.current) {
            playSound('new');
        }
        prevOrderCountRef.current = activeCount;
    }, [allOrders, isSoundEnabled]);

    // Ref for sound enabled to access inside socket listener without re-binding
    const isSoundEnabledRef = useRef(isSoundEnabled);
    useEffect(() => {
        isSoundEnabledRef.current = isSoundEnabled;
    }, [isSoundEnabled]);

    // Separate Socket Listener for Updates to avoid re-binding
    useEffect(() => {
        const socket = getSocket();

        const handleOrderUpdate = (updatedOrder: Order) => {
            // Add to updated set if it's an active order or pending
            if (updatedOrder.status === 'Pending' || updatedOrder.status === 'Cooking' || updatedOrder.status === 'Ready') {
                playSound('update');
                setUpdatedOrderIds(prev => {
                    const next = new Set(prev);
                    next.add(updatedOrder.id);
                    return next;
                });
            }
        };

        socket.on('order-updated', handleOrderUpdate);

        return () => {
            socket.off('order-updated', handleOrderUpdate);
        };
    }, []); // Empty dependency array = Single bind

    // Sound effect for updates (derived from state change to avoid dependency in socket listener)
    useEffect(() => {
        if (updatedOrderIds.size > 0 && isSoundEnabled) {
            // Play sound logic again? Or just make a playSound function accessible.
            // We can just rely on the fact that adding to Set triggers re-render, 
            // but we want the sound to play ONCE on event.

            // ALternative: Let the listener dispatch a custom event or use a Ref for isSoundEnabled.
        }
    }, [updatedOrderIds, isSoundEnabled]); // This might play on dismiss? No, only on add.

    // We need 'playSound' available. Let's extract playSound to a helper or useCallback.


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

    // Helper for Stock Control
    const handleUpdateItem = async (id: string, updates: any) => {
        const item = menuItems.find(i => i.id === id);
        if (!item) return;

        // We need to pass the full item merged with updates, because saveItem expects a MenuItem object
        // and uses its ID to determine route.
        const updatedItem = { ...item, ...updates };
        await updateItem(updatedItem);
    };

    return (
        <div className={`h-full flex flex-col min-h-screen ${isTVMode ? 'bg-black text-white p-0' : 'bg-gray-50 p-4'}`}>
            {!isTVMode && (
                <ChefHeader
                    {...{
                        soundEnabled: isSoundEnabled, setSoundEnabled: toggleSound,
                        setIsTVMode, setShowPrepModal, setShowWasteModal,
                        viewMode, setViewMode, filter: orderTypeFilter, setFilter: setOrderTypeFilter,
                        stationFilter, setStationFilter, displayedCount: filteredOrders.length,
                        onLogout: () => console.log('logout'), categories: categories.map(c => c.name),
                        newOrderCount: allOrders.filter(o => o.status === 'Pending' || updatedOrderIds.has(o.id)).length,
                        onTestSound: () => playSound('new'),
                        hasHighAllergy: allOrders.some(o => (o.status === 'Pending' || o.status === 'Cooking') && ((o.notes || '').toLowerCase().includes('allergy') || (o.notes || '').toLowerCase().includes('allergic')))
                    }}
                />
            )}

            {isTVMode && (
                <div className="flex justify-between items-center p-4 bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
                    <h1 className="text-4xl font-bold text-yellow-500">
                        {stationFilter === 'all' ? 'MASTER KITCHEN VIEW' : `${stationFilter.toUpperCase()} STATION`}
                    </h1>
                    <div className="flex items-center gap-6">
                        <div className="text-2xl font-mono text-gray-300">
                            {new Date(currentTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <div className="text-xl font-bold bg-gray-800 px-4 py-2 rounded-lg">
                            PENDING: <span className="text-red-500">{filteredOrders.length}</span>
                        </div>
                        <button
                            onClick={() => setIsTVMode(false)}
                            className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded text-xl font-bold"
                        >
                            EXIT TV MODE
                        </button>
                    </div>
                </div>
            )}


            {/* NEW ORDER ALERT BOX */}
            {!isTVMode && (
                (() => {
                    const alertOrders = allOrders.filter(o => o.status === 'Pending' || updatedOrderIds.has(o.id));

                    if (alertOrders.length === 0) return null;

                    return (
                        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-l-8 border-orange-500 rounded-r-xl p-4 mb-6 mx-4 md:mx-0 shadow-sm animate-pulse flex items-center justify-between">
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-orange-800 flex items-center gap-2">
                                    ⚠️ NEW / UPDATED ORDERS
                                    <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">{alertOrders.length}</span>
                                </h3>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {alertOrders.map(o => (
                                        <div key={o.id} className="inline-flex flex-col bg-white px-3 py-2 rounded-lg shadow-sm border border-orange-200 text-sm">
                                            <div className="flex justify-between items-center border-b border-gray-100 pb-1 mb-1">
                                                <span className="font-bold text-gray-600">#{o.id}</span>
                                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${o.status === 'Pending' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                                                    {o.status === 'Pending' ? 'NEW' : 'UPDATED'}
                                                </span>
                                            </div>
                                            <span className="font-bold text-gray-800">
                                                {(o.items as any[]).map(i => `${i.quantity}x ${i.name}`).join(', ')}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="text-4xl ml-4">🔔</div>
                        </div>
                    );
                })()
            )}

            <div className={isTVMode ? "p-4 grid grid-cols-4 gap-4" : ""}>
                {filteredOrders.length === 0 && (viewMode === 'active' || viewMode === 'new') ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-[var(--text-muted)] animate-in min-h-[50vh]">
                        <div className="text-8xl mb-6 opacity-20">👨‍🍳</div>
                        <h2 className="text-2xl font-bold text-gray-400">All Caught Up!</h2>
                        <p className="text-gray-400">Kitchen is clear.</p>
                    </div>
                ) : (
                    <>
                        {(viewMode === 'active' || viewMode === 'history' || viewMode === 'new') && (
                            <div className={isTVMode ? "contents" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in"}>
                                {filteredOrders.map(order => (
                                    <TicketCard
                                        key={order.id}
                                        order={order}
                                        onUpdateStatus={(id, updates) => updateOrder(id, updates)}
                                        onPrintKOT={printKOT}
                                        currentTime={currentTime}
                                        isHistory={viewMode === 'history'}
                                        tvMode={isTVMode}
                                        stationFilter={stationFilter}
                                        getItemCategory={(name: string) => {
                                            const item = menuItems.find(i => i.name.toLowerCase() === name.toLowerCase());
                                            const cat = categories.find(c => c.id === item?.categoryId);
                                            return cat?.name || '';
                                        }}
                                        isUpdated={updatedOrderIds.has(order.id)}
                                        onClearUpdate={(id) => setUpdatedOrderIds(prev => {
                                            const next = new Set(prev);
                                            next.delete(id);
                                            return next;
                                        })}
                                    />
                                ))}
                            </div>
                        )}

                        {!isTVMode && viewMode === 'stats' && (
                            <ItemView
                                items={aggregatedItems}
                                menuItems={menuItems}
                                onUpdateItem={handleUpdateItem}
                                categories={categories}
                            />
                        )}

                        {!isTVMode && viewMode === 'prep' && (
                            <PrepView currentStation={stationFilter} />
                        )}

                        {!isTVMode && viewMode === 'logs' && (
                            <ShiftLogView />
                        )}
                    </>
                )}
            </div>
        </div >
    );
}
