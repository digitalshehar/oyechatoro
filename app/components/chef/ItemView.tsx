'use client';
import React, { useState } from 'react';
import { MenuItem } from '../../lib/db-hooks';

interface ItemViewProps {
    items: { [key: string]: number }; // Keep for legacy props compatibility if needed, though we will ignore it for stock view
    menuItems: MenuItem[];
    onUpdateItem: (id: string, updates: Partial<MenuItem>) => void;
    categories: any[];
}

export default function ItemView({ menuItems, onUpdateItem, categories }: ItemViewProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredItems = menuItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-in">
            {/* Search */}
            <input
                type="text"
                placeholder="Search Item to 86..."
                className="w-full p-4 rounded-2xl border border-gray-200 text-lg shadow-sm focus:ring-2 focus:ring-orange-500 outline-none"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredItems.map(item => (
                    <div
                        key={item.id}
                        className={`p-4 rounded-xl border-2 flex justify-between items-center transition-all ${item.status === 'OutOfStock' ? 'bg-red-50 border-red-200 opacity-75' :
                                item.status === 'LowStock' ? 'bg-yellow-50 border-yellow-200' :
                                    'bg-white border-gray-100 hover:border-gray-300'
                            }`}
                    >
                        <div>
                            <h3 className="font-bold text-gray-800">{item.name}</h3>
                            <p className={`text-xs font-bold uppercase ${item.status === 'OutOfStock' ? 'text-red-500' :
                                    item.status === 'LowStock' ? 'text-yellow-600' :
                                        'text-green-500'
                                }`}>
                                {item.status === 'OutOfStock' ? 'SOLD OUT' : item.status === 'LowStock' ? 'LOW STOCK' : 'IN STOCK'}
                            </p>
                        </div>

                        <div className="flex gap-1">
                            {/* In Stock Button */}
                            <button
                                onClick={() => onUpdateItem(item.id, { status: 'Active' })}
                                className={`p-2 rounded-lg text-xs font-bold ${item.status === 'Active' ? 'bg-green-500 text-white shadow-md' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                            >
                                ✅
                            </button>

                            {/* Low Stock Button */}
                            <button
                                onClick={() => onUpdateItem(item.id, { status: 'LowStock' })}
                                className={`p-2 rounded-lg text-xs font-bold ${item.status === 'LowStock' ? 'bg-yellow-400 text-white shadow-md' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                            >
                                ⚠️
                            </button>

                            {/* 86 Button */}
                            <button
                                onClick={() => onUpdateItem(item.id, { status: 'OutOfStock' })}
                                className={`p-2 rounded-lg text-xs font-bold ${item.status === 'OutOfStock' ? 'bg-red-500 text-white shadow-md' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                            >
                                ⛔
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
