'use client';

import { useState, useEffect } from 'react';
import { getSocket } from './socket';

// --- ORDER SYSTEM ---

export interface Order {
    id: number;
    customer: string;
    items: string[];
    total: number;
    status: 'Pending' | 'Cooking' | 'Ready' | 'Completed' | 'Cancelled';
    time: string;
    type: 'Dine-in' | 'Takeaway' | 'Delivery';
    table?: string;
    userId?: string;
    cookingStartedAt?: number;
    createdAt?: number;
    paymentStatus?: 'Paid' | 'Unpaid';
    paymentMethod?: 'Cash' | 'UPI' | 'Card' | 'Online';
    mobile?: string;
    discount?: {
        type: 'amount' | 'percent';
        value: number;
        amount: number;
    };
    tip?: number;
    waiterCalled?: boolean;
    waiterName?: string;
    dietary?: string[]; // e.g. ['veg', 'spicy', 'nut-allergy']
    trainDetails?: {
        pnr: string;
        trainNo: string;
        coachSeat: string;
    };
}

export interface PrepItem {
    id: number;
    task: string;
    completed: boolean;
    station: string;
}

const INITIAL_ORDERS: Order[] = [
    {
        id: 1006,
        customer: 'Rajesh Kumar',
        items: ['Standard Veg Thali (2)', 'Sweet Lassi (2)'],
        total: 640,
        status: 'Pending',
        time: 'Just now',
        type: 'Delivery',
        createdAt: Date.now(),
        paymentStatus: 'Unpaid',
        paymentMethod: 'Cash',
        trainDetails: {
            pnr: '1234567890',
            trainNo: '12956',
            coachSeat: 'B2-45'
        }
    },
    {
        id: 1001,
        customer: 'Rahul Sharma',
        items: ['Classic Margherita (1)', 'Coke (2)'],
        total: 299,
        status: 'Pending',
        time: '10 mins ago',
        type: 'Dine-in',
        table: 'T-4',
        createdAt: Date.now() - 10 * 60000,
        waiterName: 'Rahul',
        dietary: ['veg', 'spicy']
    },
    {
        id: 1002,
        customer: 'Priya Singh',
        items: ['Paneer Tikka Pizza (1)', 'White Sauce Pasta (1)'],
        total: 398,
        status: 'Cooking',
        time: '25 mins ago',
        type: 'Dine-in',
        table: 'T-2',
        createdAt: Date.now() - 25 * 60000,
        waiterName: 'Amit',
        dietary: ['veg']
    },
    {
        id: 1003,
        customer: 'Amit Patel',
        items: ['Dahi Papdi Chaat (2)'],
        total: 98,
        status: 'Completed',
        time: '45 mins ago',
        type: 'Takeaway',
        createdAt: Date.now() - 45 * 60000
    },
    {
        id: 1004,
        customer: 'Sneha Gupta',
        items: ['Veggie Supreme (1)', 'Garlic Bread (1)'],
        total: 349,
        status: 'Ready',
        time: '1 hour ago',
        type: 'Delivery',
        createdAt: Date.now() - 60 * 60000
    },
    {
        id: 1005,
        customer: 'Vikram Malhotra',
        items: ['Makhani Paneer Supreme (1)'],
        total: 279,
        status: 'Cancelled',
        time: '2 hours ago',
        type: 'Dine-in',
        table: 'T-8',
        createdAt: Date.now() - 120 * 60000
    },
];

export const INITIAL_PREP_LIST: PrepItem[] = [
    { id: 1, task: 'Chop Onions', completed: false, station: 'Vegetable Prep' },
    { id: 2, task: 'Marinate Paneer', completed: false, station: 'Tandoor' },
    { id: 3, task: 'Prepare Pizza Dough', completed: true, station: 'Pizza Station' },
    { id: 4, task: 'Chop Coriander', completed: false, station: 'Vegetable Prep' },
    { id: 5, task: 'Check Gas Levels', completed: false, station: 'Safety' },
];

const STORAGE_KEY = 'oye_chatoro_orders';

export const getOrders = (): Order[] => {
    if (typeof window === 'undefined') return INITIAL_ORDERS;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ORDERS));
        return INITIAL_ORDERS;
    }
    return JSON.parse(stored);
};

export const updateOrderStatus = (orderId: number, newStatus: Order['status']) => {
    const orders = getOrders();
    const updatedOrders = orders.map(order => {
        if (order.id === orderId) {
            const updates: Partial<Order> = { status: newStatus };
            if (newStatus === 'Cooking' && !order.cookingStartedAt) {
                updates.cookingStartedAt = Date.now();
            }
            return { ...order, ...updates };
        }
        return order;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedOrders));
    // Dispatch a custom event to notify other components/tabs
    window.dispatchEvent(new Event('ordersUpdated'));

    // Emit socket event
    const socket = getSocket();
    socket.emit('update-status', { orderId, status: newStatus });
};

export const toggleWaiterCall = (orderId: number, isCalled: boolean) => {
    const orders = getOrders();
    const updatedOrders = orders.map(order =>
        order.id === orderId ? { ...order, waiterCalled: isCalled } : order
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedOrders));
    window.dispatchEvent(new Event('ordersUpdated'));

    const socket = getSocket();
    socket.emit('waiter-call', { orderId, isCalled });
};

export const updatePaymentStatus = (orderId: number, paymentStatus: 'Paid' | 'Unpaid') => {
    const orders = getOrders();
    const updatedOrders = orders.map(order =>
        order.id === orderId ? { ...order, paymentStatus } : order
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedOrders));
    window.dispatchEvent(new Event('ordersUpdated'));

    const socket = getSocket();
    socket.emit('payment-updated', { orderId, paymentStatus });
};

export const updatePaymentMethod = (orderId: number, paymentMethod: 'Cash' | 'UPI' | 'Online' | 'Card') => {
    const orders = getOrders();
    const updatedOrders = orders.map(order =>
        order.id === orderId ? { ...order, paymentMethod } : order
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedOrders));
    window.dispatchEvent(new Event('ordersUpdated'));

    const socket = getSocket();
    socket.emit('payment-method-updated', { orderId, paymentMethod });
};
export const createOrder = (orderData: Omit<Order, 'id' | 'status' | 'time'>) => {
    const orders = getOrders();
    const newOrder: Order = {
        id: Math.floor(1000 + Math.random() * 9000), // Random 4-digit ID
        ...orderData,
        status: 'Pending',
        time: 'Just now',
        createdAt: Date.now(),
        paymentStatus: orderData.paymentStatus || 'Unpaid',
        paymentMethod: orderData.paymentMethod || 'Online',
        mobile: orderData.mobile,
        tip: orderData.tip
    };

    const updatedOrders = [newOrder, ...orders];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedOrders));
    window.dispatchEvent(new Event('ordersUpdated'));

    // Deduct Stock
    deductStockForOrder(newOrder.items);

    // Update Customer Loyalty
    const customers = getCustomers();
    // Try to find by phone if available, else name
    let customer = customers.find(c =>
        (newOrder.mobile && c.phone === newOrder.mobile) ||
        (!newOrder.mobile && c.name.toLowerCase() === newOrder.customer.toLowerCase())
    );

    if (customer) {
        const pointsEarned = Math.floor(newOrder.total / 100); // 1 point per 100
        customer = {
            ...customer,
            totalOrders: customer.totalOrders + 1,
            totalSpent: customer.totalSpent + newOrder.total,
            loyaltyPoints: customer.loyaltyPoints + pointsEarned,
            lastVisit: new Date().toISOString()
        };
        saveCustomer(customer);
    } else if (newOrder.mobile) {
        // Create new customer only if mobile is provided (reliable ID)
        const newCustomer: Customer = {
            id: `cust_${Date.now()}`,
            name: newOrder.customer,
            phone: newOrder.mobile,
            totalOrders: 1,
            totalSpent: newOrder.total,
            loyaltyPoints: Math.floor(newOrder.total / 100),
            lastVisit: new Date().toISOString()
        };
        saveCustomer(newCustomer);
    }

    // Emit socket event
    const socket = getSocket();
    socket.emit('new-order', newOrder);

    return newOrder;
};

