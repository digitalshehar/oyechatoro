'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSettings, exportData, importData } from '../../lib/storage';

export default function SettingsPage() {
    const { settings, updateSettings } = useSettings();
    const [activeTab, setActiveTab] = useState<'general' | 'operations' | 'receipts' | 'data'>('general');
    const [formData, setFormData] = useState(settings);
    const [isSaved, setIsSaved] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setFormData(settings);
    }, [settings]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateSettings(formData);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    const handleExport = () => {
        const data = exportData();
        if (!data) return;
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `oye_chatoro_backup_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target?.result as string;
            const result = importData(content);
            if (result.success) {
                alert('✅ Data restored successfully! The page will reload.');
                window.location.reload();
            } else {
                alert('❌ Restore failed: ' + result.error);
            }
        };
        reader.readAsText(file);
    };

    const tabs = [
        { id: 'general', label: 'General', icon: '🏢' },
        { id: 'operations', label: 'Operations', icon: '⏰' },
        { id: 'receipts', label: 'Receipts', icon: '🧾' },
        { id: 'data', label: 'Data Management', icon: '💾' },
    ];

    return (
        <div className="p-4 md:p-8 max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8 animate-in">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--brand-dark)]">Settings</h1>
                    <p className="text-[var(--text-muted)]">Configure restaurant details and preferences</p>
                </div>
                {isSaved && (
                    <div className="bg-green-100 text-green-800 px-4 py-2 rounded-xl font-bold animate-in fade-in slide-in-from-top-2">
                        ✅ Changes Saved!
                    </div>
                )}
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2 animate-in" style={{ animationDelay: '0.1s' }}>
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === tab.id
                                ? 'bg-[var(--brand-primary)] text-white shadow-lg shadow-orange-200'
                                : 'bg-white text-gray-500 hover:bg-gray-50'
                            }`}
                    >
                        <span>{tab.icon}</span> {tab.label}
                    </button>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="animate-in" style={{ animationDelay: '0.2s' }}>

                {/* GENERAL TAB */}
                {activeTab === 'general' && (
                    <div className="space-y-6">
                        <div className="glass-card p-6 rounded-2xl">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">Restaurant Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Restaurant Name</label>
                                    <input
                                        type="text"
                                        className="w-full p-3 rounded-xl border border-gray-200 focus:border-[var(--brand-primary)] outline-none"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Contact Phone</label>
                                    <input
                                        type="text"
                                        className="w-full p-3 rounded-xl border border-gray-200 focus:border-[var(--brand-primary)] outline-none"
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Address</label>
                                    <textarea
                                        className="w-full p-3 rounded-xl border border-gray-200 focus:border-[var(--brand-primary)] outline-none"
                                        rows={2}
                                        value={formData.address}
                                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Contact Email</label>
                                    <input
                                        type="email"
                                        className="w-full p-3 rounded-xl border border-gray-200 focus:border-[var(--brand-primary)] outline-none"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-6 rounded-2xl">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">Financials</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Currency Symbol</label>
                                    <input
                                        type="text"
                                        className="w-full p-3 rounded-xl border border-gray-200 focus:border-[var(--brand-primary)] outline-none"
                                        value={formData.currency}
                                        onChange={e => setFormData({ ...formData, currency: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Tax Rate (%)</label>
                                    <input
                                        type="number"
                                        className="w-full p-3 rounded-xl border border-gray-200 focus:border-[var(--brand-primary)] outline-none"
                                        value={formData.taxRate}
                                        onChange={e => setFormData({ ...formData, taxRate: parseFloat(e.target.value) })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Service Charge (%)</label>
                                    <input
                                        type="number"
                                        className="w-full p-3 rounded-xl border border-gray-200 focus:border-[var(--brand-primary)] outline-none"
                                        value={formData.serviceCharge}
                                        onChange={e => setFormData({ ...formData, serviceCharge: parseFloat(e.target.value) })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* OPERATIONS TAB */}
                {activeTab === 'operations' && (
                    <div className="glass-card p-6 rounded-2xl">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">Store Hours</h2>
                        <div className="space-y-4">
                            {formData.storeHours && Object.entries(formData.storeHours).map(([day, hours]) => (
                                <div key={day} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                                    <div className="w-32 font-bold text-gray-700">{day}</div>
                                    <div className="flex-1 flex gap-4 items-center">
                                        <input
                                            type="time"
                                            className="p-2 rounded-lg border border-gray-200 disabled:opacity-50"
                                            value={hours.open}
                                            disabled={hours.closed}
                                            onChange={e => setFormData({
                                                ...formData,
                                                storeHours: {
                                                    ...formData.storeHours!,
                                                    [day]: { ...hours, open: e.target.value }
                                                }
                                            })}
                                        />
                                        <span className="text-gray-400">to</span>
                                        <input
                                            type="time"
                                            className="p-2 rounded-lg border border-gray-200 disabled:opacity-50"
                                            value={hours.close}
                                            disabled={hours.closed}
                                            onChange={e => setFormData({
                                                ...formData,
                                                storeHours: {
                                                    ...formData.storeHours!,
                                                    [day]: { ...hours, close: e.target.value }
                                                }
                                            })}
                                        />
                                    </div>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={hours.closed}
                                            onChange={e => setFormData({
                                                ...formData,
                                                storeHours: {
                                                    ...formData.storeHours!,
                                                    [day]: { ...hours, closed: e.target.checked }
                                                }
                                            })}
                                            className="w-5 h-5 rounded text-[var(--brand-primary)]"
                                        />
                                        <span className="text-sm font-medium text-gray-600">Closed</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* RECEIPTS TAB */}
                {activeTab === 'receipts' && (
                    <div className="glass-card p-6 rounded-2xl">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">Receipt Customization</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Header Message</label>
                                    <textarea
                                        className="w-full p-3 rounded-xl border border-gray-200 focus:border-[var(--brand-primary)] outline-none"
                                        rows={3}
                                        placeholder="e.g. Thank you for dining with us!"
                                        value={formData.receipt?.header}
                                        onChange={e => setFormData({
                                            ...formData,
                                            receipt: { ...formData.receipt!, header: e.target.value }
                                        })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Footer Message</label>
                                    <textarea
                                        className="w-full p-3 rounded-xl border border-gray-200 focus:border-[var(--brand-primary)] outline-none"
                                        rows={3}
                                        placeholder="e.g. Visit us again soon."
                                        value={formData.receipt?.footer}
                                        onChange={e => setFormData({
                                            ...formData,
                                            receipt: { ...formData.receipt!, footer: e.target.value }
                                        })}
                                    />
                                </div>
                                <label className="flex items-center gap-2 cursor-pointer p-4 bg-gray-50 rounded-xl">
                                    <input
                                        type="checkbox"
                                        checked={formData.receipt?.showLogo}
                                        onChange={e => setFormData({
                                            ...formData,
                                            receipt: { ...formData.receipt!, showLogo: e.target.checked }
                                        })}
                                        className="w-5 h-5 rounded text-[var(--brand-primary)]"
                                    />
                                    <span className="font-bold text-gray-700">Show Logo on Receipt</span>
                                </label>
                            </div>

                            {/* Preview */}
                            <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm font-mono text-sm">
                                <div className="text-center mb-4">
                                    {formData.receipt?.showLogo && <div className="text-2xl mb-2">🥗</div>}
                                    <div className="font-bold text-lg">{formData.name}</div>
                                    <div className="text-gray-500">{formData.address}</div>
                                    <div className="text-gray-500">{formData.phone}</div>
                                </div>
                                <div className="border-t border-b border-dashed border-gray-300 py-2 my-2 text-center text-gray-600">
                                    {formData.receipt?.header}
                                </div>
                                <div className="space-y-1 mb-4">
                                    <div className="flex justify-between"><span>Item 1</span><span>₹199</span></div>
                                    <div className="flex justify-between"><span>Item 2</span><span>₹249</span></div>
                                    <div className="border-t border-gray-200 pt-1 mt-1 font-bold flex justify-between"><span>Total</span><span>₹448</span></div>
                                </div>
                                <div className="text-center text-gray-500 text-xs">
                                    {formData.receipt?.footer}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* DATA TAB */}
                {activeTab === 'data' && (
                    <div className="glass-card p-6 rounded-2xl">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">Data Management</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
                                <h3 className="font-bold text-blue-800 mb-2">Backup Data</h3>
                                <p className="text-sm text-blue-600 mb-4">Download a complete backup of your orders, menu, inventory, and settings.</p>
                                <button
                                    type="button"
                                    onClick={handleExport}
                                    className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                                >
                                    Download Backup
                                </button>
                            </div>

                            <div className="p-6 bg-orange-50 rounded-xl border border-orange-100">
                                <h3 className="font-bold text-orange-800 mb-2">Restore Data</h3>
                                <p className="text-sm text-orange-600 mb-4">Restore your system from a previously saved backup file. This will replace current data.</p>
                                <input
                                    type="file"
                                    accept=".json"
                                    ref={fileInputRef}
                                    onChange={handleImport}
                                    className="hidden"
                                />
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full py-3 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-colors shadow-lg shadow-orange-200"
                                >
                                    Select Backup File
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Save Button (Not for Data tab) */}
                {activeTab !== 'data' && (
                    <div className="flex justify-end pt-6">
                        <button
                            type="submit"
                            className="px-8 py-3 bg-[var(--brand-primary)] text-white font-bold rounded-xl shadow-lg shadow-orange-200 hover:opacity-90 transition-all transform hover:scale-105"
                        >
                            Save Changes
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
}
