(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/dashboard/orders/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/storage.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
// Helper function to format order item (handles both string and object formats)
const formatOrderItem = (item)=>{
    if (typeof item === 'string') {
        return item;
    } else if (typeof item === 'object' && item !== null) {
        return `${item.name} (${item.quantity || 1})`;
    }
    return String(item);
};
const OrdersPage = ()=>{
    _s();
    const { orders, updateStatus } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOrders"])();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('live');
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isSoundEnabled, setIsSoundEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const prevOrderCountRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(orders.length);
    const [dateFilter, setDateFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('today');
    const playNotificationSound = ()=>{
        try {
            const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
            audio.play().catch(()=>{});
        } catch  {}
    };
    const isFirstRender = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OrdersPage.useEffect": ()=>{
            if (isFirstRender.current) {
                isFirstRender.current = false;
                prevOrderCountRef.current = orders.length;
                return;
            }
            if (orders.length > prevOrderCountRef.current) {
                if (isSoundEnabled) playNotificationSound();
            }
            prevOrderCountRef.current = orders.length;
        }
    }["OrdersPage.useEffect"], [
        orders.length,
        isSoundEnabled
    ]);
    const totalRevenue = orders.reduce((sum, order)=>order.status !== 'Cancelled' ? sum + order.total : sum, 0);
    const totalOrders = orders.length;
    const pendingOrders = orders.filter((o)=>o.status === 'Pending').length;
    const cookingOrders = orders.filter((o)=>o.status === 'Cooking').length;
    const paidOrders = orders.filter((o)=>o.paymentStatus === 'Paid' && o.status !== 'Cancelled');
    const unpaidOrders = orders.filter((o)=>o.paymentStatus === 'Unpaid' && o.status !== 'Cancelled');
    const cashCollected = paidOrders.filter((o)=>o.paymentMethod === 'Cash').reduce((sum, o)=>sum + o.total, 0);
    const upiCollected = paidOrders.filter((o)=>o.paymentMethod === 'UPI').reduce((sum, o)=>sum + o.total, 0);
    const onlineCollected = paidOrders.filter((o)=>o.paymentMethod === 'Online').reduce((sum, o)=>sum + o.total, 0);
    const totalCollected = cashCollected + upiCollected + onlineCollected;
    const pendingCollection = unpaidOrders.reduce((sum, o)=>sum + o.total, 0);
    const filteredOrders = orders.filter((order)=>{
        const orderDate = new Date(order.createdAt || Date.now());
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
        const matchesDate = dateFilter === 'today' ? orderDate >= today : dateFilter === 'week' ? orderDate >= weekAgo : dateFilter === 'month' ? orderDate >= monthAgo : true;
        const matchesTab = activeTab === 'live' ? [
            'Pending',
            'Cooking',
            'Ready'
        ].includes(order.status) : activeTab === 'completed' ? order.status === 'Completed' : activeTab === 'cancelled' ? order.status === 'Cancelled' : activeTab === 'train' ? !!order.trainDetails : true;
        const query = searchQuery.toLowerCase();
        const matchesSearch = order.id.toString().includes(query) || order.customer.toLowerCase().includes(query) || order.items.some((item)=>formatOrderItem(item).toLowerCase().includes(query)) || (order.trainDetails?.pnr || '').includes(query) || (order.mobile || '').includes(query);
        return matchesDate && matchesTab && matchesSearch;
    }).sort((a, b)=>(b.createdAt || 0) - (a.createdAt || 0));
    const printBill = (order)=>{
        const billContent = `<html><head><title>Bill #${order.id}</title><style>body{font-family:monospace;padding:20px;max-width:300px;margin:0 auto;}.header{text-align:center;margin-bottom:20px;border-bottom:1px dashed #000;padding-bottom:10px;}.item{display:flex;justify-content:space-between;margin-bottom:5px;}.total{border-top:1px dashed #000;margin-top:10px;padding-top:10px;display:flex;justify-content:space-between;font-weight:bold;}.footer{text-align:center;margin-top:20px;font-size:12px;}</style></head><body><div class="header"><h2>Oye Chatoro</h2><p>Abu Road, Rajasthan</p><p>Order #${order.id}</p><p>${new Date().toLocaleString()}</p></div><div class="items">${order.items.map((item)=>`<div class="item"><span>${formatOrderItem(item)}</span></div>`).join('')}</div><div class="total"><span>TOTAL</span><span>₹${order.total}</span></div><div class="footer"><p>Thank you for dining with us!</p></div><script>window.print();</script></body></html>`;
        const printWindow = window.open('', '', 'width=400,height=600');
        if (printWindow) {
            printWindow.document.write(billContent);
            printWindow.document.close();
        }
    };
    const exportCSV = ()=>{
        const csv = [
            [
                'Order ID',
                'Customer',
                'Mobile',
                'Items',
                'Total',
                'Payment Method',
                'Payment Status',
                'Order Status',
                'Date'
            ].join(','),
            ...filteredOrders.map((o)=>[
                    o.id,
                    `"${o.customer}"`,
                    o.mobile || '',
                    `"${o.items.map((item)=>formatOrderItem(item)).join(', ')}"`,
                    o.total,
                    o.paymentMethod || '',
                    o.paymentStatus || '',
                    o.status,
                    new Date(o.createdAt || Date.now()).toLocaleString()
                ].join(','))
        ].join('\n');
        const blob = new Blob([
            csv
        ], {
            type: 'text/csv'
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `orders_${dateFilter}_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4 md:p-8 max-w-7xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8 animate-in w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-3xl font-bold text-[var(--brand-dark)]",
                                children: "Order Management"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/orders/page.tsx",
                                lineNumber: 110,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3 w-full md:w-auto",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative flex-1 w-full md:w-64",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400",
                                                children: "🔍"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/orders/page.tsx",
                                                lineNumber: 113,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                placeholder: "Search ID, Name, PNR...",
                                                className: "w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]",
                                                value: searchQuery,
                                                onChange: (e)=>setSearchQuery(e.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/orders/page.tsx",
                                                lineNumber: 114,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/orders/page.tsx",
                                        lineNumber: 112,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setIsSoundEnabled(!isSoundEnabled),
                                        className: `p-2 rounded-xl border transition-colors ${isSoundEnabled ? 'bg-white text-[var(--brand-primary)] border-[var(--brand-primary)]' : 'bg-gray-100 text-gray-400 border-gray-200'}`,
                                        title: isSoundEnabled ? "Sound On" : "Sound Off",
                                        children: isSoundEnabled ? '🔔' : '🔕'
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/orders/page.tsx",
                                        lineNumber: 116,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/orders/page.tsx",
                                lineNumber: 111,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/orders/page.tsx",
                        lineNumber: 109,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass-card p-4 rounded-xl flex items-center gap-4 bg-white/60",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-2xl shrink-0",
                                        children: "💰"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/orders/page.tsx",
                                        lineNumber: 124,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm text-[var(--text-muted)] truncate",
                                                children: "Total Revenue"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/orders/page.tsx",
                                                lineNumber: 125,
                                                columnNumber: 50
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-2xl font-bold text-[var(--brand-dark)]",
                                                children: [
                                                    "₹",
                                                    totalRevenue
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/orders/page.tsx",
                                                lineNumber: 125,
                                                columnNumber: 128
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/orders/page.tsx",
                                        lineNumber: 125,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/orders/page.tsx",
                                lineNumber: 123,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass-card p-4 rounded-xl flex items-center gap-4 bg-white/60",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl shrink-0",
                                        children: "📦"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/orders/page.tsx",
                                        lineNumber: 128,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm text-[var(--text-muted)] truncate",
                                                children: "Total Orders"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/orders/page.tsx",
                                                lineNumber: 129,
                                                columnNumber: 50
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-2xl font-bold text-[var(--brand-dark)]",
                                                children: totalOrders
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/orders/page.tsx",
                                                lineNumber: 129,
                                                columnNumber: 127
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/orders/page.tsx",
                                        lineNumber: 129,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/orders/page.tsx",
                                lineNumber: 127,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass-card p-4 rounded-xl flex items-center gap-4 bg-white/60",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-2xl shrink-0",
                                        children: "⏳"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/orders/page.tsx",
                                        lineNumber: 132,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm text-[var(--text-muted)] truncate",
                                                children: "Pending"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/orders/page.tsx",
                                                lineNumber: 133,
                                                columnNumber: 50
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-2xl font-bold text-yellow-600",
                                                children: pendingOrders
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/orders/page.tsx",
                                                lineNumber: 133,
                                                columnNumber: 122
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/orders/page.tsx",
                                        lineNumber: 133,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/orders/page.tsx",
                                lineNumber: 131,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass-card p-4 rounded-xl flex items-center gap-4 bg-white/60",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-2xl shrink-0",
                                        children: "🔥"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/orders/page.tsx",
                                        lineNumber: 136,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm text-[var(--text-muted)] truncate",
                                                children: "Cooking"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/orders/page.tsx",
                                                lineNumber: 137,
                                                columnNumber: 50
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-2xl font-bold text-orange-600",
                                                children: cookingOrders
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/orders/page.tsx",
                                                lineNumber: 137,
                                                columnNumber: 122
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/orders/page.tsx",
                                        lineNumber: 137,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/orders/page.tsx",
                                lineNumber: 135,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/orders/page.tsx",
                        lineNumber: 122,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 glass-card p-4 rounded-xl bg-gradient-to-r from-green-50 to-blue-50 border border-green-100",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-sm font-bold text-gray-700 mb-3 flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "💳"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/orders/page.tsx",
                                        lineNumber: 142,
                                        columnNumber: 98
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    " Payment Summary (Today)"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/orders/page.tsx",
                                lineNumber: 142,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 md:grid-cols-5 gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white/80 p-3 rounded-lg text-center border border-green-100",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-gray-500 mb-1",
                                                children: "💵 Cash"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/orders/page.tsx",
                                                lineNumber: 144,
                                                columnNumber: 105
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-lg font-bold text-green-600",
                                                children: [
                                                    "₹",
                                                    cashCollected
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/orders/page.tsx",
                                                lineNumber: 144,
                                                columnNumber: 162
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/orders/page.tsx",
                                        lineNumber: 144,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white/80 p-3 rounded-lg text-center border border-purple-100",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-gray-500 mb-1",
                                                children: "📱 UPI"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/orders/page.tsx",
                                                lineNumber: 145,
                                                columnNumber: 106
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-lg font-bold text-purple-600",
                                                children: [
                                                    "₹",
                                                    upiCollected
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/orders/page.tsx",
                                                lineNumber: 145,
                                                columnNumber: 162
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/orders/page.tsx",
                                        lineNumber: 145,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white/80 p-3 rounded-lg text-center border border-blue-100",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-gray-500 mb-1",
                                                children: "💳 Online"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/orders/page.tsx",
                                                lineNumber: 146,
                                                columnNumber: 104
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-lg font-bold text-blue-600",
                                                children: [
                                                    "₹",
                                                    onlineCollected
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/orders/page.tsx",
                                                lineNumber: 146,
                                                columnNumber: 163
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/orders/page.tsx",
                                        lineNumber: 146,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white/80 p-3 rounded-lg text-center border border-gray-200",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-gray-500 mb-1",
                                                children: "✅ Total Collected"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/orders/page.tsx",
                                                lineNumber: 147,
                                                columnNumber: 104
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-lg font-bold text-gray-800",
                                                children: [
                                                    "₹",
                                                    totalCollected
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/orders/page.tsx",
                                                lineNumber: 147,
                                                columnNumber: 171
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/orders/page.tsx",
                                        lineNumber: 147,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white/80 p-3 rounded-lg text-center border border-orange-100",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-gray-500 mb-1",
                                                children: [
                                                    "⏳ Pending (",
                                                    unpaidOrders.length,
                                                    ")"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/orders/page.tsx",
                                                lineNumber: 148,
                                                columnNumber: 106
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-lg font-bold text-orange-600",
                                                children: [
                                                    "₹",
                                                    pendingCollection
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/orders/page.tsx",
                                                lineNumber: 148,
                                                columnNumber: 189
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/orders/page.tsx",
                                        lineNumber: 148,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/orders/page.tsx",
                                lineNumber: 143,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/orders/page.tsx",
                        lineNumber: 141,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/orders/page.tsx",
                lineNumber: 108,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 mb-4 flex-wrap",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm font-medium text-gray-600",
                        children: "🗓️ Period:"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/orders/page.tsx",
                        lineNumber: 154,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    [
                        {
                            id: 'today',
                            label: 'Today'
                        },
                        {
                            id: 'week',
                            label: 'This Week'
                        },
                        {
                            id: 'month',
                            label: 'This Month'
                        },
                        {
                            id: 'all',
                            label: 'All Time'
                        }
                    ].map((df)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setDateFilter(df.id),
                            className: `px-4 py-2 rounded-lg text-sm font-medium transition-all ${dateFilter === df.id ? 'bg-[var(--brand-dark)] text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`,
                            children: df.label
                        }, df.id, false, {
                            fileName: "[project]/app/dashboard/orders/page.tsx",
                            lineNumber: 156,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: exportCSV,
                        className: "ml-auto px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-bold hover:bg-green-700 transition-colors flex items-center gap-2",
                        children: "📥 Export CSV"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/orders/page.tsx",
                        lineNumber: 158,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/orders/page.tsx",
                lineNumber: 153,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-row overflow-x-auto pb-2 mb-6 gap-2 no-scrollbar w-full",
                children: [
                    {
                        id: 'live',
                        label: '🔴 Live Orders',
                        count: orders.filter((o)=>[
                                'Pending',
                                'Cooking',
                                'Ready'
                            ].includes(o.status)).length
                    },
                    {
                        id: 'train',
                        label: '🚆 Train Orders',
                        count: orders.filter((o)=>!!o.trainDetails).length
                    },
                    {
                        id: 'completed',
                        label: '✅ Completed',
                        count: orders.filter((o)=>o.status === 'Completed').length
                    },
                    {
                        id: 'cancelled',
                        label: '❌ Cancelled',
                        count: orders.filter((o)=>o.status === 'Cancelled').length
                    },
                    {
                        id: 'all',
                        label: '📂 All Orders',
                        count: orders.length
                    }
                ].map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveTab(tab.id),
                        className: `px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${activeTab === tab.id ? 'bg-[var(--brand-dark)] text-white shadow-lg scale-105' : 'bg-white text-[var(--text-muted)] hover:bg-gray-50'} whitespace-nowrap flex-shrink-0`,
                        children: [
                            tab.label,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `text-xs px-2 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20' : 'bg-gray-100'}`,
                                children: tab.count
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/orders/page.tsx",
                                lineNumber: 171,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, tab.id, true, {
                        fileName: "[project]/app/dashboard/orders/page.tsx",
                        lineNumber: 169,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/app/dashboard/orders/page.tsx",
                lineNumber: 161,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4 animate-in pb-24",
                children: filteredOrders.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center py-12 text-[var(--text-muted)]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-6xl mb-4 opacity-30",
                            children: "📭"
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/orders/page.tsx",
                            lineNumber: 178,
                            columnNumber: 81
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "No orders found matching your search."
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/orders/page.tsx",
                            lineNumber: 178,
                            columnNumber: 131
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/dashboard/orders/page.tsx",
                    lineNumber: 178,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0)) : filteredOrders.map((order)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `glass-card p-4 md:p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all border-l-4 ${order.status === 'Pending' ? 'border-l-yellow-400 bg-yellow-50/30' : order.status === 'Cooking' ? 'border-l-blue-400 bg-blue-50/30' : order.status === 'Ready' ? 'border-l-green-400 bg-green-50/30' : order.status === 'Cancelled' ? 'border-l-red-400 bg-red-50/30' : 'border-l-gray-400'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3 mb-2 flex-wrap",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-bold text-lg text-[var(--brand-dark)] shrink-0",
                                                children: [
                                                    "#",
                                                    order.id
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/orders/page.tsx",
                                                lineNumber: 184,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm text-[var(--text-muted)] bg-white px-2 py-1 rounded border shrink-0",
                                                children: order.time
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/orders/page.tsx",
                                                lineNumber: 185,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shrink-0 ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : order.status === 'Cooking' ? 'bg-blue-100 text-blue-700' : order.status === 'Ready' ? 'bg-green-100 text-green-700' : order.status === 'Completed' ? 'bg-gray-100 text-gray-700' : 'bg-red-100 text-red-700'}`,
                                                children: order.status
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/orders/page.tsx",
                                                lineNumber: 186,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            order.trainDetails && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold",
                                                children: "🚆 Train"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/orders/page.tsx",
                                                lineNumber: 187,
                                                columnNumber: 60
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: order.paymentMethod || 'Cash',
                                                onChange: (e)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updatePaymentMethod"])(order.id, e.target.value),
                                                className: `px-2 py-1 rounded text-xs font-bold border-0 cursor-pointer ${order.paymentMethod === 'Cash' ? 'bg-yellow-100 text-yellow-700' : order.paymentMethod === 'UPI' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "Cash",
                                                        children: "💵 Cash"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/orders/page.tsx",
                                                        lineNumber: 189,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "UPI",
                                                        children: "📱 UPI"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/orders/page.tsx",
                                                        lineNumber: 190,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "Online",
                                                        children: "💳 Online"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/orders/page.tsx",
                                                        lineNumber: 191,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/orders/page.tsx",
                                                lineNumber: 188,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            order.paymentStatus && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `px-2 py-1 rounded text-xs font-bold ${order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`,
                                                children: order.paymentStatus === 'Paid' ? '✅ Paid' : '⏳ Unpaid'
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/orders/page.tsx",
                                                lineNumber: 193,
                                                columnNumber: 61
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/orders/page.tsx",
                                        lineNumber: 183,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-bold text-[var(--text-main)] mb-1 text-lg truncate",
                                        children: order.customer
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/orders/page.tsx",
                                        lineNumber: 195,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    order.mobile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 mb-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm text-gray-600",
                                                children: [
                                                    "📱 ",
                                                    order.mobile
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/orders/page.tsx",
                                                lineNumber: 198,
                                                columnNumber: 41
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            order.status === 'Ready' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: `https://wa.me/91${order.mobile}?text=${encodeURIComponent(`🎉 Hi! Your order #${order.id} is READY!\n\nItems: ${order.items.map((item)=>formatOrderItem(item)).join(', ')}\nTotal: ₹${order.total}\n\nThank you from Oye Chatoro! 🍽️`)}`,
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                className: "px-2 py-1 bg-green-500 text-white text-xs font-bold rounded hover:bg-green-600",
                                                children: "📲 Notify"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/orders/page.tsx",
                                                lineNumber: 200,
                                                columnNumber: 45
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/orders/page.tsx",
                                        lineNumber: 197,
                                        columnNumber: 37
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    order.trainDetails && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-red-50 border border-red-100 rounded-lg p-2 mb-2 text-sm text-red-800 grid grid-cols-3 gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "block text-[10px] text-red-400 uppercase",
                                                        children: "PNR"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/orders/page.tsx",
                                                        lineNumber: 206,
                                                        columnNumber: 46
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold",
                                                        children: order.trainDetails.pnr
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/orders/page.tsx",
                                                        lineNumber: 206,
                                                        columnNumber: 115
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/orders/page.tsx",
                                                lineNumber: 206,
                                                columnNumber: 41
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "block text-[10px] text-red-400 uppercase",
                                                        children: "Train"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/orders/page.tsx",
                                                        lineNumber: 207,
                                                        columnNumber: 46
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold",
                                                        children: order.trainDetails.trainNo
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/orders/page.tsx",
                                                        lineNumber: 207,
                                                        columnNumber: 117
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/orders/page.tsx",
                                                lineNumber: 207,
                                                columnNumber: 41
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "block text-[10px] text-red-400 uppercase",
                                                        children: "Seat"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/orders/page.tsx",
                                                        lineNumber: 208,
                                                        columnNumber: 46
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold",
                                                        children: order.trainDetails.coachSeat || 'N/A'
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/orders/page.tsx",
                                                        lineNumber: 208,
                                                        columnNumber: 116
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/orders/page.tsx",
                                                lineNumber: 208,
                                                columnNumber: 41
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/orders/page.tsx",
                                        lineNumber: 205,
                                        columnNumber: 37
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-2 mt-2",
                                        children: order.items.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm bg-white px-3 py-1 rounded-full border border-gray-100 text-gray-600",
                                                children: formatOrderItem(item)
                                            }, i, false, {
                                                fileName: "[project]/app/dashboard/orders/page.tsx",
                                                lineNumber: 213,
                                                columnNumber: 41
                                            }, ("TURBOPACK compile-time value", void 0)))
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/orders/page.tsx",
                                        lineNumber: 211,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/orders/page.tsx",
                                lineNumber: 182,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 mt-2 md:mt-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-right min-w-[100px]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-[var(--text-muted)]",
                                                children: "Total Amount"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/orders/page.tsx",
                                                lineNumber: 218,
                                                columnNumber: 75
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-bold text-xl md:text-2xl text-[var(--brand-primary)]",
                                                children: [
                                                    "₹",
                                                    order.total
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/orders/page.tsx",
                                                lineNumber: 218,
                                                columnNumber: 143
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/orders/page.tsx",
                                        lineNumber: 218,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2 flex-1 md:flex-none justify-end",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>printBill(order),
                                                className: "p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors",
                                                title: "Print Bill",
                                                children: "🖨️"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/orders/page.tsx",
                                                lineNumber: 220,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            order.paymentStatus === 'Unpaid' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updatePaymentStatus"])(order.id, 'Paid'),
                                                className: "p-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-xl font-medium",
                                                title: "Mark as Paid",
                                                children: "💰"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/orders/page.tsx",
                                                lineNumber: 221,
                                                columnNumber: 74
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            order.paymentStatus === 'Paid' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updatePaymentStatus"])(order.id, 'Unpaid'),
                                                className: "p-3 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-xl font-medium",
                                                title: "Mark as Unpaid",
                                                children: "↩️"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/orders/page.tsx",
                                                lineNumber: 222,
                                                columnNumber: 72
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            order.status === 'Pending' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>updateStatus(order.id, 'Cooking'),
                                                        className: "flex-1 md:flex-none px-4 md:px-6 py-2 md:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-200 transition-all text-sm md:text-base",
                                                        children: "Accept & Cook"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/orders/page.tsx",
                                                        lineNumber: 225,
                                                        columnNumber: 45
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>updateStatus(order.id, 'Cancelled'),
                                                        className: "px-3 md:px-4 py-2 md:py-3 bg-red-100 hover:bg-red-200 text-red-600 rounded-xl font-bold text-sm md:text-base",
                                                        children: "Reject"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/orders/page.tsx",
                                                        lineNumber: 226,
                                                        columnNumber: 45
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true),
                                            order.status === 'Cooking' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>updateStatus(order.id, 'Ready'),
                                                className: "flex-1 md:flex-none px-4 md:px-6 py-2 md:py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold shadow-lg shadow-orange-200 text-sm md:text-base",
                                                children: "Mark Ready"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/orders/page.tsx",
                                                lineNumber: 229,
                                                columnNumber: 68
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            order.status === 'Ready' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>updateStatus(order.id, 'Completed'),
                                                className: "flex-1 md:flex-none px-4 md:px-6 py-2 md:py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold shadow-lg shadow-green-200 text-sm md:text-base",
                                                children: "Complete Order"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/orders/page.tsx",
                                                lineNumber: 230,
                                                columnNumber: 66
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/orders/page.tsx",
                                        lineNumber: 219,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/orders/page.tsx",
                                lineNumber: 217,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, order.id, true, {
                        fileName: "[project]/app/dashboard/orders/page.tsx",
                        lineNumber: 181,
                        columnNumber: 25
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/app/dashboard/orders/page.tsx",
                lineNumber: 176,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/orders/page.tsx",
        lineNumber: 107,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s(OrdersPage, "RejlTZokempk3WiqbA34GAWao28=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOrders"]
    ];
});
_c = OrdersPage;
const __TURBOPACK__default__export__ = OrdersPage;
var _c;
__turbopack_context__.k.register(_c, "OrdersPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_dashboard_orders_page_tsx_d7f626fd._.js.map