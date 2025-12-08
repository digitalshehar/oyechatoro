'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../lib/storage';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            login(email, password);
            router.push('/profile');
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--bg-light)] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md animate-in">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-[var(--brand-dark)] mb-2">Welcome Back! 👋</h1>
                    <p className="text-[var(--text-muted)]">Login to track your orders</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[var(--brand-primary)] outline-none"
                            placeholder="you@example.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[var(--brand-primary)] outline-none"
                            placeholder="••••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-full py-3 text-lg btn-glow">
                        Login
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-[var(--text-muted)]">
                    Don't have an account?{' '}
                    <Link href="/signup" className="text-[var(--brand-primary)] font-bold hover:underline">
                        Sign Up
                    </Link>
                </div>

                <div className="mt-4 text-center">
                    <Link href="/" className="text-sm text-[var(--text-light)] hover:text-[var(--brand-dark)]">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
