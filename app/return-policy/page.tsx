import React from 'react';
import Link from 'next/link';
import SiteLayout from '../components/layout/SiteLayout';

export const metadata = {
    title: 'Refund & Return Policy | Oye Chatoro',
    description: 'Refund and Return Policy for Oye Chatoro.',
};

export default function ReturnPolicy() {
    return (
        <SiteLayout>
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100 my-12">
                    <Link href="/" className="text-orange-600 font-bold hover:underline mb-8 inline-block">← Back to Home</Link>

                    <h1 className="text-3xl font-black text-gray-900 mb-6">Refund & Return Policy</h1>
                    <p className="text-gray-500 mb-8">Last Updated: December 19, 2024</p>

                    <div className="prose prose-orange max-w-none space-y-6 text-gray-600">
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Perishable Items Policy</h2>
                            <p>Due to the perishable nature of our products (cooked food), we do not accept returns on any food items once delivered or picked up.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Incorrect or Missing Items</h2>
                            <p>If you receive an incorrect item or if an item is missing from your order, please notify us immediately at +91-9509913792. We will either:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Redeliver the correct/missing item as quickly as possible.</li>
                                <li>Provide a refund or store credit for the value of the missing/incorrect item.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Quality Concerns</h2>
                            <p>We strive for the highest quality. If you are unsatisfied with the quality of your food, please contact us within 1 hour of receiving your order. We may offer a replacement or refund at our discretion, depending on the circumstances.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Cancellation Policy</h2>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Orders can be cancelled within 2 minutes of placement.</li>
                                <li>Once the kitchen starts preparing your food, cancellations may not be eligible for a refund.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Refund Process</h2>
                            <p>Approved refunds will be processed to your original payment method within 5-7 business days. For UPI payments, refunds are often processed instantly or within 24 hours.</p>
                        </section>
                    </div>
                </div>
            </div>
        </SiteLayout>
    );
}
