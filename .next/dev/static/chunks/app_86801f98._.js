(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/lib/socket.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSocket",
    ()=>getSocket
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/socket.io-client/build/esm/index.js [app-client] (ecmascript) <locals>");
'use client';
;
let socket;
const getSocket = ()=>{
    if (!socket) {
        socket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["io"])({
            path: '/socket.io',
            addTrailingSlash: false
        });
    }
    return socket;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/lib/storage.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "INITIAL_PREP_LIST",
    ()=>INITIAL_PREP_LIST,
    "addServiceRequest",
    ()=>addServiceRequest,
    "createOrder",
    ()=>createOrder,
    "deductStockForOrder",
    ()=>deductStockForOrder,
    "deleteBlogPost",
    ()=>deleteBlogPost,
    "deleteMenuCategory",
    ()=>deleteMenuCategory,
    "deleteMenuItem",
    ()=>deleteMenuItem,
    "deleteOffer",
    ()=>deleteOffer,
    "exportData",
    ()=>exportData,
    "getAnalyticsData",
    ()=>getAnalyticsData,
    "getBlogPosts",
    ()=>getBlogPosts,
    "getCurrentUser",
    ()=>getCurrentUser,
    "getCustomers",
    ()=>getCustomers,
    "getDailyStats",
    ()=>getDailyStats,
    "getInventory",
    ()=>getInventory,
    "getMenuCategories",
    ()=>getMenuCategories,
    "getMenuEngineeringData",
    ()=>getMenuEngineeringData,
    "getMenuItems",
    ()=>getMenuItems,
    "getOffers",
    ()=>getOffers,
    "getOrders",
    ()=>getOrders,
    "getServiceRequests",
    ()=>getServiceRequests,
    "getSettings",
    ()=>getSettings,
    "getStockLogs",
    ()=>getStockLogs,
    "getWastageLogs",
    ()=>getWastageLogs,
    "importData",
    ()=>importData,
    "loginUser",
    ()=>loginUser,
    "logoutUser",
    ()=>logoutUser,
    "registerUser",
    ()=>registerUser,
    "saveBlogPost",
    ()=>saveBlogPost,
    "saveCustomer",
    ()=>saveCustomer,
    "saveMenuCategory",
    ()=>saveMenuCategory,
    "saveMenuItem",
    ()=>saveMenuItem,
    "saveOffer",
    ()=>saveOffer,
    "saveSettings",
    ()=>saveSettings,
    "toggleWaiterCall",
    ()=>toggleWaiterCall,
    "updateOrderStatus",
    ()=>updateOrderStatus,
    "updatePaymentMethod",
    ()=>updatePaymentMethod,
    "updatePaymentStatus",
    ()=>updatePaymentStatus,
    "updateServiceRequestStatus",
    ()=>updateServiceRequestStatus,
    "useAllUsers",
    ()=>useAllUsers,
    "useAuth",
    ()=>useAuth,
    "useBlog",
    ()=>useBlog,
    "useCart",
    ()=>useCart,
    "useCustomers",
    ()=>useCustomers,
    "useFavorites",
    ()=>useFavorites,
    "useInventory",
    ()=>useInventory,
    "useMenu",
    ()=>useMenu,
    "useOffers",
    ()=>useOffers,
    "useOrders",
    ()=>useOrders,
    "usePrepList",
    ()=>usePrepList,
    "useServiceRequests",
    ()=>useServiceRequests,
    "useSettings",
    ()=>useSettings,
    "useUsers",
    ()=>useUsers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$socket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/socket.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature(), _s6 = __turbopack_context__.k.signature(), _s7 = __turbopack_context__.k.signature(), _s8 = __turbopack_context__.k.signature(), _s9 = __turbopack_context__.k.signature(), _s10 = __turbopack_context__.k.signature(), _s11 = __turbopack_context__.k.signature(), _s12 = __turbopack_context__.k.signature(), _s13 = __turbopack_context__.k.signature();
'use client';
;
;
const INITIAL_ORDERS = [
    {
        id: 1006,
        customer: 'Rajesh Kumar',
        items: [
            'Standard Veg Thali (2)',
            'Sweet Lassi (2)'
        ],
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
        items: [
            'Classic Margherita (1)',
            'Coke (2)'
        ],
        total: 299,
        status: 'Pending',
        time: '10 mins ago',
        type: 'Dine-in',
        table: 'T-4',
        createdAt: Date.now() - 10 * 60000,
        waiterName: 'Rahul',
        dietary: [
            'veg',
            'spicy'
        ]
    },
    {
        id: 1002,
        customer: 'Priya Singh',
        items: [
            'Paneer Tikka Pizza (1)',
            'White Sauce Pasta (1)'
        ],
        total: 398,
        status: 'Cooking',
        time: '25 mins ago',
        type: 'Dine-in',
        table: 'T-2',
        createdAt: Date.now() - 25 * 60000,
        waiterName: 'Amit',
        dietary: [
            'veg'
        ]
    },
    {
        id: 1003,
        customer: 'Amit Patel',
        items: [
            'Dahi Papdi Chaat (2)'
        ],
        total: 98,
        status: 'Completed',
        time: '45 mins ago',
        type: 'Takeaway',
        createdAt: Date.now() - 45 * 60000
    },
    {
        id: 1004,
        customer: 'Sneha Gupta',
        items: [
            'Veggie Supreme (1)',
            'Garlic Bread (1)'
        ],
        total: 349,
        status: 'Ready',
        time: '1 hour ago',
        type: 'Delivery',
        createdAt: Date.now() - 60 * 60000
    },
    {
        id: 1005,
        customer: 'Vikram Malhotra',
        items: [
            'Makhani Paneer Supreme (1)'
        ],
        total: 279,
        status: 'Cancelled',
        time: '2 hours ago',
        type: 'Dine-in',
        table: 'T-8',
        createdAt: Date.now() - 120 * 60000
    }
];
const INITIAL_PREP_LIST = [
    {
        id: 1,
        task: 'Chop Onions',
        completed: false,
        station: 'Vegetable Prep'
    },
    {
        id: 2,
        task: 'Marinate Paneer',
        completed: false,
        station: 'Tandoor'
    },
    {
        id: 3,
        task: 'Prepare Pizza Dough',
        completed: true,
        station: 'Pizza Station'
    },
    {
        id: 4,
        task: 'Chop Coriander',
        completed: false,
        station: 'Vegetable Prep'
    },
    {
        id: 5,
        task: 'Check Gas Levels',
        completed: false,
        station: 'Safety'
    }
];
const STORAGE_KEY = 'oye_chatoro_orders';
const getOrders = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ORDERS));
        return INITIAL_ORDERS;
    }
    return JSON.parse(stored);
};
const updateOrderStatus = (orderId, newStatus)=>{
    const orders = getOrders();
    const updatedOrders = orders.map((order)=>{
        if (order.id === orderId) {
            const updates = {
                status: newStatus
            };
            if (newStatus === 'Cooking' && !order.cookingStartedAt) {
                updates.cookingStartedAt = Date.now();
            }
            return {
                ...order,
                ...updates
            };
        }
        return order;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedOrders));
    // Dispatch a custom event to notify other components/tabs
    window.dispatchEvent(new Event('ordersUpdated'));
    // Emit socket event
    const socket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$socket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSocket"])();
    socket.emit('update-status', {
        orderId,
        status: newStatus
    });
};
const toggleWaiterCall = (orderId, isCalled)=>{
    const orders = getOrders();
    const updatedOrders = orders.map((order)=>order.id === orderId ? {
            ...order,
            waiterCalled: isCalled
        } : order);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedOrders));
    window.dispatchEvent(new Event('ordersUpdated'));
    const socket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$socket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSocket"])();
    socket.emit('waiter-call', {
        orderId,
        isCalled
    });
};
const updatePaymentStatus = (orderId, paymentStatus)=>{
    const orders = getOrders();
    const updatedOrders = orders.map((order)=>order.id === orderId ? {
            ...order,
            paymentStatus
        } : order);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedOrders));
    window.dispatchEvent(new Event('ordersUpdated'));
    const socket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$socket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSocket"])();
    socket.emit('payment-updated', {
        orderId,
        paymentStatus
    });
};
const updatePaymentMethod = (orderId, paymentMethod)=>{
    const orders = getOrders();
    const updatedOrders = orders.map((order)=>order.id === orderId ? {
            ...order,
            paymentMethod
        } : order);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedOrders));
    window.dispatchEvent(new Event('ordersUpdated'));
    const socket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$socket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSocket"])();
    socket.emit('payment-method-updated', {
        orderId,
        paymentMethod
    });
};
const createOrder = (orderData)=>{
    const orders = getOrders();
    const newOrder = {
        id: Math.floor(1000 + Math.random() * 9000),
        ...orderData,
        status: 'Pending',
        time: 'Just now',
        createdAt: Date.now(),
        paymentStatus: orderData.paymentStatus || 'Unpaid',
        paymentMethod: orderData.paymentMethod || 'Online',
        mobile: orderData.mobile
    };
    const updatedOrders = [
        newOrder,
        ...orders
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedOrders));
    window.dispatchEvent(new Event('ordersUpdated'));
    // Deduct Stock
    deductStockForOrder(newOrder.items);
    // Update Customer Loyalty
    const customers = getCustomers();
    // Try to find by phone if available, else name
    let customer = customers.find((c)=>newOrder.mobile && c.phone === newOrder.mobile || !newOrder.mobile && c.name.toLowerCase() === newOrder.customer.toLowerCase());
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
        const newCustomer = {
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
    const socket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$socket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSocket"])();
    socket.emit('new-order', newOrder);
    return newOrder;
};
const getDailyStats = ()=>{
    const orders = getOrders();
    const today = new Date().toDateString();
    const todayOrders = orders.filter((order)=>{
        return new Date(order.createdAt || Date.now()).toDateString() === today;
    });
    const totalOrders = todayOrders.length;
    const totalSales = todayOrders.reduce((sum, order)=>sum + order.total, 0);
    const cashSales = todayOrders.filter((o)=>o.paymentMethod === 'Cash').reduce((sum, order)=>sum + order.total, 0);
    const onlineSales = todayOrders.filter((o)=>o.paymentMethod === 'Online' || o.paymentMethod === 'UPI' || o.paymentMethod === 'Card').reduce((sum, order)=>sum + order.total, 0);
    return {
        totalOrders,
        totalSales,
        cashSales,
        onlineSales
    };
};
const useOrders = ()=>{
    _s();
    const [orders, setOrders] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useOrders.useEffect": ()=>{
            // Initial load
            setOrders(getOrders());
            // Listen for updates
            const handleStorageChange = {
                "useOrders.useEffect.handleStorageChange": ()=>{
                    setOrders(getOrders());
                }
            }["useOrders.useEffect.handleStorageChange"];
            window.addEventListener('ordersUpdated', handleStorageChange);
            window.addEventListener('storage', handleStorageChange); // For cross-tab sync
            // Socket listeners
            const socket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$socket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSocket"])();
            socket.on('order-received', {
                "useOrders.useEffect": (newOrder)=>{
                    // Update local storage to reflect the new order from another device
                    const currentOrders = getOrders();
                    // Avoid duplicates
                    if (!currentOrders.find({
                        "useOrders.useEffect": (o)=>o.id === newOrder.id
                    }["useOrders.useEffect"])) {
                        const updated = [
                            newOrder,
                            ...currentOrders
                        ];
                        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
                        setOrders(updated);
                    }
                }
            }["useOrders.useEffect"]);
            socket.on('status-updated', {
                "useOrders.useEffect": ({ orderId, status })=>{
                    const currentOrders = getOrders();
                    const updated = currentOrders.map({
                        "useOrders.useEffect.updated": (o)=>o.id === orderId ? {
                                ...o,
                                status
                            } : o
                    }["useOrders.useEffect.updated"]);
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
                    setOrders(updated);
                }
            }["useOrders.useEffect"]);
            return ({
                "useOrders.useEffect": ()=>{
                    window.removeEventListener('ordersUpdated', handleStorageChange);
                    window.removeEventListener('storage', handleStorageChange);
                    socket.off('order-received');
                    socket.off('status-updated');
                }
            })["useOrders.useEffect"];
        }
    }["useOrders.useEffect"], []);
    return {
        orders,
        updateStatus: updateOrderStatus,
        createOrder,
        toggleWaiterCall
    };
};
_s(useOrders, "FvMuVccH6DXI6fqfhJiN/VsjZaw=");
function usePrepList() {
    _s1();
    const [prepList, setPrepList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "usePrepList.useState": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                const saved = localStorage.getItem('prepList');
                return saved ? JSON.parse(saved) : INITIAL_PREP_LIST;
            }
            //TURBOPACK unreachable
            ;
        }
    }["usePrepList.useState"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "usePrepList.useEffect": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.setItem('prepList', JSON.stringify(prepList));
            }
        }
    }["usePrepList.useEffect"], [
        prepList
    ]);
    const togglePrepItem = (id)=>{
        setPrepList((prev)=>prev.map((item)=>item.id === id ? {
                    ...item,
                    completed: !item.completed
                } : item));
    };
    const resetPrepList = ()=>{
        setPrepList(INITIAL_PREP_LIST.map((item)=>({
                ...item,
                completed: false
            })));
    };
    return {
        prepList,
        togglePrepItem,
        resetPrepList
    };
}
_s1(usePrepList, "XRy+naTKFZA8aFqjQDEhvvrRSFc=");
const BLOG_STORAGE_KEY = 'oye_chatoro_blog_posts';
const INITIAL_POSTS = [
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
        tags: [
            'Grand Opening',
            'Abu Road',
            'Street Food'
        ],
        seoTitle: 'Welcome to Oye Chatoro - Best Street Food in Abu Road',
        seoDescription: 'Oye Chatoro is now open in Abu Road! Experience authentic street food, live kitchen, and fresh ingredients. Visit us today.',
        readingTime: '2 min read'
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
        tags: [
            'Pizza',
            'Pasta',
            'Chaat',
            'Recommendations'
        ],
        seoTitle: 'Top 5 Must-Try Dishes at Oye Chatoro',
        seoDescription: 'From Paneer Tikka Pizza to Dahi Papdi Chaat, discover the top 5 dishes you must try at Oye Chatoro Abu Road.',
        readingTime: '3 min read'
    }
];
const getBlogPosts = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const stored = localStorage.getItem(BLOG_STORAGE_KEY);
    if (!stored) {
        localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(INITIAL_POSTS));
        return INITIAL_POSTS;
    }
    return JSON.parse(stored);
};
const saveBlogPost = (post)=>{
    const posts = getBlogPosts();
    const existingIndex = posts.findIndex((p)=>p.id === post.id);
    let updatedPosts;
    if (existingIndex >= 0) {
        updatedPosts = posts.map((p)=>p.id === post.id ? post : p);
    } else {
        updatedPosts = [
            post,
            ...posts
        ];
    }
    localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(updatedPosts));
    window.dispatchEvent(new Event('blogUpdated'));
};
const deleteBlogPost = (id)=>{
    const posts = getBlogPosts();
    const updatedPosts = posts.filter((p)=>p.id !== id);
    localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(updatedPosts));
    window.dispatchEvent(new Event('blogUpdated'));
};
// --- CATEGORIES & TAGS ---
const CATEGORY_STORAGE_KEY = 'oye_chatoro_blog_categories';
const TAG_STORAGE_KEY = 'oye_chatoro_blog_tags';
const useBlog = ()=>{
    _s2();
    const [posts, setPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [categories, setCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [tags, setTags] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useBlog.useEffect": ()=>{
            const loadData = {
                "useBlog.useEffect.loadData": ()=>{
                    setPosts(getBlogPosts());
                    const storedCategories = localStorage.getItem(CATEGORY_STORAGE_KEY);
                    if (storedCategories) {
                        setCategories(JSON.parse(storedCategories));
                    } else {
                        const defaults = [
                            {
                                id: '1',
                                name: 'News',
                                slug: 'news',
                                count: 0
                            },
                            {
                                id: '2',
                                name: 'Recipes',
                                slug: 'recipes',
                                count: 0
                            },
                            {
                                id: '3',
                                name: 'Food Guide',
                                slug: 'food-guide',
                                count: 0
                            },
                            {
                                id: '4',
                                name: 'Offers',
                                slug: 'offers',
                                count: 0
                            },
                            {
                                id: '5',
                                name: 'Events',
                                slug: 'events',
                                count: 0
                            }
                        ];
                        setCategories(defaults);
                        localStorage.setItem(CATEGORY_STORAGE_KEY, JSON.stringify(defaults));
                    }
                    const storedTags = localStorage.getItem(TAG_STORAGE_KEY);
                    if (storedTags) setTags(JSON.parse(storedTags));
                }
            }["useBlog.useEffect.loadData"];
            loadData();
            const handleStorageChange = {
                "useBlog.useEffect.handleStorageChange": ()=>loadData()
            }["useBlog.useEffect.handleStorageChange"];
            window.addEventListener('blogUpdated', handleStorageChange);
            window.addEventListener('storage', handleStorageChange);
            return ({
                "useBlog.useEffect": ()=>{
                    window.removeEventListener('blogUpdated', handleStorageChange);
                    window.removeEventListener('storage', handleStorageChange);
                }
            })["useBlog.useEffect"];
        }
    }["useBlog.useEffect"], []);
    const saveCategory = (category)=>{
        const current = [
            ...categories
        ];
        const index = current.findIndex((c)=>c.id === category.id);
        if (index >= 0) current[index] = category;
        else current.push(category);
        localStorage.setItem(CATEGORY_STORAGE_KEY, JSON.stringify(current));
        setCategories(current);
    };
    const deleteCategory = (id)=>{
        const updated = categories.filter((c)=>c.id !== id);
        localStorage.setItem(CATEGORY_STORAGE_KEY, JSON.stringify(updated));
        setCategories(updated);
    };
    const saveTag = (tag)=>{
        const current = [
            ...tags
        ];
        if (!current.find((t)=>t.name.toLowerCase() === tag.name.toLowerCase())) {
            current.push(tag);
            localStorage.setItem(TAG_STORAGE_KEY, JSON.stringify(current));
            setTags(current);
        }
    };
    return {
        posts,
        categories,
        tags,
        savePost: saveBlogPost,
        deletePost: deleteBlogPost,
        saveCategory,
        deleteCategory,
        saveTag
    };
};
_s2(useBlog, "lGXHbsgL2+t2Jazdn/1UfXsXIcE=");
const MENU_CATS_KEY = 'oye_chatoro_menu_cats';
const MENU_ITEMS_KEY = 'oye_chatoro_menu_items';
const INITIAL_CATS = [
    {
        id: 'cat_train',
        name: 'Train Specials 🚂'
    },
    {
        id: 'cat_1',
        name: 'Pizza'
    },
    {
        id: 'cat_2',
        name: 'Pasta'
    },
    {
        id: 'cat_3',
        name: 'Chaat'
    }
];
const INITIAL_MENU_ITEMS = [
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
    {
        id: 'item_1',
        name: 'Classic Margherita',
        price: 199,
        description: 'Tomato, basil, mozzarella',
        categoryId: 'cat_1',
        veg: true,
        status: 'Active'
    },
    {
        id: 'item_2',
        name: 'Paneer Tikka Pizza',
        price: 249,
        description: 'Spiced paneer chunks',
        categoryId: 'cat_1',
        veg: true,
        status: 'Active'
    },
    {
        id: 'item_3',
        name: 'White Sauce Pasta',
        price: 149,
        description: 'Creamy cheese sauce',
        categoryId: 'cat_2',
        veg: true,
        status: 'Active'
    },
    {
        id: 'item_4',
        name: 'Dahi Papdi Chaat',
        price: 49,
        description: 'Sweet and tangy yogurt',
        categoryId: 'cat_3',
        veg: true,
        status: 'Active'
    }
];
const getMenuCategories = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const stored = localStorage.getItem(MENU_CATS_KEY);
    if (!stored) {
        localStorage.setItem(MENU_CATS_KEY, JSON.stringify(INITIAL_CATS));
        return INITIAL_CATS;
    }
    return JSON.parse(stored);
};
const saveMenuCategory = (category)=>{
    const cats = getMenuCategories();
    const index = cats.findIndex((c)=>c.id === category.id);
    let updated;
    if (index >= 0) {
        updated = cats.map((c)=>c.id === category.id ? category : c);
    } else {
        updated = [
            ...cats,
            category
        ];
    }
    localStorage.setItem(MENU_CATS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('menuUpdated'));
};
const deleteMenuCategory = (id)=>{
    const cats = getMenuCategories();
    const updated = cats.filter((c)=>c.id !== id);
    localStorage.setItem(MENU_CATS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('menuUpdated'));
};
const getMenuItems = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const stored = localStorage.getItem(MENU_ITEMS_KEY);
    if (!stored) {
        localStorage.setItem(MENU_ITEMS_KEY, JSON.stringify(INITIAL_MENU_ITEMS));
        return INITIAL_MENU_ITEMS;
    }
    return JSON.parse(stored);
};
const saveMenuItem = (item)=>{
    const items = getMenuItems();
    const index = items.findIndex((i)=>i.id === item.id);
    let updated;
    if (index >= 0) {
        updated = items.map((i)=>i.id === item.id ? item : i);
    } else {
        updated = [
            ...items,
            item
        ];
    }
    localStorage.setItem(MENU_ITEMS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('menuUpdated'));
};
const deleteMenuItem = (id)=>{
    const items = getMenuItems();
    const updated = items.filter((i)=>i.id !== id);
    localStorage.setItem(MENU_ITEMS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('menuUpdated'));
};
const useMenu = ()=>{
    _s3();
    const [categories, setCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const refresh = ()=>{
        setCategories(getMenuCategories());
        setItems(getMenuItems());
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useMenu.useEffect": ()=>{
            refresh();
            window.addEventListener('menuUpdated', refresh);
            window.addEventListener('storage', refresh);
            return ({
                "useMenu.useEffect": ()=>{
                    window.removeEventListener('menuUpdated', refresh);
                    window.removeEventListener('storage', refresh);
                }
            })["useMenu.useEffect"];
        }
    }["useMenu.useEffect"], []);
    return {
        categories,
        items,
        saveCategory: saveMenuCategory,
        deleteCategory: deleteMenuCategory,
        saveItem: saveMenuItem,
        deleteItem: deleteMenuItem
    };
};
_s3(useMenu, "iYtYedfOB8Cnw5tFZi3zZvjdIEY=");
const USERS_KEY = 'oye_chatoro_users';
const CURRENT_USER_KEY = 'oye_chatoro_current_user';
const registerUser = (user)=>{
    const users = getUsers();
    if (users.find((u)=>u.email === user.email)) {
        throw new Error('Email already exists');
    }
    const newUser = {
        id: `user_${Date.now()}`,
        ...user,
        favorites: [],
        addresses: [],
        preferences: {
            dietary: [],
            language: 'en'
        },
        paymentMethods: [],
        dates: {
            birthday: '',
            anniversary: ''
        },
        loyalty: {
            points: 0,
            tier: 'Bronze',
            streak: 0,
            badges: []
        },
        referralCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
        notifications: []
    };
    localStorage.setItem(USERS_KEY, JSON.stringify([
        ...users,
        newUser
    ]));
    return newUser;
};
const loginUser = (email, password)=>{
    const users = getUsers();
    const user = users.find((u)=>u.email === email && u.password === password);
    if (!user) {
        throw new Error('Invalid credentials');
    }
    const { password: _, ...safeUser } = user;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));
    window.dispatchEvent(new Event('authUpdated'));
    return safeUser;
};
const logoutUser = ()=>{
    localStorage.removeItem(CURRENT_USER_KEY);
    window.dispatchEvent(new Event('authUpdated'));
};
const getCurrentUser = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const stored = localStorage.getItem(CURRENT_USER_KEY);
    return stored ? JSON.parse(stored) : null;
};
const getUsers = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const stored = localStorage.getItem(USERS_KEY);
    return stored ? JSON.parse(stored) : [];
};
const useAuth = ()=>{
    _s4();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAuth.useEffect": ()=>{
            setUser(getCurrentUser());
            const handleAuthChange = {
                "useAuth.useEffect.handleAuthChange": ()=>{
                    setUser(getCurrentUser());
                }
            }["useAuth.useEffect.handleAuthChange"];
            window.addEventListener('authUpdated', handleAuthChange);
            window.addEventListener('storage', handleAuthChange);
            return ({
                "useAuth.useEffect": ()=>{
                    window.removeEventListener('authUpdated', handleAuthChange);
                    window.removeEventListener('storage', handleAuthChange);
                }
            })["useAuth.useEffect"];
        }
    }["useAuth.useEffect"], []);
    const updateUser = (updates)=>{
        if (!user) return;
        const users = getUsers();
        const index = users.findIndex((u)=>u.id === user.id);
        if (index !== -1) {
            const updatedUser = {
                ...users[index],
                ...updates
            };
            users[index] = updatedUser;
            localStorage.setItem(USERS_KEY, JSON.stringify(users));
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
            window.dispatchEvent(new Event('authUpdated'));
        }
    };
    return {
        user,
        login: loginUser,
        register: registerUser,
        logout: logoutUser,
        updateUser
    };
};
_s4(useAuth, "5s2qRsV95gTJBmaaTh11GoxYeGE=");
const useAllUsers = ()=>{
    _s5();
    const [users, setUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAllUsers.useEffect": ()=>{
            setUsers(getUsers());
            const handleStorage = {
                "useAllUsers.useEffect.handleStorage": ()=>setUsers(getUsers())
            }["useAllUsers.useEffect.handleStorage"];
            window.addEventListener('storage', handleStorage);
            window.addEventListener('authUpdated', handleStorage);
            return ({
                "useAllUsers.useEffect": ()=>{
                    window.removeEventListener('storage', handleStorage);
                    window.removeEventListener('authUpdated', handleStorage);
                }
            })["useAllUsers.useEffect"];
        }
    }["useAllUsers.useEffect"], []);
    return {
        users
    };
};
_s5(useAllUsers, "JadZszbqna06PpJs9hMo7Hl/LOY=");
const CART_KEY = 'oye_chatoro_cart';
const useCart = ()=>{
    _s6();
    const [cart, setCart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useCart.useEffect": ()=>{
            const stored = localStorage.getItem(CART_KEY);
            if (stored) setCart(JSON.parse(stored));
            const handleStorage = {
                "useCart.useEffect.handleStorage": ()=>{
                    const s = localStorage.getItem(CART_KEY);
                    if (s) setCart(JSON.parse(s));
                }
            }["useCart.useEffect.handleStorage"];
            window.addEventListener('storage', handleStorage);
            window.addEventListener('cartUpdated', handleStorage);
            return ({
                "useCart.useEffect": ()=>{
                    window.removeEventListener('storage', handleStorage);
                    window.removeEventListener('cartUpdated', handleStorage);
                }
            })["useCart.useEffect"];
        }
    }["useCart.useEffect"], []);
    const addToCart = (item)=>{
        const newCart = [
            ...cart
        ];
        const existing = newCart.find((i)=>i.name === item.name);
        if (existing) {
            existing.quantity += 1;
        } else {
            newCart.push(item);
        }
        setCart(newCart);
        localStorage.setItem(CART_KEY, JSON.stringify(newCart));
        window.dispatchEvent(new Event('cartUpdated'));
    };
    const removeFromCart = (name)=>{
        const newCart = cart.filter((i)=>i.name !== name);
        setCart(newCart);
        localStorage.setItem(CART_KEY, JSON.stringify(newCart));
        window.dispatchEvent(new Event('cartUpdated'));
    };
    const updateQuantity = (name, delta)=>{
        const newCart = cart.map((item)=>{
            if (item.name === name) {
                return {
                    ...item,
                    quantity: Math.max(0, item.quantity + delta)
                };
            }
            return item;
        }).filter((i)=>i.quantity > 0);
        setCart(newCart);
        localStorage.setItem(CART_KEY, JSON.stringify(newCart));
        window.dispatchEvent(new Event('cartUpdated'));
    };
    const clearCart = ()=>{
        setCart([]);
        localStorage.setItem(CART_KEY, JSON.stringify([]));
        window.dispatchEvent(new Event('cartUpdated'));
    };
    return {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
    };
};
_s6(useCart, "5+HPoxSo1E/C3go3F1eDhM/DDhE=");
const useFavorites = ()=>{
    _s7();
    const { user } = useAuth();
    const [favorites, setFavorites] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useFavorites.useEffect": ()=>{
            if (user && user.favorites) {
                setFavorites(user.favorites);
            } else {
                setFavorites([]);
            }
        }
    }["useFavorites.useEffect"], [
        user
    ]);
    const toggleFavorite = (itemId)=>{
        if (!user) return; // Should prompt login in UI
        const users = JSON.parse(localStorage.getItem('oye_chatoro_users') || '[]');
        const currentUserIndex = users.findIndex((u)=>u.email === user.email);
        if (currentUserIndex === -1) return;
        const currentUser = users[currentUserIndex];
        const newFavorites = currentUser.favorites ? [
            ...currentUser.favorites
        ] : [];
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
        const sessionUser = {
            ...user,
            favorites: newFavorites
        };
        localStorage.setItem('oye_chatoro_current_user', JSON.stringify(sessionUser));
        window.dispatchEvent(new Event('authUpdated'));
    };
    return {
        favorites,
        toggleFavorite
    };
};
_s7(useFavorites, "vAoHyDvH5ybTT7c6EWURi1w+vhg=", false, function() {
    return [
        useAuth
    ];
});
const OFFERS_KEY = 'oye_chatoro_offers';
const INITIAL_OFFERS = [
    {
        id: '1',
        code: 'WELCOME50',
        discount: '50%',
        type: 'Percentage',
        expiry: '2024-12-31',
        status: 'Active',
        usage: 145,
        description: 'Get 50% off on your first order!',
        bgColor: 'from-orange-400 to-red-500'
    },
    {
        id: '2',
        code: 'PIZZALOVER',
        discount: '₹100',
        type: 'Flat',
        expiry: '2024-11-30',
        status: 'Active',
        usage: 89,
        description: 'Flat ₹100 off on all Pizzas',
        bgColor: 'from-blue-400 to-indigo-500'
    },
    {
        id: '3',
        code: 'FREEDRINK',
        discount: 'FREE',
        type: 'Free Item',
        expiry: '2024-10-15',
        status: 'Expired',
        usage: 342,
        description: 'Free Coke with any Pasta',
        bgColor: 'from-green-400 to-emerald-500'
    }
];
const getOffers = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const stored = localStorage.getItem(OFFERS_KEY);
    if (!stored) {
        localStorage.setItem(OFFERS_KEY, JSON.stringify(INITIAL_OFFERS));
        return INITIAL_OFFERS;
    }
    return JSON.parse(stored);
};
const saveOffer = (offer)=>{
    const offers = getOffers();
    const index = offers.findIndex((o)=>o.id === offer.id);
    let updated;
    if (index >= 0) {
        updated = offers.map((o)=>o.id === offer.id ? offer : o);
    } else {
        updated = [
            offer,
            ...offers
        ];
    }
    localStorage.setItem(OFFERS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('offersUpdated'));
};
const deleteOffer = (id)=>{
    const offers = getOffers();
    const updated = offers.filter((o)=>o.id !== id);
    localStorage.setItem(OFFERS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('offersUpdated'));
};
const useOffers = ()=>{
    _s8();
    const [offers, setOffers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const refresh = ()=>{
        setOffers(getOffers());
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useOffers.useEffect": ()=>{
            refresh();
            window.addEventListener('offersUpdated', refresh);
            window.addEventListener('storage', refresh);
            return ({
                "useOffers.useEffect": ()=>{
                    window.removeEventListener('offersUpdated', refresh);
                    window.removeEventListener('storage', refresh);
                }
            })["useOffers.useEffect"];
        }
    }["useOffers.useEffect"], []);
    return {
        offers,
        saveOffer,
        deleteOffer
    };
};
_s8(useOffers, "Z7CtyAKJBhfGFQjjwyUOZuX/dlc=");
const INVENTORY_KEY = 'oye_chatoro_inventory';
const STOCK_LOGS_KEY = 'oye_chatoro_stock_logs';
const WASTAGE_LOGS_KEY = 'oye_chatoro_wastage_logs';
const INITIAL_INVENTORY = [
    {
        id: 1,
        name: 'Pizza Base',
        quantity: 45,
        unit: 'pcs',
        minLevel: 50,
        status: 'Low Stock',
        category: 'Raw Material'
    },
    {
        id: 2,
        name: 'Mozzarella Cheese',
        quantity: 12,
        unit: 'kg',
        minLevel: 5,
        status: 'In Stock',
        category: 'Dairy'
    },
    {
        id: 3,
        name: 'Tomato Sauce',
        quantity: 8,
        unit: 'kg',
        minLevel: 10,
        status: 'Low Stock',
        category: 'Sauces'
    },
    {
        id: 4,
        name: 'Sweet Corn',
        quantity: 5,
        unit: 'kg',
        minLevel: 2,
        status: 'In Stock',
        category: 'Vegetables'
    },
    {
        id: 5,
        name: 'Paneer',
        quantity: 15,
        unit: 'kg',
        minLevel: 5,
        status: 'In Stock',
        category: 'Dairy'
    },
    {
        id: 6,
        name: 'Disposable Plates',
        quantity: 200,
        unit: 'pcs',
        minLevel: 100,
        status: 'In Stock',
        category: 'Packaging'
    }
];
const getInventory = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const stored = localStorage.getItem(INVENTORY_KEY);
    if (!stored) {
        localStorage.setItem(INVENTORY_KEY, JSON.stringify(INITIAL_INVENTORY));
        return INITIAL_INVENTORY;
    }
    return JSON.parse(stored);
};
const getStockLogs = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const stored = localStorage.getItem(STOCK_LOGS_KEY);
    return stored ? JSON.parse(stored) : [];
};
const getWastageLogs = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const stored = localStorage.getItem(WASTAGE_LOGS_KEY);
    return stored ? JSON.parse(stored) : [];
};
const useInventory = ()=>{
    _s9();
    const [inventory, setInventory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [stockLogs, setStockLogs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [wastageLogs, setWastageLogs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const refresh = ()=>{
        setInventory(getInventory());
        setStockLogs(getStockLogs());
        setWastageLogs(getWastageLogs());
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useInventory.useEffect": ()=>{
            refresh();
            window.addEventListener('inventoryUpdated', refresh);
            window.addEventListener('storage', refresh);
            return ({
                "useInventory.useEffect": ()=>{
                    window.removeEventListener('inventoryUpdated', refresh);
                    window.removeEventListener('storage', refresh);
                }
            })["useInventory.useEffect"];
        }
    }["useInventory.useEffect"], []);
    const logStockChange = (itemId, change, reason)=>{
        const logs = getStockLogs();
        const newLog = {
            id: `log_${Date.now()}_${Math.random()}`,
            itemId,
            change,
            reason,
            timestamp: new Date().toISOString(),
            userId: 'Admin' // In a real app, get from auth context
        };
        const updatedLogs = [
            newLog,
            ...logs
        ];
        localStorage.setItem(STOCK_LOGS_KEY, JSON.stringify(updatedLogs));
        setStockLogs(updatedLogs);
    };
    const recordWastage = (itemId, quantity, reason)=>{
        // 1. Reduce Stock
        const currentInv = getInventory();
        const updatedInv = currentInv.map((item)=>{
            if (item.id === itemId) {
                const newQty = Math.max(0, item.quantity - quantity);
                return {
                    ...item,
                    quantity: newQty,
                    status: newQty <= 0 ? 'Out of Stock' : newQty <= item.minLevel ? 'Low Stock' : 'In Stock',
                    lastUpdated: new Date().toISOString()
                };
            }
            return item;
        });
        localStorage.setItem(INVENTORY_KEY, JSON.stringify(updatedInv));
        // 2. Log Wastage
        const logs = getWastageLogs();
        const newLog = {
            id: `waste_${Date.now()}_${Math.random()}`,
            itemId,
            quantity,
            reason,
            timestamp: new Date().toISOString(),
            userId: 'Admin'
        };
        const updatedLogs = [
            newLog,
            ...logs
        ];
        localStorage.setItem(WASTAGE_LOGS_KEY, JSON.stringify(updatedLogs));
        // 3. Log Stock Change (for consistency)
        logStockChange(itemId, -quantity, `Wastage: ${reason}`);
        window.dispatchEvent(new Event('inventoryUpdated'));
    };
    const addItem = (item)=>{
        const current = getInventory();
        const newItem = {
            ...item,
            id: Date.now(),
            status: item.quantity <= 0 ? 'Out of Stock' : item.quantity <= item.minLevel ? 'Low Stock' : 'In Stock',
            lastUpdated: new Date().toISOString()
        };
        const updated = [
            ...current,
            newItem
        ];
        localStorage.setItem(INVENTORY_KEY, JSON.stringify(updated));
        logStockChange(newItem.id, newItem.quantity, 'Initial Stock');
        window.dispatchEvent(new Event('inventoryUpdated'));
    };
    const updateItem = (id, updates)=>{
        const current = getInventory();
        let quantityChange = 0;
        const updated = current.map((item)=>{
            if (item.id === id) {
                if (updates.quantity !== undefined) {
                    quantityChange = updates.quantity - item.quantity;
                }
                const updatedItem = {
                    ...item,
                    ...updates,
                    lastUpdated: new Date().toISOString()
                };
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
    const deleteItem = (id)=>{
        const current = getInventory();
        const updated = current.filter((item)=>item.id !== id);
        localStorage.setItem(INVENTORY_KEY, JSON.stringify(updated));
        window.dispatchEvent(new Event('inventoryUpdated'));
    };
    return {
        inventory,
        stockLogs,
        wastageLogs,
        addItem,
        updateItem,
        deleteItem,
        recordWastage
    };
};
_s9(useInventory, "2b0CQsvtfLI9LcwxHs0e+ivfo1E=");
const deductStockForOrder = (orderItems)=>{
    // Note: orderItems can be strings like "Classic Margherita (1)" 
    // OR objects like { name: "Classic Margherita", quantity: 1, price: 200 }
    // We need to handle both formats
    const menuItems = getMenuItems();
    const inventory = getInventory();
    let inventoryUpdated = false;
    const updatedInventory = inventory.map((invItem)=>{
        let newQuantity = invItem.quantity;
        orderItems.forEach((orderItem)=>{
            let itemName;
            let qty;
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
            const menuItem = menuItems.find((m)=>m.name === itemName);
            if (menuItem && menuItem.recipe) {
                const recipeItem = menuItem.recipe.find((r)=>r.inventoryItemId === invItem.id);
                if (recipeItem) {
                    newQuantity -= recipeItem.quantity * qty;
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
const getAnalyticsData = (range)=>{
    const orders = getOrders();
    const now = new Date();
    let startDate = new Date();
    // 1. Determine Date Range
    switch(range){
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
    const filteredOrders = orders.filter((order)=>{
        const orderDate = new Date(order.createdAt || 0);
        return orderDate >= startDate && order.status !== 'Cancelled';
    });
    // 3. Calculate Summary
    const totalRevenue = filteredOrders.reduce((sum, o)=>sum + o.total, 0);
    const totalOrders = filteredOrders.length;
    const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
    // 4. Revenue Trend (Group by Date)
    const revenueTrendMap = new Map();
    // Initialize last N days with 0
    for(let d = new Date(startDate); d <= now; d.setDate(d.getDate() + 1)){
        revenueTrendMap.set(d.toLocaleDateString(), 0);
    }
    filteredOrders.forEach((order)=>{
        const dateStr = new Date(order.createdAt || 0).toLocaleDateString();
        const current = revenueTrendMap.get(dateStr) || 0;
        revenueTrendMap.set(dateStr, current + order.total);
    });
    const revenueTrend = Array.from(revenueTrendMap.entries()).map(([date, amount])=>({
            date: date.split('/')[0] + '/' + date.split('/')[1],
            amount
        }));
    // 5. Top Selling Items
    const itemSales = new Map();
    filteredOrders.forEach((order)=>{
        order.items.forEach((itemStr)=>{
            const match = itemStr.match(/(.*) \((\d+)\)/);
            if (match) {
                const name = match[1];
                const qty = parseInt(match[2]);
                const current = itemSales.get(name) || {
                    quantity: 0,
                    revenue: 0
                };
                // Estimate item price from total (not perfect but works for analytics demo)
                // Ideally we should look up price from menuItems
                itemSales.set(name, {
                    quantity: current.quantity + qty,
                    revenue: current.revenue // Revenue per item is hard to get without menu lookup, skipping for now
                });
            }
        });
    });
    const topItems = Array.from(itemSales.entries()).map(([name, stats])=>({
            name,
            sales: stats.quantity,
            pct: 0
        })).sort((a, b)=>b.sales - a.sales).slice(0, 5);
    // Calculate percentages for top items
    const maxSales = topItems.length > 0 ? topItems[0].sales : 1;
    topItems.forEach((item)=>item.pct = Math.round(item.sales / maxSales * 100));
    // 6. Peak Hours
    const hoursMap = new Array(24).fill(0);
    filteredOrders.forEach((order)=>{
        const hour = new Date(order.createdAt || 0).getHours();
        hoursMap[hour]++;
    });
    const peakHours = hoursMap.map((count, hour)=>({
            hour,
            count
        }));
    return {
        summary: {
            totalRevenue,
            totalOrders,
            avgOrderValue
        },
        revenueTrend,
        topItems,
        peakHours
    };
};
const SETTINGS_KEY = 'oye_chatoro_settings';
const INITIAL_SETTINGS = {
    name: 'Oye Chatoro',
    address: 'Abu Road, Rajasthan',
    phone: '+91 98765 43210',
    email: 'contact@oyechatoro.com',
    currency: '₹',
    taxRate: 5,
    serviceCharge: 0,
    storeHours: {
        Monday: {
            open: '09:00',
            close: '22:00',
            closed: false
        },
        Tuesday: {
            open: '09:00',
            close: '22:00',
            closed: false
        },
        Wednesday: {
            open: '09:00',
            close: '22:00',
            closed: false
        },
        Thursday: {
            open: '09:00',
            close: '22:00',
            closed: false
        },
        Friday: {
            open: '09:00',
            close: '23:00',
            closed: false
        },
        Saturday: {
            open: '10:00',
            close: '23:00',
            closed: false
        },
        Sunday: {
            open: '10:00',
            close: '23:00',
            closed: false
        }
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
const getSettings = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const stored = localStorage.getItem(SETTINGS_KEY);
    return stored ? {
        ...INITIAL_SETTINGS,
        ...JSON.parse(stored)
    } : INITIAL_SETTINGS;
};
const saveSettings = (settings)=>{
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    window.dispatchEvent(new Event('settingsUpdated'));
};
const useSettings = ()=>{
    _s10();
    const [settings, setSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(INITIAL_SETTINGS);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useSettings.useEffect": ()=>{
            setSettings(getSettings());
            const handleUpdate = {
                "useSettings.useEffect.handleUpdate": ()=>setSettings(getSettings())
            }["useSettings.useEffect.handleUpdate"];
            window.addEventListener('settingsUpdated', handleUpdate);
            window.addEventListener('storage', handleUpdate);
            return ({
                "useSettings.useEffect": ()=>{
                    window.removeEventListener('settingsUpdated', handleUpdate);
                    window.removeEventListener('storage', handleUpdate);
                }
            })["useSettings.useEffect"];
        }
    }["useSettings.useEffect"], []);
    return {
        settings,
        updateSettings: saveSettings
    };
};
_s10(useSettings, "RM+xTjvixWmNTJGpaRPp8a8+Dwc=");
const exportData = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
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
const importData = (jsonString)=>{
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
        return {
            success: true
        };
    } catch (e) {
        console.error('Import failed', e);
        return {
            success: false,
            error: 'Invalid data file'
        };
    }
};
const CUSTOMERS_KEY = 'oye_chatoro_customers';
const INITIAL_CUSTOMERS = [
    {
        id: 'cust_1',
        name: 'Rahul Sharma',
        phone: '9876543210',
        totalOrders: 12,
        totalSpent: 4500,
        loyaltyPoints: 45,
        lastVisit: new Date().toISOString()
    },
    {
        id: 'cust_2',
        name: 'Priya Singh',
        phone: '9876543211',
        totalOrders: 5,
        totalSpent: 1200,
        loyaltyPoints: 12,
        lastVisit: new Date(Date.now() - 86400000).toISOString()
    }
];
const getCustomers = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const stored = localStorage.getItem(CUSTOMERS_KEY);
    if (!stored) {
        localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(INITIAL_CUSTOMERS));
        return INITIAL_CUSTOMERS;
    }
    return JSON.parse(stored);
};
const saveCustomer = (customer)=>{
    const customers = getCustomers();
    const index = customers.findIndex((c)=>c.id === customer.id);
    let updated;
    if (index >= 0) {
        updated = customers.map((c)=>c.id === customer.id ? customer : c);
    } else {
        updated = [
            ...customers,
            customer
        ];
    }
    localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('customersUpdated'));
};
const useCustomers = ()=>{
    _s11();
    const [customers, setCustomers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useCustomers.useEffect": ()=>{
            setCustomers(getCustomers());
            const handleUpdate = {
                "useCustomers.useEffect.handleUpdate": ()=>setCustomers(getCustomers())
            }["useCustomers.useEffect.handleUpdate"];
            window.addEventListener('customersUpdated', handleUpdate);
            window.addEventListener('storage', handleUpdate);
            return ({
                "useCustomers.useEffect": ()=>{
                    window.removeEventListener('customersUpdated', handleUpdate);
                    window.removeEventListener('storage', handleUpdate);
                }
            })["useCustomers.useEffect"];
        }
    }["useCustomers.useEffect"], []);
    return {
        customers,
        saveCustomer
    };
};
_s11(useCustomers, "h68b3hq6gv818inqQQjo1WvNv/E=");
const useUsers = ()=>{
    _s12();
    const [users, setUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const refresh = ()=>setUsers(getUsers());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useUsers.useEffect": ()=>{
            refresh();
            window.addEventListener('authUpdated', refresh);
            window.addEventListener('storage', refresh);
            return ({
                "useUsers.useEffect": ()=>{
                    window.removeEventListener('authUpdated', refresh);
                    window.removeEventListener('storage', refresh);
                }
            })["useUsers.useEffect"];
        }
    }["useUsers.useEffect"], []);
    const addUser = (userData)=>{
        try {
            registerUser(userData);
            refresh();
            return {
                success: true
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    };
    const deleteUser = (id)=>{
        const currentUsers = getUsers();
        const updated = currentUsers.filter((u)=>u.id !== id);
        localStorage.setItem(USERS_KEY, JSON.stringify(updated));
        window.dispatchEvent(new Event('authUpdated'));
        refresh();
    };
    return {
        users,
        addUser,
        deleteUser
    };
};
_s12(useUsers, "JadZszbqna06PpJs9hMo7Hl/LOY=");
const SERVICE_REQUESTS_KEY = 'oyechatoro_service_requests';
const getServiceRequests = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const stored = localStorage.getItem(SERVICE_REQUESTS_KEY);
    return stored ? JSON.parse(stored) : [];
};
const addServiceRequest = (table, type)=>{
    const requests = getServiceRequests();
    const newRequest = {
        id: Date.now(),
        table,
        type,
        status: 'Pending',
        time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        })
    };
    localStorage.setItem(SERVICE_REQUESTS_KEY, JSON.stringify([
        ...requests,
        newRequest
    ]));
    window.dispatchEvent(new Event('serviceRequestsUpdated'));
    window.dispatchEvent(new Event('storage'));
};
const updateServiceRequestStatus = (id, status)=>{
    const requests = getServiceRequests();
    const updated = requests.map((r)=>r.id === id ? {
            ...r,
            status
        } : r);
    localStorage.setItem(SERVICE_REQUESTS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('serviceRequestsUpdated'));
    window.dispatchEvent(new Event('storage'));
};
const useServiceRequests = ()=>{
    _s13();
    const [requests, setRequests] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const refresh = ()=>{
        setRequests(getServiceRequests());
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useServiceRequests.useEffect": ()=>{
            refresh();
            window.addEventListener('serviceRequestsUpdated', refresh);
            window.addEventListener('storage', refresh);
            return ({
                "useServiceRequests.useEffect": ()=>{
                    window.removeEventListener('serviceRequestsUpdated', refresh);
                    window.removeEventListener('storage', refresh);
                }
            })["useServiceRequests.useEffect"];
        }
    }["useServiceRequests.useEffect"], []);
    return {
        requests,
        addRequest: addServiceRequest,
        updateStatus: updateServiceRequestStatus
    };
};
_s13(useServiceRequests, "MIcAFnHRaJFubpcUtYXSDqOxSqY=");
const getMenuEngineeringData = ()=>{
    const items = getMenuItems();
    const orders = getOrders();
    // Calculate Sales and Profit for each item
    const itemStats = items.map((item)=>{
        const itemOrders = orders.flatMap((o)=>o.items).filter((i)=>i.includes(item.name)); // Simple name match for now
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
    const avgSales = itemStats.reduce((sum, i)=>sum + i.sales, 0) / (itemStats.length || 1);
    const avgMargin = itemStats.reduce((sum, i)=>sum + i.margin, 0) / (itemStats.length || 1);
    const classifiedItems = itemStats.map((item)=>{
        const isHighVolume = item.sales >= avgSales;
        const isHighMargin = item.margin >= avgMargin;
        let category = 'Dog';
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
        stars: items.filter((i)=>classifiedItems.find((c)=>c.id === i.id)?.category === 'Star'),
        plowhorses: items.filter((i)=>classifiedItems.find((c)=>c.id === i.id)?.category === 'Plowhorse'),
        puzzles: items.filter((i)=>classifiedItems.find((c)=>c.id === i.id)?.category === 'Puzzle'),
        dogs: items.filter((i)=>classifiedItems.find((c)=>c.id === i.id)?.category === 'Dog'),
        items: classifiedItems
    };
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/menu/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MenuPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/storage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function MenuPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { categories, items } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMenu"])();
    const { settings } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSettings"])();
    const [cart, setCart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isCartOpen, setIsCartOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showToast, setShowToast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [activeSection, setActiveSection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [scrolled, setScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [tableNumber, setTableNumber] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isServiceModalOpen, setIsServiceModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const navRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MenuPage.useEffect": ()=>{
            setMounted(true);
            if (categories.length > 0) {
                setActiveSection(categories[0].id);
            }
            if ("TURBOPACK compile-time truthy", 1) {
                const params = new URLSearchParams(window.location.search);
                const table = params.get('table');
                if (table) setTableNumber(table);
                const handleScroll = {
                    "MenuPage.useEffect.handleScroll": ()=>setScrolled(window.scrollY > 50)
                }["MenuPage.useEffect.handleScroll"];
                window.addEventListener('scroll', handleScroll);
                return ({
                    "MenuPage.useEffect": ()=>window.removeEventListener('scroll', handleScroll)
                })["MenuPage.useEffect"];
            }
        }
    }["MenuPage.useEffect"], [
        categories
    ]);
    const digitalMenuItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MenuPage.useMemo[digitalMenuItems]": ()=>{
            return items.filter({
                "MenuPage.useMemo[digitalMenuItems]": (item)=>item.isDigitalMenu !== false && item.status === 'Active'
            }["MenuPage.useMemo[digitalMenuItems]"]);
        }
    }["MenuPage.useMemo[digitalMenuItems]"], [
        items
    ]);
    const filteredItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MenuPage.useMemo[filteredItems]": ()=>{
            if (!searchQuery) return digitalMenuItems;
            const lowerQuery = searchQuery.toLowerCase();
            return digitalMenuItems.filter({
                "MenuPage.useMemo[filteredItems]": (item)=>item.name.toLowerCase().includes(lowerQuery) || item.description.toLowerCase().includes(lowerQuery)
            }["MenuPage.useMemo[filteredItems]"]);
        }
    }["MenuPage.useMemo[filteredItems]"], [
        digitalMenuItems,
        searchQuery
    ]);
    const groupedItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MenuPage.useMemo[groupedItems]": ()=>{
            const grouped = {};
            categories.forEach({
                "MenuPage.useMemo[groupedItems]": (cat)=>{
                    const catItems = filteredItems.filter({
                        "MenuPage.useMemo[groupedItems].catItems": (item)=>item.categoryId === cat.id
                    }["MenuPage.useMemo[groupedItems].catItems"]);
                    if (catItems.length > 0) grouped[cat.id] = catItems;
                }
            }["MenuPage.useMemo[groupedItems]"]);
            return grouped;
        }
    }["MenuPage.useMemo[groupedItems]"], [
        categories,
        filteredItems
    ]);
    if (mounted && settings.digitalMenu?.isActive === false) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4 text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-4xl font-bold mb-4",
                    children: "We'll be back soon! 👨‍🍳"
                }, void 0, false, {
                    fileName: "[project]/app/menu/page.tsx",
                    lineNumber: 75,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-lg text-gray-400",
                    children: "Our digital menu is currently undergoing maintenance."
                }, void 0, false, {
                    fileName: "[project]/app/menu/page.tsx",
                    lineNumber: 76,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/menu/page.tsx",
            lineNumber: 74,
            columnNumber: 13
        }, this);
    }
    const addToCart = (item)=>{
        setCart((prev)=>{
            const existing = prev.find((i)=>i.id === item.id);
            if (existing) return prev.map((i)=>i.id === item.id ? {
                    ...i,
                    quantity: i.quantity + 1
                } : i);
            return [
                ...prev,
                {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: 1,
                    veg: item.veg
                }
            ];
        });
        setShowToast(true);
        setTimeout(()=>setShowToast(false), 2000);
    };
    const removeFromCart = (itemId)=>{
        setCart((prev)=>{
            const existing = prev.find((i)=>i.id === itemId);
            if (existing && existing.quantity > 1) return prev.map((i)=>i.id === itemId ? {
                    ...i,
                    quantity: i.quantity - 1
                } : i);
            return prev.filter((i)=>i.id !== itemId);
        });
    };
    const getItemQty = (itemId)=>cart.find((i)=>i.id === itemId)?.quantity || 0;
    const cartTotal = cart.reduce((sum, item)=>sum + item.price * item.quantity, 0);
    const cartCount = cart.reduce((sum, item)=>sum + item.quantity, 0);
    const checkout = ()=>{
        if (cart.length === 0) return;
        let message = `New Order from Table ${tableNumber || 'Unknown'}:\n\n`;
        cart.forEach((item)=>message += `- ${item.quantity}x ${item.name} - ₹${item.price * item.quantity}\n`);
        message += `\n*Total: ₹${cartTotal}*`;
        window.open(`https://wa.me/919509913792?text=${encodeURIComponent(message)}`, '_blank');
    };
    const handleServiceRequest = (type)=>{
        if (tableNumber) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addServiceRequest"])(tableNumber, type);
            alert(`Request sent: ${type}`);
            setIsServiceModalOpen(false);
        }
    };
    const scrollToCategory = (catId)=>{
        setActiveSection(catId);
        const element = document.getElementById(catId);
        if (element) {
            const offset = 200;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };
    if (!mounted) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-e25430e4eade86f4" + " " + "min-h-screen bg-[#0a0a0a] text-white font-sans relative overflow-x-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-e25430e4eade86f4" + " " + "fixed inset-0 z-0 pointer-events-none",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-e25430e4eade86f4" + " " + "absolute top-0 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full filter blur-[150px] animate-pulse"
                    }, void 0, false, {
                        fileName: "[project]/app/menu/page.tsx",
                        lineNumber: 136,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            animationDelay: '1s'
                        },
                        className: "jsx-e25430e4eade86f4" + " " + "absolute bottom-1/4 right-1/4 w-80 h-80 bg-red-500/15 rounded-full filter blur-[120px] animate-pulse"
                    }, void 0, false, {
                        fileName: "[project]/app/menu/page.tsx",
                        lineNumber: 137,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            animationDelay: '2s'
                        },
                        className: "jsx-e25430e4eade86f4" + " " + "absolute top-1/2 left-1/2 w-72 h-72 bg-amber-500/10 rounded-full filter blur-[100px] animate-pulse"
                    }, void 0, false, {
                        fileName: "[project]/app/menu/page.tsx",
                        lineNumber: 138,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/menu/page.tsx",
                lineNumber: 135,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "e25430e4eade86f4",
                children: '@import "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap";body{font-family:Poppins,sans-serif}@keyframes float{0%,to{transform:translateY(0)}50%{transform:translateY(-10px)}}@keyframes slideUp{0%{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}@keyframes glow{0%,to{box-shadow:0 0 20px #f973164d}50%{box-shadow:0 0 40px #f9731680}}.animate-float{animation:3s ease-in-out infinite float}.animate-slide-up{animation:.6s ease-out forwards slideUp}.animate-glow{animation:2s ease-in-out infinite glow}.glass{-webkit-backdrop-filter:blur(20px);background:#ffffff0d;border:1px solid #ffffff1a}.glass-dark{-webkit-backdrop-filter:blur(20px);background:#0006;border:1px solid #ffffff1a}.gradient-text{color:#0000;background:linear-gradient(135deg,#f97316,#ef4444,#f59e0b);-webkit-background-clip:text;background-clip:text}.gradient-border{background:linear-gradient(135deg,#f973164d,#ef44444d);padding:1px}.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}'
            }, void 0, false, void 0, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "jsx-e25430e4eade86f4" + " " + "relative h-80 w-full overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-e25430e4eade86f4" + " " + "absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-[#0a0a0a] z-10"
                    }, void 0, false, {
                        fileName: "[project]/app/menu/page.tsx",
                        lineNumber: 160,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            backgroundImage: settings.digitalMenu?.bannerImage ? `url(${settings.digitalMenu.bannerImage})` : 'url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80)'
                        },
                        className: "jsx-e25430e4eade86f4" + " " + "absolute inset-0 bg-cover bg-center scale-110"
                    }, void 0, false, {
                        fileName: "[project]/app/menu/page.tsx",
                        lineNumber: 161,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-e25430e4eade86f4" + " " + "relative z-20 h-full flex flex-col items-center justify-center text-white p-4 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-e25430e4eade86f4" + " " + "w-28 h-28 rounded-full glass border-2 border-orange-500/30 overflow-hidden mb-4 shadow-2xl animate-float animate-glow",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: "/logowhite.PNG",
                                    alt: "Oye Chatoro",
                                    width: 112,
                                    height: 112,
                                    className: "object-cover w-full h-full"
                                }, void 0, false, {
                                    fileName: "[project]/app/menu/page.tsx",
                                    lineNumber: 171,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/menu/page.tsx",
                                lineNumber: 170,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "jsx-e25430e4eade86f4" + " " + "text-5xl font-black mb-2 gradient-text drop-shadow-2xl",
                                children: "Oye Chatoro"
                            }, void 0, false, {
                                fileName: "[project]/app/menu/page.tsx",
                                lineNumber: 173,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "jsx-e25430e4eade86f4" + " " + "text-white/70 text-sm font-medium tracking-widest uppercase",
                                children: "Premium Street Food Experience"
                            }, void 0, false, {
                                fileName: "[project]/app/menu/page.tsx",
                                lineNumber: 174,
                                columnNumber: 21
                            }, this),
                            tableNumber && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-e25430e4eade86f4" + " " + "mt-4 glass px-6 py-2 rounded-full text-sm font-bold border border-orange-500/30 shadow-lg",
                                children: [
                                    "🪑 Table ",
                                    tableNumber
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/menu/page.tsx",
                                lineNumber: 176,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/menu/page.tsx",
                        lineNumber: 169,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>router.push('/'),
                        className: "jsx-e25430e4eade86f4" + " " + "absolute top-4 left-4 z-30 p-3 glass-dark rounded-full text-white hover:bg-white/10 transition-all",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            width: "20",
                            height: "20",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            strokeWidth: "2.5",
                            className: "jsx-e25430e4eade86f4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M19 12H5M12 19l-7-7 7-7",
                                className: "jsx-e25430e4eade86f4"
                            }, void 0, false, {
                                fileName: "[project]/app/menu/page.tsx",
                                lineNumber: 185,
                                columnNumber: 121
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/menu/page.tsx",
                            lineNumber: 185,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/menu/page.tsx",
                        lineNumber: 181,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/menu/page.tsx",
                lineNumber: 159,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-e25430e4eade86f4" + " " + `sticky top-0 z-40 transition-all duration-500 ${scrolled ? 'glass-dark shadow-2xl' : ''}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-e25430e4eade86f4" + " " + "p-4 pb-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-e25430e4eade86f4" + " " + "relative max-w-2xl mx-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    placeholder: "Search your favorite dish...",
                                    value: searchQuery,
                                    onChange: (e)=>setSearchQuery(e.target.value),
                                    className: "jsx-e25430e4eade86f4" + " " + "w-full pl-14 pr-6 py-4 rounded-2xl glass text-white placeholder-white/40 outline-none focus:border-orange-500/50 transition-all text-base font-medium"
                                }, void 0, false, {
                                    fileName: "[project]/app/menu/page.tsx",
                                    lineNumber: 193,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-e25430e4eade86f4" + " " + "absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        viewBox: "0 0 24 24",
                                        fill: "none",
                                        stroke: "currentColor",
                                        strokeWidth: "2.5",
                                        className: "jsx-e25430e4eade86f4" + " " + "w-4 h-4 text-white",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                cx: "11",
                                                cy: "11",
                                                r: "8",
                                                className: "jsx-e25430e4eade86f4"
                                            }, void 0, false, {
                                                fileName: "[project]/app/menu/page.tsx",
                                                lineNumber: 201,
                                                columnNumber: 137
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M21 21l-4.35-4.35",
                                                className: "jsx-e25430e4eade86f4"
                                            }, void 0, false, {
                                                fileName: "[project]/app/menu/page.tsx",
                                                lineNumber: 201,
                                                columnNumber: 169
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/menu/page.tsx",
                                        lineNumber: 201,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/menu/page.tsx",
                                    lineNumber: 200,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/menu/page.tsx",
                            lineNumber: 192,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/menu/page.tsx",
                        lineNumber: 191,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        ref: navRef,
                        className: "jsx-e25430e4eade86f4" + " " + "flex overflow-x-auto px-4 pb-4 gap-3 no-scrollbar scroll-smooth",
                        children: categories.map((cat, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>scrollToCategory(cat.id),
                                style: {
                                    animationDelay: `${i * 0.05}s`
                                },
                                className: "jsx-e25430e4eade86f4" + " " + `animate-slide-up whitespace-nowrap px-6 py-3 rounded-2xl text-sm font-bold transition-all flex-shrink-0 ${activeSection === cat.id ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30 scale-105' : 'glass text-white/70 hover:text-white hover:bg-white/10'}`,
                                children: cat.name
                            }, cat.id, false, {
                                fileName: "[project]/app/menu/page.tsx",
                                lineNumber: 208,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/menu/page.tsx",
                        lineNumber: 206,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/menu/page.tsx",
                lineNumber: 190,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "jsx-e25430e4eade86f4" + " " + "relative z-10 p-4 pb-36 max-w-4xl mx-auto",
                children: Object.keys(groupedItems).length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-e25430e4eade86f4" + " " + "text-center py-24 animate-slide-up",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-e25430e4eade86f4" + " " + "text-9xl mb-8 animate-float",
                            children: "🍕"
                        }, void 0, false, {
                            fileName: "[project]/app/menu/page.tsx",
                            lineNumber: 227,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "jsx-e25430e4eade86f4" + " " + "text-2xl font-bold mb-2",
                            children: "No dishes found"
                        }, void 0, false, {
                            fileName: "[project]/app/menu/page.tsx",
                            lineNumber: 228,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "jsx-e25430e4eade86f4" + " " + "text-white/50",
                            children: "Try searching for something else"
                        }, void 0, false, {
                            fileName: "[project]/app/menu/page.tsx",
                            lineNumber: 229,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/menu/page.tsx",
                    lineNumber: 226,
                    columnNumber: 21
                }, this) : categories.map((cat, catIndex)=>{
                    const catItems = groupedItems[cat.id];
                    if (!catItems) return null;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        id: cat.id,
                        className: "jsx-e25430e4eade86f4" + " " + "mb-12 scroll-mt-52",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    animationDelay: `${catIndex * 0.1}s`
                                },
                                className: "jsx-e25430e4eade86f4" + " " + "flex items-center gap-4 mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-e25430e4eade86f4" + " " + "h-px flex-1 bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"
                                    }, void 0, false, {
                                        fileName: "[project]/app/menu/page.tsx",
                                        lineNumber: 239,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "jsx-e25430e4eade86f4" + " " + "text-2xl font-black gradient-text uppercase tracking-wider",
                                        children: cat.name
                                    }, void 0, false, {
                                        fileName: "[project]/app/menu/page.tsx",
                                        lineNumber: 240,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-e25430e4eade86f4" + " " + "glass px-3 py-1 rounded-full text-xs font-bold text-orange-400",
                                        children: catItems.length
                                    }, void 0, false, {
                                        fileName: "[project]/app/menu/page.tsx",
                                        lineNumber: 241,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-e25430e4eade86f4" + " " + "h-px flex-1 bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"
                                    }, void 0, false, {
                                        fileName: "[project]/app/menu/page.tsx",
                                        lineNumber: 242,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/menu/page.tsx",
                                lineNumber: 238,
                                columnNumber: 33
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-e25430e4eade86f4" + " " + "grid grid-cols-1 md:grid-cols-2 gap-4",
                                children: catItems.map((item, itemIndex)=>{
                                    const qty = getItemQty(item.id);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            animationDelay: `${itemIndex * 0.05}s`
                                        },
                                        className: "jsx-e25430e4eade86f4" + " " + "animate-slide-up glass rounded-3xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:border-orange-500/30 group",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-e25430e4eade86f4" + " " + "flex h-full",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-e25430e4eade86f4" + " " + "w-32 h-36 flex-shrink-0 relative overflow-hidden",
                                                    children: [
                                                        item.image ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            src: item.image,
                                                            alt: item.name,
                                                            fill: true,
                                                            className: "object-cover transition-transform duration-500 group-hover:scale-110",
                                                            sizes: "128px"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/menu/page.tsx",
                                                            lineNumber: 258,
                                                            columnNumber: 61
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-e25430e4eade86f4" + " " + "w-full h-full flex items-center justify-center bg-white/5 text-4xl",
                                                            children: "🥘"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/menu/page.tsx",
                                                            lineNumber: 260,
                                                            columnNumber: 61
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-e25430e4eade86f4" + " " + "absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a]/80"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/menu/page.tsx",
                                                            lineNumber: 262,
                                                            columnNumber: 57
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/menu/page.tsx",
                                                    lineNumber: 256,
                                                    columnNumber: 53
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-e25430e4eade86f4" + " " + "flex-1 p-4 flex flex-col justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-e25430e4eade86f4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-e25430e4eade86f4" + " " + "flex items-center gap-2 mb-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "jsx-e25430e4eade86f4" + " " + `w-4 h-4 rounded flex items-center justify-center border-2 ${item.veg ? 'border-green-500' : 'border-red-500'}`,
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "jsx-e25430e4eade86f4" + " " + `w-2 h-2 rounded-full ${item.veg ? 'bg-green-500' : 'bg-red-500'}`
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/menu/page.tsx",
                                                                                lineNumber: 270,
                                                                                columnNumber: 69
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/menu/page.tsx",
                                                                            lineNumber: 269,
                                                                            columnNumber: 65
                                                                        }, this),
                                                                        item.isFeatured && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "jsx-e25430e4eade86f4" + " " + "text-[9px] font-black bg-gradient-to-r from-orange-500 to-red-500 px-2 py-0.5 rounded-full uppercase tracking-wider",
                                                                            children: "⭐ Best"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/menu/page.tsx",
                                                                            lineNumber: 273,
                                                                            columnNumber: 69
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/menu/page.tsx",
                                                                    lineNumber: 268,
                                                                    columnNumber: 61
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                    className: "jsx-e25430e4eade86f4" + " " + "font-bold text-base mb-1 text-white leading-tight line-clamp-1",
                                                                    children: item.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/menu/page.tsx",
                                                                    lineNumber: 278,
                                                                    columnNumber: 61
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "jsx-e25430e4eade86f4" + " " + "text-xs text-white/40 line-clamp-2 mb-2",
                                                                    children: item.description
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/menu/page.tsx",
                                                                    lineNumber: 279,
                                                                    columnNumber: 61
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/menu/page.tsx",
                                                            lineNumber: 267,
                                                            columnNumber: 57
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-e25430e4eade86f4" + " " + "flex items-center justify-between",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "jsx-e25430e4eade86f4" + " " + "text-xl font-black gradient-text",
                                                                    children: [
                                                                        "₹",
                                                                        item.price
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/menu/page.tsx",
                                                                    lineNumber: 283,
                                                                    columnNumber: 61
                                                                }, this),
                                                                qty === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>addToCart(item),
                                                                    className: "jsx-e25430e4eade86f4" + " " + "px-5 py-2 rounded-xl font-bold text-xs bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30 active:scale-95 transition-all uppercase tracking-wide hover:shadow-orange-500/50",
                                                                    children: "ADD"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/menu/page.tsx",
                                                                    lineNumber: 286,
                                                                    columnNumber: 65
                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-e25430e4eade86f4" + " " + "flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg shadow-orange-500/30 overflow-hidden",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>removeFromCart(item.id),
                                                                            className: "jsx-e25430e4eade86f4" + " " + "w-9 h-9 flex items-center justify-center hover:bg-white/20 font-bold text-lg transition-colors",
                                                                            children: "−"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/menu/page.tsx",
                                                                            lineNumber: 294,
                                                                            columnNumber: 69
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "jsx-e25430e4eade86f4" + " " + "w-6 text-center font-black text-sm",
                                                                            children: qty
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/menu/page.tsx",
                                                                            lineNumber: 295,
                                                                            columnNumber: 69
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>addToCart(item),
                                                                            className: "jsx-e25430e4eade86f4" + " " + "w-9 h-9 flex items-center justify-center hover:bg-white/20 font-bold text-lg transition-colors",
                                                                            children: "+"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/menu/page.tsx",
                                                                            lineNumber: 296,
                                                                            columnNumber: 69
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/menu/page.tsx",
                                                                    lineNumber: 293,
                                                                    columnNumber: 65
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/menu/page.tsx",
                                                            lineNumber: 282,
                                                            columnNumber: 57
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/menu/page.tsx",
                                                    lineNumber: 266,
                                                    columnNumber: 53
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/menu/page.tsx",
                                            lineNumber: 254,
                                            columnNumber: 49
                                        }, this)
                                    }, item.id, false, {
                                        fileName: "[project]/app/menu/page.tsx",
                                        lineNumber: 249,
                                        columnNumber: 45
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/app/menu/page.tsx",
                                lineNumber: 245,
                                columnNumber: 33
                            }, this)
                        ]
                    }, cat.id, true, {
                        fileName: "[project]/app/menu/page.tsx",
                        lineNumber: 237,
                        columnNumber: 29
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/app/menu/page.tsx",
                lineNumber: 224,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-e25430e4eade86f4" + " " + "fixed bottom-6 right-6 flex flex-col gap-4 z-50",
                children: [
                    tableNumber && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setIsServiceModalOpen(true),
                        className: "jsx-e25430e4eade86f4" + " " + "w-14 h-14 glass-dark rounded-full shadow-2xl flex items-center justify-center active:scale-95 transition-all animate-float text-2xl",
                        children: "🔔"
                    }, void 0, false, {
                        fileName: "[project]/app/menu/page.tsx",
                        lineNumber: 315,
                        columnNumber: 21
                    }, this),
                    cartCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setIsCartOpen(true),
                        className: "jsx-e25430e4eade86f4" + " " + "h-16 px-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-2xl shadow-orange-500/40 flex items-center gap-4 active:scale-95 transition-all animate-glow",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-e25430e4eade86f4" + " " + "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-e25430e4eade86f4" + " " + "text-2xl",
                                        children: "🛒"
                                    }, void 0, false, {
                                        fileName: "[project]/app/menu/page.tsx",
                                        lineNumber: 321,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-e25430e4eade86f4" + " " + "absolute -top-2 -right-2 bg-white text-orange-600 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center",
                                        children: cartCount
                                    }, void 0, false, {
                                        fileName: "[project]/app/menu/page.tsx",
                                        lineNumber: 322,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/menu/page.tsx",
                                lineNumber: 320,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-e25430e4eade86f4" + " " + "text-left",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-e25430e4eade86f4" + " " + "text-[10px] font-medium opacity-80 uppercase tracking-wider",
                                        children: "View Cart"
                                    }, void 0, false, {
                                        fileName: "[project]/app/menu/page.tsx",
                                        lineNumber: 325,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-e25430e4eade86f4" + " " + "font-black text-lg",
                                        children: [
                                            "₹",
                                            cartTotal
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/menu/page.tsx",
                                        lineNumber: 326,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/menu/page.tsx",
                                lineNumber: 324,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/menu/page.tsx",
                        lineNumber: 319,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/menu/page.tsx",
                lineNumber: 313,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-e25430e4eade86f4" + " " + `fixed bottom-24 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-2xl shadow-2xl shadow-green-500/30 flex items-center gap-3 z-[60] transition-all duration-500 ${showToast ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95 pointer-events-none'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "jsx-e25430e4eade86f4" + " " + "text-2xl",
                        children: "✓"
                    }, void 0, false, {
                        fileName: "[project]/app/menu/page.tsx",
                        lineNumber: 334,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "jsx-e25430e4eade86f4" + " " + "font-bold",
                        children: "Added to cart!"
                    }, void 0, false, {
                        fileName: "[project]/app/menu/page.tsx",
                        lineNumber: 335,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/menu/page.tsx",
                lineNumber: 333,
                columnNumber: 13
            }, this),
            isServiceModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: (e)=>{
                    if (e.target === e.currentTarget) setIsServiceModalOpen(false);
                },
                className: "jsx-e25430e4eade86f4" + " " + "fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-e25430e4eade86f4" + " " + "glass rounded-3xl p-8 w-full max-w-sm text-center shadow-2xl animate-slide-up border border-orange-500/20",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "jsx-e25430e4eade86f4" + " " + "text-2xl font-black mb-8 gradient-text",
                            children: "Need Help?"
                        }, void 0, false, {
                            fileName: "[project]/app/menu/page.tsx",
                            lineNumber: 342,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-e25430e4eade86f4" + " " + "grid grid-cols-3 gap-4 mb-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleServiceRequest('Call'),
                                    className: "jsx-e25430e4eade86f4" + " " + "flex flex-col items-center gap-3 p-4 rounded-2xl glass hover:bg-white/10 transition-all active:scale-95",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-e25430e4eade86f4" + " " + "text-4xl",
                                            children: "👋"
                                        }, void 0, false, {
                                            fileName: "[project]/app/menu/page.tsx",
                                            lineNumber: 345,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-e25430e4eade86f4" + " " + "text-xs font-bold uppercase tracking-wider text-blue-400",
                                            children: "Call"
                                        }, void 0, false, {
                                            fileName: "[project]/app/menu/page.tsx",
                                            lineNumber: 346,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/menu/page.tsx",
                                    lineNumber: 344,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleServiceRequest('Water'),
                                    className: "jsx-e25430e4eade86f4" + " " + "flex flex-col items-center gap-3 p-4 rounded-2xl glass hover:bg-white/10 transition-all active:scale-95",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-e25430e4eade86f4" + " " + "text-4xl",
                                            children: "💧"
                                        }, void 0, false, {
                                            fileName: "[project]/app/menu/page.tsx",
                                            lineNumber: 349,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-e25430e4eade86f4" + " " + "text-xs font-bold uppercase tracking-wider text-cyan-400",
                                            children: "Water"
                                        }, void 0, false, {
                                            fileName: "[project]/app/menu/page.tsx",
                                            lineNumber: 350,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/menu/page.tsx",
                                    lineNumber: 348,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleServiceRequest('Bill'),
                                    className: "jsx-e25430e4eade86f4" + " " + "flex flex-col items-center gap-3 p-4 rounded-2xl glass hover:bg-white/10 transition-all active:scale-95",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-e25430e4eade86f4" + " " + "text-4xl",
                                            children: "🧾"
                                        }, void 0, false, {
                                            fileName: "[project]/app/menu/page.tsx",
                                            lineNumber: 353,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-e25430e4eade86f4" + " " + "text-xs font-bold uppercase tracking-wider text-green-400",
                                            children: "Bill"
                                        }, void 0, false, {
                                            fileName: "[project]/app/menu/page.tsx",
                                            lineNumber: 354,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/menu/page.tsx",
                                    lineNumber: 352,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/menu/page.tsx",
                            lineNumber: 343,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setIsServiceModalOpen(false),
                            className: "jsx-e25430e4eade86f4" + " " + "w-full py-4 rounded-2xl font-bold glass hover:bg-white/10 transition-all text-white/70",
                            children: "Cancel"
                        }, void 0, false, {
                            fileName: "[project]/app/menu/page.tsx",
                            lineNumber: 357,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/menu/page.tsx",
                    lineNumber: 341,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/menu/page.tsx",
                lineNumber: 340,
                columnNumber: 17
            }, this),
            isCartOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: (e)=>{
                    if (e.target === e.currentTarget) setIsCartOpen(false);
                },
                className: "jsx-e25430e4eade86f4" + " " + "fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex justify-end",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-e25430e4eade86f4" + " " + "w-full max-w-md h-full glass-dark flex flex-col shadow-2xl animate-slide-up border-l border-orange-500/20",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-e25430e4eade86f4" + " " + "p-6 border-b border-white/10 flex justify-between items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "jsx-e25430e4eade86f4" + " " + "text-2xl font-black gradient-text",
                                    children: "Your Order"
                                }, void 0, false, {
                                    fileName: "[project]/app/menu/page.tsx",
                                    lineNumber: 367,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setIsCartOpen(false),
                                    className: "jsx-e25430e4eade86f4" + " " + "w-10 h-10 glass rounded-full flex items-center justify-center text-xl font-bold hover:bg-white/10 transition-all",
                                    children: "×"
                                }, void 0, false, {
                                    fileName: "[project]/app/menu/page.tsx",
                                    lineNumber: 368,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/menu/page.tsx",
                            lineNumber: 366,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-e25430e4eade86f4" + " " + "flex-1 overflow-y-auto p-6 space-y-4",
                            children: [
                                cart.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-e25430e4eade86f4" + " " + "flex gap-4 items-center p-4 glass rounded-2xl",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-e25430e4eade86f4" + " " + `w-4 h-4 rounded flex items-center justify-center border-2 flex-shrink-0 ${item.veg ? 'border-green-500' : 'border-red-500'}`,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-e25430e4eade86f4" + " " + `w-2 h-2 rounded-full ${item.veg ? 'bg-green-500' : 'bg-red-500'}`
                                                }, void 0, false, {
                                                    fileName: "[project]/app/menu/page.tsx",
                                                    lineNumber: 375,
                                                    columnNumber: 41
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/menu/page.tsx",
                                                lineNumber: 374,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-e25430e4eade86f4" + " " + "flex-1 min-w-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-e25430e4eade86f4" + " " + "font-bold truncate",
                                                        children: item.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/menu/page.tsx",
                                                        lineNumber: 378,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-e25430e4eade86f4" + " " + "text-sm text-orange-400 font-bold",
                                                        children: [
                                                            "₹",
                                                            item.price
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/menu/page.tsx",
                                                        lineNumber: 379,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/menu/page.tsx",
                                                lineNumber: 377,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-e25430e4eade86f4" + " " + "flex items-center gap-1 glass rounded-xl p-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>removeFromCart(item.id),
                                                        className: "jsx-e25430e4eade86f4" + " " + "w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-lg font-bold transition-colors",
                                                        children: "−"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/menu/page.tsx",
                                                        lineNumber: 382,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "jsx-e25430e4eade86f4" + " " + "font-bold text-sm w-6 text-center",
                                                        children: item.quantity
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/menu/page.tsx",
                                                        lineNumber: 383,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>addToCart(item),
                                                        className: "jsx-e25430e4eade86f4" + " " + "w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-lg font-bold transition-colors",
                                                        children: "+"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/menu/page.tsx",
                                                        lineNumber: 384,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/menu/page.tsx",
                                                lineNumber: 381,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-e25430e4eade86f4" + " " + "font-black text-lg w-16 text-right gradient-text",
                                                children: [
                                                    "₹",
                                                    item.price * item.quantity
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/menu/page.tsx",
                                                lineNumber: 386,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, item.id, true, {
                                        fileName: "[project]/app/menu/page.tsx",
                                        lineNumber: 373,
                                        columnNumber: 33
                                    }, this)),
                                cart.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-e25430e4eade86f4" + " " + "flex flex-col items-center justify-center h-64",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-e25430e4eade86f4" + " " + "text-8xl mb-6 animate-float",
                                            children: "🛒"
                                        }, void 0, false, {
                                            fileName: "[project]/app/menu/page.tsx",
                                            lineNumber: 391,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-e25430e4eade86f4" + " " + "text-xl font-bold mb-2",
                                            children: "Cart is empty"
                                        }, void 0, false, {
                                            fileName: "[project]/app/menu/page.tsx",
                                            lineNumber: 392,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setIsCartOpen(false),
                                            className: "jsx-e25430e4eade86f4" + " " + "mt-4 text-orange-500 font-bold hover:underline",
                                            children: "Browse Menu"
                                        }, void 0, false, {
                                            fileName: "[project]/app/menu/page.tsx",
                                            lineNumber: 393,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/menu/page.tsx",
                                    lineNumber: 390,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/menu/page.tsx",
                            lineNumber: 371,
                            columnNumber: 25
                        }, this),
                        cart.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-e25430e4eade86f4" + " " + "p-6 border-t border-white/10 glass-dark",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-e25430e4eade86f4" + " " + "flex justify-between items-center mb-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-e25430e4eade86f4" + " " + "text-lg font-bold text-white/70",
                                            children: "Total"
                                        }, void 0, false, {
                                            fileName: "[project]/app/menu/page.tsx",
                                            lineNumber: 401,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-e25430e4eade86f4" + " " + "text-4xl font-black gradient-text",
                                            children: [
                                                "₹",
                                                cartTotal
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/menu/page.tsx",
                                            lineNumber: 402,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/menu/page.tsx",
                                    lineNumber: 400,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: checkout,
                                    className: "jsx-e25430e4eade86f4" + " " + "w-full py-5 bg-gradient-to-r from-orange-500 to-red-500 font-black text-xl rounded-2xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 active:scale-[0.98] transition-all flex items-center justify-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-e25430e4eade86f4",
                                            children: "Place Order"
                                        }, void 0, false, {
                                            fileName: "[project]/app/menu/page.tsx",
                                            lineNumber: 408,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            width: "24",
                                            height: "24",
                                            viewBox: "0 0 24 24",
                                            fill: "none",
                                            stroke: "currentColor",
                                            strokeWidth: "2.5",
                                            className: "jsx-e25430e4eade86f4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M22 2L11 13",
                                                    className: "jsx-e25430e4eade86f4"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/menu/page.tsx",
                                                    lineNumber: 409,
                                                    columnNumber: 137
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M22 2l-7 20-4-9-9-4 20-7z",
                                                    className: "jsx-e25430e4eade86f4"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/menu/page.tsx",
                                                    lineNumber: 409,
                                                    columnNumber: 161
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/menu/page.tsx",
                                            lineNumber: 409,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/menu/page.tsx",
                                    lineNumber: 404,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "jsx-e25430e4eade86f4" + " " + "text-center text-xs text-white/40 mt-4",
                                    children: "Order via WhatsApp 📱"
                                }, void 0, false, {
                                    fileName: "[project]/app/menu/page.tsx",
                                    lineNumber: 411,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/menu/page.tsx",
                            lineNumber: 399,
                            columnNumber: 29
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/menu/page.tsx",
                    lineNumber: 365,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/menu/page.tsx",
                lineNumber: 364,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/menu/page.tsx",
        lineNumber: 133,
        columnNumber: 9
    }, this);
}
_s(MenuPage, "j/NtRGYKhec1pinYNv01JtiXhTk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMenu"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSettings"]
    ];
});
_c = MenuPage;
var _c;
__turbopack_context__.k.register(_c, "MenuPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_86801f98._.js.map