export const getDailyStats = () => {
    const orders = getOrders();
    const today = new Date().toDateString();

    const todayOrders = orders.filter(order => {
        return new Date(order.createdAt || Date.now()).toDateString() === today;
    });

    const totalOrders = todayOrders.length;
    const totalSales = todayOrders.reduce((sum, order) => sum + order.total, 0);
    const cashSales = todayOrders.filter(o => o.paymentMethod === 'Cash').reduce((sum, order) => sum + order.total, 0);
    const onlineSales = todayOrders.filter(o => o.paymentMethod === 'Online' || o.paymentMethod === 'UPI' || o.paymentMethod === 'Card').reduce((sum, order) => sum + order.total, 0);

    return {
        totalOrders,
        totalSales,
        cashSales,
        onlineSales
    };
};

export const useOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        // Initial load
        setOrders(getOrders());

        // Listen for updates
        const handleStorageChange = () => {
            setOrders(getOrders());
        };

        window.addEventListener('ordersUpdated', handleStorageChange);
        window.addEventListener('storage', handleStorageChange); // For cross-tab sync

        // Socket listeners
        const socket = getSocket();

        socket.on('order-received', (newOrder: Order) => {
            // Update local storage to reflect the new order from another device
            const currentOrders = getOrders();
            // Avoid duplicates
            if (!currentOrders.find(o => o.id === newOrder.id)) {
                const updated = [newOrder, ...currentOrders];
                localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
                setOrders(updated);
            }
        });

        socket.on('status-updated', ({ orderId, status }: { orderId: number, status: Order['status'] }) => {
            const currentOrders = getOrders();
            const updated = currentOrders.map(o => o.id === orderId ? { ...o, status } : o);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            setOrders(updated);
        });

        return () => {
            window.removeEventListener('ordersUpdated', handleStorageChange);
            window.removeEventListener('storage', handleStorageChange);
            socket.off('order-received');
            socket.off('status-updated');
        };
    }, []);

    return { orders, updateStatus: updateOrderStatus, createOrder, toggleWaiterCall };
};

export function usePrepList() {
    const [prepList, setPrepList] = useState<PrepItem[]>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('prepList');
            return saved ? JSON.parse(saved) : INITIAL_PREP_LIST;
        }
        return INITIAL_PREP_LIST;
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('prepList', JSON.stringify(prepList));
        }
    }, [prepList]);

    const togglePrepItem = (id: number) => {
        setPrepList(prev => prev.map(item =>
            item.id === id ? { ...item, completed: !item.completed } : item
        ));
    };

    const resetPrepList = () => {
        setPrepList(INITIAL_PREP_LIST.map(item => ({ ...item, completed: false })));
    };

    return { prepList, togglePrepItem, resetPrepList };
}

// --- BLOG SYSTEM ---

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image: string;
    date: string;
    author: string;
    category: string;
    tags: string[];
    seoTitle?: string;
    seoDescription?: string;
    readingTime?: string;
    servings?: string;
    calories?: string;
    ingredients?: string[];
    status?: 'Draft' | 'Published';
    isRecipe?: boolean;
    views?: number;
    likes?: number;
    canonicalUrl?: string;
    featured?: boolean;
    recipeDetails?: {
        prepTime?: string;
        cookTime?: string;
        servings?: string;
        difficulty?: string;
        ingredients?: string[];
        calories?: string;
    };
}

export interface BlogCategory {
    id: string;
    name: string;
    slug: string;
    count: number;
}

export interface BlogTag {
    id: string;
    name: string;
    slug: string;
}

const BLOG_STORAGE_KEY = 'oye_chatoro_blog_posts';

const INITIAL_POSTS: BlogPost[] = [
    {
        id: '1',
        title: 'Welcome to Oye Chatoro!',
        slug: 'welcome-to-oye-chatoro',
        excerpt: 'We are excited to announce the grand opening of our new outlet in Abu Road.',
        content: 'Welcome to Oye Chatoro! We are thrilled to bring the authentic flavors of street food to Abu Road. Our mission is to serve happiness on every plate with our fresh ingredients and live kitchen concept. Come visit us and try our famous Paneer Tikka Pizza and refreshing beverages.',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
        date: new Date().toLocaleDateString(),
        author: 'Admin',
        category: 'News',
        tags: ['Grand Opening', 'Abu Road', 'Street Food'],
        seoTitle: 'Welcome to Oye Chatoro - Best Street Food in Abu Road',
        seoDescription: 'Oye Chatoro is now open in Abu Road! Experience authentic street food, live kitchen, and fresh ingredients. Visit us today.',
        readingTime: '2 min read',
        status: 'Published',
        featured: true
    },
    {
        id: '2',
        title: 'Top 5 Must-Try Dishes',
        slug: 'top-5-must-try-dishes',
        excerpt: 'Discover the customer favorites that you absolutely cannot miss.',
        content: '1. **Paneer Tikka Pizza**: A fusion delight.\n2. **White Sauce Pasta**: Creamy and delicious.\n3. **Dahi Papdi Chaat**: The perfect balance of sweet and tangy.\n4. **Veggie Supreme**: Loaded with fresh veggies.\n5. **Masala Chai**: The perfect end to your meal.',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
        date: new Date(Date.now() - 86400000).toLocaleDateString(),
        author: 'Chef',
        category: 'Food Guide',
        tags: ['Pizza', 'Pasta', 'Chaat', 'Recommendations'],
        seoTitle: 'Top 5 Must-Try Dishes at Oye Chatoro',
        seoDescription: 'From Paneer Tikka Pizza to Dahi Papdi Chaat, discover the top 5 dishes you must try at Oye Chatoro Abu Road.',
        readingTime: '3 min read',
        status: 'Published'
    },
    {
        id: '3',
        title: 'Best Restaurant in Abu Road - Why Oye Chatoro Stands Out',
        slug: 'best-restaurant-in-abu-road',
        excerpt: 'Looking for the best restaurant in Abu Road? Discover why Oye Chatoro is the top choice for vegetarian food lovers near Mount Abu.',
        content: '## Best Restaurant in Abu Road\n\nWhen it comes to finding a great restaurant in Abu Road, Oye Chatoro stands out as the premier destination for food lovers. Located in Abu Central Mall, we offer a unique dining experience.\n\n### Why Choose Oye Chatoro?\n\n1. **100% Pure Vegetarian**\n2. **Live Kitchen**\n3. **Near Mount Abu**\n4. **AC Dining**\n5. **FSSAI Licensed**\n\nVisit us today and experience why we are rated as the best restaurant in Abu Road!',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
        date: new Date(Date.now() - 172800000).toLocaleDateString(),
        author: 'Admin',
        category: 'About Us',
        tags: ['Restaurant in Abu Road', 'Best Restaurant', 'Mount Abu', 'Pure Veg'],
        seoTitle: 'Best Restaurant in Abu Road | Oye Chatoro - Pure Veg Food',
        seoDescription: 'Looking for the best restaurant in Abu Road? Oye Chatoro offers 100% pure vegetarian food, pizzas, pastas, chaats near Mount Abu. FSSAI Licensed.',
        readingTime: '4 min read',
        status: 'Published',
        featured: true
    },
    {
        id: '4',
        title: 'Complete Food Guide: What to Eat in Abu Road',
        slug: 'food-guide-what-to-eat-abu-road',
        excerpt: 'A complete guide to the best food options in Abu Road, Rajasthan.',
        content: '## Food Guide: Abu Road\n\nAbu Road, the gateway to Mount Abu, has become a growing food destination in Rajasthan.\n\n### Best Restaurants\n\n**Oye Chatoro** - Location: Abu Central Mall, G-5\n\n### Popular Food Items\n\n1. **Pizza** - Fresh, wood-fire style\n2. **Chaat** - Authentic North Indian flavors\n3. **Pasta** - Creamy options\n4. **Burgers** - Loaded veggie burgers\n5. **Momos** - Steamed and fried varieties',
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
        date: new Date(Date.now() - 259200000).toLocaleDateString(),
        author: 'Food Blogger',
        category: 'Food Guide',
        tags: ['Abu Road Food', 'Mount Abu', 'Food Guide'],
        seoTitle: 'Food Guide Abu Road | Best Places to Eat Near Mount Abu',
        seoDescription: 'Complete food guide for Abu Road, Rajasthan. Discover the best restaurants near Mount Abu.',
        readingTime: '5 min read',
        status: 'Published'
    },
    {
        id: '5',
        title: 'Oye Chatoro - Your Family Restaurant in Abu Road',
        slug: 'family-restaurant-abu-road',
        excerpt: 'Looking for a family-friendly restaurant in Abu Road? Oye Chatoro offers the perfect dining experience.',
        content: '## Family Restaurant in Abu Road\n\nPlanning a family outing? Oye Chatoro is the perfect destination.\n\n### Why Families Love Us\n\n1. **Kid-Friendly Menu**\n2. **AC Seating**\n3. **Pure Vegetarian**\n4. **Quick Service**\n5. **Affordable Prices**\n\nVisit Oye Chatoro - The best family restaurant in Abu Road!',
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
        date: new Date(Date.now() - 345600000).toLocaleDateString(),
        author: 'Admin',
        category: 'About Us',
        tags: ['Family Restaurant', 'Abu Road', 'Kids Menu'],
        seoTitle: 'Family Restaurant in Abu Road | Oye Chatoro - Kid Friendly',
        seoDescription: 'Best family restaurant in Abu Road. Kid-friendly menu, AC seating, pure vegetarian food.',
        readingTime: '3 min read',
        status: 'Published'
    }
];

