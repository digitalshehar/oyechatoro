'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


export default function SignupPage() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
    const [error, setError] = useState('');
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Registration failed');
            }

            // Redirect to login
            router.push('/login?message=Account created! Please login.');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--bg-light)] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md animate-in">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-[var(--brand-dark)] mb-2">Create Account 🚀</h1>
                    <p className="text-[var(--text-muted)]">Join us for exclusive offers</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Full Name</label>
                        <input
                            required
                            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[var(--brand-primary)] outline-none"
                            placeholder="John Doe"
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[var(--brand-primary)] outline-none"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Phone Number</label>
                        <input
                            type="tel"
                            required
                            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[var(--brand-primary)] outline-none"
                            placeholder="9876543210"
                            value={form.phone}
                            onChange={e => setForm({ ...form, phone: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[var(--brand-primary)] outline-none"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={e => setForm({ ...form, password: e.target.value })}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-full py-3 text-lg btn-glow">
                        Sign Up
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-[var(--text-muted)]">
                    Already have an account?{' '}
                    <Link href="/login" className="text-[var(--brand-primary)] font-bold hover:underline">
                        Login
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
