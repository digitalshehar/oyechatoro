'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

// Define schemas for different pages
const PAGE_SCHEMAS: any = {
    'franchise': {
        title: 'Franchise Page',
        sections: [
            {
                title: 'Hero Section',
                fields: [
                    { key: 'heroTitle', label: 'Main Title' },
                    { key: 'heroSubtitle', label: 'Subtitle' }
                ]
            },
            {
                title: 'Business Model',
                fields: [
                    { key: 'whyTitle', label: 'Section Title' },
                    { key: 'roiTitle', label: 'Card 1 Title', type: 'text' },
                    { key: 'roiDesc', label: 'Card 1 Desc', type: 'textarea' },
                    { key: 'techTitle', label: 'Card 2 Title', type: 'text' },
                    { key: 'techDesc', label: 'Card 2 Desc', type: 'textarea' },
                    { key: 'supportTitle', label: 'Card 3 Title', type: 'text' },
                    { key: 'supportDesc', label: 'Card 3 Desc', type: 'textarea' }
                ]
            }
        ]
    },
    'home': {
        title: 'Home Page',
        sections: [
            {
                title: 'Hero Banner',
                fields: [
                    { key: 'heroTitle', label: 'Hero Headline (Use <br/> for line break)' },
                    { key: 'heroDesc', label: 'Hero Description', type: 'textarea' },
                    { key: 'ctaText', label: 'Primary Button Text' },
                    { key: 'ctaLink', label: 'Primary Button Link (#menu, #offers)' }
                ]
            },
            {
                title: 'Features Grid (4 Cards)',
                fields: [
                    { key: 'feature1Title', label: 'Feature 1 Title' },
                    { key: 'feature1Desc', label: 'Feature 1 Desc' },
                    { key: 'feature2Title', label: 'Feature 2 Title' },
                    { key: 'feature2Desc', label: 'Feature 2 Desc' },
                    { key: 'feature3Title', label: 'Feature 3 Title' },
                    { key: 'feature3Desc', label: 'Feature 3 Desc' },
                    { key: 'feature4Title', label: 'Feature 4 Title' },
                    { key: 'feature4Desc', label: 'Feature 4 Desc' }
                ]
            },
            {
                title: 'Menu & Offers',
                fields: [
                    { key: 'offersTitle', label: 'Offers Section Title' },
                    { key: 'offersSubtitle', label: 'Offers Subtitle' },
                    { key: 'menuTitle', label: 'Menu Section Title' },
                    { key: 'menuSubtitle', label: 'Menu Subtitle' }
                ]
            },
            {
                title: 'Contact & Footer',
                fields: [
                    { key: 'contactTitle', label: 'Contact Section Title' },
                    { key: 'address', label: 'Full Address', type: 'textarea' },
                    { key: 'phone', label: 'Phone Number' },
                    { key: 'footerAbout', label: 'Footer About Text', type: 'textarea' },
                    { key: 'licenseNo', label: 'FSSAI License No.' }
                ]
            }
        ]
    }
};

// Default content for pages if DB is empty
const DEFAULTS: any = {
    'franchise': {
        heroTitle: "Partner with Oye Chatoro",
        heroSubtitle: "Join the fastest growing street food revolution.",
        whyTitle: "Why Choose Us?",
        roiTitle: "High ROI Model",
        roiDesc: "Our optimized kitchen setup ensures lower capex.",
        techTitle: "Tech-First Operations",
        techDesc: "Manage your entire outlet with our Dashboard.",
        supportTitle: "Full Support",
        supportDesc: "From site selection to staff training."
    },
    'home': {
        heroTitle: "Best Restaurant in <br/> Abu Road.",
        heroDesc: "Experience the Abu Road famous food. From spicy Chaats to rich Thalis, we serve tradition on a plate.",
        ctaText: "Order Now 🥘",
        ctaLink: "#menu",

        feature1Title: "Fresh Ingredients",
        feature1Desc: "Locally sourced, farm-fresh veggies daily.",
        feature2Title: "Live Kitchen",
        feature2Desc: "Watch your food being prepared with love.",
        feature3Title: "Top Rated",
        feature3Desc: "Rated 5 Stars by our lovely customers.",
        feature4Title: "Fast Service",
        feature4Desc: "Quick bites to satisfy your cravings instantly.",

        offersTitle: "Special Offers 🎉",
        offersSubtitle: "Limited time deals curated just for you",
        menuTitle: "Explore Categories 🍽️",
        menuSubtitle: "Select a category to view delicious options",

        contactTitle: "Visit the Best Restaurant in Abu Road 📍",
        address: "Abu Central Mall, G-5, Riico Check Post Road, Abu Road, Rajasthan 307026 (Near Abu Road Railway Station)",
        phone: "+91-9509913792",
        footerAbout: "Authentic Indian Vegetarian Street Food in Abu Road. Fresh, Hygienic, and Delicious. Serving happiness since 2024.",
        licenseNo: "22225023000513"
    }
};

