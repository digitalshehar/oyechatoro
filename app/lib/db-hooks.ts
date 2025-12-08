'use client';

import { useState, useEffect, useCallback } from 'react';

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
    price: number;
    description?: string;
    veg: boolean;
    status: 'Active' | 'OutOfStock';
    image?: string;
    isDigitalMenu: boolean;
    isTrainMenu: boolean;
    isFeatured: boolean;
    costPrice?: number;
    categoryId: string;
    category?: MenuCategory;
}

export interface MenuCategory {
    id: string;
    name: string;
    items?: MenuItem[];
}

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt?: string;
    content: string;
    image?: string;
    author: string;
    category: string;
    tags: string[];
    seoTitle?: string;
    seoDescription?: string;
    readingTime?: string;
    status: 'Draft' | 'Published';
    isRecipe: boolean;
    featured: boolean;
    views: number;
    likes: number;
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
            const res = await fetch(`${API_BASE}/orders`);
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
        // Poll for updates every 5 seconds
        const interval = setInterval(fetchOrders, 5000);
        return () => clearInterval(interval);
    }, [fetchOrders]);

    const createOrder = async (orderData: Partial<Order>) => {
        const res = await fetch(`${API_BASE}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData),
        });
        if (!res.ok) throw new Error('Failed to create order');
        const newOrder = await res.json();
        setOrders(prev => [newOrder, ...prev]);
        return newOrder;
    };

    const updateOrderStatus = async (id: number, status: Order['status']) => {
        const res = await fetch(`${API_BASE}/orders/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
        });
        if (!res.ok) throw new Error('Failed to update order');
        const updatedOrder = await res.json();
        setOrders(prev => prev.map(o => o.id === id ? updatedOrder : o));
        return updatedOrder;
    };

    return { orders, loading, error, createOrder, updateOrderStatus, refetch: fetchOrders };
}

// ==================== CUSTOMERS API HOOKS ====================

export function useDbCustomers() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchCustomers = useCallback(async (search?: string) => {
        try {
            setLoading(true);
            const url = search ? `${API_BASE}/customers?search=${search}` : `${API_BASE}/customers`;
            const res = await fetch(url);
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
                fetch(`${API_BASE}/menu`),
                fetch(`${API_BASE}/menu/categories`),
            ]);
            if (!itemsRes.ok || !catsRes.ok) throw new Error('Failed to fetch menu');
            const [itemsData, catsData] = await Promise.all([
                itemsRes.json(),
                catsRes.json(),
            ]);
            setItems(itemsData);
            setCategories(catsData);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMenu();
    }, [fetchMenu]);

    return { items, categories, loading, refetch: fetchMenu };
}

// ==================== BLOG API HOOKS ====================

export function useDbBlog() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = useCallback(async (status?: string) => {
        try {
            setLoading(true);
            const url = status ? `${API_BASE}/blog?status=${status}` : `${API_BASE}/blog`;
            const res = await fetch(url);
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
        fetchPosts('Published');
    }, [fetchPosts]);

    const createPost = async (postData: Partial<BlogPost>) => {
        const res = await fetch(`${API_BASE}/blog`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData),
        });
        if (!res.ok) throw new Error('Failed to create post');
        const post = await res.json();
        fetchPosts('Published');
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
        fetchPosts('Published');
        return post;
    };

    const deletePost = async (id: string) => {
        const res = await fetch(`${API_BASE}/blog/${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error('Failed to delete post');
        fetchPosts('Published');
    };

    return { posts, loading, fetchPosts, createPost, updatePost, deletePost };
}
