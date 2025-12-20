'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';

export default function FranchisePage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        location: '',
        budget: '10-20L',
        message: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [content, setContent] = useState<any>({
        heroTitle: "Partner with Oye Chatoro",
        heroSubtitle: "Join the fastest growing street food revolution.",
        whyTitle: "Why Choose Us?",
        roiTitle: "High ROI Model",
        roiDesc: "Our optimized kitchen setup ensures lower capex.",
        techTitle: "Tech-First Operations",
        techDesc: "Manage your entire outlet with our Dashboard.",
        supportTitle: "Full Support",
        supportDesc: "From site selection to staff training."
    });

    useEffect(() => {
        // Fetch CMS content for 'franchise' page
        fetch('/api/cms?slug=franchise')
            .then(res => res.json())
            .then(data => {
                // If content exists, merge with defaults, otherwise keep defaults
                if (data && Object.keys(data).length > 0) {
                    setContent((prev: any) => ({ ...prev, ...data }));
                }
            })
            .catch(err => console.error("CMS Fetch Error:", err));
    }, []);

    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const res = await fetch('/api/franchise', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setSuccess(true);
                setFormData({ name: '', email: '', phone: '', location: '', budget: '10-20L', message: '' });
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const errData = await res.json().catch(() => ({}));
                alert(errData.error || 'Something went wrong. Please try again.');
            }
        } catch (err) {
            console.error(err);
            alert('Failed to submit form.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Header
                user={null}
                isMobileMenuOpen={false}
                setIsMobileMenuOpen={() => { }}
                cartCount={0}
                setIsCartOpen={() => { }}
            />

            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center bg-black overflow-hidden">
                <div className="absolute inset-0 opacity-50 bg-[url('https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
                <div className="relative z-10 text-center text-white px-4">
                    <h1 className="text-5xl md:text-7xl font-black mb-4 uppercase tracking-tighter">
                        {content.heroTitle}
                    </h1>
                    <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto opacity-90">
                        {content.heroSubtitle}
                    </p>
                    <button onClick={() => document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' })} className="mt-8 bg-[var(--brand-primary)] hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-full text-lg shadow-xl hover:scale-105 transition-transform">
                        Apply for Franchise
                    </button>
                </div>
            </section>

            <div className="max-w-7xl mx-auto py-20 px-4 grid grid-cols-1 lg:grid-cols-2 gap-20">

                {/* Information Side */}
                <div className="space-y-12">
                    <div>
                        <h2 className="text-4xl font-bold mb-6 text-gray-900">{content.whyTitle}</h2>
                        <div className="space-y-8">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-2xl">💰</div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">{content.roiTitle}</h3>
                                    <p className="text-gray-600">{content.roiDesc}</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">⚡</div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">{content.techTitle}</h3>
                                    <p className="text-gray-600">{content.techDesc}</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">🤝</div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">{content.supportTitle}</h3>
                                    <p className="text-gray-600">{content.supportDesc}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                        <h3 className="text-2xl font-bold mb-4">Investment Snapshot</h3>
                        <ul className="space-y-3 text-gray-700 font-medium">
                            <li className="flex justify-between border-b border-gray-200 pb-2">
                                <span>Area Required</span>
                                <span className="font-bold">200 - 500 Sq. Ft.</span>
                            </li>
                            <li className="flex justify-between border-b border-gray-200 pb-2">
                                <span>Investment</span>
                                <span className="font-bold">₹10 Lakhs - ₹25 Lakhs</span>
                            </li>
                            <li className="flex justify-between border-b border-gray-200 pb-2">
                                <span>ROI Period</span>
                                <span className="font-bold">12 - 18 Months</span>
                            </li>
                            <li className="flex justify-between pt-2">
                                <span>Profit Margin</span>
                                <span className="font-bold text-green-600">High Yield</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Form Side */}
                <div id="apply-form" className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
                    {success ? (
                        <div className="text-center py-20 animate-in zoom-in">
                            <div className="text-6xl mb-6">🎉</div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Received!</h2>
                            <p className="text-gray-600 text-lg">
                                Thank you for your interest, {formData.name}.<br />Our franchise team will review your details and contact you within 24-48 hours.
                            </p>
                            <button onClick={() => setSuccess(false)} className="mt-8 text-[var(--brand-primary)] font-bold hover:underline">
                                Submit another application
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="text-center mb-8">
                                <h3 className="text-3xl font-bold">Start Your Journey</h3>
                                <p className="text-gray-500">Fill out the form below to get our Franchise Brochure.</p>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 focus:ring-2 ring-[var(--brand-primary)] outline-none"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone</label>
                                    <input
                                        required
                                        type="tel"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 focus:ring-2 ring-[var(--brand-primary)] outline-none"
                                        placeholder="+91 98765..."
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                                <input
                                    required
                                    type="email"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 focus:ring-2 ring-[var(--brand-primary)] outline-none"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">City / Location</label>
                                    <input
                                        type="text"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 focus:ring-2 ring-[var(--brand-primary)] outline-none"
                                        placeholder="Mumbai, Bandra"
                                        value={formData.location}
                                        onChange={e => setFormData({ ...formData, location: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Budget</label>
                                    <select
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 focus:ring-2 ring-[var(--brand-primary)] outline-none"
                                        value={formData.budget}
                                        onChange={e => setFormData({ ...formData, budget: e.target.value })}
                                    >
                                        <option value="5-10L">₹5 Lakhs - ₹10 Lakhs</option>
                                        <option value="10-20L">₹10 Lakhs - ₹20 Lakhs</option>
                                        <option value="20-50L">₹20 Lakhs - ₹50 Lakhs</option>
                                        <option value="50L+">₹50 Lakhs+</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Message (Optional)</label>
                                <textarea
                                    rows={4}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 focus:ring-2 ring-[var(--brand-primary)] outline-none"
                                    placeholder="Tell us about your business background..."
                                    value={formData.message}
                                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                                ></textarea>
                            </div>

                            <button
                                disabled={submitting}
                                type="submit"
                                className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {submitting ? 'Submitting...' : 'Submit Application'}
                            </button>
                        </form>
                    )}
                </div>
            </div>

            <Footer year={new Date().getFullYear()} />

        </div>
    );
}
