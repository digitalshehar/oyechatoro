'use client';

import React, { useState } from 'react';
import { useOffers, Offer } from '../../lib/storage';

export default function OffersPage() {
    const { offers, saveOffer, deleteOffer } = useOffers();
    const [showForm, setShowForm] = useState(false);
    const [newOffer, setNewOffer] = useState<Partial<Offer>>({
        code: '',
        discount: '',
        type: 'Percentage',
        expiry: '',
        status: 'Active',
        usage: 0,
        description: '',
        bgColor: 'from-orange-400 to-red-500'
    });

    const handleCreate = () => {
        if (!newOffer.code || !newOffer.discount || !newOffer.expiry) return;

        saveOffer({
            id: Date.now().toString(),
            code: newOffer.code.toUpperCase(),
            discount: newOffer.discount,
            type: newOffer.type as any,
            expiry: newOffer.expiry,
            status: 'Active',
            usage: 0,
            description: newOffer.description || '',
            bgColor: newOffer.bgColor
        } as Offer);

        setShowForm(false);
        setNewOffer({
            code: '',
            discount: '',
            type: 'Percentage',
            expiry: '',
            status: 'Active',
            usage: 0,
            description: '',
            bgColor: 'from-orange-400 to-red-500'
        });
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-8 animate-in">
                <h1 className="text-3xl font-bold text-[var(--brand-dark)]">Coupons & Offers</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="btn btn-primary btn-glow"
                >
                    {showForm ? 'Cancel' : '+ Create New Offer'}
                </button>
            </div>

            {showForm && (
                <div className="glass-card p-6 rounded-2xl mb-8 animate-in">
                    <h3 className="font-bold text-lg mb-4 text-[var(--brand-dark)]">Create New Coupon</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-muted)] mb-1">Coupon Code</label>
                            <input
                                type="text"
                                placeholder="e.g. SUMMER20"
                                value={newOffer.code}
                                onChange={e => setNewOffer({ ...newOffer, code: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-[var(--border-light)] outline-none focus:border-[var(--brand-primary)] uppercase"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-muted)] mb-1">Discount Type</label>
                            <select
                                value={newOffer.type}
                                onChange={e => setNewOffer({ ...newOffer, type: e.target.value as any })}
                                className="w-full px-4 py-2 rounded-xl border border-[var(--border-light)] outline-none focus:border-[var(--brand-primary)] bg-white"
                            >
                                <option value="Percentage">Percentage Off (%)</option>
                                <option value="Flat">Flat Amount Off (₹)</option>
                                <option value="Free Item">Free Item</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-muted)] mb-1">Discount Value</label>
                            <input
                                type="text"
                                placeholder="e.g. 20% or ₹100"
                                value={newOffer.discount}
                                onChange={e => setNewOffer({ ...newOffer, discount: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-[var(--border-light)] outline-none focus:border-[var(--brand-primary)]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-muted)] mb-1">Expiry Date</label>
                            <input
                                type="date"
                                value={newOffer.expiry}
                                onChange={e => setNewOffer({ ...newOffer, expiry: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-[var(--border-light)] outline-none focus:border-[var(--brand-primary)]"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-[var(--text-muted)] mb-1">Description</label>
                            <input
                                type="text"
                                placeholder="Short description for the offer card"
                                value={newOffer.description}
                                onChange={e => setNewOffer({ ...newOffer, description: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-[var(--border-light)] outline-none focus:border-[var(--brand-primary)]"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-[var(--text-muted)] mb-1">Card Color Theme</label>
                            <div className="flex gap-2">
                                {[
                                    'from-orange-400 to-red-500',
                                    'from-blue-400 to-indigo-500',
                                    'from-green-400 to-emerald-500',
                                    'from-purple-400 to-pink-500',
                                    'from-yellow-400 to-orange-500'
                                ].map(color => (
                                    <button
                                        key={color}
                                        onClick={() => setNewOffer({ ...newOffer, bgColor: color })}
                                        className={`w-8 h-8 rounded-full bg-gradient-to-br ${color} ${newOffer.bgColor === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleCreate}
                        className="px-6 py-2 bg-[var(--brand-primary)] text-white rounded-xl font-bold hover:bg-[var(--brand-secondary)] transition-colors"
                    >
                        Create Coupon
                    </button>
                </div>
            )}

            <div className="grid gap-4 animate-in" style={{ animationDelay: '0.1s' }}>
                {offers.map((offer) => (
                    <div key={offer.id} className="glass-card p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 hover:bg-white/40 transition-colors relative overflow-hidden group">
                        {/* Background Gradient Accent */}
                        <div className={`absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b ${offer.bgColor || 'from-gray-400 to-gray-500'}`}></div>

                        <div className="flex items-center gap-4 pl-4">
                            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${offer.bgColor || 'from-gray-100 to-gray-200'} text-white flex flex-col items-center justify-center shadow-lg`}>
                                <span className="font-bold text-lg">{offer.discount}</span>
                                <span className="text-[10px] uppercase font-bold opacity-80">OFF</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-xl text-[var(--brand-dark)] tracking-wide">{offer.code}</h3>
                                <p className="text-sm text-[var(--text-muted)]">{offer.description || `${offer.type} Discount`} • Expires {offer.expiry}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-[var(--text-main)]">{offer.usage}</div>
                                <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Times Used</div>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${offer.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                                    }`}>
                                    {offer.status}
                                </span>
                                <button
                                    onClick={() => deleteOffer(offer.id)}
                                    className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors"
                                    title="Delete Offer"
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
