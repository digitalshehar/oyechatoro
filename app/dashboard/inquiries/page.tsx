'use client';

import React, { useState } from 'react';
import { useDbInquiries } from '../../lib/db-hooks';
import { useSession } from 'next-auth/react';

export default function InquiriesPage() {
    const { data: session } = useSession();
    const { inquiries, loading, refetch } = useDbInquiries();
    const [editingInquiry, setEditingInquiry] = useState<any | null>(null);
    const [formData, setFormData] = useState({ status: '', notes: '' });

    // Access Control
    const role = (session?.user as any)?.role;
    if (role !== 'Admin' && role !== 'Manager') {
        return <div className="p-8 text-center text-red-500">Access Denied: Admins Only</div>;
    }

    if (loading) return <div className="p-8 text-center text-gray-500 animate-pulse">Loading inquiries...</div>;

    const handleEdit = (inquiry: any) => {
        setEditingInquiry(inquiry);
        setFormData({ status: inquiry.status, notes: inquiry.message || '' });
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/franchise', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: editingInquiry.id,
                    status: formData.status,
                    message: formData.notes
                })
            });

            if (res.ok) {
                setEditingInquiry(null);
                refetch();
            } else {
                alert('Failed to update');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            {/* Edit Modal */}
            {editingInquiry && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-800">Edit Application</h2>
                            <button onClick={() => setEditingInquiry(null)} className="text-gray-400 hover:text-gray-600">✕</button>
                        </div>
                        <form onSubmit={handleUpdate} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Status</label>
                                <select
                                    className="w-full p-3 rounded-xl border border-gray-200 focus:border-[var(--brand-primary)] outline-none"
                                    value={formData.status}
                                    onChange={e => setFormData({ ...formData, status: e.target.value })}
                                >
                                    <option value="New">New</option>
                                    <option value="Contacted">Contacted</option>
                                    <option value="Under Review">Under Review</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Rejected">Rejected</option>
                                    <option value="Closed">Closed</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Internal Notes / Message</label>
                                <textarea
                                    className="w-full p-3 rounded-xl border border-gray-200 focus:border-[var(--brand-primary)] outline-none min-h-[100px]"
                                    value={formData.notes}
                                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                                    placeholder="Add notes about this applicant..."
                                />
                            </div>
                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setEditingInquiry(null)}
                                    className="flex-1 p-3 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 p-3 rounded-xl bg-[var(--brand-primary)] text-white font-bold hover:opacity-90 shadow-lg shadow-orange-200"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 animate-in gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-[var(--brand-dark)]">Franchise Applications</h1>
                    <p className="text-sm md:text-base text-[var(--text-muted)]">Review requests from potential partners</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-lg border border-gray-100 shadow-sm text-sm font-bold w-full md:w-auto text-center md:text-left">
                    Total: {inquiries.length}
                </div>
            </div>

            <div className="overflow-hidden glass-card rounded-2xl border border-[var(--border-light)] animate-in" style={{ animationDelay: '0.1s' }}>
                {/* Desktop View */}
                <div className="hidden md:block">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 text-xs text-gray-500 uppercase tracking-wider">
                                <th className="p-4 font-bold border-b border-gray-100">Date</th>
                                <th className="p-4 font-bold border-b border-gray-100">Applicant</th>
                                <th className="p-4 font-bold border-b border-gray-100">Location / Budget</th>
                                <th className="p-4 font-bold border-b border-gray-100">Contact</th>
                                <th className="p-4 font-bold border-b border-gray-100">Status</th>
                                <th className="p-4 font-bold border-b border-gray-100">Message</th>
                                <th className="p-4 font-bold border-b border-gray-100">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {inquiries.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="p-8 text-center text-gray-400">
                                        No applications received yet.
                                    </td>
                                </tr>
                            ) : (
                                inquiries.map((inquiry) => (
                                    <tr key={inquiry.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="p-4 text-xs text-gray-500 font-mono whitespace-nowrap">
                                            {new Date(inquiry.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-4">
                                            <div className="font-bold text-gray-800">{inquiry.name}</div>
                                        </td>
                                        <td className="p-4">
                                            <div className="text-sm font-bold text-gray-700">{inquiry.location}</div>
                                            <div className="text-xs text-green-600 font-bold bg-green-50 inline-block px-1 rounded">{inquiry.budget}</div>
                                        </td>
                                        <td className="p-4 text-sm">
                                            <div className="flex flex-col gap-1">
                                                <a href={`tel:${inquiry.phone}`} className="text-blue-600 hover:underline">{inquiry.phone}</a>
                                                <a href={`mailto:${inquiry.email}`} className="text-gray-500 hover:text-gray-700">{inquiry.email}</a>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 text-xs font-bold rounded-full ${inquiry.status === 'New' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                                                {inquiry.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-gray-600 max-w-xs truncate" title={inquiry.message}>
                                            {inquiry.message || '-'}
                                        </td>
                                        <td className="p-4">
                                            <button
                                                onClick={() => handleEdit(inquiry)}
                                                className="text-xs font-bold text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors border border-blue-200"
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Mobile View */}
                <div className="md:hidden divide-y divide-gray-100 bg-white">
                    {inquiries.length === 0 ? (
                        <div className="p-8 text-center text-gray-400">No applications received yet.</div>
                    ) : (
                        inquiries.map((inquiry) => (
                            <div key={inquiry.id} className="p-4 space-y-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="font-bold text-gray-800 text-lg">{inquiry.name}</div>
                                        <div className="text-[10px] text-gray-400 font-mono tracking-tighter">
                                            {new Date(inquiry.createdAt).toLocaleString()}
                                        </div>
                                    </div>
                                    <span className={`px-2 py-0.5 text-[10px] font-black uppercase rounded-full ${inquiry.status === 'New' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                                        {inquiry.status}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div className="bg-gray-50 p-2 rounded-xl border border-gray-100">
                                        <div className="text-[10px] text-gray-400 font-bold uppercase mb-1">📍 Location</div>
                                        <div className="font-bold text-gray-700">{inquiry.location}</div>
                                    </div>
                                    <div className="bg-green-50/50 p-2 rounded-xl border border-green-100">
                                        <div className="text-[10px] text-green-600 font-bold uppercase mb-1">💰 Budget</div>
                                        <div className="font-bold text-green-700">{inquiry.budget}</div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between gap-4 pt-2">
                                    <div className="flex flex-col gap-1">
                                        <a href={`tel:${inquiry.phone}`} className="text-sm font-bold text-blue-600">📞 {inquiry.phone}</a>
                                        <div className="text-xs text-gray-500 truncate max-w-[150px]">{inquiry.email}</div>
                                    </div>
                                    <button
                                        onClick={() => handleEdit(inquiry)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-xl font-bold text-xs shadow-lg shadow-blue-100"
                                    >
                                        Edit
                                    </button>
                                </div>

                                {inquiry.message && (
                                    <div className="bg-gray-50 p-3 rounded-xl border border-dashed border-gray-200 text-xs text-gray-600 italic">
                                        "{inquiry.message}"
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
