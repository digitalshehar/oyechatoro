'use client';

import React, { useState } from 'react';

export default function WhatsAppSettingsPage() {
    const [testPhone, setTestPhone] = useState('');
    const [testStatus, setTestStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [testResult, setTestResult] = useState('');

    // Check if WhatsApp is configured (this would need env vars)
    const isConfigured = false; // Will show setup instructions

    const sendTestMessage = async () => {
        if (!testPhone) return;
        setTestStatus('sending');

        try {
            // This would call an API endpoint to test the message
            const res = await fetch('/api/whatsapp/test', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone: testPhone })
            });

            if (res.ok) {
                setTestStatus('success');
                setTestResult('Test message sent successfully!');
            } else {
                const data = await res.json();
                setTestStatus('error');
                setTestResult(data.error || 'Failed to send test message');
            }
        } catch (e: any) {
            setTestStatus('error');
            setTestResult(e.message);
        }
    };

    return (
        <div className="p-4 md:p-8 max-w-4xl mx-auto pb-24 md:pb-8">
            {/* Header */}
            <div className="mb-8 animate-in text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-bold text-[var(--brand-dark)]">
                    📱 WhatsApp Integration
                </h1>
                <p className="text-sm md:text-base text-[var(--text-muted)]">
                    Automatically notify customers when their order is ready
                </p>
            </div>

            {/* Status Card */}
            <div className={`p-5 md:p-6 rounded-2xl mb-8 animate-in ${isConfigured ? 'bg-green-50 border-2 border-green-200' : 'bg-yellow-50 border-2 border-yellow-200'}`}>
                <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                    <div className={`text-3xl md:text-4xl ${isConfigured ? '' : 'opacity-50'}`}>
                        {isConfigured ? '✅' : '⚠️'}
                    </div>
                    <div>
                        <div className={`text-lg md:text-xl font-bold ${isConfigured ? 'text-green-700' : 'text-yellow-700'}`}>
                            {isConfigured ? 'Connected & Active' : 'Not Configured'}
                        </div>
                        <div className={`text-xs md:text-sm ${isConfigured ? 'text-green-600' : 'text-yellow-600'}`}>
                            {isConfigured
                                ? 'WhatsApp notifications are being sent automatically'
                                : 'Add API credentials to enable WhatsApp notifications'
                            }
                        </div>
                    </div>
                </div>
            </div>

            {/* How It Works */}
            <div className="bg-white p-5 md:p-6 rounded-2xl shadow-lg mb-8 animate-in" style={{ animationDelay: '0.1s' }}>
                <h2 className="text-xl font-bold mb-4">🔔 How It Works</h2>
                <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
                        <div className="text-xl md:text-2xl">1️⃣</div>
                        <div>
                            <div className="font-bold text-blue-800 text-sm md:text-base">Order Status → "Ready"</div>
                            <div className="text-xs md:text-sm text-blue-600">
                                Customer receives: "Hi! 🍔 Order #123 is READY! Please collect from counter."
                            </div>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl">
                        <div className="text-xl md:text-2xl">2️⃣</div>
                        <div>
                            <div className="font-bold text-green-800 text-sm md:text-base">Order Status → "Completed"</div>
                            <div className="text-xs md:text-sm text-green-600">
                                Customer receives: Full digital receipt with itemized bill
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Setup Instructions */}
            {!isConfigured && (
                <div className="bg-white p-5 md:p-6 rounded-2xl shadow-lg mb-8 animate-in" style={{ animationDelay: '0.2s' }}>
                    <h2 className="text-xl font-bold mb-4">🛠️ Setup Instructions</h2>
                    <ol className="list-decimal list-inside space-y-3 text-gray-700 text-sm md:text-base">
                        <li>
                            Create a <a href="https://business.facebook.com" target="_blank" className="text-blue-600 underline">Meta Business Account</a>
                        </li>
                        <li>
                            Create a WhatsApp Business App at <a href="https://developers.facebook.com/apps" target="_blank" className="text-blue-600 underline">Meta Developers</a>
                        </li>
                        <li>
                            Go to WhatsApp → API Setup in your app dashboard
                        </li>
                        <li>
                            Copy your <strong>Phone Number ID</strong> and <strong>Access Token</strong>
                        </li>
                        <li>
                            Add to your <code className="bg-gray-100 px-2 py-1 rounded">.env</code> file:
                        </li>
                    </ol>

                    <div className="mt-4 bg-gray-900 text-green-400 p-4 rounded-xl font-mono text-xs overflow-x-auto">
                        <div>WHATSAPP_PHONE_ID=your_phone_number_id</div>
                        <div>WHATSAPP_ACCESS_TOKEN=your_access_token</div>
                    </div>

                    <div className="mt-4 p-4 bg-orange-50 rounded-xl">
                        <div className="font-bold text-orange-700 text-sm md:text-base">💡 Note</div>
                        <div className="text-xs md:text-sm text-orange-600">
                            The Meta WhatsApp Cloud API provides 1,000 free conversations per month.
                            After that, it's about ₹4-5 per conversation.
                        </div>
                    </div>
                </div>
            )}

            {/* Test Section */}
            <div className="bg-white p-5 md:p-6 rounded-2xl shadow-lg animate-in" style={{ animationDelay: '0.3s' }}>
                <h2 className="text-xl font-bold mb-4">🧪 Test Integration</h2>
                <div className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="tel"
                        placeholder="Enter phone number (e.g., 9876543210)"
                        value={testPhone}
                        onChange={(e) => setTestPhone(e.target.value)}
                        className="flex-1 px-4 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none text-sm md:text-base"
                    />
                    <button
                        onClick={sendTestMessage}
                        disabled={!testPhone || testStatus === 'sending'}
                        className="w-full sm:w-auto px-6 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm md:text-base whitespace-nowrap"
                    >
                        {testStatus === 'sending' ? 'Sending...' : 'Send Test 📤'}
                    </button>
                </div>

                {testResult && (
                    <div className={`mt-4 p-4 rounded-xl text-sm ${testStatus === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                        }`}>
                        {testResult}
                    </div>
                )}
            </div>

            {/* Feature List */}
            <div className="mt-8 p-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl text-white animate-in" style={{ animationDelay: '0.4s' }}>
                <h2 className="text-xl font-bold mb-4">✨ Features Included</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm md:text-base">
                    <div className="flex items-center gap-2">
                        <span>✓</span> Order Ready Notification
                    </div>
                    <div className="flex items-center gap-2">
                        <span>✓</span> Digital Receipt
                    </div>
                    <div className="flex items-center gap-2">
                        <span>✓</span> Customer Name Personalization
                    </div>
                    <div className="flex items-center gap-2">
                        <span>✓</span> Auto Phone Formatting (India)
                    </div>
                    <div className="flex items-center gap-2">
                        <span>✓</span> Graceful Fallback
                    </div>
                    <div className="flex items-center gap-2">
                        <span>✓</span> Console Logging for Debugging
                    </div>
                </div>
            </div>
        </div>
    );
}
