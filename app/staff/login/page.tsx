'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StaffLoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        if (username === 'staff' && password === 'staff123') {
            localStorage.setItem('role', 'staff');
            localStorage.setItem('isAdmin', 'true'); // Needed for layout access
            router.push('/dashboard/pos');
        } else {
            setError('Invalid staff credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden font-sans bg-orange-50">
            <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md relative z-10 animate-in border border-orange-100">
                <div className="text-center mb-8">
                    <div className="text-6xl mb-4">🛒</div>
                    <h1 className="text-3xl font-bold text-orange-600 mb-2">Staff Login</h1>
                    <p className="text-gray-500">POS & Order Management</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                            placeholder="staff"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && (
                        <div className="p-3 rounded-xl bg-red-50 text-red-500 text-sm text-center font-medium border border-red-100">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-orange-500/30 transition-all duration-300"
                    >
                        Login as Staff
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <a href="/dashboard" className="text-sm text-gray-400 hover:text-gray-600">← Back to Portal</a>
                </div>
            </div>
        </div>
    );
}
