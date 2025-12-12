'use client';

import { useState, useEffect, useCallback } from 'react';
import { getSocket } from './socket';

// ==================== TYPES ====================

export interface Order {
    id: number;
    customer: string;
    items: any[];
    total: number;
    status: 'Pending' | 'Cooking' | 'Ready' | 'Completed' | 'Cancelled';
    type: 'DineIn' | 'Takeaway' | 'Delivery';
    table?: string;
    userId?: string;
    mobile?: string;
    paymentStatus: 'Paid' | 'Unpaid';
    paymentMethod?: 'Cash' | 'UPI' | 'Card' | 'Online';
    discount?: any;
    tip?: number;
    waiterName?: string;
    waiterCalled: boolean;
    dietary: string[];
    trainDetails?: any;
    cookingStartedAt?: string;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Customer {
    id: string;
    name: string;
    phone: string;
    email?: string;
    totalOrders: number;
    totalSpent: number;
    loyaltyPoints: number;
    lastVisit: string;
}

export interface MenuItem {
    id: string;
    name: string;
    slug: string;
    badge?: string;
    price: number;
    description?: string;
    veg: boolean;
    status: 'Active' | 'OutOfStock';
    image?: string;
    isDigitalMenu: boolean;
    isTrainMenu: boolean;
    isFeatured: boolean;
    modifiers?: { name: string; price: number; type?: 'one' | 'many'; options?: { name: string; price: number }[] }[];
    costPrice?: number;
    recipe?: { inventoryItemId: number; quantity: number }[];
    categoryId: string;
    category?: MenuCategory;
}

export interface MenuCategory {
    id: string;
    name: string;
    items?: MenuItem[];
}

export interface BlogCategory {
    id: string;
    name: string;
    slug: string;
    count?: number;
}

export interface BlogTag {
    id: string;
    name: string;
    slug: string;
}

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt?: string;
    content: string;
    image?: string;
    author: string;

    // Relations
    category?: BlogCategory;
    categoryId?: string;
    tags?: BlogTag[];

    seoTitle?: string;
    seoDescription?: string;
    readingTime?: string;
    status: 'Draft' | 'Published';
    isRecipe: boolean;
    featured: boolean;
    views: number;
    likes: number;
    createdAt: string;
    // UI Helpers or extended fields
    date?: string;
    recipeDetails?: {
        prepTime: string;
        cookTime: string;
        servings: string;
        calories: string;
        ingredients: string[];
    };
    canonicalUrl?: string;
}

export interface InventoryItem {
    id: number;
    name: string;
    unit: string;
    quantity: number; // mapped from currentStock by API
    minLevel: number; // mapped from lowStockAlert
    category: string;
    status: 'In Stock' | 'Low Stock' | 'Out of Stock';
    supplier?: {
        name: string;
        contact: string;
    } | null;
}

export interface StockLog {
    id: string;
    inventoryItemId: number;
    inventoryItem: { name: string; unit: string };
    change: number;
    type: 'CONSUMPTION' | 'RESTOCK' | 'WASTAGE' | 'ADJUSTMENT';
    reason?: string;
    createdAt: string;
}

// ==================== ORDERS API HOOKS ====================

const API_BASE = '/api';

