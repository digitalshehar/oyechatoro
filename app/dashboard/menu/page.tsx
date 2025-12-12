'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useDbMenu, MenuItem, MenuCategory, useDbInventory } from '../../lib/db-hooks';
import { QRCodeSVG } from 'qrcode.react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

export default function MenuManagerPage() {
    const { categories, items, saveCategory, deleteCategory, saveItem, deleteItem, loading } = useDbMenu();
    const { inventory } = useDbInventory();
    // const { settings, updateSettings } = useSettings(); // Settings still local for now

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
                return matchesCategory && matchesSearch && (item.isTrainMenu !== true || item.isDigitalMenu === true);
            }
            return matchesCategory && matchesSearch;
        });
    }, [items, selectedCategory, searchTerm, activeTab]);

    // Handlers
    const handleSaveCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Attempting to save category:', catForm);

        if (!catForm.name) {
            alert('Category name is required');
            return;
        }

        const newCategory: MenuCategory = {
            id: `cat_${Date.now()}`,
            name: catForm.name
        };

        try {
            if (saveCategory) {
                await saveCategory(newCategory);
                console.log('Category saved successfully');
                setIsCatModalOpen(false);
                setCatForm({ name: '' });
            } else {
                console.error('saveCategory function is missing');
                alert('Internal Error: Database connection missing');
            }
        } catch (error) {
            console.error('Failed to save category:', error);
            alert('Failed to save category. Check console.');
        }
    };

    const handleDeleteCategory = async (id: string) => {
        if (confirm('Are you sure? This will delete the category and all its items.')) {
            if (deleteCategory) {
                await deleteCategory(id);
                if (selectedCategoryId === id) setSelectedCategoryId(null);
            }
        }
    };

    const handleSaveItem = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!itemForm.categoryId) {
            alert('Please select a category');
            return;
        }

        const newItem: MenuItem = {
            id: editingItem ? editingItem.id : `item_${Date.now()}`,
            name: itemForm.name || '',
            slug: itemForm.slug || (itemForm.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
            price: Number(itemForm.price),
            description: itemForm.description || '',
            categoryId: itemForm.categoryId,
            veg: itemForm.veg || false,
            status: (itemForm.status || 'Active') as 'Active' | 'OutOfStock',
            image: itemForm.image || '',
            // recipe: editingItem?.recipe,
            isDigitalMenu: itemForm.isDigitalMenu !== false,
            isTrainMenu: itemForm.isTrainMenu || false,
            isFeatured: itemForm.isFeatured || false,
            costPrice: Number(itemForm.costPrice) || 0
        };

        if (saveItem) await saveItem(newItem);
        setIsItemModalOpen(false);
        setEditingItem(null);
        setItemForm({ name: '', price: 0, costPrice: 0, description: '', categoryId: '', veg: true, status: 'Active', isDigitalMenu: true, isTrainMenu: false, isFeatured: false });
    };

    const openEditItem = (item: MenuItem) => {
        setEditingItem(item);
        setItemForm(item);
        setIsItemModalOpen(true);
    };

    const handleDeleteItem = async (id: string) => {
        if (confirm('Delete this item?')) {
            if (deleteItem) await deleteItem(id);
        }
    };

    const openRecipeModal = (item: MenuItem) => {
        setSelectedItemForRecipe(item);
        setRecipeForm(item.recipe || []);
        setIsRecipeModalOpen(true);
    };

    const handleSaveRecipe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedItemForRecipe && saveItem) {
            await saveItem({
                ...selectedItemForRecipe,
                recipe: recipeForm
            });
            setIsRecipeModalOpen(false);
            setSelectedItemForRecipe(null);
            setRecipeForm([]);
        }
    };

    const addIngredientToRecipe = () => {
        setRecipeForm([...recipeForm, { inventoryItemId: 0, quantity: 0 }]);
    };

    const removeIngredientFromRecipe = (index: number) => {
        const newForm = [...recipeForm];
        newForm.splice(index, 1);
        setRecipeForm(newForm);
    };

    const updateRecipeItem = (index: number, field: 'inventoryItemId' | 'quantity', value: number) => {
        const newForm = [...recipeForm];
        newForm[index] = { ...newForm[index], [field]: value };
        setRecipeForm(newForm);
    };

    const menuUrl = typeof window !== 'undefined' ? `${window.location.origin}/menu` : '';

    if (loading && categories.length === 0) {
        return <div className="p-12 flex justify-center"><LoadingSpinner /></div>;
    }

    return (
        <div className="flex flex-col h-[calc(100vh-2rem)] gap-6 p-4 md:p-8 max-w-7xl mx-auto w-full">
            <div className="flex justify-between items-center mb-2">
                <h1 className="text-3xl font-bold text-[var(--brand-dark)]">Menu Management <span className="text-sm font-normal text-gray-400 bg-gray-100 px-2 py-1 rounded-full ml-2">Live Database</span></h1>
            </div>

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
                            {categories.length === 0 && !loading && (
                                <div className="text-center text-gray-400 text-sm mt-4">No categories. Add one +</div>
                            )}
                        </div>
                    </div>

                    {/* Main Area - Items */}
                    <div className="flex-1 glass-card rounded-2xl p-6 flex flex-col">
                        {selectedCategory ? (
                            <>
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h1 className="text-3xl font-bold text-[var(--brand-dark)]">
                                            {selectedCategory.name}
                                            {selectedCategory.name.endsWith('🍕') || selectedCategory.name.endsWith('🍔') ? '' : ''}
                                        </h1>
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
                                            className="px-4 py-2 bg-[var(--brand-primary)] text-white rounded-xl font-bold hover:shadow-lg transition-all"
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
                                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
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

                            {/* Settings Section Placeholder */}
                            <div className="space-y-6">
                                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                    <h3 className="text-lg font-bold mb-4 text-gray-800">Appearance (Coming Soon)</h3>
                                    <p className="text-gray-500">Settings are currently disabled while we move to the new database system.</p>
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
                                <button type="submit" className="px-6 py-2 bg-[var(--brand-primary)] text-white rounded-xl font-bold hover:shadow-lg transition-all">Save Category</button>
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
                                    <div className="mt-2 text-sm font-bold text-green-700 bg-green-50 px-3 py-2 rounded-xl border border-green-200 inline-block">
                                        🥗 100% Pure Veg
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
                    <div className="bg-white rounded-2xl p-6 w-full max-w-lg animate-in max-h-[90vh] overflow-y-auto custom-scrollbar">
                        <h2 className="text-2xl font-bold mb-4">Recipe: {selectedItemForRecipe.name}</h2>
                        <p className="text-sm text-gray-500 mb-6">Link inventory items to deduct stock automatically when this item is sold.</p>

                        <form onSubmit={handleSaveRecipe} className="space-y-4">
                            {recipeForm.map((ingredient, index) => (
                                <div key={index} className="flex gap-2 items-end bg-gray-50 p-3 rounded-xl border border-gray-100">
                                    <div className="flex-1">
                                        <label className="block text-xs font-bold text-gray-500 mb-1">Ingredient</label>
                                        <select
                                            required
                                            className="w-full px-3 py-2 border rounded-lg text-sm"
                                            value={ingredient.inventoryItemId}
                                            onChange={e => updateRecipeItem(index, 'inventoryItemId', Number(e.target.value))}
                                        >
                                            <option value={0}>Select Ingredient</option>
                                            {inventory.map(inv => (
                                                <option key={inv.id} value={inv.id}>{inv.name} ({inv.unit})</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="w-24">
                                        <label className="block text-xs font-bold text-gray-500 mb-1">Qty</label>
                                        <input
                                            required
                                            type="number"
                                            step="0.001"
                                            className="w-full px-3 py-2 border rounded-lg text-sm"
                                            value={ingredient.quantity}
                                            onChange={e => updateRecipeItem(index, 'quantity', Number(e.target.value))}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeIngredientFromRecipe(index)}
                                        className="p-2 text-red-500 hover:bg-red-100 rounded-lg"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={addIngredientToRecipe}
                                className="w-full py-2 border-2 border-dashed border-[var(--brand-primary)] text-[var(--brand-primary)] rounded-xl font-bold hover:bg-orange-50 transition-colors"
                            >
                                + Add Ingredient
                            </button>

                            <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                                <button type="button" onClick={() => setIsRecipeModalOpen(false)} className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg">Cancel</button>
                                <button type="submit" className="btn btn-primary">Save Recipe</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
