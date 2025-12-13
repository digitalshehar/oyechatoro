'use client';
import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { useDbMenu, useDbOrders, useDbCustomers, MenuItem, Order, Customer } from '../../lib/db-hooks';
import { useDbSettings as useSettings } from '../../lib/db-hooks';
import ModifierModal from '../../components/pos/ModifierModal';
import CheckoutModal from '../../components/pos/CheckoutModal';
import SalesModal from '../../components/pos/SalesModal';
import OnlineOrderModal from '../../components/pos/OnlineOrderModal';
import RecentOrdersModal from '../../components/pos/RecentOrdersModal';
import CustomerSearchModal from '../../components/pos/CustomerSearchModal';

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    veg: boolean;
    image?: string;
    note?: string; // Special instructions
    modifiers?: { name: string; price: number }[];
}

interface HeldOrder {
    id: string;
    name: string;
    cart: CartItem[];
    tableNumber: string;
    orderType: 'Dine In' | 'Takeaway' | 'Delivery';
    timestamp: number;
}

// Customer interface imported from db-hooks

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
    const { categories, items } = useDbMenu();
    const { orders: dbOrders, createOrder: createDbOrder } = useDbOrders();
    const { customers, fetchCustomers, upsertCustomer: upsertDbCustomer } = useDbCustomers();
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
    // const [customers, setCustomers] = useState<Customer[]>([]); // Using DB hook now
    const [showCustomerSearch, setShowCustomerSearch] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [showQuickKeys, setShowQuickKeys] = useState(true);
    const [quickKeyItems, setQuickKeyItems] = useState<string[]>([]);

    // NEW: Enhanced Features State
    const [charges, setCharges] = useState({ packing: 0, delivery: 0 });
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

    // Modifiers State
    const [showModifierModal, setShowModifierModal] = useState(false);
    const [selectedItemForMods, setSelectedItemForMods] = useState<MenuItem | null>(null);

    const searchRef = useRef<HTMLInputElement>(null);

    // Load saved data
    useEffect(() => {
        setMounted(true);
        if (typeof window !== 'undefined') {
            const savedHeldOrders = localStorage.getItem('pos_held_orders');
            if (savedHeldOrders) setHeldOrders(JSON.parse(savedHeldOrders));

            // Removed localStorage customers load

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
                setShowModifierModal(false);
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
        // Calculate daily stats from dbOrders
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        const todayOrders = dbOrders.filter(o =>
            new Date(o.createdAt) >= today &&
            o.status !== 'Cancelled'
        );

        const stats = {
            totalOrders: todayOrders.length,
            totalSales: todayOrders.reduce((sum, o) => sum + Number(o.total), 0),
            cashSales: todayOrders.filter(o => o.paymentMethod === 'Cash').reduce((sum, o) => sum + Number(o.total), 0),
            onlineSales: todayOrders.filter(o => o.paymentMethod === 'UPI' || o.paymentMethod === 'Card' || o.paymentMethod === 'Online').reduce((sum, o) => sum + Number(o.total), 0),
        };

        setTodaySales({
            totalOrders: stats.totalOrders,
            totalRevenue: stats.totalSales,
            cashAmount: stats.cashSales,
            upiAmount: stats.onlineSales
        });

        // Sort by date desc
        const sortedOrders = [...dbOrders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setLastOrders(sortedOrders.slice(0, 10)); // Get last 10
    };

    useEffect(() => {
        if (showSalesModal || showRecentModal) {
            refreshData();
        }
    }, [showSalesModal, showRecentModal]);

    // Get table statuses from active orders
    const getTableStatus = useCallback((tableNum: string): { status: TableStatus; order?: Order } => {
        const activeOrders = dbOrders.filter(
            o => o.type === 'DineIn' && // Note: DB uses 'DineIn', POS state used 'Dine In'
                o.table === tableNum &&
                o.status !== 'Completed' &&
                o.status !== 'Cancelled'
        );
        if (activeOrders.length === 0) return { status: 'free' };
        const order = activeOrders[0];
        if (order.status === 'Ready') return { status: 'billing', order };
        return { status: 'occupied', order };
    }, [dbOrders]);

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
                (item.description || '').toLowerCase().includes(lowerQuery)
            );
        }
        return result;
    }, [activeItems, activeCategory, searchQuery]);

    const addToCart = useCallback((item: MenuItem) => {
        // Check for modifiers
        if (item.modifiers && item.modifiers.length > 0) {
            setSelectedItemForMods(item);
            setShowModifierModal(true);
            return;
        }

        // Direct Add
        addItemToCart(item, [], '');
    }, []);

    const addItemToCart = (item: MenuItem, modifiers: { name: string; price: number }[], note: string) => {
        const modifierTotal = modifiers.reduce((sum, m) => sum + m.price, 0);
        const finalPrice = item.price + modifierTotal;

        // Create a unique ID based on modifiers to separate same items with different mods
        const cartItemId = modifiers.length > 0
            ? `${item.id}-${Date.now()}`
            : item.id;

        setCart(prev => {
            // Only merge if exactly same item (same modifiers)
            if (modifiers.length === 0) {
                const existing = prev.find(i => i.id === item.id && (!i.modifiers || i.modifiers.length === 0));
                if (existing) {
                    return prev.map(i => i.id === item.id && (!i.modifiers || i.modifiers.length === 0) ? { ...i, quantity: i.quantity + 1 } : i);
                }
            }

            return [...prev, {
                id: cartItemId,
                name: item.name,
                price: finalPrice,
                quantity: 1,
                veg: item.veg,
                image: item.image,
                modifiers,
                note
            }];
        });
    };

    const handleModifierConfirm = (modifiers: { name: string; price: number }[], note: string) => {
        if (selectedItemForMods) {
            addItemToCart(selectedItemForMods, modifiers, note);
            setShowModifierModal(false);
            setSelectedItemForMods(null);
        }
    };

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
    const taxableAmount = subtotal - discountAmount + charges.packing + charges.delivery;
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
                    ${item.modifiers ? item.modifiers.map(m => `<div class="note"> + ${m.name}</div>`).join('') : ''}
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
                        ${item.modifiers ? item.modifiers.map(m => `<div class="note">+ ${m.name}</div>`).join('') : ''}
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

    const printLastReceipt = () => {
        // In real implementation, would print last order
        alert('No recent order to print');
    };

    // Save Customer
    const saveCustomer = async () => {
        if (!customerPhone) return;

        // Use upsertDbCustomer from hook
        await upsertDbCustomer({
            name: customerName || 'Unknown',
            phone: customerPhone,
            totalOrders: 1, // Will be incremented by API
            totalSpent: cartTotal
        });
    };

    // Search Customer
    const searchCustomer = (phone: string) => {
        // Trigger fetch with search param
        fetchCustomers(phone);
        // Note: The hook will update 'customers' state. We can try to find from there if already loaded, 
        // but since fetch is async, we might rely on the user seeing the result in a dropdown or similar.
        // For this simple implementation, let's assume if we find it in the current list (which might be filtered by fetch)
        const found = customers.find(c => c.phone.includes(phone));
        if (found && found.phone === phone) {
            setSelectedCustomer(found);
            setCustomerName(found.name);
            setCustomerPhone(found.phone);
        } else {
            // If not exact match yet, just set phone
            setCustomerPhone(phone);
        }
    };

    // Handle Checkout
    const handleCheckout = async () => {
        if (cart.length === 0) return;

        await saveCustomer();

        // Map orderType to Order type format
        const typeMap: { [key: string]: 'DineIn' | 'Takeaway' | 'Delivery' } = {
            'Dine In': 'DineIn',
            'Takeaway': 'Takeaway',
            'Delivery': 'Delivery'
        };

        const orderData = {
            items: cart.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                note: item.note,
                modifiers: item.modifiers // Pass modifiers
            })),
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
            notes: orderNotes,
        };


        createDbOrder(orderData).catch(console.error); // Async create
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

    const handlePayLater = async () => {
        if (cart.length === 0) return;
        await saveCustomer();

        const typeMap: { [key: string]: 'DineIn' | 'Takeaway' | 'Delivery' } = {
            'Dine In': 'DineIn',
            'Takeaway': 'Takeaway',
            'Delivery': 'Delivery'
        };

        const orderData = {
            items: cart.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                note: item.note,
                modifiers: item.modifiers
            })),
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

        createDbOrder(orderData).catch(console.error);
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
                                                <div className="text-gray-500 truncate">{order.items.slice(0, 2).map((i: any) => i.name).join(', ')}</div>
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
                        </div>

                        {/* Categories */}
                        <div className="bg-gray-50 p-2 flex gap-2 overflow-x-auto scrollbar-hide">
                            <button
                                onClick={() => setActiveCategory('all')}
                                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${activeCategory === 'all'
                                    ? 'bg-gray-800 text-white shadow-lg'
                                    : 'bg-white text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                All Items
                            </button>
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${activeCategory === cat.id
                                        ? 'bg-gray-800 text-white shadow-lg'
                                        : 'bg-white text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>

                        {/* Menu Items Grid */}
                        <div className="flex-1 overflow-y-auto p-3">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                {filteredItems.map(item => (
                                    <button
                                        key={item.id}
                                        onClick={() => addToCart(item)}
                                        className="bg-white p-3 rounded-xl border hover:border-orange-500 hover:shadow-lg transition-all text-left group relative overflow-hidden"
                                    >
                                        <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
                                            <span className={`w-3 h-3 rounded-full ${item.veg ? 'bg-green-500' : 'bg-red-500'}`} />
                                            {getItemQty(item.id) > 0 && (
                                                <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">
                                                    {getItemQty(item.id)}
                                                </span>
                                            )}
                                        </div>
                                        <div className="font-bold text-gray-800 text-sm mb-1 pr-4">{item.name}</div>
                                        <div className="text-orange-600 font-bold text-sm">₹{item.price}</div>
                                        {item.modifiers && item.modifiers.length > 0 && <span className="text-[10px] text-gray-400">Customizable</span>}
                                        <div className="absolute inset-0 bg-orange-50 opacity-0 group-hover:opacity-10 transition-opacity" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Cart */}
                    <div className={`w-full md:w-[400px] bg-white border-l flex flex-col ${activeTab === 'menu' ? 'hidden md:flex' : 'flex'}`}>
                        {/* Use CartView Component if extracted, or keep inline. For now, maintaining inline structure from original but mostly complete */}
                        <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <span className="text-xl">🛒</span>
                                <div>
                                    <h2 className="font-bold">Current Order</h2>
                                    <p className="text-xs text-gray-400">{cart.length} items • {tableNumber || orderType}</p>
                                </div>
                            </div>
                            <div className="flex gap-2 min-w-[30%]">
                                <input
                                    type="tel"
                                    placeholder="📱 Mobile No."
                                    value={customerPhone}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setCustomerPhone(val);
                                        if (val.length === 10) searchCustomer(val);
                                    }}
                                    className="w-full bg-white/10 border border-white/20 rounded-lg px-2 py-1 text-sm text-white placeholder-gray-400 outline-none focus:border-orange-500 transition-colors"
                                />
                                {customers.length > 0 && !selectedCustomer && (
                                    <button onClick={() => setShowCustomerSearch(true)} className="p-2 bg-white/10 rounded-lg hover:bg-white/20">👤</button>
                                )}
                                {selectedCustomer && (
                                    <div className="flex items-center gap-2 bg-orange-600 px-2 py-1 rounded-lg text-xs cursor-pointer" onClick={() => setShowCustomerSearch(true)}>
                                        👤 {selectedCustomer.name.split(' ')[0]}
                                    </div>
                                )}
                                <button onClick={() => setViewMode('floor')} className="md:hidden p-2 bg-white/10 rounded-lg">✕</button>
                            </div>
                        </div>

                        {/* Cart Items List */}
                        <div className="flex-1 overflow-y-auto p-2 space-y-2">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-50">
                                    <span className="text-4xl mb-2">🛒</span>
                                    <p>Cart is empty</p>
                                </div>
                            ) : (
                                cart.map(item => (
                                    <div key={item.id} className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex gap-3 group relative">
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-1">
                                                <span className="font-bold text-sm text-gray-800">{item.name}</span>
                                                <span className="font-bold text-gray-800">₹{item.price * item.quantity}</span>
                                            </div>
                                            {item.modifiers && item.modifiers.length > 0 && (
                                                <div className="text-xs text-gray-500 mb-1 flex flex-wrap gap-1">
                                                    {item.modifiers.map((m, idx) => (
                                                        <span key={idx} className="bg-white border px-1 rounded">{m.name}</span>
                                                    ))}
                                                </div>
                                            )}
                                            {item.note && <div className="text-xs text-orange-600 italic mb-1">Note: {item.note}</div>}
                                            {editingNoteId === item.id ? (
                                                <div className="flex gap-2 mt-1">
                                                    <input
                                                        autoFocus
                                                        type="text"
                                                        className="flex-1 text-xs border rounded px-1 py-0.5"
                                                        defaultValue={item.note}
                                                        onBlur={(e) => updateItemNote(item.id, e.target.value)}
                                                        onKeyDown={(e) => e.key === 'Enter' && updateItemNote(item.id, e.currentTarget.value)}
                                                    />
                                                </div>
                                            ) : (
                                                <button onClick={() => setEditingNoteId(item.id)} className="text-[10px] text-blue-500 hover:underline">
                                                    + {item.note ? 'Edit Note' : 'Add Note'}
                                                </button>
                                            )}
                                        </div>

                                        <div className="flex flex-col items-center justify-between gap-2">
                                            <div className="flex items-center gap-2 bg-white rounded-lg border shadow-sm px-1 py-0.5">
                                                <button onClick={() => removeFromCart(item.id)} className="w-6 h-6 flex items-center justify-center text-red-500 hover:bg-red-50 rounded">-</button>
                                                <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                                                <button onClick={() => addToCart({ ...item, modifiers: item.modifiers } as any)} className="w-6 h-6 flex items-center justify-center text-green-500 hover:bg-green-50 rounded">+</button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Cart Summary/Footer */}
                        <div className="bg-white border-t p-4 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
                            <div className="space-y-1 mb-3 text-sm">
                                <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>₹{subtotal}</span></div>

                                {/* Discount Control */}
                                <div className="flex justify-between items-center text-green-600">
                                    <div className="flex items-center gap-1 cursor-pointer hover:bg-green-50 px-1 rounded" onClick={() => setDiscountType(prev => prev === 'percent' ? 'flat' : 'percent')}>
                                        <span>Discount ({discountType === 'percent' ? '%' : '₹'})</span>
                                    </div>
                                    {discountValue > 0 ? (
                                        <div className="flex items-center gap-1">
                                            <span>-₹{discountAmount}</span>
                                            <button onClick={() => setDiscountValue(0)} className="text-xs bg-red-100 text-red-500 rounded px-1">✕</button>
                                        </div>
                                    ) : (
                                        <button onClick={() => {
                                            const val = prompt('Enter Discount ' + (discountType === 'percent' ? '%' : 'Amount'));
                                            if (val) setDiscountValue(Number(val));
                                        }} className="text-xs bg-green-100 px-2 rounded">+ Add</button>
                                    )}
                                </div>

                                {/* Extra Charges Control */}
                                <div className="flex justify-between items-center text-blue-600">
                                    <div className="flex gap-2">
                                        <span>Extra Charges</span>
                                        <button
                                            onClick={() => {
                                                const p = prompt('Enter Packing Charge (₹)', charges.packing.toString());
                                                const d = prompt('Enter Delivery Charge (₹)', charges.delivery.toString());
                                                if (p !== null) setCharges(prev => ({ ...prev, packing: Number(p) }));
                                                if (d !== null) setCharges(prev => ({ ...prev, delivery: Number(d) }));
                                            }}
                                            className="text-xs bg-blue-100 px-2 rounded hover:bg-blue-200"
                                        >
                                            ✏️ Edit
                                        </button>
                                    </div>
                                    <div className="text-right text-xs">
                                        {charges.packing > 0 && <div>Packing: ₹{charges.packing}</div>}
                                        {charges.delivery > 0 && <div>Delivery: ₹{charges.delivery}</div>}
                                    </div>
                                </div>

                                <div className="flex justify-between text-gray-500"><span>GST (5%)</span><span>₹{taxAmount}</span></div>

                                {/* Tip Control */}
                                <div className="flex justify-between items-center text-pink-600">
                                    <span>Tip</span>
                                    {tipAmount > 0 ? (
                                        <div className="flex items-center gap-1">
                                            <span>+₹{tipAmount}</span>
                                            <button onClick={() => setTipAmount(0)} className="text-xs bg-red-100 text-red-500 rounded px-1">✕</button>
                                        </div>
                                    ) : (
                                        <div className="flex gap-1">
                                            {[10, 20, 50].map(amt => (
                                                <button key={amt} onClick={() => setTipAmount(amt)} className="text-[10px] bg-pink-50 px-1 rounded hover:bg-pink-100">+₹{amt}</button>
                                            ))}
                                            <button onClick={() => {
                                                const val = prompt('Enter Tip Amount');
                                                if (val) setTipAmount(Number(val));
                                            }} className="text-[10px] bg-gray-100 px-1 rounded">Custom</button>
                                        </div>
                                    )}
                                </div>
                                <div className="flex justify-between font-bold text-lg pt-2 border-t text-gray-900"><span>Total</span><span>₹{cartTotal}</span></div>
                            </div>

                            <textarea
                                placeholder="📝 Order Notes..."
                                value={orderNotes}
                                onChange={e => setOrderNotes(e.target.value)}
                                className="w-full text-xs p-2 bg-gray-50 rounded-lg mb-3 border-0 focus:ring-1 focus:ring-orange-500 resize-none h-8"
                            />

                            <div className="grid grid-cols-4 gap-2 mb-3">
                                <button onClick={() => setShowSalesModal(true)} className="col-span-1 py-3 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200">📊</button>
                                <button onClick={holdCurrentOrder} className="col-span-1 py-3 rounded-xl font-bold text-blue-600 bg-blue-50 hover:bg-blue-100">⏸ Hold</button>
                                <button onClick={printKOT} className="col-span-1 py-3 rounded-xl font-bold text-purple-600 bg-purple-50 hover:bg-purple-100">👨‍🍳 KOT</button>
                                <button onClick={clearCart} className="col-span-1 py-3 rounded-xl font-bold text-red-600 bg-red-50 hover:bg-red-100">🗑</button>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => handlePayLater()}
                                    disabled={cart.length === 0}
                                    className="flex-1 py-4 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 rounded-xl font-bold shadow-lg shadow-yellow-200 transition-all disabled:opacity-50 disabled:shadow-none"
                                >
                                    Pay Later
                                </button>
                                <button
                                    onClick={() => setShowCheckout(true)}
                                    disabled={cart.length === 0}
                                    className="flex-[2] py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold shadow-lg shadow-orange-200 transition-all disabled:opacity-50 disabled:shadow-none"
                                >
                                    Charge ₹{cartTotal}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile Tab Bar */}
            <div className="md:hidden bg-white border-t flex justify-around p-2">
                <button onClick={() => setActiveTab('menu')} className={`flex flex-col items-center p-2 rounded-lg ${activeTab === 'menu' ? 'text-orange-500 bg-orange-50' : 'text-gray-400'}`}>
                    <span className="text-xl">🍔</span>
                    <span className="text-[10px] font-bold">Menu</span>
                </button>
                <button onClick={() => setActiveTab('cart')} className={`flex flex-col items-center p-2 rounded-lg relative ${activeTab === 'cart' ? 'text-orange-500 bg-orange-50' : 'text-gray-400'}`}>
                    <span className="text-xl">🛒</span>
                    <span className="text-[10px] font-bold">Cart</span>
                    {cart.length > 0 && <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"></span>}
                </button>
            </div>

            {/* Modals */}
            <ModifierModal
                show={showModifierModal}
                itemName={selectedItemForMods?.name || ''}
                basePrice={selectedItemForMods?.price || 0}
                modifiers={selectedItemForMods?.modifiers || []}
                onClose={() => setShowModifierModal(false)}
                onConfirm={handleModifierConfirm}
            />

            <CheckoutModal
                show={showCheckout}
                onClose={() => setShowCheckout(false)}
                showSuccess={showSuccess}
                cartTotal={cartTotal}
                cartCount={cartCount}
                subtotal={subtotal}
                discountAmount={discountAmount}
                parcelAmount={charges.packing + charges.delivery}
                taxAmount={taxAmount}
                tipAmount={tipAmount}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                amountTendered={amountTendered}
                setAmountTendered={setAmountTendered}
                changeAmount={changeAmount}
                onConfirm={handleCheckout}
                onPayLater={handlePayLater}
            />

            <SalesModal
                show={showSalesModal}
                onClose={() => setShowSalesModal(false)}
                totalRevenue={todaySales.totalRevenue}
                cashAmount={todaySales.cashAmount}
                upiAmount={todaySales.upiAmount}
                totalOrders={todaySales.totalOrders}
            />

            <RecentOrdersModal
                show={showRecentModal}
                onClose={() => setShowRecentModal(false)}
                orders={lastOrders}
                onPrintReceipt={(order) => {
                    alert(`Printing receipt for Order #${order.id}`);
                }}
            />

            <OnlineOrderModal
                show={showOnlineModal}
                onClose={() => setShowOnlineModal(false)}
                customer={onlineCustomer}
                setCustomer={setOnlineCustomer}
                onStartOrder={() => {
                    setCustomerName(onlineCustomer.name);
                    setCustomerPhone(onlineCustomer.phone);
                    setShowOnlineModal(false);
                    // Open menu
                    setViewMode('pos');
                    setActiveTab('menu');
                    setOrderType('Delivery'); // Default to delivery/phone
                }}
            />

            <CustomerSearchModal
                show={showCustomerSearch}
                onClose={() => setShowCustomerSearch(false)}
                customers={customers}
                onSearch={fetchCustomers}
                onSelect={(customer) => {
                    setSelectedCustomer(customer);
                    setCustomerName(customer.name);
                    setCustomerPhone(customer.phone);
                    setShowCustomerSearch(false);
                }}
            />
        </div>
    );
}
