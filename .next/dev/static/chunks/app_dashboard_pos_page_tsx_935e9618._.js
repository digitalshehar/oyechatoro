(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/dashboard/pos/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>POSPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function POSPage() {
    _s();
    // ... (existing hooks)
    const [cart, setCart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // ... (existing state)
    // NEW: Modifiers State
    const [showModifierModal, setShowModifierModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedItemForMods, setSelectedItemForMods] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // ... (existing effects)
    const addToCart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "POSPage.useCallback[addToCart]": (item)=>{
            // Check for modifiers
            if (item.modifiers && item.modifiers.length > 0) {
                setSelectedItemForMods(item);
                setShowModifierModal(true);
                return;
            }
            // Direct Add
            addItemToCart(item, [], '');
        }
    }["POSPage.useCallback[addToCart]"], []);
    const addItemToCart = (item, modifiers, note)=>{
        const modifierTotal = modifiers.reduce((sum, m)=>sum + m.price, 0);
        const finalPrice = item.price + modifierTotal;
        // Create a unique ID based on modifiers to separate same items with different mods
        const cartItemId = modifiers.length > 0 ? `${item.id}-${Date.now()}` : item.id;
        setCart((prev)=>{
            // Only merge if exactly same item (same modifiers) - simplified for now:
            // If modifiers exist, we usually treat as distinct line item or need deep comparison.
            // For simplicity, strict equality on ID if no modifiers, else new line item.
            if (modifiers.length === 0) {
                const existing = prev.find((i)=>i.id === item.id && (!i.modifiers || i.modifiers.length === 0));
                if (existing) {
                    return prev.map((i)=>i.id === item.id && (!i.modifiers || i.modifiers.length === 0) ? {
                            ...i,
                            quantity: i.quantity + 1
                        } : i);
                }
            }
            return [
                ...prev,
                {
                    id: cartItemId,
                    name: item.name,
                    price: finalPrice,
                    quantity: 1,
                    veg: item.veg,
                    image: item.image,
                    modifiers,
                    note
                }
            ];
        });
    };
    const handleModifierConfirm = (modifiers, note)=>{
        if (selectedItemForMods) {
            addItemToCart(selectedItemForMods, modifiers, note);
            setShowModifierModal(false);
            setSelectedItemForMods(null);
        }
    };
    const clearCart = ()=>{
        if (cart.length > 0 && !showConfirmClear) {
            setShowConfirmClear(true);
            return;
        }
        setCart([]);
        setDiscountValue(0);
        setSelectedCustomer(null);
        setParcelCharge(false);
        setTipAmount(0);
        setOrderNotes('');
        setSelectedStaff('');
        setAmountTendered(0);
        setKotPrinted(false);
        setShowConfirmClear(false);
    };
    const confirmClear = ()=>{
        setCart([]);
        setDiscountValue(0);
        setSelectedCustomer(null);
        setParcelCharge(false);
        setTipAmount(0);
        setOrderNotes('');
        setSelectedStaff('');
        setAmountTendered(0);
        setKotPrinted(false);
        setShowConfirmClear(false);
    };
    const updateItemNote = (itemId, note)=>{
        setCart((prev)=>prev.map((item)=>item.id === itemId ? {
                    ...item,
                    note
                } : item));
        setEditingNoteId(null);
    };
    const getItemQty = (itemId)=>cart.find((i)=>i.id === itemId)?.quantity || 0;
    const subtotal = cart.reduce((sum, item)=>sum + item.price * item.quantity, 0);
    const discountAmount = discountType === 'percent' ? Math.round(subtotal * discountValue / 100) : discountValue;
    const parcelAmount = parcelCharge && orderType !== 'Dine In' ? PARCEL_CHARGE : 0;
    const taxableAmount = subtotal - discountAmount + parcelAmount;
    const taxAmount = Math.round(taxableAmount * 0.05);
    const cartTotal = taxableAmount + taxAmount + tipAmount;
    const cartCount = cart.reduce((sum, item)=>sum + item.quantity, 0);
    const changeAmount = amountTendered > cartTotal ? amountTendered - cartTotal : 0;
    // Hold Order
    const holdCurrentOrder = ()=>{
        if (cart.length === 0) return;
        const held = {
            id: Date.now().toString(),
            name: tableNumber ? `Table ${tableNumber}` : `Order ${heldOrders.length + 1}`,
            cart: [
                ...cart
            ],
            tableNumber,
            orderType,
            timestamp: Date.now()
        };
        setHeldOrders((prev)=>[
                ...prev,
                held
            ]);
        clearCart();
        setTableNumber('');
    };
    // Resume Held Order
    const resumeHeldOrder = (order)=>{
        setCart(order.cart);
        setTableNumber(order.tableNumber);
        setOrderType(order.orderType);
        setHeldOrders((prev)=>prev.filter((o)=>o.id !== order.id));
        setShowHeldOrders(false);
    };
    // Delete Held Order
    const deleteHeldOrder = (orderId)=>{
        setHeldOrders((prev)=>prev.filter((o)=>o.id !== orderId));
    };
    // Add to Quick Keys
    const addToQuickKeys = (itemId)=>{
        if (quickKeyItems.includes(itemId)) {
            setQuickKeyItems((prev)=>prev.filter((id)=>id !== itemId));
        } else if (quickKeyItems.length < 9) {
            setQuickKeyItems((prev)=>[
                    ...prev,
                    itemId
                ]);
        }
        localStorage.setItem('pos_quick_keys', JSON.stringify(quickKeyItems));
    };
    // Print Receipt
    const printReceipt = ()=>{
        const receiptWindow = window.open('', '_blank', 'width=300,height=600');
        if (!receiptWindow) return;
        const receiptHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Receipt</title>
                <style>
                    body { font-family: 'Courier New', monospace; font-size: 12px; padding: 10px; max-width: 280px; margin: 0 auto; }
                    .center { text-align: center; }
                    .bold { font-weight: bold; }
                    .line { border-top: 1px dashed #000; margin: 10px 0; }
                    .row { display: flex; justify-content: space-between; margin: 3px 0; }
                    .note { font-size: 10px; color: #666; margin-left: 15px; }
                    h1 { font-size: 18px; margin: 5px 0; }
                    h2 { font-size: 14px; margin: 5px 0; }
                </style>
            </head>
            <body>
                <div class="center">
                    <h1>OYE CHATORO</h1>
                    <p>Abu Road, Rajasthan</p>
                    <p>Ph: 9509913792</p>
                </div>
                <div class="line"></div>
                <div class="row"><span>Date:</span><span>${new Date().toLocaleDateString()}</span></div>
                <div class="row"><span>Time:</span><span>${new Date().toLocaleTimeString()}</span></div>
                <div class="row"><span>Type:</span><span>${orderType}</span></div>
                ${tableNumber ? `<div class="row"><span>Table:</span><span>${tableNumber}</span></div>` : ''}
                ${selectedStaff ? `<div class="row"><span>Staff:</span><span>${selectedStaff}</span></div>` : ''}
                ${customerName ? `<div class="row"><span>Customer:</span><span>${customerName}</span></div>` : ''}
                <div class="line"></div>
                ${cart.map((item)=>`
                    <div class="row">
                        <span>${item.quantity}x ${item.name}</span>
                        <span>₹${item.price * item.quantity}</span>
                    </div>
                    ${item.note ? `<div class="note">↳ ${item.note}</div>` : ''}
                `).join('')}
                <div class="line"></div>
                <div class="row"><span>Subtotal:</span><span>₹${subtotal}</span></div>
                ${discountAmount > 0 ? `<div class="row"><span>Discount:</span><span>-₹${discountAmount}</span></div>` : ''}
                ${parcelAmount > 0 ? `<div class="row"><span>Parcel Charge:</span><span>₹${parcelAmount}</span></div>` : ''}
                <div class="row"><span>GST (5%):</span><span>₹${taxAmount}</span></div>
                ${tipAmount > 0 ? `<div class="row"><span>Tip:</span><span>₹${tipAmount}</span></div>` : ''}
                <div class="line"></div>
                <div class="row bold"><span>TOTAL:</span><span>₹${cartTotal}</span></div>
                ${paymentMethod === 'Cash' && amountTendered > 0 ? `
                    <div class="row"><span>Tendered:</span><span>₹${amountTendered}</span></div>
                    <div class="row bold"><span>Change:</span><span>₹${changeAmount}</span></div>
                ` : ''}
                <div class="row"><span>Payment:</span><span>${paymentMethod}</span></div>
                ${orderNotes ? `<div class="line"></div><p><b>Notes:</b> ${orderNotes}</p>` : ''}
                <div class="line"></div>
                <div class="center">
                    <p>Thank you for visiting!</p>
                    <p>Please come again 🙏</p>
                </div>
                <!-- <script>window.print(); window.close();</script> -->
            </body>
            </html>
        `;
        receiptWindow.document.write(receiptHTML);
    };
    // Print KOT (Kitchen Order Ticket)
    const printKOT = ()=>{
        const kotWindow = window.open('', '_blank', 'width=300,height=400');
        if (!kotWindow) return;
        const kotHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>KOT</title>
                <style>
                    body { font-family: 'Courier New', monospace; font-size: 14px; padding: 10px; max-width: 280px; margin: 0 auto; }
                    .center { text-align: center; }
                    .bold { font-weight: bold; font-size: 16px; }
                    .line { border-top: 2px dashed #000; margin: 8px 0; }
                    .item { margin: 8px 0; padding: 5px; background: #f5f5f5; }
                    .qty { font-size: 20px; font-weight: bold; }
                    .note { color: red; font-weight: bold; }
                    h1 { font-size: 22px; margin: 5px 0; }
                </style>
            </head>
            <body>
                <div class="center">
                    <h1>🍳 KITCHEN ORDER</h1>
                    <p class="bold">${new Date().toLocaleTimeString()}</p>
                </div>
                <div class="line"></div>
                <div class="bold">${orderType} ${tableNumber ? '• Table ' + tableNumber : ''}</div>
                <div class="line"></div>
                ${cart.map((item)=>`
                    <div class="item">
                        <span class="qty">${item.quantity}x</span> ${item.name}
                        ${item.note ? `<div class="note">⚠️ ${item.note}</div>` : ''}
                    </div>
                `).join('')}
                ${orderNotes ? `<div class="line"></div><div class="note">📝 ${orderNotes}</div>` : ''}
                <div class="line"></div>
                <div class="center bold">--- END OF KOT ---</div>
                <!-- <script>window.print(); window.close();</script> -->
            </body>
            </html>
        `;
        kotWindow.document.write(kotHTML);
        setKotPrinted(true);
    };
    const printLastReceipt = ()=>{
        // In real implementation, would print last order
        alert('No recent order to print');
    };
    // Save Customer
    const saveCustomer = ()=>{
        if (!customerPhone) return;
        const existingIndex = customers.findIndex((c)=>c.phone === customerPhone);
        if (existingIndex >= 0) {
            const updated = [
                ...customers
            ];
            updated[existingIndex] = {
                ...updated[existingIndex],
                name: customerName || updated[existingIndex].name,
                totalOrders: updated[existingIndex].totalOrders + 1,
                totalSpent: updated[existingIndex].totalSpent + cartTotal,
                lastVisit: new Date().toISOString()
            };
            setCustomers(updated);
        } else {
            const newCustomer = {
                id: Date.now().toString(),
                name: customerName || 'Unknown',
                phone: customerPhone,
                totalOrders: 1,
                totalSpent: cartTotal,
                lastVisit: new Date().toISOString()
            };
            setCustomers((prev)=>[
                    ...prev,
                    newCustomer
                ]);
        }
        localStorage.setItem('pos_customers', JSON.stringify(customers));
    };
    // Search Customer
    const searchCustomer = (phone)=>{
        const found = customers.find((c)=>c.phone === phone);
        if (found) {
            setSelectedCustomer(found);
            setCustomerName(found.name);
            setCustomerPhone(found.phone);
        }
    };
    // Handle Checkout
    const handleCheckout = ()=>{
        if (cart.length === 0) return;
        saveCustomer();
        // Map orderType to Order type format
        const typeMap = {
            'Dine In': 'DineIn',
            'Takeaway': 'Takeaway',
            'Delivery': 'Delivery'
        };
        const orderData = {
            items: cart.map((item)=>({
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    note: item.note
                })),
            total: cartTotal,
            type: typeMap[orderType],
            table: orderType === 'Dine In' ? tableNumber : undefined,
            customer: customerName || 'Walk-in Customer',
            mobile: customerPhone || undefined,
            paymentMethod,
            paymentStatus: 'Paid',
            discount: discountAmount > 0 ? {
                type: discountType === 'percent' ? 'percent' : 'amount',
                value: discountValue,
                amount: discountAmount
            } : undefined,
            tip: tipAmount,
            waiterName: selectedStaff,
            waiterCalled: false
        };
        createDbOrder(orderData).catch(console.error); // Async create
        printReceipt();
        setShowSuccess(true);
        setTimeout(()=>{
            setShowSuccess(false);
            setShowCheckout(false);
            clearCart();
            setTableNumber('');
            setCustomerName('');
            setCustomerPhone('');
            setSelectedCustomer(null);
        }, 2000);
    };
    const handlePayLater = ()=>{
        if (cart.length === 0) return;
        saveCustomer();
        const typeMap = {
            'Dine In': 'DineIn',
            'Takeaway': 'Takeaway',
            'Delivery': 'Delivery'
        };
        const orderData = {
            items: cart.map((item)=>({
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    note: item.note
                })),
            total: cartTotal,
            type: typeMap[orderType],
            table: orderType === 'Dine In' ? tableNumber : undefined,
            customer: customerName || 'Walk-in Customer',
            mobile: customerPhone || undefined,
            paymentMethod: 'Cash',
            paymentStatus: 'Unpaid',
            discount: discountAmount > 0 ? {
                type: discountType === 'percent' ? 'percent' : 'amount',
                value: discountValue,
                amount: discountAmount
            } : undefined,
            tip: tipAmount,
            waiterName: selectedStaff
        };
        createDbOrder(orderData).catch(console.error);
        printReceipt(); // Optional: might want to print bill without 'Paid' stamp
        setShowSuccess(true);
        setTimeout(()=>{
            setShowSuccess(false);
            setShowCheckout(false);
            clearCart();
            setTableNumber('');
            setCustomerName('');
            setCustomerPhone('');
            setSelectedCustomer(null);
        }, 2000);
    };
    // Split Bill Payment
    const addSplitPayment = ()=>{
        const remaining = cartTotal - splitPayments.reduce((s, p)=>s + p.amount, 0);
        if (remaining > 0) {
            setSplitPayments((prev)=>[
                    ...prev,
                    {
                        method: 'Cash',
                        amount: remaining
                    }
                ]);
        }
    };
    const updateSplitPayment = (index, field, value)=>{
        setSplitPayments((prev)=>prev.map((p, i)=>i === index ? {
                    ...p,
                    [field]: value
                } : p));
    };
    const removeSplitPayment = (index)=>{
        setSplitPayments((prev)=>prev.filter((_, i)=>i !== index));
    };
    if (!mounted) return null;
    const handleStaffChange = (e)=>{
        const staff = e.target.value;
        setSelectedStaff(staff);
        localStorage.setItem('pos_selected_staff', staff);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-screen flex flex-col bg-gray-100 overflow-hidden",
        children: [
            viewMode === 'floor' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex flex-col overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gradient-to-r from-orange-500 to-red-500 p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "text-2xl font-bold text-white",
                                            children: "🪑 Table Floor"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                            lineNumber: 462,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-white/80 text-sm",
                                            children: "Select a table to take order"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                            lineNumber: 463,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                    lineNumber: 461,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setShowSalesModal(true),
                                            className: "px-4 py-2 bg-white/20 text-white rounded-lg font-semibold text-sm hover:bg-white/30",
                                            children: "📊 Sales"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                            lineNumber: 466,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setShowRecentModal(true),
                                            className: "px-4 py-2 bg-white/20 text-white rounded-lg font-semibold text-sm hover:bg-white/30",
                                            children: "🕒 Recent"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                            lineNumber: 472,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: selectedStaff,
                                            onChange: handleStaffChange,
                                            className: `px-3 py-2 rounded-lg font-semibold text-sm ${!selectedStaff ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-white/20 text-white'}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "👤 Staff"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                                    lineNumber: 483,
                                                    columnNumber: 37
                                                }, this),
                                                STAFF_LIST.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: s,
                                                        children: s
                                                    }, s, false, {
                                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                                        lineNumber: 484,
                                                        columnNumber: 58
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                            lineNumber: 478,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                    lineNumber: 465,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dashboard/pos/page.tsx",
                            lineNumber: 460,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/pos/page.tsx",
                        lineNumber: 459,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white border-b px-4 py-2 flex gap-4 text-xs",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-3 h-3 rounded bg-green-500"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                        lineNumber: 492,
                                        columnNumber: 66
                                    }, this),
                                    " Free"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                lineNumber: 492,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-3 h-3 rounded bg-orange-500"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                        lineNumber: 493,
                                        columnNumber: 66
                                    }, this),
                                    " Occupied"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                lineNumber: 493,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-3 h-3 rounded bg-red-500"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                        lineNumber: 494,
                                        columnNumber: 66
                                    }, this),
                                    " Bill Ready"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                lineNumber: 494,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/pos/page.tsx",
                        lineNumber: 491,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-y-auto p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4",
                            children: [
                                Array.from({
                                    length: TOTAL_TABLES
                                }, (_, i)=>{
                                    const tableNum = `T-${i + 1}`;
                                    const { status, order } = getTableStatus(tableNum);
                                    const bgColor = status === 'free' ? 'bg-green-50 border-green-500 hover:bg-green-100' : status === 'occupied' ? 'bg-orange-50 border-orange-500 hover:bg-orange-100' : 'bg-red-50 border-red-500 hover:bg-red-100';
                                    const iconColor = status === 'free' ? 'text-green-500' : status === 'occupied' ? 'text-orange-500' : 'text-red-500';
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleTableClick(tableNum),
                                        className: `p-4 rounded-2xl border-2 ${bgColor} transition-all hover:scale-105 active:scale-95 text-left`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `text-3xl ${iconColor}`,
                                                        children: "🪑"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                                        lineNumber: 516,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `text-xs font-bold px-2 py-1 rounded ${status === 'free' ? 'bg-green-500 text-white' : status === 'occupied' ? 'bg-orange-500 text-white' : 'bg-red-500 text-white'}`,
                                                        children: status === 'free' ? 'FREE' : status === 'occupied' ? 'BUSY' : 'BILL'
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                                        lineNumber: 517,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                lineNumber: 515,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xl font-bold text-gray-800",
                                                children: tableNum
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                lineNumber: 521,
                                                columnNumber: 41
                                            }, this),
                                            order && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-2 text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-gray-500 truncate",
                                                        children: order.items.slice(0, 2).join(', ')
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                                        lineNumber: 524,
                                                        columnNumber: 49
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-bold text-orange-600",
                                                        children: [
                                                            "₹",
                                                            order.total
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                                        lineNumber: 525,
                                                        columnNumber: 49
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                lineNumber: 523,
                                                columnNumber: 45
                                            }, this)
                                        ]
                                    }, tableNum, true, {
                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                        lineNumber: 510,
                                        columnNumber: 37
                                    }, this);
                                }),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setOrderType('Takeaway');
                                        setTableNumber('');
                                        setViewMode('pos');
                                        setActiveTab('menu');
                                    },
                                    className: "p-4 rounded-2xl border-2 bg-blue-50 border-blue-500 hover:bg-blue-100 transition-all hover:scale-105 active:scale-95 text-left",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-3xl",
                                            children: "📦"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                            lineNumber: 536,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xl font-bold text-gray-800 mt-2",
                                            children: "Takeaway"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                            lineNumber: 537,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-gray-500",
                                            children: "New parcel order"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                            lineNumber: 538,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                    lineNumber: 532,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setOrderType('Delivery');
                                        setTableNumber('');
                                        setViewMode('pos');
                                        setActiveTab('menu');
                                    },
                                    className: "p-4 rounded-2xl border-2 bg-purple-50 border-purple-500 hover:bg-purple-100 transition-all hover:scale-105 active:scale-95 text-left",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-3xl",
                                            children: "🚗"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                            lineNumber: 545,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xl font-bold text-gray-800 mt-2",
                                            children: "Delivery"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                            lineNumber: 546,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-gray-500",
                                            children: "New delivery order"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                            lineNumber: 547,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                    lineNumber: 541,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowOnlineModal(true),
                                    className: "p-4 rounded-2xl border-2 bg-teal-50 border-teal-500 hover:bg-teal-100 transition-all hover:scale-105 active:scale-95 text-left",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-3xl",
                                            children: "📞"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                            lineNumber: 554,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xl font-bold text-gray-800 mt-2",
                                            children: "Phone/Online"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                            lineNumber: 555,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-gray-500",
                                            children: "Customer call order"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                            lineNumber: 556,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                    lineNumber: 550,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dashboard/pos/page.tsx",
                            lineNumber: 499,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/pos/page.tsx",
                        lineNumber: 498,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/pos/page.tsx",
                lineNumber: 457,
                columnNumber: 17
            }, this),
            viewMode === 'pos' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex flex-col md:flex-row overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `flex-1 flex flex-col overflow-hidden ${activeTab === 'cart' ? 'hidden md:flex' : 'flex'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white border-b p-3 flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setViewMode('floor'),
                                        className: "px-3 py-2 rounded-lg bg-gray-800 text-white font-semibold text-xs flex items-center gap-1",
                                        children: "← Floor"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                        lineNumber: 570,
                                        columnNumber: 29
                                    }, this),
                                    tableNumber && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-3 py-2 bg-orange-100 text-orange-600 rounded-lg font-bold text-xs",
                                        children: [
                                            "🪑 ",
                                            tableNumber
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                        lineNumber: 577,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 relative",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            ref: searchRef,
                                            type: "text",
                                            placeholder: "🔍 Search items... (F1)",
                                            value: searchQuery,
                                            onChange: (e)=>setSearchQuery(e.target.value),
                                            className: "w-full pl-4 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                            lineNumber: 582,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                        lineNumber: 581,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-1",
                                        children: [
                                            'Dine In',
                                            'Takeaway',
                                            'Delivery'
                                        ].map((type)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setOrderType(type),
                                                className: `px-3 py-2 rounded-lg font-semibold text-xs transition-all ${orderType === type ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`,
                                                children: [
                                                    type === 'Dine In' && '🪑',
                                                    " ",
                                                    type === 'Takeaway' && '📦',
                                                    " ",
                                                    type === 'Delivery' && '🚗',
                                                    " ",
                                                    type
                                                ]
                                            }, type, true, {
                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                lineNumber: 593,
                                                columnNumber: 37
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                        lineNumber: 591,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowHeldOrders(true),
                                        className: "relative px-3 py-2 rounded-lg bg-blue-500 text-white font-semibold text-xs",
                                        children: [
                                            "📋 Held (F3)",
                                            heldOrders.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center",
                                                children: heldOrders.length
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                lineNumber: 609,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                        lineNumber: 603,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowRecentModal(true),
                                        className: "px-3 py-2 rounded-lg bg-purple-100 text-purple-600 font-semibold text-xs border border-purple-200",
                                        children: "🕒 Recent"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                        lineNumber: 615,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowSalesModal(true),
                                        className: "px-3 py-2 rounded-lg bg-green-100 text-green-600 font-semibold text-xs border border-green-200",
                                        children: "📊 Sales"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                        lineNumber: 621,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                lineNumber: 569,
                                columnNumber: 25
                            }, this),
                            showQuickKeys && quickKeyItems.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-gradient-to-r from-orange-500 to-red-500 px-3 py-2 flex gap-2 overflow-x-auto",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white/80 text-xs font-bold py-1",
                                        children: "QUICK:"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                        lineNumber: 632,
                                        columnNumber: 33
                                    }, this),
                                    quickKeyItems.map((itemId, index)=>{
                                        const item = items.find((i)=>i.id === itemId);
                                        if (!item) return null;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>addToCart(item),
                                            className: "px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-white text-xs font-semibold whitespace-nowrap transition-all",
                                            children: [
                                                "[",
                                                index + 1,
                                                "] ",
                                                item.name
                                            ]
                                        }, itemId, true, {
                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                            lineNumber: 637,
                                            columnNumber: 41
                                        }, this);
                                    })
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                lineNumber: 631,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white border-b px-3 py-2 flex gap-2 overflow-x-auto",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setActiveCategory('all'),
                                        className: `px-3 py-1.5 rounded-lg font-semibold text-xs whitespace-nowrap transition-all ${activeCategory === 'all' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`,
                                        children: "All"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                        lineNumber: 651,
                                        columnNumber: 29
                                    }, this),
                                    categories.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setActiveCategory(cat.id),
                                            className: `px-3 py-1.5 rounded-lg font-semibold text-xs whitespace-nowrap transition-all ${activeCategory === cat.id ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`,
                                            children: cat.name
                                        }, cat.id, false, {
                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                            lineNumber: 659,
                                            columnNumber: 33
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                lineNumber: 650,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 overflow-y-auto p-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2",
                                    children: filteredItems.map((item)=>{
                                        const qty = getItemQty(item.id);
                                        const isQuickKey = quickKeyItems.includes(item.id);
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `bg-white rounded-xl border-2 overflow-hidden cursor-pointer transition-all hover:shadow-lg active:scale-95 relative ${qty > 0 ? 'border-orange-500 shadow-md' : 'border-transparent'}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    onClick: ()=>addToCart(item),
                                                    className: "h-20 relative bg-gray-100",
                                                    children: [
                                                        item.image ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            src: item.image,
                                                            alt: item.name,
                                                            fill: true,
                                                            className: "object-cover",
                                                            sizes: "120px"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                                            lineNumber: 684,
                                                            columnNumber: 53
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-full h-full flex items-center justify-center text-2xl",
                                                            children: "🥘"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                                            lineNumber: 686,
                                                            columnNumber: 53
                                                        }, this),
                                                        qty > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute top-1 right-1 bg-orange-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold",
                                                            children: qty
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                                            lineNumber: 689,
                                                            columnNumber: 53
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: `absolute top-1 left-1 w-3 h-3 rounded flex items-center justify-center border ${item.veg ? 'border-green-500 bg-white' : 'border-red-500 bg-white'}`,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: `w-1.5 h-1.5 rounded-full ${item.veg ? 'bg-green-500' : 'bg-red-500'}`
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                                lineNumber: 694,
                                                                columnNumber: 53
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                                            lineNumber: 693,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                                    lineNumber: 682,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-2",
                                                    onClick: ()=>addToCart(item),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "font-semibold text-xs text-gray-800 line-clamp-1",
                                                            children: item.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                                            lineNumber: 698,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-orange-600 font-bold text-sm",
                                                            children: [
                                                                "₹",
                                                                item.price
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                                            lineNumber: 699,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                                    lineNumber: 697,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: (e)=>{
                                                        e.stopPropagation();
                                                        addToQuickKeys(item.id);
                                                    },
                                                    className: `absolute bottom-1 right-1 w-5 h-5 rounded text-[10px] ${isQuickKey ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'}`,
                                                    title: "Add to Quick Keys",
                                                    children: "⚡"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                                    lineNumber: 701,
                                                    columnNumber: 45
                                                }, this)
                                            ]
                                        }, item.id, true, {
                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                            lineNumber: 677,
                                            columnNumber: 41
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                    lineNumber: 672,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                lineNumber: 671,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-gray-800 text-white px-3 py-2 flex gap-4 text-[10px] font-mono",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "F1: Search"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                        lineNumber: 716,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "F2: Hold"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                        lineNumber: 717,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "F3: Held Orders"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                        lineNumber: 718,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "F4: Clear"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                        lineNumber: 719,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "F5: Quick Keys"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                        lineNumber: 720,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "F8: Pay"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                        lineNumber: 721,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "F12: Print"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                        lineNumber: 722,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "1-9: Quick Add"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                        lineNumber: 723,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                lineNumber: 715,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/pos/page.tsx",
                        lineNumber: 567,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `w-full md:w-96 bg-white border-l flex flex-col shadow-xl absolute md:relative inset-0 z-20 md:z-auto ${activeTab === 'menu' ? 'hidden md:flex' : 'flex'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-3 border-b bg-gradient-to-r from-gray-50 to-gray-100",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between mb-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-lg font-bold text-gray-800",
                                                children: "🛒 Current Order"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                lineNumber: 731,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-1",
                                                children: cart.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: printKOT,
                                                            className: `px-2 py-1 rounded text-xs font-semibold ${kotPrinted ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`,
                                                            children: kotPrinted ? '✓ KOT' : '🍳 KOT'
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                                            lineNumber: 735,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: holdCurrentOrder,
                                                            className: "px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs font-semibold",
                                                            children: "⏸️ Hold"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                                            lineNumber: 738,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: clearCart,
                                                            className: "px-2 py-1 bg-red-100 text-red-600 rounded text-xs font-semibold",
                                                            children: "🗑️"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                                            lineNumber: 739,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true)
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                lineNumber: 732,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                        lineNumber: 730,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2 flex-wrap",
                                        children: [
                                            orderType === 'Dine In' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                placeholder: "🪑 Table #",
                                                value: tableNumber,
                                                onChange: (e)=>setTableNumber(e.target.value),
                                                className: "w-20 px-2 py-1.5 rounded-lg border border-gray-200 focus:border-orange-500 outline-none text-xs"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                lineNumber: 747,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: selectedStaff,
                                                onChange: handleStaffChange,
                                                className: `px-2 py-1.5 rounded-lg border border-gray-200 text-xs ${!selectedStaff ? 'animate-pulse border-red-400 bg-red-50' : 'bg-white'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "",
                                                        children: "👤 Staff"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                                        lineNumber: 760,
                                                        columnNumber: 37
                                                    }, this),
                                                    STAFF_LIST.map((staff)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: staff,
                                                            children: staff
                                                        }, staff, false, {
                                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                                            lineNumber: 762,
                                                            columnNumber: 41
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                lineNumber: 755,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setShowCustomerSearch(true),
                                                className: `px-2 py-1.5 rounded-lg text-xs font-semibold ${selectedCustomer ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`,
                                                children: selectedCustomer ? `✓ ${selectedCustomer.name.split(' ')[0]}` : '👤 Customer'
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                lineNumber: 765,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                        lineNumber: 745,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "📝 Order notes (e.g., birthday, allergies...)",
                                        value: orderNotes,
                                        onChange: (e)=>setOrderNotes(e.target.value),
                                        className: "w-full mt-2 px-2 py-1.5 rounded-lg border border-gray-200 focus:border-orange-500 outline-none text-xs"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                        lineNumber: 773,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                lineNumber: 729,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 overflow-y-auto p-3 space-y-2",
                                children: cart.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col items-center justify-center h-full text-gray-400",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-5xl mb-3",
                                            children: "🛒"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                            lineNumber: 786,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-semibold text-sm",
                                            children: "Cart is empty"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                            lineNumber: 787,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs",
                                            children: "Click items to add"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                            lineNumber: 788,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                    lineNumber: 785,
                                    columnNumber: 33
                                }, this) : cart.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-2 bg-gray-50 rounded-xl",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-10 h-10 rounded-lg bg-gray-200 overflow-hidden relative flex-shrink-0",
                                                        children: item.image ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            src: item.image,
                                                            alt: item.name,
                                                            fill: true,
                                                            className: "object-cover",
                                                            sizes: "40px"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                                            lineNumber: 796,
                                                            columnNumber: 53
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-full h-full flex items-center justify-center text-lg",
                                                            children: "🥘"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                                            lineNumber: 798,
                                                            columnNumber: 53
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                                        lineNumber: 794,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1 min-w-0",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                className: "font-semibold text-xs text-gray-800 truncate",
                                                                children: item.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                                lineNumber: 802,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-orange-600 font-bold text-xs",
                                                                children: [
                                                                    "₹",
                                                                    item.price
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                                lineNumber: 803,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                                        lineNumber: 801,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-1 bg-white rounded-lg border p-0.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>removeFromCart(item.id),
                                                                className: "w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded font-bold text-gray-600 text-sm",
                                                                children: "−"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                                lineNumber: 806,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "w-5 text-center font-semibold text-xs",
                                                                children: item.quantity
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                                lineNumber: 807,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>addToCart(item),
                                                                className: "w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded font-bold text-gray-600 text-sm",
                                                                children: "+"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                                lineNumber: 808,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                                        lineNumber: 805,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-bold text-gray-800 w-12 text-right text-xs",
                                                        children: [
                                                            "₹",
                                                            item.price * item.quantity
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                                        lineNumber: 810,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                lineNumber: 793,
                                                columnNumber: 41
                                            }, this),
                                            editingNoteId === item.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                placeholder: "Add note (e.g., extra spicy, no onion)",
                                                defaultValue: item.note || '',
                                                autoFocus: true,
                                                onBlur: (e)=>updateItemNote(item.id, e.target.value),
                                                onKeyDown: (e)=>{
                                                    if (e.key === 'Enter') updateItemNote(item.id, e.target.value);
                                                },
                                                className: "w-full mt-1 px-2 py-1 rounded border text-xs"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                lineNumber: 814,
                                                columnNumber: 45
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setEditingNoteId(item.id),
                                                className: "mt-1 text-xs text-gray-400 hover:text-orange-500",
                                                children: item.note ? `✏️ ${item.note}` : '+ Add Note'
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                lineNumber: 824,
                                                columnNumber: 45
                                            }, this)
                                        ]
                                    }, item.id, true, {
                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                        lineNumber: 792,
                                        columnNumber: 37
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                lineNumber: 783,
                                columnNumber: 25
                            }, this),
                            cart.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border-t p-3 bg-gradient-to-b from-gray-50 to-gray-100 space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2 items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: discountType,
                                                onChange: (e)=>setDiscountType(e.target.value),
                                                className: "px-2 py-1.5 rounded-lg border text-xs",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "percent",
                                                        children: "%"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                                        lineNumber: 846,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "flat",
                                                        children: "₹"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                                        lineNumber: 847,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                lineNumber: 841,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                placeholder: "Discount",
                                                value: discountValue || '',
                                                onChange: (e)=>setDiscountValue(Number(e.target.value)),
                                                className: "w-16 px-2 py-1.5 rounded-lg border text-xs"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                lineNumber: 849,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setDiscountValue(10),
                                                className: "px-2 py-1.5 bg-green-100 text-green-600 rounded-lg text-xs font-semibold",
                                                children: "10%"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                lineNumber: 856,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setDiscountValue(20),
                                                className: "px-2 py-1.5 bg-green-100 text-green-600 rounded-lg text-xs font-semibold",
                                                children: "20%"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                lineNumber: 857,
                                                columnNumber: 37
                                            }, this),
                                            orderType !== 'Dine In' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setParcelCharge(!parcelCharge),
                                                className: `px-2 py-1.5 rounded-lg text-xs font-semibold ${parcelCharge ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`,
                                                children: [
                                                    "📦 +₹",
                                                    PARCEL_CHARGE
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                lineNumber: 859,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                        lineNumber: 840,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2 items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-gray-500",
                                                children: "💝 Tip:"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                lineNumber: 870,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setTipAmount(20),
                                                className: `px-2 py-1 rounded text-xs ${tipAmount === 20 ? 'bg-pink-500 text-white' : 'bg-pink-100 text-pink-600'}`,
                                                children: "₹20"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                lineNumber: 871,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setTipAmount(50),
                                                className: `px-2 py-1 rounded text-xs ${tipAmount === 50 ? 'bg-pink-500 text-white' : 'bg-pink-100 text-pink-600'}`,
                                                children: "₹50"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                lineNumber: 872,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setTipAmount(100),
                                                className: `px-2 py-1 rounded text-xs ${tipAmount === 100 ? 'bg-pink-500 text-white' : 'bg-pink-100 text-pink-600'}`,
                                                children: "₹100"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                lineNumber: 873,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                placeholder: "Custom",
                                                value: tipAmount || '',
                                                onChange: (e)=>setTipAmount(Number(e.target.value)),
                                                className: "w-16 px-2 py-1 rounded border text-xs"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                lineNumber: 874,
                                                columnNumber: 37
                                            }, this),
                                            tipAmount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setTipAmount(0),
                                                className: "text-xs text-red-500",
                                                children: "✕"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                lineNumber: 881,
                                                columnNumber: 55
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                        lineNumber: 869,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1 text-xs bg-white rounded-lg p-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between text-gray-600",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "Subtotal (",
                                                            cartCount,
                                                            " items)"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                                        lineNumber: 887,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "₹",
                                                            subtotal
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                                        lineNumber: 888,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                lineNumber: 886,
                                                columnNumber: 37
                                            }, this),
                                            discountAmount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between text-green-600",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "Discount (",
                                                            discountType === 'percent' ? `${discountValue}%` : 'Flat',
                                                            ")"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                                        lineNumber: 892,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "-₹",
                                                            discountAmount
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                                        lineNumber: 893,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                lineNumber: 891,
                                                columnNumber: 41
                                            }, this),
                                            parcelAmount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between text-blue-600",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "📦 Parcel Charge"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                                        lineNumber: 898,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "+₹",
                                                            parcelAmount
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                                        lineNumber: 899,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                lineNumber: 897,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between text-gray-600",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "GST (5%)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                                        lineNumber: 903,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "₹",
                                                            taxAmount
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                                        lineNumber: 904,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                lineNumber: 902,
                                                columnNumber: 37
                                            }, this),
                                            tipAmount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between text-pink-600",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "💝 Tip"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                                        lineNumber: 908,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "+₹",
                                                            tipAmount
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                                        lineNumber: 909,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                lineNumber: 907,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between text-xl font-bold text-gray-800 pt-2 border-t",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Total"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                                        lineNumber: 913,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-orange-600",
                                                        children: [
                                                            "₹",
                                                            cartTotal
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                                        lineNumber: 914,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                lineNumber: 912,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                        lineNumber: 885,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-3 gap-2",
                                        children: [
                                            'Cash',
                                            'UPI',
                                            'Card'
                                        ].map((method)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    setPaymentMethod(method);
                                                    setShowCheckout(true);
                                                },
                                                className: "py-2.5 rounded-xl font-semibold text-xs bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md hover:shadow-lg active:scale-95 transition-all",
                                                children: [
                                                    method === 'Cash' && '💵',
                                                    " ",
                                                    method === 'UPI' && '📱',
                                                    " ",
                                                    method === 'Card' && '💳',
                                                    " ",
                                                    method
                                                ]
                                            }, method, true, {
                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                lineNumber: 921,
                                                columnNumber: 41
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                        lineNumber: 919,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setShowSplitBill(true),
                                                className: "py-2 rounded-xl font-semibold text-xs bg-purple-100 text-purple-600 hover:bg-purple-200 transition-all",
                                                children: "✂️ Split Bill"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                lineNumber: 931,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: printReceipt,
                                                className: "py-2 rounded-xl font-semibold text-xs bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all",
                                                children: "🖨️ Print Only"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                lineNumber: 937,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                        lineNumber: 930,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                lineNumber: 838,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/pos/page.tsx",
                        lineNumber: 728,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex z-30 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveTab('menu'),
                                className: `flex-1 py-3 flex flex-col items-center justify-center gap-1 ${activeTab === 'menu' ? 'text-orange-600 bg-orange-50' : 'text-gray-500'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xl",
                                        children: "🍔"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                        lineNumber: 954,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-bold",
                                        children: "Menu"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                        lineNumber: 955,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                lineNumber: 950,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveTab('cart'),
                                className: `flex-1 py-3 flex flex-col items-center justify-center gap-1 relative ${activeTab === 'cart' ? 'text-orange-600 bg-orange-50' : 'text-gray-500'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xl",
                                                children: "🛒"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                lineNumber: 962,
                                                columnNumber: 33
                                            }, this),
                                            cartCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center",
                                                children: cartCount
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                lineNumber: 964,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                        lineNumber: 961,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-bold",
                                        children: [
                                            "Cart (₹",
                                            cartTotal,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                        lineNumber: 969,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                lineNumber: 957,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/pos/page.tsx",
                        lineNumber: 949,
                        columnNumber: 21
                    }, this),
                    showHeldOrders && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4",
                        onClick: ()=>setShowHeldOrders(false),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[80vh] overflow-auto",
                            onClick: (e)=>e.stopPropagation(),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-bold mb-4",
                                    children: [
                                        "📋 Held Orders (",
                                        heldOrders.length,
                                        ")"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                    lineNumber: 978,
                                    columnNumber: 37
                                }, this),
                                heldOrders.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-500 text-center py-8",
                                    children: "No held orders"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                    lineNumber: 980,
                                    columnNumber: 41
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3",
                                    children: heldOrders.map((order)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-4 bg-gray-50 rounded-xl flex items-center gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "font-bold",
                                                            children: order.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                                            lineNumber: 986,
                                                            columnNumber: 57
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm text-gray-500",
                                                            children: [
                                                                order.cart.length,
                                                                " items • ₹",
                                                                order.cart.reduce((s, i)=>s + i.price * i.quantity, 0)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                                            lineNumber: 987,
                                                            columnNumber: 57
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-gray-400",
                                                            children: new Date(order.timestamp).toLocaleTimeString()
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                                            lineNumber: 990,
                                                            columnNumber: 57
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                                    lineNumber: 985,
                                                    columnNumber: 53
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>resumeHeldOrder(order),
                                                    className: "px-4 py-2 bg-green-500 text-white rounded-lg font-semibold text-sm",
                                                    children: "Resume"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                                    lineNumber: 992,
                                                    columnNumber: 53
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>deleteHeldOrder(order.id),
                                                    className: "px-4 py-2 bg-red-100 text-red-600 rounded-lg font-semibold text-sm",
                                                    children: "Delete"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                                    lineNumber: 993,
                                                    columnNumber: 53
                                                }, this)
                                            ]
                                        }, order.id, true, {
                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                            lineNumber: 984,
                                            columnNumber: 49
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                    lineNumber: 982,
                                    columnNumber: 41
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowHeldOrders(false),
                                    className: "w-full mt-4 py-3 rounded-xl font-semibold bg-gray-100 hover:bg-gray-200",
                                    children: "Close"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                    lineNumber: 998,
                                    columnNumber: 37
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dashboard/pos/page.tsx",
                            lineNumber: 977,
                            columnNumber: 33
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/pos/page.tsx",
                        lineNumber: 976,
                        columnNumber: 29
                    }, this),
                    showCustomerSearch && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4",
                        onClick: ()=>setShowCustomerSearch(false),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl",
                            onClick: (e)=>e.stopPropagation(),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-bold mb-4",
                                    children: "👤 Customer"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                    lineNumber: 1009,
                                    columnNumber: 37
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "tel",
                                            placeholder: "Phone Number",
                                            value: customerPhone,
                                            onChange: (e)=>{
                                                setCustomerPhone(e.target.value);
                                                searchCustomer(e.target.value);
                                            },
                                            className: "w-full px-4 py-3 rounded-xl border focus:border-orange-500 outline-none"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                            lineNumber: 1011,
                                            columnNumber: 41
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            placeholder: "Name",
                                            value: customerName,
                                            onChange: (e)=>setCustomerName(e.target.value),
                                            className: "w-full px-4 py-3 rounded-xl border focus:border-orange-500 outline-none"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                            lineNumber: 1018,
                                            columnNumber: 41
                                        }, this),
                                        selectedCustomer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-3 bg-green-50 rounded-xl",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-green-700",
                                                children: [
                                                    "✅ Returning customer: ",
                                                    selectedCustomer.totalOrders,
                                                    " previous orders"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                lineNumber: 1027,
                                                columnNumber: 49
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                            lineNumber: 1026,
                                            columnNumber: 45
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                    lineNumber: 1010,
                                    columnNumber: 37
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-3 mt-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setShowCustomerSearch(false),
                                            className: "flex-1 py-3 rounded-xl font-semibold bg-gray-100",
                                            children: "Cancel"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                            lineNumber: 1032,
                                            columnNumber: 41
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setShowCustomerSearch(false),
                                            className: "flex-1 py-3 rounded-xl font-semibold bg-orange-500 text-white",
                                            children: "Save"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                            lineNumber: 1033,
                                            columnNumber: 41
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                    lineNumber: 1031,
                                    columnNumber: 37
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dashboard/pos/page.tsx",
                            lineNumber: 1008,
                            columnNumber: 33
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/pos/page.tsx",
                        lineNumber: 1007,
                        columnNumber: 29
                    }, this),
                    showSplitBill && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4",
                        onClick: ()=>setShowSplitBill(false),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl",
                            onClick: (e)=>e.stopPropagation(),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-bold mb-4",
                                    children: "✂️ Split Bill"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                    lineNumber: 1045,
                                    columnNumber: 37
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-3xl font-bold text-orange-600",
                                            children: [
                                                "₹",
                                                cartTotal
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                            lineNumber: 1047,
                                            columnNumber: 41
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-gray-500",
                                            children: "Total Amount"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                            lineNumber: 1048,
                                            columnNumber: 41
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                    lineNumber: 1046,
                                    columnNumber: 37
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3 mb-4",
                                    children: splitPayments.map((payment, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: payment.method,
                                                    onChange: (e)=>updateSplitPayment(index, 'method', e.target.value),
                                                    className: "px-3 py-2 rounded-lg border",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            children: "Cash"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                                            lineNumber: 1058,
                                                            columnNumber: 53
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            children: "UPI"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                                            lineNumber: 1059,
                                                            columnNumber: 53
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            children: "Card"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                                            lineNumber: 1060,
                                                            columnNumber: 53
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                                    lineNumber: 1053,
                                                    columnNumber: 49
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    value: payment.amount,
                                                    onChange: (e)=>updateSplitPayment(index, 'amount', Number(e.target.value)),
                                                    className: "flex-1 px-3 py-2 rounded-lg border"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                                    lineNumber: 1062,
                                                    columnNumber: 49
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>removeSplitPayment(index),
                                                    className: "px-3 py-2 bg-red-100 text-red-600 rounded-lg",
                                                    children: "×"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                                    lineNumber: 1068,
                                                    columnNumber: 49
                                                }, this)
                                            ]
                                        }, index, true, {
                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                            lineNumber: 1052,
                                            columnNumber: 45
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                    lineNumber: 1050,
                                    columnNumber: 37
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: addSplitPayment,
                                    className: "w-full py-2 rounded-lg border-2 border-dashed border-gray-300 text-gray-500 mb-4",
                                    children: "+ Add Payment"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                    lineNumber: 1072,
                                    columnNumber: 37
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setShowSplitBill(false),
                                            className: "flex-1 py-3 rounded-xl font-semibold bg-gray-100",
                                            children: "Cancel"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                            lineNumber: 1074,
                                            columnNumber: 41
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                setShowSplitBill(false);
                                                setShowCheckout(true);
                                            },
                                            className: "flex-1 py-3 rounded-xl font-semibold bg-orange-500 text-white",
                                            children: "Confirm"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                            lineNumber: 1075,
                                            columnNumber: 41
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                    lineNumber: 1073,
                                    columnNumber: 37
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dashboard/pos/page.tsx",
                            lineNumber: 1044,
                            columnNumber: 33
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/pos/page.tsx",
                        lineNumber: 1043,
                        columnNumber: 29
                    }, this),
                    showCheckout && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4",
                        onClick: ()=>setShowCheckout(false),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl",
                            onClick: (e)=>e.stopPropagation(),
                            children: showSuccess ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center py-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-6xl mb-4",
                                        children: "✅"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                        lineNumber: 1089,
                                        columnNumber: 45
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-2xl font-bold text-green-600 mb-2",
                                        children: "Order Placed!"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                        lineNumber: 1090,
                                        columnNumber: 45
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-500",
                                        children: "Printing receipt..."
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                        lineNumber: 1091,
                                        columnNumber: 45
                                    }, this),
                                    changeAmount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4 p-4 bg-green-50 rounded-xl",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-lg",
                                                children: "Return Change"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                lineNumber: 1094,
                                                columnNumber: 53
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-3xl font-bold text-green-600",
                                                children: [
                                                    "₹",
                                                    changeAmount
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                lineNumber: 1095,
                                                columnNumber: 53
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                        lineNumber: 1093,
                                        columnNumber: 49
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                lineNumber: 1088,
                                columnNumber: 41
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xl font-bold mb-4",
                                        children: "💳 Payment"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                        lineNumber: 1101,
                                        columnNumber: 45
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-gray-50 rounded-xl p-3 mb-4 text-sm space-y-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "Items (",
                                                            cartCount,
                                                            ")"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                                        lineNumber: 1105,
                                                        columnNumber: 87
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "₹",
                                                            subtotal
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                                        lineNumber: 1105,
                                                        columnNumber: 119
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                lineNumber: 1105,
                                                columnNumber: 49
                                            }, this),
                                            discountAmount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between text-green-600",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Discount"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                                        lineNumber: 1106,
                                                        columnNumber: 125
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "-₹",
                                                            discountAmount
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                                        lineNumber: 1106,
                                                        columnNumber: 146
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                lineNumber: 1106,
                                                columnNumber: 72
                                            }, this),
                                            parcelAmount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between text-blue-600",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Parcel"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                                        lineNumber: 1107,
                                                        columnNumber: 122
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "+₹",
                                                            parcelAmount
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                                        lineNumber: 1107,
                                                        columnNumber: 141
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                lineNumber: 1107,
                                                columnNumber: 70
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "GST"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                                        lineNumber: 1108,
                                                        columnNumber: 87
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "₹",
                                                            taxAmount
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                                        lineNumber: 1108,
                                                        columnNumber: 103
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                lineNumber: 1108,
                                                columnNumber: 49
                                            }, this),
                                            tipAmount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between text-pink-600",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Tip"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                                        lineNumber: 1109,
                                                        columnNumber: 119
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "+₹",
                                                            tipAmount
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                                        lineNumber: 1109,
                                                        columnNumber: 135
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                lineNumber: 1109,
                                                columnNumber: 67
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                        lineNumber: 1104,
                                        columnNumber: 45
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-orange-50 rounded-xl p-4 mb-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between text-2xl font-bold",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Total"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                                    lineNumber: 1114,
                                                    columnNumber: 53
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-orange-600",
                                                    children: [
                                                        "₹",
                                                        cartTotal
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                                    lineNumber: 1115,
                                                    columnNumber: 53
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                            lineNumber: 1113,
                                            columnNumber: 49
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                        lineNumber: 1112,
                                        columnNumber: 45
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-3 gap-2 mb-4",
                                        children: [
                                            'Cash',
                                            'UPI',
                                            'Card'
                                        ].map((method)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setPaymentMethod(method),
                                                className: `py-3 rounded-xl font-semibold transition-all ${paymentMethod === method ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'}`,
                                                children: [
                                                    method === 'Cash' && '💵',
                                                    " ",
                                                    method === 'UPI' && '📱',
                                                    " ",
                                                    method === 'Card' && '💳',
                                                    " ",
                                                    method
                                                ]
                                            }, method, true, {
                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                lineNumber: 1122,
                                                columnNumber: 53
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                        lineNumber: 1120,
                                        columnNumber: 45
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handlePayLater,
                                        className: "w-full py-3 mb-4 rounded-xl font-bold text-sm bg-yellow-100 text-yellow-700 border border-yellow-300 hover:bg-yellow-200 transition-all",
                                        children: "🕒 Pay Later (Mark as Unpaid)"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                        lineNumber: 1131,
                                        columnNumber: 45
                                    }, this),
                                    paymentMethod === 'Cash' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-4 p-3 bg-yellow-50 rounded-xl",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-sm font-semibold text-gray-600 mb-2 block",
                                                children: "💵 Amount Received:"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                lineNumber: 1141,
                                                columnNumber: 53
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-2 mb-2",
                                                children: [
                                                    cartTotal,
                                                    Math.ceil(cartTotal / 100) * 100,
                                                    Math.ceil(cartTotal / 500) * 500
                                                ].map((amt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setAmountTendered(amt),
                                                        className: `px-3 py-2 rounded-lg text-sm font-semibold ${amountTendered === amt ? 'bg-green-500 text-white' : 'bg-white border'}`,
                                                        children: [
                                                            "₹",
                                                            amt
                                                        ]
                                                    }, amt, true, {
                                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                                        lineNumber: 1144,
                                                        columnNumber: 61
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                lineNumber: 1142,
                                                columnNumber: 53
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                value: amountTendered || '',
                                                onChange: (e)=>setAmountTendered(Number(e.target.value)),
                                                placeholder: "Enter amount...",
                                                className: "w-full px-4 py-3 rounded-xl border text-xl font-bold text-center"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                lineNumber: 1153,
                                                columnNumber: 53
                                            }, this),
                                            amountTendered >= cartTotal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-3 p-3 bg-green-100 rounded-lg text-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm text-green-600",
                                                        children: "Change Due"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                                        lineNumber: 1162,
                                                        columnNumber: 61
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-3xl font-bold text-green-700",
                                                        children: [
                                                            "₹",
                                                            changeAmount
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                                        lineNumber: 1163,
                                                        columnNumber: 61
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                lineNumber: 1161,
                                                columnNumber: 57
                                            }, this),
                                            amountTendered > 0 && amountTendered < cartTotal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-3 p-3 bg-red-100 rounded-lg text-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm text-red-600",
                                                        children: "Amount Short"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                                        lineNumber: 1168,
                                                        columnNumber: 61
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xl font-bold text-red-700",
                                                        children: [
                                                            "₹",
                                                            cartTotal - amountTendered
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                                        lineNumber: 1169,
                                                        columnNumber: 61
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                lineNumber: 1167,
                                                columnNumber: 57
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                        lineNumber: 1140,
                                        columnNumber: 49
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setShowCheckout(false),
                                                className: "flex-1 py-3 rounded-xl font-semibold bg-gray-100",
                                                children: "Cancel"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                lineNumber: 1176,
                                                columnNumber: 49
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleCheckout,
                                                disabled: paymentMethod === 'Cash' && amountTendered < cartTotal && amountTendered > 0,
                                                className: "flex-1 py-3 rounded-xl font-semibold bg-gradient-to-r from-orange-500 to-red-500 text-white disabled:opacity-50",
                                                children: "✓ Confirm & Print"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/pos/page.tsx",
                                                lineNumber: 1177,
                                                columnNumber: 49
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/pos/page.tsx",
                                        lineNumber: 1175,
                                        columnNumber: 45
                                    }, this)
                                ]
                            }, void 0, true)
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/pos/page.tsx",
                            lineNumber: 1086,
                            columnNumber: 33
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/pos/page.tsx",
                        lineNumber: 1085,
                        columnNumber: 29
                    }, this),
                    showConfirmClear && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-5xl mb-4",
                                    children: "⚠️"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                    lineNumber: 1197,
                                    columnNumber: 37
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-bold mb-2",
                                    children: "Clear Cart?"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                    lineNumber: 1198,
                                    columnNumber: 37
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-500 mb-4",
                                    children: [
                                        "This will remove all ",
                                        cartCount,
                                        " items from the cart."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                    lineNumber: 1199,
                                    columnNumber: 37
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setShowConfirmClear(false),
                                            className: "flex-1 py-3 rounded-xl font-semibold bg-gray-100",
                                            children: "Cancel"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                            lineNumber: 1201,
                                            columnNumber: 41
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: confirmClear,
                                            className: "flex-1 py-3 rounded-xl font-semibold bg-red-500 text-white",
                                            children: "Yes, Clear"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                            lineNumber: 1202,
                                            columnNumber: 41
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                    lineNumber: 1200,
                                    columnNumber: 37
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dashboard/pos/page.tsx",
                            lineNumber: 1196,
                            columnNumber: 33
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/pos/page.tsx",
                        lineNumber: 1195,
                        columnNumber: 29
                    }, this),
                    showSalesModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4",
                        onClick: ()=>setShowSalesModal(false),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl",
                            onClick: (e)=>e.stopPropagation(),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-bold mb-6",
                                    children: "📊 Today's Sales"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                    lineNumber: 1213,
                                    columnNumber: 37
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-orange-50 p-4 rounded-xl flex justify-between items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gray-600",
                                                    children: "Total Revenue"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                                    lineNumber: 1216,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-2xl font-bold text-orange-600",
                                                    children: [
                                                        "₹",
                                                        todaySales.totalRevenue
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                                    lineNumber: 1217,
                                                    columnNumber: 45
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                            lineNumber: 1215,
                                            columnNumber: 41
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-green-50 p-3 rounded-xl",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-gray-500 mb-1",
                                                            children: "Cash"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                                            lineNumber: 1221,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-lg font-bold text-green-600",
                                                            children: [
                                                                "₹",
                                                                todaySales.cashAmount
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                                            lineNumber: 1222,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                                    lineNumber: 1220,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-blue-50 p-3 rounded-xl",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-gray-500 mb-1",
                                                            children: "Online/UPI"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                                            lineNumber: 1225,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-lg font-bold text-blue-600",
                                                            children: [
                                                                "₹",
                                                                todaySales.upiAmount
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                                            lineNumber: 1226,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                                    lineNumber: 1224,
                                                    columnNumber: 45
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                            lineNumber: 1219,
                                            columnNumber: 41
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-3 bg-gray-50 rounded-xl flex justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gray-600",
                                                    children: "Total Orders"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                                    lineNumber: 1230,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold",
                                                    children: todaySales.totalOrders
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                                    lineNumber: 1231,
                                                    columnNumber: 45
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                            lineNumber: 1229,
                                            columnNumber: 41
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                    lineNumber: 1214,
                                    columnNumber: 37
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowSalesModal(false),
                                    className: "w-full mt-6 py-3 rounded-xl font-semibold bg-gray-100",
                                    children: "Close"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                    lineNumber: 1234,
                                    columnNumber: 37
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dashboard/pos/page.tsx",
                            lineNumber: 1212,
                            columnNumber: 33
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/pos/page.tsx",
                        lineNumber: 1211,
                        columnNumber: 29
                    }, this),
                    showRecentModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4",
                        onClick: ()=>setShowRecentModal(false),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[80vh] overflow-auto",
                            onClick: (e)=>e.stopPropagation(),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-bold mb-4",
                                    children: "🕒 Recent Orders"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                    lineNumber: 1245,
                                    columnNumber: 37
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3",
                                    children: lastOrders.map((order)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-3 bg-gray-50 rounded-xl border border-gray-100",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between items-start mb-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "font-bold text-sm",
                                                                    children: [
                                                                        "#",
                                                                        order.id,
                                                                        " - ",
                                                                        order.customer
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                                                    lineNumber: 1251,
                                                                    columnNumber: 57
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-xs text-gray-500",
                                                                    children: order.items.join(', ')
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                                                    lineNumber: 1252,
                                                                    columnNumber: 57
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                                            lineNumber: 1250,
                                                            columnNumber: 53
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: `px-2 py-1 rounded text-xs font-bold ${order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`,
                                                            children: order.paymentStatus
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                                            lineNumber: 1254,
                                                            columnNumber: 53
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                                    lineNumber: 1249,
                                                    columnNumber: 49
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between items-center text-xs text-gray-500",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: new Date(order.createdAt || 0).toLocaleTimeString()
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                                            lineNumber: 1259,
                                                            columnNumber: 53
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-bold text-gray-800 text-sm",
                                                            children: [
                                                                "₹",
                                                                order.total
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                                            lineNumber: 1260,
                                                            columnNumber: 53
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                                    lineNumber: 1258,
                                                    columnNumber: 49
                                                }, this)
                                            ]
                                        }, order.id, true, {
                                            fileName: "[project]/app/dashboard/pos/page.tsx",
                                            lineNumber: 1248,
                                            columnNumber: 45
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                    lineNumber: 1246,
                                    columnNumber: 37
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowRecentModal(false),
                                    className: "w-full mt-4 py-3 rounded-xl font-semibold bg-gray-100",
                                    children: "Close"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                    lineNumber: 1265,
                                    columnNumber: 37
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dashboard/pos/page.tsx",
                            lineNumber: 1244,
                            columnNumber: 33
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/pos/page.tsx",
                        lineNumber: 1243,
                        columnNumber: 29
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/pos/page.tsx",
                lineNumber: 565,
                columnNumber: 17
            }, this),
            showOnlineModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4",
                onClick: ()=>setShowOnlineModal(false),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl",
                    onClick: (e)=>e.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-xl font-bold mb-4",
                            children: "📞 Online/Phone Order"
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/pos/page.tsx",
                            lineNumber: 1276,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-gray-500 mb-4",
                            children: "Customer details for delivery/pickup"
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/pos/page.tsx",
                            lineNumber: 1277,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    placeholder: "👤 Customer Name *",
                                    value: onlineCustomer.name,
                                    onChange: (e)=>setOnlineCustomer((prev)=>({
                                                ...prev,
                                                name: e.target.value
                                            })),
                                    className: "w-full px-4 py-3 rounded-xl border focus:border-orange-500 outline-none"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                    lineNumber: 1279,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "tel",
                                    placeholder: "📱 Phone Number *",
                                    value: onlineCustomer.phone,
                                    onChange: (e)=>setOnlineCustomer((prev)=>({
                                                ...prev,
                                                phone: e.target.value
                                            })),
                                    className: "w-full px-4 py-3 rounded-xl border focus:border-orange-500 outline-none"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                    lineNumber: 1286,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    placeholder: "🏠 Delivery Address (if delivery)",
                                    value: onlineCustomer.address,
                                    onChange: (e)=>setOnlineCustomer((prev)=>({
                                                ...prev,
                                                address: e.target.value
                                            })),
                                    className: "w-full px-4 py-3 rounded-xl border focus:border-orange-500 outline-none resize-none",
                                    rows: 3
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                    lineNumber: 1293,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dashboard/pos/page.tsx",
                            lineNumber: 1278,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3 mt-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowOnlineModal(false),
                                    className: "flex-1 py-3 rounded-xl font-semibold bg-gray-100",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                    lineNumber: 1302,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        if (!onlineCustomer.name || !onlineCustomer.phone) {
                                            alert('Please enter name and phone');
                                            return;
                                        }
                                        setCustomerName(onlineCustomer.name);
                                        setCustomerPhone(onlineCustomer.phone);
                                        setOrderNotes(onlineCustomer.address ? `📍 ${onlineCustomer.address}` : '');
                                        setOrderType('Delivery');
                                        setTableNumber('');
                                        setShowOnlineModal(false);
                                        setViewMode('pos');
                                        setActiveTab('menu');
                                    },
                                    className: "flex-1 py-3 rounded-xl font-semibold bg-gradient-to-r from-teal-500 to-green-500 text-white",
                                    children: "Start Order →"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/pos/page.tsx",
                                    lineNumber: 1303,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dashboard/pos/page.tsx",
                            lineNumber: 1301,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/dashboard/pos/page.tsx",
                    lineNumber: 1275,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/dashboard/pos/page.tsx",
                lineNumber: 1274,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/pos/page.tsx",
        lineNumber: 454,
        columnNumber: 9
    }, this);
}
_s(POSPage, "BspmIcseIZVGgvQpno4Cf1u6It4=");
_c = POSPage;
var _c;
__turbopack_context__.k.register(_c, "POSPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_dashboard_pos_page_tsx_935e9618._.js.map