'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDbCart } from '../lib/db-hooks';

export default function MobileNav() {
    const pathname = usePathname();
    const { cart } = useDbCart();
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const navItems = [
        { name: 'Home', href: '/', icon: '🏠' },
        { name: 'Menu', href: '/menu', icon: '🍔' },
        { name: 'Cart', href: '#cart', icon: '🛒', badge: cartCount },
        { name: 'Profile', href: '/profile', icon: '👤' },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 py-2 px-4 flex justify-between items-center z-50 md:hidden pb-safe">
            {navItems.map((item) => (
                <Link
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                        if (item.href === '#cart') {
                            e.preventDefault();
                            // Trigger cart open event
                            window.dispatchEvent(new Event('openCart'));
                        }
                    }}
                    className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${pathname === item.href ? 'text-[var(--brand-primary)]' : 'text-gray-400 hover:text-gray-600'
                        }`}
                >
                    <div className="relative">
                        <span className="text-2xl">{item.icon}</span>
                        {item.badge ? (
                            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-bounce">
                                {item.badge}
                            </span>
                        ) : null}
                    </div>
                    <span className="text-[10px] font-medium">{item.name}</span>
                </Link>
            ))}
        </div>
    );
}
