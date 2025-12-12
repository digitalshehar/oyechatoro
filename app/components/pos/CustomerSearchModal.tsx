'use client';
import React, { useState, useEffect } from 'react';
import { Customer } from '../../lib/db-hooks';

interface CustomerSearchModalProps {
    show: boolean;
    onClose: () => void;
    customers: Customer[];
    onSearch: (query: string) => void;
    onSelect: (customer: Customer) => void;
}

export default function CustomerSearchModal({ show, onClose, customers, onSearch, onSelect }: CustomerSearchModalProps) {
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (show) {
            setSearch('');
            // Optional: trigger initial fetch?
        }
    }, [show]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setSearch(val);
        onSearch(val);
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">👤 Search Customer</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl">✕</button>
                </div>

                <div className="relative mb-4">
                    <input
                        autoFocus
                        type="text"
                        placeholder="Search by Name or Phone..."
                        value={search}
                        onChange={handleSearch}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                    />
                    <span className="absolute left-3 top-3.5 text-gray-400">🔍</span>
                </div>

                <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                    {customers.length === 0 ? (
                        <div className="text-center text-gray-400 py-10">
                            {search ? 'No customers found' : 'Type to search...'}
                        </div>
                    ) : (
                        customers.map(c => (
                            <button
                                key={c.id}
                                onClick={() => onSelect(c)}
                                className="w-full text-left p-3 rounded-xl hover:bg-orange-50 border border-transparent hover:border-orange-200 transition-all group"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="font-bold text-gray-800">{c.name}</div>
                                    <div className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">
                                        {c.loyaltyPoints} pts
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mt-1">
                                    <div className="text-sm text-gray-500">📞 {c.phone}</div>
                                    <div className="text-xs text-gray-400">
                                        Last: {new Date(c.lastVisit).toLocaleDateString()}
                                    </div>
                                </div>
                            </button>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
