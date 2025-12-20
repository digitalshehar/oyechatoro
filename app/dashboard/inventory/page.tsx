'use client';

import React, { useState } from 'react';
import { useDbInventory, InventoryItem } from '../../lib/db-hooks';

export default function InventoryPage() {
    const { inventory, stockLogs, wastageLogs, addItem, updateItem, deleteItem, recordWastage } = useDbInventory();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All Status');

    // Modal States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [isWastageOpen, setIsWastageOpen] = useState(false);

    const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
    const [selectedItemForHistory, setSelectedItemForHistory] = useState<InventoryItem | null>(null);
    const [selectedItemForWastage, setSelectedItemForWastage] = useState<InventoryItem | null>(null);

    // AI & Automation States
    const [isPredicting, setIsPredicting] = useState(false);
    const [showPredictModal, setShowPredictModal] = useState(false);
    const [predictions, setPredictions] = useState<any[]>([]);
    const [isAnalyzingWaste, setIsAnalyzingWaste] = useState(false);
    const [showWasteModal, setShowWasteModal] = useState(false);
    const [wasteReports, setWasteReports] = useState<any[]>([]);

    const [formData, setFormData] = useState({
        name: '',
        quantity: 0,
        unit: 'kg',
        minLevel: 0,
        category: '',
        supplierName: '',
        supplierContact: ''
    });

    const [wastageForm, setWastageForm] = useState({
        quantity: 0,
        reason: ''
    });

    const filteredItems = inventory.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'All Status' || item.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const lowStockCount = inventory.filter(i => i.status === 'Low Stock' || i.status === 'Out of Stock').length;
    const totalValue = inventory.reduce((acc, item) => acc + (item.quantity * 100), 0); // Mock value calculation

    const handleOpenModal = (item?: InventoryItem) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                name: item.name,
                quantity: item.quantity,
                unit: item.unit,
                minLevel: item.minLevel,
                category: item.category || '',
                supplierName: item.supplier?.name || '',
                supplierContact: item.supplier?.contact || ''
            });
        } else {
            setEditingItem(null);
            setFormData({
                name: '',
                quantity: 0,
                unit: 'kg',
                minLevel: 0,
                category: '',
                supplierName: '',
                supplierContact: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        const itemData = {
            name: formData.name,
            quantity: formData.quantity,
            unit: formData.unit,
            minLevel: formData.minLevel,
            category: formData.category,
            supplier: {
                name: formData.supplierName,
                contact: formData.supplierContact
            }
        };

        if (editingItem) {
            updateItem(editingItem.id, itemData);
        } else {
            addItem(itemData);
        }
        setIsModalOpen(false);
    };

    const handleOpenHistory = (item: InventoryItem) => {
        setSelectedItemForHistory(item);
        setIsHistoryOpen(true);
    };

    const handleOpenWastage = (item: InventoryItem) => {
        setSelectedItemForWastage(item);
        setWastageForm({ quantity: 0, reason: '' });
        setIsWastageOpen(true);
    };

    const handleSaveWastage = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedItemForWastage) {
            recordWastage(selectedItemForWastage.id, wastageForm.quantity, wastageForm.reason);
            setIsWastageOpen(false);
        }
    };

    const handleQuickUpdate = (id: number, currentQty: number, change: number) => {
        updateItem(id, { quantity: Math.max(0, currentQty + change) });
    };

    const handlePredictStock = async () => {
        setIsPredicting(true);
        setShowPredictModal(true);
        try {
            const res = await fetch('/api/seo/ai/inventory/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ inventory })
            });
            const data = await res.json();
            if (data.predictions) setPredictions(data.predictions);
        } catch (error) {
            console.error('Prediction error:', error);
        } finally {
            setIsPredicting(false);
        }
    };

    const handleGenerateShoppingList = () => {
        const lowItems = inventory.filter(i => i.status === 'Low Stock' || i.status === 'Out of Stock');
        if (lowItems.length === 0) {
            alert('Inventory is healthy! No urgent shopping needed. 🥕');
            return;
        }

        let message = `*Oye Chatoro - Shopping List (${new Date().toLocaleDateString()})*\n\n`;
        lowItems.forEach(i => {
            message += `• ${i.name}: Need approx ${i.minLevel * 2 - i.quantity} ${i.unit}\n`;
        });
        message += `\n_Generated by Oye AI_`;

        const encoded = encodeURIComponent(message);
        window.open(`https://wa.me/?text=${encoded}`, '_blank');
    };

    const handleAnalyzeWastage = async () => {
        if (wastageLogs.length === 0) {
            alert('No wastage logs found to analyze.');
            return;
        }
        setIsAnalyzingWaste(true);
        setShowWasteModal(true);
        try {
            const res = await fetch('/api/seo/ai/inventory/wastage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ logs: wastageLogs })
            });
            const data = await res.json();
            if (data.reports) setWasteReports(data.reports);
        } catch (error) {
            console.error('Wastage analysis error:', error);
        } finally {
            setIsAnalyzingWaste(false);
        }
    };

    return (
        <div className="p-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 animate-in">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--brand-dark)]">Inventory Management</h1>
                    <p className="text-gray-500 text-sm">Track ingredients, predict shortages, and manage supply.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handlePredictStock}
                        className="px-4 py-2 bg-purple-50 text-purple-700 rounded-xl font-bold border border-purple-100 hover:bg-purple-100 flex items-center gap-2 transition-all"
                    >
                        <span>🔮</span> Predict Stock
                    </button>
                    <button
                        onClick={handleGenerateShoppingList}
                        className="px-4 py-2 bg-green-50 text-green-700 rounded-xl font-bold border border-green-100 hover:bg-green-100 flex items-center gap-2 transition-all"
                    >
                        <span>🛒</span> Buy List
                    </button>
                    <button
                        onClick={() => handleOpenModal()}
                        className="px-6 py-2 bg-[var(--brand-primary)] text-white rounded-xl font-bold shadow-lg hover:shadow-orange-500/30 transition-all hover:-translate-y-0.5"
                    >
                        + Add Item
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-in" style={{ animationDelay: '0.1s' }}>
                <div className="glass-card p-6 rounded-2xl bg-red-50/50 border-red-100">
                    <div className="text-red-600 font-bold mb-1">Low Stock Alerts</div>
                    <div className="text-3xl font-bold text-[var(--brand-dark)]">{lowStockCount}</div>
                    <div className="text-sm text-[var(--text-muted)]">Items below minimum level</div>
                </div>
                <div className="glass-card p-6 rounded-2xl">
                    <div className="text-[var(--text-muted)] font-bold mb-1">Total Items</div>
                    <div className="text-3xl font-bold text-[var(--brand-dark)]">{inventory.length}</div>
                    <div className="text-sm text-[var(--text-muted)]">Tracked ingredients</div>
                </div>
                <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
                    <div className="text-[var(--text-muted)] font-bold mb-1">Estimated Value</div>
                    <div className="text-3xl font-bold text-[var(--brand-dark)]">₹{totalValue.toLocaleString()}</div>
                    <div className="text-sm text-[var(--text-muted)]">Based on avg cost</div>
                    <button
                        onClick={handleAnalyzeWastage}
                        className="absolute bottom-4 right-4 text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
                    >
                        <span>♻️</span> Analyze Waste
                    </button>
                </div>
            </div>

            <div className="glass-card rounded-2xl overflow-hidden animate-in" style={{ animationDelay: '0.2s' }}>
                <div className="p-4 md:p-6 border-b border-[var(--border-light)] flex gap-3 md:gap-4 bg-white/30 flex-col md:flex-row">
                    <input
                        type="text"
                        placeholder="Search ingredients..."
                        className="flex-1 px-4 py-2 text-sm border border-[var(--border-light)] rounded-xl outline-none focus:border-[var(--brand-primary)] bg-white/80"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select
                        className="px-4 py-2 text-sm border border-[var(--border-light)] rounded-xl outline-none focus:border-[var(--brand-primary)] bg-white/80"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option>All Status</option>
                        <option>Low Stock</option>
                        <option>Out of Stock</option>
                        <option>In Stock</option>
                    </select>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden grid grid-cols-1 gap-4 p-4">
                    {filteredItems.map((item) => (
                        <div key={item.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h3 className="font-bold text-gray-800">{item.name}</h3>
                                    <p className="text-xs text-gray-500">{item.category}</p>
                                </div>
                                <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase ${item.status === 'Out of Stock' ? 'bg-gray-100 text-gray-600' :
                                    item.status === 'Low Stock' ? 'bg-red-50 text-red-600' :
                                        'bg-green-50 text-green-600'
                                    }`}>
                                    {item.status}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4 bg-gray-50 p-3 rounded-xl">
                                <div>
                                    <div className="text-[10px] text-gray-400 uppercase font-black">Stock Level</div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <button onClick={() => handleQuickUpdate(item.id, item.quantity, -1)} className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-600 shadow-sm active:scale-95 transition-transform">-</button>
                                        <div className="font-bold text-[var(--brand-dark)]">{item.quantity} <span className="text-[10px] font-normal">{item.unit}</span></div>
                                        <button onClick={() => handleQuickUpdate(item.id, item.quantity, 1)} className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-600 shadow-sm active:scale-95 transition-transform">+</button>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[10px] text-gray-400 uppercase font-black">Supplier</div>
                                    <div className="text-xs font-bold text-gray-700 mt-1 truncate">{item.supplier?.name || '-'}</div>
                                    <div className="text-[10px] text-gray-500">{item.supplier?.contact || ''}</div>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button onClick={() => handleOpenHistory(item)} className="flex-1 py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold active:bg-blue-100">🕒 History</button>
                                <button onClick={() => handleOpenWastage(item)} className="flex-1 py-2 bg-orange-50 text-orange-600 rounded-xl text-xs font-bold active:bg-orange-100">🗑️ Waste</button>
                                <button onClick={() => handleOpenModal(item)} className="flex-1 py-2 bg-gray-50 text-gray-600 rounded-xl text-xs font-bold active:bg-gray-100">✏️ Edit</button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[var(--brand-primary)]/10 text-[var(--brand-dark)] text-sm uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-bold">Item Name</th>
                                <th className="px-6 py-4 font-bold">Category</th>
                                <th className="px-6 py-4 font-bold">Quantity</th>
                                <th className="px-6 py-4 font-bold">Status</th>
                                <th className="px-6 py-4 font-bold">Supplier</th>
                                <th className="px-6 py-4 font-bold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border-light)]">
                            {filteredItems.map((item) => (
                                <tr key={item.id} className="hover:bg-white/40 transition-colors">
                                    <td className="px-6 py-4 font-medium text-[var(--text-main)]">{item.name}</td>
                                    <td className="px-6 py-4 text-sm text-[var(--text-muted)]">{item.category}</td>
                                    <td className="px-6 py-4 font-bold text-[var(--brand-dark)]">
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => handleQuickUpdate(item.id, item.quantity, -1)} className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600">-</button>
                                            <span>{item.quantity} <span className="text-xs font-normal text-[var(--text-muted)]">{item.unit}</span></span>
                                            <button onClick={() => handleQuickUpdate(item.id, item.quantity, 1)} className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600">+</button>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.status === 'Out of Stock' ? 'bg-gray-200 text-gray-700' :
                                            item.status === 'Low Stock' ? 'bg-red-100 text-red-700 animate-pulse' :
                                                'bg-green-100 text-green-700'
                                            }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-[var(--text-muted)]">
                                        {item.supplier?.name ? (
                                            <div>
                                                <div className="font-medium text-[var(--brand-dark)]">{item.supplier.name}</div>
                                                <div className="text-xs">{item.supplier.contact}</div>
                                            </div>
                                        ) : '-'}
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button onClick={() => handleOpenHistory(item)} className="text-sm text-blue-500 hover:underline" title="History">🕒</button>
                                        <button onClick={() => handleOpenWastage(item)} className="text-sm text-orange-500 hover:underline" title="Report Wastage">🗑️</button>
                                        <button onClick={() => handleOpenModal(item)} className="text-sm text-[var(--brand-primary)] hover:underline font-medium">Edit</button>
                                        <button onClick={() => { if (confirm('Delete?')) deleteItem(item.id); }} className="text-sm text-red-500 hover:text-red-700">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl animate-in max-h-[90vh] overflow-y-auto custom-scrollbar">
                        <h2 className="text-2xl font-bold mb-6 text-[var(--brand-dark)]">
                            {editingItem ? 'Edit Item' : 'Add New Item'}
                        </h2>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                                <input required type="text" className="w-full px-4 py-2 border rounded-xl" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                                    <input required type="number" className="w-full px-4 py-2 border rounded-xl" value={formData.quantity} onChange={e => setFormData({ ...formData, quantity: Number(e.target.value) })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                                    <select className="w-full px-4 py-2 border rounded-xl" value={formData.unit} onChange={e => setFormData({ ...formData, unit: e.target.value })}>
                                        <option value="kg">kg</option>
                                        <option value="g">g</option>
                                        <option value="l">l</option>
                                        <option value="ml">ml</option>
                                        <option value="pcs">pcs</option>
                                        <option value="box">box</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Min Level</label>
                                    <input required type="number" className="w-full px-4 py-2 border rounded-xl" value={formData.minLevel} onChange={e => setFormData({ ...formData, minLevel: Number(e.target.value) })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <input type="text" className="w-full px-4 py-2 border rounded-xl" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} />
                                </div>
                            </div>

                            <div className="pt-4 border-t">
                                <h3 className="font-bold text-[var(--brand-dark)] mb-2">Supplier Details</h3>
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                        <input type="text" className="w-full px-4 py-2 border rounded-xl" value={formData.supplierName} onChange={e => setFormData({ ...formData, supplierName: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact / WhatsApp</label>
                                        <input type="text" className="w-full px-4 py-2 border rounded-xl" value={formData.supplierContact} onChange={e => setFormData({ ...formData, supplierContact: e.target.value })} />
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-8 pt-4 border-t">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl">Cancel</button>
                                <button type="submit" className="flex-1 px-4 py-2 bg-[var(--brand-primary)] text-white rounded-xl font-bold">Save Item</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* History Modal */}
            {isHistoryOpen && selectedItemForHistory && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl animate-in max-h-[80vh] overflow-y-auto custom-scrollbar">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">History: {selectedItemForHistory.name}</h2>
                            <button onClick={() => setIsHistoryOpen(false)} className="text-gray-500 hover:text-gray-700">✕</button>
                        </div>
                        <div className="space-y-3">
                            {stockLogs.filter(log => log.inventoryItemId === selectedItemForHistory.id).length === 0 ? (
                                <p className="text-gray-500 text-center py-4">No history available.</p>
                            ) : (
                                stockLogs.filter(log => log.inventoryItemId === selectedItemForHistory.id).map(log => (
                                    <div key={log.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                                        <div>
                                            <div className="font-medium text-gray-800">{log.reason || log.type}</div>
                                            <div className="text-xs text-gray-500">{new Date(log.createdAt).toLocaleString()}</div>
                                        </div>
                                        <div className={`font-bold ${log.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            {log.change > 0 ? '+' : ''}{log.change}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Wastage Modal */}
            {isWastageOpen && selectedItemForWastage && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl animate-in">
                        <h2 className="text-xl font-bold mb-4 text-red-600">Report Wastage</h2>
                        <p className="text-sm text-gray-600 mb-4">Reporting wastage for <strong>{selectedItemForWastage.name}</strong></p>
                        <form onSubmit={handleSaveWastage} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity Wasted</label>
                                <input required type="number" className="w-full px-4 py-2 border rounded-xl" value={wastageForm.quantity} onChange={e => setWastageForm({ ...wastageForm, quantity: Number(e.target.value) })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                                <select className="w-full px-4 py-2 border rounded-xl" value={wastageForm.reason} onChange={e => setWastageForm({ ...wastageForm, reason: e.target.value })}>
                                    <option value="">Select Reason</option>
                                    <option value="Expired">Expired</option>
                                    <option value="Damaged">Damaged</option>
                                    <option value="Spilled/Dropped">Spilled/Dropped</option>
                                    <option value="Burnt/Overcooked">Burnt/Overcooked</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button type="button" onClick={() => setIsWastageOpen(false)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl">Cancel</button>
                                <button type="submit" className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700">Report Waste</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Prediction Modal */}
            {showPredictModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-[2rem] p-8 w-full max-w-2xl shadow-2xl animate-in max-h-[85vh] overflow-hidden flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-2xl font-black text-purple-900 flex items-center gap-2">
                                    <span>🔮</span> AI Stock Forecast
                                </h2>
                                <p className="text-gray-500 text-sm">Data-driven depletion estimates</p>
                            </div>
                            <button onClick={() => setShowPredictModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl">✕</button>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                            {isPredicting ? (
                                <div className="py-20 flex flex-col items-center justify-center text-center">
                                    <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                                    <p className="text-purple-900 font-bold">Calculating burn rates...</p>
                                </div>
                            ) : (
                                <div className="grid gap-4">
                                    {predictions.map((p, idx) => (
                                        <div key={idx} className={`p-4 rounded-2xl border flex justify-between items-center ${p.daysLeft < 3 ? 'bg-red-50 border-red-100' : 'bg-gray-50 border-gray-100'}`}>
                                            <div>
                                                <h4 className="font-bold text-gray-800">{p.name}</h4>
                                                <p className="text-xs text-gray-500">{p.status}</p>
                                            </div>
                                            <div className="text-right">
                                                <div className={`text-xl font-black ${p.daysLeft < 3 ? 'text-red-600' : 'text-purple-600'}`}>
                                                    ~{p.daysLeft} <span className="text-xs font-bold uppercase">Days Left</span>
                                                </div>
                                                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                                    Action: {p.suggestedOrder}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="mt-6 pt-6 border-t flex justify-between items-center">
                            <span className="text-xs text-gray-400">Next update in 24 hours</span>
                            <button onClick={() => setShowPredictModal(false)} className="px-6 py-2 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200">
                                Dismiss
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Wastage Analysis Modal */}
            {showWasteModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-[2rem] p-8 w-full max-w-2xl shadow-2xl animate-in max-h-[85vh] overflow-hidden flex flex-col border-t-4 border-orange-500">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-2xl font-black text-orange-900 flex items-center gap-2">
                                    <span>♻️</span> Wastage Intelligence
                                </h2>
                                <p className="text-gray-500 text-sm">Identifying patterns to reduce food waste</p>
                            </div>
                            <button onClick={() => setShowWasteModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl">✕</button>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                            {isAnalyzingWaste ? (
                                <div className="py-20 flex flex-col items-center justify-center text-center">
                                    <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                                    <p className="text-orange-900 font-bold">Scanning wastage logs for leakages...</p>
                                </div>
                            ) : (
                                <div className="grid gap-4">
                                    {wasteReports.map((report, idx) => (
                                        <div key={idx} className="bg-orange-50/30 p-5 rounded-2xl border border-orange-100">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-bold text-orange-900">{report.title}</h4>
                                                <span className={`text-[10px] uppercase font-black px-2 py-1 rounded ${report.impact === 'High' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
                                                    {report.impact} Impact
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-700 mb-4">{report.finding}</p>
                                            <div className="bg-white p-3 rounded-xl border border-dashed border-orange-200">
                                                <span className="text-[10px] font-bold text-orange-400 uppercase block mb-1">AI Recommendation</span>
                                                <p className="text-sm font-bold text-orange-700">{report.recommendation}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="mt-6 pt-6 border-t flex justify-end">
                            <button onClick={() => setShowWasteModal(false)} className="px-8 py-3 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-all shadow-lg shadow-orange-200">
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
