'use client';

import React, { useState, useMemo } from 'react';
import { useDbOffers, DbOffer } from '../../lib/db-hooks';

export default function OffersPage() {
    const { offers, loading, saveOffer, updateOffer, deleteOffer } = useDbOffers();
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);

    const [newItem, setNewItem] = useState<Partial<DbOffer>>({
        code: '',
        discount: '',
        type: 'Percentage',
        expiry: '',
        status: 'Active',
        usage: 0,
        description: '',
        bgColor: 'from-orange-400 to-red-500'
    });

    // Stats
    const stats = useMemo(() => {
        const active = offers.filter(o => o.status === 'Active').length;
        const totalRedemptions = offers.reduce((sum, o) => sum + (o.usage || 0), 0);
        const topOffer = [...offers].sort((a, b) => (b.usage || 0) - (a.usage || 0))[0];

        return { active, totalRedemptions, topOffer };
    }, [offers]);

    const resetForm = () => {
        setNewItem({
            code: '',
            discount: '',
            type: 'Percentage',
            expiry: '',
            status: 'Active',
            usage: 0,
            description: '',
            bgColor: 'from-orange-400 to-red-500'
        });
        setEditId(null);
        setShowForm(false);
    };

    const handleCreateOrUpdate = async () => {
        if (!newItem.code || !newItem.discount || !newItem.expiry) return;

        const data = {
            code: newItem.code.toUpperCase(),
            discount: newItem.discount,
            type: newItem.type,
            expiry: newItem.expiry,
            status: newItem.status,
            description: newItem.description,
            bgColor: newItem.bgColor
        };

        let success = false;
        if (editId && updateOffer) {
            success = await updateOffer(editId, data);
        } else {
            success = await saveOffer(data);
        }

        if (success) {
            resetForm();
        }
    };

    const handleEdit = (offer: any) => {
        setNewItem({ ...offer });
        setEditId(offer.id);
        setShowForm(true);
        setActiveMenu(null);
    };

    const handleToggleStatus = async (offer: any) => {
        if (!updateOffer) return;
        const newStatus = offer.status === 'Active' ? 'Inactive' : 'Active';
        await updateOffer(offer.id, { status: newStatus });
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    // Component for the Ticket Card to reuse in Preview
    const TicketCard = ({ offer, preview = false }: { offer: any, preview?: boolean }) => (
        <div className={`relative group w-full ${preview ? 'scale-90 origin-top' : ''}`}>
            {/* Status Indicator (Only on real cards) */}
            {!preview && (
                <div className={`absolute -top-2 -right-2 z-20 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm border border-white/20 ${offer.status === 'Active' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}>
                    {offer.status}
                </div>
            )}

            <div className={`h-40 rounded-2xl bg-gradient-to-br ${offer.bgColor} text-white relative overflow-hidden shadow-lg transition-transform hover:-translate-y-1`}>
                {/* Decorative Circles */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[var(--background)] rounded-full z-10" />
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[var(--background)] rounded-full z-10" />

                {/* Dotted Line */}
                <div className="absolute top-1/2 left-4 right-4 h-px border-t-2 border-dashed border-white/30" />

                <div className="h-full flex flex-col justify-between p-5">
                    {/* Top Part */}
                    <div className="flex justify-between items-start pb-4">
                        <div>
                            <span className="inline-block px-2 py-0.5 rounded-md bg-white/20 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm mb-1">
                                {offer.type}
                            </span>
                            <div className="font-black text-3xl">{offer.discount}</div>
                        </div>
                        <div className="text-right">
                            <div className="text-white/80 text-xs font-medium">Expires</div>
                            <div className="font-bold text-sm">{offer.expiry}</div>
                        </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="flex justify-between items-end pt-4">
                        <div>
                            <div className="text-xs text-white/80 mb-1 max-w-[150px] truncate">{offer.description || 'Valid on all orders'}</div>
                            <div
                                onClick={() => !preview && copyToClipboard(offer.code)}
                                className={`inline-flex items-center gap-2 bg-white text-gray-900 px-3 py-1.5 rounded-lg font-bold font-mono tracking-wider shadow-sm ${!preview ? 'cursor-pointer hover:bg-gray-100 active:scale-95 transition-all' : ''}`}
                                title={!preview ? "Click to copy" : ""}
                            >
                                {offer.code}
                                {!preview && <span className="text-gray-400 text-[10px]">📋</span>}
                            </div>
                        </div>
                        {!preview && (
                            <div className="relative">
                                <button
                                    onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === offer.id ? null : offer.id); }}
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/30 text-white transition-colors"
                                >
                                    ⋮
                                </button>
                                {activeMenu === offer.id && (
                                    <div className="absolute bottom-full right-0 mb-2 w-32 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-30 animate-in fade-in zoom-in-95">
                                        <button onClick={() => handleEdit(offer)} className="w-full text-left px-4 py-2text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 text-xs font-bold">
                                            ✏️ Edit
                                        </button>
                                        <button onClick={() => { handleToggleStatus(offer); setActiveMenu(null); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 text-xs font-bold">
                                            {offer.status === 'Active' ? '⏸️ Pause' : '▶️ Activate'}
                                        </button>
                                        <button onClick={() => { setDeleteId(offer.id); setActiveMenu(null); }} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 text-xs font-bold border-t border-gray-100">
                                            🗑️ Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Delete Confirmation Modal */}
            {deleteId === offer.id && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full animate-in zoom-in-95">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Coupon?</h3>
                        <p className="text-gray-500 mb-6">Are you sure you want to delete <span className="font-bold text-gray-800">{offer.code}</span>? This action cannot be undone.</p>
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-gray-600 font-bold hover:bg-gray-100 rounded-lg">Cancel</button>
                            <button onClick={() => { deleteOffer(offer.id); setDeleteId(null); }} className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 shadow-lg shadow-red-200">Yes, Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    if (loading) return <div className="p-12 text-center text-gray-500">Loading offers...</div>;

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8" onClick={() => setActiveMenu(null)}>
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-4 animate-in">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent">
                        Coupons & Offers
                    </h1>
                    <p className="text-gray-500 mt-1">Manage marketing campaigns</p>
                </div>
                {!showForm && (
                    <button
                        onClick={() => { resetForm(); setShowForm(true); }}
                        className="px-6 py-2.5 bg-gray-900 text-white rounded-xl font-bold shadow-lg hover:bg-gray-800 hover:shadow-xl transition-all flex items-center gap-2"
                    >
                        <span>+</span> Create New Offer
                    </button>
                )}
            </div>

            {/* Stats Overview */}
            {!showForm && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-in slide-in-from-bottom-4">
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                        <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Active Coupons</span>
                        <div className="text-3xl font-bold text-gray-800 mt-1">{stats.active}</div>
                    </div>
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                        <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Total Redemptions</span>
                        <div className="text-3xl font-bold text-green-600 mt-1">{stats.totalRedemptions}</div>
                    </div>
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-5 rounded-2xl shadow-lg text-white relative overflow-hidden">
                        <div className="absolute right-0 top-0 p-4 opacity-10 text-5xl">🏆</div>
                        <span className="text-white/80 text-xs font-bold uppercase tracking-wider relative z-10">Best Performer</span>
                        <div className="text-2xl font-bold mt-1 relative z-10">{stats.topOffer?.code || 'N/A'}</div>
                        <div className="text-xs text-white/60 relative z-10">{stats.topOffer?.usage || 0} uses</div>
                    </div>
                </div>
            )}

            {/* Creation/Edit Form */}
            {showForm && (
                <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-800">{editId ? 'Edit Coupon' : 'Create New Coupon'}</h2>
                        <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">✕</button>
                    </div>
                    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Form Inputs */}
                        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Coupon Code</label>
                                <input
                                    type="text"
                                    placeholder="SUMMER20"
                                    value={newItem.code}
                                    onChange={e => setNewItem({ ...newItem, code: e.target.value.toUpperCase() })}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-indigo-500 outline-none transition-colors font-mono font-bold"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Expiry Date</label>
                                <input
                                    type="date"
                                    value={newItem.expiry as string}
                                    onChange={e => setNewItem({ ...newItem, expiry: e.target.value })}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-indigo-500 outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Discount Type</label>
                                <select
                                    value={newItem.type}
                                    onChange={e => setNewItem({ ...newItem, type: e.target.value as any })}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-indigo-500 outline-none transition-colors"
                                >
                                    <option value="Percentage">Percentage Off (%)</option>
                                    <option value="Flat">Flat Amount (₹)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Value</label>
                                <input
                                    type="text"
                                    placeholder="e.g. 20% or ₹100"
                                    value={newItem.discount}
                                    onChange={e => setNewItem({ ...newItem, discount: e.target.value })}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-indigo-500 outline-none transition-colors font-bold"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
                                <input
                                    type="text"
                                    placeholder="Valid on orders above ₹500"
                                    value={newItem.description}
                                    onChange={e => setNewItem({ ...newItem, description: e.target.value })}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-indigo-500 outline-none transition-colors"
                                />
                            </div>
                            {editId && (
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Status</label>
                                    <select
                                        value={newItem.status}
                                        onChange={e => setNewItem({ ...newItem, status: e.target.value as any })}
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-indigo-500 outline-none transition-colors"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            )}
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Theme</label>
                                <div className="flex gap-3 flex-wrap">
                                    {[
                                        'from-orange-400 to-red-500',
                                        'from-blue-400 to-indigo-500',
                                        'from-emerald-400 to-teal-600',
                                        'from-violet-400 to-fuchsia-600',
                                        'from-gray-700 to-black',
                                        'from-pink-500 to-rose-500'
                                    ].map(c => (
                                        <button
                                            key={c}
                                            onClick={() => setNewItem({ ...newItem, bgColor: c })}
                                            className={`w-10 h-10 rounded-full bg-gradient-to-br ${c} ${newItem.bgColor === c ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : ''} transition-all`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Preview */}
                        <div className="bg-gray-50 rounded-xl p-6 flex flex-col items-center justify-center border border-dashed border-gray-200">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Live Preview</span>
                            <div className="w-full max-w-sm">
                                <TicketCard offer={newItem} preview={true} />
                            </div>
                        </div>
                    </div>
                    <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                        <button onClick={resetForm} className="px-5 py-2 text-gray-600 font-bold hover:bg-gray-100 rounded-lg">Cancel</button>
                        <button onClick={handleCreateOrUpdate} className="px-6 py-2 bg-gray-900 text-white font-bold rounded-lg hover:bg-black transition-transform active:scale-95">
                            {editId ? 'Update Coupon' : 'Create Coupon'}
                        </button>
                    </div>
                </div>
            )}

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in">
                {offers.map(offer => (
                    <TicketCard key={offer.id} offer={offer} />
                ))}

                {offers.length === 0 && !showForm && (
                    <button
                        onClick={() => { resetForm(); setShowForm(true); }}
                        className="col-span-full py-20 text-center border-2 border-dashed border-gray-200 rounded-3xl hover:bg-gray-50 hover:border-gray-300 transition-all group cursor-pointer"
                    >
                        <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🎟️</div>
                        <h3 className="text-xl font-bold text-gray-400 group-hover:text-gray-600">No coupons yet</h3>
                        <p className="text-gray-400 group-hover:text-gray-500">Click to create your first offer!</p>
                    </button>
                )}
            </div>
        </div>
    );
}
