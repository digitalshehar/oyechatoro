'use client';

import React, { useState } from 'react';
import { useInventory, InventoryItem, StockLog, WastageLog } from '../../lib/storage';

export default function InventoryPage() {
    const { inventory, stockLogs, wastageLogs, addItem, updateItem, deleteItem, recordWastage } = useInventory();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All Status');

    // Modal States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [isWastageOpen, setIsWastageOpen] = useState(false);

    const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
    const [selectedItemForHistory, setSelectedItemForHistory] = useState<InventoryItem | null>(null);
    const [selectedItemForWastage, setSelectedItemForWastage] = useState<InventoryItem | null>(null);

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

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-8 animate-in">
                <h1 className="text-3xl font-bold text-[var(--brand-dark)]">Inventory Management</h1>
                <button
                    onClick={() => handleOpenModal()}
                    className="px-6 py-2 bg-[var(--brand-primary)] text-white rounded-xl font-bold shadow-lg hover:shadow-orange-500/30 transition-all hover:-translate-y-0.5"
                >
                    + Add Item
                </button>
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
                <div className="glass-card p-6 rounded-2xl">
                    <div className="text-[var(--text-muted)] font-bold mb-1">Estimated Value</div>
                    <div className="text-3xl font-bold text-[var(--brand-dark)]">₹{totalValue.toLocaleString()}</div>
                    <div className="text-sm text-[var(--text-muted)]">Based on avg cost</div>
                </div>
            </div>

            <div className="glass-card rounded-2xl overflow-hidden animate-in" style={{ animationDelay: '0.2s' }}>
                <div className="p-6 border-b border-[var(--border-light)] flex gap-4 bg-white/30 flex-col md:flex-row">
                    <input
                        type="text"
                        placeholder="Search ingredients..."
                        className="flex-1 px-4 py-2 border border-[var(--border-light)] rounded-xl outline-none focus:border-[var(--brand-primary)] bg-white/80"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select
                        className="px-4 py-2 border border-[var(--border-light)] rounded-xl outline-none focus:border-[var(--brand-primary)] bg-white/80"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option>All Status</option>
                        <option>Low Stock</option>
                        <option>Out of Stock</option>
                        <option>In Stock</option>
                    </select>
                </div>

                <div className="overflow-x-auto">
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
                            {stockLogs.filter(log => log.itemId === selectedItemForHistory.id).length === 0 ? (
                                <p className="text-gray-500 text-center py-4">No history available.</p>
                            ) : (
                                stockLogs.filter(log => log.itemId === selectedItemForHistory.id).map(log => (
                                    <div key={log.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                                        <div>
                                            <div className="font-medium text-gray-800">{log.reason}</div>
                                            <div className="text-xs text-gray-500">{new Date(log.timestamp).toLocaleString()}</div>
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
        </div>
    );
}
