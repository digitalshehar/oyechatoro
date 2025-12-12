'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useDbBlog as useBlog } from '../lib/db-hooks';
import SiteLayout from '../components/layout/SiteLayout';

export default function BlogFeedPage() {
    const { posts, categories } = useBlog();

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Filter posts
    const filteredPosts = useMemo(() => {
        return posts.filter(post => {
            const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (post.excerpt || '').toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || post.category?.name === selectedCategory;
            // Mock posts are implicitly published
            const isPublished = post.status === 'Published';
            return matchesSearch && matchesCategory && isPublished;
        });
    }, [posts, searchQuery, selectedCategory]);

    const featuredPost = useMemo(() => {
        return posts.find(p => p.featured && p.status === 'Published') || posts.find(p => p.status === 'Published');
    }, [posts]);

    const regularPosts = useMemo(() => {
        return filteredPosts.filter(p => p.id !== featuredPost?.id);
    }, [filteredPosts, featuredPost]);

    return (
        <SiteLayout>
            <div className="min-h-screen bg-[var(--bg-body)] font-sans relative overflow-hidden pb-12">
                {/* Background Decor */}
                <div className="floating-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                </div>

                <div className="container mx-auto px-4 py-12 relative z-10">
                    {/* Hero Section */}
                    <div className="text-center mb-16 animate-in">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-white/50 backdrop-blur border border-white/50 text-orange-600 font-bold text-sm mb-6 shadow-sm">
                            ✨ Taste the Stories
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight text-[var(--brand-dark)] drop-shadow-sm">
                            The <span className="text-gradient">Chatoro</span> Chronicles
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Discover secret recipes, street food tales, and the spicy stories behind your favorite dishes.
                        </p>
                    </div>

                    {/* Featured Post Immersive Card */}
                    {featuredPost && !searchQuery && selectedCategory === 'All' && (
                        <div className="mb-20 animate-in group">
                            <Link href={`/blog/${featuredPost.slug}`} className="block relative rounded-[2.5rem] overflow-hidden h-[600px] shadow-2xl shadow-orange-900/20 transform transition-all duration-500 hover:shadow-orange-900/30">
                                <img
                                    src={featuredPost.image || 'https://via.placeholder.com/1200x600'}
                                    alt={featuredPost.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end p-8 md:p-16">
                                    <div className="max-w-4xl transform transition-transform duration-500 group-hover:-translate-y-2">
                                        <div className="flex flex-wrap gap-3 mb-6">
                                            <span className="px-4 py-1.5 bg-[var(--brand-primary)] text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-lg">
                                                Featured
                                            </span>
                                            <span className="px-4 py-1.5 bg-white/20 backdrop-blur text-white text-xs font-bold rounded-full border border-white/20">
                                                {featuredPost.category?.name}
                                            </span>
                                        </div>
                                        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight drop-shadow-lg">
                                            {featuredPost.title}
                                        </h2>
                                        <p className="text-lg md:text-xl text-white/90 mb-8 line-clamp-2 max-w-3xl font-medium leading-relaxed drop-shadow-md">
                                            {featuredPost.excerpt}
                                        </p>
                                        <span className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[var(--brand-dark)] rounded-full font-bold hover:bg-[var(--brand-primary)] hover:text-white transition-all shadow-xl group-hover:scale-105">
                                            Read Full Story <span className="text-xl">→</span>
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )}

                    {/* Sticky Filter Bar */}
                    <div className="sticky top-24 z-40 mb-12 animate-in" style={{ animationDelay: '0.1s' }}>
                        <div className="bg-white/80 backdrop-blur-xl border border-white/50 p-3 rounded-full shadow-xl shadow-gray-200/50 flex flex-col md:flex-row gap-4 items-center justify-between max-w-5xl mx-auto">
                            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 px-2 hide-scrollbar">
                                <button
                                    onClick={() => setSelectedCategory('All')}
                                    className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${selectedCategory === 'All'
                                        ? 'bg-[var(--brand-dark)] text-white shadow-lg transform scale-105'
                                        : 'bg-transparent text-gray-500 hover:bg-gray-100'
                                        }`}
                                >
                                    All Stories
                                </button>
                                {categories.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setSelectedCategory(cat.name)}
                                        className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${selectedCategory === cat.name
                                            ? 'bg-[var(--brand-primary)] text-white shadow-lg transform scale-105'
                                            : 'bg-transparent text-gray-500 hover:bg-orange-50 hover:text-orange-600'
                                            }`}
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>

                            <div className="relative w-full md:w-80 px-2">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-6 py-2.5 rounded-full bg-gray-50 border-none focus:bg-white focus:ring-2 focus:ring-orange-100 transition-all font-medium text-gray-700 placeholder-gray-400"
                                />
                                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
                            </div>
                        </div>
                    </div>

                    {/* Grid Layout */}
                    {regularPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 perspective-1000">
                            {regularPosts.map((post, idx) => (
                                <Link
                                    href={`/blog/${post.slug}`}
                                    key={post.id}
                                    className="group glass-card rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-orange-900/10 transition-all duration-500 flex flex-col hover:-translate-y-2"
                                    style={{ animationDelay: `${0.1 + (idx * 0.05)}s` }}
                                >
                                    <div className="h-64 overflow-hidden relative">
                                        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                                        <img
                                            src={post.image || 'https://via.placeholder.com/400x200'}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 relative z-10"
                                            loading="lazy"
                                        />
                                        <div className="absolute top-4 left-4 z-20 flex gap-2">
                                            <span className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold text-[var(--brand-dark)] shadow-sm">
                                                {post.category?.name}
                                            </span>
                                            {post.isRecipe && (
                                                <span className="bg-yellow-400/90 backdrop-blur-md text-yellow-900 px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm flex items-center gap-1">
                                                    🍳 Recipe
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="p-8 flex-1 flex flex-col bg-white/40">
                                        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                                            <span>{new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                            <span>{post.readingTime || '3 min'}</span>
                                        </div>
                                        <h2 className="text-2xl font-black text-[var(--brand-dark)] mb-3 leading-tight group-hover:text-[var(--brand-primary)] transition-colors line-clamp-2">
                                            {post.title}
                                        </h2>
                                        <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed text-sm flex-1">
                                            {post.excerpt || ''}
                                        </p>

                                        <div className="flex items-center justify-between pt-6 border-t border-gray-100/50">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center text-xs font-black text-orange-700">
                                                    {post.author.charAt(0)}
                                                </div>
                                                <span className="text-sm font-bold text-gray-500">{post.author.split(' ')[0]}</span>
                                            </div>
                                            <span className="text-[var(--brand-primary)] text-sm font-black group-hover:translate-x-1 transition-transform flex items-center gap-1">
                                                Read <span className="text-lg">→</span>
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-32 animate-in glass-card rounded-[2rem]">
                            <div className="text-7xl mb-6 opacity-80 animate-bounce">🍳</div>
                            <h3 className="text-2xl font-black text-[var(--text-main)] mb-2">Nothing cooking here...</h3>
                            <p className="text-gray-500 mb-8">Try searching for something else or check back later!</p>
                            <button
                                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                                className="bg-[var(--brand-primary)] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-orange-500/30 transition-all"
                            >
                                Reset Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </SiteLayout>
    );
}
