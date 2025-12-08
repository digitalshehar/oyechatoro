'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useMenu, MenuCategory, MenuItem, useInventory, useSettings } from '../../lib/storage';
import { QRCodeSVG } from 'qrcode.react';

export default function MenuManagerPage() {
    const { categories, items, saveCategory, deleteCategory, saveItem, deleteItem } = useMenu();
    const { inventory } = useInventory();
    const { settings, updateSettings } = useSettings();

    const [activeTab, setActiveTab] = useState<'items' | 'train' | 'digital'>('items');
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Modal States
    const [isCatModalOpen, setIsCatModalOpen] = useState(false);
    const [isItemModalOpen, setIsItemModalOpen] = useState(false);
    const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);

    const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
    const [selectedItemForRecipe, setSelectedItemForRecipe] = useState<MenuItem | null>(null);

    // Form States
    const [catForm, setCatForm] = useState({ name: '' });
    const [itemForm, setItemForm] = useState<Partial<MenuItem>>({
        name: '', price: 0, costPrice: 0, description: '', categoryId: '', veg: true, status: 'Active', isDigitalMenu: true, isTrainMenu: false, isFeatured: false
    });

    // Recipe Form State
    const [recipeForm, setRecipeForm] = useState<{ inventoryItemId: number; quantity: number }[]>([]);

    // Derived State
    const selectedCategory = categories.find(c => c.id === selectedCategoryId) || categories[0];

    const filteredItems = useMemo(() => {
        if (!selectedCategory) return [];
        return items.filter(item => {
            const matchesCategory = item.categoryId === selectedCategory.id;
            const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());

            // Tab Filtering
            if (activeTab === 'train') {
                return matchesCategory && matchesSearch && item.isTrainMenu === true;
            } else if (activeTab === 'items') {
                // Show items that are NOT exclusively for the train menu, or show all?
                // Let's show items that are EITHER explicitly digital menu OR not marked as train menu only.
                // If an item is BOTH, it shows in both tabs.
                return matchesCategory && matchesSearch && (item.isTrainMenu !== true || item.isDigitalMenu === true);
            }
            return matchesCategory && matchesSearch;
        });
    }, [items, selectedCategory, searchTerm, activeTab]);

    // Handlers
    const handleSaveCategory = (e: React.FormEvent) => {
        e.preventDefault();
        const newCategory: MenuCategory = {
            id: `cat_${Date.now()}`,
            name: catForm.name
        };

        saveCategory(newCategory);
        setIsCatModalOpen(false);
        setCatForm({ name: '' });
    };

    const handleDeleteCategory = (id: string) => {
        if (confirm('Are you sure? This will hide all items in this category.')) {
            deleteCategory(id);
            if (selectedCategoryId === id) setSelectedCategoryId(null);
        }
    };

    const handleSaveItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (!itemForm.categoryId) {
            alert('Please select a category');
            return;
        }

        const newItem: MenuItem = {
            id: editingItem ? editingItem.id : `item_${Date.now()}`,
            name: itemForm.name || '',
            price: Number(itemForm.price),
            description: itemForm.description || '',
            categoryId: itemForm.categoryId,
            veg: itemForm.veg || false,
            status: itemForm.status as 'Active' | 'Out of Stock',
            image: itemForm.image || '',
            recipe: editingItem?.recipe,
            isDigitalMenu: itemForm.isDigitalMenu !== false,
            isTrainMenu: itemForm.isTrainMenu || false,
            isFeatured: itemForm.isFeatured || false,
            costPrice: Number(itemForm.costPrice) || 0
        };

        saveItem(newItem);
        setIsItemModalOpen(false);
        setEditingItem(null);
        setItemForm({ name: '', price: 0, costPrice: 0, description: '', categoryId: '', veg: true, status: 'Active', isDigitalMenu: true, isTrainMenu: false, isFeatured: false });
    };

    const openEditItem = (item: MenuItem) => {
        setEditingItem(item);
        setItemForm(item);
        setIsItemModalOpen(true);
    };

    const handleDeleteItem = (id: string) => {
        if (confirm('Delete this item?')) {
            deleteItem(id);
        }
    };

    // Recipe Handlers
    const openRecipeModal = (item: MenuItem) => {
        setSelectedItemForRecipe(item);
        setRecipeForm(item.recipe || []);
        setIsRecipeModalOpen(true);
    };

    const addIngredientToRecipe = () => {
        setRecipeForm([...recipeForm, { inventoryItemId: inventory[0]?.id || 0, quantity: 1 }]);
    };

    const removeIngredientFromRecipe = (index: number) => {
        const updated = [...recipeForm];
        updated.splice(index, 1);
        setRecipeForm(updated);
    };

    const updateRecipeIngredient = (index: number, field: 'inventoryItemId' | 'quantity', value: number) => {
        const updated = [...recipeForm];
        updated[index] = { ...updated[index], [field]: value };
        setRecipeForm(updated);
    };

    const handleSaveRecipe = () => {
        if (selectedItemForRecipe) {
            const updatedItem = { ...selectedItemForRecipe, recipe: recipeForm };
            saveItem(updatedItem);
            setIsRecipeModalOpen(false);
            setSelectedItemForRecipe(null);
        }
    };

    const menuUrl = typeof window !== 'undefined' ? `${window.location.origin}/menu` : '';
    const trainMenuUrl = typeof window !== 'undefined' ? `${window.location.origin}/train-menu` : '';

    return (
        <div className="flex flex-col h-[calc(100vh-2rem)] gap-6">

            {/* Top Tabs */}
            <div className="flex gap-4">
                <button
                    onClick={() => setActiveTab('items')}
                    className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'items' ? 'bg-[var(--brand-primary)] text-white shadow-lg' : 'bg-white text-gray-500'}`}
                >
                    🍔 Restaurant Menu
                </button>
                <button
                    onClick={() => setActiveTab('train')}
                    className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'train' ? 'bg-[#d32f2f] text-white shadow-lg' : 'bg-white text-gray-500'}`}
                >
                    🚆 Train Menu
                </button>
                <button
                    onClick={() => setActiveTab('digital')}
                    className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'digital' ? 'bg-[var(--brand-primary)] text-white shadow-lg' : 'bg-white text-gray-500'}`}
                >
                    📱 Digital Menu
                </button>
            </div>

            {(activeTab === 'items' || activeTab === 'train') && (
                <div className="flex flex-1 gap-6 overflow-hidden">
                    {/* Sidebar - Categories */}
                    <div className="w-1/4 glass-card rounded-2xl p-6 flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-[var(--brand-dark)]">Categories</h2>
                            <button
                                onClick={() => setIsCatModalOpen(true)}
                                className="w-8 h-8 rounded-full bg-[var(--brand-primary)] text-white flex items-center justify-center hover:scale-110 transition-transform"
                            >
                                +
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                            {categories.map(cat => (
                                <div
                                    key={cat.id}
                                    onClick={() => setSelectedCategoryId(cat.id)}
                                    className={`p-4 rounded-xl cursor-pointer transition-all group relative ${(selectedCategory?.id === cat.id)
                                        ? 'bg-[var(--brand-primary)] text-white shadow-lg'
                                        : 'bg-white/50 hover:bg-white text-[var(--text-main)]'
                                        }`}
                                >
                                    <div className="font-bold flex justify-between items-center">
                                        {cat.name}
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleDeleteCategory(cat.id); }}
                                            className={`text-xs opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-100 hover:text-red-600 ${(selectedCategory?.id === cat.id) ? 'text-white hover:text-red-600' : 'text-[var(--text-muted)]'
                                                }`}
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Main Area - Items */}
                    <div className="flex-1 glass-card rounded-2xl p-6 flex flex-col">
                        {selectedCategory ? (
                            <>
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h1 className="text-3xl font-bold text-[var(--brand-dark)]">{selectedCategory.name}</h1>
                                        <p className="text-[var(--text-muted)]">
                                            {activeTab === 'train' ? 'Manage Train Delivery Items' : 'Manage Restaurant Menu Items'}
                                        </p>
                                    </div>
                                    <div className="flex gap-4">
                                        <input
                                            type="text"
                                            placeholder="Search items..."
                                            className="px-4 py-2 border border-[var(--border-light)] rounded-xl outline-none focus:border-[var(--brand-primary)] bg-white/80"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                        <button
                                            onClick={() => {
                                                setEditingItem(null);
                                                setItemForm({
                                                    ...itemForm,
                                                    categoryId: selectedCategory.id,
                                                    isTrainMenu: activeTab === 'train', // Auto-check if in train tab
                                                    isDigitalMenu: activeTab !== 'train'
                                                });
                                                setIsItemModalOpen(true);
                                            }}
                                            className="btn btn-primary btn-glow"
                                        >
                                            + Add Item
                                        </button>
                                    </div>
                                </div>

                                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 animate-in">
                                        {filteredItems.map(item => (
                                            <div key={item.id} className="bg-white p-4 rounded-xl border border-[var(--border-light)] hover:shadow-md transition-all flex gap-4 group">
                                                <div className="w-20 h-20 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 relative">
                                                    {item.image ? (
                                                        <Image
                                                            src={item.image}
                                                            alt={item.name}
                                                            fill
                                                            className="object-cover"
                                                            sizes="80px"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-2xl">🥘</div>
                                                    )}
                                                    {item.isFeatured && (
                                                        <div className="absolute top-1 right-1 bg-yellow-400 text-white text-xs px-2 py-0.5 rounded-full shadow-sm font-bold">
                                                            ⭐
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex justify-between items-start">
                                                        <h4 className="font-bold text-[var(--text-main)] truncate">{item.name}</h4>
                                                        <div className={`w-2 h-2 rounded-full ${item.veg ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                                    </div>
                                                    <p className="text-xs text-[var(--text-muted)] line-clamp-2 my-1">{item.description}</p>
                                                    <div className="flex flex-wrap gap-1 mt-1">
                                                        {item.isTrainMenu && (
                                                            <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded border border-red-200">Train 🚆</span>
                                                        )}
                                                        {item.isDigitalMenu && (
                                                            <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded border border-blue-200">Digital 📱</span>
                                                        )}
                                                    </div>
                                                    <div className="flex justify-between items-center mt-2">
                                                        <span className="font-bold text-[var(--brand-dark)]">₹{item.price}</span>
                                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button onClick={() => openRecipeModal(item)} className="text-orange-500 hover:bg-orange-50 p-1 rounded text-xs font-bold border border-orange-200" title="Link Recipe">🍳</button>
                                                            <button onClick={() => openEditItem(item)} className="text-blue-500 hover:bg-blue-50 p-1 rounded">✏️</button>
                                                            <button onClick={() => handleDeleteItem(item.id)} className="text-red-500 hover:bg-red-50 p-1 rounded">🗑️</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {filteredItems.length === 0 && (
                                        <div className="text-center py-12 text-[var(--text-muted)]">
                                            No items found. Add some delicious food! 🍕
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-[var(--text-muted)]">
                                <div className="text-6xl mb-4">👈</div>
                                <p>Select a category to manage menu items</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {activeTab === 'digital' && (
                <div className="flex-1 glass-card rounded-2xl p-8 overflow-y-auto animate-in">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-[var(--brand-dark)]">Digital Menu Manager</h1>
                                <p className="text-[var(--text-muted)]">Customize your public-facing QR menu</p>
                            </div>
                            <div className="flex gap-4">
                                <a
                                    href="/train-menu"
                                    target="_blank"
                                    className="px-6 py-3 bg-[#d32f2f] text-white rounded-xl font-bold hover:opacity-80 flex items-center gap-2"
                                >
                                    <span>↗️</span> View Train Menu
                                </a>
                                <a
                                    href="/menu"
                                    target="_blank"
                                    className="px-6 py-3 bg-black text-white rounded-xl font-bold hover:opacity-80 flex items-center gap-2"
                                >
                                    <span>↗️</span> View Live Menu
                                </a>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* QR Code Section */}
                            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
                                <h3 className="text-xl font-bold mb-4 text-gray-800">Your Menu QR Code</h3>
                                <div className="bg-white p-4 rounded-xl border-2 border-dashed border-gray-200 mb-4">
                                    <QRCodeSVG value={menuUrl} size={200} />
                                </div>
                                <p className="text-sm text-gray-500 mb-6">Scan this code to view your digital menu instantly.</p>
                                <button
                                    onClick={() => window.print()}
                                    className="w-full py-3 bg-[var(--brand-primary)] text-white font-bold rounded-xl hover:opacity-90"
                                >
                                    Download / Print QR
                                </button>
                            </div>

                            {/* Settings Section */}
                            <div className="space-y-6">
                                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                    <h3 className="text-lg font-bold mb-4 text-gray-800">Appearance</h3>

                                    <div className="mb-4">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Menu Theme</label>
                                        <div className="flex gap-2">
                                            {['light', 'dark', 'system'].map(theme => (
                                                <button
                                                    key={theme}
                                                    onClick={() => updateSettings({
                                                        ...settings,
                                                        digitalMenu: { ...settings.digitalMenu!, theme: theme as any }
                                                    })}
                                                    className={`flex-1 py-2 rounded-lg border capitalize font-medium ${settings.digitalMenu?.theme === theme
                                                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                                                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    {theme}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Banner Image URL</label>
                                        <input
                                            type="text"
                                            className="w-full p-3 rounded-xl border border-gray-200 focus:border-[var(--brand-primary)] outline-none"
                                            placeholder="https://..."
                                            value={settings.digitalMenu?.bannerImage}
                                            onChange={e => updateSettings({
                                                ...settings,
                                                digitalMenu: { ...settings.digitalMenu!, bannerImage: e.target.value }
                                            })}
                                        />
                                        {settings.digitalMenu?.bannerImage && (
                                            <div className="mt-2 h-32 w-full rounded-lg overflow-hidden relative">
                                                <Image
                                                    src={settings.digitalMenu.bannerImage}
                                                    alt="Banner Preview"
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={settings.digitalMenu?.isActive}
                                            onChange={e => updateSettings({
                                                ...settings,
                                                digitalMenu: { ...settings.digitalMenu!, isActive: e.target.checked }
                                            })}
                                            className="w-5 h-5 rounded text-[var(--brand-primary)]"
                                        />
                                        <div>
                                            <div className="font-bold text-gray-800">Enable Digital Menu</div>
                                            <div className="text-xs text-gray-500">Turn off to show "Maintenance Mode" to customers</div>
                                        </div>
                                    </label>

                                    <div className="pt-4 border-t border-gray-100 relative z-10">
                                        <button
                                            onClick={(e) => {
                                                const btn = e.currentTarget;
                                                if (btn.getAttribute('data-confirm') === 'true') {
                                                    localStorage.removeItem('oye_chatoro_menu_items');
                                                    localStorage.removeItem('oye_chatoro_menu_cats');
                                                    window.location.reload();
                                                } else {
                                                    btn.setAttribute('data-confirm', 'true');
                                                    btn.textContent = '⚠️ Click Again to Confirm Reset';
                                                    btn.classList.remove('bg-red-100', 'text-red-600');
                                                    btn.classList.add('bg-red-600', 'text-white');
                                                    setTimeout(() => {
                                                        btn.setAttribute('data-confirm', 'false');
                                                        btn.innerHTML = '<span>🔄</span> Reset Menu to Defaults';
                                                        btn.classList.add('bg-red-100', 'text-red-600');
                                                        btn.classList.remove('bg-red-600', 'text-white');
                                                    }, 3000);
                                                }
                                            }}
                                            className="w-full py-3 bg-red-100 text-red-600 font-bold rounded-xl hover:bg-red-200 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <span>🔄</span> Reset Menu to Defaults
                                        </button>
                                        <p className="text-xs text-center text-gray-400 mt-2">Use this if you don't see the new Train Menu items.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modals (Only render when activeTab is items) */}
            {/* Add Category Modal */}
            {isCatModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md animate-in">
                        <h2 className="text-2xl font-bold mb-4">Add New Category</h2>
                        <form onSubmit={handleSaveCategory} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Category Name</label>
                                <input
                                    required
                                    className="w-full px-4 py-2 border rounded-xl"
                                    value={catForm.name}
                                    onChange={e => setCatForm({ ...catForm, name: e.target.value })}
                                    placeholder="e.g., Burgers"
                                />
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button type="button" onClick={() => setIsCatModalOpen(false)} className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg">Cancel</button>
                                <button type="submit" className="btn btn-primary">Save Category</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Add/Edit Item Modal */}
            {isItemModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-lg animate-in">
                        <h2 className="text-2xl font-bold mb-4">{editingItem ? 'Edit Item' : 'Add New Item'}</h2>
                        <form onSubmit={handleSaveItem} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Category</label>
                                <select
                                    className="w-full px-4 py-2 border rounded-xl"
                                    value={itemForm.categoryId}
                                    onChange={e => setItemForm({ ...itemForm, categoryId: e.target.value })}
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Item Name</label>
                                <input
                                    required
                                    className="w-full px-4 py-2 border rounded-xl"
                                    value={itemForm.name}
                                    onChange={e => setItemForm({ ...itemForm, name: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Price (₹)</label>
                                    <input
                                        type="number"
                                        required
                                        className="w-full px-4 py-2 border rounded-xl"
                                        value={itemForm.price}
                                        onChange={e => setItemForm({ ...itemForm, price: Number(e.target.value) })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Cost Price (₹)</label>
                                    <input
                                        type="number"
                                        className="w-full px-4 py-2 border rounded-xl"
                                        value={itemForm.costPrice}
                                        onChange={e => setItemForm({ ...itemForm, costPrice: Number(e.target.value) })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Type</label>
                                    <div className="flex gap-4 mt-2">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                checked={itemForm.veg}
                                                onChange={() => setItemForm({ ...itemForm, veg: true })}
                                            /> Veg
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                checked={!itemForm.veg}
                                                onChange={() => setItemForm({ ...itemForm, veg: false })}
                                            /> Non-Veg
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Image URL</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-xl"
                                    value={itemForm.image}
                                    onChange={e => setItemForm({ ...itemForm, image: e.target.value })}
                                    placeholder="https://..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea
                                    className="w-full px-4 py-2 border rounded-xl"
                                    rows={3}
                                    value={itemForm.description}
                                    onChange={e => setItemForm({ ...itemForm, description: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={itemForm.isDigitalMenu !== false} // Default to true if undefined
                                            onChange={e => setItemForm({ ...itemForm, isDigitalMenu: e.target.checked })}
                                            className="w-4 h-4 rounded text-[var(--brand-primary)]"
                                        />
                                        <span className="text-sm font-medium">Digital Menu 📱</span>
                                    </label>
                                </div>
                                <div className="flex gap-4 p-4 bg-red-50 rounded-xl">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={itemForm.isTrainMenu || false}
                                            onChange={e => setItemForm({ ...itemForm, isTrainMenu: e.target.checked })}
                                            className="w-4 h-4 rounded text-red-600"
                                        />
                                        <span className="text-sm font-medium text-red-800">Train Menu 🚆</span>
                                    </label>
                                </div>
                            </div>
                            <div className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={itemForm.isFeatured || false}
                                        onChange={e => setItemForm({ ...itemForm, isFeatured: e.target.checked })}
                                        className="w-4 h-4 rounded text-[var(--brand-primary)]"
                                    />
                                    <span className="text-sm font-medium">Featured Item ⭐</span>
                                </label>
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button type="button" onClick={() => setIsItemModalOpen(false)} className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg">Cancel</button>
                                <button type="submit" className="btn btn-primary">Save Item</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Recipe Modal */}
            {isRecipeModalOpen && selectedItemForRecipe && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-lg animate-in max-h-[80vh] overflow-y-auto custom-scrollbar">
                        <h2 className="text-2xl font-bold mb-2">Recipe: {selectedItemForRecipe.name}</h2>
                        <p className="text-sm text-gray-500 mb-6">Link inventory ingredients to this menu item. Stock will be auto-deducted when ordered.</p>

                        <div className="space-y-4 mb-6">
                            {recipeForm.map((ingredient, index) => (
                                <div key={index} className="flex gap-2 items-end">
                                    <div className="flex-1">
                                        <label className="block text-xs font-medium mb-1">Ingredient</label>
                                        <select
                                            className="w-full px-3 py-2 border rounded-lg text-sm"
                                            value={ingredient.inventoryItemId}
                                            onChange={e => updateRecipeIngredient(index, 'inventoryItemId', Number(e.target.value))}
                                        >
                                            {inventory.map(inv => (
                                                <option key={inv.id} value={inv.id}>{inv.name} ({inv.unit})</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="w-24">
                                        <label className="block text-xs font-medium mb-1">Qty</label>
                                        <input
                                            type="number"
                                            className="w-full px-3 py-2 border rounded-lg text-sm"
                                            value={ingredient.quantity}
                                            onChange={e => updateRecipeIngredient(index, 'quantity', Number(e.target.value))}
                                        />
                                    </div>
                                    <button
                                        onClick={() => removeIngredientFromRecipe(index)}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                        title="Remove"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={addIngredientToRecipe}
                                className="text-sm text-[var(--brand-primary)] font-medium hover:underline"
                            >
                                + Add Ingredient
                            </button>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t">
                            <button onClick={() => setIsRecipeModalOpen(false)} className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg">Cancel</button>
                            <button onClick={handleSaveRecipe} className="btn btn-primary">Save Recipe</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
