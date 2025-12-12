'use client';

import React, { useState, useEffect, useCallback } from 'react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

interface Supplier {
    id: string;
    name: string;
    contactPerson?: string;
    phone?: string;
    email?: string;
    address?: string;
    gstNumber?: string;
    paymentTerms?: string;
    _count?: { orders: number };
}

interface PurchaseOrder {
    id: string;
    supplierId: string;
    supplier: { name: string };
    items: any[];
    totalAmount: number;
    status: 'Pending' | 'Ordered' | 'Received' | 'Cancelled';
    orderDate: string;
    deliveryDate?: string;
    notes?: string;
}

export default function SuppliersPage() {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [orders, setOrders] = useState<PurchaseOrder[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'suppliers' | 'orders'>('suppliers');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showPOModal, setShowPOModal] = useState(false);
    const [formData, setFormData] = useState<Partial<Supplier>>({});
    const [poFormData, setPOFormData] = useState<any>({ items: [] });

    const fetchSuppliers = useCallback(async () => {
        try {
            const res = await fetch('/api/suppliers');
            if (res.ok) {
                const data = await res.json();
                setSuppliers(data);
            }
        } catch (e) {
            console.error(e);
        }
    }, []);

    const fetchOrders = useCallback(async () => {
        try {
            const res = await fetch('/api/purchase-orders');
            if (res.ok) {
                const data = await res.json();
                setOrders(data);
            }
        } catch (e) {
            console.error(e);
        }
    }, []);

    useEffect(() => {
        Promise.all([fetchSuppliers(), fetchOrders()]).finally(() => setLoading(false));
    }, [fetchSuppliers, fetchOrders]);

    const handleAddSupplier = async () => {
        if (!formData.name) return;
        try {
            const res = await fetch('/api/suppliers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                fetchSuppliers();
                setShowAddModal(false);
                setFormData({});
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleCreatePO = async () => {
        if (!poFormData.supplierId || poFormData.items.length === 0) return;
        try {
            const totalAmount = poFormData.items.reduce((sum: number, i: any) =>
                sum + (i.quantity * i.unitPrice), 0);

            const res = await fetch('/api/purchase-orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...poFormData, totalAmount })
            });
            if (res.ok) {
                fetchOrders();
                setShowPOModal(false);
                setPOFormData({ items: [] });
            }
        } catch (e) {
            console.error(e);
        }
    };

    const updatePOStatus = async (id: string, status: string) => {
        try {
            await fetch(`/api/purchase-orders/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });
            fetchOrders();
        } catch (e) {
            console.error(e);
        }
    };

    const addPOItem = () => {
        setPOFormData((prev: any) => ({
            ...prev,
            items: [...prev.items, { name: '', quantity: 1, unit: 'kg', unitPrice: 0 }]
        }));
    };

    const updatePOItem = (index: number, field: string, value: any) => {
        setPOFormData((prev: any) => ({
            ...prev,
            items: prev.items.map((item: any, i: number) =>
                i === index ? { ...item, [field]: value } : item
            )
        }));
    };

    if (loading) {
        return <div className="p-12 flex justify-center"><LoadingSpinner /></div>;
    }

    const statusColors: Record<string, string> = {
        Pending: 'bg-yellow-100 text-yellow-700',
        Ordered: 'bg-blue-100 text-blue-700',
        Received: 'bg-green-100 text-green-700',
        Cancelled: 'bg-red-100 text-red-700'
    };

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--brand-dark)]">
                        🚚 Suppliers & POs
                        <span className="text-sm font-normal text-gray-400 bg-gray-100 px-2 py-1 rounded-full ml-2">
                            Live Database
                        </span>
                    </h1>
                    <p className="text-[var(--text-muted)]">Manage vendors and purchase orders</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="px-4 py-2 bg-[var(--brand-primary)] text-white rounded-xl font-semibold hover:bg-[var(--brand-secondary)] transition-all"
                    >
                        + Add Supplier
                    </button>
                    <button
                        onClick={() => setShowPOModal(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
                    >
                        + New PO
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6">
                {['suppliers', 'orders'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all ${activeTab === tab
                                ? 'bg-[var(--brand-primary)] text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        {tab === 'suppliers' ? `📋 Suppliers (${suppliers.length})` : `📦 Orders (${orders.length})`}
                    </button>
                ))}
            </div>

            {/* Suppliers Tab */}
            {activeTab === 'suppliers' && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {suppliers.map(supplier => (
                        <div key={supplier.id} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">{supplier.name}</h3>
                                    {supplier.contactPerson && (
                                        <p className="text-sm text-gray-500">👤 {supplier.contactPerson}</p>
                                    )}
                                </div>
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-semibold">
                                    Active
                                </span>
                            </div>
                            <div className="space-y-2 text-sm text-gray-600">
                                {supplier.phone && <div>📞 {supplier.phone}</div>}
                                {supplier.email && <div>📧 {supplier.email}</div>}
                                {supplier.address && <div>📍 {supplier.address}</div>}
                                {supplier.paymentTerms && (
                                    <div className="mt-2 text-xs text-gray-400">
                                        💳 {supplier.paymentTerms}
                                    </div>
                                )}
                            </div>
                            <div className="mt-4 pt-4 border-t text-sm text-gray-400">
                                {supplier._count?.orders || 0} purchase orders
                            </div>
                        </div>
                    ))}
                    {suppliers.length === 0 && (
                        <div className="col-span-3 text-center py-12 text-gray-400">
                            No suppliers yet. Add your first vendor!
                        </div>
                    )}
                </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left p-4 text-xs font-bold text-gray-500 uppercase">PO #</th>
                                <th className="text-left p-4 text-xs font-bold text-gray-500 uppercase">Supplier</th>
                                <th className="text-center p-4 text-xs font-bold text-gray-500 uppercase">Items</th>
                                <th className="text-right p-4 text-xs font-bold text-gray-500 uppercase">Amount</th>
                                <th className="text-center p-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                                <th className="text-right p-4 text-xs font-bold text-gray-500 uppercase">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {orders.map(order => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="p-4 font-mono text-sm">{order.id.slice(0, 8)}...</td>
                                    <td className="p-4 font-semibold">{order.supplier.name}</td>
                                    <td className="p-4 text-center">{order.items.length} items</td>
                                    <td className="p-4 text-right font-bold">₹{order.totalAmount}</td>
                                    <td className="p-4 text-center">
                                        <select
                                            value={order.status}
                                            onChange={(e) => updatePOStatus(order.id, e.target.value)}
                                            className={`px-2 py-1 rounded-lg text-xs font-bold ${statusColors[order.status]}`}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Ordered">Ordered</option>
                                            <option value="Received">Received</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td className="p-4 text-right text-sm text-gray-500">
                                        {new Date(order.orderDate).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                            {orders.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="p-12 text-center text-gray-400">
                                        No purchase orders yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Add Supplier Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Add New Supplier</h2>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Supplier Name *"
                                value={formData.name || ''}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-orange-500 outline-none"
                            />
                            <input
                                type="text"
                                placeholder="Contact Person"
                                value={formData.contactPerson || ''}
                                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-orange-500 outline-none"
                            />
                            <div className="grid grid-cols-2 gap-2">
                                <input
                                    type="tel"
                                    placeholder="Phone"
                                    value={formData.phone || ''}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="px-4 py-3 rounded-xl border focus:ring-2 focus:ring-orange-500 outline-none"
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={formData.email || ''}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="px-4 py-3 rounded-xl border focus:ring-2 focus:ring-orange-500 outline-none"
                                />
                            </div>
                            <input
                                type="text"
                                placeholder="Address"
                                value={formData.address || ''}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-orange-500 outline-none"
                            />
                            <div className="grid grid-cols-2 gap-2">
                                <input
                                    type="text"
                                    placeholder="GST Number"
                                    value={formData.gstNumber || ''}
                                    onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
                                    className="px-4 py-3 rounded-xl border focus:ring-2 focus:ring-orange-500 outline-none"
                                />
                                <select
                                    value={formData.paymentTerms || ''}
                                    onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
                                    className="px-4 py-3 rounded-xl border focus:ring-2 focus:ring-orange-500 outline-none"
                                >
                                    <option value="">Payment Terms</option>
                                    <option value="COD">Cash on Delivery</option>
                                    <option value="Net 7">Net 7 Days</option>
                                    <option value="Net 15">Net 15 Days</option>
                                    <option value="Net 30">Net 30 Days</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-2 mt-6">
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-semibold"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddSupplier}
                                className="flex-1 py-3 bg-[var(--brand-primary)] text-white rounded-xl font-semibold"
                            >
                                Add Supplier
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Create PO Modal */}
            {showPOModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-bold mb-4">Create Purchase Order</h2>
                        <div className="space-y-4">
                            <select
                                value={poFormData.supplierId || ''}
                                onChange={(e) => setPOFormData({ ...poFormData, supplierId: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none"
                            >
                                <option value="">Select Supplier *</option>
                                {suppliers.map(s => (
                                    <option key={s.id} value={s.id}>{s.name}</option>
                                ))}
                            </select>

                            <div className="border rounded-xl p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold">Items</span>
                                    <button
                                        onClick={addPOItem}
                                        className="text-sm text-blue-600 font-semibold"
                                    >
                                        + Add Item
                                    </button>
                                </div>
                                {poFormData.items.map((item: any, idx: number) => (
                                    <div key={idx} className="grid grid-cols-4 gap-2 mb-2">
                                        <input
                                            type="text"
                                            placeholder="Item Name"
                                            value={item.name}
                                            onChange={(e) => updatePOItem(idx, 'name', e.target.value)}
                                            className="col-span-2 px-3 py-2 rounded-lg border text-sm"
                                        />
                                        <input
                                            type="number"
                                            placeholder="Qty"
                                            value={item.quantity}
                                            onChange={(e) => updatePOItem(idx, 'quantity', Number(e.target.value))}
                                            className="px-3 py-2 rounded-lg border text-sm"
                                        />
                                        <input
                                            type="number"
                                            placeholder="Price"
                                            value={item.unitPrice}
                                            onChange={(e) => updatePOItem(idx, 'unitPrice', Number(e.target.value))}
                                            className="px-3 py-2 rounded-lg border text-sm"
                                        />
                                    </div>
                                ))}
                                {poFormData.items.length > 0 && (
                                    <div className="text-right font-bold text-lg mt-2">
                                        Total: ₹{poFormData.items.reduce((sum: number, i: any) =>
                                            sum + (i.quantity * i.unitPrice), 0)}
                                    </div>
                                )}
                            </div>

                            <textarea
                                placeholder="Notes (optional)"
                                value={poFormData.notes || ''}
                                onChange={(e) => setPOFormData({ ...poFormData, notes: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none"
                                rows={2}
                            />
                        </div>
                        <div className="flex gap-2 mt-6">
                            <button
                                onClick={() => setShowPOModal(false)}
                                className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-semibold"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreatePO}
                                className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-semibold"
                            >
                                Create PO
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
