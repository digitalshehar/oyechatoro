'use client';

import React, { useState } from 'react';
import { useCustomers } from '../../lib/storage';

export default function CustomersPage() {
    const { customers } = useCustomers();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCustomers = customers.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.phone.includes(searchTerm)
    );

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 animate-in gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--brand-dark)]">Customer CRM</h1>
                    <p className="text-[var(--text-muted)]">Track loyalty and customer history</p>
                </div>
                <div className="w-full md:w-auto">
                    <input
                        type="text"
                        placeholder="Search by name or phone..."
                        className="w-full md:w-64 px-4 py-2 rounded-xl border border-gray-200 focus:border-[var(--brand-primary)] outline-none"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Customers List */}
            <div className="glass-card rounded-2xl overflow-hidden animate-in" style={{ animationDelay: '0.1s' }}>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="text-left p-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                                <th className="text-left p-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Contact</th>
                                <th className="text-center p-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Orders</th>
                                <th className="text-center p-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Total Spent</th>
                                <th className="text-center p-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Loyalty Pts</th>
                                <th className="text-right p-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Last Visit</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredCustomers.map((customer) => (
                                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4">
                                        <div className="font-bold text-gray-800">{customer.name}</div>
                                        <div className="text-xs text-gray-400">ID: {customer.id}</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="text-sm text-gray-600">{customer.phone}</div>
                                        <div className="text-xs text-gray-400">{customer.email || '-'}</div>
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className="font-bold text-gray-700">{customer.totalOrders}</span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className="font-bold text-gray-700">₹{customer.totalSpent}</span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700">
                                            {customer.loyaltyPoints} pts
                                        </span>
                                    </td>
                                    <td className="p-4 text-right text-sm text-gray-500">
                                        {new Date(customer.lastVisit).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                            {filteredCustomers.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-gray-400">
                                        No customers found matching your search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
