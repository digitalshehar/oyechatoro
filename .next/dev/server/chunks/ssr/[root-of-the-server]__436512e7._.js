module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[project]/app/lib/socket.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSocket",
    ()=>getSocket
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/socket.io-client/build/esm-debug/index.js [app-ssr] (ecmascript) <locals>");
'use client';
;
let socket;
const getSocket = ()=>{
    if (!socket) {
        socket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["io"])({
            path: '/socket.io',
            addTrailingSlash: false
        });
    }
    return socket;
};
}),
"[project]/app/lib/storage.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$socket$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/socket.ts [app-ssr] (ecmascript)");
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
    if ("TURBOPACK compile-time truthy", 1) return INITIAL_ORDERS;
    //TURBOPACK unreachable
    ;
    const stored = undefined;
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
    const socket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$socket$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSocket"])();
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
    const socket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$socket$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSocket"])();
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
    const socket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$socket$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSocket"])();
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
    const socket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$socket$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSocket"])();
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
    const socket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$socket$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSocket"])();
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
    const [orders, setOrders] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Initial load
        setOrders(getOrders());
        // Listen for updates
        const handleStorageChange = ()=>{
            setOrders(getOrders());
        };
        window.addEventListener('ordersUpdated', handleStorageChange);
        window.addEventListener('storage', handleStorageChange); // For cross-tab sync
        // Socket listeners
        const socket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$socket$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSocket"])();
        socket.on('order-received', (newOrder)=>{
            // Update local storage to reflect the new order from another device
            const currentOrders = getOrders();
            // Avoid duplicates
            if (!currentOrders.find((o)=>o.id === newOrder.id)) {
                const updated = [
                    newOrder,
                    ...currentOrders
                ];
                localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
                setOrders(updated);
            }
        });
        socket.on('status-updated', ({ orderId, status })=>{
            const currentOrders = getOrders();
            const updated = currentOrders.map((o)=>o.id === orderId ? {
                    ...o,
                    status
                } : o);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            setOrders(updated);
        });
        return ()=>{
            window.removeEventListener('ordersUpdated', handleStorageChange);
            window.removeEventListener('storage', handleStorageChange);
            socket.off('order-received');
            socket.off('status-updated');
        };
    }, []);
    return {
        orders,
        updateStatus: updateOrderStatus,
        createOrder,
        toggleWaiterCall
    };
};
function usePrepList() {
    const [prepList, setPrepList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return INITIAL_PREP_LIST;
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, [
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
    if ("TURBOPACK compile-time truthy", 1) return INITIAL_POSTS;
    //TURBOPACK unreachable
    ;
    const stored = undefined;
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
    const [posts, setPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [categories, setCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [tags, setTags] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const loadData = ()=>{
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
        };
        loadData();
        const handleStorageChange = ()=>loadData();
        window.addEventListener('blogUpdated', handleStorageChange);
        window.addEventListener('storage', handleStorageChange);
        return ()=>{
            window.removeEventListener('blogUpdated', handleStorageChange);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);
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
    if ("TURBOPACK compile-time truthy", 1) return INITIAL_CATS;
    //TURBOPACK unreachable
    ;
    const stored = undefined;
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
    if ("TURBOPACK compile-time truthy", 1) return INITIAL_MENU_ITEMS;
    //TURBOPACK unreachable
    ;
    const stored = undefined;
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
    const [categories, setCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const refresh = ()=>{
        setCategories(getMenuCategories());
        setItems(getMenuItems());
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        refresh();
        window.addEventListener('menuUpdated', refresh);
        window.addEventListener('storage', refresh);
        return ()=>{
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
    if ("TURBOPACK compile-time truthy", 1) return null;
    //TURBOPACK unreachable
    ;
    const stored = undefined;
};
const getUsers = ()=>{
    if ("TURBOPACK compile-time truthy", 1) return [];
    //TURBOPACK unreachable
    ;
    const stored = undefined;
};
const useAuth = ()=>{
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setUser(getCurrentUser());
        const handleAuthChange = ()=>{
            setUser(getCurrentUser());
        };
        window.addEventListener('authUpdated', handleAuthChange);
        window.addEventListener('storage', handleAuthChange);
        return ()=>{
            window.removeEventListener('authUpdated', handleAuthChange);
            window.removeEventListener('storage', handleAuthChange);
        };
    }, []);
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
const useAllUsers = ()=>{
    const [users, setUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setUsers(getUsers());
        const handleStorage = ()=>setUsers(getUsers());
        window.addEventListener('storage', handleStorage);
        window.addEventListener('authUpdated', handleStorage);
        return ()=>{
            window.removeEventListener('storage', handleStorage);
            window.removeEventListener('authUpdated', handleStorage);
        };
    }, []);
    return {
        users
    };
};
const CART_KEY = 'oye_chatoro_cart';
const useCart = ()=>{
    const [cart, setCart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const stored = localStorage.getItem(CART_KEY);
        if (stored) setCart(JSON.parse(stored));
        const handleStorage = ()=>{
            const s = localStorage.getItem(CART_KEY);
            if (s) setCart(JSON.parse(s));
        };
        window.addEventListener('storage', handleStorage);
        window.addEventListener('cartUpdated', handleStorage);
        return ()=>{
            window.removeEventListener('storage', handleStorage);
            window.removeEventListener('cartUpdated', handleStorage);
        };
    }, []);
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
const useFavorites = ()=>{
    const { user } = useAuth();
    const [favorites, setFavorites] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (user && user.favorites) {
            setFavorites(user.favorites);
        } else {
            setFavorites([]);
        }
    }, [
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
    if ("TURBOPACK compile-time truthy", 1) return INITIAL_OFFERS;
    //TURBOPACK unreachable
    ;
    const stored = undefined;
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
    const [offers, setOffers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const refresh = ()=>{
        setOffers(getOffers());
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        refresh();
        window.addEventListener('offersUpdated', refresh);
        window.addEventListener('storage', refresh);
        return ()=>{
            window.removeEventListener('offersUpdated', refresh);
            window.removeEventListener('storage', refresh);
        };
    }, []);
    return {
        offers,
        saveOffer,
        deleteOffer
    };
};
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
    if ("TURBOPACK compile-time truthy", 1) return INITIAL_INVENTORY;
    //TURBOPACK unreachable
    ;
    const stored = undefined;
};
const getStockLogs = ()=>{
    if ("TURBOPACK compile-time truthy", 1) return [];
    //TURBOPACK unreachable
    ;
    const stored = undefined;
};
const getWastageLogs = ()=>{
    if ("TURBOPACK compile-time truthy", 1) return [];
    //TURBOPACK unreachable
    ;
    const stored = undefined;
};
const useInventory = ()=>{
    const [inventory, setInventory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [stockLogs, setStockLogs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [wastageLogs, setWastageLogs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const refresh = ()=>{
        setInventory(getInventory());
        setStockLogs(getStockLogs());
        setWastageLogs(getWastageLogs());
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        refresh();
        window.addEventListener('inventoryUpdated', refresh);
        window.addEventListener('storage', refresh);
        return ()=>{
            window.removeEventListener('inventoryUpdated', refresh);
            window.removeEventListener('storage', refresh);
        };
    }, []);
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
    if ("TURBOPACK compile-time truthy", 1) return INITIAL_SETTINGS;
    //TURBOPACK unreachable
    ;
    const stored = undefined;
};
const saveSettings = (settings)=>{
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    window.dispatchEvent(new Event('settingsUpdated'));
};
const useSettings = ()=>{
    const [settings, setSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(INITIAL_SETTINGS);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setSettings(getSettings());
        const handleUpdate = ()=>setSettings(getSettings());
        window.addEventListener('settingsUpdated', handleUpdate);
        window.addEventListener('storage', handleUpdate);
        return ()=>{
            window.removeEventListener('settingsUpdated', handleUpdate);
            window.removeEventListener('storage', handleUpdate);
        };
    }, []);
    return {
        settings,
        updateSettings: saveSettings
    };
};
const exportData = ()=>{
    if ("TURBOPACK compile-time truthy", 1) return null;
    //TURBOPACK unreachable
    ;
    const data = undefined;
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
    if ("TURBOPACK compile-time truthy", 1) return INITIAL_CUSTOMERS;
    //TURBOPACK unreachable
    ;
    const stored = undefined;
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
    const [customers, setCustomers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setCustomers(getCustomers());
        const handleUpdate = ()=>setCustomers(getCustomers());
        window.addEventListener('customersUpdated', handleUpdate);
        window.addEventListener('storage', handleUpdate);
        return ()=>{
            window.removeEventListener('customersUpdated', handleUpdate);
            window.removeEventListener('storage', handleUpdate);
        };
    }, []);
    return {
        customers,
        saveCustomer
    };
};
const useUsers = ()=>{
    const [users, setUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const refresh = ()=>setUsers(getUsers());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        refresh();
        window.addEventListener('authUpdated', refresh);
        window.addEventListener('storage', refresh);
        return ()=>{
            window.removeEventListener('authUpdated', refresh);
            window.removeEventListener('storage', refresh);
        };
    }, []);
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
const SERVICE_REQUESTS_KEY = 'oyechatoro_service_requests';
const getServiceRequests = ()=>{
    if ("TURBOPACK compile-time truthy", 1) return [];
    //TURBOPACK unreachable
    ;
    const stored = undefined;
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
    const [requests, setRequests] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const refresh = ()=>{
        setRequests(getServiceRequests());
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        refresh();
        window.addEventListener('serviceRequestsUpdated', refresh);
        window.addEventListener('storage', refresh);
        return ()=>{
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
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/components/MobileNav.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MobileNav
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/storage.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function MobileNav() {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const { cart } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCart"])();
    const cartCount = cart.reduce((sum, item)=>sum + item.quantity, 0);
    const navItems = [
        {
            name: 'Home',
            href: '/',
            icon: '🏠'
        },
        {
            name: 'Menu',
            href: '/menu',
            icon: '🍔'
        },
        {
            name: 'Cart',
            href: '#cart',
            icon: '🛒',
            badge: cartCount
        },
        {
            name: 'Profile',
            href: '/profile',
            icon: '👤'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 py-2 px-4 flex justify-between items-center z-50 md:hidden pb-safe",
        children: navItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                href: item.href,
                onClick: (e)=>{
                    if (item.href === '#cart') {
                        e.preventDefault();
                        // Trigger cart open event
                        window.dispatchEvent(new Event('openCart'));
                    }
                },
                className: `flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${pathname === item.href ? 'text-[var(--brand-primary)]' : 'text-gray-400 hover:text-gray-600'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-2xl",
                                children: item.icon
                            }, void 0, false, {
                                fileName: "[project]/app/components/MobileNav.tsx",
                                lineNumber: 37,
                                columnNumber: 25
                            }, this),
                            item.badge ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-bounce",
                                children: item.badge
                            }, void 0, false, {
                                fileName: "[project]/app/components/MobileNav.tsx",
                                lineNumber: 39,
                                columnNumber: 29
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/MobileNav.tsx",
                        lineNumber: 36,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[10px] font-medium",
                        children: item.name
                    }, void 0, false, {
                        fileName: "[project]/app/components/MobileNav.tsx",
                        lineNumber: 44,
                        columnNumber: 21
                    }, this)
                ]
            }, item.name, true, {
                fileName: "[project]/app/components/MobileNav.tsx",
                lineNumber: 23,
                columnNumber: 17
            }, this))
    }, void 0, false, {
        fileName: "[project]/app/components/MobileNav.tsx",
        lineNumber: 21,
        columnNumber: 9
    }, this);
}
}),
"[project]/app/lib/data.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MENU_ITEMS",
    ()=>MENU_ITEMS
]);
const MENU_ITEMS = [
    // ========== PIZZA ==========
    {
        name: 'Classic Margherita (Regular 7")',
        price: 149,
        category: 'pizza',
        desc: 'Fresh tomato sauce with mozzarella cheese.',
        veg: true,
        emoji: '🍕',
        badge: 'Best Seller',
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&h=400&fit=crop'
    },
    {
        name: 'Garden Feast (Regular 7")',
        price: 189,
        category: 'pizza',
        desc: 'Loaded with fresh garden vegetables.',
        veg: true,
        emoji: '🍕',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&h=400&fit=crop'
    },
    {
        name: 'Paneer Tikka Pizza (Regular 7")',
        price: 199,
        category: 'pizza',
        desc: 'Spicy paneer tikka with onions & capsicum.',
        veg: true,
        emoji: '🍕',
        badge: 'Best Seller',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=400&fit=crop'
    },
    {
        name: 'Veggie Supreme (Regular 7")',
        price: 199,
        category: 'pizza',
        desc: 'Ultimate veggie loaded pizza.',
        veg: true,
        emoji: '🍕',
        badge: 'Recommended',
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&h=400&fit=crop'
    },
    {
        name: 'Veg Loaded (Regular 7")',
        price: 169,
        category: 'pizza',
        desc: 'Extra vegetables, extra taste!',
        veg: true,
        emoji: '🍕',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&h=400&fit=crop'
    },
    {
        name: 'Farm Fresh Pizza (Regular 7")',
        price: 189,
        category: 'pizza',
        desc: 'Fresh farm vegetables with herbs.',
        veg: true,
        emoji: '🍕',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=400&fit=crop'
    },
    {
        name: 'Cheese Overload (Regular 7")',
        price: 189,
        category: 'pizza',
        desc: 'Extra cheese for cheese lovers!',
        veg: true,
        emoji: '🍕',
        badge: 'Best Choice',
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&h=400&fit=crop'
    },
    {
        name: 'Peri Peri Veggie (Regular 7")',
        price: 199,
        category: 'pizza',
        desc: 'Spicy peri peri flavored veggie pizza.',
        veg: true,
        emoji: '🍕',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&h=400&fit=crop'
    },
    {
        name: 'Creamy Mushroom Garlic (Regular 7")',
        price: 209,
        category: 'pizza',
        desc: 'Creamy garlic sauce with mushrooms.',
        veg: true,
        emoji: '🍕',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=400&fit=crop'
    },
    {
        name: 'Paneer Tikka Butter Masala (Regular 7")',
        price: 199,
        category: 'pizza',
        desc: 'Butter masala base with paneer tikka.',
        veg: true,
        emoji: '🍕',
        badge: 'Best Seller',
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&h=400&fit=crop'
    },
    {
        name: 'Tandoori Paneer Blast (Regular 7")',
        price: 209,
        category: 'pizza',
        desc: 'Tandoori flavored paneer pizza.',
        veg: true,
        emoji: '🍕',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&h=400&fit=crop'
    },
    {
        name: 'Mexican Treat (Regular 7")',
        price: 199,
        category: 'pizza',
        desc: 'Mexican style spicy pizza.',
        veg: true,
        emoji: '🍕',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=400&fit=crop'
    },
    {
        name: '5 Pepper Pizza (Regular 7")',
        price: 219,
        category: 'pizza',
        desc: 'Five different peppers for spice lovers!',
        veg: true,
        emoji: '🍕',
        badge: 'Best Choice',
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&h=400&fit=crop'
    },
    {
        name: 'Abu Road Supreme (Regular 7")',
        price: 219,
        category: 'pizza',
        desc: 'Our signature special pizza!',
        veg: true,
        emoji: '🍕',
        badge: 'Best Seller',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&h=400&fit=crop'
    },
    {
        name: 'Spicy Volcano (Regular 7")',
        price: 199,
        category: 'pizza',
        desc: 'Extra hot & spicy pizza.',
        veg: true,
        emoji: '🍕',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=400&fit=crop'
    },
    {
        name: 'Corn & Cheese Burst (Regular 7")',
        price: 169,
        category: 'pizza',
        desc: 'Sweet corn with cheesy burst.',
        veg: true,
        emoji: '🍕',
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&h=400&fit=crop'
    },
    {
        name: 'Desi Masala Tadka (Regular 7")',
        price: 179,
        category: 'pizza',
        desc: 'Indian masala flavored pizza.',
        veg: true,
        emoji: '🍕',
        badge: 'Recommended',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&h=400&fit=crop'
    },
    {
        name: 'Veg Supreme Deluxe (Regular 7")',
        price: 199,
        category: 'pizza',
        desc: 'Premium veggie supreme with extra toppings.',
        veg: true,
        emoji: '🍕',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=400&fit=crop'
    },
    // ========== CHAAT CORNER ==========
    {
        name: 'Bhel Puri',
        price: 49,
        category: 'chaat',
        desc: 'Crunchy, tangy, and bursting with flavor! Papdi chaat.',
        veg: true,
        emoji: '🥘',
        badge: 'Best Seller',
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&h=400&fit=crop'
    },
    {
        name: 'Bhel Puri Cheese',
        price: 79,
        category: 'chaat',
        desc: 'Classic bhel puri with extra cheese topping.',
        veg: true,
        emoji: '🥘',
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&h=400&fit=crop'
    },
    {
        name: 'Dahi Papdi Chaat',
        price: 49,
        category: 'chaat',
        desc: 'Crispy papdi topped with creamy yogurt and chutneys.',
        veg: true,
        emoji: '🥘',
        badge: 'Best Seller',
        image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500&h=400&fit=crop'
    },
    {
        name: 'Papdi Chaat Cheese',
        price: 79,
        category: 'chaat',
        desc: 'Crispy papdi topped with creamy chutneys & namkeen.',
        veg: true,
        emoji: '🥘',
        image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500&h=400&fit=crop'
    },
    {
        name: 'Kurkure Bhel',
        price: 49,
        category: 'chaat',
        desc: 'Extra crunch, extra fun!',
        veg: true,
        emoji: '🥘',
        badge: 'Recommended',
        image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&h=400&fit=crop'
    },
    {
        name: 'Kurkure Cheese Bhel',
        price: 79,
        category: 'chaat',
        desc: 'Extra crunch with cheesy goodness!',
        veg: true,
        emoji: '🥘',
        image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&h=400&fit=crop'
    },
    {
        name: 'Crispy Aloo Chaat',
        price: 69,
        category: 'chaat',
        desc: 'Potato chaat (Delhi Style).',
        veg: true,
        emoji: '🥘',
        badge: 'Recommended',
        image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&h=400&fit=crop'
    },
    {
        name: 'Nachos Chaat',
        price: 99,
        category: 'chaat',
        desc: 'Indian cheesy style nachos.',
        veg: true,
        emoji: '🥘',
        image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=500&h=400&fit=crop'
    },
    {
        name: 'Katori Chaat',
        price: 49,
        category: 'chaat',
        desc: 'Edible bowl filled with chaat goodness.',
        veg: true,
        emoji: '🥘',
        badge: 'Best Seller',
        image: 'https://images.unsplash.com/photo-1589301760014-dd836a8dfe9f?w=500&h=400&fit=crop'
    },
    {
        name: 'Basket Chaat (6 pcs)',
        price: 79,
        category: 'chaat',
        desc: 'Mini baskets of joy!',
        veg: true,
        emoji: '🥘',
        image: 'https://images.unsplash.com/photo-1589301760014-dd836a8dfe9f?w=500&h=400&fit=crop'
    },
    {
        name: 'Raj Kachori',
        price: 149,
        category: 'chaat',
        desc: 'Royal crispy kachori filled with curd, chutneys & more.',
        veg: true,
        emoji: '🥘',
        badge: 'Best Choice',
        image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=500&h=400&fit=crop'
    },
    // ========== SANDWICH - NON GRILLED ==========
    {
        name: 'Bread & Butter',
        price: 49,
        category: 'sandwich',
        desc: 'Simple and classic bread with butter.',
        veg: true,
        emoji: '🥪',
        badge: 'Best Seller',
        image: 'https://images.unsplash.com/photo-1528736235302-52922df5c122?w=500&h=400&fit=crop'
    },
    {
        name: 'Mix Vegetable Sandwich',
        price: 89,
        category: 'sandwich',
        desc: 'Fresh veggies layered in soft bread.',
        veg: true,
        emoji: '🥪',
        badge: 'Best Seller',
        image: 'https://images.unsplash.com/photo-1528736235302-52922df5c122?w=500&h=400&fit=crop'
    },
    {
        name: 'Cheese Corn Sandwich',
        price: 79,
        category: 'sandwich',
        desc: 'Sweet corn and melted cheese in bread.',
        veg: true,
        emoji: '🥪',
        image: 'https://images.unsplash.com/photo-1528736235302-52922df5c122?w=500&h=400&fit=crop'
    },
    // ========== SANDWICH - GRILLED ==========
    {
        name: 'Aloo Matar Masala Sandwich',
        price: 79,
        category: 'sandwich',
        desc: 'Grilled sandwich with aloo matar filling & cheese.',
        veg: true,
        emoji: '🥪',
        image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=500&h=400&fit=crop'
    },
    {
        name: 'Veg Grill Sandwich',
        price: 99,
        category: 'sandwich',
        desc: 'Loaded veggies grilled with cheese.',
        veg: true,
        emoji: '🥪',
        badge: 'Recommended',
        image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=500&h=400&fit=crop'
    },
    {
        name: 'Paneer Tikka Cheese Grilled Sandwich',
        price: 149,
        category: 'sandwich',
        desc: 'Spiced paneer tikka with melted cheese.',
        veg: true,
        emoji: '🥪',
        image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=500&h=400&fit=crop'
    },
    {
        name: 'Aloo Matar Grill Sandwich',
        price: 79,
        category: 'sandwich',
        desc: 'Classic aloo matar grilled to perfection.',
        veg: true,
        emoji: '🥪',
        badge: 'Recommended',
        image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=500&h=400&fit=crop'
    },
    {
        name: 'Bahubali Sandwich',
        price: 149,
        category: 'sandwich',
        desc: 'Mega grilled sandwich loaded with cheese.',
        veg: true,
        emoji: '🥪',
        image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=500&h=400&fit=crop'
    },
    {
        name: 'Masala Junglee Sandwich',
        price: 149,
        category: 'sandwich',
        desc: 'Spicy masala filling with cheese.',
        veg: true,
        emoji: '🥪',
        image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=500&h=400&fit=crop'
    },
    {
        name: 'Veg Mayo Sandwich',
        price: 49,
        category: 'sandwich',
        desc: 'Creamy mayo with fresh veggies.',
        veg: true,
        emoji: '🥪',
        image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=500&h=400&fit=crop'
    },
    {
        name: 'Mumbai Biggest Cheese Grilled Sandwich',
        price: 179,
        category: 'sandwich',
        desc: 'Live & Fresh – Preparation Time 15-20 Min.',
        veg: true,
        emoji: '🥪',
        image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=500&h=400&fit=crop'
    },
    // ========== PASTA ==========
    {
        name: 'Street Food Pasta (Spicy)',
        price: 149,
        category: 'pasta',
        desc: 'Hot & spicy street style pasta.',
        veg: true,
        emoji: '🍝',
        badge: 'Recommended',
        image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=500&h=400&fit=crop'
    },
    {
        name: 'White Sauce Pasta',
        price: 149,
        category: 'pasta',
        desc: 'Creamy cheesy sauce with exotic vegetables.',
        veg: true,
        emoji: '🍝',
        badge: 'Best Seller',
        image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&h=400&fit=crop'
    },
    {
        name: 'Red Sauce Pasta',
        price: 149,
        category: 'pasta',
        desc: 'Tangy tomato basil sauce with italian herbs.',
        veg: true,
        emoji: '🍝',
        badge: 'Best Choice',
        image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=500&h=400&fit=crop'
    },
    {
        name: 'Peri Peri Pasta',
        price: 149,
        category: 'pasta',
        desc: 'Spicy peri peri sauce with veggies.',
        veg: true,
        emoji: '🍝',
        image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500&h=400&fit=crop'
    },
    {
        name: 'Masala Pasta',
        price: 149,
        category: 'pasta',
        desc: 'Indian style masala pasta.',
        veg: true,
        emoji: '🍝',
        image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500&h=400&fit=crop'
    },
    // ========== FRANKIE ==========
    {
        name: 'Classic Veg Frankie',
        price: 69,
        category: 'frankie',
        desc: 'Classic vegetable frankie roll.',
        veg: true,
        emoji: '🌯',
        image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500&h=400&fit=crop'
    },
    {
        name: 'Veg Frankie with Paneer',
        price: 99,
        category: 'frankie',
        desc: 'Frankie roll stuffed with paneer.',
        veg: true,
        emoji: '🌯',
        image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500&h=400&fit=crop'
    },
    {
        name: 'Classic Veg Frankie Paneer & Cheese',
        price: 119,
        category: 'frankie',
        desc: 'Loaded with paneer and cheese.',
        veg: true,
        emoji: '🌯',
        image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500&h=400&fit=crop'
    },
    {
        name: 'Paneer Tikka Frankie with Cheese',
        price: 149,
        category: 'frankie',
        desc: 'Tandoori paneer with a tikka twist.',
        veg: true,
        emoji: '🌯',
        badge: 'Best Seller',
        image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500&h=400&fit=crop'
    },
    // ========== BURGER ==========
    {
        name: 'Classic Tikki Burger',
        price: 49,
        category: 'burger',
        desc: 'Hot & spicy classic tikki burger.',
        veg: true,
        emoji: '🍔',
        badge: 'Recommended',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=400&fit=crop'
    },
    {
        name: 'Classic Tikki Burger with Cheese Slice',
        price: 79,
        category: 'burger',
        desc: 'Tikki burger with melted cheese slice.',
        veg: true,
        emoji: '🍔',
        badge: 'Best Seller',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=400&fit=crop'
    },
    {
        name: 'Double Tikki Burger',
        price: 99,
        category: 'burger',
        desc: 'Double the patty, double the taste!',
        veg: true,
        emoji: '🍔',
        badge: 'Best Choice',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=400&fit=crop'
    },
    {
        name: 'Double Tikki Burger with Cheese Slice',
        price: 129,
        category: 'burger',
        desc: 'Double tikki with cheese slice.',
        veg: true,
        emoji: '🍔',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=400&fit=crop'
    },
    // ========== FRENCH FRIES ==========
    {
        name: 'Salted French Fries',
        price: 59,
        category: 'fries',
        desc: 'Classic salted fries with sauce.',
        veg: true,
        emoji: '🍟',
        image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&h=400&fit=crop'
    },
    {
        name: 'Masala French Fries',
        price: 69,
        category: 'fries',
        desc: 'Fries with Indian masala sprinkle.',
        veg: true,
        emoji: '🍟',
        image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&h=400&fit=crop'
    },
    {
        name: 'Peri Peri French Fries',
        price: 79,
        category: 'fries',
        desc: 'Spicy peri peri seasoned fries.',
        veg: true,
        emoji: '🍟',
        badge: 'Best Seller',
        image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&h=400&fit=crop'
    },
    {
        name: 'Tandoori Mayo French Fries',
        price: 99,
        category: 'fries',
        desc: 'Fries with tandoori mayo dip.',
        veg: true,
        emoji: '🍟',
        image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&h=400&fit=crop'
    },
    {
        name: 'Chilli Potato French Fries',
        price: 119,
        category: 'fries',
        desc: 'Indo-Chinese style chilli potato fries.',
        veg: true,
        emoji: '🍟',
        image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&h=400&fit=crop'
    },
    {
        name: 'Spicy Potato French Fries',
        price: 89,
        category: 'fries',
        desc: 'Extra spicy potato fries.',
        veg: true,
        emoji: '🍟',
        image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&h=400&fit=crop'
    },
    // ========== COFFEE ==========
    {
        name: 'Hot Coffee',
        price: 59,
        category: 'beverages',
        desc: 'Strong & premium hot coffee.',
        veg: true,
        emoji: '☕',
        badge: 'Recommended',
        image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&h=400&fit=crop'
    },
    {
        name: 'Cold Coffee',
        price: 69,
        category: 'beverages',
        desc: 'Chilled creamy cold coffee.',
        veg: true,
        emoji: '☕',
        badge: 'Best Seller',
        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&h=400&fit=crop'
    },
    {
        name: 'Cold Coffee with Ice Cream',
        price: 99,
        category: 'beverages',
        desc: 'Cold coffee topped with ice cream.',
        veg: true,
        emoji: '☕',
        badge: 'Best Seller',
        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&h=400&fit=crop'
    },
    // ========== SHAKES ==========
    {
        name: 'Milk Shake',
        price: 69,
        category: 'beverages',
        desc: 'Classic creamy milkshake.',
        veg: true,
        emoji: '🥤',
        image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&h=400&fit=crop'
    },
    {
        name: 'Strawberry Shake',
        price: 69,
        category: 'beverages',
        desc: 'Fresh strawberry flavored shake.',
        veg: true,
        emoji: '🥤',
        image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=500&h=400&fit=crop'
    },
    {
        name: 'Oreo Milkshake',
        price: 79,
        category: 'beverages',
        desc: 'Oreo cookie blended shake.',
        veg: true,
        emoji: '🥤',
        badge: 'Best Seller',
        image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&h=400&fit=crop'
    },
    {
        name: 'Pineapple Shake',
        price: 99,
        category: 'beverages',
        desc: 'Tropical pineapple shake.',
        veg: true,
        emoji: '🥤',
        image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&h=400&fit=crop'
    },
    {
        name: 'KitKat Shake',
        price: 119,
        category: 'beverages',
        desc: 'Rich KitKat chocolate shake.',
        veg: true,
        emoji: '🥤',
        image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&h=400&fit=crop'
    },
    {
        name: 'Kesar Badam Rabdi Milk',
        price: 89,
        category: 'beverages',
        desc: 'Traditional kesar badam with rabdi.',
        veg: true,
        emoji: '🥛',
        image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=500&h=400&fit=crop'
    }
];
}),
"[project]/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/storage.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$MobileNav$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/MobileNav.tsx [app-ssr] (ecmascript)");
// Types
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/data.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
// Fallback Reviews
const FALLBACK_REVIEWS = [
    {
        author_name: "Narsingh Ranga",
        rating: 5,
        relative_time_description: "4 days ago",
        text: "Fast, friendly, and efficient—Oye Chattore of Abu Road stands out. The staff ensures you're well taken care of."
    },
    {
        author_name: "Sagar Sachan 7173",
        rating: 5,
        relative_time_description: "5 days ago",
        text: "Very tasty pizza in Abu road like dominos pizza. Must visit place."
    },
    {
        author_name: "Pritam Yadav",
        rating: 5,
        relative_time_description: "2 weeks ago",
        text: "Better food than other in abu road. Hygiene is very good."
    },
    {
        author_name: "Local Customer",
        rating: 5,
        relative_time_description: "1 week ago",
        text: "Best fast food shop in Abu Road. The paneer tikka pizza is amazing!"
    },
    {
        author_name: "Traveler X",
        rating: 5,
        relative_time_description: "3 weeks ago",
        text: "Stumbled upon this place while traveling. Great food and vibe."
    },
    {
        author_name: "Cet B",
        rating: 5,
        relative_time_description: "2 weeks ago",
        text: "Fresh hygeinic food prepared with love.i have ordered jain food online and the owner is so polite and patient to listen and prepare as per the request and deliver at home. I wish you great great success and thank you for honest and sincere efforts which is hard to found in this city.\nPs: Their chef is a genius!"
    },
    {
        author_name: "Foodie Guide",
        rating: 5,
        relative_time_description: "a month ago",
        text: "Excellent katori chaat and pizza. The service was quick and the place was clean."
    },
    {
        author_name: "Rider Boy",
        rating: 4,
        relative_time_description: "3 weeks ago",
        text: "Good food, a bit crowded on weekends but worth the wait."
    },
    {
        author_name: "Happy Customer",
        rating: 5,
        relative_time_description: "a month ago",
        text: "Loved the chutneys and the overall taste. Will visit again!"
    },
    {
        author_name: "Abu Road Local",
        rating: 5,
        relative_time_description: "2 months ago",
        text: "Finally a good place for fast food in Abu Road. Keep it up!"
    }
];
function Home() {
    const [activeCategory, setActiveCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('all');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isCartOpen, setIsCartOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [reviews, setReviews] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [year, setYear] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(2024);
    const [scrollY, setScrollY] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [visibleSections, setVisibleSections] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [showToast, setShowToast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [paymentMethod, setPaymentMethod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('COD');
    const [customerMobile, setCustomerMobile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const { cart, addToCart, removeFromCart, updateQuantity, clearCart } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCart"])();
    const { favorites, toggleFavorite } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFavorites"])();
    const { offers } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useOffers"])();
    const activeOffers = offers.filter((o)=>o.status === 'Active');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setYear(new Date().getFullYear());
        setReviews(FALLBACK_REVIEWS);
        const handleScroll = ()=>{
            setScrollY(window.scrollY);
        };
        const handleOpenCart = ()=>{
            setIsCartOpen(true);
        };
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('openCart', handleOpenCart);
        return ()=>{
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('openCart', handleOpenCart);
        };
    }, []);
    // Intersection Observer for animations
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const observer = new IntersectionObserver((entries)=>{
            entries.forEach((entry)=>{
                if (entry.isIntersecting) {
                    setVisibleSections((prev)=>new Set(prev).add(entry.target.id));
                }
            });
        }, {
            threshold: 0.1
        });
        document.querySelectorAll('section[id]').forEach((section)=>{
            observer.observe(section);
        });
        return ()=>observer.disconnect();
    }, []);
    // Menu Filter - Show only 8 items on homepage
    const allFilteredMenu = activeCategory === 'all' ? __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MENU_ITEMS"] : __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MENU_ITEMS"].filter((item)=>item.category === activeCategory);
    const filteredMenu = allFilteredMenu.slice(0, 8); // Limit to 8 items
    const hasMoreItems = allFilteredMenu.length > 8;
    // Cart Logic
    const handleAddToCart = (item)=>{
        addToCart({
            name: item.name,
            price: item.price,
            quantity: 1,
            image: item.image
        });
        setShowToast(true);
        setTimeout(()=>setShowToast(false), 3000);
    };
    const cartTotal = cart.reduce((sum, item)=>sum + item.price * item.quantity, 0);
    const cartCount = cart.reduce((sum, item)=>sum + item.quantity, 0);
    const checkout = ()=>{
        if (cart.length === 0) return;
        // Validate mobile number
        if (!customerMobile || customerMobile.length < 10) {
            alert('Please enter a valid 10-digit mobile number');
            return;
        }
        // 1. Create Order in Dashboard
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createOrder"])({
            customer: user ? user.name : 'Online Customer',
            items: cart.map((i)=>`${i.name} (${i.quantity})`),
            total: cartTotal,
            type: 'Delivery',
            userId: user?.id,
            paymentMethod: paymentMethod === 'COD' ? 'Cash' : paymentMethod === 'UPI' ? 'UPI' : 'Online',
            paymentStatus: paymentMethod === 'COD' ? 'Unpaid' : 'Paid',
            mobile: customerMobile
        });
        // 2. Construct WhatsApp Message
        let message = "New Order from Website:\n\n";
        cart.forEach((item)=>{
            message += `- ${item.quantity}x ${item.name} (₹${item.price * item.quantity})\n`;
        });
        message += `\n*Total: ₹${cartTotal}*`;
        // 3. Redirect to WhatsApp
        const phone = '919509913792';
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
        // 4. Clear Cart
        clearCart();
        setIsCartOpen(false);
    };
    const getRandomColor = ()=>{
        const colors = [
            '#f97316',
            '#ea580c',
            '#d97706',
            '#c2410c',
            '#b45309'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-decor"
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 218,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "floating-shapes",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "shape shape-1"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 222,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "shape shape-2"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 223,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "shape shape-3"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 224,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 221,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "header",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container header-inner",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "#",
                            className: "logo-container group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative w-12 h-12 mr-2 transform group-hover:rotate-12 transition-transform duration-300",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        src: "/logowhite.PNG",
                                        alt: "Oye Chatoro",
                                        fill: true,
                                        className: "object-contain drop-shadow-lg",
                                        priority: true
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 232,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 231,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "logo-text text-2xl tracking-tight group-hover:text-[var(--brand-secondary)] transition-colors",
                                    children: "Oye Chatoro"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 240,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 230,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: `nav-links ${isMobileMenuOpen ? 'flex flex-col absolute top-full left-0 right-0 bg-white/95 p-6 shadow-2xl backdrop-blur-xl border-t border-gray-100' : 'hidden md:flex items-center gap-8'}`,
                            children: [
                                [
                                    'Home',
                                    'Menu',
                                    'Offers',
                                    'Reviews',
                                    'Contact'
                                ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: `#${item.toLowerCase()}`,
                                        className: "nav-link text-sm font-bold uppercase tracking-wider hover:text-[var(--brand-primary)] relative group",
                                        onClick: ()=>setIsMobileMenuOpen(false),
                                        children: [
                                            item,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--brand-primary)] transition-all group-hover:w-full"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 251,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, item, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 244,
                                        columnNumber: 29
                                    }, this)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/blog",
                                    className: "nav-link font-bold text-orange-600",
                                    onClick: ()=>setIsMobileMenuOpen(false),
                                    children: "Blog"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 254,
                                    columnNumber: 25
                                }, this),
                                user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/profile",
                                    className: "nav-link font-bold text-[var(--brand-primary)] flex items-center gap-2",
                                    onClick: ()=>setIsMobileMenuOpen(false),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600",
                                            children: "👤"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 257,
                                            columnNumber: 33
                                        }, this),
                                        user.name.split(' ')[0]
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 256,
                                    columnNumber: 29
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/login",
                                    className: "nav-link font-bold hover:text-[var(--brand-primary)]",
                                    onClick: ()=>setIsMobileMenuOpen(false),
                                    children: "Login"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 261,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setIsCartOpen(true);
                                        setIsMobileMenuOpen(false);
                                    },
                                    className: "btn btn-primary md:hidden w-full mt-4",
                                    children: [
                                        "Cart (",
                                        cartCount,
                                        ")"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 263,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "https://wa.me/919509913792",
                                    className: "btn btn-primary hidden md:inline-flex shadow-lg shadow-orange-200 hover:shadow-orange-300 transform hover:-translate-y-0.5 transition-all",
                                    target: "_blank",
                                    children: "Order Now 🚀"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 264,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 242,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "mobile-menu-btn md:hidden",
                            "aria-label": "Menu",
                            onClick: ()=>setIsMobileMenuOpen(!isMobileMenuOpen),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-2xl",
                                children: "☰"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 267,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 266,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 229,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 228,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        id: "home",
                        className: `hero min-h-[70vh] md:min-h-[85vh] flex items-center relative overflow-hidden ${visibleSections.has('home') ? 'animate-in' : ''}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 bg-[#fff7ed] opacity-50 z-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0",
                                    style: {
                                        backgroundImage: 'radial-gradient(#991b1b 1px, transparent 1px)',
                                        backgroundSize: '30px 30px',
                                        opacity: 0.05
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 278,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 277,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "container relative z-10 grid md:grid-cols-2 gap-8 md:gap-12 items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hero-content text-left",
                                        style: {
                                            transform: `translateY(${scrollY * 0.1}px)`
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "inline-flex items-center gap-2 bg-red-50 border border-red-100 text-[#991b1b] px-4 py-2 rounded-full font-bold text-sm mb-6 shadow-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "w-2 h-2 bg-green-500 rounded-full animate-pulse"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 284,
                                                        columnNumber: 33
                                                    }, this),
                                                    "100% Pure Vegetarian"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 283,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: "text-5xl md:text-7xl font-black leading-tight mb-6 text-gray-900",
                                                children: [
                                                    "Authentic ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[#991b1b]",
                                                        children: "Desi Flavors"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 288,
                                                        columnNumber: 43
                                                    }, this),
                                                    " ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 288,
                                                        columnNumber: 96
                                                    }, this),
                                                    "Delivered Fresh."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 287,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-lg font-medium",
                                                children: "Experience the true taste of Abu Road. From spicy Chaats to rich Thalis, we serve tradition on a plate."
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 291,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col sm:flex-row gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "#menu",
                                                        className: "btn btn-primary text-lg px-8 py-4 rounded-full shadow-xl shadow-red-900/20 hover:shadow-2xl hover:scale-105 transition-all text-center",
                                                        children: "Order Now 🥘"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 295,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "#offers",
                                                        className: "btn btn-outline text-lg px-8 py-4 rounded-full border-2 hover:bg-red-50 transition-all text-center",
                                                        children: "View Offers %"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 298,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 294,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-12 flex items-center gap-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex -space-x-4",
                                                        children: [
                                                            1,
                                                            2,
                                                            3,
                                                            4
                                                        ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-12 h-12 rounded-full border-4 border-white shadow-md overflow-hidden",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                    src: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 5}`,
                                                                    alt: "User",
                                                                    width: 48,
                                                                    height: 48
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 307,
                                                                    columnNumber: 45
                                                                }, this)
                                                            }, i, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 306,
                                                                columnNumber: 41
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 304,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex text-yellow-500 text-lg",
                                                                children: "⭐⭐⭐⭐⭐"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 312,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm font-bold text-gray-500",
                                                                children: "Trusted by 5000+ Foodies"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 313,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 311,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 303,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 282,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hero-image relative h-[400px] md:h-[600px] flex items-center justify-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute inset-0 bg-gradient-to-tr from-red-100 to-transparent rounded-full filter blur-3xl opacity-40 animate-pulse"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 319,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative w-full h-full max-w-[500px] max-h-[500px] animate-float",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute inset-0 bg-[#991b1b]/5 rounded-full blur-2xl transform rotate-12"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 323,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative w-full h-full bg-white/40 backdrop-blur-md border border-white/60 p-6 rounded-[3rem] shadow-2xl flex items-center justify-center overflow-hidden",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-[10rem] md:text-[12rem] filter drop-shadow-2xl transform hover:scale-110 transition-transform duration-700 cursor-pointer",
                                                                children: "🍛"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 326,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "absolute top-8 right-8 bg-white p-3 rounded-2xl shadow-lg animate-bounce-subtle flex items-center gap-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-xl",
                                                                        children: "🥬"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 332,
                                                                        columnNumber: 41
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-xs text-gray-500 font-bold uppercase",
                                                                                children: "Pure"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/page.tsx",
                                                                                lineNumber: 334,
                                                                                columnNumber: 45
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "font-bold text-gray-900",
                                                                                children: "Veg"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/page.tsx",
                                                                                lineNumber: 335,
                                                                                columnNumber: 45
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 333,
                                                                        columnNumber: 41
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 331,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "absolute bottom-8 left-8 bg-white p-3 rounded-2xl shadow-lg animate-bounce-subtle",
                                                                style: {
                                                                    animationDelay: '1s'
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-2 mb-1",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-yellow-500 font-black text-xl",
                                                                                children: "4.9"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/page.tsx",
                                                                                lineNumber: 342,
                                                                                columnNumber: 45
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-xs text-gray-400",
                                                                                children: "/ 5.0"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/page.tsx",
                                                                                lineNumber: 343,
                                                                                columnNumber: 45
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 341,
                                                                        columnNumber: 41
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs font-bold text-gray-900",
                                                                        children: "Top Rated in Abu Road"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 345,
                                                                        columnNumber: 41
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 340,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 324,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 322,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 318,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 281,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 275,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "py-8 md:py-20 bg-white relative overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "container",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8",
                                children: [
                                    {
                                        icon: '🥗',
                                        title: 'Fresh Ingredients',
                                        desc: 'Locally sourced, farm-fresh veggies daily.'
                                    },
                                    {
                                        icon: '🔥',
                                        title: 'Live Kitchen',
                                        desc: 'Watch your food being prepared with love.'
                                    },
                                    {
                                        icon: '⭐',
                                        title: 'Top Rated',
                                        desc: 'Rated 5 Stars by our lovely customers.'
                                    },
                                    {
                                        icon: '⚡',
                                        title: 'Fast Service',
                                        desc: 'Quick bites to satisfy your cravings instantly.'
                                    }
                                ].map((feature, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "feature-card glass-card p-6 md:p-8 rounded-3xl border border-gray-100 hover:border-orange-200 transition-all duration-300 group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm",
                                                children: feature.icon
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 364,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "feature-title text-xl font-bold mb-3 text-gray-900",
                                                children: feature.title
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 367,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "feature-desc text-gray-500 leading-relaxed",
                                                children: feature.desc
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 368,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, idx, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 363,
                                        columnNumber: 33
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 356,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 355,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 354,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        id: "offers",
                        className: `section offers-section py-10 md:py-24 ${visibleSections.has('offers') ? 'animate-in' : ''}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "container",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "section-header text-center mb-16",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-orange-600 font-bold tracking-wider uppercase text-sm mb-2 block",
                                            children: "Don't Miss Out"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 379,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "section-title text-4xl md:text-5xl font-black mb-4",
                                            children: "Special Offers 🎉"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 380,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "section-subtitle text-xl text-gray-500",
                                            children: "Limited time deals curated just for you"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 381,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 378,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hidden md:grid offers-grid grid-cols-3 gap-8",
                                    children: activeOffers.map((offer, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "offer-card glass-card p-8 rounded-3xl relative overflow-hidden group hover:shadow-2xl transition-all duration-300 border border-white/50",
                                            style: {
                                                animationDelay: `${index * 0.1}s`
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400 to-red-500 opacity-10 rounded-bl-full group-hover:scale-150 transition-transform duration-500"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 388,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "offer-badge bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold inline-block mb-4 shadow-md",
                                                    children: [
                                                        offer.discount,
                                                        " OFF"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 389,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "offer-title text-3xl font-black mb-2 text-gray-800",
                                                    children: offer.code
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 390,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "offer-desc text-gray-600 mb-6",
                                                    children: offer.description || 'Special discount'
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 391,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "offer-footer flex justify-between items-center border-t pt-4 border-gray-100",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "offer-validity text-xs font-bold text-gray-400",
                                                            children: [
                                                                "Valid: ",
                                                                offer.expiry
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 393,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: "https://wa.me/919509913792",
                                                            className: "btn btn-sm btn-primary rounded-xl px-4 py-2 text-sm shadow-lg shadow-orange-100",
                                                            children: "Claim Now →"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 394,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 392,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, offer.id, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 387,
                                            columnNumber: 33
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 385,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "md:hidden overflow-x-auto snap-x snap-mandatory -mx-4 px-4 pb-8 no-scrollbar",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-4 w-max",
                                        children: activeOffers.map((offer, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `snap-center flex-shrink-0 w-[280px] h-[400px] rounded-3xl p-8 flex flex-col justify-between text-white shadow-2xl relative overflow-hidden bg-gradient-to-br ${offer.bgColor || 'from-orange-500 to-red-600'}`,
                                                style: {
                                                    animationDelay: `${index * 0.1}s`
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 410,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 411,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative z-10",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "inline-block bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold mb-6 border border-white/20",
                                                                children: "🔥 TRENDING"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 414,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-6xl font-black mb-4 drop-shadow-lg tracking-tighter",
                                                                children: offer.discount
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 417,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "text-3xl font-bold mb-2 leading-tight",
                                                                children: offer.code
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 418,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-white/90 text-sm leading-relaxed font-medium",
                                                                children: offer.description || 'Special discount just for you!'
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 419,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 413,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative z-10",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                href: "https://wa.me/919509913792",
                                                                className: "block w-full bg-white text-gray-900 text-center font-bold py-4 rounded-2xl shadow-xl hover:scale-105 transition-transform active:scale-95",
                                                                children: "Order Now 🚀"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 423,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-white/60 text-xs mt-4 text-center font-medium",
                                                                children: [
                                                                    "Valid until ",
                                                                    offer.expiry
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 429,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 422,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, offer.id, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 404,
                                                columnNumber: 37
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 402,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 401,
                                    columnNumber: 25
                                }, this),
                                activeOffers.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center py-12 text-gray-400 bg-gray-50 rounded-3xl border border-dashed border-gray-200",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-lg font-medium",
                                        children: "No active offers right now. Check back soon! 🎁"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 438,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 437,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 377,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 376,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        id: "menu",
                        className: `section menu-section py-12 md:py-20 bg-gray-50 ${visibleSections.has('menu') ? 'animate-in' : ''}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "container",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center mb-12",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[#991b1b] font-bold tracking-wider uppercase text-sm mb-2 block",
                                            children: "Our Menu"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 449,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-4xl md:text-5xl font-black mb-4 text-gray-900",
                                            children: "Explore Categories 🍽️"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 450,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xl text-gray-500",
                                            children: "Select a category to view delicious options"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 451,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 448,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-center gap-8 mb-16 overflow-x-auto pb-8 no-scrollbar",
                                    children: [
                                        {
                                            id: 'all',
                                            name: 'All',
                                            icon: '🍽️'
                                        },
                                        {
                                            id: 'pizza',
                                            name: 'Pizza',
                                            icon: '🍕'
                                        },
                                        {
                                            id: 'chaat',
                                            name: 'Chaat',
                                            icon: '🥘'
                                        },
                                        {
                                            id: 'sandwich',
                                            name: 'Sandwich',
                                            icon: '🥪'
                                        },
                                        {
                                            id: 'burger',
                                            name: 'Burger',
                                            icon: '🍔'
                                        },
                                        {
                                            id: 'pasta',
                                            name: 'Pasta',
                                            icon: '🍝'
                                        },
                                        {
                                            id: 'frankie',
                                            name: 'Frankie',
                                            icon: '🌯'
                                        },
                                        {
                                            id: 'fries',
                                            name: 'Fries',
                                            icon: '🍟'
                                        },
                                        {
                                            id: 'beverages',
                                            name: 'Drinks',
                                            icon: '🥤'
                                        }
                                    ].map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setActiveCategory(cat.id),
                                            className: `group flex flex-col items-center gap-3 min-w-[100px] transition-all duration-300 ${activeCategory === cat.id ? 'scale-110' : 'opacity-70 hover:opacity-100'}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `w-24 h-24 rounded-full flex items-center justify-center text-4xl shadow-lg transition-all duration-300 ${activeCategory === cat.id ? 'bg-[#991b1b] text-white ring-4 ring-red-100' : 'bg-white text-gray-700 hover:bg-red-50'}`,
                                                    children: cat.icon
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 472,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `font-bold text-sm uppercase tracking-wide ${activeCategory === cat.id ? 'text-[#991b1b]' : 'text-gray-500'}`,
                                                    children: cat.name
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 475,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, cat.id, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 467,
                                            columnNumber: 33
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 455,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
                                    children: filteredMenu.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-red-100 transition-all duration-300 flex flex-col h-full relative",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "h-56 w-full relative overflow-hidden bg-gray-100",
                                                    children: [
                                                        item.image ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                            src: item.image,
                                                            alt: item.name,
                                                            fill: true,
                                                            className: "object-cover transition-transform duration-700 group-hover:scale-110"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 489,
                                                            columnNumber: 45
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-full h-full flex items-center justify-center text-4xl bg-gray-50",
                                                            children: "🥘"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 496,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm border border-green-100 flex items-center gap-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-3 h-3 border border-green-600 flex items-center justify-center rounded-[2px]",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "w-1.5 h-1.5 bg-green-600 rounded-full"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 502,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 501,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[10px] font-bold text-green-700 uppercase",
                                                                    children: "Veg"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 504,
                                                                    columnNumber: 45
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 500,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: (e)=>{
                                                                e.stopPropagation();
                                                                toggleFavorite(item.name);
                                                            },
                                                            className: `absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full shadow-md transition-all ${favorites.includes(item.name) ? 'bg-red-50 text-red-500' : 'bg-white text-gray-400 hover:text-red-500'}`,
                                                            children: favorites.includes(item.name) ? '❤️' : '🤍'
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 508,
                                                            columnNumber: 41
                                                        }, this),
                                                        item.badge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-700 to-orange-500 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase shadow-lg animate-pulse",
                                                            children: [
                                                                "⭐ ",
                                                                item.badge
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 517,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 487,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-5 flex flex-col flex-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mb-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                    className: "text-lg font-bold text-gray-900 group-hover:text-[#991b1b] transition-colors line-clamp-1",
                                                                    title: item.name,
                                                                    children: item.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 526,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-gray-500 line-clamp-2 mt-1 h-8",
                                                                    children: item.desc
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 529,
                                                                    columnNumber: 45
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 525,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-auto pt-4 flex items-center justify-between border-t border-gray-50",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs text-gray-400 line-through block",
                                                                            children: [
                                                                                "₹",
                                                                                item.price + 50
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/page.tsx",
                                                                            lineNumber: 534,
                                                                            columnNumber: 49
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xl font-black text-[#991b1b]",
                                                                            children: [
                                                                                "₹",
                                                                                item.price
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/page.tsx",
                                                                            lineNumber: 535,
                                                                            columnNumber: 49
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 533,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>handleAddToCart(item),
                                                                    className: "bg-red-50 text-[#991b1b] border border-red-100 hover:bg-[#991b1b] hover:text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-sm hover:shadow-md active:scale-95",
                                                                    children: "ADD +"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 537,
                                                                    columnNumber: 45
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 532,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 524,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, index, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 485,
                                            columnNumber: 33
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 483,
                                    columnNumber: 25
                                }, this),
                                hasMoreItems && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center mt-12",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-500 mb-4",
                                            children: [
                                                "+",
                                                allFilteredMenu.length - 8,
                                                " more items available"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 551,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "/menu",
                                            className: "btn btn-primary text-lg px-10 py-4 rounded-full shadow-xl shadow-red-900/20 hover:shadow-2xl hover:scale-105 transition-all font-bold",
                                            children: [
                                                "View Full Menu (",
                                                allFilteredMenu.length,
                                                " Items) 📜"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 552,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 550,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 447,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 446,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        id: "reviews",
                        className: `section py-24 bg-white ${visibleSections.has('reviews') ? 'animate-in' : ''}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "container",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "section-header text-center mb-16",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "section-title text-4xl md:text-5xl font-black mb-4",
                                            children: "Customer Love ❤️"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 564,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-center gap-4 mb-6 bg-orange-50 inline-flex px-6 py-3 rounded-2xl border border-orange-100",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-4xl font-black text-gray-900",
                                                    children: "5.0"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 566,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-2xl text-yellow-400",
                                                    children: "⭐⭐⭐⭐⭐"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 567,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gray-500 font-medium",
                                                    children: "(30+ Google Reviews)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 568,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 565,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "section-subtitle text-xl text-gray-500 mb-8",
                                            children: "What people are saying about Oye Chatoro"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 570,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "https://www.google.com/search?q=Oye+Chatoro+Abu+Road#lrd=0x395c5b0042401a9d:0x633535252873130,3,,,,",
                                            target: "_blank",
                                            className: "btn btn-outline px-6 py-3 rounded-xl hover:bg-gray-50",
                                            children: "Write a Review ✍️"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 571,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 563,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "reviews-scroller flex gap-6 overflow-x-auto pb-8 px-4 snap-x snap-mandatory no-scrollbar",
                                    children: reviews.map((r, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "review-card glass-card min-w-[350px] p-8 rounded-3xl border border-gray-100 snap-center hover:border-orange-200 transition-all duration-300 bg-white",
                                            style: {
                                                animationDelay: `${i * 0.1}s`
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "review-header flex items-center gap-4 mb-6",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md",
                                                            style: {
                                                                background: getRandomColor()
                                                            },
                                                            children: r.author_name.charAt(0).toUpperCase()
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 579,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    className: "font-bold text-gray-900 text-lg",
                                                                    children: r.author_name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 583,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-2 text-sm text-gray-500",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-yellow-400",
                                                                            children: "⭐⭐⭐⭐⭐"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/page.tsx",
                                                                            lineNumber: 585,
                                                                            columnNumber: 49
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            children: "• Google"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/page.tsx",
                                                                            lineNumber: 586,
                                                                            columnNumber: 49
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 584,
                                                                    columnNumber: 45
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 582,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 578,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-gray-600 leading-relaxed mb-6 italic",
                                                    children: [
                                                        '"',
                                                        r.text,
                                                        '"'
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 590,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                    className: "block text-gray-400 font-medium",
                                                    children: r.relative_time_description
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 591,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 577,
                                            columnNumber: 33
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 575,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 562,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 561,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        id: "contact",
                        className: `section py-12 md:py-24 bg-gray-50 ${visibleSections.has('contact') ? 'animate-in' : ''}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "container",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "section-header text-center mb-16",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "section-title text-4xl font-black mb-4",
                                            children: "Visit Us 📍"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 602,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "section-subtitle text-xl text-gray-500",
                                            children: "We are waiting to serve you!"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 603,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 601,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid md:grid-cols-2 gap-8 max-w-4xl mx-auto",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "feature-card glass-card p-8 rounded-3xl bg-white border border-gray-100 hover:shadow-xl transition-all text-left h-full flex flex-col justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "text-2xl font-bold text-[var(--brand-primary)] mb-6",
                                                            children: "Oye Chatoro"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 609,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-4 text-gray-600",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "flex gap-3",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xl",
                                                                            children: "📍"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/page.tsx",
                                                                            lineNumber: 612,
                                                                            columnNumber: 45
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            children: "Abu Central Mall, G-5, Riico Check Post Road, Abu Road, Rajasthan 307026"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/page.tsx",
                                                                            lineNumber: 613,
                                                                            columnNumber: 45
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 611,
                                                                    columnNumber: 41
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "flex gap-3",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xl",
                                                                            children: "🕒"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/page.tsx",
                                                                            lineNumber: 616,
                                                                            columnNumber: 45
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            children: "Daily 5:00 PM – 11:00 PM"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/page.tsx",
                                                                            lineNumber: 617,
                                                                            columnNumber: 45
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 615,
                                                                    columnNumber: 41
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "flex gap-3",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xl",
                                                                            children: "📞"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/page.tsx",
                                                                            lineNumber: 620,
                                                                            columnNumber: 45
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                            href: "tel:+919509913792",
                                                                            className: "hover:text-[var(--brand-primary)] font-bold",
                                                                            children: "+91-9509913792"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/page.tsx",
                                                                            lineNumber: 621,
                                                                            columnNumber: 45
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 619,
                                                                    columnNumber: 41
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 610,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 608,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: "https://share.google/JVyw8Lyd9XfsMw3m1",
                                                    target: "_blank",
                                                    className: "btn btn-primary btn-glow w-full mt-8 rounded-xl py-4 shadow-lg shadow-orange-100",
                                                    children: "Get Directions 🗺️"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 625,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 607,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "feature-card glass-card p-8 rounded-3xl bg-gradient-to-br from-orange-50 to-white border border-orange-100 hover:shadow-xl transition-all text-left relative overflow-hidden",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "absolute top-4 right-4 bg-black text-white px-2 py-1 rounded text-xs font-bold",
                                                    children: "AD"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 630,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-2xl font-bold text-gray-900 mb-2",
                                                    children: "Need a Website? 💻"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 631,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-gray-500 mb-6",
                                                    children: "Get a premium business website like this one."
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 632,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-3xl font-black text-[var(--brand-secondary)] mb-6",
                                                    children: [
                                                        "₹9,999 ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-lg text-gray-400 line-through font-normal",
                                                            children: "₹24,999"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 634,
                                                            columnNumber: 44
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 633,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: "https://wa.me/919509913792?text=I am interested in Website Development",
                                                    target: "_blank",
                                                    className: "btn btn-outline w-full rounded-xl py-4 border-2 font-bold hover:bg-gray-900 hover:border-gray-900 hover:text-white",
                                                    children: "Contact Developer 👨‍💻"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 636,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 629,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 606,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 600,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 599,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 272,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "footer bg-white border-t border-gray-100 pt-20 pb-32 md:pb-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid md:grid-cols-4 gap-12 mb-16",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "col-span-1 md:col-span-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 mb-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative w-10 h-10",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        src: "/logowhite.PNG",
                                                        alt: "Logo",
                                                        fill: true,
                                                        className: "object-contain"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 649,
                                                        columnNumber: 37
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 648,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-2xl font-black text-gray-900",
                                                    children: "Oye Chatoro"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 651,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 647,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-500 leading-relaxed max-w-sm",
                                            children: "Authentic Indian Vegetarian Street Food in Abu Road. Fresh, Hygienic, and Delicious. Serving happiness since 2024."
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 653,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 646,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "font-bold text-gray-900 mb-6",
                                            children: "Quick Links"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 658,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "space-y-4",
                                            children: [
                                                'Home',
                                                'Menu',
                                                'Reviews',
                                                'Contact'
                                            ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: `#${item.toLowerCase()}`,
                                                        className: "text-gray-500 hover:text-[var(--brand-primary)] transition-colors",
                                                        children: item
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 661,
                                                        columnNumber: 52
                                                    }, this)
                                                }, item, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 661,
                                                    columnNumber: 37
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 659,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 657,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "font-bold text-gray-900 mb-6",
                                            children: "Connect"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 666,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "space-y-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "https://instagram.com/oyechatoro",
                                                        target: "_blank",
                                                        className: "text-gray-500 hover:text-pink-600 transition-colors flex items-center gap-2",
                                                        children: "📸 Instagram"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 668,
                                                        columnNumber: 37
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 668,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "https://facebook.com/oyechatoro",
                                                        target: "_blank",
                                                        className: "text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-2",
                                                        children: "👥 Facebook"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 669,
                                                        columnNumber: 37
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 669,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "https://share.google/i1ls8jxzjEOxQ5gd8",
                                                        target: "_blank",
                                                        className: "text-gray-500 hover:text-green-600 transition-colors flex items-center gap-2",
                                                        children: "🗺️ Google Maps"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 670,
                                                        columnNumber: 37
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 670,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 667,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 665,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 645,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "border-t border-gray-100 pt-8 text-center text-gray-400 text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        "© ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            id: "year",
                                            children: year
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 675,
                                            columnNumber: 35
                                        }, this),
                                        " Oye Chatoro. All rights reserved. • Website by Akshay Tiwari"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 675,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-6 flex flex-col md:flex-row items-center justify-center gap-4 opacity-90 hover:opacity-100 transition-opacity",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative w-24 h-12 md:w-28 md:h-14",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                src: "/fssai.png",
                                                alt: "FSSAI",
                                                fill: true,
                                                className: "object-contain"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 678,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 677,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-center md:text-left",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs uppercase font-bold text-gray-500 tracking-wider mb-1",
                                                    children: "License No."
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 686,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-mono text-lg font-bold text-gray-800 tracking-wide",
                                                    children: "22225023000513"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 687,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 685,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 676,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 674,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 644,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 643,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "cart-floating-btn shadow-2xl shadow-orange-500/50 hover:scale-110 transition-transform active:scale-95",
                onClick: ()=>setIsCartOpen(true),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "cart-icon",
                        children: "🛒"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 696,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "cart-count shadow-sm",
                        children: cartCount
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 697,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 695,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `cart-modal-backdrop ${isCartOpen ? 'open' : ''}`,
                onClick: (e)=>{
                    if (e.target === e.currentTarget) setIsCartOpen(false);
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "cart-sidebar shadow-2xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "cart-header bg-white border-b border-gray-100 p-6 flex justify-between items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-black text-gray-900",
                                    children: "Your Order 🛍️"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 703,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "close-cart w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors",
                                    onClick: ()=>setIsCartOpen(false),
                                    children: "×"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 704,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 702,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "cart-items p-6 space-y-6 overflow-y-auto flex-1",
                            children: cart.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "empty-cart-msg flex flex-col items-center justify-center h-full text-gray-400",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-6xl mb-4",
                                        children: "🛒"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 709,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-lg font-medium",
                                        children: "Your cart is empty"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 710,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm",
                                        children: "Add some delicious items!"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 711,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 708,
                                columnNumber: 29
                            }, this) : cart.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "cart-item flex gap-4 items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-16 h-16 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 relative",
                                            children: item.image ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                src: item.image,
                                                alt: item.name,
                                                fill: true,
                                                className: "object-cover"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 718,
                                                columnNumber: 45
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-full h-full flex items-center justify-center text-2xl",
                                                children: "🥘"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 720,
                                                columnNumber: 45
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 716,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "cart-item-details flex-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "cart-item-title font-bold text-gray-900 line-clamp-1",
                                                    children: item.name
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 724,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "cart-item-price text-[var(--brand-primary)] font-bold",
                                                    children: [
                                                        "₹",
                                                        item.price
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 725,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "cart-item-controls flex items-center gap-3 mt-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            className: "qty-btn w-6 h-6 rounded-full border flex items-center justify-center hover:bg-gray-50",
                                                            onClick: ()=>updateQuantity(item.name, -1),
                                                            children: "-"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 727,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm font-bold w-4 text-center",
                                                            children: item.quantity
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 728,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            className: "qty-btn w-6 h-6 rounded-full border flex items-center justify-center hover:bg-gray-50",
                                                            onClick: ()=>updateQuantity(item.name, 1),
                                                            children: "+"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 729,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 726,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 723,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "font-bold text-gray-900",
                                            children: [
                                                "₹",
                                                item.price * item.quantity
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 732,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, index, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 715,
                                    columnNumber: 33
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 706,
                            columnNumber: 21
                        }, this),
                        cart.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-6 bg-orange-50 border-t border-orange-100",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "text-sm font-bold text-gray-700 mb-3 flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "✨"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 742,
                                            columnNumber: 33
                                        }, this),
                                        " Complete your meal with..."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 741,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-3 overflow-x-auto pb-2 no-scrollbar",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MENU_ITEMS"].filter((item)=>item.price < 100 && !cart.find((c)=>c.name === item.name)).slice(0, 5).map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "min-w-[140px] bg-white p-3 rounded-xl border border-orange-100 shadow-sm flex flex-col items-center text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-12 h-12 rounded-full bg-orange-100 mb-2 overflow-hidden relative",
                                                    children: item.image ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        src: item.image,
                                                        alt: item.name,
                                                        fill: true,
                                                        className: "object-cover"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 752,
                                                        columnNumber: 53
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xl leading-[3rem]",
                                                        children: item.emoji
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 754,
                                                        columnNumber: 53
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 750,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs font-bold text-gray-800 line-clamp-1 mb-1",
                                                    children: item.name
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 757,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs font-bold text-orange-600 mb-2",
                                                    children: [
                                                        "₹",
                                                        item.price
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 758,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>handleAddToCart(item),
                                                    className: "text-xs bg-orange-100 text-orange-700 font-bold px-3 py-1 rounded-full hover:bg-orange-200 transition-colors w-full",
                                                    children: "Add +"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 759,
                                                    columnNumber: 45
                                                }, this)
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 749,
                                            columnNumber: 41
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 744,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 740,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "cart-footer p-6 border-t border-gray-100 bg-gray-50",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-sm font-bold text-gray-700 mb-2 block",
                                            children: "📱 Mobile Number *"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 773,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "tel",
                                            placeholder: "Enter 10-digit mobile number",
                                            value: customerMobile,
                                            onChange: (e)=>setCustomerMobile(e.target.value.replace(/\D/g, '').slice(0, 10)),
                                            className: "w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[var(--brand-primary)] focus:outline-none text-lg font-medium",
                                            maxLength: 10
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 774,
                                            columnNumber: 29
                                        }, this),
                                        customerMobile && customerMobile.length < 10 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-red-500 mt-1",
                                            children: "Please enter 10 digits"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 783,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 772,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-bold text-gray-700 mb-2",
                                            children: "Payment Method"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 788,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-3 gap-2",
                                            children: [
                                                {
                                                    id: 'COD',
                                                    label: '💵 Cash',
                                                    desc: 'Pay on Delivery'
                                                },
                                                {
                                                    id: 'UPI',
                                                    label: '📱 UPI',
                                                    desc: 'GPay/PhonePe'
                                                },
                                                {
                                                    id: 'Online',
                                                    label: '💳 Online',
                                                    desc: 'Paid Already'
                                                }
                                            ].map((pm)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setPaymentMethod(pm.id),
                                                    className: `p-3 rounded-xl border-2 text-center transition-all ${paymentMethod === pm.id ? 'border-[var(--brand-primary)] bg-orange-50 text-[var(--brand-primary)]' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-lg font-bold",
                                                            children: pm.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 803,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-[10px] text-gray-500",
                                                            children: pm.desc
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 804,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, pm.id, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 795,
                                                    columnNumber: 37
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 789,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 787,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "cart-total flex justify-between items-center mb-4 text-xl font-black text-gray-900",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Total:"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 810,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[var(--brand-primary)]",
                                            children: [
                                                "₹",
                                                cartTotal
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 811,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 809,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "btn btn-primary btn-block btn-glow w-full py-4 rounded-xl shadow-lg shadow-orange-200 text-lg",
                                    onClick: checkout,
                                    children: paymentMethod === 'COD' ? 'Order (Cash on Delivery) 🚀' : paymentMethod === 'UPI' ? 'Order & Pay via UPI 📱' : 'Confirm Paid Order ✅'
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 813,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 770,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 701,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 700,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `toast-notification fixed bottom-24 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-4 z-50 transition-all duration-300 ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-medium",
                        children: "Item added to cart! 🛒"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 822,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setIsCartOpen(true),
                        className: "text-sm font-bold text-orange-400 hover:text-orange-300 underline",
                        children: "View Cart"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 823,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 821,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$MobileNav$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 827,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__436512e7._.js.map