export const getBlogPosts = (): BlogPost[] => {
    if (typeof window === 'undefined') return INITIAL_POSTS;
    const stored = localStorage.getItem(BLOG_STORAGE_KEY);
    if (!stored) {
        localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(INITIAL_POSTS));
        return INITIAL_POSTS;
    }
    return JSON.parse(stored);
};


export const saveBlogPost = (post: BlogPost) => {
    const posts = getBlogPosts();
    const existingIndex = posts.findIndex(p => p.id === post.id);

    let updatedPosts;
    if (existingIndex >= 0) {
        updatedPosts = posts.map(p => p.id === post.id ? post : p);
    } else {
        updatedPosts = [post, ...posts];
    }

    localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(updatedPosts));
    window.dispatchEvent(new Event('blogUpdated'));
};

export const deleteBlogPost = (id: string) => {
    const posts = getBlogPosts();
    const updatedPosts = posts.filter(p => p.id !== id);
    localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(updatedPosts));
    window.dispatchEvent(new Event('blogUpdated'));
};

// --- CATEGORIES & TAGS ---

const CATEGORY_STORAGE_KEY = 'oye_chatoro_blog_categories';
const TAG_STORAGE_KEY = 'oye_chatoro_blog_tags';

export const useBlog = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [categories, setCategories] = useState<BlogCategory[]>([]);
    const [tags, setTags] = useState<BlogTag[]>([]);

    useEffect(() => {
        const loadData = () => {
            setPosts(getBlogPosts());

            const storedCategories = localStorage.getItem(CATEGORY_STORAGE_KEY);
            if (storedCategories) {
                setCategories(JSON.parse(storedCategories));
            } else {
                const defaults = [
                    { id: '1', name: 'News', slug: 'news', count: 0 },
                    { id: '2', name: 'Recipes', slug: 'recipes', count: 0 },
                    { id: '3', name: 'Food Guide', slug: 'food-guide', count: 0 },
                    { id: '4', name: 'Offers', slug: 'offers', count: 0 },
                    { id: '5', name: 'Events', slug: 'events', count: 0 }
                ];
                setCategories(defaults);
                localStorage.setItem(CATEGORY_STORAGE_KEY, JSON.stringify(defaults));
            }

            const storedTags = localStorage.getItem(TAG_STORAGE_KEY);
            if (storedTags) setTags(JSON.parse(storedTags));
        };

        loadData();
        const handleStorageChange = () => loadData();

        window.addEventListener('blogUpdated', handleStorageChange);
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('blogUpdated', handleStorageChange);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const saveCategory = (category: BlogCategory) => {
        const current = [...categories];
        const index = current.findIndex(c => c.id === category.id);
        if (index >= 0) current[index] = category;
        else current.push(category);
        localStorage.setItem(CATEGORY_STORAGE_KEY, JSON.stringify(current));
        setCategories(current);
    };

    const deleteCategory = (id: string) => {
        const updated = categories.filter(c => c.id !== id);
        localStorage.setItem(CATEGORY_STORAGE_KEY, JSON.stringify(updated));
        setCategories(updated);
    };

    const saveTag = (tag: BlogTag) => {
        const current = [...tags];
        if (!current.find(t => t.name.toLowerCase() === tag.name.toLowerCase())) {
            current.push(tag);
            localStorage.setItem(TAG_STORAGE_KEY, JSON.stringify(current));
            setTags(current);
        }
    };

    return {
        posts, categories, tags,
        savePost: saveBlogPost, deletePost: deleteBlogPost,
        saveCategory, deleteCategory,
        saveTag
    };
};

// --- MENU SYSTEM ---

export interface MenuCategory {
    id: string;
    name: string;
}

export interface MenuItem {
    id: string;
    name: string;
    price: number;
    description: string;
    categoryId: string;
    veg: boolean;
    status: 'Active' | 'Out of Stock';
    image?: string;
    recipe?: { inventoryItemId: number; quantity: number }[];
    isDigitalMenu?: boolean; // Show in public digital menu
    isTrainMenu?: boolean;   // Show in train delivery menu
    isFeatured?: boolean;    // Highlight as featured/bestseller
    costPrice?: number;      // Cost price for menu engineering
}

const MENU_CATS_KEY = 'oye_chatoro_menu_cats';
const MENU_ITEMS_KEY = 'oye_chatoro_menu_items';

const INITIAL_CATS: MenuCategory[] = [
    { id: 'cat_train', name: 'Train Specials 🚂' },
    { id: 'cat_1', name: 'Pizza' },
    { id: 'cat_2', name: 'Pasta' },
    { id: 'cat_3', name: 'Chaat' }
];

const INITIAL_MENU_ITEMS: MenuItem[] = [
    // Train Specials
    {
        id: 'item_t1',
        name: 'Standard Veg Thali',
        price: 240,
        description: 'Dal Fry, Seasonal Veg, 4 Roti, Rice, Salad, Pickle. Perfect for a hearty train meal.',
        categoryId: 'cat_train',
        veg: true,
        status: 'Active',
        isDigitalMenu: false,
        isTrainMenu: true,
        isFeatured: true,
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'item_t2',
        name: 'Maharaja Premium Thali',
        price: 320,
        description: 'Paneer Butter Masala, Dal Makhani, Mix Veg, Jeera Rice, 2 Butter Naan, Sweet, Raita, Salad.',
        categoryId: 'cat_train',
        veg: true,
        status: 'Active',
        isDigitalMenu: false,
        isTrainMenu: true,
        isFeatured: true,
        image: 'https://images.unsplash.com/photo-1585937421612-70a008356f36?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'item_t3',
        name: 'Jain Special Thali',
        price: 260,
        description: 'No Onion/Garlic. Paneer Sabzi, Dal, Rice, 4 Roti, Sweet. Pure & Sattvic.',
        categoryId: 'cat_train',
        veg: true,
        status: 'Active',
        isDigitalMenu: false,
        isTrainMenu: true,
        image: 'https://images.unsplash.com/photo-1514516872020-25ce539541d3?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'item_t4',
        name: 'Dal Makhani Rice Bowl',
        price: 180,
        description: 'Creamy Dal Makhani served with aromatic Jeera Rice. Comfort food on the go.',
        categoryId: 'cat_train',
        veg: true,
        status: 'Active',
        isDigitalMenu: false,
        isTrainMenu: true,
        image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'item_t5',
        name: 'Chole Kulcha Combo',
        price: 160,
        description: 'Spicy Amritsari Chole served with 2 soft Kulchas and pickle.',
        categoryId: 'cat_train',
        veg: true,
        status: 'Active',
        isDigitalMenu: false,
        isTrainMenu: true,
        image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'item_t6',
        name: 'Aloo Paratha (2 pcs)',
        price: 120,
        description: 'Stuffed potato parathas served with fresh curd and pickle.',
        categoryId: 'cat_train',
        veg: true,
        status: 'Active',
        isDigitalMenu: false,
        isTrainMenu: true,
        image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'item_t7',
        name: 'Paneer Paratha (2 pcs)',
        price: 150,
        description: 'Stuffed paneer parathas served with fresh curd and pickle.',
        categoryId: 'cat_train',
        veg: true,
        status: 'Active',
        isDigitalMenu: false,
        isTrainMenu: true,
        image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'item_t8',
        name: 'Sweet Lassi',
        price: 80,
        description: 'Thick, creamy sweet yogurt drink topped with dry fruits.',
        categoryId: 'cat_train',
        veg: true,
        status: 'Active',
        isDigitalMenu: false,
        isTrainMenu: true,
        image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'item_t9',
        name: 'Masala Chaas',
        price: 50,
        description: 'Spiced buttermilk, refreshing and perfect for digestion.',
        categoryId: 'cat_train',
        veg: true,
        status: 'Active',
        isDigitalMenu: false,
        isTrainMenu: true,
        image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'item_t10',
        name: 'Gulab Jamun (2 pcs)',
        price: 60,
        description: 'Soft, melt-in-your-mouth fried dumplings soaked in sugar syrup.',
        categoryId: 'cat_train',
        veg: true,
        status: 'Active',
        isDigitalMenu: false,
        isTrainMenu: true,
        image: 'https://images.unsplash.com/photo-1593701478530-bfde71cf52dd?auto=format&fit=crop&w=800&q=80'
    },
    { id: 'item_1', name: 'Classic Margherita', price: 199, description: 'Tomato, basil, mozzarella', categoryId: 'cat_1', veg: true, status: 'Active' },
    { id: 'item_2', name: 'Paneer Tikka Pizza', price: 249, description: 'Spiced paneer chunks', categoryId: 'cat_1', veg: true, status: 'Active' },
    { id: 'item_3', name: 'White Sauce Pasta', price: 149, description: 'Creamy cheese sauce', categoryId: 'cat_2', veg: true, status: 'Active' },
    { id: 'item_4', name: 'Dahi Papdi Chaat', price: 49, description: 'Sweet and tangy yogurt', categoryId: 'cat_3', veg: true, status: 'Active' }
];

export const getMenuCategories = (): MenuCategory[] => {
    if (typeof window === 'undefined') return INITIAL_CATS;
    const stored = localStorage.getItem(MENU_CATS_KEY);
    if (!stored) {
        localStorage.setItem(MENU_CATS_KEY, JSON.stringify(INITIAL_CATS));
        return INITIAL_CATS;
    }
    return JSON.parse(stored);
};

export const saveMenuCategory = (category: MenuCategory) => {
    const cats = getMenuCategories();
    const index = cats.findIndex(c => c.id === category.id);
    let updated;
    if (index >= 0) {
        updated = cats.map(c => c.id === category.id ? category : c);
    } else {
        updated = [...cats, category];
    }
    localStorage.setItem(MENU_CATS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('menuUpdated'));
};

export const deleteMenuCategory = (id: string) => {
    const cats = getMenuCategories();
    const updated = cats.filter(c => c.id !== id);
    localStorage.setItem(MENU_CATS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('menuUpdated'));
};

export const getMenuItems = (): MenuItem[] => {
    if (typeof window === 'undefined') return INITIAL_MENU_ITEMS;
    const stored = localStorage.getItem(MENU_ITEMS_KEY);
    if (!stored) {
        localStorage.setItem(MENU_ITEMS_KEY, JSON.stringify(INITIAL_MENU_ITEMS));
        return INITIAL_MENU_ITEMS;
    }
    return JSON.parse(stored);
};

export const saveMenuItem = (item: MenuItem) => {
    const items = getMenuItems();
    const index = items.findIndex(i => i.id === item.id);
    let updated;
    if (index >= 0) {
        updated = items.map(i => i.id === item.id ? item : i);
    } else {
        updated = [...items, item];
    }
    localStorage.setItem(MENU_ITEMS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('menuUpdated'));
};

export const deleteMenuItem = (id: string) => {
    const items = getMenuItems();
    const updated = items.filter(i => i.id !== id);
    localStorage.setItem(MENU_ITEMS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('menuUpdated'));
};

export const useMenu = () => {
    const [categories, setCategories] = useState<MenuCategory[]>([]);
    const [items, setItems] = useState<MenuItem[]>([]);

    const refresh = () => {
        setCategories(getMenuCategories());
        setItems(getMenuItems());
    };

    useEffect(() => {
        refresh();
        window.addEventListener('menuUpdated', refresh);
        window.addEventListener('storage', refresh);
        return () => {
            window.removeEventListener('menuUpdated', refresh);
            window.removeEventListener('storage', refresh);
        };
    }, []);

    return {
        categories,
        items,
        saveCategory: saveMenuCategory,
        deleteCategory: deleteMenuCategory,
        saveItem: saveMenuItem,
        deleteItem: deleteMenuItem
    };
};

// --- USER AUTH SYSTEM ---

export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    password?: string;
    favorites?: string[];
    // New Fields
    addresses?: { id: string; label: string; text: string; isDefault?: boolean }[];
    preferences?: { dietary: string[]; language: string };
    paymentMethods?: { id: string; type: string; last4: string; isDefault?: boolean }[];
    dates?: { birthday: string; anniversary: string };
    loyalty?: { points: number; tier: string; streak: number; badges: string[] };
    referralCode?: string;
    notifications?: { id: string; title: string; message: string; date: string; read: boolean }[];
}

