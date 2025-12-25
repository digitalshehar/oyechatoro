'use client';
import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useDbMenu, useDbOrders, useDbCustomers, MenuItem, Order, Customer } from '../../lib/db-hooks';
import { useDbSettings as useSettings } from '../../lib/db-hooks';
import ModifierModal from '../../components/pos/ModifierModal';
import CheckoutModalComponent from '../../components/pos/CheckoutModal';
import SalesModalComponent from '../../components/pos/SalesModal';
import OnlineOrderModal from '../../components/pos/OnlineOrderModal';
import RecentOrdersModal from '../../components/pos/RecentOrdersModal';
import CustomerSearchModal from '../../components/pos/CustomerSearchModal';

interface CartItem {
    id: string;
    menuItemId: string;
    name: string;
    price: number;
    quantity: number;
    veg: boolean;
    image?: string;
    note?: string;
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

interface TodaySales {
    totalOrders: number;
    totalRevenue: number;
    cashAmount: number;
    upiAmount: number;
}

const STAFF_LIST = ['Rahul', 'Amit', 'Vijay', 'Priya', 'Neha'];
const TOTAL_TABLES = 10;

type TableStatus = 'free' | 'occupied' | 'billing';

export default function POSPage() {
    const { categories, items } = useDbMenu();
    const { orders: dbOrders, createOrder: createDbOrder, updateOrder } = useDbOrders();
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
    const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'Online'>('Cash');
    const [showSuccess, setShowSuccess] = useState(false);

    const [discountType, setDiscountType] = useState<'percent' | 'flat'>('percent');
    const [discountValue, setDiscountValue] = useState(0);
    const [heldOrders, setHeldOrders] = useState<HeldOrder[]>([]);
    const [showHeldOrders, setShowHeldOrders] = useState(false);
    const [showQuickKeys, setShowQuickKeys] = useState(true);
    const [quickKeyItems, setQuickKeyItems] = useState<string[]>([]);

    const [charges, setCharges] = useState({ packing: 0, delivery: 0 });
    const [tipAmount, setTipAmount] = useState(0);
    const [orderNotes, setOrderNotes] = useState('');
    const [selectedStaff, setSelectedStaff] = useState('');
    const [amountTendered, setAmountTendered] = useState(0);
    const [todaySales, setTodaySales] = useState<TodaySales>({ totalOrders: 0, totalRevenue: 0, cashAmount: 0, upiAmount: 0 });
    const [lastOrders, setLastOrders] = useState<Order[]>([]);
    const [showSalesModal, setShowSalesModal] = useState(false);
    const [showRecentModal, setShowRecentModal] = useState(false);
    const [activeTab, setActiveTab] = useState<'menu' | 'cart'>('menu');
    const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
    const [showConfirmClear, setShowConfirmClear] = useState(false);
    const [kotPrinted, setKotPrinted] = useState(false);
    const [viewMode, setViewMode] = useState<'floor' | 'pos'>('floor');
    const [showOnlineModal, setShowOnlineModal] = useState(false);
    const [onlineCustomer, setOnlineCustomer] = useState({ name: '', phone: '', address: '' });

    const [showModifierModal, setShowModifierModal] = useState(false);
    const [selectedItemForMods, setSelectedItemForMods] = useState<MenuItem | null>(null);

    const [activeOrderId, setActiveOrderId] = useState<number | null>(null);
    const [existingItems, setExistingItems] = useState<any[]>([]);
    const [existingTotal, setExistingTotal] = useState(0);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [showCustomerSearch, setShowCustomerSearch] = useState(false);

    const searchRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setMounted(true);
        if (typeof window !== 'undefined') {
            const savedHeldOrders = localStorage.getItem('pos_held_orders');
            if (savedHeldOrders) setHeldOrders(JSON.parse(savedHeldOrders));
            const savedQuickKeys = localStorage.getItem('pos_quick_keys');
            if (savedQuickKeys) setQuickKeyItems(JSON.parse(savedQuickKeys));
            const savedStaff = localStorage.getItem('pos_selected_staff');
            if (savedStaff) setSelectedStaff(savedStaff);
        }
    }, []);

    useEffect(() => {
        if (mounted) {
            localStorage.setItem('pos_held_orders', JSON.stringify(heldOrders));
        }
    }, [heldOrders, mounted]);

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountAmount = discountType === 'percent' ? Math.round(subtotal * discountValue / 100) : discountValue;
    const parcelAmount = charges.packing + charges.delivery;
    const cartTotal = subtotal - discountAmount + parcelAmount + tipAmount;
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const changeAmount = amountTendered > cartTotal ? amountTendered - cartTotal : 0;

    const clearCart = () => {
        setCart([]);
        setDiscountValue(0);
        setSelectedCustomer(null);
        setCharges({ packing: 0, delivery: 0 });
        setTipAmount(0);
        setOrderNotes('');
        setAmountTendered(0);
        setKotPrinted(false);
        setShowConfirmClear(false);
    };

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
        setViewMode('floor');
    };

    const printKOT = () => {
        const kotWindow = window.open('', '_blank', 'width=300,height=400');
        if (!kotWindow) return;
        const kotHTML = `
            <html><body style="font-family:monospace;padding:10px;">
                <h2 align="center">KITCHEN ORDER</h2>
                <p align="center">${new Date().toLocaleTimeString()}</p>
                <hr/>
                <b>${orderType} ${tableNumber ? '• ' + tableNumber : ''}</b>
                <hr/>
                ${cart.map(item => `<div>${item.quantity}x ${item.name} ${item.note ? '<br/><i>Note: ' + item.note + '</i>' : ''}</div>`).join('<br/>')}
                <hr/>
                <p align="center">--- END ---</p>
                <script>window.print(); window.close();</script>
            </body></html>
        `;
        kotWindow.document.write(kotHTML);
        setKotPrinted(true);
    };

    const printReceipt = (status: string, method: string) => {
        const receiptWindow = window.open('', '_blank', 'width=300,height=600');
        if (!receiptWindow) return;
        const receiptHTML = `
            <html><body style="font-family:monospace;padding:10px;font-size:12px;">
                <h2 align="center">OYE CHATORO</h2>
                <p align="center">Abu Road, Rajasthan<br/>Ph: 9509913792</p>
                <hr/>
                <div>Date: ${new Date().toLocaleDateString()}</div>
                <div>Time: ${new Date().toLocaleTimeString()}</div>
                <div>Type: ${orderType}</div>
                ${tableNumber ? `<div>Table: ${tableNumber}</div>` : ''}
                <hr/>
                ${cart.map(item => `<div style="display:flex;justify-content:space-between;"><span>${item.quantity}x ${item.name}</span><span>${item.price * item.quantity}</span></div>`).join('')}
                <hr/>
                <div style="display:flex;justify-content:space-between;"><span>Subtotal</span><span>${subtotal}</span></div>
                ${parcelAmount > 0 ? `<div style="display:flex;justify-content:space-between;"><span>Charges</span><span>${parcelAmount}</span></div>` : ''}
                ${discountAmount > 0 ? `<div style="display:flex;justify-content:space-between;"><span>Discount</span><span>-${discountAmount}</span></div>` : ''}
                <hr/>
                <div style="display:flex;justify-content:space-between;font-weight:bold;"><span>TOTAL</span><span>${cartTotal}</span></div>
                <hr/>
                <div align="center">THANK YOU!</div>
                <script>window.print(); window.close();</script>
            </body></html>
        `;
        receiptWindow.document.write(receiptHTML);
    };

    const handleCheckout = async () => {
        if (cart.length === 0) return;
        const orderData = {
            items: cart.map(item => ({ id: item.menuItemId, name: item.name, quantity: item.quantity, price: item.price, note: item.note, modifiers: item.modifiers })),
            total: cartTotal,
            type: orderType.replace(' ', '') as any,
            table: tableNumber || undefined,
            customer: customerName || 'Walk-in',
            mobile: customerPhone || undefined,
            paymentMethod,
            paymentStatus: 'Paid' as const,
        };
        await createDbOrder(orderData);
        printReceipt('Paid', paymentMethod);
        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
            setShowCheckout(false);
            clearCart();
            setViewMode('floor');
        }, 1500);
    };

    const handlePayLater = async () => {
        if (cart.length === 0) return;
        const orderData = {
            items: cart.map(item => ({ id: item.menuItemId, name: item.name, quantity: item.quantity, price: item.price, note: item.note, modifiers: item.modifiers })),
            total: cartTotal,
            type: orderType.replace(' ', '') as any,
            table: tableNumber || undefined,
            customer: customerName || 'Walk-in',
            mobile: customerPhone || undefined,
            paymentMethod: 'Cash' as const,
            paymentStatus: 'Unpaid' as const,
        };
        await createDbOrder(orderData);
        printReceipt('Unpaid', 'Cash');
        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
            setShowCheckout(false);
            clearCart();
            setViewMode('floor');
        }, 1500);
    };

    const addToCart = (item: MenuItem) => {
        setCart(prev => {
            const existing = prev.find(i => i.menuItemId === item.id);
            if (existing) return prev.map(i => i.menuItemId === item.id ? { ...i, quantity: i.quantity + 1 } : i);
            return [...prev, { id: `cart_${Date.now()}`, menuItemId: item.id, name: item.name, price: item.price, quantity: 1, veg: item.veg }];
        });
    };

    const removeFromCart = (id: string) => {
        setCart(prev => {
            const item = prev.find(i => i.id === id);
            if (item && item.quantity > 1) return prev.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i);
            return prev.filter(i => i.id !== id);
        });
    };

    const handleTableClick = (num: string) => {
        setTableNumber(num);
        setOrderType('Dine In');
        setViewMode('pos');
    };

    const refreshData = () => {
        const stats = {
            totalOrders: dbOrders.length,
            totalRevenue: dbOrders.reduce((s, o) => s + Number(o.total), 0),
            cashAmount: dbOrders.filter(o => o.paymentMethod === 'Cash').reduce((s, o) => s + Number(o.total), 0),
            upiAmount: dbOrders.filter(o => o.paymentMethod !== 'Cash').reduce((s, o) => s + Number(o.total), 0),
        };
        setTodaySales(stats);
        setLastOrders([...dbOrders].sort((a, b) => b.id - a.id).slice(0, 10));
    };

    useEffect(() => { if (showSalesModal || showRecentModal) refreshData(); }, [showSalesModal, showRecentModal, dbOrders]);

    if (!mounted) return null;

    return (
        <div className="flex-1 flex flex-col bg-gray-100 overflow-hidden">
            {viewMode === 'floor' ? (
                <div className="flex-1 flex flex-col p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">🪑 Floor Layout</h1>
                        <div className="flex gap-2">
                            <button onClick={() => setShowSalesModal(true)} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Stats</button>
                            <button onClick={() => setShowRecentModal(true)} className="px-4 py-2 bg-gray-500 text-white rounded-lg">Recent</button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {Array.from({ length: 10 }, (_, i) => (
                            <button key={i} onClick={() => handleTableClick(`T-${i + 1}`)} className="p-8 bg-white rounded-xl shadow border-2 border-transparent hover:border-orange-500 font-bold text-xl">
                                Table {i + 1}
                            </button>
                        ))}
                        <button onClick={() => { setOrderType('Takeaway'); setViewMode('pos'); }} className="p-8 bg-blue-50 rounded-xl shadow border-2 border-blue-500 font-bold text-xl">📦 Takeaway</button>
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex overflow-hidden">
                    <div className="flex-1 flex flex-col border-r bg-white">
                        <div className="p-4 border-b flex gap-2">
                            <button onClick={() => setViewMode('floor')} className="px-4 py-2 bg-gray-200 rounded-lg font-bold">← Floor</button>
                            <input ref={searchRef} type="text" placeholder="Search menu..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="flex-1 px-4 py-2 border rounded-lg" />
                        </div>
                        <div className="p-4 flex gap-2 overflow-x-auto">
                            <button onClick={() => setActiveCategory('all')} className={`px-4 py-2 rounded-full font-bold ${activeCategory === 'all' ? 'bg-orange-500 text-white' : 'bg-gray-100'}`}>All</button>
                            {categories.map(c => (
                                <button key={c.id} onClick={() => setActiveCategory(c.id)} className={`px-4 py-2 rounded-full font-bold ${activeCategory === c.id ? 'bg-orange-500 text-white' : 'bg-gray-100'}`}>{c.name}</button>
                            ))}
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                            {items.filter(i => activeCategory === 'all' || i.categoryId === activeCategory).map(item => (
                                <button key={item.id} onClick={() => addToCart(item)} className="p-4 bg-white border rounded-xl hover:shadow-lg text-left">
                                    <div className="font-bold">{item.name}</div>
                                    <div className="text-orange-500 font-bold">₹{item.price}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="w-96 flex flex-col bg-gray-50">
                        <div className="p-4 bg-gray-800 text-white font-bold flex justify-between">
                            <span>{tableNumber || orderType}</span>
                            <span>{cart.length} items</span>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-2">
                            {cart.map(item => (
                                <div key={item.id} className="bg-white p-3 rounded-lg shadow-sm flex justify-between items-center">
                                    <div className="flex-1">
                                        <div className="font-bold text-sm">{item.name}</div>
                                        <div className="text-xs text-gray-500">₹{item.price}</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => removeFromCart(item.id)} className="w-8 h-8 bg-gray-100 rounded">-</button>
                                        <span className="font-bold">{item.quantity}</span>
                                        <button onClick={() => addToCart({ id: item.menuItemId, name: item.name, price: item.price } as any)} className="w-8 h-8 bg-gray-100 rounded">+</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 bg-white border-t space-y-2">
                            <div className="flex justify-between text-gray-500 italic text-xs"><span>Subtotal</span><span>₹{subtotal}</span></div>
                            <div className="flex justify-between font-bold text-xl"><span>Total</span><span>₹{cartTotal}</span></div>
                            <div className="grid grid-cols-2 gap-2 pt-4">
                                <button onClick={handlePayLater} className="p-4 bg-gray-100 rounded-xl font-bold">Unpaid Bill</button>
                                <button onClick={() => setShowCheckout(true)} className="p-4 bg-orange-500 text-white rounded-xl font-bold shadow-lg shadow-orange-200">Payment</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <CheckoutModalComponent
                show={showCheckout}
                onClose={() => setShowCheckout(false)}
                cartTotal={cartTotal}
                onConfirm={handleCheckout}
                showSuccess={showSuccess}
                cartCount={cartCount}
                subtotal={subtotal}
                discountAmount={discountAmount}
                parcelAmount={parcelAmount}
                tipAmount={tipAmount}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                amountTendered={amountTendered}
                setAmountTendered={setAmountTendered}
                taxAmount={0}
                changeAmount={changeAmount}
                onPayLater={handlePayLater}
            />
            <SalesModalComponent show={showSalesModal} onClose={() => setShowSalesModal(false)} totalRevenue={todaySales.totalRevenue} cashAmount={todaySales.cashAmount} upiAmount={todaySales.upiAmount} totalOrders={todaySales.totalOrders} />
        </div>
    );
}




