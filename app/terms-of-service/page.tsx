import React from 'react';
import Link from 'next/link';
import SiteLayout from '../components/layout/SiteLayout';

export const metadata = {
    title: 'Terms of Service | Oye Chatoro',
    description: 'Terms of Service for Oye Chatoro website usage.',
};

export default function TermsOfService() {
    return (
        <SiteLayout>
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100 my-12">
                    <Link href="/" className="text-orange-600 font-bold hover:underline mb-8 inline-block">← Back to Home</Link>

                    <h1 className="text-3xl font-black text-gray-900 mb-6">Terms of Service</h1>
                    <p className="text-gray-500 mb-8">Last Updated: December 19, 2024</p>

                    <div className="prose prose-orange max-w-none space-y-6 text-gray-600">
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
                            <p>By accessing and using the Oye Chatoro website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Ordering and Payment</h2>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>All orders are subject to availability and confirmation of the order price.</li>
                                <li>Payments can be made via UPI, Cash on Delivery, or Online Payment methods available on our site.</li>
                                <li>We reserve the right to refuse any order.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Pricing</h2>
                            <p>Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service without notice.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Limitation of Liability</h2>
                            <p>Oye Chatoro shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our services or products.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Governing Law</h2>
                            <p>These terms shall be governed by and construed in accordance with the laws of India, within the jurisdiction of Rajasthan.</p>
                        </section>
                    </div>
                </div>
            </div>
        </SiteLayout>
    );
}
