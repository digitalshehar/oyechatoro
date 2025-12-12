'use client';

import { useActionState } from 'react';
import { authenticate } from '../../actions/auth';

export default function ChefLoginPage() {
    const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden font-sans bg-gray-900 text-white">
            <div className="bg-gray-800 p-8 rounded-3xl shadow-xl w-full max-w-md relative z-10 animate-in border border-gray-700">
                <div className="text-center mb-8">
                    <div className="text-6xl mb-4">👨‍🍳</div>
                    <h1 className="text-3xl font-bold text-white mb-2">Kitchen Portal</h1>
                    <p className="text-gray-400">Chef Access Only</p>
                </div>

                <form action={formAction} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                        <input
                            name="email"
                            type="email"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                            placeholder="chef@oyechatoro.com"
                            defaultValue="chef@oyechatoro.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                        <input
                            name="password"
                            type="password"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    {errorMessage && (
                        <div className="p-3 rounded-xl bg-red-500/20 text-red-400 text-sm text-center font-medium border border-red-500/30">
                            {errorMessage}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-green-600/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPending ? 'Logging in...' : 'Login as Chef'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <a href="/login" className="text-sm text-gray-500 hover:text-gray-300">Are you an Admin? Login here</a>
                </div>
            </div>
        </div>
    );
}
