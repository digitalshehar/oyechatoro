'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useOrders, usePrepList } from '../lib/storage';

export default function ChefPage() {
    const router = useRouter();
    const { orders, updateStatus, toggleWaiterCall } = useOrders();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [filter, setFilter] = useState<'all' | 'dine-in' | 'takeaway'>('all');
    const [stationFilter, setStationFilter] = useState<'all' | 'tandoor' | 'chinese' | 'curry'>('all');
    const [viewMode, setViewMode] = useState<'active' | 'history' | 'stats'>('active');
    const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});
    const [currentTime, setCurrentTime] = useState(new Date());
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [isTVMode, setIsTVMode] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null);
    const [showWasteModal, setShowWasteModal] = useState(false);
    const [wasteLog, setWasteLog] = useState<{ item: string, reason: string, count: number }[]>([]);
    const { prepList, togglePrepItem } = usePrepList();
    const [showPrepModal, setShowPrepModal] = useState(false);

    // Mock Recipe Data
    const RECIPES: Record<string, { ingredients: string[], steps: string[] }> = {
        'Butter Chicken': {
            ingredients: ['Chicken', 'Butter', 'Tomato Puree', 'Cream', 'Spices'],
            steps: ['Marinate chicken', 'Grill chicken', 'Prepare gravy', 'Mix and simmer']
        },
        'Paneer Tikka': {
            ingredients: ['Paneer', 'Yogurt', 'Spices', 'Capsicum', 'Onion'],
            steps: ['Cut paneer cubes', 'Marinate', 'Skewer with veggies', 'Grill in tandoor']
        },
        'Hakka Noodles': {
            ingredients: ['Noodles', 'Cabbage', 'Carrot', 'Soy Sauce', 'Vinegar'],
            steps: ['Boil noodles', 'Stir fry veggies', 'Toss noodles with sauces', 'Garnish']
        }
    };

    // ... existing code ...

    const callWaiter = (orderId: number, currentStatus?: boolean) => {
        const newStatus = !currentStatus;
        toggleWaiterCall(orderId, newStatus);

        if (newStatus) {
            const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
            if (soundEnabled) audio.play().catch(e => console.log(e));
        }
    };

    // ... existing code ...



    // Mock Leaderboard Data
    const LEADERBOARD = [
        { name: 'Chef Rahul', orders: 42, badge: '🔥' },
        { name: 'Chef Amit', orders: 38, badge: '👨‍🍳' },
        { name: 'Chef Priya', orders: 35, badge: '⭐' },
    ];

    const getStation = (item: string | { name?: string }) => {
        // Handle item being object or string
        const itemStr = typeof item === 'string' ? item : (item?.name || '');
        const lower = itemStr.toLowerCase();
        if (lower.includes('tikka') || lower.includes('naan') || lower.includes('tandoor')) return 'tandoor';
        if (lower.includes('noodle') || lower.includes('rice') || lower.includes('manchurian')) return 'chinese';
        return 'curry';
    };

    useEffect(() => {
        const role = localStorage.getItem('role');
        if (role !== 'chef' && role !== 'admin') {
            router.push('/chef/login');
        } else {
            setIsAuthorized(true);
        }

        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, [router]);

    // Sound Alert Logic
    const latestOrderTimeRef = useRef<number>(0);
    const isFirstRun = useRef(true);

    useEffect(() => {
        const pendingOrdersList = orders.filter(o => o.status === 'Pending');

        // Find the latest creation time among pending orders
        const maxCreatedAt = pendingOrdersList.reduce((max, o) => Math.max(max, o.createdAt || 0), 0);

        // Initialize on first run
        if (isFirstRun.current) {
            latestOrderTimeRef.current = maxCreatedAt;
            isFirstRun.current = false;
            return;
        }

        // Only play sound if:
        // 1. We have a NEWER order (timestamp > previous max)
        // 2. Sound is enabled
        // 3. The new order is RECENT (created within last 30 seconds)
        if (maxCreatedAt > latestOrderTimeRef.current && soundEnabled) {
            const isRecent = (Date.now() - maxCreatedAt) < 30000;
            if (isRecent) {
                const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
                audio.play().catch(e => console.log('Audio play failed', e));
            }
        }

        latestOrderTimeRef.current = maxCreatedAt;
    }, [orders, soundEnabled]);

    const toggleItem = (orderId: number, itemIdx: number) => {
        const key = `${orderId}-${itemIdx}`;
        setCompletedItems(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const logWaste = (item: string, reason: string) => {
        setWasteLog(prev => [...prev, { item, reason, count: 1 }]);
        setShowWasteModal(false);
        alert(`Logged waste: ${item} (${reason})`);
    };

    const getOrderColor = (timeStr: string, status: string) => {
        if (status !== 'Pending') return 'border-blue-500/50 shadow-blue-500/10';
        try {
            const [time, modifier] = timeStr.split(' ');
            let [hours, minutes] = time.split(':').map(Number);
            if (modifier === 'PM' && hours < 12) hours += 12;
            if (modifier === 'AM' && hours === 12) hours = 0;
            const orderDate = new Date();
            orderDate.setHours(hours, minutes, 0);
            const diffMs = currentTime.getTime() - orderDate.getTime();
            const diffMins = Math.floor(diffMs / 60000);
            if (diffMins > 20) return 'border-red-500 shadow-red-500/20 animate-pulse';
            if (diffMins > 10) return 'border-yellow-500 shadow-yellow-500/20';
            return 'border-green-500/50 shadow-green-500/10';
        } catch (e) { return 'border-gray-700'; }
    };

    const getTimeAgo = (timeStr: string) => {
        try {
            const [time, modifier] = timeStr.split(' ');
            let [hours, minutes] = time.split(':').map(Number);
            if (modifier === 'PM' && hours < 12) hours += 12;
            if (modifier === 'AM' && hours === 12) hours = 0;
            const orderDate = new Date();
            orderDate.setHours(hours, minutes, 0);
            const diffMs = currentTime.getTime() - orderDate.getTime();
            const diffMins = Math.floor(diffMs / 60000);
            if (diffMins < 0) return 'Just now';
            return `${diffMins}m ago`;
        } catch (e) { return timeStr; }
    };

    if (!isAuthorized) return null;

    const displayedOrders = orders
        .filter(o => {
            if (viewMode === 'active' || viewMode === 'stats') return o.status === 'Pending' || o.status === 'Cooking';
            return o.status === 'Ready' || o.status === 'Completed';
        })
        .filter(o => {
            if (filter === 'all') return true;
            return o.type.toLowerCase() === filter;
        })
        .filter(o => {
            if (stationFilter === 'all') return true;
            return o.items.some(item => getStation(item) === stationFilter);
        })
        .sort((a, b) => {
            if (viewMode === 'active') return a.id - b.id;
            return b.id - a.id;
        });

    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === 'Pending').length;
    const completedCount = orders.filter(o => o.status === 'Ready' || o.status === 'Completed').length;
    const avgTime = "18 mins";

    return (
        <div className={`min-h-screen bg-gray-900 text-white font-sans transition-all ${isTVMode ? 'p-0' : 'p-2 md:p-6 pb-20 md:pb-6'}`}>

            {/* Header */}
            {!isTVMode && (
                <div className="sticky top-0 z-20 bg-gray-900/95 backdrop-blur-sm pb-4 pt-2 -mx-2 px-2 md:mx-0 md:px-0 md:static md:bg-transparent md:p-0 md:mb-8">
                    <div className="bg-gray-800 p-3 md:p-4 rounded-2xl border border-gray-700 shadow-xl flex flex-col md:flex-row justify-between gap-3 md:gap-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="text-2xl md:text-4xl bg-gray-700 p-1.5 md:p-2 rounded-xl">👨‍🍳</div>
                                <div>
                                    <h1 className="text-lg md:text-2xl font-bold text-orange-500 leading-tight">Chef Portal</h1>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => setSoundEnabled(!soundEnabled)} className={`text-xs px-2 py-0.5 rounded-full border ${soundEnabled ? 'bg-green-500/20 border-green-500 text-green-400' : 'bg-gray-700 border-gray-600 text-gray-400'}`}>{soundEnabled ? '🔔' : '🔕'}</button>
                                        <button onClick={() => setIsTVMode(true)} className="text-xs px-2 py-0.5 rounded-full border bg-purple-500/20 border-purple-500 text-purple-400">📺 TV Mode</button>
                                        <button onClick={() => setShowPrepModal(true)} className="text-xs px-2 py-0.5 rounded-full border bg-blue-500/20 border-blue-500 text-blue-400">📋 Prep List</button>
                                        <button onClick={() => setShowWasteModal(true)} className="text-xs px-2 py-0.5 rounded-full border bg-red-500/20 border-red-500 text-red-400">🗑️ Waste</button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 md:hidden">
                                <span className="font-bold text-white text-lg bg-gray-700 px-3 py-1.5 rounded-lg">{displayedOrders.length}</span>
                                <button onClick={() => { localStorage.removeItem('role'); router.push('/chef/login'); }} className="p-2 bg-red-500/10 text-red-400 rounded-lg">🚪</button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 w-full md:w-auto">
                            <div className="flex bg-gray-700 p-1 rounded-xl w-full">
                                {['active', 'history', 'stats'].map(mode => (
                                    <button key={mode} onClick={() => setViewMode(mode as any)} className={`flex-1 px-3 py-1.5 rounded-lg text-xs md:text-sm font-bold capitalize ${viewMode === mode ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>{mode}</button>
                                ))}
                            </div>
                            <div className="flex gap-2 overflow-x-auto pb-1">
                                <select value={filter} onChange={(e) => setFilter(e.target.value as any)} className="bg-gray-700 text-white text-xs md:text-sm rounded-lg px-3 py-2 border-none outline-none font-bold">
                                    <option value="all">All Types</option>
                                    <option value="dine-in">Dine-in</option>
                                    <option value="takeaway">Takeaway</option>
                                </select>
                                <select value={stationFilter} onChange={(e) => setStationFilter(e.target.value as any)} className="bg-gray-700 text-white text-xs md:text-sm rounded-lg px-3 py-2 border-none outline-none font-bold">
                                    <option value="all">All Stations</option>
                                    <option value="tandoor">Tandoor 🔥</option>
                                    <option value="chinese">Chinese 🥢</option>
                                    <option value="curry">Curry 🥘</option>
                                </select>
                            </div>
                        </div>

                        <div className="hidden md:flex items-center gap-4">
                            <div className="text-right">
                                <div className="text-2xl font-bold">{displayedOrders.length}</div>
                                <div className="text-xs text-gray-400 uppercase">Count</div>
                            </div>
                            <button onClick={() => { localStorage.removeItem('role'); router.push('/chef/login'); }} className="px-4 py-2 bg-red-500/20 text-red-400 rounded-xl font-bold text-sm">Logout</button>
                        </div>
                    </div>
                </div>
            )}

            {isTVMode && (
                <div className="bg-black p-4 flex justify-between items-center border-b-4 border-orange-500 mb-4 sticky top-0 z-50">
                    <h1 className="text-5xl font-bold text-white">👨‍🍳 KITCHEN DISPLAY</h1>
                    <div className="flex gap-8">
                        <div className="text-4xl font-bold text-yellow-400">PENDING: {pendingOrders}</div>
                        <button onClick={() => setIsTVMode(false)} className="bg-gray-800 px-6 py-2 rounded-xl text-2xl">❌ Exit TV</button>
                    </div>
                </div>
            )}

            {/* Stats & Leaderboard View */}
            {viewMode === 'stats' && !isTVMode ? (
                <div className="space-y-6 animate-in">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
                            <h3 className="text-gray-400 uppercase text-sm font-bold mb-2">Total Orders Today</h3>
                            <div className="text-5xl font-bold text-white">{totalOrders}</div>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
                            <h3 className="text-gray-400 uppercase text-sm font-bold mb-2">Avg Prep Time</h3>
                            <div className="text-5xl font-bold text-blue-400">{avgTime}</div>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
                            <h3 className="text-gray-400 uppercase text-sm font-bold mb-2">Completion Rate</h3>
                            <div className="text-5xl font-bold text-green-400">{totalOrders > 0 ? Math.round((completedCount / totalOrders) * 100) : 0}%</div>
                        </div>
                    </div>

                    {/* Leaderboard */}
                    <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
                        <h3 className="text-orange-500 uppercase text-lg font-bold mb-4 flex items-center gap-2">🏆 Top Chefs Today</h3>
                        <div className="space-y-3">
                            {LEADERBOARD.map((chef, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl font-bold text-gray-500">#{i + 1}</span>
                                        <div>
                                            <div className="font-bold text-lg">{chef.name}</div>
                                            <div className="text-xs text-gray-400">{chef.badge} Expert Chef</div>
                                        </div>
                                    </div>
                                    <div className="text-xl font-bold text-white">{chef.orders} Orders</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className={`grid gap-4 ${isTVMode ? 'grid-cols-4 gap-6' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}`}>
                    {displayedOrders.map((order) => {
                        const hasAllergy = order.dietary?.some(tag => ['nut-allergy', 'gluten-free', 'vegan', 'dairy-free'].includes(tag));
                        return (
                            <div key={order.id} className={`relative flex flex-col rounded-2xl border-2 transition-all duration-300 bg-gray-800 ${getOrderColor(order.time, order.status)} ${hasAllergy ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-pulse' : ''} ${isTVMode ? 'p-6 scale-100' : 'p-4 md:p-5'}`}>
                                {hasAllergy && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-10 flex items-center gap-1">
                                        <span>⚠️ ALLERGY ALERT</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-start mb-3 pb-3 border-b border-gray-700">
                                    <div>
                                        <span className={`font-bold uppercase tracking-wider px-2 py-1 rounded-md ${order.type === 'Dine-in' ? 'bg-purple-500/20 text-purple-300' : 'bg-teal-500/20 text-teal-300'} ${isTVMode ? 'text-xl' : 'text-[10px]'}`}>{order.type}</span>
                                        <h3 className={`font-bold text-white mt-2 ${isTVMode ? 'text-5xl' : 'text-2xl md:text-3xl'}`}>#{order.id}</h3>
                                        {order.table && <div className={`text-orange-400 font-bold mt-1 ${isTVMode ? 'text-2xl' : 'text-xs md:text-sm'}`}>Table: {order.table}</div>}
                                        {order.waiterName && <div className={`text-gray-400 font-medium ${isTVMode ? 'text-xl' : 'text-xs'}`}>Server: {order.waiterName}</div>}
                                        {order.dietary && order.dietary.length > 0 && (
                                            <div className="flex gap-1 mt-1">
                                                {order.dietary.map(tag => (
                                                    <span key={tag} className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-gray-700 text-gray-300 border border-gray-600">
                                                        {tag === 'veg' ? '🥬' : tag === 'spicy' ? '🌶️' : tag === 'nut-allergy' ? '🥜' : tag === 'gluten-free' ? '🌾' : tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-right flex flex-col items-end">
                                        <div className={`font-mono font-bold text-gray-200 ${isTVMode ? 'text-3xl' : 'text-lg md:text-xl'}`}>{order.time}</div>
                                        <div className={`text-gray-400 font-medium mb-2 ${isTVMode ? 'text-xl' : 'text-[10px] md:text-xs'}`}>{getTimeAgo(order.time)}</div>
                                        {!isTVMode && (
                                            <button
                                                onClick={(e) => { e.stopPropagation(); callWaiter(order.id, order.waiterCalled); }}
                                                className={`text-xs px-2 py-1 rounded-lg font-bold transition-all ${order.waiterCalled ? 'bg-green-500 text-white animate-pulse' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}
                                            >
                                                {order.waiterCalled ? '✅ Waiter Called' : '🔔 Call Waiter'}
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Custom Note */}
                                {(order.id === 1 || order.id === 124) && (
                                    <div className="mb-3 bg-red-500/10 border border-red-500/30 p-2 rounded-lg">
                                        <p className="text-red-400 font-bold text-xs uppercase">📝 Note:</p>
                                        <p className="text-red-200 text-sm font-bold">NO ONION, EXTRA SPICY 🌶️</p>
                                    </div>
                                )}

                                <div className="space-y-2 mb-4 flex-1">
                                    {order.items.map((item, idx) => {
                                        const isCompleted = completedItems[`${order.id}-${idx}`];
                                        const station = getStation(item);
                                        if (stationFilter !== 'all' && station !== stationFilter) return null;

                                        return (
                                            <div key={idx} onClick={() => {
                                                if (RECIPES[item]) setSelectedRecipe(item);
                                                else if (viewMode === 'active') toggleItem(order.id, idx);
                                            }} className={`flex items-start gap-3 p-2 rounded-lg transition-colors ${viewMode === 'active' ? 'cursor-pointer hover:bg-gray-700' : ''} ${isCompleted ? 'bg-gray-700/50 opacity-50' : ''}`}>
                                                <div className={`mt-1 rounded border flex items-center justify-center transition-colors ${isCompleted ? 'bg-green-500 border-green-500' : 'border-gray-500'} ${isTVMode ? 'w-8 h-8' : 'w-4 h-4 md:w-5 md:h-5'}`}>
                                                    {isCompleted && <span className={`text-black font-bold ${isTVMode ? 'text-xl' : 'text-[10px]'}`}>✓</span>}
                                                </div>
                                                <div className="flex-1">
                                                    <span className={`font-medium ${isCompleted ? 'line-through text-gray-400' : 'text-gray-200'} ${isTVMode ? 'text-3xl' : 'text-base md:text-lg'}`}>{item}</span>
                                                    {RECIPES[item] && <span className="ml-2 text-[10px] bg-gray-600 px-1 rounded text-gray-300">ℹ️ Recipe</span>}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {viewMode === 'active' && !isTVMode && (
                                    <div className="mt-auto pt-3 border-t border-gray-700">
                                        {order.status === 'Pending' ? (
                                            <div className="grid grid-cols-2 gap-2">
                                                <button onClick={() => alert('Out of Stock!')} className="py-3 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-xl font-bold text-sm md:text-base">🚫 Stock</button>
                                                <button onClick={() => updateStatus(order.id, 'Cooking')} className="py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 active:scale-95 flex items-center justify-center gap-2 text-sm md:text-base"><span>Cook</span> <span>🔥</span></button>
                                            </div>
                                        ) : (
                                            <button onClick={() => updateStatus(order.id, 'Ready')} className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold shadow-lg shadow-green-600/20 active:scale-95 flex items-center justify-center gap-2 text-sm md:text-base"><span>Mark Ready</span> <span>✅</span></button>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Recipe Modal */}
            {selectedRecipe && RECIPES[selectedRecipe] && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setSelectedRecipe(null)}>
                    <div className="bg-gray-800 p-6 rounded-2xl max-w-md w-full border border-gray-700" onClick={e => e.stopPropagation()}>
                        <h2 className="text-2xl font-bold text-orange-500 mb-4">{selectedRecipe}</h2>
                        <div className="mb-4">
                            <h3 className="text-sm font-bold text-gray-400 uppercase mb-2">Ingredients</h3>
                            <div className="flex flex-wrap gap-2">
                                {RECIPES[selectedRecipe].ingredients.map(ing => (
                                    <span key={ing} className="bg-gray-700 px-2 py-1 rounded text-sm">{ing}</span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-gray-400 uppercase mb-2">Steps</h3>
                            <ol className="list-decimal list-inside space-y-1 text-gray-300">
                                {RECIPES[selectedRecipe].steps.map((step, i) => (
                                    <li key={i}>{step}</li>
                                ))}
                            </ol>
                        </div>
                        <button onClick={() => setSelectedRecipe(null)} className="mt-6 w-full py-3 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold">Close</button>
                    </div>
                </div>
            )}

            {/* Waste Modal */}
            {showWasteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setShowWasteModal(false)}>
                    <div className="bg-gray-800 p-6 rounded-2xl max-w-sm w-full border border-gray-700" onClick={e => e.stopPropagation()}>
                        <h2 className="text-2xl font-bold text-red-500 mb-4">🗑️ Log Waste</h2>
                        <div className="space-y-4">
                            <p className="text-gray-300">Select reason for waste:</p>
                            <div className="grid grid-cols-2 gap-3">
                                {['Burnt', 'Dropped', 'Expired', 'Wrong Order'].map(reason => (
                                    <button key={reason} onClick={() => logWaste('Generic Item', reason)} className="p-3 bg-gray-700 hover:bg-red-500/20 hover:border-red-500 border border-transparent rounded-xl font-bold transition-all">
                                        {reason}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <button onClick={() => setShowWasteModal(false)} className="mt-6 w-full py-3 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold">Cancel</button>
                    </div>
                </div>
            )}

            {/* Prep List Modal */}
            {
                showPrepModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setShowPrepModal(false)}>
                        <div className="bg-gray-800 p-6 rounded-2xl max-w-md w-full border border-gray-700 h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
                            <h2 className="text-2xl font-bold text-blue-400 mb-4 flex items-center gap-2">📋 Daily Prep List</h2>
                            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                                {['Vegetable Prep', 'Tandoor', 'Pizza Station', 'Safety'].map(station => {
                                    const items = prepList.filter(i => i.station === station);
                                    if (items.length === 0) return null;
                                    return (
                                        <div key={station}>
                                            <h3 className="text-gray-400 uppercase text-xs font-bold mb-2 sticky top-0 bg-gray-800 py-1">{station}</h3>
                                            <div className="space-y-2">
                                                {items.map(item => (
                                                    <div key={item.id} onClick={() => togglePrepItem(item.id)} className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${item.completed ? 'bg-green-500/10 border-green-500/30' : 'bg-gray-700/50 border-gray-600 hover:bg-gray-700'}`}>
                                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${item.completed ? 'bg-green-500 border-green-500' : 'border-gray-500'}`}>
                                                            {item.completed && <span className="text-black text-xs font-bold">✓</span>}
                                                        </div>
                                                        <span className={`font-medium ${item.completed ? 'text-gray-400 line-through' : 'text-white'}`}>{item.task}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <button onClick={() => setShowPrepModal(false)} className="mt-4 w-full py-3 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold">Close Checklist</button>
                        </div>
                    </div>
                )
            }
        </div >
    );
}
