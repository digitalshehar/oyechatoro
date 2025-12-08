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
        mobile: orderData.mobile,
        tip: orderData.tip
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
        tags: [
            'Pizza',
            'Pasta',
            'Chaat',
            'Recommendations'
        ],
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
        tags: [
            'Restaurant in Abu Road',
            'Best Restaurant',
            'Mount Abu',
            'Pure Veg'
        ],
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
        tags: [
            'Abu Road Food',
            'Mount Abu',
            'Food Guide'
        ],
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
        tags: [
            'Family Restaurant',
            'Abu Road',
            'Kids Menu'
        ],
        seoTitle: 'Family Restaurant in Abu Road | Oye Chatoro - Kid Friendly',
        seoDescription: 'Best family restaurant in Abu Road. Kid-friendly menu, AC seating, pure vegetarian food.',
        readingTime: '3 min read',
        status: 'Published'
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
"[project]/app/blog/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BlogFeedPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/storage.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function BlogFeedPage() {
    _s();
    const { posts, categories } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBlog"])();
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedCategory, setSelectedCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('All');
    // Filter posts
    const filteredPosts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BlogFeedPage.useMemo[filteredPosts]": ()=>{
            return posts.filter({
                "BlogFeedPage.useMemo[filteredPosts]": (post)=>{
                    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
                    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
                    // Only show published posts in public feed
                    const isPublished = post.status === 'Published';
                    return matchesSearch && matchesCategory && isPublished;
                }
            }["BlogFeedPage.useMemo[filteredPosts]"]);
        }
    }["BlogFeedPage.useMemo[filteredPosts]"], [
        posts,
        searchQuery,
        selectedCategory
    ]);
    const featuredPost = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BlogFeedPage.useMemo[featuredPost]": ()=>{
            return posts.find({
                "BlogFeedPage.useMemo[featuredPost]": (p)=>p.featured && p.status === 'Published'
            }["BlogFeedPage.useMemo[featuredPost]"]) || posts.find({
                "BlogFeedPage.useMemo[featuredPost]": (p)=>p.status === 'Published'
            }["BlogFeedPage.useMemo[featuredPost]"]);
        }
    }["BlogFeedPage.useMemo[featuredPost]"], [
        posts
    ]);
    const regularPosts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BlogFeedPage.useMemo[regularPosts]": ()=>{
            return filteredPosts.filter({
                "BlogFeedPage.useMemo[regularPosts]": (p)=>p.id !== featuredPost?.id
            }["BlogFeedPage.useMemo[regularPosts]"]);
        }
    }["BlogFeedPage.useMemo[regularPosts]"], [
        filteredPosts,
        featuredPost
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-[var(--bg-body)] font-sans",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "header sticky top-0 z-50 bg-[var(--bg-surface-glass)] backdrop-blur-md border-b border-[var(--border-light)]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container mx-auto px-4 h-16 flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "flex items-center gap-2 text-2xl font-bold text-[var(--brand-primary)]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/logo.svg",
                                    alt: "Logo",
                                    className: "h-8 w-8",
                                    onError: (e)=>e.currentTarget.style.display = 'none'
                                }, void 0, false, {
                                    fileName: "[project]/app/blog/page.tsx",
                                    lineNumber: 38,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Oye Chatoro"
                                }, void 0, false, {
                                    fileName: "[project]/app/blog/page.tsx",
                                    lineNumber: 39,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/blog/page.tsx",
                            lineNumber: 37,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: "hidden md:flex gap-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/",
                                    className: "text-[var(--text-main)] hover:text-[var(--brand-primary)] font-medium",
                                    children: "Home"
                                }, void 0, false, {
                                    fileName: "[project]/app/blog/page.tsx",
                                    lineNumber: 42,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/menu",
                                    className: "text-[var(--text-main)] hover:text-[var(--brand-primary)] font-medium",
                                    children: "Menu"
                                }, void 0, false, {
                                    fileName: "[project]/app/blog/page.tsx",
                                    lineNumber: 43,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/blog",
                                    className: "text-[var(--brand-primary)] font-bold",
                                    children: "Blog"
                                }, void 0, false, {
                                    fileName: "[project]/app/blog/page.tsx",
                                    lineNumber: 44,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/blog/page.tsx",
                            lineNumber: 41,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/menu",
                            className: "btn btn-primary",
                            children: "Order Now"
                        }, void 0, false, {
                            fileName: "[project]/app/blog/page.tsx",
                            lineNumber: 46,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/blog/page.tsx",
                    lineNumber: 36,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/blog/page.tsx",
                lineNumber: 35,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "container mx-auto px-4 py-8",
                children: [
                    featuredPost && !searchQuery && selectedCategory === 'All' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-16 animate-in",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative rounded-3xl overflow-hidden h-[500px] group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: featuredPost.image || 'https://via.placeholder.com/1200x600',
                                    alt: featuredPost.title,
                                    className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                }, void 0, false, {
                                    fileName: "[project]/app/blog/page.tsx",
                                    lineNumber: 55,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end p-8 md:p-12",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "max-w-3xl",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-3 mb-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "px-3 py-1 bg-[var(--brand-primary)] text-white text-xs font-bold rounded-full uppercase tracking-wider",
                                                        children: "Featured"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/blog/page.tsx",
                                                        lineNumber: 63,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "px-3 py-1 bg-white/20 backdrop-blur text-white text-xs font-bold rounded-full",
                                                        children: featuredPost.category
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/blog/page.tsx",
                                                        lineNumber: 66,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/blog/page.tsx",
                                                lineNumber: 62,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: "text-4xl md:text-6xl font-bold text-white mb-4 leading-tight",
                                                children: featuredPost.title
                                            }, void 0, false, {
                                                fileName: "[project]/app/blog/page.tsx",
                                                lineNumber: 70,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-lg text-white/80 mb-6 line-clamp-2 max-w-2xl",
                                                children: featuredPost.excerpt
                                            }, void 0, false, {
                                                fileName: "[project]/app/blog/page.tsx",
                                                lineNumber: 73,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: `/blog/view?id=${featuredPost.id}`,
                                                className: "inline-flex items-center gap-2 px-6 py-3 bg-white text-[var(--brand-dark)] rounded-full font-bold hover:bg-[var(--brand-primary)] hover:text-white transition-all transform hover:scale-105",
                                                children: [
                                                    "Read Story ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "→"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/blog/page.tsx",
                                                        lineNumber: 80,
                                                        columnNumber: 52
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/blog/page.tsx",
                                                lineNumber: 76,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/blog/page.tsx",
                                        lineNumber: 61,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/blog/page.tsx",
                                    lineNumber: 60,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/blog/page.tsx",
                            lineNumber: 54,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/blog/page.tsx",
                        lineNumber: 53,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col md:flex-row gap-6 items-center justify-between mb-12 animate-in",
                        style: {
                            animationDelay: '0.1s'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setSelectedCategory('All'),
                                        className: `px-4 py-2 rounded-full text-sm font-bold transition-all ${selectedCategory === 'All' ? 'bg-[var(--brand-dark)] text-white shadow-lg' : 'bg-white text-[var(--text-muted)] hover:bg-gray-100'}`,
                                        children: "All Stories"
                                    }, void 0, false, {
                                        fileName: "[project]/app/blog/page.tsx",
                                        lineNumber: 91,
                                        columnNumber: 25
                                    }, this),
                                    categories.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setSelectedCategory(cat.name),
                                            className: `px-4 py-2 rounded-full text-sm font-bold transition-all ${selectedCategory === cat.name ? 'bg-[var(--brand-primary)] text-white shadow-lg shadow-orange-500/30' : 'bg-white text-[var(--text-muted)] hover:bg-orange-50'}`,
                                            children: cat.name
                                        }, cat.id, false, {
                                            fileName: "[project]/app/blog/page.tsx",
                                            lineNumber: 101,
                                            columnNumber: 29
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/blog/page.tsx",
                                lineNumber: 90,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative w-full md:w-72",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "Search recipes & stories...",
                                        value: searchQuery,
                                        onChange: (e)=>setSearchQuery(e.target.value),
                                        className: "w-full px-4 py-2 pl-10 rounded-full border border-[var(--border-light)] focus:ring-2 focus:ring-[var(--brand-primary)] outline-none text-sm"
                                    }, void 0, false, {
                                        fileName: "[project]/app/blog/page.tsx",
                                        lineNumber: 115,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400",
                                        children: "🔍"
                                    }, void 0, false, {
                                        fileName: "[project]/app/blog/page.tsx",
                                        lineNumber: 122,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/blog/page.tsx",
                                lineNumber: 114,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/blog/page.tsx",
                        lineNumber: 89,
                        columnNumber: 17
                    }, this),
                    regularPosts.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
                        children: regularPosts.map((post, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: `/blog/view?id=${post.id}`,
                                className: "group bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 animate-in flex flex-col border border-gray-100 hover:-translate-y-1",
                                style: {
                                    animationDelay: `${idx * 0.05}s`
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-56 overflow-hidden relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: post.image || 'https://via.placeholder.com/400x200',
                                                alt: post.title,
                                                className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            }, void 0, false, {
                                                fileName: "[project]/app/blog/page.tsx",
                                                lineNumber: 137,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute top-3 left-3 flex gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold text-[var(--brand-dark)] shadow-sm",
                                                        children: post.category
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/blog/page.tsx",
                                                        lineNumber: 143,
                                                        columnNumber: 41
                                                    }, this),
                                                    post.isRecipe && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "bg-yellow-400 text-yellow-900 px-2 py-1 rounded-md text-xs font-bold shadow-sm flex items-center gap-1",
                                                        children: "🍳 Recipe"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/blog/page.tsx",
                                                        lineNumber: 147,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/blog/page.tsx",
                                                lineNumber: 142,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/blog/page.tsx",
                                        lineNumber: 136,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-6 flex-1 flex flex-col",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 text-xs text-[var(--text-light)] mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: post.date
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/blog/page.tsx",
                                                        lineNumber: 155,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "•"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/blog/page.tsx",
                                                        lineNumber: 156,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: post.readingTime || '3 min read'
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/blog/page.tsx",
                                                        lineNumber: 157,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/blog/page.tsx",
                                                lineNumber: 154,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-xl font-bold text-[var(--brand-dark)] mb-3 line-clamp-2 group-hover:text-[var(--brand-primary)] transition-colors",
                                                children: post.title
                                            }, void 0, false, {
                                                fileName: "[project]/app/blog/page.tsx",
                                                lineNumber: 159,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[var(--text-muted)] mb-4 line-clamp-2 text-sm flex-1",
                                                children: post.excerpt
                                            }, void 0, false, {
                                                fileName: "[project]/app/blog/page.tsx",
                                                lineNumber: 162,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between pt-4 border-t border-gray-50",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600",
                                                                children: post.author.charAt(0)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/blog/page.tsx",
                                                                lineNumber: 168,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs font-bold text-gray-500",
                                                                children: post.author
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/blog/page.tsx",
                                                                lineNumber: 171,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/blog/page.tsx",
                                                        lineNumber: 167,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[var(--brand-primary)] text-sm font-bold group-hover:translate-x-1 transition-transform",
                                                        children: "Read More →"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/blog/page.tsx",
                                                        lineNumber: 173,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/blog/page.tsx",
                                                lineNumber: 166,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/blog/page.tsx",
                                        lineNumber: 153,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, post.id, true, {
                                fileName: "[project]/app/blog/page.tsx",
                                lineNumber: 130,
                                columnNumber: 29
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/blog/page.tsx",
                        lineNumber: 128,
                        columnNumber: 21
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-20 animate-in",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-6xl mb-4 opacity-50",
                                children: "🍳"
                            }, void 0, false, {
                                fileName: "[project]/app/blog/page.tsx",
                                lineNumber: 183,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-xl font-bold text-[var(--text-main)]",
                                children: "No stories found"
                            }, void 0, false, {
                                fileName: "[project]/app/blog/page.tsx",
                                lineNumber: 184,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[var(--text-muted)]",
                                children: "Try adjusting your search or category."
                            }, void 0, false, {
                                fileName: "[project]/app/blog/page.tsx",
                                lineNumber: 185,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setSearchQuery('');
                                    setSelectedCategory('All');
                                },
                                className: "mt-4 text-[var(--brand-primary)] font-bold hover:underline",
                                children: "View All Stories"
                            }, void 0, false, {
                                fileName: "[project]/app/blog/page.tsx",
                                lineNumber: 186,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/blog/page.tsx",
                        lineNumber: 182,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/blog/page.tsx",
                lineNumber: 50,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "bg-white border-t border-[var(--border-light)] py-12 mt-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container mx-auto px-4 text-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[var(--text-muted)]",
                        children: "© 2024 Oye Chatoro. All rights reserved."
                    }, void 0, false, {
                        fileName: "[project]/app/blog/page.tsx",
                        lineNumber: 199,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/blog/page.tsx",
                    lineNumber: 198,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/blog/page.tsx",
                lineNumber: 197,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/blog/page.tsx",
        lineNumber: 33,
        columnNumber: 9
    }, this);
}
_s(BlogFeedPage, "OSIFLlYEa9zXx0hxaFpMIhz9t50=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBlog"]
    ];
});
_c = BlogFeedPage;
var _c;
__turbopack_context__.k.register(_c, "BlogFeedPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_0e508802._.js.map