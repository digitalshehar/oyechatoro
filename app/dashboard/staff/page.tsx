'use client';

import React, { useState } from 'react';
import { useUsers } from '../../lib/storage';

export default function StaffPage() {
    const { users, addUser, deleteUser } = useUsers();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', role: 'Staff' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const result = addUser(formData);
        if (result.success) {
            setIsModalOpen(false);
            setFormData({ name: '', email: '', phone: '', password: '', role: 'Staff' });
        } else {
            alert(result.error);
        }
    };

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8 animate-in">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--brand-dark)]">Staff Management</h1>
                    <p className="text-[var(--text-muted)]">Manage team access and roles</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn btn-primary flex items-center gap-2"
                >
                    <span>+ Add Staff</span>
                </button>
            </div>

            {/* Staff List */}
            <div className="glass-card rounded-2xl overflow-hidden animate-in" style={{ animationDelay: '0.1s' }}>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="text-left p-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="text-left p-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Contact</th>
                                <th className="text-left p-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Role</th>
                                <th className="text-right p-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4">
                                        <div className="font-bold text-gray-800">{user.name}</div>
                                        <div className="text-xs text-gray-400">ID: {user.id}</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="text-sm text-gray-600">{user.email}</div>
                                        <div className="text-sm text-gray-600">{user.phone}</div>
                                    </td>
                                    <td className="p-4">
                                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                                            Staff
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button
                                            onClick={() => deleteUser(user.id)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Remove Access"
                                        >
                                            🗑️
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-gray-400">
                                        No staff members found. Add one to get started.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Staff Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-800">Add New Staff</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full p-3 rounded-xl border border-gray-200 focus:border-[var(--brand-primary)] outline-none"
                                    placeholder="e.g. Rahul Kumar"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
                                <input
                                    required
                                    type="email"
                                    className="w-full p-3 rounded-xl border border-gray-200 focus:border-[var(--brand-primary)] outline-none"
                                    placeholder="e.g. rahul@oyechatoro.com"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number</label>
                                <input
                                    required
                                    type="tel"
                                    className="w-full p-3 rounded-xl border border-gray-200 focus:border-[var(--brand-primary)] outline-none"
                                    placeholder="e.g. 9876543210"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
                                <input
                                    required
                                    type="password"
                                    className="w-full p-3 rounded-xl border border-gray-200 focus:border-[var(--brand-primary)] outline-none"
                                    placeholder="Create a secure password"
                                    value={formData.password}
                                    onChange={e => setFormData({ ...formData, password: e.target.value })}
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
                                    className="flex-1 p-3 rounded-xl bg-[var(--brand-primary)] text-white font-bold hover:opacity-90 shadow-lg shadow-orange-200"
                                >
                                    Create Account
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