const USERS_KEY = 'oye_chatoro_users';
const CURRENT_USER_KEY = 'oye_chatoro_current_user';

export const registerUser = (user: Omit<User, 'id'>) => {
    const users = getUsers();
    if (users.find(u => u.email === user.email)) {
        throw new Error('Email already exists');
    }

    const newUser: User = {
        id: `user_${Date.now()}`,
        ...user,
        favorites: [],
        addresses: [],
        preferences: { dietary: [], language: 'en' },
        paymentMethods: [],
        dates: { birthday: '', anniversary: '' },
        loyalty: { points: 0, tier: 'Bronze', streak: 0, badges: [] },
        referralCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
        notifications: []
    };

    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
    return newUser;
};

export const loginUser = (email: string, password: string): User => {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        throw new Error('Invalid credentials');
    }

    const { password: _, ...safeUser } = user;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));
    window.dispatchEvent(new Event('authUpdated'));
    return safeUser;
};

export const logoutUser = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    window.dispatchEvent(new Event('authUpdated'));
};

export const getCurrentUser = (): User | null => {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem(CURRENT_USER_KEY);
    return stored ? JSON.parse(stored) : null;
};

const getUsers = (): User[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(USERS_KEY);
    return stored ? JSON.parse(stored) : [];
};

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        setUser(getCurrentUser());

        const handleAuthChange = () => {
            setUser(getCurrentUser());
        };

        window.addEventListener('authUpdated', handleAuthChange);
        window.addEventListener('storage', handleAuthChange);

        return () => {
            window.removeEventListener('authUpdated', handleAuthChange);
            window.removeEventListener('storage', handleAuthChange);
        };
    }, []);

    const updateUser = (updates: Partial<User>) => {
        if (!user) return;
        const users = getUsers();
        const index = users.findIndex(u => u.id === user.id);
        if (index !== -1) {
            const updatedUser = { ...users[index], ...updates };
            users[index] = updatedUser;
            localStorage.setItem(USERS_KEY, JSON.stringify(users));
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
            window.dispatchEvent(new Event('authUpdated'));
        }
    };

    return { user, login: loginUser, register: registerUser, logout: logoutUser, updateUser };
};

