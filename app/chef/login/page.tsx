'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ChefLoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        if (username === 'chef' && password === 'chef123') {
            localStorage.setItem('role', 'chef');
            router.push('/chef');
        } else {
            setError('Invalid chef credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden font-sans bg-gray-900 text-white">
            <div className="bg-gray-800 p-8 rounded-3xl shadow-xl w-full max-w-md relative z-10 animate-in border border-gray-700">
                <div className="text-center mb-8">
                    <div className="text-6xl mb-4">👨‍🍳</div>
                    <h1 className="text-3xl font-bold text-white mb-2">Kitchen Portal</h1>
                    <p className="text-gray-400">Chef Access Only</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                            placeholder="chef"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && (
                        <div className="p-3 rounded-xl bg-red-500/20 text-red-400 text-sm text-center font-medium border border-red-500/30">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-green-600/20 transition-all duration-300"
                    >
                        Login as Chef
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <a href="/dashboard" className="text-sm text-gray-500 hover:text-gray-300">← Back to Portal</a>
                </div>
            </div>
        </div>
    );
}
