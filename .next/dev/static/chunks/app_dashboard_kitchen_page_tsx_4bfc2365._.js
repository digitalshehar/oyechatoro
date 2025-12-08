(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/dashboard/kitchen/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>KitchenPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/storage.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function KitchenPage() {
    _s();
    const { orders, updateStatus } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOrders"])();
    const [viewMode, setViewMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('tickets');
    const [currentTime, setCurrentTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(Date.now());
    const [isSoundEnabled, setIsSoundEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const prevOrderCountRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const audioRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Filter for active orders (Pending or Cooking)
    const activeOrders = orders.filter((o)=>o.status === 'Pending' || o.status === 'Cooking').sort((a, b)=>a.id - b.id);
    // --- Timer Logic ---
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "KitchenPage.useEffect": ()=>{
            const timer = setInterval({
                "KitchenPage.useEffect.timer": ()=>setCurrentTime(Date.now())
            }["KitchenPage.useEffect.timer"], 10000); // Update every 10s
            return ({
                "KitchenPage.useEffect": ()=>clearInterval(timer)
            })["KitchenPage.useEffect"];
        }
    }["KitchenPage.useEffect"], []);
    const getElapsedTime = (order)=>{
        if (order.status === 'Pending') {
            // For pending orders, maybe show "Waiting" or time since placed
            const diff = currentTime - order.id; // Fallback to ID as timestamp
            return Math.floor(diff / 60000);
        }
        if (order.status === 'Cooking' && order.cookingStartedAt) {
            const diff = currentTime - order.cookingStartedAt;
            return Math.floor(diff / 60000);
        }
        return 0;
    };
    const getStatusColor = (minutes)=>{
        if (minutes < 10) return 'bg-green-100 text-green-800 border-green-200';
        if (minutes < 20) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        return 'bg-red-100 text-red-800 border-red-200 animate-pulse';
    };
    // --- Sound Logic ---
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "KitchenPage.useEffect": ()=>{
            // Initialize Audio Context on first interaction if needed, or just use simple Audio for now
            // Using the same robust AudioContext method as Orders page
            const playSound = {
                "KitchenPage.useEffect.playSound": ()=>{
                    try {
                        const AudioContext = window.AudioContext || window.webkitAudioContext;
                        if (!AudioContext) return;
                        const ctx = new AudioContext();
                        const osc = ctx.createOscillator();
                        const gain = ctx.createGain();
                        osc.connect(gain);
                        gain.connect(ctx.destination);
                        osc.type = 'square'; // harsher sound for kitchen
                        osc.frequency.setValueAtTime(600, ctx.currentTime);
                        osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.5);
                        gain.gain.setValueAtTime(0.3, ctx.currentTime);
                        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
                        osc.start();
                        osc.stop(ctx.currentTime + 0.5);
                    } catch (e) {
                        console.error(e);
                    }
                }
            }["KitchenPage.useEffect.playSound"];
            if (activeOrders.length > prevOrderCountRef.current) {
                if (isSoundEnabled) playSound();
            }
            prevOrderCountRef.current = activeOrders.length;
        }
    }["KitchenPage.useEffect"], [
        activeOrders.length,
        isSoundEnabled
    ]);
    // --- Item Aggregation Logic ---
    const aggregatedItems = activeOrders.reduce((acc, order)=>{
        order.items.forEach((item)=>{
            // Clean item name (remove existing qty if present, though usually stored as "Name")
            // Assuming item string is just "Name" or "Name (Qty)"
            // For this logic, we'll just count the raw strings or try to parse
            acc[item] = (acc[item] || 0) + 1;
        });
        return acc;
    }, {});
    // --- KOT Print ---
    const printKOT = (order)=>{
        const content = `
            <html>
            <head>
                <title>KOT #${order.id}</title>
                <style>
                    body { font-family: monospace; padding: 20px; max-width: 300px; }
                    .header { font-size: 20px; font-weight: bold; text-align: center; margin-bottom: 10px; }
                    .meta { font-size: 14px; margin-bottom: 20px; border-bottom: 2px solid #000; padding-bottom: 10px; }
                    .item { font-size: 18px; font-weight: bold; margin-bottom: 10px; }
                </style>
            </head>
            <body>
                <div class="header">KITCHEN TICKET</div>
                <div class="meta">
                    #${order.id}<br>
                    ${order.time}<br>
                    ${order.type}
                </div>
                ${order.items.map((item)=>`<div class="item">□ ${item}</div>`).join('')}
                <script>window.print();</script>
            </body>
            </html>
        `;
        const win = window.open('', '', 'width=300,height=600');
        if (win) {
            win.document.write(content);
            win.document.close();
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4 h-full flex flex-col min-h-screen bg-gray-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col md:flex-row justify-between items-center mb-6 gap-4 animate-in",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-3xl font-bold text-[var(--brand-dark)]",
                                children: "👨‍🍳 Kitchen Display"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/kitchen/page.tsx",
                                lineNumber: 119,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[var(--text-muted)]",
                                children: "Live Order Tracking"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/kitchen/page.tsx",
                                lineNumber: 120,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/kitchen/page.tsx",
                        lineNumber: 118,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-4 items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white p-1 rounded-xl border border-gray-200 flex",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setViewMode('tickets'),
                                        className: `px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'tickets' ? 'bg-[var(--brand-primary)] text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`,
                                        children: "🎫 Tickets"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/kitchen/page.tsx",
                                        lineNumber: 126,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setViewMode('items'),
                                        className: `px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'items' ? 'bg-[var(--brand-primary)] text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`,
                                        children: "🍔 Items"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/kitchen/page.tsx",
                                        lineNumber: 132,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/kitchen/page.tsx",
                                lineNumber: 125,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setIsSoundEnabled(!isSoundEnabled),
                                className: `p-3 rounded-xl border transition-colors ${isSoundEnabled ? 'bg-white text-[var(--brand-primary)] border-[var(--brand-primary)]' : 'bg-gray-100 text-gray-400 border-gray-200'}`,
                                children: isSoundEnabled ? '🔔' : '🔕'
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/kitchen/page.tsx",
                                lineNumber: 141,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-[var(--brand-dark)] text-white px-6 py-2 rounded-xl text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-2xl font-bold leading-none",
                                        children: activeOrders.length
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/kitchen/page.tsx",
                                        lineNumber: 150,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-[10px] uppercase tracking-wider opacity-80",
                                        children: "Pending"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/kitchen/page.tsx",
                                        lineNumber: 151,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/kitchen/page.tsx",
                                lineNumber: 149,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/kitchen/page.tsx",
                        lineNumber: 123,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/kitchen/page.tsx",
                lineNumber: 117,
                columnNumber: 13
            }, this),
            activeOrders.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex flex-col items-center justify-center text-[var(--text-muted)] animate-in",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-8xl mb-6 opacity-20",
                        children: "👨‍🍳"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/kitchen/page.tsx",
                        lineNumber: 159,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold text-gray-400",
                        children: "All Caught Up!"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/kitchen/page.tsx",
                        lineNumber: 160,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-400",
                        children: "Kitchen is clear."
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/kitchen/page.tsx",
                        lineNumber: 161,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/kitchen/page.tsx",
                lineNumber: 158,
                columnNumber: 17
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: viewMode === 'tickets' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in",
                    children: activeOrders.map((order)=>{
                        const elapsed = getElapsedTime(order);
                        const statusColor = getStatusColor(elapsed);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `bg-white rounded-2xl shadow-sm border-2 flex flex-col overflow-hidden transition-all hover:shadow-md ${order.status === 'Pending' ? 'border-yellow-400' : 'border-blue-500'}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `p-4 flex justify-between items-start border-b ${statusColor}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 mb-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-bold text-lg",
                                                            children: [
                                                                "#",
                                                                order.id.toString().slice(-4)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/dashboard/kitchen/page.tsx",
                                                            lineNumber: 177,
                                                            columnNumber: 53
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[10px] uppercase font-bold px-2 py-0.5 bg-white/50 rounded",
                                                            children: order.type
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/kitchen/page.tsx",
                                                            lineNumber: 178,
                                                            columnNumber: 53
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/kitchen/page.tsx",
                                                    lineNumber: 176,
                                                    columnNumber: 49
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs font-mono opacity-80",
                                                    children: order.time
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/kitchen/page.tsx",
                                                    lineNumber: 180,
                                                    columnNumber: 49
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dashboard/kitchen/page.tsx",
                                            lineNumber: 175,
                                            columnNumber: 45
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-right",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-2xl font-bold leading-none",
                                                    children: [
                                                        elapsed,
                                                        "m"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/kitchen/page.tsx",
                                                    lineNumber: 183,
                                                    columnNumber: 49
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-[10px] uppercase font-bold opacity-80",
                                                    children: order.status === 'Cooking' ? 'Cooking' : 'Waiting'
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/kitchen/page.tsx",
                                                    lineNumber: 184,
                                                    columnNumber: 49
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dashboard/kitchen/page.tsx",
                                            lineNumber: 182,
                                            columnNumber: 45
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/kitchen/page.tsx",
                                    lineNumber: 174,
                                    columnNumber: 41
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 flex-1 space-y-3",
                                    children: order.items.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-start gap-3 text-lg font-bold text-gray-800",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "mt-1.5 w-2 h-2 rounded-full bg-gray-300 shrink-0"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/kitchen/page.tsx",
                                                    lineNumber: 192,
                                                    columnNumber: 53
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "leading-tight",
                                                    children: item
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/kitchen/page.tsx",
                                                    lineNumber: 193,
                                                    columnNumber: 53
                                                }, this)
                                            ]
                                        }, idx, true, {
                                            fileName: "[project]/app/dashboard/kitchen/page.tsx",
                                            lineNumber: 191,
                                            columnNumber: 49
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/kitchen/page.tsx",
                                    lineNumber: 189,
                                    columnNumber: 41
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 bg-gray-50 border-t flex gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>printKOT(order),
                                            className: "p-3 bg-white border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-100",
                                            title: "Print KOT",
                                            children: "🖨️"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/kitchen/page.tsx",
                                            lineNumber: 200,
                                            columnNumber: 45
                                        }, this),
                                        order.status === 'Pending' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>updateStatus(order.id, 'Cooking'),
                                            className: "flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-200 transition-all",
                                            children: "Start Cooking"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/kitchen/page.tsx",
                                            lineNumber: 208,
                                            columnNumber: 49
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>updateStatus(order.id, 'Ready'),
                                            className: "flex-1 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold shadow-lg shadow-green-200 transition-all",
                                            children: "Mark Ready"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/kitchen/page.tsx",
                                            lineNumber: 215,
                                            columnNumber: 49
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/kitchen/page.tsx",
                                    lineNumber: 199,
                                    columnNumber: 41
                                }, this)
                            ]
                        }, order.id, true, {
                            fileName: "[project]/app/dashboard/kitchen/page.tsx",
                            lineNumber: 172,
                            columnNumber: 37
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/app/dashboard/kitchen/page.tsx",
                    lineNumber: 166,
                    columnNumber: 25
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 animate-in",
                    children: Object.entries(aggregatedItems).map(([item, count])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-all",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-5xl font-bold text-[var(--brand-primary)] mb-2",
                                    children: count
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/kitchen/page.tsx",
                                    lineNumber: 231,
                                    columnNumber: 37
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-lg font-bold text-gray-800 leading-tight",
                                    children: item
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/kitchen/page.tsx",
                                    lineNumber: 232,
                                    columnNumber: 37
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 text-xs text-gray-400 uppercase tracking-wider font-bold",
                                    children: "To Prepare"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/kitchen/page.tsx",
                                    lineNumber: 233,
                                    columnNumber: 37
                                }, this)
                            ]
                        }, item, true, {
                            fileName: "[project]/app/dashboard/kitchen/page.tsx",
                            lineNumber: 230,
                            columnNumber: 33
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/dashboard/kitchen/page.tsx",
                    lineNumber: 228,
                    columnNumber: 25
                }, this)
            }, void 0, false)
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/kitchen/page.tsx",
        lineNumber: 115,
        columnNumber: 9
    }, this);
}
_s(KitchenPage, "8eqs2H7llbdeRYcNVLxwB8X+Q7M=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOrders"]
    ];
});
_c = KitchenPage;
var _c;
__turbopack_context__.k.register(_c, "KitchenPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_dashboard_kitchen_page_tsx_4bfc2365._.js.map