export const useAllUsers = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        setUsers(getUsers());
        const handleStorage = () => setUsers(getUsers());
        window.addEventListener('storage', handleStorage);
        window.addEventListener('authUpdated', handleStorage);
        return () => {
            window.removeEventListener('storage', handleStorage);
            window.removeEventListener('authUpdated', handleStorage);
        };
    }, []);

    return { users };
};

// --- CART SYSTEM REMOVED (Migrated to DB) ---

// --- FAVORITES SYSTEM ---

export const useFavorites = () => {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
        if (user && user.favorites) {
            setFavorites(user.favorites);
        } else {
            setFavorites([]);
        }
    }, [user]);

    const toggleFavorite = (itemId: string) => {
        if (!user) return; // Should prompt login in UI

        const users = JSON.parse(localStorage.getItem('oye_chatoro_users') || '[]');
        const currentUserIndex = users.findIndex((u: User) => u.email === user.email);

        if (currentUserIndex === -1) return;

        const currentUser = users[currentUserIndex];
        const newFavorites = currentUser.favorites ? [...currentUser.favorites] : [];

        const index = newFavorites.indexOf(itemId);
        if (index === -1) {
            newFavorites.push(itemId);
        } else {
            newFavorites.splice(index, 1);
        }

        currentUser.favorites = newFavorites;
        users[currentUserIndex] = currentUser;

        localStorage.setItem('oye_chatoro_users', JSON.stringify(users));

        // Update current session user as well
        const sessionUser = { ...user, favorites: newFavorites };
        localStorage.setItem('oye_chatoro_current_user', JSON.stringify(sessionUser));
        window.dispatchEvent(new Event('authUpdated'));
    };

    return { favorites, toggleFavorite };
};

// --- OFFERS SYSTEM ---

export interface Offer {
    id: string;
    code: string;
    discount: string;
    type: 'Percentage' | 'Flat' | 'Free Item';
    expiry: string;
    status: 'Active' | 'Expired';
    usage: number;
    description?: string;
    bgColor?: string; // For story-style display
}

const OFFERS_KEY = 'oye_chatoro_offers';

const INITIAL_OFFERS: Offer[] = [
    { id: '1', code: 'WELCOME50', discount: '50%', type: 'Percentage', expiry: '2024-12-31', status: 'Active', usage: 145, description: 'Get 50% off on your first order!', bgColor: 'from-orange-400 to-red-500' },
    { id: '2', code: 'PIZZALOVER', discount: '₹100', type: 'Flat', expiry: '2024-11-30', status: 'Active', usage: 89, description: 'Flat ₹100 off on all Pizzas', bgColor: 'from-blue-400 to-indigo-500' },
    { id: '3', code: 'FREEDRINK', discount: 'FREE', type: 'Free Item', expiry: '2024-10-15', status: 'Expired', usage: 342, description: 'Free Coke with any Pasta', bgColor: 'from-green-400 to-emerald-500' },
];

export const getOffers = (): Offer[] => {
    if (typeof window === 'undefined') return INITIAL_OFFERS;
    const stored = localStorage.getItem(OFFERS_KEY);
    if (!stored) {
        localStorage.setItem(OFFERS_KEY, JSON.stringify(INITIAL_OFFERS));
        return INITIAL_OFFERS;
    }
    return JSON.parse(stored);
};

export const saveOffer = (offer: Offer) => {
    const offers = getOffers();
    const index = offers.findIndex(o => o.id === offer.id);
    let updated;
    if (index >= 0) {
        updated = offers.map(o => o.id === offer.id ? offer : o);
    } else {
        updated = [offer, ...offers];
    }
    localStorage.setItem(OFFERS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('offersUpdated'));
};

export const deleteOffer = (id: string) => {
    const offers = getOffers();
    const updated = offers.filter(o => o.id !== id);
    localStorage.setItem(OFFERS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('offersUpdated'));
};

export const useOffers = () => {
    const [offers, setOffers] = useState<Offer[]>([]);

    const refresh = () => {
        setOffers(getOffers());
    };

    useEffect(() => {
        refresh();
        window.addEventListener('offersUpdated', refresh);
        window.addEventListener('storage', refresh);
        return () => {
            window.removeEventListener('offersUpdated', refresh);
            window.removeEventListener('storage', refresh);
        };
    }, []);

    return { offers, saveOffer, deleteOffer };
};

// --- INVENTORY SYSTEM ---

export interface Supplier {
    name: string;
    contact: string;
    email?: string;
}

export interface StockLog {
    id: string;
    itemId: number;
    change: number;
    reason: string;
    timestamp: string;
    userId?: string; // 'Admin' or specific user
}

export interface WastageLog {
    id: string;
    itemId: number;
    quantity: number;
    reason: string;
    timestamp: string;
    userId?: string;
}

export interface InventoryItem {
    id: number;
    name: string;
    quantity: number;
    unit: string;
    minLevel: number;
    status: 'In Stock' | 'Low Stock' | 'Out of Stock';
    category?: string;
    lastUpdated?: string;
    supplier?: Supplier;
}

// Extend MenuItem to include recipe
declare module './storage' {
    interface MenuItem {
        recipe?: { inventoryItemId: number; quantity: number }[];
    }
}

const INVENTORY_KEY = 'oye_chatoro_inventory';
const STOCK_LOGS_KEY = 'oye_chatoro_stock_logs';
const WASTAGE_LOGS_KEY = 'oye_chatoro_wastage_logs';

const INITIAL_INVENTORY: InventoryItem[] = [
    { id: 1, name: 'Pizza Base', quantity: 45, unit: 'pcs', minLevel: 50, status: 'Low Stock', category: 'Raw Material' },
    { id: 2, name: 'Mozzarella Cheese', quantity: 12, unit: 'kg', minLevel: 5, status: 'In Stock', category: 'Dairy' },
    { id: 3, name: 'Tomato Sauce', quantity: 8, unit: 'kg', minLevel: 10, status: 'Low Stock', category: 'Sauces' },
    { id: 4, name: 'Sweet Corn', quantity: 5, unit: 'kg', minLevel: 2, status: 'In Stock', category: 'Vegetables' },
    { id: 5, name: 'Paneer', quantity: 15, unit: 'kg', minLevel: 5, status: 'In Stock', category: 'Dairy' },
    { id: 6, name: 'Disposable Plates', quantity: 200, unit: 'pcs', minLevel: 100, status: 'In Stock', category: 'Packaging' },
];

