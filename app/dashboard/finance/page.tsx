'use client';

import React, { useState, useEffect } from 'react';
import { getOrders, Order } from '../../lib/storage';

interface Expense {
    id: string;
    date: string;
    category: string;
    description: string;
    amount: number;
}

interface DaySummary {
    date: string;
    totalSales: number;
    cashSales: number;
    onlineSales: number;
    totalOrders: number;
    expenses: number;
    netCash: number;
    isClosed: boolean;
}

const EXPENSES_KEY = 'oye_chatoro_expenses';
const DAY_CLOSING_KEY = 'oye_chatoro_day_closing';

export default function FinancePage() {
    const [activeTab, setActiveTab] = useState<'closing' | 'expenses' | 'gst'>('closing');
    const [orders, setOrders] = useState<Order[]>([]);
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [closedDays, setClosedDays] = useState<string[]>([]);
    const [newExpense, setNewExpense] = useState({ category: 'Ingredients', description: '', amount: '' });
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    useEffect(() => {
        setOrders(getOrders());
        const storedExpenses = localStorage.getItem(EXPENSES_KEY);
        if (storedExpenses) setExpenses(JSON.parse(storedExpenses));
        const storedClosing = localStorage.getItem(DAY_CLOSING_KEY);
        if (storedClosing) setClosedDays(JSON.parse(storedClosing));

        const handleUpdate = () => setOrders(getOrders());
        window.addEventListener('ordersUpdated', handleUpdate);
        return () => window.removeEventListener('ordersUpdated', handleUpdate);
    }, []);

    // Get today's data
    const today = new Date().toISOString().split('T')[0];
    const todayOrders = orders.filter(o => {
        const orderDate = new Date(o.createdAt || Date.now()).toISOString().split('T')[0];
        return orderDate === selectedDate && o.status !== 'Cancelled';
    });

    const todaySales = todayOrders.reduce((sum, o) => sum + o.total, 0);
    const todayCash = todayOrders.filter(o => o.paymentMethod === 'Cash' && o.paymentStatus === 'Paid').reduce((sum, o) => sum + o.total, 0);
    const todayOnline = todayOrders.filter(o => o.paymentMethod !== 'Cash' && o.paymentStatus === 'Paid').reduce((sum, o) => sum + o.total, 0);
    const todayExpenses = expenses.filter(e => e.date === selectedDate).reduce((sum, e) => sum + e.amount, 0);
    const netCash = todayCash - todayExpenses;

    // GST Calculations (5% GST for restaurants)
    const gstRate = 0.05;
    const gstAmount = Math.round(todaySales * gstRate / (1 + gstRate));
    const baseAmount = todaySales - gstAmount;

    const addExpense = () => {
        if (!newExpense.description || !newExpense.amount) return;
        const expense: Expense = {
            id: `exp_${Date.now()}`,
            date: selectedDate,
            category: newExpense.category,
            description: newExpense.description,
            amount: parseFloat(newExpense.amount)
        };
        const updated = [expense, ...expenses];
        setExpenses(updated);
        localStorage.setItem(EXPENSES_KEY, JSON.stringify(updated));
        setNewExpense({ category: 'Ingredients', description: '', amount: '' });
    };

    const deleteExpense = (id: string) => {
        const updated = expenses.filter(e => e.id !== id);
        setExpenses(updated);
        localStorage.setItem(EXPENSES_KEY, JSON.stringify(updated));
    };

    const closeDay = () => {
        if (closedDays.includes(selectedDate)) return;
        const updated = [...closedDays, selectedDate];
        setClosedDays(updated);
        localStorage.setItem(DAY_CLOSING_KEY, JSON.stringify(updated));
        alert(`Day closed for ${selectedDate}!\n\nTotal Sales: ₹${todaySales}\nCash: ₹${todayCash}\nOnline: ₹${todayOnline}\nExpenses: ₹${todayExpenses}\nNet Cash: ₹${netCash}`);
    };

    const isDayClosed = closedDays.includes(selectedDate);

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
                <div className="space-y-6">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div className="glass-card p-4 rounded-xl bg-blue-50 border border-blue-100">
                            <div className="text-xs text-blue-600 mb-1">Total Sales</div>
                            <div className="text-2xl font-bold text-blue-700">₹{todaySales}</div>
                            <div className="text-xs text-blue-500">{todayOrders.length} orders</div>
                        </div>
                        <div className="glass-card p-4 rounded-xl bg-green-50 border border-green-100">
                            <div className="text-xs text-green-600 mb-1">💵 Cash In</div>
                            <div className="text-2xl font-bold text-green-700">₹{todayCash}</div>
                        </div>
                        <div className="glass-card p-4 rounded-xl bg-purple-50 border border-purple-100">
                            <div className="text-xs text-purple-600 mb-1">💳 Online</div>
                            <div className="text-2xl font-bold text-purple-700">₹{todayOnline}</div>
                        </div>
                        <div className="glass-card p-4 rounded-xl bg-red-50 border border-red-100">
                            <div className="text-xs text-red-600 mb-1">💸 Expenses</div>
                            <div className="text-2xl font-bold text-red-700">₹{todayExpenses}</div>
                        </div>
                        <div className="glass-card p-4 rounded-xl bg-yellow-50 border border-yellow-100">
                            <div className="text-xs text-yellow-600 mb-1">🏦 Net Cash</div>
                            <div className={`text-2xl font-bold ${netCash >= 0 ? 'text-green-700' : 'text-red-700'}`}>₹{netCash}</div>
                        </div>
                    </div>

                    {/* Close Day Button */}
                    <div className="glass-card p-6 rounded-xl">
                        <h3 className="font-bold text-lg mb-4">Day Closing</h3>
                        {isDayClosed ? (
                            <div className="bg-green-100 text-green-800 p-4 rounded-xl flex items-center gap-3">
                                <span className="text-2xl">✅</span>
                                <span className="font-medium">Day already closed for {selectedDate}</span>
                            </div>
                        ) : (
                            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                                <p className="text-gray-600">Close the day to finalize all transactions for {selectedDate}.</p>
                                <button
                                    onClick={closeDay}
                                    className="px-6 py-3 bg-[var(--brand-primary)] text-white rounded-xl font-bold hover:bg-orange-600 transition-colors"
                                >
                                    🔒 Close Day
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {activeTab === 'expenses' && (
                <div className="space-y-6">
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
                                onClick={addExpense}
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
                            <span className="text-red-600 font-bold">Total: ₹{todayExpenses}</span>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {expenses.filter(e => e.date === selectedDate).length === 0 ? (
                                <div className="p-8 text-center text-gray-400">No expenses for this day</div>
                            ) : (
                                expenses.filter(e => e.date === selectedDate).map(exp => (
                                    <div key={exp.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                                        <div>
                                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded mr-2">{exp.category}</span>
                                            <span className="font-medium">{exp.description}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="font-bold text-red-600">₹{exp.amount}</span>
                                            <button onClick={() => deleteExpense(exp.id)} className="text-gray-400 hover:text-red-500">🗑️</button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'gst' && (
                <div className="space-y-6">
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
                    <div className="glass-card p-6 rounded-xl">
                        <h3 className="font-bold text-lg mb-4">GST Breakup (CGST + SGST)</h3>
                        <table className="w-full">
                            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                                <tr>
                                    <th className="p-4 text-left">Description</th>
                                    <th className="p-4 text-right">Rate</th>
                                    <th className="p-4 text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                <tr>
                                    <td className="p-4">Taxable Value</td>
                                    <td className="p-4 text-right">-</td>
                                    <td className="p-4 text-right font-medium">₹{baseAmount}</td>
                                </tr>
                                <tr>
                                    <td className="p-4">CGST</td>
                                    <td className="p-4 text-right">2.5%</td>
                                    <td className="p-4 text-right font-medium">₹{Math.round(gstAmount / 2)}</td>
                                </tr>
                                <tr>
                                    <td className="p-4">SGST</td>
                                    <td className="p-4 text-right">2.5%</td>
                                    <td className="p-4 text-right font-medium">₹{Math.round(gstAmount / 2)}</td>
                                </tr>
                                <tr className="bg-gray-50 font-bold">
                                    <td className="p-4">Total Tax</td>
                                    <td className="p-4 text-right">5%</td>
                                    <td className="p-4 text-right">₹{gstAmount}</td>
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
