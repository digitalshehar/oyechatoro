'use client';

import { useActionState } from 'react';
import { authenticate } from '../actions/auth';
import Image from 'next/image';

export default function LoginPage() {
    const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black font-sans selection:bg-orange-500 selection:text-white">

            {/* Ambient Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-orange-600 rounded-full blur-[150px] opacity-20 animate-pulse duration-[10s]"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-red-600 rounded-full blur-[150px] opacity-20 animate-pulse duration-[12s] delay-1000"></div>
                <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 w-[30vw] h-[30vw] bg-yellow-600 rounded-full blur-[120px] opacity-10"></div>

                {/* Noise Texture Overlay */}
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%221%22/%3E%3C/svg%3E")' }}></div>
            </div>

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-md p-8 m-4">
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 md:p-12 animate-in fade-in slide-in-from-bottom-8 duration-700">

                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-orange-400 to-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-900/40 mb-6 transform rotate-3 hover:rotate-6 transition-transform duration-500">
                            <span className="text-4xl">🥘</span>
                        </div>
                        <h1 className="text-4xl font-black text-white mb-2 tracking-tight">Oye Chatoro</h1>
                        <p className="text-white/60 font-medium tracking-wide">Admin Dashboard Access</p>
                    </div>

                    {/* Form */}
                    <form action={formAction} className="space-y-6">
                        <div className="space-y-2 group">
                            <label className="block text-xs font-bold text-orange-400 uppercase tracking-widest ml-1 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">Email</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl opacity-50">📧</span>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/30 focus:border-orange-500 focus:bg-black/60 focus:ring-1 focus:ring-orange-500/50 outline-none transition-all font-medium"
                                    placeholder="admin@oyechatoro.com"
                                    defaultValue="admin@oyechatoro.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2 group">
                            <label className="block text-xs font-bold text-orange-400 uppercase tracking-widest ml-1 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">Password</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl opacity-50">🔒</span>
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/30 focus:border-orange-500 focus:bg-black/60 focus:ring-1 focus:ring-orange-500/50 outline-none transition-all font-medium"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {errorMessage && (
                            <div className="p-4 bg-red-500/20 border border-red-500/50 text-red-200 text-sm font-bold rounded-xl animate-in fade-in slide-in-from-top-2 flex items-center gap-3">
                                <span>⚠️</span> {errorMessage}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-black text-lg rounded-xl hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-orange-900/50 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                        >
                            {isPending ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    Authenticating...
                                </span>
                            ) : (
                                'Enter Dashboard'
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-white/20 text-xs">
                            Secure System • Authorized Personnel Only
                        </p>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                <span className="text-white/5 text-[10rem] font-black leading-none tracking-tighter mix-blend-overlay">LOGIN</span>
            </div>
        </div>
    );
}
