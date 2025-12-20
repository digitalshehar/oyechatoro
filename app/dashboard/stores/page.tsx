'use client';

import React, { useState } from 'react';
import { useDbStores } from '../../lib/db-hooks';
import { useSession } from 'next-auth/react';

export default function StoresPage() {
    const { data: session, update } = useSession();
    // Logic: Only "Head Office" Admin should see this page?
    // Or just any Admin since auth.ts/api blocks non-admins.
    // Ideally we check session storeName to be Head Office too, but let's trust API role check for now.

    const { stores, loading, addStore } = useDbStores();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', code: '', address: '', phone: '' });
    const [submitting, setSubmitting] = useState(false);

    if (loading) return <div className="p-8 text-center text-gray-500 animate-pulse">Loading franchises...</div>;

    if ((session?.user as any)?.role !== 'Admin') {
        return <div className="p-8 text-center text-red-500">Access Denied: Admins Only</div>;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        const result = await addStore(formData);
        if (result.success) {
            setIsModalOpen(false);
            setFormData({ name: '', code: '', address: '', phone: '' });
        } else {
            alert(result.error);
        }
        setSubmitting(false);
    };

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8 animate-in">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--brand-dark)]">Franchise Stores</h1>
                    <p className="text-[var(--text-muted)]">Manage your restaurant chain locations</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-[var(--brand-primary)] text-white font-bold rounded-xl shadow-lg shadow-orange-200 hover:opacity-90 transition-opacity"
                >
                    <span>+ Add New Store</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in" style={{ animationDelay: '0.1s' }}>
                {stores.map(store => (
                    <div key={store.id} className="glass-card p-6 rounded-2xl flex flex-col hover:shadow-lg transition-all border border-transparent hover:border-gray-200">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl">
                                🏪
                            </div>
                            <span className={`px-2 py-1 text-xs font-bold rounded-full ${store.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {store.active ? 'ACTIVE' : 'INACTIVE'}
                            </span>
                        </div>
                        <h3 className="font-bold text-lg text-gray-800 mb-1">{store.name}</h3>
                        <p className="text-gray-500 text-xs font-mono mb-4 bg-gray-50 p-1 rounded inline-block self-start w-auto">
                            CODE: {store.code}
                        </p>

                        <div className="mt-auto space-y-2 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <span>📍</span>
                                <span>{store.address || 'No address'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span>📞</span>
                                <span>{store.phone || 'No phone'}</span>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-100 flex gap-2">
                            <button disabled className="flex-1 py-2 rounded-lg bg-gray-50 text-gray-400 text-sm font-bold cursor-not-allowed">
                                Edit
                            </button>
                            <button
                                className="flex-1 py-2 rounded-lg bg-blue-50 text-blue-600 text-sm font-bold hover:bg-blue-100 transition-colors"
                                onClick={async () => {
                                    if (confirm(`Switch dashboard to ${store.name}?`)) {
                                        await update({
                                            storeId: store.id,
                                            storeName: store.name
                                        });
                                        window.location.href = '/dashboard'; // Force reload to apply new API filters
                                    }
                                }}
                            >
                                Manage
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-800">New Franchise Store</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Store Name</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full p-3 rounded-xl border border-gray-200 focus:border-[var(--brand-primary)] outline-none"
                                    placeholder="e.g. Oye Chatoro - Andheri East"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Store Code (Unique)</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full p-3 rounded-xl border border-gray-200 focus:border-[var(--brand-primary)] outline-none uppercase"
                                    placeholder="e.g. ANDHERI01"
                                    value={formData.code}
                                    onChange={e => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Address</label>
                                <input
                                    type="text"
                                    className="w-full p-3 rounded-xl border border-gray-200 focus:border-[var(--brand-primary)] outline-none"
                                    placeholder="e.g. Metro Station, Andheri"
                                    value={formData.address}
                                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Phone</label>
                                <input
                                    type="tel"
                                    className="w-full p-3 rounded-xl border border-gray-200 focus:border-[var(--brand-primary)] outline-none"
                                    placeholder="e.g. 9876543210"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 p-3 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex-1 p-3 rounded-xl bg-[var(--brand-primary)] text-white font-bold hover:opacity-90 shadow-lg shadow-orange-200 disabled:opacity-50"
                                >
                                    {submitting ? 'Creating...' : 'Create Store'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