export function useDbOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchOrders = useCallback(async () => {
        try {
            setLoading(true);
            const res = await fetch(`${API_BASE}/orders`, { cache: 'no-store' });
            if (!res.ok) throw new Error('Failed to fetch orders');
            const data = await res.json();
            setOrders(data);
            setError(null);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchOrders();
        // Socket.io subscription
        const socket = getSocket();

        const handleNewOrder = (order: Order) => {
            setOrders(prev => {
                if (prev.find(o => o.id === order.id)) return prev; // Prevent duplicates
                return [order, ...prev];
            });
        };

        const handleStatusUpdate = ({ orderId, status }: { orderId: number, status: Order['status'] }) => {
            setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
        };

        socket.on('order-received', handleNewOrder);
        socket.on('status-updated', handleStatusUpdate);

        // Keep polling as backup/sync, but less frequent (30s)
        const interval = setInterval(fetchOrders, 30000);

        return () => {
            clearInterval(interval);
            socket.off('order-received', handleNewOrder);
            socket.off('status-updated', handleStatusUpdate);
        };
    }, [fetchOrders]);

    const createOrder = async (orderData: Partial<Order>) => {
        const res = await fetch(`${API_BASE}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData),
        });
        if (!res.ok) throw new Error('Failed to create order');
        const newOrder = await res.json();

        // Optimistic update handled by socket or local set? 
        // We'll set it locally AND emit. Duplicate check in listener handles redundancy.
        setOrders(prev => [newOrder, ...prev]);

        // Broadcast to others
        const socket = getSocket();
        socket.emit('new-order', newOrder);

        return newOrder;
    };

    const updateOrder = async (id: number, updates: Partial<Order>) => {
        const res = await fetch(`${API_BASE}/orders/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates),
        });
        if (!res.ok) throw new Error('Failed to update order');
        const updatedOrder = await res.json();

        setOrders(prev => prev.map(o => o.id === id ? updatedOrder : o));

        if (updates.status) {
            const socket = getSocket();
            socket.emit('update-status', { orderId: id, status: updates.status });
        }

        return updatedOrder;
    };

    return { orders, loading, error, createOrder, updateOrder, refetch: fetchOrders };

}

// ==================== CUSTOMERS API HOOKS ====================

export function useDbCustomers() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchCustomers = useCallback(async (search?: string) => {
        try {
            setLoading(true);
            const url = search ? `${API_BASE}/customers?search=${search}` : `${API_BASE}/customers`;
            const res = await fetch(url, { cache: 'no-store' });
            if (!res.ok) throw new Error('Failed to fetch customers');
            const data = await res.json();
            setCustomers(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCustomers();
    }, [fetchCustomers]);

    const upsertCustomer = async (customerData: Partial<Customer> & { phone: string }) => {
        const res = await fetch(`${API_BASE}/customers`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customerData),
        });
        if (!res.ok) throw new Error('Failed to save customer');
        const customer = await res.json();
        fetchCustomers();
        return customer;
    };

    return { customers, loading, fetchCustomers, upsertCustomer };
}

// ==================== MENU API HOOKS ====================

