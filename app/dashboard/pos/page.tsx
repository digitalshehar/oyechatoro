'use client';

import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { useMenu, useSettings, MenuItem, createOrder, getDailyStats, getOrders, Order } from '../../lib/storage';

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    veg: boolean;
    image?: string;
    note?: string; // Special instructions
}

interface HeldOrder {
    id: string;
    name: string;
    cart: CartItem[];
    tableNumber: string;
    orderType: 'Dine In' | 'Takeaway' | 'Delivery';
    timestamp: number;
}

interface Customer {
    id: string;
    name: string;
    phone: string;
    totalOrders: number;
    totalSpent: number;
    lastVisit: string;
}

interface TodaySales {
    totalOrders: number;
    totalRevenue: number;
    cashAmount: number;
    upiAmount: number;
}

const STAFF_LIST = ['Rahul', 'Amit', 'Vijay', 'Priya', 'Neha'];
const PARCEL_CHARGE = 20;
const TOTAL_TABLES = 10; // Configure number of tables

type TableStatus = 'free' | 'occupied' | 'billing';

export default function POSPage() {
    const { categories, items } = useMenu();
    const { settings } = useSettings();
    const [cart, setCart] = useState<CartItem[]>([]);
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [mounted, setMounted] = useState(false);
    const [orderType, setOrderType] = useState<'Dine In' | 'Takeaway' | 'Delivery'>('Dine In');
    const [tableNumber, setTableNumber] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [showCheckout, setShowCheckout] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'UPI' | 'Card'>('Cash');
    const [showSuccess, setShowSuccess] = useState(false);

    // Existing Features State
    const [discountType, setDiscountType] = useState<'percent' | 'flat'>('percent');
    const [discountValue, setDiscountValue] = useState(0);
    const [heldOrders, setHeldOrders] = useState<HeldOrder[]>([]);
    const [showHeldOrders, setShowHeldOrders] = useState(false);
    const [showSplitBill, setShowSplitBill] = useState(false);
    const [splitPayments, setSplitPayments] = useState<{ method: string; amount: number }[]>([]);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [showCustomerSearch, setShowCustomerSearch] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [showQuickKeys, setShowQuickKeys] = useState(true);
    const [quickKeyItems, setQuickKeyItems] = useState<string[]>([]);

    // NEW: Enhanced Features State
    const [parcelCharge, setParcelCharge] = useState(false);
    const [tipAmount, setTipAmount] = useState(0);
    const [orderNotes, setOrderNotes] = useState('');
    const [selectedStaff, setSelectedStaff] = useState('');
    const [amountTendered, setAmountTendered] = useState(0);
    const [showLastOrders, setShowLastOrders] = useState(false);
    const [todaySales, setTodaySales] = useState<TodaySales>({ totalOrders: 0, totalRevenue: 0, cashAmount: 0, upiAmount: 0 });
    const [lastOrders, setLastOrders] = useState<Order[]>([]);
    const [showSalesModal, setShowSalesModal] = useState(false);
    const [showRecentModal, setShowRecentModal] = useState(false);
    const [activeTab, setActiveTab] = useState<'menu' | 'cart'>('menu'); // New Mobile Tab State
    const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
    const [showConfirmClear, setShowConfirmClear] = useState(false);
    const [kotPrinted, setKotPrinted] = useState(false);
    const [viewMode, setViewMode] = useState<'floor' | 'pos'>('floor'); // Floor View toggle
    const [showOnlineModal, setShowOnlineModal] = useState(false); // Online order modal
    const [onlineCustomer, setOnlineCustomer] = useState({ name: '', phone: '', address: '' });

    const searchRef = useRef<HTMLInputElement>(null);

    // Load saved data
    useEffect(() => {
        setMounted(true);
        if (typeof window !== 'undefined') {
            const savedHeldOrders = localStorage.getItem('pos_held_orders');
            if (savedHeldOrders) setHeldOrders(JSON.parse(savedHeldOrders));

            const savedCustomers = localStorage.getItem('pos_customers');
            if (savedCustomers) setCustomers(JSON.parse(savedCustomers));

            const savedQuickKeys = localStorage.getItem('pos_quick_keys');
            if (savedQuickKeys) setQuickKeyItems(JSON.parse(savedQuickKeys));

            const savedStaff = localStorage.getItem('pos_selected_staff'); // Load Staff
            if (savedStaff) setSelectedStaff(savedStaff);
        }
    }, []);

    // Save held orders
    useEffect(() => {
        if (mounted) {
            localStorage.setItem('pos_held_orders', JSON.stringify(heldOrders));
        }
    }, [heldOrders, mounted]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // F1 - Focus Search
            if (e.key === 'F1') {
                e.preventDefault();
                searchRef.current?.focus();
            }
            // F2 - Hold Order
            if (e.key === 'F2') {
                e.preventDefault();
                holdCurrentOrder();
            }
            // F3 - Show Held Orders
            if (e.key === 'F3') {
                e.preventDefault();
                setShowHeldOrders(true);
            }
            // F4 - Clear Cart
            if (e.key === 'F4') {
                e.preventDefault();
                clearCart();
            }
            // F5 - Toggle Quick Keys
            if (e.key === 'F5') {
                e.preventDefault();
                setShowQuickKeys(prev => !prev);
            }
            // F8 - Proceed to Payment
            if (e.key === 'F8' && cart.length > 0) {
                e.preventDefault();
                setShowCheckout(true);
            }
            // F12 - Print Last Receipt
            if (e.key === 'F12') {
                e.preventDefault();
                printLastReceipt();
            }
            // Escape - Close modals
            if (e.key === 'Escape') {
                setShowCheckout(false);
                setShowHeldOrders(false);
                setShowSplitBill(false);
                setShowCustomerSearch(false);
            }
            // Number keys 1-9 for quick add (when not in input)
            if (e.key >= '1' && e.key <= '9' && !(e.target instanceof HTMLInputElement)) {
                const index = parseInt(e.key) - 1;
                if (quickKeyItems[index]) {
                    const item = items.find(i => i.id === quickKeyItems[index]);
                    if (item) addToCart(item);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [cart, items, quickKeyItems]);

    // Refresh Stats & Recent Orders
    const refreshData = () => {
        const stats = getDailyStats();
        setTodaySales({
            totalOrders: stats.totalOrders,
            totalRevenue: stats.totalSales,
            cashAmount: stats.cashSales,
            upiAmount: stats.onlineSales
        });
        setLastOrders(getOrders().slice(0, 10)); // Get last 10
    };

    useEffect(() => {
        if (showSalesModal || showRecentModal) {
            refreshData();
        }
    }, [showSalesModal, showRecentModal]);

    // Get table statuses from active orders
    const getTableStatus = useCallback((tableNum: string): { status: TableStatus; order?: Order } => {
        const activeOrders = getOrders().filter(
            o => o.type === 'Dine-in' &&
                o.table === tableNum &&
                o.status !== 'Completed' &&
                o.status !== 'Cancelled'
        );
        if (activeOrders.length === 0) return { status: 'free' };
        const order = activeOrders[0];
        if (order.status === 'Ready') return { status: 'billing', order };
        return { status: 'occupied', order };
    }, []);

    // Handle table click
    const handleTableClick = (tableNum: string) => {
        const { status, order } = getTableStatus(tableNum);
        setTableNumber(tableNum);
        setOrderType('Dine In');
        if (status === 'free') {
            setCart([]); // Start fresh order
        }
        setViewMode('pos');
        setActiveTab('menu');
    };

    const activeItems = useMemo(() => {
        return items.filter(item => item.status === 'Active');
    }, [items]);

    const filteredItems = useMemo(() => {
        let result = activeItems;
        if (activeCategory !== 'all') {
            result = result.filter(item => item.categoryId === activeCategory);
        }
        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            result = result.filter(item =>
                item.name.toLowerCase().includes(lowerQuery) ||
                item.description.toLowerCase().includes(lowerQuery)
            );
        }
        return result;
    }, [activeItems, activeCategory, searchQuery]);

    const addToCart = useCallback((item: MenuItem) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) {
                return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prev, {
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: 1,
                veg: item.veg,
                image: item.image
            }];
        });
    }, []);

    const removeFromCart = (itemId: string) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === itemId);
            if (existing && existing.quantity > 1) {
                return prev.map(i => i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i);
            }
            return prev.filter(i => i.id !== itemId);
        });
    };

    const clearCart = () => {
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

    const confirmClear = () => {
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

    const updateItemNote = (itemId: string, note: string) => {
        setCart(prev => prev.map(item =>
            item.id === itemId ? { ...item, note } : item
        ));
        setEditingNoteId(null);
    };

    const getItemQty = (itemId: string) => cart.find(i => i.id === itemId)?.quantity || 0;

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountAmount = discountType === 'percent'
        ? Math.round(subtotal * discountValue / 100)
        : discountValue;
    const parcelAmount = parcelCharge && orderType !== 'Dine In' ? PARCEL_CHARGE : 0;
    const taxableAmount = subtotal - discountAmount + parcelAmount;
    const taxAmount = Math.round(taxableAmount * 0.05);
    const cartTotal = taxableAmount + taxAmount + tipAmount;
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const changeAmount = amountTendered > cartTotal ? amountTendered - cartTotal : 0;

    // Hold Order
    const holdCurrentOrder = () => {
        if (cart.length === 0) return;
        const held: HeldOrder = {
            id: Date.now().toString(),
            name: tableNumber ? `Table ${tableNumber}` : `Order ${heldOrders.length + 1}`,
            cart: [...cart],
            tableNumber,
            orderType,
            timestamp: Date.now()
        };
        setHeldOrders(prev => [...prev, held]);
        clearCart();
        setTableNumber('');
    };

    // Resume Held Order
    const resumeHeldOrder = (order: HeldOrder) => {
        setCart(order.cart);
        setTableNumber(order.tableNumber);
        setOrderType(order.orderType);
        setHeldOrders(prev => prev.filter(o => o.id !== order.id));
        setShowHeldOrders(false);
    };

    // Delete Held Order
    const deleteHeldOrder = (orderId: string) => {
        setHeldOrders(prev => prev.filter(o => o.id !== orderId));
    };

    // Add to Quick Keys
    const addToQuickKeys = (itemId: string) => {
        if (quickKeyItems.includes(itemId)) {
            setQuickKeyItems(prev => prev.filter(id => id !== itemId));
        } else if (quickKeyItems.length < 9) {
            setQuickKeyItems(prev => [...prev, itemId]);
        }
        localStorage.setItem('pos_quick_keys', JSON.stringify(quickKeyItems));
    };

    // Print Receipt
    const printReceipt = () => {
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
                ${cart.map(item => `
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
                <script>window.print(); window.close();</script>
            </body>
            </html>
        `;
        receiptWindow.document.write(receiptHTML);
    };

    // Print KOT (Kitchen Order Ticket)
    const printKOT = () => {
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
                ${cart.map(item => `
                    <div class="item">
                        <span class="qty">${item.quantity}x</span> ${item.name}
                        ${item.note ? `<div class="note">⚠️ ${item.note}</div>` : ''}
                    </div>
                `).join('')}
                ${orderNotes ? `<div class="line"></div><div class="note">📝 ${orderNotes}</div>` : ''}
                <div class="line"></div>
                <div class="center bold">--- END OF KOT ---</div>
                <script>window.print(); window.close();</script>
            </body>
            </html>
        `;
        kotWindow.document.write(kotHTML);
        setKotPrinted(true);
    };

    const printLastReceipt = () => {
        // In real implementation, would print last order
        alert('No recent order to print');
    };

    // Save Customer
    const saveCustomer = () => {
        if (!customerPhone) return;

        const existingIndex = customers.findIndex(c => c.phone === customerPhone);
        if (existingIndex >= 0) {
            const updated = [...customers];
            updated[existingIndex] = {
                ...updated[existingIndex],
                name: customerName || updated[existingIndex].name,
                totalOrders: updated[existingIndex].totalOrders + 1,
                totalSpent: updated[existingIndex].totalSpent + cartTotal,
                lastVisit: new Date().toISOString()
            };
            setCustomers(updated);
        } else {
            const newCustomer: Customer = {
                id: Date.now().toString(),
                name: customerName || 'Unknown',
                phone: customerPhone,
                totalOrders: 1,
                totalSpent: cartTotal,
                lastVisit: new Date().toISOString()
            };
            setCustomers(prev => [...prev, newCustomer]);
        }
        localStorage.setItem('pos_customers', JSON.stringify(customers));
    };

    // Search Customer
    const searchCustomer = (phone: string) => {
        const found = customers.find(c => c.phone === phone);
        if (found) {
            setSelectedCustomer(found);
            setCustomerName(found.name);
            setCustomerPhone(found.phone);
        }
    };

    // Handle Checkout
    const handleCheckout = () => {
        if (cart.length === 0) return;

        saveCustomer();

        // Map orderType to Order type format
        const typeMap: { [key: string]: 'Dine-in' | 'Takeaway' | 'Delivery' } = {
            'Dine In': 'Dine-in',
            'Takeaway': 'Takeaway',
            'Delivery': 'Delivery'
        };

        const orderData = {
            items: cart.map(item => `${item.name} (${item.quantity})`),
            total: cartTotal,
            type: typeMap[orderType],
            table: orderType === 'Dine In' ? tableNumber : undefined,
            customer: customerName || 'Walk-in Customer',
            mobile: customerPhone || undefined,
            paymentMethod,
            paymentStatus: 'Paid' as const,
            discount: discountAmount > 0 ? {
                type: discountType === 'percent' ? 'percent' as const : 'amount' as const,
                value: discountValue,
                amount: discountAmount
            } : undefined,
            tip: tipAmount,
            waiterName: selectedStaff,
            waiterCalled: false,
        };


        createOrder(orderData);
        printReceipt();

        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
            setShowCheckout(false);
            clearCart();
            setTableNumber('');
            setCustomerName('');
            setCustomerPhone('');
            setSelectedCustomer(null);
        }, 2000);
    };

    const handlePayLater = () => {
        if (cart.length === 0) return;
        saveCustomer();

        const typeMap: { [key: string]: 'Dine-in' | 'Takeaway' | 'Delivery' } = {
            'Dine In': 'Dine-in',
            'Takeaway': 'Takeaway',
            'Delivery': 'Delivery'
        };

        const orderData = {
            items: cart.map(item => `${item.name} (${item.quantity})`),
            total: cartTotal,
            type: typeMap[orderType],
            table: orderType === 'Dine In' ? tableNumber : undefined,
            customer: customerName || 'Walk-in Customer',
            mobile: customerPhone || undefined,
            paymentMethod: 'Cash' as const, // Default for record, but status is Unpaid
            paymentStatus: 'Unpaid' as const,
            discount: discountAmount > 0 ? {
                type: discountType === 'percent' ? 'percent' as const : 'amount' as const,
                value: discountValue,
                amount: discountAmount
            } : undefined,
            tip: tipAmount,
            waiterName: selectedStaff
        };

        createOrder(orderData);
        printReceipt(); // Optional: might want to print bill without 'Paid' stamp

        setShowSuccess(true);
        setTimeout(() => {
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
    const addSplitPayment = () => {
        const remaining = cartTotal - splitPayments.reduce((s, p) => s + p.amount, 0);
        if (remaining > 0) {
            setSplitPayments(prev => [...prev, { method: 'Cash', amount: remaining }]);
        }
    };

    const updateSplitPayment = (index: number, field: 'method' | 'amount', value: any) => {
        setSplitPayments(prev => prev.map((p, i) => i === index ? { ...p, [field]: value } : p));
    };

    const removeSplitPayment = (index: number) => {
        setSplitPayments(prev => prev.filter((_, i) => i !== index));
    };

    if (!mounted) return null;

    const handleStaffChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const staff = e.target.value;
        setSelectedStaff(staff);
        localStorage.setItem('pos_selected_staff', staff);
    };

    return (
        <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
            {/* Floor View - Table Layout */}
            {viewMode === 'floor' && (
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Floor Header */}
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-white">🪑 Table Floor</h1>
                                <p className="text-white/80 text-sm">Select a table to take order</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setShowSalesModal(true)}
                                    className="px-4 py-2 bg-white/20 text-white rounded-lg font-semibold text-sm hover:bg-white/30"
                                >
                                    📊 Sales
                                </button>
                                <button
                                    onClick={() => setShowRecentModal(true)}
                                    className="px-4 py-2 bg-white/20 text-white rounded-lg font-semibold text-sm hover:bg-white/30"
                                >
                                    🕒 Recent
                                </button>
                                <select
                                    value={selectedStaff}
                                    onChange={handleStaffChange}
                                    className={`px-3 py-2 rounded-lg font-semibold text-sm ${!selectedStaff ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-white/20 text-white'}`}
                                >
                                    <option value="">👤 Staff</option>
                                    {STAFF_LIST.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="bg-white border-b px-4 py-2 flex gap-4 text-xs">
                        <div className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-500"></span> Free</div>
                        <div className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-orange-500"></span> Occupied</div>
                        <div className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-500"></span> Bill Ready</div>
                    </div>

                    {/* Table Grid */}
                    <div className="flex-1 overflow-y-auto p-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {Array.from({ length: TOTAL_TABLES }, (_, i) => {
                                const tableNum = `T-${i + 1}`;
                                const { status, order } = getTableStatus(tableNum);
                                const bgColor = status === 'free' ? 'bg-green-50 border-green-500 hover:bg-green-100' :
                                    status === 'occupied' ? 'bg-orange-50 border-orange-500 hover:bg-orange-100' :
                                        'bg-red-50 border-red-500 hover:bg-red-100';
                                const iconColor = status === 'free' ? 'text-green-500' :
                                    status === 'occupied' ? 'text-orange-500' : 'text-red-500';

                                return (
                                    <button
                                        key={tableNum}
                                        onClick={() => handleTableClick(tableNum)}
                                        className={`p-4 rounded-2xl border-2 ${bgColor} transition-all hover:scale-105 active:scale-95 text-left`}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <span className={`text-3xl ${iconColor}`}>🪑</span>
                                            <span className={`text-xs font-bold px-2 py-1 rounded ${status === 'free' ? 'bg-green-500 text-white' : status === 'occupied' ? 'bg-orange-500 text-white' : 'bg-red-500 text-white'}`}>
                                                {status === 'free' ? 'FREE' : status === 'occupied' ? 'BUSY' : 'BILL'}
                                            </span>
                                        </div>
                                        <div className="text-xl font-bold text-gray-800">{tableNum}</div>
                                        {order && (
                                            <div className="mt-2 text-sm">
                                                <div className="text-gray-500 truncate">{order.items.slice(0, 2).join(', ')}</div>
                                                <div className="font-bold text-orange-600">₹{order.total}</div>
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                            {/* Takeaway Button */}
                            <button
                                onClick={() => { setOrderType('Takeaway'); setTableNumber(''); setViewMode('pos'); setActiveTab('menu'); }}
                                className="p-4 rounded-2xl border-2 bg-blue-50 border-blue-500 hover:bg-blue-100 transition-all hover:scale-105 active:scale-95 text-left"
                            >
                                <span className="text-3xl">📦</span>
                                <div className="text-xl font-bold text-gray-800 mt-2">Takeaway</div>
                                <div className="text-sm text-gray-500">New parcel order</div>
                            </button>
                            {/* Delivery Button */}
                            <button
                                onClick={() => { setOrderType('Delivery'); setTableNumber(''); setViewMode('pos'); setActiveTab('menu'); }}
                                className="p-4 rounded-2xl border-2 bg-purple-50 border-purple-500 hover:bg-purple-100 transition-all hover:scale-105 active:scale-95 text-left"
                            >
                                <span className="text-3xl">🚗</span>
                                <div className="text-xl font-bold text-gray-800 mt-2">Delivery</div>
                                <div className="text-sm text-gray-500">New delivery order</div>
                            </button>
                            {/* Online/Phone Order Button */}
                            <button
                                onClick={() => setShowOnlineModal(true)}
                                className="p-4 rounded-2xl border-2 bg-teal-50 border-teal-500 hover:bg-teal-100 transition-all hover:scale-105 active:scale-95 text-left"
                            >
                                <span className="text-3xl">📞</span>
                                <div className="text-xl font-bold text-gray-800 mt-2">Phone/Online</div>
                                <div className="text-sm text-gray-500">Customer call order</div>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* POS View - Menu & Cart */}
            {viewMode === 'pos' && (
                <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                    {/* Left Side - Menu */}
                    <div className={`flex-1 flex flex-col overflow-hidden ${activeTab === 'cart' ? 'hidden md:flex' : 'flex'}`}>
                        {/* Header */}
                        <div className="bg-white border-b p-3 flex items-center gap-3">
                            <button
                                onClick={() => setViewMode('floor')}
                                className="px-3 py-2 rounded-lg bg-gray-800 text-white font-semibold text-xs flex items-center gap-1"
                            >
                                ← Floor
                            </button>
                            {tableNumber && (
                                <div className="px-3 py-2 bg-orange-100 text-orange-600 rounded-lg font-bold text-xs">
                                    🪑 {tableNumber}
                                </div>
                            )}
                            <div className="flex-1 relative">
                                <input
                                    ref={searchRef}
                                    type="text"
                                    placeholder="🔍 Search items... (F1)"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-4 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm"
                                />
                            </div>
                            <div className="flex gap-1">
                                {['Dine In', 'Takeaway', 'Delivery'].map(type => (
                                    <button
                                        key={type}
                                        onClick={() => setOrderType(type as any)}
                                        className={`px-3 py-2 rounded-lg font-semibold text-xs transition-all ${orderType === type ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        {type === 'Dine In' && '🪑'} {type === 'Takeaway' && '📦'} {type === 'Delivery' && '🚗'} {type}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => setShowHeldOrders(true)}
                                className="relative px-3 py-2 rounded-lg bg-blue-500 text-white font-semibold text-xs"
                            >
                                📋 Held (F3)
                                {heldOrders.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                                        {heldOrders.length}
                                    </span>
                                )}
                            </button>

                            <button
                                onClick={() => setShowRecentModal(true)}
                                className="px-3 py-2 rounded-lg bg-purple-100 text-purple-600 font-semibold text-xs border border-purple-200"
                            >
                                🕒 Recent
                            </button>
                            <button
                                onClick={() => setShowSalesModal(true)}
                                className="px-3 py-2 rounded-lg bg-green-100 text-green-600 font-semibold text-xs border border-green-200"
                            >
                                📊 Sales
                            </button>
                        </div>

                        {/* Quick Keys */}
                        {showQuickKeys && quickKeyItems.length > 0 && (
                            <div className="bg-gradient-to-r from-orange-500 to-red-500 px-3 py-2 flex gap-2 overflow-x-auto">
                                <span className="text-white/80 text-xs font-bold py-1">QUICK:</span>
                                {quickKeyItems.map((itemId, index) => {
                                    const item = items.find(i => i.id === itemId);
                                    if (!item) return null;
                                    return (
                                        <button
                                            key={itemId}
                                            onClick={() => addToCart(item)}
                                            className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-white text-xs font-semibold whitespace-nowrap transition-all"
                                        >
                                            [{index + 1}] {item.name}
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        {/* Categories */}
                        <div className="bg-white border-b px-3 py-2 flex gap-2 overflow-x-auto">
                            <button
                                onClick={() => setActiveCategory('all')}
                                className={`px-3 py-1.5 rounded-lg font-semibold text-xs whitespace-nowrap transition-all ${activeCategory === 'all' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                All
                            </button>
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`px-3 py-1.5 rounded-lg font-semibold text-xs whitespace-nowrap transition-all ${activeCategory === cat.id ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>

                        {/* Menu Grid */}
                        <div className="flex-1 overflow-y-auto p-3">
                            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
                                {filteredItems.map(item => {
                                    const qty = getItemQty(item.id);
                                    const isQuickKey = quickKeyItems.includes(item.id);
                                    return (
                                        <div
                                            key={item.id}
                                            className={`bg-white rounded-xl border-2 overflow-hidden cursor-pointer transition-all hover:shadow-lg active:scale-95 relative ${qty > 0 ? 'border-orange-500 shadow-md' : 'border-transparent'
                                                }`}
                                        >
                                            <div onClick={() => addToCart(item)} className="h-20 relative bg-gray-100">
                                                {item.image ? (
                                                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="120px" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-2xl">🥘</div>
                                                )}
                                                {qty > 0 && (
                                                    <div className="absolute top-1 right-1 bg-orange-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">
                                                        {qty}
                                                    </div>
                                                )}
                                                <div className={`absolute top-1 left-1 w-3 h-3 rounded flex items-center justify-center border ${item.veg ? 'border-green-500 bg-white' : 'border-red-500 bg-white'}`}>
                                                    <div className={`w-1.5 h-1.5 rounded-full ${item.veg ? 'bg-green-500' : 'bg-red-500'}`} />
                                                </div>
                                            </div>
                                            <div className="p-2" onClick={() => addToCart(item)}>
                                                <h3 className="font-semibold text-xs text-gray-800 line-clamp-1">{item.name}</h3>
                                                <p className="text-orange-600 font-bold text-sm">₹{item.price}</p>
                                            </div>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); addToQuickKeys(item.id); }}
                                                className={`absolute bottom-1 right-1 w-5 h-5 rounded text-[10px] ${isQuickKey ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'}`}
                                                title="Add to Quick Keys"
                                            >
                                                ⚡
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Keyboard Shortcuts Bar */}
                        <div className="bg-gray-800 text-white px-3 py-2 flex gap-4 text-[10px] font-mono">
                            <span>F1: Search</span>
                            <span>F2: Hold</span>
                            <span>F3: Held Orders</span>
                            <span>F4: Clear</span>
                            <span>F5: Quick Keys</span>
                            <span>F8: Pay</span>
                            <span>F12: Print</span>
                            <span>1-9: Quick Add</span>
                        </div>
                    </div>

                    {/* Right Side - Cart */}
                    <div className={`w-full md:w-96 bg-white border-l flex flex-col shadow-xl absolute md:relative inset-0 z-20 md:z-auto ${activeTab === 'menu' ? 'hidden md:flex' : 'flex'}`}>
                        <div className="p-3 border-b bg-gradient-to-r from-gray-50 to-gray-100">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-lg font-bold text-gray-800">🛒 Current Order</h2>
                                <div className="flex gap-1">
                                    {cart.length > 0 && (
                                        <>
                                            <button onClick={printKOT} className={`px-2 py-1 rounded text-xs font-semibold ${kotPrinted ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                                {kotPrinted ? '✓ KOT' : '🍳 KOT'}
                                            </button>
                                            <button onClick={holdCurrentOrder} className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs font-semibold">⏸️ Hold</button>
                                            <button onClick={clearCart} className="px-2 py-1 bg-red-100 text-red-600 rounded text-xs font-semibold">🗑️</button>
                                        </>
                                    )}
                                </div>
                            </div>
                            {/* Order Info Row */}
                            <div className="flex gap-2 flex-wrap">
                                {orderType === 'Dine In' && (
                                    <input
                                        type="text"
                                        placeholder="🪑 Table #"
                                        value={tableNumber}
                                        onChange={(e) => setTableNumber(e.target.value)}
                                        className="w-20 px-2 py-1.5 rounded-lg border border-gray-200 focus:border-orange-500 outline-none text-xs"
                                    />
                                )}
                                <select
                                    value={selectedStaff}
                                    onChange={handleStaffChange}
                                    className={`px-2 py-1.5 rounded-lg border border-gray-200 text-xs ${!selectedStaff ? 'animate-pulse border-red-400 bg-red-50' : 'bg-white'}`}
                                >
                                    <option value="">👤 Staff</option>
                                    {STAFF_LIST.map(staff => (
                                        <option key={staff} value={staff}>{staff}</option>
                                    ))}
                                </select>
                                <button
                                    onClick={() => setShowCustomerSearch(true)}
                                    className={`px-2 py-1.5 rounded-lg text-xs font-semibold ${selectedCustomer ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                >
                                    {selectedCustomer ? `✓ ${selectedCustomer.name.split(' ')[0]}` : '👤 Customer'}
                                </button>
                            </div>
                            {/* Order Notes */}
                            <input
                                type="text"
                                placeholder="📝 Order notes (e.g., birthday, allergies...)"
                                value={orderNotes}
                                onChange={(e) => setOrderNotes(e.target.value)}
                                className="w-full mt-2 px-2 py-1.5 rounded-lg border border-gray-200 focus:border-orange-500 outline-none text-xs"
                            />
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-3 space-y-2">
                            {cart.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                    <span className="text-5xl mb-3">🛒</span>
                                    <p className="font-semibold text-sm">Cart is empty</p>
                                    <p className="text-xs">Click items to add</p>
                                </div>
                            ) : (
                                cart.map(item => (
                                    <div key={item.id} className="p-2 bg-gray-50 rounded-xl">
                                        <div className="flex items-center gap-2">
                                            <div className="w-10 h-10 rounded-lg bg-gray-200 overflow-hidden relative flex-shrink-0">
                                                {item.image ? (
                                                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="40px" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-lg">🥘</div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-semibold text-xs text-gray-800 truncate">{item.name}</h4>
                                                <p className="text-orange-600 font-bold text-xs">₹{item.price}</p>
                                            </div>
                                            <div className="flex items-center gap-1 bg-white rounded-lg border p-0.5">
                                                <button onClick={() => removeFromCart(item.id)} className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded font-bold text-gray-600 text-sm">−</button>
                                                <span className="w-5 text-center font-semibold text-xs">{item.quantity}</span>
                                                <button onClick={() => addToCart(item as any)} className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded font-bold text-gray-600 text-sm">+</button>
                                            </div>
                                            <div className="font-bold text-gray-800 w-12 text-right text-xs">₹{item.price * item.quantity}</div>
                                        </div>
                                        {/* Item Note */}
                                        {editingNoteId === item.id ? (
                                            <input
                                                type="text"
                                                placeholder="Add note (e.g., extra spicy, no onion)"
                                                defaultValue={item.note || ''}
                                                autoFocus
                                                onBlur={(e) => updateItemNote(item.id, e.target.value)}
                                                onKeyDown={(e) => { if (e.key === 'Enter') updateItemNote(item.id, (e.target as HTMLInputElement).value); }}
                                                className="w-full mt-1 px-2 py-1 rounded border text-xs"
                                            />
                                        ) : (
                                            <button
                                                onClick={() => setEditingNoteId(item.id)}
                                                className="mt-1 text-xs text-gray-400 hover:text-orange-500"
                                            >
                                                {item.note ? `✏️ ${item.note}` : '+ Add Note'}
                                            </button>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Cart Footer */}
                        {cart.length > 0 && (
                            <div className="border-t p-3 bg-gradient-to-b from-gray-50 to-gray-100 space-y-2">
                                {/* Discount & Parcel Row */}
                                <div className="flex gap-2 items-center">
                                    <select
                                        value={discountType}
                                        onChange={(e) => setDiscountType(e.target.value as any)}
                                        className="px-2 py-1.5 rounded-lg border text-xs"
                                    >
                                        <option value="percent">%</option>
                                        <option value="flat">₹</option>
                                    </select>
                                    <input
                                        type="number"
                                        placeholder="Discount"
                                        value={discountValue || ''}
                                        onChange={(e) => setDiscountValue(Number(e.target.value))}
                                        className="w-16 px-2 py-1.5 rounded-lg border text-xs"
                                    />
                                    <button onClick={() => setDiscountValue(10)} className="px-2 py-1.5 bg-green-100 text-green-600 rounded-lg text-xs font-semibold">10%</button>
                                    <button onClick={() => setDiscountValue(20)} className="px-2 py-1.5 bg-green-100 text-green-600 rounded-lg text-xs font-semibold">20%</button>
                                    {orderType !== 'Dine In' && (
                                        <button
                                            onClick={() => setParcelCharge(!parcelCharge)}
                                            className={`px-2 py-1.5 rounded-lg text-xs font-semibold ${parcelCharge ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}
                                        >
                                            📦 +₹{PARCEL_CHARGE}
                                        </button>
                                    )}
                                </div>

                                {/* Tip Row */}
                                <div className="flex gap-2 items-center">
                                    <span className="text-xs text-gray-500">💝 Tip:</span>
                                    <button onClick={() => setTipAmount(20)} className={`px-2 py-1 rounded text-xs ${tipAmount === 20 ? 'bg-pink-500 text-white' : 'bg-pink-100 text-pink-600'}`}>₹20</button>
                                    <button onClick={() => setTipAmount(50)} className={`px-2 py-1 rounded text-xs ${tipAmount === 50 ? 'bg-pink-500 text-white' : 'bg-pink-100 text-pink-600'}`}>₹50</button>
                                    <button onClick={() => setTipAmount(100)} className={`px-2 py-1 rounded text-xs ${tipAmount === 100 ? 'bg-pink-500 text-white' : 'bg-pink-100 text-pink-600'}`}>₹100</button>
                                    <input
                                        type="number"
                                        placeholder="Custom"
                                        value={tipAmount || ''}
                                        onChange={(e) => setTipAmount(Number(e.target.value))}
                                        className="w-16 px-2 py-1 rounded border text-xs"
                                    />
                                    {tipAmount > 0 && <button onClick={() => setTipAmount(0)} className="text-xs text-red-500">✕</button>}
                                </div>

                                {/* Totals */}
                                <div className="space-y-1 text-xs bg-white rounded-lg p-2">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal ({cartCount} items)</span>
                                        <span>₹{subtotal}</span>
                                    </div>
                                    {discountAmount > 0 && (
                                        <div className="flex justify-between text-green-600">
                                            <span>Discount ({discountType === 'percent' ? `${discountValue}%` : 'Flat'})</span>
                                            <span>-₹{discountAmount}</span>
                                        </div>
                                    )}
                                    {parcelAmount > 0 && (
                                        <div className="flex justify-between text-blue-600">
                                            <span>📦 Parcel Charge</span>
                                            <span>+₹{parcelAmount}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-gray-600">
                                        <span>GST (5%)</span>
                                        <span>₹{taxAmount}</span>
                                    </div>
                                    {tipAmount > 0 && (
                                        <div className="flex justify-between text-pink-600">
                                            <span>💝 Tip</span>
                                            <span>+₹{tipAmount}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-xl font-bold text-gray-800 pt-2 border-t">
                                        <span>Total</span>
                                        <span className="text-orange-600">₹{cartTotal}</span>
                                    </div>
                                </div>

                                {/* Payment Buttons */}
                                <div className="grid grid-cols-3 gap-2">
                                    {(['Cash', 'UPI', 'Card'] as const).map(method => (
                                        <button
                                            key={method}
                                            onClick={() => { setPaymentMethod(method); setShowCheckout(true); }}
                                            className="py-2.5 rounded-xl font-semibold text-xs bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md hover:shadow-lg active:scale-95 transition-all"
                                        >
                                            {method === 'Cash' && '💵'} {method === 'UPI' && '📱'} {method === 'Card' && '💳'} {method}
                                        </button>
                                    ))}
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={() => setShowSplitBill(true)}
                                        className="py-2 rounded-xl font-semibold text-xs bg-purple-100 text-purple-600 hover:bg-purple-200 transition-all"
                                    >
                                        ✂️ Split Bill
                                    </button>
                                    <button
                                        onClick={printReceipt}
                                        className="py-2 rounded-xl font-semibold text-xs bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
                                    >
                                        🖨️ Print Only
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Mobile Bottom Nav */}
                    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex z-30 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                        <button
                            onClick={() => setActiveTab('menu')}
                            className={`flex-1 py-3 flex flex-col items-center justify-center gap-1 ${activeTab === 'menu' ? 'text-orange-600 bg-orange-50' : 'text-gray-500'}`}
                        >
                            <span className="text-xl">🍔</span>
                            <span className="text-xs font-bold">Menu</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('cart')}
                            className={`flex-1 py-3 flex flex-col items-center justify-center gap-1 relative ${activeTab === 'cart' ? 'text-orange-600 bg-orange-50' : 'text-gray-500'}`}
                        >
                            <div className="relative">
                                <span className="text-xl">🛒</span>
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </div>
                            <span className="text-xs font-bold">Cart (₹{cartTotal})</span>
                        </button>
                    </div>

                    {/* Held Orders Modal */}
                    {
                        showHeldOrders && (
                            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowHeldOrders(false)}>
                                <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[80vh] overflow-auto" onClick={e => e.stopPropagation()}>
                                    <h3 className="text-xl font-bold mb-4">📋 Held Orders ({heldOrders.length})</h3>
                                    {heldOrders.length === 0 ? (
                                        <p className="text-gray-500 text-center py-8">No held orders</p>
                                    ) : (
                                        <div className="space-y-3">
                                            {heldOrders.map(order => (
                                                <div key={order.id} className="p-4 bg-gray-50 rounded-xl flex items-center gap-4">
                                                    <div className="flex-1">
                                                        <div className="font-bold">{order.name}</div>
                                                        <div className="text-sm text-gray-500">
                                                            {order.cart.length} items • ₹{order.cart.reduce((s, i) => s + i.price * i.quantity, 0)}
                                                        </div>
                                                        <div className="text-xs text-gray-400">{new Date(order.timestamp).toLocaleTimeString()}</div>
                                                    </div>
                                                    <button onClick={() => resumeHeldOrder(order)} className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold text-sm">Resume</button>
                                                    <button onClick={() => deleteHeldOrder(order.id)} className="px-4 py-2 bg-red-100 text-red-600 rounded-lg font-semibold text-sm">Delete</button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <button onClick={() => setShowHeldOrders(false)} className="w-full mt-4 py-3 rounded-xl font-semibold bg-gray-100 hover:bg-gray-200">Close</button>
                                </div>
                            </div>
                        )
                    }

                    {/* Customer Search Modal */}
                    {
                        showCustomerSearch && (
                            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowCustomerSearch(false)}>
                                <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
                                    <h3 className="text-xl font-bold mb-4">👤 Customer</h3>
                                    <div className="space-y-3">
                                        <input
                                            type="tel"
                                            placeholder="Phone Number"
                                            value={customerPhone}
                                            onChange={(e) => { setCustomerPhone(e.target.value); searchCustomer(e.target.value); }}
                                            className="w-full px-4 py-3 rounded-xl border focus:border-orange-500 outline-none"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            value={customerName}
                                            onChange={(e) => setCustomerName(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border focus:border-orange-500 outline-none"
                                        />
                                        {selectedCustomer && (
                                            <div className="p-3 bg-green-50 rounded-xl">
                                                <p className="text-sm text-green-700">✅ Returning customer: {selectedCustomer.totalOrders} previous orders</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex gap-3 mt-6">
                                        <button onClick={() => setShowCustomerSearch(false)} className="flex-1 py-3 rounded-xl font-semibold bg-gray-100">Cancel</button>
                                        <button onClick={() => setShowCustomerSearch(false)} className="flex-1 py-3 rounded-xl font-semibold bg-orange-500 text-white">Save</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                    {/* Split Bill Modal */}
                    {
                        showSplitBill && (
                            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowSplitBill(false)}>
                                <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
                                    <h3 className="text-xl font-bold mb-4">✂️ Split Bill</h3>
                                    <div className="text-center mb-4">
                                        <div className="text-3xl font-bold text-orange-600">₹{cartTotal}</div>
                                        <div className="text-sm text-gray-500">Total Amount</div>
                                    </div>
                                    <div className="space-y-3 mb-4">
                                        {splitPayments.map((payment, index) => (
                                            <div key={index} className="flex gap-2">
                                                <select
                                                    value={payment.method}
                                                    onChange={(e) => updateSplitPayment(index, 'method', e.target.value)}
                                                    className="px-3 py-2 rounded-lg border"
                                                >
                                                    <option>Cash</option>
                                                    <option>UPI</option>
                                                    <option>Card</option>
                                                </select>
                                                <input
                                                    type="number"
                                                    value={payment.amount}
                                                    onChange={(e) => updateSplitPayment(index, 'amount', Number(e.target.value))}
                                                    className="flex-1 px-3 py-2 rounded-lg border"
                                                />
                                                <button onClick={() => removeSplitPayment(index)} className="px-3 py-2 bg-red-100 text-red-600 rounded-lg">×</button>
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={addSplitPayment} className="w-full py-2 rounded-lg border-2 border-dashed border-gray-300 text-gray-500 mb-4">+ Add Payment</button>
                                    <div className="flex gap-3">
                                        <button onClick={() => setShowSplitBill(false)} className="flex-1 py-3 rounded-xl font-semibold bg-gray-100">Cancel</button>
                                        <button onClick={() => { setShowSplitBill(false); setShowCheckout(true); }} className="flex-1 py-3 rounded-xl font-semibold bg-orange-500 text-white">Confirm</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                    {/* Checkout Modal */}
                    {
                        showCheckout && (
                            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowCheckout(false)}>
                                <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
                                    {showSuccess ? (
                                        <div className="text-center py-8">
                                            <div className="text-6xl mb-4">✅</div>
                                            <h3 className="text-2xl font-bold text-green-600 mb-2">Order Placed!</h3>
                                            <p className="text-gray-500">Printing receipt...</p>
                                            {changeAmount > 0 && (
                                                <div className="mt-4 p-4 bg-green-50 rounded-xl">
                                                    <div className="text-lg">Return Change</div>
                                                    <div className="text-3xl font-bold text-green-600">₹{changeAmount}</div>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <>
                                            <h3 className="text-xl font-bold mb-4">💳 Payment</h3>

                                            {/* Order Summary */}
                                            <div className="bg-gray-50 rounded-xl p-3 mb-4 text-sm space-y-1">
                                                <div className="flex justify-between"><span>Items ({cartCount})</span><span>₹{subtotal}</span></div>
                                                {discountAmount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-₹{discountAmount}</span></div>}
                                                {parcelAmount > 0 && <div className="flex justify-between text-blue-600"><span>Parcel</span><span>+₹{parcelAmount}</span></div>}
                                                <div className="flex justify-between"><span>GST</span><span>₹{taxAmount}</span></div>
                                                {tipAmount > 0 && <div className="flex justify-between text-pink-600"><span>Tip</span><span>+₹{tipAmount}</span></div>}
                                            </div>

                                            <div className="bg-orange-50 rounded-xl p-4 mb-4">
                                                <div className="flex justify-between text-2xl font-bold">
                                                    <span>Total</span>
                                                    <span className="text-orange-600">₹{cartTotal}</span>
                                                </div>
                                            </div>

                                            {/* Payment Method Selection */}
                                            <div className="grid grid-cols-3 gap-2 mb-4">
                                                {(['Cash', 'UPI', 'Card'] as const).map(method => (
                                                    <button
                                                        key={method}
                                                        onClick={() => setPaymentMethod(method)}
                                                        className={`py-3 rounded-xl font-semibold transition-all ${paymentMethod === method ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'}`}
                                                    >
                                                        {method === 'Cash' && '💵'} {method === 'UPI' && '📱'} {method === 'Card' && '💳'} {method}
                                                    </button>
                                                ))}
                                            </div>
                                            <button
                                                onClick={handlePayLater}
                                                className="w-full py-3 mb-4 rounded-xl font-bold text-sm bg-yellow-100 text-yellow-700 border border-yellow-300 hover:bg-yellow-200 transition-all"
                                            >
                                                🕒 Pay Later (Mark as Unpaid)
                                            </button>

                                            {/* Cash Payment - Amount Tendered */}
                                            {paymentMethod === 'Cash' && (
                                                <div className="mb-4 p-3 bg-yellow-50 rounded-xl">
                                                    <label className="text-sm font-semibold text-gray-600 mb-2 block">💵 Amount Received:</label>
                                                    <div className="flex gap-2 mb-2">
                                                        {[cartTotal, Math.ceil(cartTotal / 100) * 100, Math.ceil(cartTotal / 500) * 500].map(amt => (
                                                            <button
                                                                key={amt}
                                                                onClick={() => setAmountTendered(amt)}
                                                                className={`px-3 py-2 rounded-lg text-sm font-semibold ${amountTendered === amt ? 'bg-green-500 text-white' : 'bg-white border'}`}
                                                            >
                                                                ₹{amt}
                                                            </button>
                                                        ))}
                                                    </div>
                                                    <input
                                                        type="number"
                                                        value={amountTendered || ''}
                                                        onChange={(e) => setAmountTendered(Number(e.target.value))}
                                                        placeholder="Enter amount..."
                                                        className="w-full px-4 py-3 rounded-xl border text-xl font-bold text-center"
                                                    />
                                                    {amountTendered >= cartTotal && (
                                                        <div className="mt-3 p-3 bg-green-100 rounded-lg text-center">
                                                            <div className="text-sm text-green-600">Change Due</div>
                                                            <div className="text-3xl font-bold text-green-700">₹{changeAmount}</div>
                                                        </div>
                                                    )}
                                                    {amountTendered > 0 && amountTendered < cartTotal && (
                                                        <div className="mt-3 p-3 bg-red-100 rounded-lg text-center">
                                                            <div className="text-sm text-red-600">Amount Short</div>
                                                            <div className="text-xl font-bold text-red-700">₹{cartTotal - amountTendered}</div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            <div className="flex gap-3">
                                                <button onClick={() => setShowCheckout(false)} className="flex-1 py-3 rounded-xl font-semibold bg-gray-100">Cancel</button>
                                                <button
                                                    onClick={handleCheckout}
                                                    disabled={paymentMethod === 'Cash' && amountTendered < cartTotal && amountTendered > 0}
                                                    className="flex-1 py-3 rounded-xl font-semibold bg-gradient-to-r from-orange-500 to-red-500 text-white disabled:opacity-50"
                                                >
                                                    ✓ Confirm & Print
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        )
                    }

                    {/* Confirm Clear Modal */}
                    {
                        showConfirmClear && (
                            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                                <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl text-center">
                                    <div className="text-5xl mb-4">⚠️</div>
                                    <h3 className="text-xl font-bold mb-2">Clear Cart?</h3>
                                    <p className="text-gray-500 mb-4">This will remove all {cartCount} items from the cart.</p>
                                    <div className="flex gap-3">
                                        <button onClick={() => setShowConfirmClear(false)} className="flex-1 py-3 rounded-xl font-semibold bg-gray-100">Cancel</button>
                                        <button onClick={confirmClear} className="flex-1 py-3 rounded-xl font-semibold bg-red-500 text-white">Yes, Clear</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    {/* Sales Modal */}
                    {
                        showSalesModal && (
                            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowSalesModal(false)}>
                                <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl" onClick={e => e.stopPropagation()}>
                                    <h3 className="text-xl font-bold mb-6">📊 Today's Sales</h3>
                                    <div className="space-y-4">
                                        <div className="bg-orange-50 p-4 rounded-xl flex justify-between items-center">
                                            <span className="text-gray-600">Total Revenue</span>
                                            <span className="text-2xl font-bold text-orange-600">₹{todaySales.totalRevenue}</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-green-50 p-3 rounded-xl">
                                                <div className="text-xs text-gray-500 mb-1">Cash</div>
                                                <div className="text-lg font-bold text-green-600">₹{todaySales.cashAmount}</div>
                                            </div>
                                            <div className="bg-blue-50 p-3 rounded-xl">
                                                <div className="text-xs text-gray-500 mb-1">Online/UPI</div>
                                                <div className="text-lg font-bold text-blue-600">₹{todaySales.upiAmount}</div>
                                            </div>
                                        </div>
                                        <div className="p-3 bg-gray-50 rounded-xl flex justify-between">
                                            <span className="text-gray-600">Total Orders</span>
                                            <span className="font-bold">{todaySales.totalOrders}</span>
                                        </div>
                                    </div>
                                    <button onClick={() => setShowSalesModal(false)} className="w-full mt-6 py-3 rounded-xl font-semibold bg-gray-100">Close</button>
                                </div>
                            </div>
                        )
                    }

                    {/* Recent Orders Modal */}
                    {
                        showRecentModal && (
                            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowRecentModal(false)}>
                                <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[80vh] overflow-auto" onClick={e => e.stopPropagation()}>
                                    <h3 className="text-xl font-bold mb-4">🕒 Recent Orders</h3>
                                    <div className="space-y-3">
                                        {lastOrders.map(order => (
                                            <div key={order.id} className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <div className="font-bold text-sm">#{order.id} - {order.customer}</div>
                                                        <div className="text-xs text-gray-500">{order.items.join(', ')}</div>
                                                    </div>
                                                    <div className={`px-2 py-1 rounded text-xs font-bold ${order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                                        {order.paymentStatus}
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center text-xs text-gray-500">
                                                    <span>{new Date(order.createdAt || 0).toLocaleTimeString()}</span>
                                                    <span className="font-bold text-gray-800 text-sm">₹{order.total}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={() => setShowRecentModal(false)} className="w-full mt-4 py-3 rounded-xl font-semibold bg-gray-100">Close</button>
                                </div>
                            </div>
                        )}
                </div>
            )}

            {/* Online Order Modal */}
            {showOnlineModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowOnlineModal(false)}>
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
                        <h3 className="text-xl font-bold mb-4">📞 Online/Phone Order</h3>
                        <p className="text-sm text-gray-500 mb-4">Customer details for delivery/pickup</p>
                        <div className="space-y-3">
                            <input
                                type="text"
                                placeholder="👤 Customer Name *"
                                value={onlineCustomer.name}
                                onChange={(e) => setOnlineCustomer(prev => ({ ...prev, name: e.target.value }))}
                                className="w-full px-4 py-3 rounded-xl border focus:border-orange-500 outline-none"
                            />
                            <input
                                type="tel"
                                placeholder="📱 Phone Number *"
                                value={onlineCustomer.phone}
                                onChange={(e) => setOnlineCustomer(prev => ({ ...prev, phone: e.target.value }))}
                                className="w-full px-4 py-3 rounded-xl border focus:border-orange-500 outline-none"
                            />
                            <textarea
                                placeholder="🏠 Delivery Address (if delivery)"
                                value={onlineCustomer.address}
                                onChange={(e) => setOnlineCustomer(prev => ({ ...prev, address: e.target.value }))}
                                className="w-full px-4 py-3 rounded-xl border focus:border-orange-500 outline-none resize-none"
                                rows={3}
                            />
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setShowOnlineModal(false)} className="flex-1 py-3 rounded-xl font-semibold bg-gray-100">Cancel</button>
                            <button
                                onClick={() => {
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
                                }}
                                className="flex-1 py-3 rounded-xl font-semibold bg-gradient-to-r from-teal-500 to-green-500 text-white"
                            >
                                Start Order →
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
