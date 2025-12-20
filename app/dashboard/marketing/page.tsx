'use client';

import React, { useState } from 'react';
import { useDbOffers, DbOffer } from '../../lib/db-hooks';

export default function MarketingPage() {
    const { offers, loading, saveOffer, deleteOffer, updateOffer } = useDbOffers();
    const [showModal, setShowModal] = useState(false);
    const [editingOffer, setEditingOffer] = useState<DbOffer | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        code: '',
        discount: '10',
        type: 'Percentage',
        expiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // +7 days
        description: '',
        bgColor: '#10b981'
    });

    const handleEdit = (offer: DbOffer) => {
        setEditingOffer(offer);
        setFormData({
            code: offer.code,
            discount: offer.discount,
            type: offer.type,
            expiry: new Date(offer.expiry).toISOString().split('T')[0],
            description: offer.description || '',
            bgColor: offer.bgColor || '#10b981'
        });
        setShowModal(true);
    };

    const handleSave = async () => {
        if (!formData.code || !formData.discount) return;

        const payload = {
            ...formData,
            status: 'Active'
        };

        let result;
        if (editingOffer) {
            result = await updateOffer(editingOffer.id, payload);
        } else {
            result = await saveOffer(payload);
        }

        if (result) {
            setShowModal(false);
            setEditingOffer(null);
            setFormData({ code: '', discount: '10', type: 'Percentage', expiry: '', description: '', bgColor: '#10b981' });
        } else {
            alert('Failed to save coupon');
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this coupon?')) {
            await deleteOffer(id);
        }
    };

    // WhatsApp Helpers
    const shareMenuUrl = `https://wa.me/?text=${encodeURIComponent("Hey! Check out the delicious menu at Oye Chatoro: https://oyechatoro.com/menu 🍔🍕")}`;
    const shareFeedbackUrl = `https://wa.me/?text=${encodeURIComponent("Hi Oye Chatoro, I have some feedback regarding my order...")}`;

    if (loading) return <div className="p-8 text-center text-gray-500">Loading Marketing Suite...</div>;

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 animate-in">
            <h1 className="text-3xl font-bold text-[var(--brand-dark)] flex items-center gap-3">
                <span>📢</span> Marketing Suite
            </h1>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6">
                <div className="glass-card p-4 md:p-6 rounded-2xl flex flex-col items-center text-center bg-gradient-to-br from-green-50 to-white border-green-100">
                    <div className="text-2xl md:text-4xl mb-2 md:mb-3">📲</div>
                    <h3 className="font-bold text-gray-800 text-[10px] md:text-sm">Share Menu</h3>
                    <p className="hidden md:block text-[10px] text-gray-500 mb-4">Send your digital menu link instantly.</p>
                    <a href={shareMenuUrl} target="_blank" className="btn bg-green-500 text-white hover:bg-green-600 w-full flex items-center justify-center gap-2 text-[10px] py-2 md:py-2.5 mt-auto">
                        Share ↗
                    </a>
                </div>

                <div className="glass-card p-4 md:p-6 rounded-2xl flex flex-col items-center text-center bg-gradient-to-br from-blue-50 to-white border-blue-100">
                    <div className="text-2xl md:text-4xl mb-2 md:mb-3">🎫</div>
                    <h3 className="font-bold text-gray-800 text-[10px] md:text-sm">Create Promo</h3>
                    <p className="hidden md:block text-[10px] text-gray-500 mb-4">Launch a new coupon code to boost sales.</p>
                    <button onClick={() => { setEditingOffer(null); setShowModal(true); }} className="btn btn-primary w-full text-[10px] py-2 md:py-2.5 mt-auto">
                        + New
                    </button>
                </div>

                <div className="glass-card p-4 md:p-6 rounded-2xl flex flex-col items-center text-center bg-gradient-to-br from-purple-50 to-white border-purple-100">
                    <div className="text-2xl md:text-4xl mb-2 md:mb-3">💬</div>
                    <h3 className="font-bold text-gray-800 text-[10px] md:text-sm">Get Feedback</h3>
                    <p className="hidden md:block text-[10px] text-gray-500 mb-4">Share a direct feedback line.</p>
                    <a href={shareFeedbackUrl} target="_blank" className="btn bg-purple-500 text-white hover:bg-purple-600 w-full flex items-center justify-center gap-2 text-[10px] py-2 md:py-2.5 mt-auto">
                        Feedback ↗
                    </a>
                </div>

                <div className="glass-card p-4 md:p-6 rounded-2xl flex flex-col items-center text-center bg-gradient-to-br from-pink-50 to-white border-pink-100">
                    <div className="text-2xl md:text-4xl mb-2 md:mb-3">📸</div>
                    <h3 className="font-bold text-gray-800 text-[10px] md:text-sm">AI Planner</h3>
                    <p className="hidden md:block text-[10px] text-gray-500 mb-4">Generate 7 days of social content.</p>
                    <button onClick={() => window.location.href = '/dashboard/marketing/social'} className="btn bg-pink-500 text-white hover:bg-pink-600 w-full flex items-center justify-center gap-2 text-[10px] py-2 md:py-2.5 mt-auto">
                        Planner ✨
                    </button>
                </div>

                <div className="glass-card p-4 md:p-6 rounded-2xl flex flex-col items-center text-center bg-gradient-to-br from-orange-50 to-white border-orange-100 col-span-2 md:col-span-1">
                    <div className="text-2xl md:text-4xl mb-2 md:mb-3">✍️</div>
                    <h3 className="font-bold text-gray-800 text-[10px] md:text-sm">AI Blog Studio</h3>
                    <p className="hidden md:block text-[10px] text-gray-500 mb-4">Automate blog content & guides.</p>
                    <button onClick={() => window.location.href = '/dashboard/blog/automation'} className="btn bg-orange-500 text-white hover:bg-orange-600 w-full flex items-center justify-center gap-2 text-[10px] py-2 md:py-2.5 mt-auto">
                        Studio 🚀
                    </button>
                </div>
            </div>

            {/* Active Coupons List */}
            <div>
                <h2 className="text-xl font-bold text-gray-700 mb-4">Active Coupons</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {offers.map(offer => (
                        <div key={offer.id} className="relative overflow-hidden bg-white rounded-2xl shadow-sm border border-gray-100 group hover:shadow-md transition-all">
                            <div className="absolute top-0 left-0 w-1 md:w-2 h-full" style={{ backgroundColor: offer.bgColor || '#ccc' }}></div>
                            <div className="p-4 md:p-5 pl-5 md:pl-7">
                                <div className="flex justify-between items-start mb-1 md:mb-2">
                                    <h3 className="text-xl md:text-2xl font-black text-gray-800 tracking-tight">{offer.code}</h3>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleEdit(offer)} className="text-gray-400 hover:text-blue-500 p-1">✏️</button>
                                        <button onClick={() => handleDelete(offer.id)} className="text-gray-400 hover:text-red-500 p-1">🗑️</button>
                                    </div>
                                </div>
                                <div className="flex items-baseline gap-1 mb-2 md:mb-3">
                                    <span className="text-2xl md:text-3xl font-bold text-[var(--brand-primary)]">
                                        {offer.type === 'Percentage' ? `${offer.discount}%` : `₹${offer.discount}`}
                                    </span>
                                    <span className="text-[10px] md:text-sm text-gray-500 font-medium uppercase">OFF</span>
                                </div>
                                <p className="text-[11px] md:text-sm text-gray-500 mb-2 md:mb-3 line-clamp-1">{offer.description || 'No description'}</p>
                                <div className="flex items-center justify-between text-[9px] md:text-xs font-bold text-gray-400 bg-gray-50 p-1.5 md:p-2 rounded-lg">
                                    <span>Used: {offer.usage}</span>
                                    <span>Exp: {new Date(offer.expiry).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    {offers.length === 0 && (
                        <div className="col-span-full py-12 text-center text-gray-400 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                            No active coupons. Create one to get started!
                        </div>
                    )}
                </div>
            </div>

            {/* Create/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="font-bold text-xl">{editingOffer ? 'Edit Coupon' : 'Create New Coupon'}</h3>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Coupon Code</label>
                                <input
                                    type="text"
                                    className="w-full p-3 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-[var(--brand-primary)] outline-none font-bold uppercase tracking-widest"
                                    placeholder="SUMMER50"
                                    value={formData.code}
                                    onChange={e => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Discount Type</label>
                                    <select
                                        className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none"
                                        value={formData.type}
                                        onChange={e => setFormData({ ...formData, type: e.target.value })}
                                    >
                                        <option value="Percentage">Percentage (%)</option>
                                        <option value="Flat">Flat Amount (₹)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Value</label>
                                    <input
                                        type="number"
                                        className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none font-bold"
                                        value={formData.discount}
                                        onChange={e => setFormData({ ...formData, discount: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Expiry Date</label>
                                <input
                                    type="date"
                                    className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none"
                                    value={formData.expiry}
                                    onChange={e => setFormData({ ...formData, expiry: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
                                <input
                                    type="text"
                                    className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none"
                                    placeholder="e.g. 50% Off First Order"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Card Color</label>
                                <div className="flex gap-2">
                                    {['#10b981', '#3b82f6', '#8b5cf6', '#ef4444', '#f59e0b', '#ec4899'].map(color => (
                                        <button
                                            key={color}
                                            onClick={() => setFormData({ ...formData, bgColor: color })}
                                            className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${formData.bgColor === color ? 'border-gray-800 scale-110' : 'border-transparent'}`}
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="p-6 bg-gray-50 flex gap-3">
                            <button onClick={() => setShowModal(false)} className="flex-1 py-3 font-bold text-gray-500 hover:bg-gray-200 rounded-xl">Cancel</button>
                            <button onClick={handleSave} className="flex-1 py-3 bg-[var(--brand-primary)] text-white font-bold rounded-xl shadow-lg hover:brightness-110">
                                {editingOffer ? 'Update Coupon' : 'Create Coupon'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
