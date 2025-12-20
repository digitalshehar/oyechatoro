'use client';

import React, { useState, useEffect } from 'react';

interface FranchiseInquiry {
    id: string;
    name: string;
    email: string;
    phone: string;
    location: string;
    budget: string;
    message?: string;
    status: string;
    createdAt: string;
}

export default function LeadsPage() {
    const [leads, setLeads] = useState<FranchiseInquiry[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchLeads = async () => {
        try {
            const res = await fetch('/api/franchise');
            if (res.ok) {
                const data = await res.json();
                setLeads(data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'New': return 'bg-blue-100 text-blue-800';
            case 'Contacted': return 'bg-yellow-100 text-yellow-800';
            case 'Closed': return 'bg-green-100 text-green-800';
            case 'Rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const handleWhatsApp = (phone: string, name: string) => {
        const text = `Hi ${name}, this is regarding your Franchise application for Oye Chatoro.`;
        window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`, '_blank');
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading Leads...</div>;

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 animate-in">
            <h1 className="text-3xl font-bold text-[var(--brand-dark)] flex items-center gap-3">
                <span>🤝</span> Franchise Leads
            </h1>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100 sticky top-0">
                            <tr>
                                <th className="p-4 font-bold text-gray-500 uppercase text-xs">Date</th>
                                <th className="p-4 font-bold text-gray-500 uppercase text-xs">Name</th>
                                <th className="p-4 font-bold text-gray-500 uppercase text-xs">Location</th>
                                <th className="p-4 font-bold text-gray-500 uppercase text-xs">Budget</th>
                                <th className="p-4 font-bold text-gray-500 uppercase text-xs">Status</th>
                                <th className="p-4 font-bold text-gray-500 uppercase text-xs text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {leads.map(lead => (
                                <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4 text-sm whitespace-nowrap text-gray-500">
                                        {new Date(lead.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-4">
                                        <div className="font-bold text-gray-900">{lead.name}</div>
                                        <div className="text-xs text-gray-500">{lead.phone}</div>
                                        <div className="text-xs text-gray-400">{lead.email}</div>
                                    </td>
                                    <td className="p-4 text-sm font-medium">{lead.location}</td>
                                    <td className="p-4 text-sm font-bold text-gray-700">{lead.budget}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${getStatusColor(lead.status)}`}>
                                            {lead.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button
                                            onClick={() => handleWhatsApp(lead.phone, lead.name)}
                                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm inline-flex items-center gap-1"
                                        >
                                            <span>💬</span> Chat
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {leads.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="p-12 text-center text-gray-400">
                                        No leads found. Share the application link!
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
