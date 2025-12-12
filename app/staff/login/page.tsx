'use client';

import { useActionState } from 'react';
import { authenticate } from '../../actions/auth';

export default function StaffLoginPage() {
    const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden font-sans bg-orange-50">
            <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md relative z-10 animate-in border border-orange-100">
                <div className="text-center mb-8">
                    <div className="text-6xl mb-4">🛒</div>
                    <h1 className="text-3xl font-bold text-orange-600 mb-2">Staff Login</h1>
                    <p className="text-gray-500">POS & Order Management</p>
                </div>

                <form action={formAction} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <input
                            name="email"
                            type="email"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                            placeholder="staff@oyechatoro.com"
                            defaultValue="staff@oyechatoro.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <input
                            name="password"
                            type="password"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    {errorMessage && (
                        <div className="p-3 rounded-xl bg-red-50 text-red-500 text-sm text-center font-medium border border-red-100">
                            {errorMessage}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-orange-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPending ? 'Logging in...' : 'Login as Staff'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <a href="/login" className="text-sm text-gray-400 hover:text-gray-600">Are you an Admin? Login here</a>
                </div>
            </div>
        </div>
    );
}
