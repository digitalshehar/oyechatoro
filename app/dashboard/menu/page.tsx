'use client';

import React, { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import ExportButton from './ExportButton';
import ImportModal from './ImportModal';
import Image from 'next/image';
import { useDbMenu, MenuItem, MenuCategory, useDbInventory } from '../../lib/db-hooks';
import { QRCodeSVG } from 'qrcode.react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import TopSellingWidget from './TopSellingWidget';

export default function MenuManagerPage() {
    const { categories, items, saveCategory, deleteCategory, saveItem, deleteItem, loading } = useDbMenu();
    const { inventory } = useDbInventory();
    // const { settings, updateSettings } = useSettings(); // Settings still local for now

    const [activeTab, setActiveTab] = useState<'items' | 'train' | 'digital'>('items');
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
    const [isBulkProcessing, setIsBulkProcessing] = useState(false);

    // Modal States
    const [isCatModalOpen, setIsCatModalOpen] = useState(false);
    const [isItemModalOpen, setIsItemModalOpen] = useState(false);
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);

    const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
    const [selectedItemForRecipe, setSelectedItemForRecipe] = useState<MenuItem | null>(null);

    // AI Pricing States
    const [isPricingLoading, setIsPricingLoading] = useState(false);
    const [showYieldModal, setShowYieldModal] = useState(false);
    const [pricingSuggestions, setPricingSuggestions] = useState<any[]>([]);

    // AI Translation States
    const [isTranslating, setIsTranslating] = useState(false);

    // Form States
    const [catForm, setCatForm] = useState({ name: '' });
    const [itemForm, setItemForm] = useState<Partial<MenuItem>>({
        name: '', price: 0, costPrice: 0, description: '', categoryId: '', veg: true, status: 'Active', isDigitalMenu: true, isTrainMenu: false, isFeatured: false, tags: []
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
        }).sort((a, b) => a.price - b.price);
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
            name: catForm.name,
            order: 0
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
        if (!confirm('Are you sure you want to delete this category?')) return;

        try {
            if (deleteCategory) {
                await deleteCategory(id);
                if (selectedCategoryId === id) setSelectedCategoryId(null);
            }
        } catch (error: any) {
            // Check if error is about items existing
            if (error.message && error.message.includes('has') && error.message.includes('items')) {
                if (confirm(`${error.message}\n\nDo you want to delete the category AND all its items?`)) {
                    try {
                        if (deleteCategory) {
                            await deleteCategory(id, true); // Force delete
                            if (selectedCategoryId === id) setSelectedCategoryId(null);
                        }
                    } catch (forceError: any) {
                        console.error('Force delete failed:', forceError);
                        alert(forceError.message || 'Failed to force delete category');
                    }
                }
            } else {
                console.error('Delete failed:', error);
                alert(error.message || 'Failed to delete category');
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
            costPrice: Number(itemForm.costPrice) || 0,
            order: 0,
            tags: itemForm.tags || []
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

    const handleSuggestPricing = async () => {
        setIsPricingLoading(true);
        setShowYieldModal(true);
        try {
            const res = await fetch('/api/seo/ai/pricing', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'suggest' })
            });
            const data = await res.json();
            if (data.suggestions) setPricingSuggestions(data.suggestions);
        } catch (error) {
            console.error('Pricing error:', error);
        } finally {
            setIsPricingLoading(false);
        }
    };

    const handleApplyPricing = async () => {
        if (!confirm(`Apply all ${pricingSuggestions.length} price changes? This will go live immediately.`)) return;
        setIsPricingLoading(true);
        try {
            const res = await fetch('/api/seo/ai/pricing', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'apply', pricingData: pricingSuggestions })
            });
            const data = await res.json();
            if (data.success) {
                alert('Prices updated successfully! 🚀');
                setShowYieldModal(false);
                window.location.reload();
            }
        } catch (error) {
            console.error('Apply error:', error);
        } finally {
            setIsPricingLoading(false);
        }
    };

    const handleTranslate = async (targetLang: string = 'Hindi') => {
        if (!itemForm.name) return;
        setIsTranslating(true);
        try {
            const res = await fetch('/api/seo/ai/translate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: { name: itemForm.name, description: itemForm.description },
                    targetLang
                })
            });
            const data = await res.json();
            if (data.translation) {
                setItemForm(prev => ({
                    ...prev,
                    translations: {
                        ...(prev.translations as any || {}),
                        [targetLang === 'Hindi' ? 'hi' : targetLang]: data.translation
                    }
                }));
            }
        } catch (error) {
            console.error('Translation failed:', error);
        } finally {
            setIsTranslating(false);
        }
    };

    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Simple size check (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('File is too large. Please use an image under 5MB.');
            return;
        }

        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('type', 'menu');

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) throw new Error('Upload failed');

            const data = await res.json();
            if (data.url) {
                setItemForm(prev => ({ ...prev, image: data.url }));
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload image. Please try again.');
        } finally {
            setIsUploading(false);
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

    const reorder = (list: any[], startIndex: number, endIndex: number) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    const toggleSelection = (id: string) => {
        const newSet = new Set(selectedItems);
        if (newSet.has(id)) newSet.delete(id);
        else newSet.add(id);
        setSelectedItems(newSet);
    };

    const handleBulkAction = async (action: 'delete' | 'updateStatus', status?: 'Active' | 'OutOfStock') => {
        if (selectedItems.size === 0) return;
        if (!confirm(`Apply ${action} to ${selectedItems.size} items?`)) return;

        setIsBulkProcessing(true);
        try {
            const res = await fetch('/api/menu/bulk', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action,
                    itemIds: Array.from(selectedItems),
                    data: { status }
                })
            });
            if (!res.ok) throw new Error('Bulk action failed');

            // Reload to reflect changes
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert('Failed to perform action');
        } finally {
            setIsBulkProcessing(false);
            setSelectedItems(new Set());
        }
    };

    const onDragEnd = async (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        if (result.source.droppableId === 'items') {
            const items = reorder(
                filteredItems,
                result.source.index,
                result.destination.index
            );

            // Need to update local state immediately for smooth UI provided we had state
            // But filteredItems is derived. We must update the source "items".
            // However, items is from hook.
            // Best approach: Optimistically update UI via a local override or just call API and refetch.
            // Since we don't have local override for items, we'll just call API and refetch.
            // Actually, for smoothness, we should set a local state, but hooking into `useDbMenu` might be complex.
            // Let's call API.

            // Prepare payload
            const updates = items.map((item: any, index: number) => ({
                id: item.id,
                order: index
            }));

            try {
                await fetch('/api/menu/reorder', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ type: 'item', items: updates })
                });
                // Refetch to snap to new order
                // refetch(); // need to expose refetch from hook or use query
                window.location.reload(); // Temporary brute force to reflect changes or use refetch if available
                // Actually `useDbMenu` exposes `refetch`.
                // fetchMenu();
            } catch (e) {
                console.error(e);
            }
        }
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

            {/* Quick Stats Widget */}
            <TopSellingWidget />

            {/* Top Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                <button
                    onClick={() => setActiveTab('items')}
                    className={`px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-bold transition-all whitespace-nowrap text-sm md:text-base ${activeTab === 'items' ? 'bg-[var(--brand-primary)] text-white shadow-lg' : 'bg-white text-gray-500'}`}
                >
                    🍔 Restaurant Menu
                </button>
                <button
                    onClick={() => setActiveTab('train')}
                    className={`px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-bold transition-all whitespace-nowrap text-sm md:text-base ${activeTab === 'train' ? 'bg-[#d32f2f] text-white shadow-lg' : 'bg-white text-gray-500'}`}
                >
                    🚆 Train Menu
                </button>
                <button
                    onClick={() => setActiveTab('digital')}
                    className={`px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-bold transition-all whitespace-nowrap text-sm md:text-base ${activeTab === 'digital' ? 'bg-[var(--brand-primary)] text-white shadow-lg' : 'bg-white text-gray-500'}`}
                >
                    📱 Digital Menu
                </button>
            </div>

            {(activeTab === 'items' || activeTab === 'train') && (
                <div className="flex flex-col md:flex-row flex-1 gap-4 md:gap-6 overflow-hidden">
                    {/* Sidebar / Top Chips - Categories */}
                    <div className="w-full md:w-1/4 glass-card rounded-2xl p-4 md:p-6 flex flex-col shrink-0">
                        <div className="flex justify-between items-center mb-4 md:mb-6">
                            <h2 className="text-lg md:text-xl font-bold text-[var(--brand-dark)]">Categories</h2>
                            <button
                                onClick={() => setIsCatModalOpen(true)}
                                className="w-8 h-8 rounded-full bg-[var(--brand-primary)] text-white flex items-center justify-center hover:scale-110 transition-transform"
                            >
                                +
                            </button>
                        </div>

                        <div className="flex md:flex-col overflow-x-auto md:overflow-y-auto space-x-2 md:space-x-0 md:space-y-2 pb-2 md:pb-0 md:pr-2 custom-scrollbar scrollbar-hide">
                            {categories.map(cat => (
                                <div
                                    key={cat.id}
                                    onClick={() => setSelectedCategoryId(cat.id)}
                                    className={`p-2.5 md:p-4 rounded-xl cursor-pointer transition-all group relative whitespace-nowrap min-w-fit ${(selectedCategory?.id === cat.id)
                                        ? 'bg-[var(--brand-primary)] text-white shadow-lg'
                                        : 'bg-white/50 hover:bg-white text-[var(--text-main)] border border-gray-100 md:border-none'
                                        }`}
                                >
                                    <div className="font-bold flex justify-between items-center gap-2">
                                        <span className="text-sm md:text-base">{cat.name}</span>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleDeleteCategory(cat.id); }}
                                            className={`text-xs opacity-0 md:group-hover:opacity-100 p-1 rounded hover:bg-red-100 hover:text-red-600 ${(selectedCategory?.id === cat.id) ? 'text-white hover:text-red-600' : 'text-[var(--text-muted)]'
                                                }`}
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {categories.length === 0 && !loading && (
                                <div className="text-center text-gray-400 text-sm mt-4 min-w-[200px]">No categories. Add one +</div>
                            )}
                        </div>
                    </div>

                    {/* Main Area - Items */}
                    <div className="flex-1 glass-card rounded-2xl p-4 md:p-6 flex flex-col overflow-hidden">
                        <DragDropContext onDragEnd={onDragEnd}>
                            {selectedCategory ? (
                                <>
                                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
                                        <div className="w-full lg:w-auto">
                                            <h1 className="text-xl md:text-3xl font-bold text-[var(--brand-dark)]">
                                                {selectedCategory.name}
                                            </h1>
                                            <p className="text-xs md:text-sm text-[var(--text-muted)]">
                                                {activeTab === 'train' ? 'Manage Train Delivery Items' : 'Manage Restaurant Menu Items'}
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap gap-2 md:gap-4 items-center w-full lg:w-auto">
                                            {selectedItems.size > 0 && (
                                                <div className="flex gap-2 animate-in fade-in slide-in-from-right-4 bg-yellow-50 px-3 py-1.5 rounded-xl border border-yellow-200 overflow-x-auto whitespace-nowrap">
                                                    <span className="text-xs font-bold text-yellow-800">{selectedItems.size} Sel</span>
                                                    <div className="h-4 w-px bg-yellow-300 mx-1"></div>
                                                    <button onClick={() => handleBulkAction('updateStatus', 'OutOfStock')} className="text-[10px] font-bold text-red-600 hover:bg-red-100 px-1.5 py-1 rounded">🚫 Out</button>
                                                    <button onClick={() => handleBulkAction('updateStatus', 'Active')} className="text-[10px] font-bold text-green-600 hover:bg-green-100 px-1.5 py-1 rounded">✅ In</button>
                                                    <button onClick={() => handleBulkAction('delete')} className="text-[10px] font-bold text-gray-600 hover:bg-gray-100 px-1.5 py-1 rounded">🗑️</button>
                                                </div>
                                            )}
                                            <div className="flex-1 lg:flex-none">
                                                <input
                                                    type="text"
                                                    placeholder="Search..."
                                                    className="w-full lg:w-auto px-4 py-2 text-sm border border-[var(--border-light)] rounded-xl outline-none focus:border-[var(--brand-primary)] bg-white/80"
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                />
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={handleSuggestPricing}
                                                    className="p-2 md:px-4 md:py-2 bg-amber-50 text-amber-700 rounded-xl font-bold border border-amber-100 hover:bg-amber-100 flex items-center gap-2 transition-all shadow-sm"
                                                >
                                                    <span>⚡</span><span className="hidden md:inline">AI Pricing</span>
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setEditingItem(null);
                                                        setItemForm({
                                                            ...itemForm,
                                                            categoryId: selectedCategory.id,
                                                            isTrainMenu: activeTab === 'train',
                                                            isDigitalMenu: activeTab !== 'train'
                                                        });
                                                        setIsItemModalOpen(true);
                                                    }}
                                                    className="px-4 py-2 bg-[var(--brand-primary)] text-white rounded-xl font-bold hover:shadow-lg transition-all whitespace-nowrap text-sm"
                                                >
                                                    + Add Item
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                                        <Droppable droppableId="items">
                                            {(provided) => (
                                                <div
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
                                                >
                                                    {filteredItems.map((item, index) => (
                                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                                            {(provided) => (
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    className={`bg-white p-4 rounded-xl border transition-all flex gap-4 group relative ${selectedItems.has(item.id) ? 'border-[var(--brand-primary)] ring-1 ring-[var(--brand-primary)] bg-blue-50' : 'border-[var(--border-light)] hover:shadow-md'}`}
                                                                >
                                                                    <div className="absolute top-4 left-4 z-10">
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={selectedItems.has(item.id)}
                                                                            onChange={(e) => { e.stopPropagation(); toggleSelection(item.id); }}
                                                                            className="w-5 h-5 rounded border-gray-300 text-[var(--brand-primary)] focus:ring-[var(--brand-primary)]"
                                                                        />
                                                                    </div>
                                                                    <div className="w-20 h-20 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 relative ml-8">
                                                                        {item.image ? (
                                                                            <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                                                                        ) : (
                                                                            <div className="w-full h-full flex items-center justify-center text-2xl">🥘</div>
                                                                        )}
                                                                    </div>
                                                                    <div className="flex-1 min-w-0">
                                                                        <div className="flex justify-between items-start">
                                                                            <h4 className="font-bold text-[var(--text-main)] truncate">{item.name}</h4>
                                                                            <div className={`w-2 h-2 rounded-full ${item.veg ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                                                        </div>
                                                                        <p className="text-xs text-[var(--text-muted)] line-clamp-2 my-1">{item.description}</p>
                                                                        <div className="flex justify-between items-center mt-2">
                                                                            <span className="font-bold text-[var(--brand-dark)]">₹{item.price}</span>
                                                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                                <button onClick={() => openRecipeModal(item)} className="text-orange-500 hover:bg-orange-50 p-1 rounded" title="Manage Recipe">📜</button>
                                                                                <button onClick={() => openEditItem(item)} className="text-blue-500 hover:bg-blue-50 p-1 rounded" title="Edit Item">✏️</button>
                                                                                <button onClick={() => handleDeleteItem(item.id)} className="text-red-500 hover:bg-red-50 p-1 rounded" title="Delete Item">🗑️</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                    {provided.placeholder}
                                                </div>
                                            )}
                                        </Droppable>

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
                        </DragDropContext>
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
                    <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in shadow-2xl flex flex-col">

                        {/* Modal Header */}
                        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">{editingItem ? 'Edit Item' : 'New Menu Item'}</h2>
                                <p className="text-sm text-gray-500">Fill in the details for your delicious food</p>
                            </div>
                            <button onClick={() => setIsItemModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">✕</button>
                        </div>

                        <form onSubmit={handleSaveItem} className="p-6 flex flex-col lg:flex-row gap-8">

                            {/* LEFT COLUMN: Visuals & Basics (Width 40%) */}
                            <div className="w-full lg:w-5/12 space-y-6">
                                {/* Image Uploader */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Item Image</label>
                                    <div className="relative group">
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleImageUpload}
                                            className="hidden"
                                            accept="image/*"
                                        />
                                        <div
                                            onClick={() => fileInputRef.current?.click()}
                                            className={`aspect-video rounded-2xl overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 transition-all cursor-pointer ${itemForm.image ? 'border-none' : 'hover:border-orange-400 hover:bg-orange-50'}`}
                                        >
                                            {isUploading ? (
                                                <div className="flex flex-col items-center text-orange-500 animate-pulse">
                                                    <span className="text-2xl mb-1">⬆️</span>
                                                    <span className="font-bold text-sm">Uploading...</span>
                                                </div>
                                            ) : itemForm.image ? (
                                                <>
                                                    <Image
                                                        src={itemForm.image}
                                                        alt="Preview"
                                                        fill
                                                        className="object-cover group-hover:opacity-75 transition-opacity"
                                                    />
                                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <span className="bg-black/50 text-white px-3 py-1 rounded-full text-xs font-bold">Change Image</span>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="text-center p-4">
                                                    <span className="text-4xl mb-2 block">📷</span>
                                                    <span className="text-sm text-gray-400 font-medium">Click to Upload Image</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="mt-2 text-center text-xs text-gray-400">
                                            OR paste URL below
                                        </div>
                                        <input
                                            type="text"
                                            className="mt-1 w-full px-4 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-[var(--brand-primary)] outline-none"
                                            value={itemForm.image || ''}
                                            onChange={e => setItemForm({ ...itemForm, image: e.target.value })}
                                            placeholder="https://example.com/food.jpg"
                                        />
                                    </div>
                                </div>

                                {/* Dietary Toggle */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Dietary Type</label>
                                    <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-xl">
                                        <button
                                            type="button"
                                            onClick={() => setItemForm({ ...itemForm, veg: true })}
                                            className={`py-2 px-4 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${itemForm.veg ? 'bg-white text-green-700 shadow-sm border border-green-200' : 'text-gray-500 hover:text-gray-700'}`}
                                        >
                                            <span className="w-2 h-2 rounded-full bg-green-500"></span> Veg
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setItemForm({ ...itemForm, veg: false })}
                                            className={`py-2 px-4 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${!itemForm.veg ? 'bg-white text-red-700 shadow-sm border border-red-200' : 'text-gray-500 hover:text-gray-700'}`}
                                        >
                                            <span className="w-2 h-2 rounded-full bg-red-500"></span> Non-Veg
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT COLUMN: Details & Settings (Width 60%) */}
                            <div className="w-full lg:w-7/12 space-y-6">
                                {/* Basic Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Item Name</label>
                                        <input
                                            required
                                            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[var(--brand-primary)] outline-none font-medium"
                                            value={itemForm.name}
                                            onChange={e => setItemForm({ ...itemForm, name: e.target.value })}
                                            placeholder="e.g. Butter Chicken"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                                        <select
                                            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[var(--brand-primary)] outline-none bg-white"
                                            value={itemForm.categoryId}
                                            onChange={e => setItemForm({ ...itemForm, categoryId: e.target.value })}
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Price (₹)</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-3 text-gray-400 font-bold">₹</span>
                                            <input
                                                type="number"
                                                required
                                                className="w-full pl-8 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[var(--brand-primary)] outline-none font-bold text-lg"
                                                value={itemForm.price}
                                                onChange={e => setItemForm({ ...itemForm, price: Number(e.target.value) })}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Cost Price (Optional)</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-3 text-gray-400 font-bold">₹</span>
                                            <input
                                                type="number"
                                                className="w-full pl-8 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-gray-400 outline-none text-gray-600"
                                                value={itemForm.costPrice || ''}
                                                onChange={e => setItemForm({ ...itemForm, costPrice: Number(e.target.value) })}
                                            />
                                        </div>
                                    </div>

                                    <div className="md:col-span-2 space-y-2">
                                        <div className="flex justify-between items-center">
                                            <label className="block text-sm font-bold text-gray-700">Description</label>
                                            <button
                                                type="button"
                                                onClick={() => handleTranslate('Hindi')}
                                                disabled={isTranslating}
                                                className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-all flex items-center gap-1.5"
                                            >
                                                {isTranslating ? <span className="animate-spin text-[10px]">🪄</span> : '🪄'}
                                                Translate to Hindi
                                            </button>
                                        </div>
                                        <textarea
                                            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[var(--brand-primary)] outline-none text-sm min-h-[80px]"
                                            rows={2}
                                            value={itemForm.description || ''}
                                            onChange={e => setItemForm({ ...itemForm, description: e.target.value })}
                                            placeholder="Describe the dish..."
                                        />
                                        {itemForm.translations?.hi && (
                                            <div className="mt-2 p-3 bg-amber-50 rounded-xl border border-amber-100">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Hindi (AI Generated)</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => setItemForm(prev => ({ ...prev, translations: { ...prev.translations, hi: null } }))}
                                                        className="text-[10px] text-amber-400 hover:text-amber-600"
                                                    >
                                                        Clear
                                                    </button>
                                                </div>
                                                <div className="text-sm font-bold text-gray-800 mb-0.5">{itemForm.translations.hi.name}</div>
                                                <div className="text-xs text-gray-600 leading-relaxed">{itemForm.translations.hi.description}</div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Availability & Tags Box */}
                                <div className="bg-gray-50 rounded-2xl p-4 space-y-4 border border-gray-100">
                                    <div className="flex gap-4">
                                        <label className="flex-1 flex items-center justify-between p-3 bg-white rounded-xl border cursor-pointer hover:border-blue-400 transition-all">
                                            <span className="flex items-center gap-2 font-bold text-blue-700">📱 Digital Menu</span>
                                            <input
                                                type="checkbox"
                                                checked={itemForm.isDigitalMenu !== false}
                                                onChange={e => setItemForm({ ...itemForm, isDigitalMenu: e.target.checked })}
                                                className="w-5 h-5 accent-blue-600"
                                            />
                                        </label>
                                        <label className="flex-1 flex items-center justify-between p-3 bg-white rounded-xl border cursor-pointer hover:border-red-400 transition-all">
                                            <span className="flex items-center gap-2 font-bold text-red-700">🚆 Train Menu</span>
                                            <input
                                                type="checkbox"
                                                checked={itemForm.isTrainMenu || false}
                                                onChange={e => setItemForm({ ...itemForm, isTrainMenu: e.target.checked })}
                                                className="w-5 h-5 accent-red-600"
                                            />
                                        </label>
                                    </div>

                                    <div className="pt-2 border-t border-gray-200">
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Tags</label>
                                        <div className="flex flex-wrap gap-2">
                                            {['Spicy', 'Vegan', 'Jain', 'Best Seller', 'New', 'Sweet'].map(tag => (
                                                <button
                                                    key={tag}
                                                    type="button"
                                                    onClick={() => {
                                                        const currentTags = itemForm.tags || [];
                                                        const newTags = currentTags.includes(tag) ? currentTags.filter(t => t !== tag) : [...currentTags, tag];
                                                        setItemForm({ ...itemForm, tags: newTags });
                                                    }}
                                                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all border ${(itemForm.tags || []).includes(tag)
                                                        ? 'bg-gray-800 text-white border-gray-800'
                                                        : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
                                                        }`}
                                                >
                                                    {tag}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <label className="flex items-center gap-3 p-3 rounded-xl hover:bg-yellow-50 transition-colors cursor-pointer w-full">
                                    <input
                                        type="checkbox"
                                        checked={itemForm.isFeatured || false}
                                        onChange={e => setItemForm({ ...itemForm, isFeatured: e.target.checked })}
                                        className="w-5 h-5 accent-yellow-500"
                                    />
                                    <div>
                                        <span className="font-bold text-gray-800">Feature this Item ⭐</span>
                                        <p className="text-xs text-gray-500">Show at the top of the menu recommendations</p>
                                    </div>
                                </label>

                            </div>
                        </form>

                        {/* Footer Actions */}
                        <div className="p-4 border-t bg-gray-50 flex justify-end gap-3 rounded-b-2xl sticky bottom-0 z-10">
                            <button
                                type="button"
                                onClick={() => setIsItemModalOpen(false)}
                                className="px-6 py-3 font-bold text-gray-500 hover:bg-gray-200 rounded-xl transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveItem}
                                className="px-8 py-3 bg-[var(--brand-primary)] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-orange-600 transition-all flex items-center gap-2"
                            >
                                {editingItem ? '💾 Save Changes' : '✨ Create Item'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ImportModal
                isOpen={isImportModalOpen}
                onClose={() => setIsImportModalOpen(false)}
                onSuccess={() => { window.location.reload(); }}
            />
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
            {/* Yield Manager Modal */}
            {showYieldModal && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-md">
                    <div className="bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl animate-in zoom-in-95 overflow-hidden flex flex-col border border-white/20">
                        <div className="bg-amber-500 p-8 text-white relative">
                            <div className="relative z-10">
                                <h2 className="text-3xl font-black flex items-center gap-3">
                                    <span>⚡</span> Yield Strategy Manager
                                </h2>
                                <p className="text-amber-100 font-medium mt-1">AI-driven dynamic pricing for maximum revenue</p>
                            </div>
                            <div className="absolute top-0 right-0 p-8 text-6xl opacity-20 rotate-12">💰</div>
                            <button onClick={() => setShowYieldModal(false)} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-all">✕</button>
                        </div>

                        <div className="p-8 flex-1 overflow-y-auto max-h-[60vh] custom-scrollbar space-y-4 bg-gray-50/50">
                            {isPricingLoading && pricingSuggestions.length === 0 ? (
                                <div className="py-20 text-center space-y-4">
                                    <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                                    <p className="text-amber-900 font-bold text-lg">Analyzing market demand & store load...</p>
                                </div>
                            ) : pricingSuggestions.length === 0 ? (
                                <div className="py-20 text-center text-gray-400">
                                    No strategic adjustments needed at this moment.
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center px-4 py-2 bg-amber-100/50 rounded-xl text-amber-800 text-xs font-bold uppercase tracking-wider">
                                        <span>Item Name</span>
                                        <span>Strategic Adjustment</span>
                                    </div>
                                    {pricingSuggestions.map((s, i) => (
                                        <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center group hover:border-amber-200 transition-all">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h4 className="font-bold text-gray-800">{s.name}</h4>
                                                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase ${s.strategy === 'Surge' ? 'bg-red-100 text-red-600' :
                                                        s.strategy === 'HappyHour' ? 'bg-green-100 text-green-600' :
                                                            s.strategy === 'Margin' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'
                                                        }`}>
                                                        {s.strategy}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-gray-500 italic">{s.reason}</p>
                                            </div>
                                            <div className="text-right">
                                                <div className="flex items-center gap-2 justify-end">
                                                    <span className="text-sm text-gray-400 line-through">₹{s.currentPrice}</span>
                                                    <span className="text-xl font-black text-amber-600">₹{s.suggestedPrice}</span>
                                                </div>
                                                <div className={`text-[10px] font-bold ${s.suggestedPrice > s.currentPrice ? 'text-red-500' : 'text-green-500'}`}>
                                                    {s.suggestedPrice > s.currentPrice ? '+' : ''}{Math.round((s.suggestedPrice - s.currentPrice) / s.currentPrice * 100)}% Change
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="p-8 bg-white border-t flex justify-end gap-3">
                            <button onClick={() => setShowYieldModal(false)} className="px-6 py-3 text-gray-500 font-bold hover:text-gray-700">Cancel</button>
                            <button
                                onClick={handleApplyPricing}
                                disabled={isPricingLoading || pricingSuggestions.length === 0}
                                className="px-10 py-3 bg-amber-500 text-white font-black rounded-2xl shadow-lg shadow-amber-200 hover:bg-amber-600 transition-all disabled:opacity-50 flex items-center gap-2"
                            >
                                {isPricingLoading ? <span className="animate-spin text-xl">⚡</span> : '🚀'}
                                {isPricingLoading ? 'Applying...' : 'Apply Strategies'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Yield Manager Modal */}
            {showYieldModal && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-md">
                    <div className="bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl animate-in zoom-in-95 overflow-hidden flex flex-col border border-white/20">
                        <div className="bg-amber-500 p-8 text-white relative">
                            <div className="relative z-10">
                                <h2 className="text-3xl font-black flex items-center gap-3">
                                    <span>⚡</span> Yield Strategy Manager
                                </h2>
                                <p className="text-amber-100 font-medium mt-1">AI-driven dynamic pricing for maximum revenue</p>
                            </div>
                            <div className="absolute top-0 right-0 p-8 text-6xl opacity-20 rotate-12">💰</div>
                            <button onClick={() => setShowYieldModal(false)} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-all">✕</button>
                        </div>

                        <div className="p-8 flex-1 overflow-y-auto max-h-[60vh] custom-scrollbar space-y-4 bg-gray-50/50">
                            {isPricingLoading && pricingSuggestions.length === 0 ? (
                                <div className="py-20 text-center space-y-4">
                                    <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                                    <p className="text-amber-900 font-bold text-lg">Analyzing market demand & store load...</p>
                                </div>
                            ) : pricingSuggestions.length === 0 ? (
                                <div className="py-20 text-center text-gray-400">
                                    No strategic adjustments needed at this moment.
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center px-4 py-2 bg-amber-100/50 rounded-xl text-amber-800 text-xs font-bold uppercase tracking-wider">
                                        <span>Item Name</span>
                                        <span>Strategic Adjustment</span>
                                    </div>
                                    {pricingSuggestions.map((s, i) => (
                                        <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center group hover:border-amber-200 transition-all">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h4 className="font-bold text-gray-800">{s.name}</h4>
                                                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase ${s.strategy === 'Surge' ? 'bg-red-100 text-red-600' :
                                                        s.strategy === 'HappyHour' ? 'bg-green-100 text-green-600' :
                                                            s.strategy === 'Margin' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'
                                                        }`}>
                                                        {s.strategy}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-gray-500 italic">{s.reason}</p>
                                            </div>
                                            <div className="text-right">
                                                <div className="flex items-center gap-2 justify-end">
                                                    <span className="text-sm text-gray-400 line-through">₹{s.currentPrice}</span>
                                                    <span className="text-xl font-black text-amber-600">₹{s.suggestedPrice}</span>
                                                </div>
                                                <div className={`text-[10px] font-bold ${s.suggestedPrice > s.currentPrice ? 'text-red-500' : 'text-green-500'}`}>
                                                    {s.suggestedPrice > s.currentPrice ? '+' : ''}{Math.round((s.suggestedPrice - s.currentPrice) / s.currentPrice * 100)}% Change
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="p-8 bg-white border-t flex justify-end gap-3">
                            <button onClick={() => setShowYieldModal(false)} className="px-6 py-3 text-gray-500 font-bold hover:text-gray-700">Cancel</button>
                            <button
                                onClick={handleApplyPricing}
                                disabled={isPricingLoading || pricingSuggestions.length === 0}
                                className="px-10 py-3 bg-amber-500 text-white font-black rounded-2xl shadow-lg shadow-amber-200 hover:bg-amber-600 transition-all disabled:opacity-50 flex items-center gap-2"
                            >
                                {isPricingLoading ? <span className="animate-spin text-xl">⚡</span> : '🚀'}
                                {isPricingLoading ? 'Applying...' : 'Apply Strategies'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
