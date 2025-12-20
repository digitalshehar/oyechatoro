'use client';

import React, { useState, useEffect } from 'react';
import { useDbFinance, Expense } from '../../lib/db-hooks';
import { Order } from '../../lib/db-hooks';

const API_BASE = '/api';

export default function FinancePage() {
    const [activeTab, setActiveTab] = useState<'closing' | 'expenses' | 'gst'>('closing');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    // Hooks
    const { expenses, loading: loadingExpenses, addExpense, deleteExpense } = useDbFinance(selectedDate);

    // Local state for orders
    const [dailyOrders, setDailyOrders] = useState<Order[]>([]);
    const [loadingOrders, setLoadingOrders] = useState(true);

    const [newExpense, setNewExpense] = useState({ category: 'Ingredients', description: '', amount: '' });

    // Fetch orders for selected date
    useEffect(() => {
        const fetchDailyOrders = async () => {
            setLoadingOrders(true);
            try {
                // Create start/end for the selected date in local time (or just full day UTC coverage)
                // Using simple string matching or exact bounds often tricky with timezones.
                // Let's assume server handles UTC comparison correctly if we send ISO.
                const start = new Date(selectedDate);
                start.setHours(0, 0, 0, 0);
                const end = new Date(selectedDate);
                end.setHours(23, 59, 59, 999);

                const res = await fetch(`${API_BASE}/orders?start=${start.toISOString()}&end=${end.toISOString()}`, { cache: 'no-store' });
                if (res.ok) {
                    const json = await res.json();
                    setDailyOrders(json);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoadingOrders(false);
            }
        };
        fetchDailyOrders();
    }, [selectedDate]);

    // Calculations
    const todayOrders = dailyOrders.filter(o => o.status !== 'Cancelled');
    const todaySales = todayOrders.reduce((sum, o) => sum + o.total, 0);
    const todayCash = todayOrders.filter(o => o.paymentMethod === 'Cash' && o.paymentStatus === 'Paid').reduce((sum, o) => sum + o.total, 0);
    const todayOnline = todayOrders.filter(o => o.paymentMethod !== 'Cash' && o.paymentStatus === 'Paid').reduce((sum, o) => sum + o.total, 0);
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    const netCash = todayCash - totalExpenses;

    // GST Calculations (5% GST)
    const gstRate = 0.05;
    const gstAmount = Math.round(todaySales * gstRate / (1 + gstRate));
    const baseAmount = todaySales - gstAmount;

    const handleAddExpense = async () => {
        if (!newExpense.description || !newExpense.amount) return;
        const success = await addExpense({
            date: selectedDate,
            category: newExpense.category,
            description: newExpense.description,
            amount: parseFloat(newExpense.amount)
        });
        if (success) {
            setNewExpense({ category: 'Ingredients', description: '', amount: '' });
        }
    };

    const handleDeleteExpense = async (id: string) => {
        if (confirm('Delete this expense?')) {
            await deleteExpense(id);
        }
    };

    if (loadingOrders || loadingExpenses) {
        return <div className="p-8 text-center text-gray-400">Loading finance data...</div>;
    }

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--brand-dark)]">💰 Finance Management</h1>
                    <p className="text-[var(--text-muted)]">Cash closing, expenses & tax reports</p>
                </div>
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
                />
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {[
                    { id: 'closing', label: '📊 Daily Closing' },
                    { id: 'expenses', label: '💸 Expenses' },
                    { id: 'gst', label: '📄 GST Report' }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${activeTab === tab.id
                            ? 'bg-[var(--brand-dark)] text-white'
                            : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {activeTab === 'closing' && (
                <div className="space-y-6 animate-in">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
                        <div className="glass-card p-4 rounded-xl bg-blue-50 border border-blue-100">
                            <div className="text-[10px] md:text-xs text-blue-600 mb-1">Total Sales</div>
                            <div className="text-xl md:text-2xl font-bold text-blue-700">₹{todaySales}</div>
                            <div className="text-[10px] text-blue-500">{todayOrders.length} orders</div>
                        </div>
                        <div className="glass-card p-4 rounded-xl bg-green-50 border border-green-100">
                            <div className="text-[10px] md:text-xs text-green-600 mb-1">💵 Cash In</div>
                            <div className="text-xl md:text-2xl font-bold text-green-700">₹{todayCash}</div>
                        </div>
                        <div className="glass-card p-4 rounded-xl bg-purple-50 border border-purple-100">
                            <div className="text-[10px] md:text-xs text-purple-600 mb-1">💳 Online</div>
                            <div className="text-xl md:text-2xl font-bold text-purple-700">₹{todayOnline}</div>
                        </div>
                        <div className="glass-card p-4 rounded-xl bg-red-50 border border-red-100">
                            <div className="text-[10px] md:text-xs text-red-600 mb-1">💸 Expenses</div>
                            <div className="text-xl md:text-2xl font-bold text-red-700">₹{totalExpenses}</div>
                        </div>
                        <div className="glass-card p-4 rounded-xl bg-yellow-50 border border-yellow-100 col-span-2 md:col-span-1">
                            <div className="text-[10px] md:text-xs text-yellow-600 mb-1">🏦 Net Cash</div>
                            <div className={`text-xl md:text-2xl font-bold ${netCash >= 0 ? 'text-green-700' : 'text-red-700'}`}>₹{netCash}</div>
                        </div>
                    </div>

                    {/* Report Generation */}
                    <div className="glass-card p-6 rounded-xl">
                        <h3 className="font-bold text-lg mb-4">Day Closing Report</h3>
                        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                            <p className="text-gray-600">Generate a report text file for {selectedDate}.</p>
                            <button
                                onClick={() => {
                                    const report = `Day Closing Report - ${selectedDate}
--------------------------------
Total Sales:    ₹${todaySales}
Orders Count:   ${todayOrders.length}
--------------------------------
Cash Sales:     ₹${todayCash}
Online Sales:   ₹${todayOnline}
Total Expenses: ₹${totalExpenses}
--------------------------------
NET CASH IN HAND: ₹${netCash}
--------------------------------`;
                                    const blob = new Blob([report], { type: 'text/plain' });
                                    const url = URL.createObjectURL(blob);
                                    const a = document.createElement('a');
                                    a.href = url;
                                    a.download = `closing_report_${selectedDate}.txt`;
                                    a.click();
                                }}
                                className="px-6 py-3 bg-[var(--brand-primary)] text-white rounded-xl font-bold hover:bg-orange-600 transition-colors"
                            >
                                🔒 Generate Report
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'expenses' && (
                <div className="space-y-6 animate-in">
                    {/* Add Expense Form */}
                    <div className="glass-card p-6 rounded-xl">
                        <h3 className="font-bold text-lg mb-4">Add Expense</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <select
                                value={newExpense.category}
                                onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                                className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
                            >
                                <option>Ingredients</option>
                                <option>Salary</option>
                                <option>Rent</option>
                                <option>Utilities</option>
                                <option>Maintenance</option>
                                <option>Marketing</option>
                                <option>Other</option>
                            </select>
                            <input
                                placeholder="Description"
                                value={newExpense.description}
                                onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                                className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
                            />
                            <input
                                type="number"
                                placeholder="Amount ₹"
                                value={newExpense.amount}
                                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                                className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
                            />
                            <button
                                onClick={handleAddExpense}
                                className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors"
                            >
                                + Add Expense
                            </button>
                        </div>
                    </div>

                    {/* Expenses List */}
                    <div className="glass-card rounded-xl overflow-hidden">
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="font-bold">Expenses for {selectedDate}</h3>
                            <span className="text-red-600 font-bold">Total: ₹{totalExpenses}</span>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {expenses.length === 0 ? (
                                <div className="p-8 text-center text-gray-400">No expenses for this day</div>
                            ) : (
                                expenses.map(exp => (
                                    <div key={exp.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                                        <div>
                                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded mr-2">{exp.category}</span>
                                            <span className="font-medium">{exp.description}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="font-bold text-red-600">₹{exp.amount}</span>
                                            <button onClick={() => handleDeleteExpense(exp.id)} className="text-gray-400 hover:text-red-500">🗑️</button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'gst' && (
                <div className="space-y-6 animate-in">
                    {/* GST Summary */}
                    <div className="glass-card p-6 rounded-xl">
                        <h3 className="font-bold text-lg mb-4">GST Summary for {selectedDate}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                                <div className="text-sm text-blue-600 mb-1">Total Sales (incl. GST)</div>
                                <div className="text-3xl font-bold text-blue-700">₹{todaySales}</div>
                            </div>
                            <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                                <div className="text-sm text-green-600 mb-1">Base Amount</div>
                                <div className="text-3xl font-bold text-green-700">₹{baseAmount}</div>
                            </div>
                            <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                                <div className="text-sm text-orange-600 mb-1">GST Amount (5%)</div>
                                <div className="text-3xl font-bold text-orange-700">₹{gstAmount}</div>
                            </div>
                        </div>
                    </div>

                    {/* GST Breakup */}
                    <div className="glass-card p-4 md:p-6 rounded-xl overflow-x-auto">
                        <h3 className="font-bold text-lg mb-4">GST Breakup (CGST + SGST)</h3>
                        <table className="w-full min-w-[300px]">
                            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                                <tr>
                                    <th className="p-3 md:p-4 text-left">Description</th>
                                    <th className="p-3 md:p-4 text-right">Rate</th>
                                    <th className="p-3 md:p-4 text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm">
                                <tr>
                                    <td className="p-3 md:p-4">Taxable Value</td>
                                    <td className="p-3 md:p-4 text-right">-</td>
                                    <td className="p-3 md:p-4 text-right font-medium">₹{baseAmount}</td>
                                </tr>
                                <tr>
                                    <td className="p-3 md:p-4">CGST</td>
                                    <td className="p-3 md:p-4 text-right">2.5%</td>
                                    <td className="p-3 md:p-4 text-right font-medium">₹{Math.round(gstAmount / 2)}</td>
                                </tr>
                                <tr>
                                    <td className="p-3 md:p-4">SGST</td>
                                    <td className="p-3 md:p-4 text-right">2.5%</td>
                                    <td className="p-3 md:p-4 text-right font-medium">₹{Math.round(gstAmount / 2)}</td>
                                </tr>
                                <tr className="bg-gray-50 font-bold">
                                    <td className="p-3 md:p-4">Total Tax</td>
                                    <td className="p-3 md:p-4 text-right">5%</td>
                                    <td className="p-3 md:p-4 text-right">₹{gstAmount}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Export Button */}
                    <button
                        onClick={() => {
                            const data = `GST Report - ${selectedDate}\n\nTotal Sales: ₹${todaySales}\nBase Amount: ₹${baseAmount}\nCGST (2.5%): ₹${Math.round(gstAmount / 2)}\nSGST (2.5%): ₹${Math.round(gstAmount / 2)}\nTotal GST: ₹${gstAmount}`;
                            const blob = new Blob([data], { type: 'text/plain' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `gst_report_${selectedDate}.txt`;
                            a.click();
                        }}
                        className="w-full md:w-auto px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                    >
                        📥 Download GST Report
                    </button>
                </div>
            )}
        </div>
    );
}
