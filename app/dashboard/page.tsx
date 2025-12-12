'use client';

import React from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

export default function DashboardPortal() {
    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden font-sans bg-black selection:bg-orange-500 selection:text-white">

            {/* Ambient Background Effects (Consistent with Login) */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-blue-600 rounded-full blur-[150px] opacity-20 animate-pulse duration-[10s]"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600 rounded-full blur-[150px] opacity-20 animate-pulse duration-[12s] delay-1000"></div>
                <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 w-[30vw] h-[30vw] bg-orange-600 rounded-full blur-[120px] opacity-10"></div>

                {/* Noise Texture */}
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%221%22/%3E%3C/svg%3E")' }}></div>
            </div>

            <div className="max-w-6xl w-full p-8 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="text-center mb-16">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-orange-400 to-red-600 rounded-3xl flex items-center justify-center shadow-lg shadow-orange-900/40 mb-8 transform rotate-3 hover:rotate-6 transition-transform duration-500 text-6xl">
                        🚀
                    </div>
                    <h1 className="text-5xl font-black text-white mb-4 tracking-tight">Command Center</h1>
                    <p className="text-xl text-white/60 font-medium">Select your operation mode</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Admin/Analytics Card */}
                    <Link href="/dashboard/overview" className="group">
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/10 transition-all duration-500 hover:scale-[1.02] hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-900/20 group h-full flex flex-col items-center text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="text-6xl mb-8 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">📊</div>
                            <h2 className="text-3xl font-bold text-white mb-3">Analytics</h2>
                            <p className="text-white/50 text-base mb-8 leading-relaxed">Master control. Usage stats, financial reports, and system settings.</p>
                            <div className="mt-auto px-6 py-3 bg-white/10 rounded-full text-white/90 font-bold text-sm uppercase tracking-wider group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                                Open Dashboard &rarr;
                            </div>
                        </div>
                    </Link>

                    {/* POS Card */}
                    <Link href="/dashboard/pos" className="group">
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/10 transition-all duration-500 hover:scale-[1.02] hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-900/20 group h-full flex flex-col items-center text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="text-6xl mb-8 transform group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500">🛒</div>
                            <h2 className="text-3xl font-bold text-white mb-3">POS System</h2>
                            <p className="text-white/50 text-base mb-8 leading-relaxed">Front of house. Take orders, manage tables, and billing.</p>
                            <div className="mt-auto px-6 py-3 bg-white/10 rounded-full text-white/90 font-bold text-sm uppercase tracking-wider group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                                Launch POS &rarr;
                            </div>
                        </div>
                    </Link>

                    {/* Kitchen Card */}
                    <Link href="/dashboard/kitchen" className="group">
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/10 transition-all duration-500 hover:scale-[1.02] hover:border-green-500/50 hover:shadow-2xl hover:shadow-green-900/20 group h-full flex flex-col items-center text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="text-6xl mb-8 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">👨‍🍳</div>
                            <h2 className="text-3xl font-bold text-white mb-3">Kitchen Display</h2>
                            <p className="text-white/50 text-base mb-8 leading-relaxed">Back of house. Live order tickets and preparation status.</p>
                            <div className="mt-auto px-6 py-3 bg-white/10 rounded-full text-white/90 font-bold text-sm uppercase tracking-wider group-hover:bg-green-500 group-hover:text-white transition-colors duration-300">
                                View Orders &rarr;
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="mt-16 text-center">
                    <Link href="/" className="text-white/30 hover:text-white transition-colors text-sm font-medium tracking-wide">
                        &larr; Return to Website
                    </Link>
                </div>
            </div>
        </div>
    );
}