export const getInventory = (): InventoryItem[] => {
    if (typeof window === 'undefined') return INITIAL_INVENTORY;
    const stored = localStorage.getItem(INVENTORY_KEY);
    if (!stored) {
        localStorage.setItem(INVENTORY_KEY, JSON.stringify(INITIAL_INVENTORY));
        return INITIAL_INVENTORY;
    }
    return JSON.parse(stored);
};

export const getStockLogs = (): StockLog[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(STOCK_LOGS_KEY);
    return stored ? JSON.parse(stored) : [];
};

export const getWastageLogs = (): WastageLog[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(WASTAGE_LOGS_KEY);
    return stored ? JSON.parse(stored) : [];
};

export const useInventory = () => {
    const [inventory, setInventory] = useState<InventoryItem[]>([]);
    const [stockLogs, setStockLogs] = useState<StockLog[]>([]);
    const [wastageLogs, setWastageLogs] = useState<WastageLog[]>([]);

    const refresh = () => {
        setInventory(getInventory());
        setStockLogs(getStockLogs());
        setWastageLogs(getWastageLogs());
    };

    useEffect(() => {
        refresh();
        window.addEventListener('inventoryUpdated', refresh);
        window.addEventListener('storage', refresh);
        return () => {
            window.removeEventListener('inventoryUpdated', refresh);
            window.removeEventListener('storage', refresh);
        };
    }, []);

    const logStockChange = (itemId: number, change: number, reason: string) => {
        const logs = getStockLogs();
        const newLog: StockLog = {
            id: `log_${Date.now()}_${Math.random()}`,
            itemId,
            change,
            reason,
            timestamp: new Date().toISOString(),
            userId: 'Admin' // In a real app, get from auth context
        };
        const updatedLogs = [newLog, ...logs];
        localStorage.setItem(STOCK_LOGS_KEY, JSON.stringify(updatedLogs));
        setStockLogs(updatedLogs);
    };

    const recordWastage = (itemId: number, quantity: number, reason: string) => {
        // 1. Reduce Stock
        const currentInv = getInventory();
        const updatedInv = currentInv.map(item => {
            if (item.id === itemId) {
                const newQty = Math.max(0, item.quantity - quantity);
                return {
                    ...item,
                    quantity: newQty,
                    status: newQty <= 0 ? 'Out of Stock' : newQty <= item.minLevel ? 'Low Stock' : 'In Stock',
                    lastUpdated: new Date().toISOString()
                } as InventoryItem;
            }
            return item;
        });
        localStorage.setItem(INVENTORY_KEY, JSON.stringify(updatedInv));

        // 2. Log Wastage
        const logs = getWastageLogs();
        const newLog: WastageLog = {
            id: `waste_${Date.now()}_${Math.random()}`,
            itemId,
            quantity,
            reason,
            timestamp: new Date().toISOString(),
            userId: 'Admin'
        };
        const updatedLogs = [newLog, ...logs];
        localStorage.setItem(WASTAGE_LOGS_KEY, JSON.stringify(updatedLogs));

        // 3. Log Stock Change (for consistency)
        logStockChange(itemId, -quantity, `Wastage: ${reason}`);

        window.dispatchEvent(new Event('inventoryUpdated'));
    };

    const addItem = (item: Omit<InventoryItem, 'id' | 'status'>) => {
        const current = getInventory();
        const newItem: InventoryItem = {
            ...item,
            id: Date.now(),
            status: item.quantity <= 0 ? 'Out of Stock' : item.quantity <= item.minLevel ? 'Low Stock' : 'In Stock',
            lastUpdated: new Date().toISOString()
        };
        const updated = [...current, newItem];
        localStorage.setItem(INVENTORY_KEY, JSON.stringify(updated));
        logStockChange(newItem.id, newItem.quantity, 'Initial Stock');
        window.dispatchEvent(new Event('inventoryUpdated'));
    };

    const updateItem = (id: number, updates: Partial<InventoryItem>) => {
        const current = getInventory();
        let quantityChange = 0;

        const updated = current.map(item => {
            if (item.id === id) {
                if (updates.quantity !== undefined) {
                    quantityChange = updates.quantity - item.quantity;
                }

                const updatedItem = { ...item, ...updates, lastUpdated: new Date().toISOString() };
                // Recalculate status
                if (updates.quantity !== undefined || updates.minLevel !== undefined) {
                    const q = updates.quantity !== undefined ? updates.quantity : item.quantity;
                    const m = updates.minLevel !== undefined ? updates.minLevel : item.minLevel;
                    updatedItem.status = q <= 0 ? 'Out of Stock' : q <= m ? 'Low Stock' : 'In Stock';
                }
                return updatedItem;
            }
            return item;
        });

        localStorage.setItem(INVENTORY_KEY, JSON.stringify(updated));
        if (quantityChange !== 0) {
            logStockChange(id, quantityChange, 'Manual Update');
        }
        window.dispatchEvent(new Event('inventoryUpdated'));
    };

    const deleteItem = (id: number) => {
        const current = getInventory();
        const updated = current.filter(item => item.id !== id);
        localStorage.setItem(INVENTORY_KEY, JSON.stringify(updated));
        window.dispatchEvent(new Event('inventoryUpdated'));
    };

    return { inventory, stockLogs, wastageLogs, addItem, updateItem, deleteItem, recordWastage };
};

// --- AUTO DEDUCT LOGIC ---

export const deductStockForOrder = (orderItems: any[]) => {
    // Note: orderItems can be strings like "Classic Margherita (1)" 
    // OR objects like { name: "Classic Margherita", quantity: 1, price: 200 }
    // We need to handle both formats

    const menuItems = getMenuItems();
    const inventory = getInventory();
    let inventoryUpdated = false;

    const updatedInventory = inventory.map(invItem => {
        let newQuantity = invItem.quantity;

        orderItems.forEach(orderItem => {
            let itemName: string;
            let qty: number;

            // Check if orderItem is a string or an object
            if (typeof orderItem === 'string') {
                // Parse "Name (Qty)" format
                const match = orderItem.match(/(.*) \((\d+)\)/);
                if (match) {
                    itemName = match[1];
                    qty = parseInt(match[2]);
                } else {
                    return; // Skip if can't parse
                }
            } else if (typeof orderItem === 'object' && orderItem !== null) {
                // Object format { name, quantity, ... }
                itemName = orderItem.name;
                qty = orderItem.quantity || 1;
            } else {
                return; // Skip unknown format
            }

            const menuItem = menuItems.find(m => m.name === itemName);
            if (menuItem && menuItem.recipe) {
                const recipeItem = menuItem.recipe.find(r => r.inventoryItemId === invItem.id);
                if (recipeItem) {
                    newQuantity -= (recipeItem.quantity * qty);
                    inventoryUpdated = true;
                }
            }
        });

        if (newQuantity !== invItem.quantity) {
            return {
                ...invItem,
                quantity: Math.max(0, newQuantity),
                status: newQuantity <= 0 ? 'Out of Stock' : newQuantity <= invItem.minLevel ? 'Low Stock' : 'In Stock',
                lastUpdated: new Date().toISOString()
            };
        }
        return invItem;
    });

    if (inventoryUpdated) {
        localStorage.setItem(INVENTORY_KEY, JSON.stringify(updatedInventory));
        window.dispatchEvent(new Event('inventoryUpdated'));
    }
};





