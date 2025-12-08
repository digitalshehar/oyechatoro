'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useBlog } from '../lib/storage';

export default function BlogFeedPage() {
    const { posts, categories } = useBlog();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Filter posts
    const filteredPosts = useMemo(() => {
        return posts.filter(post => {
            const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
            // Only show published posts in public feed
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
        <div className="min-h-screen bg-[var(--bg-body)] font-sans">
            {/* Header */}
            <header className="header sticky top-0 z-50 bg-[var(--bg-surface-glass)] backdrop-blur-md border-b border-[var(--border-light)]">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-[var(--brand-primary)]">
                        <img src="/logo.svg" alt="Logo" className="h-8 w-8" onError={(e) => e.currentTarget.style.display = 'none'} />
                        <span>Oye Chatoro</span>
                    </Link>
                    <nav className="hidden md:flex gap-6">
                        <Link href="/" className="text-[var(--text-main)] hover:text-[var(--brand-primary)] font-medium">Home</Link>
                        <Link href="/menu" className="text-[var(--text-main)] hover:text-[var(--brand-primary)] font-medium">Menu</Link>
                        <Link href="/blog" className="text-[var(--brand-primary)] font-bold">Blog</Link>
                    </nav>
                    <Link href="/menu" className="btn btn-primary">Order Now</Link>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                {/* Featured Post Hero */}
                {featuredPost && !searchQuery && selectedCategory === 'All' && (
                    <div className="mb-16 animate-in">
                        <div className="relative rounded-3xl overflow-hidden h-[500px] group">
                            <img
                                src={featuredPost.image || 'https://via.placeholder.com/1200x600'}
                                alt={featuredPost.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end p-8 md:p-12">
                                <div className="max-w-3xl">
                                    <div className="flex gap-3 mb-4">
                                        <span className="px-3 py-1 bg-[var(--brand-primary)] text-white text-xs font-bold rounded-full uppercase tracking-wider">
                                            Featured
                                        </span>
                                        <span className="px-3 py-1 bg-white/20 backdrop-blur text-white text-xs font-bold rounded-full">
                                            {featuredPost.category}
                                        </span>
                                    </div>
                                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                                        {featuredPost.title}
                                    </h1>
                                    <p className="text-lg text-white/80 mb-6 line-clamp-2 max-w-2xl">
                                        {featuredPost.excerpt}
                                    </p>
                                    <Link
                                        href={`/blog/view?id=${featuredPost.id}`}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[var(--brand-dark)] rounded-full font-bold hover:bg-[var(--brand-primary)] hover:text-white transition-all transform hover:scale-105"
                                    >
                                        Read Story <span>→</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-12 animate-in" style={{ animationDelay: '0.1s' }}>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setSelectedCategory('All')}
                            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${selectedCategory === 'All'
                                ? 'bg-[var(--brand-dark)] text-white shadow-lg'
                                : 'bg-white text-[var(--text-muted)] hover:bg-gray-100'
                                }`}
                        >
                            All Stories
                        </button>
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.name)}
                                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${selectedCategory === cat.name
                                    ? 'bg-[var(--brand-primary)] text-white shadow-lg shadow-orange-500/30'
                                    : 'bg-white text-[var(--text-muted)] hover:bg-orange-50'
                                    }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-72">
                        <input
                            type="text"
                            placeholder="Search recipes & stories..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-2 pl-10 rounded-full border border-[var(--border-light)] focus:ring-2 focus:ring-[var(--brand-primary)] outline-none text-sm"
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                    </div>
                </div>

                {/* Posts Grid */}
                {regularPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {regularPosts.map((post, idx) => (
                            <Link
                                href={`/blog/view?id=${post.id}`}
                                key={post.id}
                                className="group bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 animate-in flex flex-col border border-gray-100 hover:-translate-y-1"
                                style={{ animationDelay: `${idx * 0.05}s` }}
                            >
                                <div className="h-56 overflow-hidden relative">
                                    <img
                                        src={post.image || 'https://via.placeholder.com/400x200'}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-3 left-3 flex gap-2">
                                        <span className="bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold text-[var(--brand-dark)] shadow-sm">
                                            {post.category}
                                        </span>
                                        {post.isRecipe && (
                                            <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-md text-xs font-bold shadow-sm flex items-center gap-1">
                                                🍳 Recipe
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center gap-2 text-xs text-[var(--text-light)] mb-2">
                                        <span>{post.date}</span>
                                        <span>•</span>
                                        <span>{post.readingTime || '3 min read'}</span>
                                    </div>
                                    <h2 className="text-xl font-bold text-[var(--brand-dark)] mb-3 line-clamp-2 group-hover:text-[var(--brand-primary)] transition-colors">
                                        {post.title}
                                    </h2>
                                    <p className="text-[var(--text-muted)] mb-4 line-clamp-2 text-sm flex-1">
                                        {post.excerpt}
                                    </p>

                                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                                                {post.author.charAt(0)}
                                            </div>
                                            <span className="text-xs font-bold text-gray-500">{post.author}</span>
                                        </div>
                                        <span className="text-[var(--brand-primary)] text-sm font-bold group-hover:translate-x-1 transition-transform">
                                            Read More →
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 animate-in">
                        <div className="text-6xl mb-4 opacity-50">🍳</div>
                        <h3 className="text-xl font-bold text-[var(--text-main)]">No stories found</h3>
                        <p className="text-[var(--text-muted)]">Try adjusting your search or category.</p>
                        <button
                            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                            className="mt-4 text-[var(--brand-primary)] font-bold hover:underline"
                        >
                            View All Stories
                        </button>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-[var(--border-light)] py-12 mt-12">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-[var(--text-muted)]">© 2024 Oye Chatoro. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