export function useDbMenu() {
    const [items, setItems] = useState<MenuItem[]>([]);
    const [categories, setCategories] = useState<MenuCategory[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchMenu = useCallback(async () => {
        try {
            setLoading(true);
            const [itemsRes, catsRes] = await Promise.all([
                fetch(`${API_BASE}/menu`, { cache: 'no-store' }),
                fetch(`${API_BASE}/menu/categories`, { cache: 'no-store' }),
            ]);
            if (!itemsRes.ok || !catsRes.ok) throw new Error('Failed to fetch menu');
            const [itemsData, catsData] = await Promise.all([
                itemsRes.json(),
                catsRes.json(),
            ]);
            setItems(Array.isArray(itemsData) ? itemsData : []);
            setCategories(Array.isArray(catsData) ? catsData : []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMenu();
    }, [fetchMenu]);

    const saveItem = async (item: MenuItem) => {
        // Check if item exists (by id check against existing items, or just try update if id isn't generic new one)
        const isNew = item.id.startsWith('item_') && !items.find(i => i.id === item.id);

        let res;
        if (isNew) {
            // Create
            res = await fetch(`${API_BASE}/menu`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item),
            });
        } else {
            // Update
            res = await fetch(`${API_BASE}/menu/${item.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item),
            });
        }

        if (!res.ok) throw new Error('Failed to save item');
        fetchMenu();
    };

    const deleteItem = async (id: string) => {
        const res = await fetch(`${API_BASE}/menu/${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error('Failed to delete item');
        fetchMenu();
    };

    const saveCategory = async (category: MenuCategory) => {
        // Only CREATE supported for now based on original UI logic, but let's make it generic if needed
        const res = await fetch(`${API_BASE}/menu/categories`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(category),
        });
        if (!res.ok) throw new Error('Failed to save category');
        fetchMenu();
    };

    const deleteCategory = async (id: string) => {
        const res = await fetch(`${API_BASE}/menu/categories/${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error('Failed to delete category');
        fetchMenu();
    };

    return { items, categories, loading, refetch: fetchMenu, saveItem, deleteItem, saveCategory, deleteCategory };
}

// ==================== BLOG API HOOKS ====================



export function useDbBlog() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    // Maintain local state for categories/tags that might be created but not yet used in a post
    const [extraCategories, setExtraCategories] = useState<string[]>([]);
    const [extraTags, setExtraTags] = useState<string[]>([]);

    const fetchPosts = useCallback(async (status?: string) => {
        try {
            setLoading(true);
            const url = status ? `${API_BASE}/blog?status=${status}` : `${API_BASE}/blog`;
            const res = await fetch(url, { cache: 'no-store' });
            if (!res.ok) throw new Error('Failed to fetch posts');
            const data = await res.json();
            setPosts(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPosts(); // Fetch all posts regardless of status for correct counts
    }, [fetchPosts]);

    const createPost = async (postData: Partial<BlogPost>) => {
        const res = await fetch(`${API_BASE}/blog`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData),
        });
        if (!res.ok) throw new Error('Failed to create post');
        const post = await res.json();
        fetchPosts();
        return post;
    };

    const updatePost = async (id: string, postData: Partial<BlogPost>) => {
        const res = await fetch(`${API_BASE}/blog/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData),
        });
        if (!res.ok) throw new Error('Failed to update post');
        const post = await res.json();
        fetchPosts();
        return post;
    };

    const deletePost = async (id: string) => {
        const res = await fetch(`${API_BASE}/blog/${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error('Failed to delete post');
        fetchPosts();
    };

    // --- Categories & Tags Management ---

    // Fetch function for categories
    const fetchCategories = useCallback(async () => {
        try {
            const res = await fetch(`${API_BASE}/blog/categories`, { cache: 'no-store' });
            if (res.ok) {
                const data = await res.json();
                // Map to UI format
                const cats: BlogCategory[] = data.map((c: any) => ({
                    id: c.id,
                    name: c.name,
                    slug: c.slug,
                    count: posts.filter(p => p.category?.name === c.name).length
                }));

                const dbNames = cats.map(c => c.name);
                posts.forEach(p => {
                    if (p.category?.name && !dbNames.includes(p.category.name)) {
                        cats.push({
                            id: p.category.id,
                            name: p.category.name,
                            slug: p.category.slug || p.category.name.toLowerCase().replace(/\s+/g, '-'),
                            count: 1
                        });
                        dbNames.push(p.category.name);
                    }
                });

                setProcessedCategories(cats);
            }
        } catch (e) {
            console.error(e);
        }
    }, [posts]);

    // Fetch tags
    const fetchTags = useCallback(async () => {
        try {
            const res = await fetch(`${API_BASE}/blog/tags`, { cache: 'no-store' });
            if (res.ok) {
                const data = await res.json();
                setProcessedTags(data);
            }
        } catch (e) {
            console.error(e);
        }
    }, []);

    // State for processed data
    const [processedCategories, setProcessedCategories] = useState<BlogCategory[]>([]);
    const [processedTags, setProcessedTags] = useState<BlogTag[]>([]);

    useEffect(() => {
        fetchCategories();
        fetchTags();
    }, [fetchCategories, fetchTags]);


    const saveCategory = async (cat: any) => {
        const res = await fetch(`${API_BASE}/blog/categories`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cat),
        });
        if (!res.ok) throw new Error('Failed to save category');
        fetchCategories();
    };

    const deleteCategory = async (id: string) => {
        const res = await fetch(`${API_BASE}/blog/categories/${id}`, { method: 'DELETE' });
        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error || 'Failed to delete category');
        }
        fetchCategories();
    };

    const deleteTag = async (id: string) => {
        const res = await fetch(`${API_BASE}/blog/tags/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete tag');
        fetchTags();
    };

    const saveTag = async (tag: any) => {
        const res = await fetch(`${API_BASE}/blog/tags`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tag),
        });
        if (!res.ok) throw new Error('Failed to save tag');
        fetchTags();
    };

    const savePost = async (post: any) => {
        if (post.id && !post.id.startsWith('new_') && post.id.length > 20) { // Check if ID is likely a real DB ID (CUID/UUID)
            await updatePost(post.id, post);
        } else {
            const { id, ...data } = post; // Remove temp ID
            await createPost(data);
        }
    };

    return { posts, categories: processedCategories, tags: processedTags, loading, fetchPosts, createPost, updatePost, deletePost, saveCategory, deleteCategory, deleteTag, saveTag, savePost };
}

