'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useDbServiceRequests as useServiceRequests } from '../lib/db-hooks';
import { signOut } from 'next-auth/react';
import type { Session } from 'next-auth';

export default function ClientLayout({ children, session }: { children: React.ReactNode; session: Session | null }) {
    const router = useRouter();
    const pathname = usePathname();
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Derived role from session
    // Extend session type if needed, or cast user as any to access custom role
    const userRole = (session?.user as any)?.role || 'Staff';

    const { requests } = useServiceRequests();
    const pendingRequests = requests.filter(r => r.status === 'Pending');
    const [prevRequestCount, setPrevRequestCount] = useState(0);

    useEffect(() => {
        // Staff Access Control
        if (userRole === 'Staff') {
            const allowedPaths = ['/dashboard/pos', '/dashboard'];
            if (!allowedPaths.includes(pathname)) {
                // Optional: redirect strict staff to POS if they wander
                // router.push('/dashboard/pos'); 
            }
        }

        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setIsDarkMode(true);
            document.documentElement.setAttribute('data-theme', 'dark');
        }

        // Close mobile menu on route change
        setIsMobileMenuOpen(false);
    }, [pathname, router, userRole]);

    const toggleTheme = () => {
        const newTheme = !isDarkMode;
        setIsDarkMode(newTheme);
        if (newTheme) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        }
    };

    const playNotificationSound = () => {
        if (!soundEnabled) return;
        // Mock sound play - in real app would play an audio file
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
        audio.play().catch(e => console.log('Audio play failed', e));
        alert('🔔 New Order Received! (Sound Played)');
    };

    useEffect(() => {
        if (pendingRequests.length > prevRequestCount) {
            playNotificationSound();
            // Optional: Show browser notification
            if (Notification.permission === 'granted') {
                new Notification('New Service Request', { body: `Table ${pendingRequests[0].table} needs assistance!` });
            }
        }
        setPrevRequestCount(pendingRequests.length);
    }, [pendingRequests.length, prevRequestCount, soundEnabled]);

    useEffect(() => {
        if (Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }, []);

    // Helper for active link styles
    const isActive = (path: string) => pathname === path;
    const linkClass = (path: string) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive(path) ? 'bg-[var(--brand-primary)] text-white shadow-lg shadow-orange-500/30' : 'text-[var(--text-muted)] hover:bg-white/50 hover:text-[var(--brand-primary)]'}`;

    return (
        <div className="flex h-screen font-sans relative overflow-hidden transition-colors duration-300">
            {/* Background Decoration */}
            <div className="bg-decor"></div>

            {/* Floating Shapes */}
            <div className="floating-shapes">
                <div className="shape shape-1" style={{ opacity: 0.3 }}></div>
                <div className="shape shape-2" style={{ opacity: 0.3 }}></div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed md:relative z-40
                w-64 glass-card border-r border-[var(--border-light)] flex flex-col 
                transition-all duration-300 ease-in-out
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                h-full md:h-[calc(100vh-32px)]
                m-0 md:m-4
                rounded-none md:rounded-2xl
            `}>
                <div className="p-6 border-b border-[var(--border-light)] flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-[var(--brand-dark)] flex items-center gap-2">
                            <span className="text-2xl">🥗</span> Oye Chatoro
                        </h2>
                        <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mt-1 ml-9">
                            {userRole === 'Staff' ? 'POS Panel' : 'Admin Panel'}
                        </p>
                    </div>
                    {/* Close Button for Mobile */}
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                    >
                        ✕
                    </button>
                </div>

                {/* Service Request Alert */}
                {pendingRequests.length > 0 && (
                    <div className="mx-4 mt-4 p-3 bg-red-50 border border-red-200 rounded-xl animate-pulse">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-bold text-red-600 uppercase">🔔 Action Required</span>
                            <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">{pendingRequests.length}</span>
                        </div>
                        <div className="space-y-2">
                            {pendingRequests.slice(0, 3).map(req => (
                                <div key={req.id} className="text-sm text-red-800 flex justify-between">
                                    <span>Table {req.table}</span>
                                    <span className="font-bold">{req.type}</span>
                                </div>
                            ))}
                            {pendingRequests.length > 3 && (
                                <div className="text-xs text-center text-red-500">+{pendingRequests.length - 3} more</div>
                            )}
                        </div>
                    </div>
                )}

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
                    {/* Common Links */}
                    <div className="text-xs font-bold text-[var(--text-light)] uppercase tracking-wider mb-2 px-4 mt-2">Overview</div>
                    {['Admin', 'Manager'].includes(userRole) && (
                        <Link href="/dashboard/overview" className={linkClass('/dashboard/overview')}>
                            <span>📊</span> Overview
                        </Link>
                    )}

                    {userRole !== 'Staff' && (
                        <Link href="/dashboard/orders" className={linkClass('/dashboard/orders')}>
                            <span>📝</span> Live Orders
                        </Link>
                    )}

                    <Link href="/dashboard/pos" className={linkClass('/dashboard/pos')}>
                        <span>🛒</span> POS System
                    </Link>

                    <div className="text-xs font-bold text-[var(--text-light)] uppercase tracking-wider mb-2 px-4 mt-6">Operations</div>

                    {userRole !== 'Staff' && (
                        <Link href="/dashboard/kitchen" className={linkClass('/dashboard/kitchen')}>
                            <span>👨‍🍳</span> Kitchen (KDS)
                        </Link>
                    )}

                    {/* Admin/Manager Links */}
                    {['Admin', 'Manager'].includes(userRole) && (
                        <>
                            <Link href="/dashboard/menu" className={linkClass('/dashboard/menu')}>
                                <span>🍔</span> Menu Manager
                            </Link>
                            <Link href="/dashboard/inventory" className={linkClass('/dashboard/inventory')}>
                                <span>📦</span> Inventory
                            </Link>
                            <Link href="/dashboard/tables" className={linkClass('/dashboard/tables')}>
                                <span>🪑</span> Tables & QR
                            </Link>

                            <div className="text-xs font-bold text-[var(--text-light)] uppercase tracking-wider mb-2 px-4 mt-6">Insights</div>
                            <Link href="/dashboard/analytics" className={linkClass('/dashboard/analytics')}>
                                <span>📈</span> Analytics
                            </Link>
                            <Link href="/dashboard/customers" className={linkClass('/dashboard/customers')}>
                                <span>👥</span> Customers
                            </Link>
                            <Link href="/dashboard/reviews" className={linkClass('/dashboard/reviews')}>
                                <span>⭐</span> Reviews
                            </Link>
                            <Link href="/dashboard/finance" className={linkClass('/dashboard/finance')}>
                                <span>💰</span> Finance
                            </Link>
                            <Link href="/dashboard/audit" className={linkClass('/dashboard/audit')}>
                                <span>🛡️</span> Audit Logs
                            </Link>

                            <div className="text-xs font-bold text-[var(--text-light)] uppercase tracking-wider mb-2 px-4 mt-6">Marketing</div>
                            <Link href="/dashboard/offers" className={linkClass('/dashboard/offers')}>
                                <span>🎟️</span> Offers & Coupons
                            </Link>
                            <Link href="/dashboard/whatsapp" className={linkClass('/dashboard/whatsapp')}>
                                <span>📱</span> WhatsApp
                            </Link>
                            <Link href="/dashboard/blog" className={linkClass('/dashboard/blog')}>
                                <span>📝</span> Blog Manager
                            </Link>

                            <div className="text-xs font-bold text-[var(--text-light)] uppercase tracking-wider mb-2 px-4 mt-6">Supply Chain</div>
                            <Link href="/dashboard/suppliers" className={linkClass('/dashboard/suppliers')}>
                                <span>🚚</span> Suppliers & POs
                            </Link>
                            <Link href="/dashboard/menu-engineering" className={linkClass('/dashboard/menu-engineering')}>
                                <span>📊</span> Menu Engineering
                            </Link>

                            <div className="text-xs font-bold text-[var(--text-light)] uppercase tracking-wider mb-2 px-4 mt-6">Configuration</div>
                            <Link href="/dashboard/staff" className={linkClass('/dashboard/staff')}>
                                <span>🛡️</span> Staff Access
                            </Link>
                            <Link href="/dashboard/settings" className={linkClass('/dashboard/settings')}>
                                <span>⚙️</span> Settings
                            </Link>
                        </>
                    )}
                </nav>

                <div className="p-4 border-t border-[var(--border-light)] space-y-2">
                    <button
                        onClick={toggleTheme}
                        className="flex items-center gap-3 px-4 py-2 w-full text-left rounded-xl transition-colors font-medium text-sm bg-white/50 hover:bg-white text-[var(--text-main)]"
                    >
                        <span>{isDarkMode ? '☀️' : '🌙'}</span> {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                    </button>

                    <button
                        onClick={() => {
                            setSoundEnabled(!soundEnabled);
                            if (!soundEnabled) playNotificationSound();
                        }}
                        className={`flex items-center gap-3 px-4 py-2 w-full text-left rounded-xl transition-colors font-medium text-sm ${soundEnabled ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-400'}`}
                    >
                        <span>{soundEnabled ? '🔔' : '🔕'}</span> {soundEnabled ? 'Sound On' : 'Sound Off'}
                    </button>

                    <button
                        onClick={async () => {
                            // Brute Force: Manually expire cookies to ensure they die
                            document.cookie = "__Secure-oyechatoro-v2-token=; Path=/; Domain=.oyechatoro.com; Max-Age=0; Secure; SameSite=Lax";
                            document.cookie = "__Secure-oyechatoro-v2-token=; Path=/; Max-Age=0; Secure; SameSite=Lax";

                            await signOut({ callbackUrl: '/login' });
                        }}
                        className="flex items-center gap-3 px-4 py-2 w-full text-left text-red-500 hover:bg-red-50 rounded-xl transition-colors font-medium text-sm"
                    >
                        <span>🚪</span> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-4 z-10 flex flex-col h-screen">
                {/* Mobile Header */}
                <div className="md:hidden flex items-center justify-between mb-4 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-sm border border-gray-100">
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="p-2 -ml-2 hover:bg-gray-100 rounded-lg text-gray-700"
                    >
                        <span className="text-2xl">☰</span>
                    </button>
                    <span className="font-bold text-gray-800">Oye Chatoro</span>
                    <div className="w-8"></div> {/* Spacer for centering */}
                </div>

                <div className="min-h-full rounded-2xl flex-1">
                    {children}
                </div>
            </main>
        </div>
    );
}
