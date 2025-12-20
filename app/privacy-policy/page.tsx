import React from 'react';
import Link from 'next/link';
import SiteLayout from '../components/layout/SiteLayout';

export const metadata = {
    title: 'Privacy Policy | Oye Chatoro',
    description: 'Privacy Policy for Oye Chatoro - How we handle your data.',
};

export default function PrivacyPolicy() {
    return (
        <SiteLayout>
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100 my-12">
                    <Link href="/" className="text-orange-600 font-bold hover:underline mb-8 inline-block">← Back to Home</Link>

                    <h1 className="text-3xl font-black text-gray-900 mb-6">Privacy Policy</h1>
                    <p className="text-gray-500 mb-8">Last Updated: December 19, 2024</p>

                    <div className="prose prose-orange max-w-none space-y-6 text-gray-600">
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Information We Collect</h2>
                            <p>We collect information you provide directly to us when you place an order, create an account, or contact us. This may include your name, email address, phone number, and delivery address.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">2. How We Use Your Information</h2>
                            <p>We use the information we collect to:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Process and fulfill your orders.</li>
                                <li>Communicate with you about your orders and promotional offers.</li>
                                <li>Improve our website and services.</li>
                                <li>Comply with legal obligations.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Sharing of Information</h2>
                            <p>We do not sell your personal information. We may share your information with third-party service providers (like delivery partners) who perform services on our behalf.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Security</h2>
                            <p>We take reasonable measures to help protect your personal information from loss, theft, misuse, and unauthorized access.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Your Choices</h2>
                            <p>You may update your account information or opt-out of promotional communications at any time by contacting us.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Contact Us</h2>
                            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                            <p className="font-bold mt-2">Oye Chatoro</p>
                            <p>Abu Central Mall, G-5, Riico Check Post Road, Abu Road, Rajasthan 307026</p>
                            <p>Phone: +91-9509913792</p>
                        </section>
                    </div>
                </div>
            </div>
        </SiteLayout>
    );
}
