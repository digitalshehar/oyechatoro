'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: (v: boolean) => void;
    cartCount: number;
    setIsCartOpen: (v: boolean) => void;
    user: { name: string } | null;
}

export default function Header({ isMobileMenuOpen, setIsMobileMenuOpen, cartCount, setIsCartOpen, user }: HeaderProps) {
    return (
        <header className="header">
            <div className="container header-inner">
                <a href="#" className="logo-container group">
                    <div className="relative w-12 h-12 mr-2 transform group-hover:rotate-12 transition-transform duration-300">
                        <Image src="/logowhite.PNG" alt="Oye Chatoro" fill className="object-contain drop-shadow-lg" priority />
                    </div>
                    <span className="logo-text text-2xl tracking-tight group-hover:text-[var(--brand-secondary)] transition-colors">Oye Chatoro</span>
                </a>
                <nav className={`nav-links ${isMobileMenuOpen ? 'flex flex-col absolute top-full left-0 right-0 bg-white/95 p-6 shadow-2xl backdrop-blur-xl border-t border-gray-100' : 'hidden md:flex items-center gap-8'}`}>
                    {['Home', 'Menu', 'Offers', 'Reviews', 'Contact'].map((item) => (
                        <a key={item} href={`#${item.toLowerCase()}`} className="nav-link text-sm font-bold uppercase tracking-wider hover:text-[var(--brand-primary)] relative group" onClick={() => setIsMobileMenuOpen(false)}>
                            {item}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--brand-primary)] transition-all group-hover:w-full"></span>
                        </a>
                    ))}
                    <Link href="/blog" className="nav-link font-bold text-orange-600" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
                    {user ? (
                        <Link href="/profile" className="nav-link font-bold text-[var(--brand-primary)] flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">👤</div>
                            {user.name.split(' ')[0]}
                        </Link>
                    ) : (
                        <Link href="/login" className="nav-link font-bold hover:text-[var(--brand-primary)]" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                    )}
                    <button onClick={() => { setIsCartOpen(true); setIsMobileMenuOpen(false); }} className="btn btn-primary md:hidden w-full mt-4">Cart ({cartCount})</button>
                    <a href="https://wa.me/919509913792" className="btn btn-primary hidden md:inline-flex shadow-lg shadow-orange-200 hover:shadow-orange-300 transform hover:-translate-y-0.5 transition-all" target="_blank">Order Now 🚀</a>
                </nav>
                <button className="mobile-menu-btn md:hidden" aria-label="Menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    <span className="text-2xl">☰</span>
                </button>
            </div>
        </header>
    );
}