export default function CmsPage() {
    const { data: session } = useSession();
    const [selectedPage, setSelectedPage] = useState('franchise');
    const [content, setContent] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    // Initial Load
    useEffect(() => {
        loadContent(selectedPage);
    }, [selectedPage]);

    const loadContent = async (slug: string) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/cms?slug=${slug}`);
            const data = await res.json();
            // Merge defaults with fetched data (fetched takes precedence if keys exist)
            const defaults = DEFAULTS[slug] || {};
            setContent({ ...defaults, ...(data || {}) });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch('/api/cms', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slug: selectedPage, content })
            });
            if (res.ok) alert('Saved successfully!');
            else alert('Failed to save.');
        } catch (err) {
            console.error(err);
            alert('Error saving.');
        } finally {
            setSaving(false);
        }
    };

    const currentSchema = PAGE_SCHEMAS[selectedPage];

    // Access Control
    const role = (session?.user as any)?.role;
    if (role !== 'Admin' && role !== 'Manager') return <div>Access Denied</div>;

    return (
        <div className="p-4 md:p-8 max-w-5xl mx-auto pb-24 md:pb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 animate-in">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-[var(--brand-dark)]">Universal Content Editor</h1>
                    <p className="text-sm md:text-base text-[var(--text-muted)]">Select a page to edit</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <select
                        value={selectedPage}
                        onChange={(e) => setSelectedPage(e.target.value)}
                        className="flex-1 sm:flex-none p-3 bg-white border border-gray-300 rounded-xl shadow-sm focus:ring-2 ring-[var(--brand-primary)] outline-none font-medium text-sm md:text-base"
                    >
                        {Object.keys(PAGE_SCHEMAS).map(slug => (
                            <option key={slug} value={slug}>{PAGE_SCHEMAS[slug].title}</option>
                        ))}
                    </select>

                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="w-full sm:w-auto bg-[var(--brand-primary)] text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50 text-sm md:text-base whitespace-nowrap"
                    >
                        {saving ? 'Saving...' : 'Publish Changes'}
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-20 text-gray-500">Loading content...</div>
            ) : (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                    {currentSchema.sections.map((section: any, idx: number) => (
                        <div key={idx} className="glass-card p-6 rounded-2xl border border-[var(--border-light)] shadow-sm">
                            <h2 className="text-xl font-bold mb-6 text-[var(--brand-dark)] border-b pb-2">{section.title}</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {section.fields.map((field: any) => (
                                    <div key={field.key} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">{field.label}</label>
                                        <div className="text-xs text-gray-400 mb-1">{field.hint}</div>
                                        {field.type === 'textarea' ? (
                                            <textarea
                                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 ring-[var(--brand-primary)] outline-none transition-all"
                                                rows={3}
                                                value={content[field.key] || ''}
                                                onChange={e => setContent({ ...content, [field.key]: e.target.value })}
                                            />
                                        ) : (
                                            <input
                                                type="text"
                                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 ring-[var(--brand-primary)] outline-none transition-all"
                                                value={content[field.key] || ''}
                                                onChange={e => setContent({ ...content, [field.key]: e.target.value })}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
