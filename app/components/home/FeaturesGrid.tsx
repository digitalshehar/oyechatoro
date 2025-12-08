'use client';

import React, { memo } from 'react';

const FeaturesGrid = memo(function FeaturesGrid() {
    const features = [
        { icon: '🥗', title: 'Fresh Ingredients', desc: 'Locally sourced, farm-fresh veggies daily.' },
        { icon: '🔥', title: 'Live Kitchen', desc: 'Watch your food being prepared with love.' },
        { icon: '⭐', title: 'Top Rated', desc: 'Rated 5 Stars by our lovely customers.' },
        { icon: '⚡', title: 'Fast Service', desc: 'Quick bites to satisfy your cravings instantly.' }
    ];

    return (
        <section className="py-8 md:py-20 bg-white relative overflow-hidden">
            <div className="container">
                <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {features.map((feature, idx) => (
                        <div key={idx} className="feature-card glass-card p-6 md:p-8 rounded-3xl border border-gray-100 hover:border-orange-200 transition-all duration-300 group">
                            <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                {feature.icon}
                            </div>
                            <h3 className="feature-title text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                            <p className="feature-desc text-gray-500 leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
});

export default FeaturesGrid;
