'use client';

import React from 'react';

interface ChefHeaderProps {
    soundEnabled: boolean;
    setSoundEnabled: (v: boolean) => void;
    setIsTVMode: (v: boolean) => void;
    setShowPrepModal: (v: boolean) => void;
    setShowWasteModal: (v: boolean) => void;
    viewMode: 'new' | 'active' | 'history' | 'stats' | 'prep' | 'logs';
    setViewMode: (mode: 'new' | 'active' | 'history' | 'stats' | 'prep' | 'logs') => void;
    filter: 'all' | 'dine-in' | 'takeaway';
    setFilter: (v: 'all' | 'dine-in' | 'takeaway') => void;
    stationFilter: string;
    setStationFilter: (v: string) => void;
    displayedCount: number;
    onLogout: () => void;
    categories?: string[];
    newOrderCount?: number;
    onTestSound?: () => void;
}

export default function ChefHeader({
    soundEnabled, setSoundEnabled, setIsTVMode, setShowPrepModal, setShowWasteModal,
    viewMode, setViewMode, filter, setFilter, stationFilter, setStationFilter, displayedCount, onLogout, categories = [], newOrderCount = 0, onTestSound
}: ChefHeaderProps) {
    return (
        <div className="sticky top-0 z-20 bg-gray-50/95 backdrop-blur-sm pb-4 pt-2 -mx-2 px-2 md:mx-0 md:px-0 md:static md:bg-transparent md:p-0 md:mb-6">
            <div className="bg-white p-2 md:p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between gap-2 md:gap-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 md:gap-3">
                        <div className="text-xl md:text-4xl bg-gray-700 p-1.5 md:p-2 rounded-xl flex items-center justify-center">👨‍🍳</div>
                        <div>
                            <h1 className="text-base md:text-2xl font-bold text-orange-500 leading-tight">Chef Portal</h1>
                            <div className="flex items-center gap-1 md:gap-2 mt-0.5">
                                <button onClick={() => setSoundEnabled(!soundEnabled)} className={`text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 rounded-full border ${soundEnabled ? 'bg-green-500/20 border-green-500 text-green-600' : 'bg-gray-100 border-gray-300 text-gray-400'}`}>{soundEnabled ? '🔔' : '🔕'}</button>
                                {soundEnabled && onTestSound && (
                                    <button onClick={onTestSound} className="text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 rounded-full border bg-orange-500/10 border-orange-500 text-orange-600 font-bold hover:bg-orange-500 hover:text-white transition-colors">TEST</button>
                                )}
                                <button onClick={() => setIsTVMode(true)} className="text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 rounded-full border bg-purple-500/20 border-purple-500 text-purple-600">📺 TV</button>
                                <button onClick={() => setShowPrepModal(true)} className="text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 rounded-full border bg-blue-500/20 border-blue-500 text-blue-600">📋 Prep</button>
                                <button onClick={() => setShowWasteModal(true)} className="text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 rounded-full border bg-red-500/20 border-red-500 text-red-600">🗑️</button>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 md:hidden">
                        <span className="font-bold text-gray-700 text-base bg-gray-100 px-2.5 py-1 rounded-lg border border-gray-200">{displayedCount}</span>
                        <button onClick={onLogout} className="p-2 bg-red-50 text-red-600 rounded-lg border border-red-100">🚪</button>
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-full md:w-auto">
                    <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
                        <button
                            onClick={() => setViewMode('new')}
                            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-3 md:px-6 py-2 rounded-lg font-bold transition-all text-xs md:text-sm ${viewMode === 'new' ? 'bg-yellow-500 text-white shadow-md' : 'text-gray-500 hover:bg-gray-200'}`}
                        >
                            NEW
                            {newOrderCount > 0 && (
                                <span className={`flex items-center justify-center w-4 h-4 md:w-5 md:h-5 rounded-full text-[10px] md:text-xs ${viewMode === 'new' ? 'bg-white text-yellow-600' : 'bg-red-500 text-white'}`}>
                                    {newOrderCount}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={() => setViewMode('active')}
                            className={`flex-1 md:flex-none px-3 md:px-6 py-2 rounded-lg font-bold transition-all text-xs md:text-sm ${viewMode === 'active' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-200'}`}
                        >
                            COOKING
                        </button>
                        <button
                            onClick={() => setViewMode('history')}
                            className={`flex-1 md:flex-none px-3 md:px-6 py-2 rounded-lg font-bold transition-all text-xs md:text-sm ${viewMode === 'history' ? 'bg-gray-700 text-white shadow-md' : 'text-gray-500 hover:bg-gray-200'}`}
                        >
                            HISTORY
                        </button>
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                        <select value={filter} onChange={(e) => setFilter(e.target.value as any)} className="bg-white text-gray-700 text-[10px] md:text-sm rounded-lg px-2 md:px-3 py-1.5 md:py-2 border border-gray-200 outline-none font-bold focus:ring-2 focus:ring-orange-500 shrink-0">
                            <option value="all">Types</option>
                            <option value="dine-in">Dine-in</option>
                            <option value="takeaway">Takeaway</option>
                        </select>
                        <select value={stationFilter} onChange={(e) => setStationFilter(e.target.value as any)} className="bg-white text-gray-700 text-[10px] md:text-sm rounded-lg px-2 md:px-3 py-1.5 md:py-2 border border-gray-200 outline-none font-bold focus:ring-2 focus:ring-orange-500 shrink-0">
                            <option value="all">Stations</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="hidden md:flex items-center gap-4">
                    <div className="text-right">
                        <div className="text-2xl font-bold">{displayedCount}</div>
                        <div className="text-xs text-gray-400 uppercase">Count</div>
                    </div>
                    <button onClick={onLogout} className="px-4 py-2 bg-red-500/20 text-red-400 rounded-xl font-bold text-sm">Logout</button>
                </div>
            </div>
        </div>
    );
}