export const getAnalyticsData = (range: '7d' | '30d' | 'month' | 'year') => {
    const orders = getOrders();
    const now = new Date();
    let startDate = new Date();

    // 1. Determine Date Range
    switch (range) {
        case '7d':
            startDate.setDate(now.getDate() - 7);
            break;
        case '30d':
            startDate.setDate(now.getDate() - 30);
            break;
        case 'month':
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            break;
        case 'year':
            startDate = new Date(now.getFullYear(), 0, 1);
            break;
    }

    // 2. Filter Orders
    const filteredOrders = orders.filter(order => {
        const orderDate = new Date(order.createdAt || 0);
        return orderDate >= startDate && order.status !== 'Cancelled';
    });

    // 3. Calculate Summary
    const totalRevenue = filteredOrders.reduce((sum, o) => sum + o.total, 0);
    const totalOrders = filteredOrders.length;
    const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

    // 4. Revenue Trend (Group by Date)
    const revenueTrendMap = new Map<string, number>();
    // Initialize last N days with 0
    for (let d = new Date(startDate); d <= now; d.setDate(d.getDate() + 1)) {
        revenueTrendMap.set(d.toLocaleDateString(), 0);
    }

    filteredOrders.forEach(order => {
        const dateStr = new Date(order.createdAt || 0).toLocaleDateString();
        const current = revenueTrendMap.get(dateStr) || 0;
        revenueTrendMap.set(dateStr, current + order.total);
    });

    const revenueTrend = Array.from(revenueTrendMap.entries()).map(([date, amount]) => ({
        date: date.split('/')[0] + '/' + date.split('/')[1], // DD/MM format
        amount
    }));

    // 5. Top Selling Items
    const itemSales = new Map<string, { quantity: number, revenue: number }>();
    filteredOrders.forEach(order => {
        order.items.forEach(itemStr => {
            const match = itemStr.match(/(.*) \((\d+)\)/);
            if (match) {
                const name = match[1];
                const qty = parseInt(match[2]);
                const current = itemSales.get(name) || { quantity: 0, revenue: 0 };
                // Estimate item price from total (not perfect but works for analytics demo)
                // Ideally we should look up price from menuItems
                itemSales.set(name, {
                    quantity: current.quantity + qty,
                    revenue: current.revenue // Revenue per item is hard to get without menu lookup, skipping for now
                });
            }
        });
    });

    const topItems = Array.from(itemSales.entries())
        .map(([name, stats]) => ({ name, sales: stats.quantity, pct: 0 }))
        .sort((a, b) => b.sales - a.sales)
        .slice(0, 5);

    // Calculate percentages for top items
    const maxSales = topItems.length > 0 ? topItems[0].sales : 1;
    topItems.forEach(item => item.pct = Math.round((item.sales / maxSales) * 100));

    // 6. Peak Hours
    const hoursMap = new Array(24).fill(0);
    filteredOrders.forEach(order => {
        const hour = new Date(order.createdAt || 0).getHours();
        hoursMap[hour]++;
    });

    const peakHours = hoursMap.map((count, hour) => ({ hour, count }));

    return {
        summary: { totalRevenue, totalOrders, avgOrderValue },
        revenueTrend,
        topItems,
        peakHours
    };
};

// --- SETTINGS SYSTEM ---

export interface RestaurantSettings {
    name: string;
    address: string;
    phone: string;
    email: string;
    currency: string;
    taxRate: number;
    serviceCharge: number;
    logo?: string;
    socials?: { facebook?: string; instagram?: string; twitter?: string };
    // New Fields
    storeHours?: {
        [key: string]: { open: string; close: string; closed: boolean };
    };
    receipt?: {
        header: string;
        footer: string;
        showLogo: boolean;
    };
    digitalMenu?: {
        bannerImage: string;
        theme: 'light' | 'dark' | 'system';
        isActive: boolean;
    };
}

const SETTINGS_KEY = 'oye_chatoro_settings';

const INITIAL_SETTINGS: RestaurantSettings = {
    name: 'Oye Chatoro',
    address: 'Abu Road, Rajasthan',
    phone: '+91 98765 43210',
    email: 'contact@oyechatoro.com',
    currency: '₹',
    taxRate: 5,
    serviceCharge: 0,
    storeHours: {
        Monday: { open: '09:00', close: '22:00', closed: false },
        Tuesday: { open: '09:00', close: '22:00', closed: false },
        Wednesday: { open: '09:00', close: '22:00', closed: false },
        Thursday: { open: '09:00', close: '22:00', closed: false },
        Friday: { open: '09:00', close: '23:00', closed: false },
        Saturday: { open: '10:00', close: '23:00', closed: false },
        Sunday: { open: '10:00', close: '23:00', closed: false },
    },
    receipt: {
        header: 'Thank you for dining with us!',
        footer: 'Visit us again soon.',
        showLogo: true
    },
    digitalMenu: {
        bannerImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
        theme: 'light',
        isActive: true
    }
};

export const getSettings = (): RestaurantSettings => {
    if (typeof window === 'undefined') return INITIAL_SETTINGS;
    const stored = localStorage.getItem(SETTINGS_KEY);
    return stored ? { ...INITIAL_SETTINGS, ...JSON.parse(stored) } : INITIAL_SETTINGS;
};

export const saveSettings = (settings: RestaurantSettings) => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    window.dispatchEvent(new Event('settingsUpdated'));
};

export const useSettings = () => {
    const [settings, setSettings] = useState<RestaurantSettings>(INITIAL_SETTINGS);

    useEffect(() => {
        setSettings(getSettings());
        const handleUpdate = () => setSettings(getSettings());
        window.addEventListener('settingsUpdated', handleUpdate);
        window.addEventListener('storage', handleUpdate);
        return () => {
            window.removeEventListener('settingsUpdated', handleUpdate);
            window.removeEventListener('storage', handleUpdate);
        };
    }, []);

    return { settings, updateSettings: saveSettings };
};

// --- DATA MANAGEMENT ---

export const exportData = () => {
    if (typeof window === 'undefined') return null;
    const data = {
        settings: localStorage.getItem(SETTINGS_KEY),
        orders: localStorage.getItem(STORAGE_KEY),
        menuItems: localStorage.getItem(MENU_ITEMS_KEY),
        menuCats: localStorage.getItem(MENU_CATS_KEY),
        inventory: localStorage.getItem(INVENTORY_KEY),
        customers: localStorage.getItem(CUSTOMERS_KEY),
        users: localStorage.getItem(USERS_KEY),
        timestamp: new Date().toISOString(),
        version: '1.0'
    };
    return JSON.stringify(data, null, 2);
};

export const importData = (jsonString: string) => {
    try {
        const data = JSON.parse(jsonString);
        if (data.settings) localStorage.setItem(SETTINGS_KEY, data.settings);
        if (data.orders) localStorage.setItem(STORAGE_KEY, data.orders);
        if (data.menuItems) localStorage.setItem(MENU_ITEMS_KEY, data.menuItems);
        if (data.menuCats) localStorage.setItem(MENU_CATS_KEY, data.menuCats);
        if (data.inventory) localStorage.setItem(INVENTORY_KEY, data.inventory);
        if (data.customers) localStorage.setItem(CUSTOMERS_KEY, data.customers);
        if (data.users) localStorage.setItem(USERS_KEY, data.users);

        // Trigger updates
        window.dispatchEvent(new Event('settingsUpdated'));
        window.dispatchEvent(new Event('ordersUpdated'));
        window.dispatchEvent(new Event('menuUpdated'));
        window.dispatchEvent(new Event('inventoryUpdated'));
        window.dispatchEvent(new Event('customersUpdated'));
        window.dispatchEvent(new Event('authUpdated'));

        return { success: true };
    } catch (e) {
        console.error('Import failed', e);
        return { success: false, error: 'Invalid data file' };
    }
};


