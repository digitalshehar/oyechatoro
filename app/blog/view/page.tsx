'use client';

import React, { Suspense, useEffect, useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useBlog } from '../../lib/storage';

function BlogPostContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const { posts } = useBlog();
    const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});

    const post = posts.find(p => p.id === id);

    // Related Posts Logic
    const relatedPosts = posts
        .filter(p => p.category === post?.category && p.id !== post?.id && p.status === 'Published')
        .slice(0, 3);

    // SEO & Metadata Effect
    useEffect(() => {
        if (post) {
            document.title = post.seoTitle || `${post.title} - Oye Chatoro Blog`;
            let metaDesc = document.querySelector('meta[name="description"]');
            if (!metaDesc) {
                metaDesc = document.createElement('meta');
                metaDesc.setAttribute('name', 'description');
                document.head.appendChild(metaDesc);
            }
            metaDesc.setAttribute('content', post.seoDescription || post.excerpt);
        }
    }, [post]);

    if (!post) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h1 className="text-2xl font-bold text-[var(--brand-dark)]">Post Not Found</h1>
                <p className="text-[var(--text-muted)] mb-6">The blog post you are looking for does not exist.</p>
                <Link href="/blog" className="btn btn-primary">Back to Blog</Link>
            </div>
        );
    }

    const toggleIngredient = (idx: number) => {
        setCheckedIngredients(prev => ({ ...prev, [idx]: !prev[idx] }));
    };

    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareText = `Check out this delicious recipe: ${post.title}`;

    return (
        <article className="max-w-4xl mx-auto animate-in">
            {/* Hero Section */}
            <div className="rounded-3xl overflow-hidden shadow-2xl mb-12 relative h-[500px]">
                <Image
                    src={post.image || 'https://via.placeholder.com/1200x600'}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-end p-8 md:p-12">
                    <div className="w-full">
                        <div className="flex gap-3 mb-4">
                            <span className="px-3 py-1 bg-[var(--brand-primary)] text-white text-xs font-bold rounded-full uppercase tracking-wider">
                                {post.category}
                            </span>
                            {post.isRecipe && (
                                <span className="px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full flex items-center gap-1">
                                    🍳 Recipe
                                </span>
                            )}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">{post.title}</h1>
                        <div className="flex items-center gap-6 text-white/90 text-sm font-medium">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-[var(--brand-primary)] flex items-center justify-center text-white font-bold text-lg border-2 border-white">
                                    {post.author.charAt(0)}
                                </div>
                                <span>By {post.author}</span>
                            </div>
                            <span>•</span>
                            <span>{post.date}</span>
                            <span>•</span>
                            <span>{post.readingTime}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-8">
                    {/* Recipe Card */}
                    {post.isRecipe && (
                        <div className="bg-orange-50 rounded-3xl p-8 border border-orange-100 mb-10 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                    🥘 Recipe Details
                                </h2>
                                <button onClick={() => window.print()} className="text-sm font-bold text-orange-600 hover:underline">
                                    🖨️ Print Recipe
                                </button>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                <div className="bg-white p-4 rounded-xl text-center shadow-sm">
                                    <div className="text-xs font-bold text-gray-400 uppercase mb-1">Prep Time</div>
                                    <div className="font-bold text-gray-800">{post.recipeDetails?.prepTime || '-'}</div>
                                </div>
                                <div className="bg-white p-4 rounded-xl text-center shadow-sm">
                                    <div className="text-xs font-bold text-gray-400 uppercase mb-1">Cook Time</div>
                                    <div className="font-bold text-gray-800">{post.recipeDetails?.cookTime || '-'}</div>
                                </div>
                                <div className="bg-white p-4 rounded-xl text-center shadow-sm">
                                    <div className="text-xs font-bold text-gray-400 uppercase mb-1">Servings</div>
                                    <div className="font-bold text-gray-800">{post.recipeDetails?.servings || '-'}</div>
                                </div>
                                <div className="bg-white p-4 rounded-xl text-center shadow-sm">
                                    <div className="text-xs font-bold text-gray-400 uppercase mb-1">Calories</div>
                                    <div className="font-bold text-gray-800">{post.recipeDetails?.calories || '-'}</div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-sm">
                                <h3 className="font-bold text-lg text-gray-800 mb-4">Ingredients</h3>
                                <ul className="space-y-3">
                                    {post.recipeDetails?.ingredients?.map((ing, idx) => (
                                        <li
                                            key={idx}
                                            className={`flex items-start gap-3 p-2 rounded-lg transition-colors cursor-pointer ${checkedIngredients[idx] ? 'bg-green-50 opacity-50' : 'hover:bg-gray-50'}`}
                                            onClick={() => toggleIngredient(idx)}
                                        >
                                            <div className={`w-5 h-5 rounded border flex items-center justify-center mt-0.5 ${checkedIngredients[idx] ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}>
                                                {checkedIngredients[idx] && '✓'}
                                            </div>
                                            <span className={checkedIngredients[idx] ? 'line-through text-gray-500' : 'text-gray-700'}>{ing}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Article Body */}
                    <div className="prose prose-lg max-w-none text-gray-700 mb-12">
                        {post.content.split('\n').map((paragraph, idx) => {
                            // Simple Markdown rendering
                            if (paragraph.startsWith('# ')) return <h1 key={idx} className="text-3xl font-bold mt-8 mb-4">{paragraph.replace('# ', '')}</h1>;
                            if (paragraph.startsWith('## ')) return <h2 key={idx} className="text-2xl font-bold mt-6 mb-3">{paragraph.replace('## ', '')}</h2>;
                            if (paragraph.startsWith('> ')) return <blockquote key={idx} className="border-l-4 border-orange-500 pl-4 italic my-4 bg-gray-50 p-4 rounded-r-lg">{paragraph.replace('> ', '')}</blockquote>;
                            if (paragraph.startsWith('![')) {
                                const match = paragraph.match(/!\[(.*?)\]\((.*?)\)/);
                                if (match) return <img key={idx} src={match[2]} alt={match[1]} className="w-full rounded-xl my-6" />;
                            }
                            if (paragraph.trim() === '') return <br key={idx} />;
                            return <p key={idx} className="mb-4 leading-relaxed">{paragraph}</p>;
                        })}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-12">
                        {post.tags?.map(tag => (
                            <span key={tag} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-bold hover:bg-gray-200 transition-colors cursor-pointer">
                                #{tag}
                            </span>
                        ))}
                    </div>

                    {/* Author Box */}
                    <div className="bg-gray-50 rounded-2xl p-8 flex items-center gap-6 mb-12">
                        <div className="w-20 h-20 rounded-full bg-[var(--brand-primary)] flex items-center justify-center text-white font-bold text-3xl shrink-0">
                            {post.author.charAt(0)}
                        </div>
                        <div>
                            <h3 className="font-bold text-xl text-gray-900 mb-2">Written by {post.author}</h3>
                            <p className="text-gray-600">Passionate food lover and storyteller at Oye Chatoro. Sharing the best recipes and street food stories from our kitchen to yours.</p>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Share Widget */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                        <h3 className="font-bold text-gray-900 mb-4">Share this post</h3>
                        <div className="flex gap-2">
                            <a href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`} target="_blank" className="flex-1 py-3 bg-[#25D366] text-white rounded-xl font-bold text-center hover:opacity-90 transition-opacity">
                                WhatsApp
                            </a>
                            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" className="flex-1 py-3 bg-[#1877F2] text-white rounded-xl font-bold text-center hover:opacity-90 transition-opacity">
                                Facebook
                            </a>
                        </div>
                    </div>

                    {/* Newsletter Widget */}
                    <div className="bg-[var(--brand-dark)] p-8 rounded-3xl text-center text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-orange-500 rounded-full opacity-20 blur-xl"></div>
                        <div className="relative z-10">
                            <div className="text-4xl mb-4">📩</div>
                            <h3 className="font-bold text-xl mb-2">Join our Foodie List</h3>
                            <p className="text-white/70 mb-6 text-sm">Get the latest recipes and offers delivered straight to your inbox.</p>
                            <input type="email" placeholder="Your email address" className="w-full px-4 py-3 rounded-xl text-gray-900 mb-3 outline-none focus:ring-2 focus:ring-orange-500" />
                            <button className="w-full py-3 bg-[var(--brand-primary)] text-white rounded-xl font-bold hover:bg-orange-600 transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <div className="border-t border-gray-200 pt-16 mt-8">
                    <h3 className="text-3xl font-bold text-gray-900 mb-8">You might also like</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {relatedPosts.map(rp => (
                            <Link href={`/blog/view?id=${rp.id}`} key={rp.id} className="group">
                                <div className="h-48 rounded-2xl overflow-hidden mb-4 relative">
                                    <Image
                                        src={rp.image || 'https://via.placeholder.com/400x200'}
                                        alt={rp.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        unoptimized
                                    />
                                    {rp.isRecipe && <span className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-bold">🍳 Recipe</span>}
                                </div>
                                <h4 className="font-bold text-lg text-gray-900 group-hover:text-[var(--brand-primary)] transition-colors line-clamp-2">{rp.title}</h4>
                                <p className="text-sm text-gray-500 mt-1">{rp.readingTime}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </article>
    );
}

export default function BlogPostViewerPage() {
    return (
        <div className="min-h-screen bg-[var(--bg-body)] font-sans pb-20">
            {/* Header */}
            <header className="header sticky top-0 z-50 bg-[var(--bg-surface-glass)] backdrop-blur-md border-b border-[var(--border-light)] mb-8">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-[var(--brand-primary)]">
                        <div className="relative w-8 h-8">
                            <Image
                                src="/logo.svg"
                                alt="Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
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

            <main className="container mx-auto px-4">
                <Suspense fallback={<div className="text-center py-20">Loading post...</div>}>
                    <BlogPostContent />
                </Suspense>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-[var(--border-light)] py-12 mt-20">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-[var(--text-muted)]">© 2024 Oye Chatoro. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
