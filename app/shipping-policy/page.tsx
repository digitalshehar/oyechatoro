import React from 'react';
import Link from 'next/link';
import SiteLayout from '../components/layout/SiteLayout';

export const metadata = {
    title: 'Shipping Policy | Oye Chatoro',
    description: 'Shipping and Delivery Policy for Oye Chatoro.',
};

export default function ShippingPolicy() {
    return (
        <SiteLayout>
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100 my-12">
                    <Link href="/" className="text-orange-600 font-bold hover:underline mb-8 inline-block">← Back to Home</Link>

                    <h1 className="text-3xl font-black text-gray-900 mb-6">Shipping & Delivery Policy</h1>
                    <p className="text-gray-500 mb-8">Last Updated: December 19, 2024</p>

                    <div className="prose prose-orange max-w-none space-y-6 text-gray-600">
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Delivery Area</h2>
                            <p>We currently deliver across Abu Road and surrounding local areas. Please check if your location is within our delivery radius at checkout.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Delivery Charges</h2>
                            <p>Our delivery charges are based on the order value:</p>
                            <ul className="list-disc pl-5 space-y-2 font-bold text-gray-800">
                                <li>Orders between ₹250 and ₹999: Flat ₹50 delivery charge.</li>
                                <li>Orders ₹1,000 and above: FREE Delivery.</li>
                            </ul>
                            <p className="mt-4">Minimum order for delivery is ₹250.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Delivery Timeline</h2>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Preparation Time: 10-20 minutes.</li>
                                <li>Estimated Delivery Time: 30-45 minutes from order confirmation, depending on your location and traffic conditions.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Order Tracking</h2>
                            <p>Once your order is dispatched, you will receive a notification. For any queries regarding your delivery, you can contact us directly at +91-9509913792.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Delivery Failures</h2>
                            <p>In case of delivery failure due to incorrect address or unavailability of the recipient, the order may be cancelled without a refund as food items are perishable.</p>
                        </section>
                    </div>
                </div>
            </div>
        </SiteLayout>
    );
}
