'use client';

import React from 'react';
import Link from 'next/link';

export default function DashboardPortal() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    React.useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin');
        setIsLoggedIn(!!isAdmin);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('role');
        window.location.reload();
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden font-sans bg-gray-50">
            {/* Background Decoration */}
            <div className="bg-decor"></div>

            {/* Logout Button (Visible only if logged in) */}
            {isLoggedIn && (
                <button
                    onClick={handleLogout}
                    className="absolute top-6 right-6 z-20 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm text-red-500 hover:bg-red-50 rounded-full shadow-sm transition-all font-medium text-sm border border-red-100"
                >
                    <span>🚪</span> Logout
                </button>
            )}

            <div className="max-w-4xl w-full p-8 relative z-10 animate-in">
                <div className="text-center mb-12">
                    <div className="text-6xl mb-4 animate-float">🥗</div>
                    <h1 className="text-4xl font-bold text-[var(--brand-dark)] mb-4">Oye Chatoro Portal</h1>
                    <p className="text-xl text-[var(--text-muted)]">Select your role to continue</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Admin Card */}
                    <Link href="/admin/login" className="group">
                        <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 h-full flex flex-col items-center text-center">
                            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">🛡️</div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Admin</h2>
                            <p className="text-gray-500 text-sm">Manage menu, orders, and analytics</p>
                            <div className="mt-auto pt-6 text-blue-600 font-bold text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">Login &rarr;</div>
                        </div>
                    </Link>

                    {/* Staff Card */}
                    <Link href="/staff/login" className="group">
                        <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 h-full flex flex-col items-center text-center">
                            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">🛒</div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Staff</h2>
                            <p className="text-gray-500 text-sm">POS system and order taking</p>
                            <div className="mt-auto pt-6 text-orange-600 font-bold text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">Login &rarr;</div>
                        </div>
                    </Link>

                    {/* Chef Card */}
                    <Link href="/chef/login" className="group">
                        <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 h-full flex flex-col items-center text-center">
                            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">👨‍🍳</div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Chef</h2>
                            <p className="text-gray-500 text-sm">Kitchen display and status updates</p>
                            <div className="mt-auto pt-6 text-green-600 font-bold text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">Login &rarr;</div>
                        </div>
                    </Link>
                </div>

                <div className="mt-12 text-center">
                    <Link href="/" className="text-gray-400 hover:text-gray-600 transition-colors">
                        &larr; Back to Website
                    </Link>
                </div>
            </div>
        </div>
    );
}
