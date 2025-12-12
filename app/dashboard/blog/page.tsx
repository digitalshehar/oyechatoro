'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useDbBlog as useBlog, BlogPost, BlogCategory, BlogTag } from '../../lib/db-hooks';

export default function BlogManagerPage() {
    const { posts, categories, tags, savePost, deletePost, saveCategory, deleteCategory, saveTag, deleteTag } = useBlog();
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState<'edit' | 'preview' | 'seo'>('edit');
    const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({});

    // --- Category Management State ---
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showTagsModal, setShowTagsModal] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');

    const [focusKeyword, setFocusKeyword] = useState('');
    const [seoScore, setSeoScore] = useState(0);

    useEffect(() => {
        let score = 0;
        if (currentPost.title) {
            if (currentPost.title.length >= 40 && currentPost.title.length <= 60) score += 20;
            else if (currentPost.title.length > 10) score += 10;
        }
        if (currentPost.seoDescription) {
            if (currentPost.seoDescription.length >= 120 && currentPost.seoDescription.length <= 160) score += 20;
            else if (currentPost.seoDescription.length > 50) score += 10;
        }
        if (currentPost.content && currentPost.content.length > 300) score += 20;
        if (currentPost.image) score += 10;
        if (currentPost.slug) score += 10;
        if (currentPost.tags && currentPost.tags.length > 0) score += 5;
        if (currentPost.tags && currentPost.tags.length > 0) score += 5;
        if (currentPost.category || currentPost.categoryId) score += 5;

        // Focus Keyword Bonus
        if (focusKeyword) {
            const lowerKeyword = focusKeyword.toLowerCase();
            if (currentPost.title?.toLowerCase().includes(lowerKeyword)) score += 5;
            if (currentPost.seoDescription?.toLowerCase().includes(lowerKeyword)) score += 5;
        }

        setSeoScore(score);
    }, [currentPost, focusKeyword]);

    const handleEdit = (post: BlogPost) => {
        setCurrentPost(post);
        setIsEditing(true);
        setActiveTab('edit');
    };

    const handleCreate = () => {
        setCurrentPost({
            id: Date.now().toString(),
            date: new Date().toLocaleDateString(),
            author: 'Admin',
            tags: [],
            status: 'Draft',
            views: 0,
            likes: 0,
            isRecipe: false,
            recipeDetails: {
                prepTime: '',
                cookTime: '',
                servings: '',
                calories: '',
                ingredients: []
            }
        });
        setIsEditing(true);
        setActiveTab('edit');
    };

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        setCurrentPost(prev => ({
            ...prev,
            title,
            slug: prev.slug || generateSlug(title)
        }));
    };

    const calculateReadingTime = (content: string) => {
        const wordsPerMinute = 200;
        const words = content.trim().split(/\s+/).length;
        const time = Math.ceil(words / wordsPerMinute);
        return `${time} min read`;
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (currentPost.title && currentPost.content) {
            const finalPost = {
                ...currentPost,
                slug: currentPost.slug || generateSlug(currentPost.title),
                readingTime: calculateReadingTime(currentPost.content || ''),
                status: currentPost.status || 'Published'
            } as BlogPost;

            // Save new tags
            if (finalPost.tags) {
                const tagPromises: Promise<any>[] = [];
                finalPost.tags.forEach(tag => {
                    if (tag.id.startsWith('temp_')) {
                        tagPromises.push(saveTag(tag).then(() => {
                            // Ideally update the tag's ID in finalPost here, but simpler to just let API resolve by name or rely on 'connect' logic in backend 
                            // For now, we assume saveTag creates it, and savePost will simply refer to it by name or we rely on backend 'connectOrCreate'
                        }));
                    }
                });
                await Promise.all(tagPromises);
            }

            // Ensure we send valid structure to API
            // Refine validPost to just send IDs or expected format if needed
            // But db-hooks sends JSON.stringify(postData), so we send everything.
            await savePost(finalPost);

            setIsEditing(false);
            setCurrentPost({});
        }
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this post?')) {
            deletePost(id);
        }
    };

    // --- Category Handlers ---
    const handleAddCategory = () => {
        if (newCategoryName.trim()) {
            saveCategory({
                id: Date.now().toString(),
                name: newCategoryName.trim(),
                slug: generateSlug(newCategoryName.trim()),
                count: 0
            });
            setNewCategoryName('');
        }
    };

    const handleDeleteCategory = (id: string) => {
        if (confirm('Delete this category?')) {
            deleteCategory(id);
        }
    };

    // --- Ingredient Handlers ---
    const addIngredient = () => {
        const currentIngredients = currentPost.recipeDetails?.ingredients || [];
        setCurrentPost({
            ...currentPost,
            recipeDetails: {
                ...currentPost.recipeDetails!,
                ingredients: [...currentIngredients, '']
            }
        });
    };

    const updateIngredient = (index: number, value: string) => {
        const currentIngredients = [...(currentPost.recipeDetails?.ingredients || [])];
        currentIngredients[index] = value;
        setCurrentPost({
            ...currentPost,
            recipeDetails: {
                ...currentPost.recipeDetails!,
                ingredients: currentIngredients
            }
        });
    };

    const removeIngredient = (index: number) => {
        const currentIngredients = [...(currentPost.recipeDetails?.ingredients || [])];
        currentIngredients.splice(index, 1);
        setCurrentPost({
            ...currentPost,
            recipeDetails: {
                ...currentPost.recipeDetails!,
                ingredients: currentIngredients
            }
        });
    };

    // --- Rich Text Helpers ---
    const insertMarkdown = (prefix: string, suffix: string = '') => {
        const textarea = document.getElementById('content-editor') as HTMLTextAreaElement;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const before = text.substring(0, start);
        const selection = text.substring(start, end);
        const after = text.substring(end);

        const newText = before + prefix + selection + suffix + after;
        setCurrentPost({ ...currentPost, content: newText });

        setTimeout(() => textarea.focus(), 0);
    };

    return (
        <div className="p-4 h-full flex flex-col max-w-7xl mx-auto">
            {!isEditing ? (
                // --- LIST VIEW ---
                <>
                    <div className="flex justify-between items-center mb-8 animate-in">
                        <div>
                            <h1 className="text-3xl font-bold text-[var(--brand-dark)]">Blog Manager</h1>
                            <p className="text-[var(--text-muted)]">Create, edit, and optimize your content</p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowCategoryModal(true)}
                                className="px-4 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-sm"
                            >
                                📂 Manage Categories
                            </button>
                            <button
                                onClick={() => setShowTagsModal(true)}
                                className="px-4 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-sm"
                            >
                                🏷️ Manage Tags
                            </button>
                            <button
                                onClick={handleCreate}
                                className="px-6 py-3 bg-[var(--brand-primary)] text-white rounded-xl font-bold shadow-lg shadow-orange-200 hover:bg-[var(--brand-secondary)] transition-all flex items-center gap-2"
                            >
                                <span>+</span> New Post
                            </button>
                        </div>
                    </div>

                    {/* Category Modal */}
                    {showCategoryModal && (
                        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
                            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                                <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                                    <h3 className="font-bold text-lg">Manage Categories</h3>
                                    <button onClick={() => setShowCategoryModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
                                </div>
                                <div className="p-4">
                                    <div className="flex gap-2 mb-4">
                                        <input
                                            type="text"
                                            value={newCategoryName}
                                            onChange={(e) => setNewCategoryName(e.target.value)}
                                            placeholder="New Category Name"
                                            className="flex-1 px-3 py-2 border rounded-lg"
                                        />
                                        <button onClick={handleAddCategory} className="px-4 py-2 bg-green-600 text-white rounded-lg font-bold">Add</button>
                                    </div>
                                    <div className="max-h-60 overflow-y-auto space-y-2">
                                        {categories.map(cat => (
                                            <div key={cat.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                                                <div>
                                                    <div className="font-bold text-gray-800">{cat.name}</div>
                                                    <div className="text-xs text-gray-500">{cat.count} posts</div>
                                                </div>
                                                <button onClick={() => handleDeleteCategory(cat.id)} className="text-red-500 hover:text-red-700 text-sm font-bold">Delete</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tags Modal */}
                    {showTagsModal && (
                        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
                            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                                <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                                    <h3 className="font-bold text-lg">Manage Tags</h3>
                                    <button onClick={() => setShowTagsModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
                                </div>
                                <div className="p-4">
                                    <p className="text-sm text-gray-500 mb-4">Tags are created automatically when you add them to posts. You can delete unused tags here.</p>
                                    <div className="max-h-60 overflow-y-auto space-y-2">
                                        {tags.map(tag => (
                                            <div key={tag.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                                                <div className="font-bold text-gray-800">{tag.name}</div>
                                                <button
                                                    onClick={() => {
                                                        if (confirm('Delete this tag?')) deleteTag(tag.id);
                                                    }}
                                                    className="text-red-500 hover:text-red-700 text-sm font-bold"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid gap-4 animate-in" style={{ animationDelay: '0.1s' }}>
                        {posts.length === 0 ? (
                            <div className="text-center py-20 text-[var(--text-muted)] bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                                <div className="text-6xl mb-4 opacity-50">📝</div>
                                <h3 className="text-xl font-bold text-gray-600">No posts yet</h3>
                                <p className="text-gray-400">Create your first blog post to get started.</p>
                            </div>
                        ) : (
                            posts.map(post => (
                                <div key={post.id} className="glass-card p-4 rounded-xl flex gap-6 items-center group hover:bg-white/80 transition-all border border-transparent hover:border-gray-200">
                                    <div className="relative w-32 h-24 shrink-0">
                                        <Image
                                            src={post.image || 'https://via.placeholder.com/150'}
                                            alt={post.title}
                                            fill
                                            className="object-cover rounded-lg shadow-sm"
                                            unoptimized
                                        />
                                        <span className={`absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded shadow-sm ${post.status === 'Draft' ? 'bg-gray-800 text-white' : 'bg-green-500 text-white'
                                            }`}>
                                            {post.status || 'Published'}
                                        </span>
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="px-2 py-0.5 bg-orange-50 text-orange-700 text-xs font-bold rounded-md border border-orange-100">{post.category?.name || 'News'}</span>
                                            {post.isRecipe && <span className="px-2 py-0.5 bg-yellow-50 text-yellow-700 text-xs font-bold rounded-md border border-yellow-100">🍳 Recipe</span>}
                                            <span className="text-xs text-gray-400 flex items-center gap-1">
                                                <span>👁️ {post.views || 0}</span>
                                                <span>•</span>
                                                <span>❤️ {post.likes || 0}</span>
                                            </span>
                                        </div>
                                        <h3 className="font-bold text-lg text-gray-800 truncate">{post.title}</h3>
                                        <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                                            <span>{post.date}</span>
                                            <span>•</span>
                                            <span>{post.readingTime || '1 min read'}</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => handleEdit(post)}
                                            className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                                            title="Edit"
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            onClick={() => handleDelete(post.id)}
                                            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                            title="Delete"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </>
            ) : (
                // --- EDITOR VIEW ---
                <div className="flex flex-col h-full animate-in">
                    {/* Toolbar */}
                    <div className="flex justify-between items-center mb-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 sticky top-0 z-10">
                        <div className="flex items-center gap-4">
                            <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600">← Back</button>
                            <div className="h-6 w-px bg-gray-200"></div>
                            <div className="flex bg-gray-100 p-1 rounded-lg">
                                <button
                                    onClick={() => setActiveTab('edit')}
                                    className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${activeTab === 'edit' ? 'bg-white shadow text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    ✏️ Edit
                                </button>
                                <button
                                    onClick={() => setActiveTab('preview')}
                                    className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${activeTab === 'preview' ? 'bg-white shadow text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    👁️ Preview
                                </button>
                                <button
                                    onClick={() => setActiveTab('seo')}
                                    className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${activeTab === 'seo' ? 'bg-white shadow text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    🚀 SEO ({seoScore})
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <select
                                value={currentPost.status || 'Draft'}
                                onChange={e => setCurrentPost({ ...currentPost, status: e.target.value as any })}
                                className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
                            >
                                <option value="Draft">Draft</option>
                                <option value="Published">Published</option>
                                <option value="Scheduled">Scheduled</option>
                            </select>
                            <button onClick={handleSave} className="px-6 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 shadow-lg shadow-green-200 transition-all">
                                Save Changes
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto pb-20">
                        {activeTab === 'edit' && (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="lg:col-span-2 space-y-6">
                                    {/* Main Editor */}
                                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                        <input
                                            type="text"
                                            value={currentPost.title || ''}
                                            onChange={handleTitleChange}
                                            placeholder="Enter post title..."
                                            className="w-full text-3xl font-bold placeholder-gray-300 border-none focus:ring-0 p-0 mb-4"
                                        />

                                        {/* Rich Text Toolbar */}
                                        <div className="flex gap-2 mb-4 border-b pb-2 overflow-x-auto">
                                            <button onClick={() => insertMarkdown('**', '**')} className="p-2 hover:bg-gray-100 rounded text-gray-600 font-bold" title="Bold">B</button>
                                            <button onClick={() => insertMarkdown('*', '*')} className="p-2 hover:bg-gray-100 rounded text-gray-600 italic" title="Italic">I</button>
                                            <button onClick={() => insertMarkdown('# ')} className="p-2 hover:bg-gray-100 rounded text-gray-600 font-bold" title="Heading 1">H1</button>
                                            <button onClick={() => insertMarkdown('## ')} className="p-2 hover:bg-gray-100 rounded text-gray-600 font-bold" title="Heading 2">H2</button>
                                            <button onClick={() => insertMarkdown('> ')} className="p-2 hover:bg-gray-100 rounded text-gray-600" title="Quote">❝</button>
                                            <button onClick={() => insertMarkdown('[', '](url)')} className="p-2 hover:bg-gray-100 rounded text-gray-600" title="Link">🔗</button>
                                            <button onClick={() => insertMarkdown('![alt](', ')')} className="p-2 hover:bg-gray-100 rounded text-gray-600" title="Image">🖼️</button>
                                        </div>

                                        <textarea
                                            id="content-editor"
                                            value={currentPost.content || ''}
                                            onChange={e => setCurrentPost({ ...currentPost, content: e.target.value })}
                                            placeholder="Write your story here... (Markdown supported)"
                                            className="w-full h-[500px] resize-none border-none focus:ring-0 p-0 text-lg leading-relaxed text-gray-700 font-mono"
                                        />
                                    </div>

                                    {/* Recipe Editor */}
                                    {currentPost.isRecipe && (
                                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-yellow-200 bg-yellow-50/30">
                                            <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                                                🍳 Recipe Details
                                            </h3>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Prep Time</label>
                                                    <input type="text" placeholder="15 mins" className="w-full p-2 rounded border" value={currentPost.recipeDetails?.prepTime || ''} onChange={e => setCurrentPost({ ...currentPost, recipeDetails: { ...currentPost.recipeDetails!, prepTime: e.target.value } })} />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Cook Time</label>
                                                    <input type="text" placeholder="30 mins" className="w-full p-2 rounded border" value={currentPost.recipeDetails?.cookTime || ''} onChange={e => setCurrentPost({ ...currentPost, recipeDetails: { ...currentPost.recipeDetails!, cookTime: e.target.value } })} />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Servings</label>
                                                    <input type="text" placeholder="4 people" className="w-full p-2 rounded border" value={currentPost.recipeDetails?.servings || ''} onChange={e => setCurrentPost({ ...currentPost, recipeDetails: { ...currentPost.recipeDetails!, servings: e.target.value } })} />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Calories</label>
                                                    <input type="text" placeholder="350 kcal" className="w-full p-2 rounded border" value={currentPost.recipeDetails?.calories || ''} onChange={e => setCurrentPost({ ...currentPost, recipeDetails: { ...currentPost.recipeDetails!, calories: e.target.value } })} />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Ingredients</label>
                                                <div className="space-y-2">
                                                    {currentPost.recipeDetails?.ingredients?.map((ing, idx) => (
                                                        <div key={idx} className="flex gap-2">
                                                            <input
                                                                type="text"
                                                                value={ing}
                                                                onChange={e => updateIngredient(idx, e.target.value)}
                                                                className="flex-1 p-2 rounded border"
                                                                placeholder="e.g. 2 cups flour"
                                                            />
                                                            <button onClick={() => removeIngredient(idx)} className="text-red-500 px-2">✕</button>
                                                        </div>
                                                    ))}
                                                    <button onClick={addIngredient} className="text-sm text-[var(--brand-primary)] font-bold hover:underline">+ Add Ingredient</button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-6">
                                    {/* Sidebar Settings */}
                                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                        <h3 className="font-bold text-gray-800 mb-4">Post Settings</h3>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Post Type</label>
                                                <div className="flex p-1 bg-gray-100 rounded-lg">
                                                    <button
                                                        onClick={() => setCurrentPost({ ...currentPost, isRecipe: false })}
                                                        className={`flex-1 py-2 px-3 rounded-md text-sm font-bold transition-all ${!currentPost.isRecipe
                                                            ? 'bg-white shadow text-gray-800'
                                                            : 'text-gray-500 hover:text-gray-700'
                                                            }`}
                                                    >
                                                        📝 Article
                                                    </button>
                                                    <button
                                                        onClick={() => setCurrentPost({ ...currentPost, isRecipe: true })}
                                                        className={`flex-1 py-2 px-3 rounded-md text-sm font-bold transition-all ${currentPost.isRecipe
                                                            ? 'bg-white shadow text-orange-600'
                                                            : 'text-gray-500 hover:text-gray-700'
                                                            }`}
                                                    >
                                                        🍳 Recipe
                                                    </button>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Featured Image</label>
                                                <input
                                                    type="text"
                                                    value={currentPost.image || ''}
                                                    onChange={e => setCurrentPost({ ...currentPost, image: e.target.value })}
                                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                                                    placeholder="Image URL..."
                                                />
                                                {currentPost.image && (
                                                    <div className="relative w-full h-32 mt-2">
                                                        <Image
                                                            src={currentPost.image}
                                                            alt="Preview"
                                                            fill
                                                            className="object-cover rounded-lg border border-gray-100"
                                                            unoptimized
                                                        />
                                                    </div>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Category</label>
                                                <select
                                                    value={currentPost.categoryId || currentPost.category?.id || ''}
                                                    onChange={e => {
                                                        const cat = categories.find(c => c.id === e.target.value);
                                                        if (cat) {
                                                            setCurrentPost({ ...currentPost, category: cat, categoryId: cat.id });
                                                        }
                                                    }}
                                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                                                >
                                                    <option value="">Select Category</option>
                                                    {categories.map(cat => (
                                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Tags (Comma separated)</label>
                                                <input
                                                    type="text"
                                                    value={currentPost.tags?.map(t => t.name).join(', ') || ''}
                                                    onChange={e => {
                                                        const names = e.target.value.split(',').map(t => t.trim());
                                                        const newTags = names.filter(n => n).map(n => {
                                                            const existing = tags.find(t => t.name.toLowerCase() === n.toLowerCase());
                                                            // Cast to any to bypass strict ID checks for temp tags during editing
                                                            return existing || { id: `temp_${Date.now()}_${n}`, name: n, slug: generateSlug(n) } as any;
                                                        });
                                                        setCurrentPost({ ...currentPost, tags: newTags });
                                                    }}
                                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                                                    placeholder="Separate with commas..."
                                                    list="tag-suggestions"
                                                />
                                                <datalist id="tag-suggestions">
                                                    {tags.map(tag => (
                                                        <option key={tag.id} value={tag.name} />
                                                    ))}
                                                </datalist>
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {currentPost.tags?.map((tag, i) => (
                                                        <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">{tag.name}</span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Excerpt</label>
                                                <textarea
                                                    value={currentPost.excerpt || ''}
                                                    onChange={e => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm h-24 resize-none"
                                                    placeholder="Short summary..."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'preview' && (
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-3xl mx-auto">
                                <div className="prose prose-lg max-w-none">
                                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{currentPost.title || 'Untitled Post'}</h1>
                                    {currentPost.image && (
                                        <img src={currentPost.image} alt="Cover" className="w-full h-64 object-cover rounded-xl mb-8" />
                                    )}

                                    {/* Recipe Card Preview */}
                                    {currentPost.isRecipe && (
                                        <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 mb-8 not-prose">
                                            <h2 className="text-2xl font-bold text-gray-800 mb-4">🥘 {currentPost.title}</h2>
                                            <div className="flex flex-wrap gap-6 mb-6 text-sm">
                                                <div className="flex flex-col">
                                                    <span className="text-gray-500 uppercase text-xs font-bold">Prep Time</span>
                                                    <span className="font-bold">{currentPost.recipeDetails?.prepTime || '-'}</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-gray-500 uppercase text-xs font-bold">Cook Time</span>
                                                    <span className="font-bold">{currentPost.recipeDetails?.cookTime || '-'}</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-gray-500 uppercase text-xs font-bold">Servings</span>
                                                    <span className="font-bold">{currentPost.recipeDetails?.servings || '-'}</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-gray-500 uppercase text-xs font-bold">Calories</span>
                                                    <span className="font-bold">{currentPost.recipeDetails?.calories || '-'}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-800 mb-2">Ingredients</h3>
                                                <ul className="list-disc list-inside space-y-1 text-gray-700">
                                                    {currentPost.recipeDetails?.ingredients?.map((ing, i) => (
                                                        <li key={i}>{ing}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    )}

                                    <div className="whitespace-pre-wrap">{currentPost.content || 'Start writing to see preview...'}</div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'seo' && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="space-y-6">
                                    {/* SEO Analysis */}
                                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="font-bold text-gray-800">SEO Analysis</h3>
                                            <div className={`text-2xl font-bold ${seoScore >= 80 ? 'text-green-500' : seoScore >= 50 ? 'text-yellow-500' : 'text-red-500'}`}>
                                                {seoScore}/100
                                            </div>
                                        </div>

                                        <div className="mb-6">
                                            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Focus Keyword</label>
                                            <input
                                                type="text"
                                                value={focusKeyword}
                                                onChange={e => setFocusKeyword(e.target.value)}
                                                placeholder="e.g. Best Butter Chicken"
                                                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)]"
                                            />
                                            <p className="text-xs text-gray-400 mt-1">Enter a main keyword to check if it appears in your content.</p>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                <span className="text-sm font-medium">Title Length (40-60 chars)</span>
                                                <span className={currentPost.title && currentPost.title.length >= 40 && currentPost.title.length <= 60 ? 'text-green-500' : 'text-red-500'}>
                                                    {currentPost.title?.length || 0}/60
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                <span className="text-sm font-medium">Description Length (120-160 chars)</span>
                                                <span className={currentPost.seoDescription && currentPost.seoDescription.length >= 120 && currentPost.seoDescription.length <= 160 ? 'text-green-500' : 'text-red-500'}>
                                                    {currentPost.seoDescription?.length || 0}/160
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                <span className="text-sm font-medium">Content Length ({'>'}300 chars)</span>
                                                <span className={(currentPost.content && currentPost.content.length > 300) ? 'text-green-500' : 'text-red-500'}>
                                                    {currentPost.content?.length || 0}
                                                </span>
                                            </div>
                                            {focusKeyword && (
                                                <>
                                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                        <span className="text-sm font-medium">Keyword in Title</span>
                                                        <span className={currentPost.title?.toLowerCase().includes(focusKeyword.toLowerCase()) ? 'text-green-500' : 'text-red-500'}>
                                                            {currentPost.title?.toLowerCase().includes(focusKeyword.toLowerCase()) ? 'Yes' : 'No'}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                        <span className="text-sm font-medium">Keyword in Description</span>
                                                        <span className={currentPost.seoDescription?.toLowerCase().includes(focusKeyword.toLowerCase()) ? 'text-green-500' : 'text-red-500'}>
                                                            {currentPost.seoDescription?.toLowerCase().includes(focusKeyword.toLowerCase()) ? 'Yes' : 'No'}
                                                        </span>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                        <h3 className="font-bold text-gray-800 mb-4">Meta Settings</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">SEO Title</label>
                                                <input
                                                    type="text"
                                                    value={currentPost.seoTitle || ''}
                                                    onChange={e => setCurrentPost({ ...currentPost, seoTitle: e.target.value })}
                                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                                                    placeholder="Meta Title..."
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">SEO Description</label>
                                                <textarea
                                                    value={currentPost.seoDescription || ''}
                                                    onChange={e => setCurrentPost({ ...currentPost, seoDescription: e.target.value })}
                                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm h-24 resize-none"
                                                    placeholder="Meta Description..."
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Canonical URL</label>
                                                <input
                                                    type="text"
                                                    value={currentPost.canonicalUrl || ''}
                                                    onChange={e => setCurrentPost({ ...currentPost, canonicalUrl: e.target.value })}
                                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                                                    placeholder="https://..."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                        <h3 className="font-bold text-gray-800 mb-4">Google Search Preview</h3>
                                        <div className="p-4 bg-white border border-gray-200 rounded-lg">
                                            <div className="text-sm text-gray-800 mb-1">oyechatoro.com › blog › {currentPost.slug || 'post-slug'}</div>
                                            <div className="text-xl text-[#1a0dab] hover:underline cursor-pointer mb-1 font-medium truncate">
                                                {currentPost.seoTitle || currentPost.title || 'Post Title'}
                                            </div>
                                            <div className="text-sm text-gray-600 line-clamp-2">
                                                {currentPost.seoDescription || currentPost.excerpt || 'This is how your post will appear in Google search results. Make sure to write a compelling description.'}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                        <h3 className="font-bold text-gray-800 mb-4">Social Share Preview</h3>
                                        <div className="border border-gray-200 rounded-lg overflow-hidden max-w-sm mx-auto">
                                            <div className="h-48 bg-gray-100">
                                                {currentPost.image ? (
                                                    <img src={currentPost.image} alt="Preview" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                                                )}
                                            </div>
                                            <div className="p-3 bg-gray-50">
                                                <div className="text-xs text-gray-500 uppercase font-bold mb-1">OYECHATORO.COM</div>
                                                <div className="font-bold text-gray-900 mb-1 truncate">{currentPost.title || 'Post Title'}</div>
                                                <div className="text-sm text-gray-600 line-clamp-2">{currentPost.excerpt || 'Post description...'}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
