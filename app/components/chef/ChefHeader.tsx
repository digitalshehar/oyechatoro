'use client';

import React from 'react';

interface ChefHeaderProps {
    soundEnabled: boolean;
    setSoundEnabled: (v: boolean) => void;
    setIsTVMode: (v: boolean) => void;
    setShowPrepModal: (v: boolean) => void;
    setShowWasteModal: (v: boolean) => void;
    viewMode: 'active' | 'history' | 'stats';
    setViewMode: (v: 'active' | 'history' | 'stats') => void;
    filter: 'all' | 'dine-in' | 'takeaway';
    setFilter: (v: 'all' | 'dine-in' | 'takeaway') => void;
    stationFilter: 'all' | 'tandoor' | 'chinese' | 'curry';
    setStationFilter: (v: 'all' | 'tandoor' | 'chinese' | 'curry') => void;
    displayedCount: number;
    onLogout: () => void;
}

export default function ChefHeader({
    soundEnabled, setSoundEnabled, setIsTVMode, setShowPrepModal, setShowWasteModal,
    viewMode, setViewMode, filter, setFilter, stationFilter, setStationFilter, displayedCount, onLogout
}: ChefHeaderProps) {
    return (
        <div className="sticky top-0 z-20 bg-gray-900/95 backdrop-blur-sm pb-4 pt-2 -mx-2 px-2 md:mx-0 md:px-0 md:static md:bg-transparent md:p-0 md:mb-8">
            <div className="bg-gray-800 p-3 md:p-4 rounded-2xl border border-gray-700 shadow-xl flex flex-col md:flex-row justify-between gap-3 md:gap-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="text-2xl md:text-4xl bg-gray-700 p-1.5 md:p-2 rounded-xl">👨‍🍳</div>
                        <div>
                            <h1 className="text-lg md:text-2xl font-bold text-orange-500 leading-tight">Chef Portal</h1>
                            <div className="flex items-center gap-2">
                                <button onClick={() => setSoundEnabled(!soundEnabled)} className={`text-xs px-2 py-0.5 rounded-full border ${soundEnabled ? 'bg-green-500/20 border-green-500 text-green-400' : 'bg-gray-700 border-gray-600 text-gray-400'}`}>{soundEnabled ? '🔔' : '🔕'}</button>
                                <button onClick={() => setIsTVMode(true)} className="text-xs px-2 py-0.5 rounded-full border bg-purple-500/20 border-purple-500 text-purple-400">📺 TV</button>
                                <button onClick={() => setShowPrepModal(true)} className="text-xs px-2 py-0.5 rounded-full border bg-blue-500/20 border-blue-500 text-blue-400">📋 Prep</button>
                                <button onClick={() => setShowWasteModal(true)} className="text-xs px-2 py-0.5 rounded-full border bg-red-500/20 border-red-500 text-red-400">🗑️</button>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 md:hidden">
                        <span className="font-bold text-white text-lg bg-gray-700 px-3 py-1.5 rounded-lg">{displayedCount}</span>
                        <button onClick={onLogout} className="p-2 bg-red-500/10 text-red-400 rounded-lg">🚪</button>
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
                        <div className="text-2xl font-bold">{displayedCount}</div>
                        <div className="text-xs text-gray-400 uppercase">Count</div>
                    </div>
                    <button onClick={onLogout} className="px-4 py-2 bg-red-500/20 text-red-400 rounded-xl font-bold text-sm">Logout</button>
                </div>
            </div>
        </div>
    );
}