// --- CUSTOMER CRM SYSTEM ---

export interface Customer {
    id: string;
    name: string;
    phone: string;
    email?: string;
    totalOrders: number;
    totalSpent: number;
    loyaltyPoints: number;
    lastVisit: string;
    notes?: string;
}

const CUSTOMERS_KEY = 'oye_chatoro_customers';

const INITIAL_CUSTOMERS: Customer[] = [
    { id: 'cust_1', name: 'Rahul Sharma', phone: '9876543210', totalOrders: 12, totalSpent: 4500, loyaltyPoints: 45, lastVisit: new Date().toISOString() },
    { id: 'cust_2', name: 'Priya Singh', phone: '9876543211', totalOrders: 5, totalSpent: 1200, loyaltyPoints: 12, lastVisit: new Date(Date.now() - 86400000).toISOString() }
];

export const getCustomers = (): Customer[] => {
    if (typeof window === 'undefined') return INITIAL_CUSTOMERS;
    const stored = localStorage.getItem(CUSTOMERS_KEY);
    if (!stored) {
        localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(INITIAL_CUSTOMERS));
        return INITIAL_CUSTOMERS;
    }
    return JSON.parse(stored);
};

export const saveCustomer = (customer: Customer) => {
    const customers = getCustomers();
    const index = customers.findIndex(c => c.id === customer.id);
    let updated;
    if (index >= 0) {
        updated = customers.map(c => c.id === customer.id ? customer : c);
    } else {
        updated = [...customers, customer];
    }
    localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('customersUpdated'));
};

export const useCustomers = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);

    useEffect(() => {
        setCustomers(getCustomers());
        const handleUpdate = () => setCustomers(getCustomers());
        window.addEventListener('customersUpdated', handleUpdate);
        window.addEventListener('storage', handleUpdate);
        return () => {
            window.removeEventListener('customersUpdated', handleUpdate);
            window.removeEventListener('storage', handleUpdate);
        };
    }, []);

    return { customers, saveCustomer };
};

// --- STAFF MANAGEMENT (Extends User System) ---

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);

    const refresh = () => setUsers(getUsers());

    useEffect(() => {
        refresh();
        window.addEventListener('authUpdated', refresh);
        window.addEventListener('storage', refresh);
        return () => {
            window.removeEventListener('authUpdated', refresh);
            window.removeEventListener('storage', refresh);
        };
    }, []);

    const addUser = (userData: Omit<User, 'id'>) => {
        try {
            registerUser(userData);
            refresh();
            return { success: true };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    };

    const deleteUser = (id: string) => {
        const currentUsers = getUsers();
        const updated = currentUsers.filter(u => u.id !== id);
        localStorage.setItem(USERS_KEY, JSON.stringify(updated));
        window.dispatchEvent(new Event('authUpdated'));
        refresh();
    };

    return { users, addUser, deleteUser };
};

// --- WAITER CALLING SYSTEM ---

export interface ServiceRequest {
    id: number;
    table: string;
    type: 'Call' | 'Bill' | 'Water';
    status: 'Pending' | 'Completed';
    time: string;
}

const SERVICE_REQUESTS_KEY = 'oyechatoro_service_requests';

export const getServiceRequests = (): ServiceRequest[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(SERVICE_REQUESTS_KEY);
    return stored ? JSON.parse(stored) : [];
};

export const addServiceRequest = (table: string, type: 'Call' | 'Bill' | 'Water') => {
    const requests = getServiceRequests();
    const newRequest: ServiceRequest = {
        id: Date.now(),
        table,
        type,
        status: 'Pending',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    localStorage.setItem(SERVICE_REQUESTS_KEY, JSON.stringify([...requests, newRequest]));
    window.dispatchEvent(new Event('serviceRequestsUpdated'));
    window.dispatchEvent(new Event('storage'));
};

export const updateServiceRequestStatus = (id: number, status: 'Pending' | 'Completed') => {
    const requests = getServiceRequests();
    const updated = requests.map(r => r.id === id ? { ...r, status } : r);
    localStorage.setItem(SERVICE_REQUESTS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('serviceRequestsUpdated'));
    window.dispatchEvent(new Event('storage'));
};

export const useServiceRequests = () => {
    const [requests, setRequests] = useState<ServiceRequest[]>([]);

    const refresh = () => {
        setRequests(getServiceRequests());
    };

    useEffect(() => {
        refresh();
        window.addEventListener('serviceRequestsUpdated', refresh);
        window.addEventListener('storage', refresh);
        return () => {
            window.removeEventListener('serviceRequestsUpdated', refresh);
            window.removeEventListener('storage', refresh);
        };
    }, []);

    return {
        requests,
        addRequest: addServiceRequest,
        updateStatus: updateServiceRequestStatus
    };
};

// --- MENU ENGINEERING ---

export interface MenuEngineeringData {
    stars: MenuItem[];
    plowhorses: MenuItem[];
    puzzles: MenuItem[];
    dogs: MenuItem[];
    items: {
        id: string;
        name: string;
        sales: number;
        revenue: number;
        cost: number;
        profit: number;
        margin: number;
        category: 'Star' | 'Plowhorse' | 'Puzzle' | 'Dog';
    }[];
}

export const getMenuEngineeringData = (): MenuEngineeringData => {
    const items = getMenuItems();
    const orders = getOrders();

    // Calculate Sales and Profit for each item
    const itemStats = items.map(item => {
        const itemOrders = orders.flatMap(o => o.items).filter(i => i.includes(item.name)); // Simple name match for now
        const salesCount = itemOrders.length;
        const revenue = salesCount * item.price;
        const cost = salesCount * (item.costPrice || 0);
        const profit = revenue - cost;

        return {
            ...item,
            sales: salesCount,
            revenue,
            cost,
            profit,
            margin: item.price - (item.costPrice || 0)
        };
    });

    const avgSales = itemStats.reduce((sum, i) => sum + i.sales, 0) / (itemStats.length || 1);
    const avgMargin = itemStats.reduce((sum, i) => sum + i.margin, 0) / (itemStats.length || 1);

    const classifiedItems = itemStats.map(item => {
        const isHighVolume = item.sales >= avgSales;
        const isHighMargin = item.margin >= avgMargin;

        let category: 'Star' | 'Plowhorse' | 'Puzzle' | 'Dog' = 'Dog';
        if (isHighVolume && isHighMargin) category = 'Star';
        else if (isHighVolume && !isHighMargin) category = 'Plowhorse';
        else if (!isHighVolume && isHighMargin) category = 'Puzzle';

        return {
            id: item.id,
            name: item.name,
            sales: item.sales,
            revenue: item.revenue,
            cost: item.cost,
            profit: item.profit,
            margin: item.margin,
            category
        };
    });

    return {
        stars: items.filter(i => classifiedItems.find(c => c.id === i.id)?.category === 'Star'),
        plowhorses: items.filter(i => classifiedItems.find(c => c.id === i.id)?.category === 'Plowhorse'),
        puzzles: items.filter(i => classifiedItems.find(c => c.id === i.id)?.category === 'Puzzle'),
        dogs: items.filter(i => classifiedItems.find(c => c.id === i.id)?.category === 'Dog'),
        items: classifiedItems
    };
};
