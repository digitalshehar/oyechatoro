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
"[project]/app/chef/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChefPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/storage.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function ChefPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { orders, updateStatus, toggleWaiterCall } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOrders"])();
    const [isAuthorized, setIsAuthorized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [filter, setFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [stationFilter, setStationFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [viewMode, setViewMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('active');
    const [completedItems, setCompletedItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [currentTime, setCurrentTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Date());
    const [soundEnabled, setSoundEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isTVMode, setIsTVMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedRecipe, setSelectedRecipe] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showWasteModal, setShowWasteModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [wasteLog, setWasteLog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const { prepList, togglePrepItem } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePrepList"])();
    const [showPrepModal, setShowPrepModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Mock Recipe Data
    const RECIPES = {
        'Butter Chicken': {
            ingredients: [
                'Chicken',
                'Butter',
                'Tomato Puree',
                'Cream',
                'Spices'
            ],
            steps: [
                'Marinate chicken',
                'Grill chicken',
                'Prepare gravy',
                'Mix and simmer'
            ]
        },
        'Paneer Tikka': {
            ingredients: [
                'Paneer',
                'Yogurt',
                'Spices',
                'Capsicum',
                'Onion'
            ],
            steps: [
                'Cut paneer cubes',
                'Marinate',
                'Skewer with veggies',
                'Grill in tandoor'
            ]
        },
        'Hakka Noodles': {
            ingredients: [
                'Noodles',
                'Cabbage',
                'Carrot',
                'Soy Sauce',
                'Vinegar'
            ],
            steps: [
                'Boil noodles',
                'Stir fry veggies',
                'Toss noodles with sauces',
                'Garnish'
            ]
        }
    };
    // ... existing code ...
    const callWaiter = (orderId, currentStatus)=>{
        const newStatus = !currentStatus;
        toggleWaiterCall(orderId, newStatus);
        if (newStatus) {
            const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
            if (soundEnabled) audio.play().catch((e)=>console.log(e));
        }
    };
    // ... existing code ...
    // Mock Leaderboard Data
    const LEADERBOARD = [
        {
            name: 'Chef Rahul',
            orders: 42,
            badge: '🔥'
        },
        {
            name: 'Chef Amit',
            orders: 38,
            badge: '👨‍🍳'
        },
        {
            name: 'Chef Priya',
            orders: 35,
            badge: '⭐'
        }
    ];
    const getStation = (item)=>{
        // Handle item being object or string
        const itemStr = typeof item === 'string' ? item : item?.name || '';
        const lower = itemStr.toLowerCase();
        if (lower.includes('tikka') || lower.includes('naan') || lower.includes('tandoor')) return 'tandoor';
        if (lower.includes('noodle') || lower.includes('rice') || lower.includes('manchurian')) return 'chinese';
        return 'curry';
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChefPage.useEffect": ()=>{
            const role = localStorage.getItem('role');
            if (role !== 'chef' && role !== 'admin') {
                router.push('/chef/login');
            } else {
                setIsAuthorized(true);
            }
            const timer = setInterval({
                "ChefPage.useEffect.timer": ()=>setCurrentTime(new Date())
            }["ChefPage.useEffect.timer"], 60000);
            return ({
                "ChefPage.useEffect": ()=>clearInterval(timer)
            })["ChefPage.useEffect"];
        }
    }["ChefPage.useEffect"], [
        router
    ]);
    // Sound Alert Logic
    const latestOrderTimeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const isFirstRun = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChefPage.useEffect": ()=>{
            const pendingOrdersList = orders.filter({
                "ChefPage.useEffect.pendingOrdersList": (o)=>o.status === 'Pending'
            }["ChefPage.useEffect.pendingOrdersList"]);
            // Find the latest creation time among pending orders
            const maxCreatedAt = pendingOrdersList.reduce({
                "ChefPage.useEffect.maxCreatedAt": (max, o)=>Math.max(max, o.createdAt || 0)
            }["ChefPage.useEffect.maxCreatedAt"], 0);
            // Initialize on first run
            if (isFirstRun.current) {
                latestOrderTimeRef.current = maxCreatedAt;
                isFirstRun.current = false;
                return;
            }
            // Only play sound if:
            // 1. We have a NEWER order (timestamp > previous max)
            // 2. Sound is enabled
            // 3. The new order is RECENT (created within last 30 seconds)
            if (maxCreatedAt > latestOrderTimeRef.current && soundEnabled) {
                const isRecent = Date.now() - maxCreatedAt < 30000;
                if (isRecent) {
                    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
                    audio.play().catch({
                        "ChefPage.useEffect": (e)=>console.log('Audio play failed', e)
                    }["ChefPage.useEffect"]);
                }
            }
            latestOrderTimeRef.current = maxCreatedAt;
        }
    }["ChefPage.useEffect"], [
        orders,
        soundEnabled
    ]);
    const toggleItem = (orderId, itemIdx)=>{
        const key = `${orderId}-${itemIdx}`;
        setCompletedItems((prev)=>({
                ...prev,
                [key]: !prev[key]
            }));
    };
    const logWaste = (item, reason)=>{
        setWasteLog((prev)=>[
                ...prev,
                {
                    item,
                    reason,
                    count: 1
                }
            ]);
        setShowWasteModal(false);
        alert(`Logged waste: ${item} (${reason})`);
    };
    const getOrderColor = (timeStr, status)=>{
        if (status !== 'Pending') return 'border-blue-500/50 shadow-blue-500/10';
        try {
            const [time, modifier] = timeStr.split(' ');
            let [hours, minutes] = time.split(':').map(Number);
            if (modifier === 'PM' && hours < 12) hours += 12;
            if (modifier === 'AM' && hours === 12) hours = 0;
            const orderDate = new Date();
            orderDate.setHours(hours, minutes, 0);
            const diffMs = currentTime.getTime() - orderDate.getTime();
            const diffMins = Math.floor(diffMs / 60000);
            if (diffMins > 20) return 'border-red-500 shadow-red-500/20 animate-pulse';
            if (diffMins > 10) return 'border-yellow-500 shadow-yellow-500/20';
            return 'border-green-500/50 shadow-green-500/10';
        } catch (e) {
            return 'border-gray-700';
        }
    };
    const getTimeAgo = (timeStr)=>{
        try {
            const [time, modifier] = timeStr.split(' ');
            let [hours, minutes] = time.split(':').map(Number);
            if (modifier === 'PM' && hours < 12) hours += 12;
            if (modifier === 'AM' && hours === 12) hours = 0;
            const orderDate = new Date();
            orderDate.setHours(hours, minutes, 0);
            const diffMs = currentTime.getTime() - orderDate.getTime();
            const diffMins = Math.floor(diffMs / 60000);
            if (diffMins < 0) return 'Just now';
            return `${diffMins}m ago`;
        } catch (e) {
            return timeStr;
        }
    };
    if (!isAuthorized) return null;
    const displayedOrders = orders.filter((o)=>{
        if (viewMode === 'active' || viewMode === 'stats') return o.status === 'Pending' || o.status === 'Cooking';
        return o.status === 'Ready' || o.status === 'Completed';
    }).filter((o)=>{
        if (filter === 'all') return true;
        return o.type.toLowerCase() === filter;
    }).filter((o)=>{
        if (stationFilter === 'all') return true;
        return o.items.some((item)=>getStation(item) === stationFilter);
    }).sort((a, b)=>{
        if (viewMode === 'active') return a.id - b.id;
        return b.id - a.id;
    });
    const totalOrders = orders.length;
    const pendingOrders = orders.filter((o)=>o.status === 'Pending').length;
    const completedCount = orders.filter((o)=>o.status === 'Ready' || o.status === 'Completed').length;
    const avgTime = "18 mins";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `min-h-screen bg-gray-900 text-white font-sans transition-all ${isTVMode ? 'p-0' : 'p-2 md:p-6 pb-20 md:pb-6'}`,
        children: [
            !isTVMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "sticky top-0 z-20 bg-gray-900/95 backdrop-blur-sm pb-4 pt-2 -mx-2 px-2 md:mx-0 md:px-0 md:static md:bg-transparent md:p-0 md:mb-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-gray-800 p-3 md:p-4 rounded-2xl border border-gray-700 shadow-xl flex flex-col md:flex-row justify-between gap-3 md:gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-2xl md:text-4xl bg-gray-700 p-1.5 md:p-2 rounded-xl",
                                            children: "👨‍🍳"
                                        }, void 0, false, {
                                            fileName: "[project]/app/chef/page.tsx",
                                            lineNumber: 193,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                    className: "text-lg md:text-2xl font-bold text-orange-500 leading-tight",
                                                    children: "Chef Portal"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/chef/page.tsx",
                                                    lineNumber: 195,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setSoundEnabled(!soundEnabled),
                                                            className: `text-xs px-2 py-0.5 rounded-full border ${soundEnabled ? 'bg-green-500/20 border-green-500 text-green-400' : 'bg-gray-700 border-gray-600 text-gray-400'}`,
                                                            children: soundEnabled ? '🔔' : '🔕'
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/chef/page.tsx",
                                                            lineNumber: 197,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setIsTVMode(true),
                                                            className: "text-xs px-2 py-0.5 rounded-full border bg-purple-500/20 border-purple-500 text-purple-400",
                                                            children: "📺 TV Mode"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/chef/page.tsx",
                                                            lineNumber: 198,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setShowPrepModal(true),
                                                            className: "text-xs px-2 py-0.5 rounded-full border bg-blue-500/20 border-blue-500 text-blue-400",
                                                            children: "📋 Prep List"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/chef/page.tsx",
                                                            lineNumber: 199,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setShowWasteModal(true),
                                                            className: "text-xs px-2 py-0.5 rounded-full border bg-red-500/20 border-red-500 text-red-400",
                                                            children: "🗑️ Waste"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/chef/page.tsx",
                                                            lineNumber: 200,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/chef/page.tsx",
                                                    lineNumber: 196,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/chef/page.tsx",
                                            lineNumber: 194,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/chef/page.tsx",
                                    lineNumber: 192,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 md:hidden",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-bold text-white text-lg bg-gray-700 px-3 py-1.5 rounded-lg",
                                            children: displayedOrders.length
                                        }, void 0, false, {
                                            fileName: "[project]/app/chef/page.tsx",
                                            lineNumber: 205,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                localStorage.removeItem('role');
                                                router.push('/chef/login');
                                            },
                                            className: "p-2 bg-red-500/10 text-red-400 rounded-lg",
                                            children: "🚪"
                                        }, void 0, false, {
                                            fileName: "[project]/app/chef/page.tsx",
                                            lineNumber: 206,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/chef/page.tsx",
                                    lineNumber: 204,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/chef/page.tsx",
                            lineNumber: 191,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-2 w-full md:w-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex bg-gray-700 p-1 rounded-xl w-full",
                                    children: [
                                        'active',
                                        'history',
                                        'stats'
                                    ].map((mode)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setViewMode(mode),
                                            className: `flex-1 px-3 py-1.5 rounded-lg text-xs md:text-sm font-bold capitalize ${viewMode === mode ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`,
                                            children: mode
                                        }, mode, false, {
                                            fileName: "[project]/app/chef/page.tsx",
                                            lineNumber: 213,
                                            columnNumber: 37
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/chef/page.tsx",
                                    lineNumber: 211,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2 overflow-x-auto pb-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: filter,
                                            onChange: (e)=>setFilter(e.target.value),
                                            className: "bg-gray-700 text-white text-xs md:text-sm rounded-lg px-3 py-2 border-none outline-none font-bold",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "all",
                                                    children: "All Types"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/chef/page.tsx",
                                                    lineNumber: 218,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "dine-in",
                                                    children: "Dine-in"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/chef/page.tsx",
                                                    lineNumber: 219,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "takeaway",
                                                    children: "Takeaway"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/chef/page.tsx",
                                                    lineNumber: 220,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/chef/page.tsx",
                                            lineNumber: 217,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: stationFilter,
                                            onChange: (e)=>setStationFilter(e.target.value),
                                            className: "bg-gray-700 text-white text-xs md:text-sm rounded-lg px-3 py-2 border-none outline-none font-bold",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "all",
                                                    children: "All Stations"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/chef/page.tsx",
                                                    lineNumber: 223,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "tandoor",
                                                    children: "Tandoor 🔥"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/chef/page.tsx",
                                                    lineNumber: 224,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "chinese",
                                                    children: "Chinese 🥢"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/chef/page.tsx",
                                                    lineNumber: 225,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "curry",
                                                    children: "Curry 🥘"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/chef/page.tsx",
                                                    lineNumber: 226,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/chef/page.tsx",
                                            lineNumber: 222,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/chef/page.tsx",
                                    lineNumber: 216,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/chef/page.tsx",
                            lineNumber: 210,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hidden md:flex items-center gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-right",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-2xl font-bold",
                                            children: displayedOrders.length
                                        }, void 0, false, {
                                            fileName: "[project]/app/chef/page.tsx",
                                            lineNumber: 233,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-gray-400 uppercase",
                                            children: "Count"
                                        }, void 0, false, {
                                            fileName: "[project]/app/chef/page.tsx",
                                            lineNumber: 234,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/chef/page.tsx",
                                    lineNumber: 232,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        localStorage.removeItem('role');
                                        router.push('/chef/login');
                                    },
                                    className: "px-4 py-2 bg-red-500/20 text-red-400 rounded-xl font-bold text-sm",
                                    children: "Logout"
                                }, void 0, false, {
                                    fileName: "[project]/app/chef/page.tsx",
                                    lineNumber: 236,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/chef/page.tsx",
                            lineNumber: 231,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/chef/page.tsx",
                    lineNumber: 190,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/chef/page.tsx",
                lineNumber: 189,
                columnNumber: 17
            }, this),
            isTVMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-black p-4 flex justify-between items-center border-b-4 border-orange-500 mb-4 sticky top-0 z-50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-5xl font-bold text-white",
                        children: "👨‍🍳 KITCHEN DISPLAY"
                    }, void 0, false, {
                        fileName: "[project]/app/chef/page.tsx",
                        lineNumber: 244,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-4xl font-bold text-yellow-400",
                                children: [
                                    "PENDING: ",
                                    pendingOrders
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/chef/page.tsx",
                                lineNumber: 246,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setIsTVMode(false),
                                className: "bg-gray-800 px-6 py-2 rounded-xl text-2xl",
                                children: "❌ Exit TV"
                            }, void 0, false, {
                                fileName: "[project]/app/chef/page.tsx",
                                lineNumber: 247,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/chef/page.tsx",
                        lineNumber: 245,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/chef/page.tsx",
                lineNumber: 243,
                columnNumber: 17
            }, this),
            viewMode === 'stats' && !isTVMode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6 animate-in",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-3 gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-gray-800 p-6 rounded-2xl border border-gray-700",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-gray-400 uppercase text-sm font-bold mb-2",
                                        children: "Total Orders Today"
                                    }, void 0, false, {
                                        fileName: "[project]/app/chef/page.tsx",
                                        lineNumber: 257,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-5xl font-bold text-white",
                                        children: totalOrders
                                    }, void 0, false, {
                                        fileName: "[project]/app/chef/page.tsx",
                                        lineNumber: 258,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/chef/page.tsx",
                                lineNumber: 256,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-gray-800 p-6 rounded-2xl border border-gray-700",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-gray-400 uppercase text-sm font-bold mb-2",
                                        children: "Avg Prep Time"
                                    }, void 0, false, {
                                        fileName: "[project]/app/chef/page.tsx",
                                        lineNumber: 261,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-5xl font-bold text-blue-400",
                                        children: avgTime
                                    }, void 0, false, {
                                        fileName: "[project]/app/chef/page.tsx",
                                        lineNumber: 262,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/chef/page.tsx",
                                lineNumber: 260,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-gray-800 p-6 rounded-2xl border border-gray-700",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-gray-400 uppercase text-sm font-bold mb-2",
                                        children: "Completion Rate"
                                    }, void 0, false, {
                                        fileName: "[project]/app/chef/page.tsx",
                                        lineNumber: 265,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-5xl font-bold text-green-400",
                                        children: [
                                            totalOrders > 0 ? Math.round(completedCount / totalOrders * 100) : 0,
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/chef/page.tsx",
                                        lineNumber: 266,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/chef/page.tsx",
                                lineNumber: 264,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/chef/page.tsx",
                        lineNumber: 255,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gray-800 p-6 rounded-2xl border border-gray-700",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-orange-500 uppercase text-lg font-bold mb-4 flex items-center gap-2",
                                children: "🏆 Top Chefs Today"
                            }, void 0, false, {
                                fileName: "[project]/app/chef/page.tsx",
                                lineNumber: 272,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: LEADERBOARD.map((chef, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between p-3 bg-gray-700/50 rounded-xl",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-2xl font-bold text-gray-500",
                                                        children: [
                                                            "#",
                                                            i + 1
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/chef/page.tsx",
                                                        lineNumber: 277,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "font-bold text-lg",
                                                                children: chef.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/chef/page.tsx",
                                                                lineNumber: 279,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs text-gray-400",
                                                                children: [
                                                                    chef.badge,
                                                                    " Expert Chef"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/chef/page.tsx",
                                                                lineNumber: 280,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/chef/page.tsx",
                                                        lineNumber: 278,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/chef/page.tsx",
                                                lineNumber: 276,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xl font-bold text-white",
                                                children: [
                                                    chef.orders,
                                                    " Orders"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/chef/page.tsx",
                                                lineNumber: 283,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/app/chef/page.tsx",
                                        lineNumber: 275,
                                        columnNumber: 33
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/chef/page.tsx",
                                lineNumber: 273,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/chef/page.tsx",
                        lineNumber: 271,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/chef/page.tsx",
                lineNumber: 254,
                columnNumber: 17
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `grid gap-4 ${isTVMode ? 'grid-cols-4 gap-6' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}`,
                children: displayedOrders.map((order)=>{
                    const hasAllergy = order.dietary?.some((tag)=>[
                            'nut-allergy',
                            'gluten-free',
                            'vegan',
                            'dairy-free'
                        ].includes(tag));
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `relative flex flex-col rounded-2xl border-2 transition-all duration-300 bg-gray-800 ${getOrderColor(order.time, order.status)} ${hasAllergy ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-pulse' : ''} ${isTVMode ? 'p-6 scale-100' : 'p-4 md:p-5'}`,
                        children: [
                            hasAllergy && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-10 flex items-center gap-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "⚠️ ALLERGY ALERT"
                                }, void 0, false, {
                                    fileName: "[project]/app/chef/page.tsx",
                                    lineNumber: 297,
                                    columnNumber: 41
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/chef/page.tsx",
                                lineNumber: 296,
                                columnNumber: 37
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-start mb-3 pb-3 border-b border-gray-700",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `font-bold uppercase tracking-wider px-2 py-1 rounded-md ${order.type === 'Dine-in' ? 'bg-purple-500/20 text-purple-300' : 'bg-teal-500/20 text-teal-300'} ${isTVMode ? 'text-xl' : 'text-[10px]'}`,
                                                children: order.type
                                            }, void 0, false, {
                                                fileName: "[project]/app/chef/page.tsx",
                                                lineNumber: 302,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: `font-bold text-white mt-2 ${isTVMode ? 'text-5xl' : 'text-2xl md:text-3xl'}`,
                                                children: [
                                                    "#",
                                                    order.id
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/chef/page.tsx",
                                                lineNumber: 303,
                                                columnNumber: 41
                                            }, this),
                                            order.table && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `text-orange-400 font-bold mt-1 ${isTVMode ? 'text-2xl' : 'text-xs md:text-sm'}`,
                                                children: [
                                                    "Table: ",
                                                    order.table
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/chef/page.tsx",
                                                lineNumber: 304,
                                                columnNumber: 57
                                            }, this),
                                            order.waiterName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `text-gray-400 font-medium ${isTVMode ? 'text-xl' : 'text-xs'}`,
                                                children: [
                                                    "Server: ",
                                                    order.waiterName
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/chef/page.tsx",
                                                lineNumber: 305,
                                                columnNumber: 62
                                            }, this),
                                            order.dietary && order.dietary.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-1 mt-1",
                                                children: order.dietary.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-gray-700 text-gray-300 border border-gray-600",
                                                        children: tag === 'veg' ? '🥬' : tag === 'spicy' ? '🌶️' : tag === 'nut-allergy' ? '🥜' : tag === 'gluten-free' ? '🌾' : tag
                                                    }, tag, false, {
                                                        fileName: "[project]/app/chef/page.tsx",
                                                        lineNumber: 309,
                                                        columnNumber: 53
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/chef/page.tsx",
                                                lineNumber: 307,
                                                columnNumber: 45
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/chef/page.tsx",
                                        lineNumber: 301,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-right flex flex-col items-end",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `font-mono font-bold text-gray-200 ${isTVMode ? 'text-3xl' : 'text-lg md:text-xl'}`,
                                                children: order.time
                                            }, void 0, false, {
                                                fileName: "[project]/app/chef/page.tsx",
                                                lineNumber: 317,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `text-gray-400 font-medium mb-2 ${isTVMode ? 'text-xl' : 'text-[10px] md:text-xs'}`,
                                                children: getTimeAgo(order.time)
                                            }, void 0, false, {
                                                fileName: "[project]/app/chef/page.tsx",
                                                lineNumber: 318,
                                                columnNumber: 41
                                            }, this),
                                            !isTVMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: (e)=>{
                                                    e.stopPropagation();
                                                    callWaiter(order.id, order.waiterCalled);
                                                },
                                                className: `text-xs px-2 py-1 rounded-lg font-bold transition-all ${order.waiterCalled ? 'bg-green-500 text-white animate-pulse' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`,
                                                children: order.waiterCalled ? '✅ Waiter Called' : '🔔 Call Waiter'
                                            }, void 0, false, {
                                                fileName: "[project]/app/chef/page.tsx",
                                                lineNumber: 320,
                                                columnNumber: 45
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/chef/page.tsx",
                                        lineNumber: 316,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/chef/page.tsx",
                                lineNumber: 300,
                                columnNumber: 33
                            }, this),
                            (order.id === 1 || order.id === 124) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-3 bg-red-500/10 border border-red-500/30 p-2 rounded-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-red-400 font-bold text-xs uppercase",
                                        children: "📝 Note:"
                                    }, void 0, false, {
                                        fileName: "[project]/app/chef/page.tsx",
                                        lineNumber: 333,
                                        columnNumber: 41
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-red-200 text-sm font-bold",
                                        children: "NO ONION, EXTRA SPICY 🌶️"
                                    }, void 0, false, {
                                        fileName: "[project]/app/chef/page.tsx",
                                        lineNumber: 334,
                                        columnNumber: 41
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/chef/page.tsx",
                                lineNumber: 332,
                                columnNumber: 37
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2 mb-4 flex-1",
                                children: order.items.map((item, idx)=>{
                                    const isCompleted = completedItems[`${order.id}-${idx}`];
                                    const station = getStation(item);
                                    if (stationFilter !== 'all' && station !== stationFilter) return null;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        onClick: ()=>{
                                            if (RECIPES[item]) setSelectedRecipe(item);
                                            else if (viewMode === 'active') toggleItem(order.id, idx);
                                        },
                                        className: `flex items-start gap-3 p-2 rounded-lg transition-colors ${viewMode === 'active' ? 'cursor-pointer hover:bg-gray-700' : ''} ${isCompleted ? 'bg-gray-700/50 opacity-50' : ''}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `mt-1 rounded border flex items-center justify-center transition-colors ${isCompleted ? 'bg-green-500 border-green-500' : 'border-gray-500'} ${isTVMode ? 'w-8 h-8' : 'w-4 h-4 md:w-5 md:h-5'}`,
                                                children: isCompleted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `text-black font-bold ${isTVMode ? 'text-xl' : 'text-[10px]'}`,
                                                    children: "✓"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/chef/page.tsx",
                                                    lineNumber: 350,
                                                    columnNumber: 69
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/chef/page.tsx",
                                                lineNumber: 349,
                                                columnNumber: 49
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `font-medium ${isCompleted ? 'line-through text-gray-400' : 'text-gray-200'} ${isTVMode ? 'text-3xl' : 'text-base md:text-lg'}`,
                                                        children: item
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/chef/page.tsx",
                                                        lineNumber: 353,
                                                        columnNumber: 53
                                                    }, this),
                                                    RECIPES[item] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-2 text-[10px] bg-gray-600 px-1 rounded text-gray-300",
                                                        children: "ℹ️ Recipe"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/chef/page.tsx",
                                                        lineNumber: 354,
                                                        columnNumber: 71
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/chef/page.tsx",
                                                lineNumber: 352,
                                                columnNumber: 49
                                            }, this)
                                        ]
                                    }, idx, true, {
                                        fileName: "[project]/app/chef/page.tsx",
                                        lineNumber: 345,
                                        columnNumber: 45
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/app/chef/page.tsx",
                                lineNumber: 338,
                                columnNumber: 33
                            }, this),
                            viewMode === 'active' && !isTVMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-auto pt-3 border-t border-gray-700",
                                children: order.status === 'Pending' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>alert('Out of Stock!'),
                                            className: "py-3 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-xl font-bold text-sm md:text-base",
                                            children: "🚫 Stock"
                                        }, void 0, false, {
                                            fileName: "[project]/app/chef/page.tsx",
                                            lineNumber: 365,
                                            columnNumber: 49
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>updateStatus(order.id, 'Cooking'),
                                            className: "py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 active:scale-95 flex items-center justify-center gap-2 text-sm md:text-base",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Cook"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/chef/page.tsx",
                                                    lineNumber: 366,
                                                    columnNumber: 291
                                                }, this),
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "🔥"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/chef/page.tsx",
                                                    lineNumber: 366,
                                                    columnNumber: 309
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/chef/page.tsx",
                                            lineNumber: 366,
                                            columnNumber: 49
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/chef/page.tsx",
                                    lineNumber: 364,
                                    columnNumber: 45
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>updateStatus(order.id, 'Ready'),
                                    className: "w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold shadow-lg shadow-green-600/20 active:scale-95 flex items-center justify-center gap-2 text-sm md:text-base",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Mark Ready"
                                        }, void 0, false, {
                                            fileName: "[project]/app/chef/page.tsx",
                                            lineNumber: 369,
                                            columnNumber: 295
                                        }, this),
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "✅"
                                        }, void 0, false, {
                                            fileName: "[project]/app/chef/page.tsx",
                                            lineNumber: 369,
                                            columnNumber: 319
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/chef/page.tsx",
                                    lineNumber: 369,
                                    columnNumber: 45
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/chef/page.tsx",
                                lineNumber: 362,
                                columnNumber: 37
                            }, this)
                        ]
                    }, order.id, true, {
                        fileName: "[project]/app/chef/page.tsx",
                        lineNumber: 294,
                        columnNumber: 29
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/app/chef/page.tsx",
                lineNumber: 290,
                columnNumber: 17
            }, this),
            selectedRecipe && RECIPES[selectedRecipe] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4",
                onClick: ()=>setSelectedRecipe(null),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-gray-800 p-6 rounded-2xl max-w-md w-full border border-gray-700",
                    onClick: (e)=>e.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl font-bold text-orange-500 mb-4",
                            children: selectedRecipe
                        }, void 0, false, {
                            fileName: "[project]/app/chef/page.tsx",
                            lineNumber: 383,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-sm font-bold text-gray-400 uppercase mb-2",
                                    children: "Ingredients"
                                }, void 0, false, {
                                    fileName: "[project]/app/chef/page.tsx",
                                    lineNumber: 385,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap gap-2",
                                    children: RECIPES[selectedRecipe].ingredients.map((ing)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "bg-gray-700 px-2 py-1 rounded text-sm",
                                            children: ing
                                        }, ing, false, {
                                            fileName: "[project]/app/chef/page.tsx",
                                            lineNumber: 388,
                                            columnNumber: 37
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/chef/page.tsx",
                                    lineNumber: 386,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/chef/page.tsx",
                            lineNumber: 384,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-sm font-bold text-gray-400 uppercase mb-2",
                                    children: "Steps"
                                }, void 0, false, {
                                    fileName: "[project]/app/chef/page.tsx",
                                    lineNumber: 393,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                                    className: "list-decimal list-inside space-y-1 text-gray-300",
                                    children: RECIPES[selectedRecipe].steps.map((step, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: step
                                        }, i, false, {
                                            fileName: "[project]/app/chef/page.tsx",
                                            lineNumber: 396,
                                            columnNumber: 37
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/chef/page.tsx",
                                    lineNumber: 394,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/chef/page.tsx",
                            lineNumber: 392,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setSelectedRecipe(null),
                            className: "mt-6 w-full py-3 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold",
                            children: "Close"
                        }, void 0, false, {
                            fileName: "[project]/app/chef/page.tsx",
                            lineNumber: 400,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/chef/page.tsx",
                    lineNumber: 382,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/chef/page.tsx",
                lineNumber: 381,
                columnNumber: 17
            }, this),
            showWasteModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4",
                onClick: ()=>setShowWasteModal(false),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-gray-800 p-6 rounded-2xl max-w-sm w-full border border-gray-700",
                    onClick: (e)=>e.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl font-bold text-red-500 mb-4",
                            children: "🗑️ Log Waste"
                        }, void 0, false, {
                            fileName: "[project]/app/chef/page.tsx",
                            lineNumber: 409,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-300",
                                    children: "Select reason for waste:"
                                }, void 0, false, {
                                    fileName: "[project]/app/chef/page.tsx",
                                    lineNumber: 411,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-3",
                                    children: [
                                        'Burnt',
                                        'Dropped',
                                        'Expired',
                                        'Wrong Order'
                                    ].map((reason)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>logWaste('Generic Item', reason),
                                            className: "p-3 bg-gray-700 hover:bg-red-500/20 hover:border-red-500 border border-transparent rounded-xl font-bold transition-all",
                                            children: reason
                                        }, reason, false, {
                                            fileName: "[project]/app/chef/page.tsx",
                                            lineNumber: 414,
                                            columnNumber: 37
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/chef/page.tsx",
                                    lineNumber: 412,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/chef/page.tsx",
                            lineNumber: 410,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setShowWasteModal(false),
                            className: "mt-6 w-full py-3 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold",
                            children: "Cancel"
                        }, void 0, false, {
                            fileName: "[project]/app/chef/page.tsx",
                            lineNumber: 420,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/chef/page.tsx",
                    lineNumber: 408,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/chef/page.tsx",
                lineNumber: 407,
                columnNumber: 17
            }, this),
            showPrepModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4",
                onClick: ()=>setShowPrepModal(false),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-gray-800 p-6 rounded-2xl max-w-md w-full border border-gray-700 h-[80vh] flex flex-col",
                    onClick: (e)=>e.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl font-bold text-blue-400 mb-4 flex items-center gap-2",
                            children: "📋 Daily Prep List"
                        }, void 0, false, {
                            fileName: "[project]/app/chef/page.tsx",
                            lineNumber: 430,
                            columnNumber: 29
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 overflow-y-auto space-y-4 pr-2",
                            children: [
                                'Vegetable Prep',
                                'Tandoor',
                                'Pizza Station',
                                'Safety'
                            ].map((station)=>{
                                const items = prepList.filter((i)=>i.station === station);
                                if (items.length === 0) return null;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-gray-400 uppercase text-xs font-bold mb-2 sticky top-0 bg-gray-800 py-1",
                                            children: station
                                        }, void 0, false, {
                                            fileName: "[project]/app/chef/page.tsx",
                                            lineNumber: 437,
                                            columnNumber: 45
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    onClick: ()=>togglePrepItem(item.id),
                                                    className: `flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${item.completed ? 'bg-green-500/10 border-green-500/30' : 'bg-gray-700/50 border-gray-600 hover:bg-gray-700'}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: `w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${item.completed ? 'bg-green-500 border-green-500' : 'border-gray-500'}`,
                                                            children: item.completed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-black text-xs font-bold",
                                                                children: "✓"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/chef/page.tsx",
                                                                lineNumber: 442,
                                                                columnNumber: 80
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/chef/page.tsx",
                                                            lineNumber: 441,
                                                            columnNumber: 57
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `font-medium ${item.completed ? 'text-gray-400 line-through' : 'text-white'}`,
                                                            children: item.task
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/chef/page.tsx",
                                                            lineNumber: 444,
                                                            columnNumber: 57
                                                        }, this)
                                                    ]
                                                }, item.id, true, {
                                                    fileName: "[project]/app/chef/page.tsx",
                                                    lineNumber: 440,
                                                    columnNumber: 53
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/chef/page.tsx",
                                            lineNumber: 438,
                                            columnNumber: 45
                                        }, this)
                                    ]
                                }, station, true, {
                                    fileName: "[project]/app/chef/page.tsx",
                                    lineNumber: 436,
                                    columnNumber: 41
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/app/chef/page.tsx",
                            lineNumber: 431,
                            columnNumber: 29
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setShowPrepModal(false),
                            className: "mt-4 w-full py-3 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold",
                            children: "Close Checklist"
                        }, void 0, false, {
                            fileName: "[project]/app/chef/page.tsx",
                            lineNumber: 452,
                            columnNumber: 29
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/chef/page.tsx",
                    lineNumber: 429,
                    columnNumber: 25
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/chef/page.tsx",
                lineNumber: 428,
                columnNumber: 21
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/chef/page.tsx",
        lineNumber: 185,
        columnNumber: 9
    }, this);
}
_s(ChefPage, "gv2SFSqmvFCKA4sXwS7lfAXz7/Q=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOrders"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePrepList"]
    ];
});
_c = ChefPage;
var _c;
__turbopack_context__.k.register(_c, "ChefPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_ef24bd94._.js.map