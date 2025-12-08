'use client';

import React from 'react';
import { Order, getOrders } from '../../lib/storage';

const TOTAL_TABLES = 10;

type TableStatus = 'free' | 'occupied' | 'billing';

interface FloorViewProps {
    selectedStaff: string;
    onStaffChange: (staff: string) => void;
    staffList: string[];
    onTableClick: (tableNum: string) => void;
    onTakeaway: () => void;
    onDelivery: () => void;
    onOnlineOrder: () => void;
    onShowSales: () => void;
    onShowRecent: () => void;
}

export default function FloorView({
    selectedStaff,
    onStaffChange,
    staffList,
    onTableClick,
    onTakeaway,
    onDelivery,
    onOnlineOrder,
    onShowSales,
    onShowRecent
}: FloorViewProps) {

    const getTableStatus = (tableNum: string): { status: TableStatus; order?: Order } => {
        const activeOrders = getOrders().filter(
            o => o.type === 'Dine-in' &&
                o.table === tableNum &&
                o.status !== 'Completed' &&
                o.status !== 'Cancelled'
        );
        if (activeOrders.length === 0) return { status: 'free' };
        const order = activeOrders[0];
        if (order.status === 'Ready') return { status: 'billing', order };
        return { status: 'occupied', order };
    };

    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            {/* Floor Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-white">🪑 Table Floor</h1>
                        <p className="text-white/80 text-sm">Select a table to take order</p>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={onShowSales} className="px-4 py-2 bg-white/20 text-white rounded-lg font-semibold text-sm hover:bg-white/30">📊 Sales</button>
                        <button onClick={onShowRecent} className="px-4 py-2 bg-white/20 text-white rounded-lg font-semibold text-sm hover:bg-white/30">🕒 Recent</button>
                        <select
                            value={selectedStaff}
                            onChange={(e) => onStaffChange(e.target.value)}
                            className={`px-3 py-2 rounded-lg font-semibold text-sm ${!selectedStaff ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-white/20 text-white'}`}
                        >
                            <option value="">👤 Staff</option>
                            {staffList.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="bg-white border-b px-4 py-2 flex gap-4 text-xs">
                <div className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-500"></span> Free</div>
                <div className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-orange-500"></span> Occupied</div>
                <div className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-500"></span> Bill Ready</div>
            </div>

            {/* Table Grid */}
            <div className="flex-1 overflow-y-auto p-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {Array.from({ length: TOTAL_TABLES }, (_, i) => {
                        const tableNum = `T-${i + 1}`;
                        const { status, order } = getTableStatus(tableNum);
                        const bgColor = status === 'free' ? 'bg-green-50 border-green-500 hover:bg-green-100' :
                            status === 'occupied' ? 'bg-orange-50 border-orange-500 hover:bg-orange-100' :
                                'bg-red-50 border-red-500 hover:bg-red-100';
                        const iconColor = status === 'free' ? 'text-green-500' :
                            status === 'occupied' ? 'text-orange-500' : 'text-red-500';

                        return (
                            <button
                                key={tableNum}
                                onClick={() => onTableClick(tableNum)}
                                className={`p-4 rounded-2xl border-2 ${bgColor} transition-all hover:scale-105 active:scale-95 text-left`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className={`text-3xl ${iconColor}`}>🪑</span>
                                    <span className={`text-xs font-bold px-2 py-1 rounded ${status === 'free' ? 'bg-green-500 text-white' : status === 'occupied' ? 'bg-orange-500 text-white' : 'bg-red-500 text-white'}`}>
                                        {status === 'free' ? 'FREE' : status === 'occupied' ? 'BUSY' : 'BILL'}
                                    </span>
                                </div>
                                <div className="text-xl font-bold text-gray-800">{tableNum}</div>
                                {order && (
                                    <div className="mt-2 text-sm">
                                        <div className="text-gray-500 truncate">{order.items.slice(0, 2).join(', ')}</div>
                                        <div className="font-bold text-orange-600">₹{order.total}</div>
                                    </div>
                                )}
                            </button>
                        );
                    })}
                    {/* Takeaway */}
                    <button onClick={onTakeaway} className="p-4 rounded-2xl border-2 bg-blue-50 border-blue-500 hover:bg-blue-100 transition-all hover:scale-105 active:scale-95 text-left">
                        <span className="text-3xl">📦</span>
                        <div className="text-xl font-bold text-gray-800 mt-2">Takeaway</div>
                        <div className="text-sm text-gray-500">New parcel order</div>
                    </button>
                    {/* Delivery */}
                    <button onClick={onDelivery} className="p-4 rounded-2xl border-2 bg-purple-50 border-purple-500 hover:bg-purple-100 transition-all hover:scale-105 active:scale-95 text-left">
                        <span className="text-3xl">🚗</span>
                        <div className="text-xl font-bold text-gray-800 mt-2">Delivery</div>
                        <div className="text-sm text-gray-500">New delivery order</div>
                    </button>
                    {/* Online/Phone */}
                    <button onClick={onOnlineOrder} className="p-4 rounded-2xl border-2 bg-teal-50 border-teal-500 hover:bg-teal-100 transition-all hover:scale-105 active:scale-95 text-left">
                        <span className="text-3xl">📞</span>
                        <div className="text-xl font-bold text-gray-800 mt-2">Phone/Online</div>
                        <div className="text-sm text-gray-500">Customer call order</div>
                    </button>
                </div>
            </div>
        </div>
    );
}