// ==================== AUDIT API HOOKS ====================

export interface AuditLog {
    id: string;
    timestamp: string;
    action: string;
    entity: string;
    entityId?: string;
    userId?: string;
    details?: any;
    ipAddress?: string;
}

export function useDbAudit() {
    const [logs, setLogs] = useState<AuditLog[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchLogs = useCallback(async (limit = 100) => {
        try {
            setLoading(true);
            const res = await fetch(`${API_BASE}/audit?limit=${limit}`);
            if (!res.ok) throw new Error('Failed to fetch audit logs');
            const data = await res.json();
            setLogs(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchLogs();
    }, [fetchLogs]);

    return { logs, loading, fetchLogs };
}

// ==================== INVENTORY API HOOKS ====================

export function useDbInventory() {
    const [inventory, setInventory] = useState<InventoryItem[]>([]);
    const [stockLogs, setStockLogs] = useState<StockLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchInventory = useCallback(async () => {
        setLoading(true);
        try {
            const [invRes, logsRes] = await Promise.all([
                fetch(`${API_BASE}/inventory`, { cache: 'no-store' }),
                fetch(`${API_BASE}/inventory/logs`, { cache: 'no-store' })
            ]);

            if (invRes.ok && logsRes.ok) {
                const invData = await invRes.json();
                const logsData = await logsRes.json();
                setInventory(invData);
                setStockLogs(logsData);
            } else {
                setError('Failed to fetch inventory data');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchInventory();
    }, []);

    const addItem = async (itemData: any) => {
        try {
            const res = await fetch(`${API_BASE}/inventory`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(itemData),
            });
            if (res.ok) {
                fetchInventory();
                return true;
            }
            return false;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const updateItem = async (id: number, updates: any) => {
        try {
            const res = await fetch(`${API_BASE}/inventory/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates),
            });
            if (res.ok) {
                fetchInventory();
                return true;
            }
            return false;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const deleteItem = async (id: number) => {
        try {
            const res = await fetch(`${API_BASE}/inventory/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                fetchInventory();
                return true;
            }
            return false;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    // Wastage Logic
    const recordWastage = async (id: number, qty: number, reason: string) => {
        try {
            const res = await fetch(`${API_BASE}/inventory/wastage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ itemId: id, quantity: qty, reason })
            });

            if (res.ok) {
                fetchInventory(); // Refresh both stock and logs
                return true;
            }
        } catch (error) {
            console.error(error);
        }
        return false;
    };

    // Derived state for backward compatibility if UI uses wastageLogs specifically
    const wastageLogs = stockLogs.filter(l => l.type === 'WASTAGE');

    return { inventory, loading, error, addItem, updateItem, deleteItem, stockLogs, wastageLogs, recordWastage, refetch: fetchInventory };
}

// ==================== ANALYTICS API HOOKS ====================

export function useDbAnalytics(period: string) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${API_BASE}/analytics?period=${period}`, { cache: 'no-store' });
                if (res.ok) {
                    const json = await res.json();
                    setData(json);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [period]);

    return { data, loading };
}

// ==================== FINANCE & SETTINGS HOOKS ====================

export interface Expense {
    id: string;
    date: Date;
    category: string;
    description: string | null;
    amount: number;
}

export function useDbFinance(date?: string) {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchExpenses = async () => {
        setLoading(true);
        try {
            const url = date ? `${API_BASE}/finance/expenses?date=${date}` : `${API_BASE}/finance/expenses`;
            const res = await fetch(url, { cache: 'no-store' });
            if (res.ok) {
                const json = await res.json();
                setExpenses(json);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, [date]);

    const addExpense = async (data: any) => {
        try {
            const res = await fetch(`${API_BASE}/finance/expenses`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (res.ok) {
                fetchExpenses();
                return true;
            }
        } catch (e) {
            console.error(e);
        }
        return false;
    };

    const deleteExpense = async (id: string) => {
        try {
            const res = await fetch(`${API_BASE}/finance/expenses/${id}`, { method: 'DELETE' });
            if (res.ok) {
                fetchExpenses();
                return true;
            }
        } catch (e) {
            console.error(e);
        }
        return false;
    };

    return { expenses, loading, addExpense, deleteExpense, refetch: fetchExpenses };
}

export function useDbSettings() {
    const [settings, setSettings] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchSettings = async () => {
        try {
            const res = await fetch(`${API_BASE}/settings`, { cache: 'no-store' });
            if (res.ok) {
                const json = await res.json();
                setSettings(json);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    const updateSettings = async (newSettings: any) => {
        try {
            const res = await fetch(`${API_BASE}/settings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newSettings)
            });
            if (res.ok) {
                setSettings(newSettings); // Optimistic update
                fetchSettings(); // Confirm
                return true;
            }
        } catch (e) {
            console.error(e);
        }
        return false;
    };

    return { settings, loading, updateSettings };
}

// ==================== STAFF HOOK ====================

export interface StaffUser {
    id: string;
    name: string;
    email: string;
    phone?: string;
    role: 'Admin' | 'Manager' | 'Staff' | 'Chef';
    active: boolean;
    createdAt?: string;
}

export function useDbStaff() {
    const [users, setUsers] = useState<StaffUser[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const res = await fetch(`${API_BASE}/staff`, { cache: 'no-store' });
            if (res.ok) {
                const json = await res.json();
                setUsers(json);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const addUser = async (data: any) => {
        try {
            const res = await fetch(`${API_BASE}/staff`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (res.ok) {
                fetchUsers();
                return { success: true };
            }
            const error = await res.json();
            return { success: false, error: error.error || 'Failed to add user' };
        } catch (e) {
            return { success: false, error: 'Network error' };
        }
    };

    const deleteUser = async (id: string) => {
        try {
            const res = await fetch(`${API_BASE}/staff/${id}`, { method: 'DELETE' });
            if (res.ok) {
                fetchUsers();
                return true;
            }
        } catch (e) {
            console.error(e);
        }
        return false;
    };

    const updateUser = async (id: string, data: any) => {
        try {
            const res = await fetch(`${API_BASE}/staff/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (res.ok) {
                fetchUsers();
                return { success: true };
            }
            const error = await res.json();
            return { success: false, error: error.error || 'Failed to update user' };
        } catch (e) {
            return { success: false, error: 'Network error' };
        }
    };

    return { users, loading, addUser, deleteUser, updateUser };
}

// ==================== OFFERS HOOK ====================

export interface DbOffer {
    id: string;
    code: string;
    discount: string;
    type: 'Percentage' | 'Flat' | 'Free Item';
    expiry: Date | string;
    status: 'Active' | 'Inactive';
    usage: number;
    description?: string;
    bgColor?: string;
}

export function useDbOffers() {
    const [offers, setOffers] = useState<DbOffer[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchOffers = async () => {
        try {
            const res = await fetch(`${API_BASE}/offers`, { cache: 'no-store' });
            if (res.ok) {
                const json = await res.json();
                setOffers(json.map((o: any) => ({
                    ...o,
                    expiry: new Date(o.expiry).toISOString().split('T')[0] // Format for UI
                })));
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOffers();
    }, []);

    const saveOffer = async (data: any) => {
        try {
            // Need to distinguish create vs update later if we add update
            // For now just create
            const res = await fetch(`${API_BASE}/offers`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (res.ok) {
                fetchOffers();
                return true;
            }
        } catch (e) {
            console.error(e);
        }
        return false;
    };

    const deleteOffer = async (id: string) => {
        try {
            const res = await fetch(`${API_BASE}/offers/${id}`, { method: 'DELETE' });
            if (res.ok) {
                fetchOffers();
                return true;
            }
        } catch (e) {
            console.error(e);
        }
        return false;
    };

    // Alias saveOffer to match old hook if needed, or just expose it
    return { offers, loading, saveOffer, deleteOffer };
}

// ==================== SERVICE REQUESTS HOOK ====================

export interface ServiceRequest {
    id: string;
    type: string;
    table: string;
    status: 'Pending' | 'Completed';
    createdAt: string;
}

export function useDbServiceRequests() {
    const [requests, setRequests] = useState<ServiceRequest[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchRequests = useCallback(async () => {
        try {
            const res = await fetch(`${API_BASE}/service-requests`, { cache: 'no-store' });
            if (res.ok) {
                const json = await res.json();
                setRequests(json);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchRequests();
    }, [fetchRequests]);

    const addServiceRequest = async (request: { type: string; table: string }) => {
        try {
            const res = await fetch(`${API_BASE}/service-requests`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(request)
            });
            if (!res.ok) throw new Error('Failed');
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    };

    const completeRequest = async (id: string) => {
        try {
            const res = await fetch(`${API_BASE}/service-requests/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'Completed' })
            });
            if (res.ok) {
                setRequests(prev => prev.filter(r => r.id !== id));
                return true;
            }
        } catch (e) {
            console.error(e);
        }
        return false;
    };

    return { requests, loading, addServiceRequest, completeRequest, refresh: fetchRequests };
}

export const addServiceRequest = async (request: { type: string; table: string }) => {
    try {
        const res = await fetch(`${API_BASE}/service-requests`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        });
        return res.ok;
    } catch (e) {
        return false;
    }
};

// ==================== CUSTOMER HOOK ====================
export function useDbCustomer() {
    const [customer, setCustomer] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchCustomer = async () => {
        try {
            const res = await fetch(`${API_BASE}/customers/me`);
            if (res.ok) {
                const data = await res.json();
                setCustomer(data);
            } else {
                setCustomer(null);
            }
        } catch (e) {
            setCustomer(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomer();
    }, []);

    const updateUser = async (data: any) => {
        try {
            const res = await fetch(`${API_BASE}/customers/me`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (res.ok) {
                const updated = await res.json();
                setCustomer(updated);
            }
        } catch (e) {
            console.error(e);
        }
    };

    return { user: customer, loading, updateUser, fetchCustomer };
}


// ==================== CART API HOOKS ====================

export interface CartItem {
    id: string;
    cartId: string;
    menuItemId: string;
    name: string;
    price: number;
    quantity: number;
    options?: any;
    image?: string;
    menuItem?: MenuItem;
}

export function useDbCart() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchCart = useCallback(async () => {
        try {
            setLoading(true);
            const res = await fetch(`${API_BASE}/cart`, { cache: 'no-store' });
            if (res.ok) {
                const data = await res.json();
                setCart(data.items || []);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const addToCart = async (item: { menuItemId: string; quantity?: number; options?: any }) => {
        try {
            const res = await fetch(`${API_BASE}/cart`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item)
            });
            if (res.ok) {
                const updatedCart = await res.json();
                setCart(updatedCart.items || []);
                return true;
            }
        } catch (e) {
            console.error(e);
        }
        return false;
    };

    const updateQuantity = async (itemId: string, quantity: number) => {
        try {
            const res = await fetch(`${API_BASE}/cart/items/${itemId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ quantity })
            });
            if (res.ok) {
                // Optimistic update or refetch
                setCart(prev => prev.map(item => item.id === itemId ? { ...item, quantity } : item));
                if (quantity < 1) {
                    setCart(prev => prev.filter(item => item.id !== itemId));
                }
                return true;
            }
        } catch (e) {
            console.error(e);
        }
        return false;
    };

    const removeFromCart = async (itemId: string) => {
        try {
            const res = await fetch(`${API_BASE}/cart/items/${itemId}`, { method: 'DELETE' });
            if (res.ok) {
                setCart(prev => prev.filter(item => item.id !== itemId));
                return true;
            }
        } catch (e) {
            console.error(e);
        }
        return false;
    };

    const clearCart = async () => {
        try {
            const res = await fetch(`${API_BASE}/cart`, { method: 'DELETE' });
            if (res.ok) {
                setCart([]);
                return true;
            }
        } catch (e) {
            console.error(e);
        }
        return false;
    };

    return { cart, loading, addToCart, updateQuantity, removeFromCart, clearCart, refetch: fetchCart };
}
