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
        }).sort((a, b) => (a.order || 0) - (b.order || 0));
    }, [items, selectedCategory, searchTerm, activeTab]);

    // Handlers
    const handleSaveCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!catForm.name) {
            alert('Category name is required');
            return;
        }

        const newCategory: MenuCategory = {
            id: `cat_${Date.now()}`,
            name: catForm.name,
            order: categories.length
        };

        try {
            if (saveCategory) {
                await saveCategory(newCategory);
                setIsCatModalOpen(false);
                setCatForm({ name: '' });
            }
        } catch (error) {
            console.error('Failed to save category:', error);
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
            if (error.message && error.message.includes('has') && error.message.includes('items')) {
                if (confirm(`${error.message}\n\nDo you want to delete the category AND all its items?`)) {
                    await deleteCategory?.(id, true);
                }
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
            isDigitalMenu: itemForm.isDigitalMenu !== false,
            isTrainMenu: itemForm.isTrainMenu || false,
            isFeatured: itemForm.isFeatured || false,
            costPrice: Number(itemForm.costPrice) || 0,
            order: itemForm.order || filteredItems.length,
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
        if (!confirm(`Apply all ${pricingSuggestions.length} price changes?`)) return;
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
            if (data.url) setItemForm(prev => ({ ...prev, image: data.url }));
        } catch (error) {
            console.error('Upload error:', error);
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
            window.location.reload();
        } catch (error) {
            console.error(error);
        } finally {
            setIsBulkProcessing(false);
            setSelectedItems(new Set());
        }
    };

    const onDragEnd = async (result: DropResult) => {
        if (!result.destination) return;
        if (result.source.droppableId === 'items') {
            const reorderedData = reorder(
                filteredItems,
                result.source.index,
                result.destination.index
            );
            const updates = reorderedData.map((item: any, index: number) => ({
                id: item.id,
                order: index
            }));
            try {
                await fetch('/api/menu/reorder', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ type: 'item', items: updates })
                });
                window.location.reload();
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

            <TopSellingWidget />

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
                        </div>
                    </div>

                    <div className="flex-1 glass-card rounded-2xl p-4 md:p-6 flex flex-col overflow-hidden">
                        <DragDropContext onDragEnd={onDragEnd}>
                            {selectedCategory ? (
                                <>
                                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
                                        <div className="w-full lg:w-auto">
                                            <h1 className="text-xl md:text-3xl font-bold text-[var(--brand-dark)]">
                                                {selectedCategory.name}
                                            </h1>
                                        </div>
                                        <div className="flex flex-wrap gap-2 md:gap-4 items-center w-full lg:w-auto">
                                            {selectedItems.size > 0 && (
                                                <div className="flex gap-2 animate-in fade-in bg-yellow-50 px-3 py-1.5 rounded-xl border border-yellow-200">
                                                    <button onClick={() => handleBulkAction('updateStatus', 'OutOfStock')} className="text-[10px] font-bold text-red-600">🚫 Out</button>
                                                    <button onClick={() => handleBulkAction('updateStatus', 'Active')} className="text-[10px] font-bold text-green-600">✅ In</button>
                                                    <button onClick={() => handleBulkAction('delete')} className="text-[10px] font-bold text-gray-600">🗑️</button>
                                                </div>
                                            )}
                                            <input
                                                type="text"
                                                placeholder="Search..."
                                                className="px-4 py-2 text-sm border rounded-xl outline-none focus:border-[var(--brand-primary)] bg-white/80"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                            <button
                                                onClick={() => {
                                                    setEditingItem(null);
                                                    setItemForm({
                                                        categoryId: selectedCategory.id,
                                                        isTrainMenu: activeTab === 'train',
                                                        isDigitalMenu: activeTab !== 'train'
                                                    });
                                                    setIsItemModalOpen(true);
                                                }}
                                                className="px-4 py-2 bg-[var(--brand-primary)] text-white rounded-xl font-bold text-sm"
                                            >
                                                + Add Item
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                                        <Droppable droppableId="items">
                                            {(provided) => (
                                                <div {...provided.droppableProps} ref={provided.innerRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                                    {filteredItems.map((item, index) => (
                                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                                            {(provided) => (
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    className={`bg-white p-4 rounded-xl border transition-all flex gap-4 group relative ${selectedItems.has(item.id) ? 'border-[var(--brand-primary)] bg-blue-50' : 'border-gray-100 hover:shadow-md'}`}
                                                                >
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={selectedItems.has(item.id)}
                                                                        onChange={() => toggleSelection(item.id)}
                                                                        className="absolute top-4 left-4 z-10 w-5 h-5 rounded"
                                                                    />
                                                                    <div className="w-20 h-20 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 relative ml-8">
                                                                        {item.image ? (
                                                                            <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                                                                        ) : (
                                                                            <div className="w-full h-full flex items-center justify-center text-2xl">🥘</div>
                                                                        )}
                                                                    </div>
                                                                    <div className="flex-1 min-w-0">
                                                                        <h4 className="font-bold truncate">{item.name}</h4>
                                                                        <div className="flex justify-between items-center mt-2">
                                                                            <span className="font-bold">₹{item.price}</span>
                                                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                                <button onClick={() => openEditItem(item)} className="text-blue-500">✏️</button>
                                                                                <button onClick={() => handleDeleteItem(item.id)} className="text-red-500">🗑️</button>
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
                                    </div>
                                </>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                                    <p>Select a category to manage menu items</p>
                                </div>
                            )}
                        </DragDropContext>
                    </div>
                </div>
            )}

            {isItemModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
                        <h2 className="text-2xl font-bold mb-6">{editingItem ? 'Edit Item' : 'New Menu Item'}</h2>
                        <form onSubmit={handleSaveItem} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold mb-1">Name</label>
                                <input required className="w-full px-4 py-2 border rounded-xl" value={itemForm.name || ''} onChange={e => setItemForm({ ...itemForm, name: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold mb-1">Price</label>
                                    <input type="number" required className="w-full px-4 py-2 border rounded-xl" value={itemForm.price || 0} onChange={e => setItemForm({ ...itemForm, price: Number(e.target.value) })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1">Veg</label>
                                    <select className="w-full px-4 py-2 border rounded-xl" value={itemForm.veg ? 'true' : 'false'} onChange={e => setItemForm({ ...itemForm, veg: e.target.value === 'true' })}>
                                        <option value="true">Veg</option>
                                        <option value="false">Non-Veg</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button type="button" onClick={() => setIsItemModalOpen(false)} className="px-4 py-2 text-gray-500">Cancel</button>
                                <button type="submit" className="px-6 py-2 bg-[var(--brand-primary)] text-white rounded-xl font-bold">Save Item</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isCatModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4">Add Category</h2>
                        <form onSubmit={handleSaveCategory} className="space-y-4">
                            <input required className="w-full px-4 py-2 border rounded-xl" value={catForm.name} onChange={e => setCatForm({ ...catForm, name: e.target.value })} placeholder="Category Name" />
                            <div className="flex justify-end gap-3 mt-6">
                                <button type="button" onClick={() => setIsCatModalOpen(false)} className="px-4 py-2 text-gray-500">Cancel</button>
                                <button type="submit" className="px-6 py-2 bg-[var(--brand-primary)] text-white rounded-xl font-bold">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
