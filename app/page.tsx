'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useFavorites, useOffers } from './lib/storage';
import { useDbCustomer, useDbMenu, useDbBlog, MenuItem, useDbCart } from './lib/db-hooks';
import MobileNav from './components/MobileNav';

function RecentBlogPosts() {
    const { posts, loading } = useDbBlog();

    // Get top 3 published posts
    const recentPosts = useMemo(() => {
        return posts
            .filter(p => p.status === 'Published')
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 3);
    }, [posts]);

    if (loading) return <div className="text-center py-10">Loading stories...</div>;

    if (recentPosts.length === 0) return (
        <div className="text-center py-10 text-gray-400">
            <p>New stories coming soon!</p>
        </div>
    );

    return (
        <div className="grid md:grid-cols-3 gap-8">
            {recentPosts.map(post => (
                <Link href={`/blog/${post.slug}`} key={post.id} className="group flex flex-col gap-4">
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden relative shadow-lg">
                        <Image
                            src={post.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm">
                            {post.category?.name || 'News'}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-xl text-gray-900 group-hover:text-[var(--brand-primary)] transition-colors line-clamp-2 leading-tight">
                            {post.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-2 line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center gap-2 mt-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                            <span>{new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                            <span>•</span>
                            <span>{post.readingTime || '5 min read'}</span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

// Types
// Types
interface Review {
    id: string;
    name: string;
    avatar: string | null;
    rating: number;
    comment: string;
    date: string | Date; // API returns string, we might convert
}

// Category Icons Map
const CATEGORY_ICONS: Record<string, string> = {
    pizza: '🍕',
    chaat: '🥘',
    sandwich: '🥪',
    burger: '🍔',
    pasta: '🍝',
    frankie: '🌯',
    fries: '🍟',
    beverages: '🥤',
    shake: '🥤',
    coffee: '☕',
    default: '🍽️'
};

const getCategoryIcon = (name: string) => {
    const lowerName = name.toLowerCase();
    const key = Object.keys(CATEGORY_ICONS).find(k => lowerName.includes(k));
    return key ? CATEGORY_ICONS[key] : CATEGORY_ICONS['default'];
};

// Fallback Reviews
const FALLBACK_REVIEWS: Review[] = [
    {
        id: '1',
        name: "Narsingh Ranga",
        avatar: null,
        rating: 5,
        date: "4 days ago",
        comment: "Fast, friendly, and efficient—Oye Chattore of Abu Road stands out. The staff ensures you're well taken care of."
    },
    {
        id: '2',
        name: "Sagar Sachan 7173",
        avatar: null,
        rating: 5,
        date: "5 days ago",
        comment: "Very tasty pizza in Abu road like dominos pizza. Must visit place."
    },
    {
        id: '3',
        name: "Pritam Yadav",
        avatar: null,
        rating: 5,
        date: "2 weeks ago",
        comment: "Better food than other in abu road. Hygiene is very good."
    }
];

export default function Home() {
    const [activeCategory, setActiveCategory] = useState('cat_chaat');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [year, setYear] = useState(2024);
    const [scrollY, setScrollY] = useState(0);
    const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
    const [showToast, setShowToast] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'COD' | 'UPI' | 'Online'>('COD');
    const [customerMobile, setCustomerMobile] = useState('');

    const { user } = useDbCustomer();
    const { cart, addToCart, removeFromCart, updateQuantity, clearCart } = useDbCart();
    const { favorites, toggleFavorite } = useFavorites();
    const { offers } = useOffers();
    const { items: dbItems, categories: dbCategories, loading } = useDbMenu();

    const activeOffers = offers.filter(o => o.status === 'Active');

    useEffect(() => {
        setYear(new Date().getFullYear());

        // Fetch reviews from API
        fetch('/api/reviews')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setReviews(data);
                } else {
                    console.error('Failed to load reviews');
                    setReviews(FALLBACK_REVIEWS); // Fallback if API fails
                }
            })
            .catch(err => {
                console.error(err);
                setReviews(FALLBACK_REVIEWS);
            });

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        const handleOpenCart = () => {
            setIsCartOpen(true);
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('openCart', handleOpenCart);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('openCart', handleOpenCart);
        };
    }, []);

    // Intersection Observer for animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setVisibleSections(prev => new Set(prev).add(entry.target.id));
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll('section[id]').forEach(section => {
            observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    // Menu Filter - Show only 8 items on homepage
    // Filter items first
    const activeItems = useMemo(() => {
        return dbItems.filter(item => item.status === 'Active' && item.veg);
    }, [dbItems]);

    const allFilteredMenu = useMemo(() => {
        if (activeCategory === 'all') {
            return activeItems;
        }
        return activeItems.filter(item => item.categoryId === activeCategory);
    }, [activeItems, activeCategory]);

    const filteredMenu = allFilteredMenu.slice(0, 8); // Limit to 8 items
    const hasMoreItems = allFilteredMenu.length > 8;

    // Cart Logic
    const handleAddToCart = (item: MenuItem) => {
        addToCart({
            menuItemId: item.id,
            quantity: 1
        });
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const checkout = async () => {
        if (cart.length === 0) return;

        // Validate mobile number
        if (!customerMobile || customerMobile.length < 10) {
            alert('Please enter a valid 10-digit mobile number');
            return;
        }

        // 1. Submit to API so it appears in Dashboard
        try {
            const orderData = {
                customer: user ? user.name : 'Online Customer',
                items: cart.map(i => ({ name: i.name, quantity: i.quantity, price: i.price })),
                total: cartTotal,
                type: 'Delivery',
                mobile: customerMobile,
                paymentMethod: paymentMethod === 'COD' ? 'Cash' : paymentMethod === 'UPI' ? 'UPI' : 'Online',
                paymentStatus: paymentMethod === 'COD' ? 'Unpaid' : 'Paid',
                status: 'Pending'
            };

            await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });
            console.log('✅ Order submitted to dashboard');
        } catch (e) {
            console.error('Failed to submit order:', e);
        }

        // 2. Construct WhatsApp Message
        let message = "New Order from Website:\n\n";
        cart.forEach(item => {
            message += `- ${item.quantity}x ${item.name} (₹${item.price * item.quantity})\n`;
        });
        message += `\n*Total: ₹${cartTotal}*`;
        message += `\n📱 Mobile: ${customerMobile}`;

        // 3. Redirect to WhatsApp
        const phone = '919509913792';
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');

        // 4. Clear Cart
        clearCart();
        setIsCartOpen(false);
    };

    const getRandomColor = () => {
        const colors = ['#f97316', '#ea580c', '#d97706', '#c2410c', '#b45309'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    return (
        <>
            <div className="bg-decor"></div>

            {/* Floating shapes */}
            <div className="floating-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
            </div>

            {/* Header */}
            <header className="header">
                <div className="container header-inner">
                    <a href="#" className="logo-container group">
                        <div className="relative w-12 h-12 mr-2 transform group-hover:rotate-12 transition-transform duration-300">
                            <Image
                                src="/logowhite.PNG"
                                alt="Oye Chatoro"
                                fill
                                className="object-contain drop-shadow-lg"
                                priority
                            />
                        </div>
                        <span className="logo-text text-2xl tracking-tight group-hover:text-[var(--brand-secondary)] transition-colors">Oye Chatoro</span>
                    </a>
                    <nav className={`nav-links ${isMobileMenuOpen ? 'flex flex-col absolute top-full left-0 right-0 bg-white/95 p-6 shadow-2xl backdrop-blur-xl border-t border-gray-100' : 'hidden md:flex items-center gap-8'}`}>
                        {['Home', 'Menu', 'Offers', 'Reviews', 'Contact'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="nav-link text-sm font-bold uppercase tracking-wider hover:text-[var(--brand-primary)] relative group"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--brand-primary)] transition-all group-hover:w-full"></span>
                            </a>
                        ))}
                        <Link href="/blog" className="nav-link font-bold text-orange-600" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
                        {user ? (
                            <Link href="/profile" className="nav-link font-bold text-[var(--brand-primary)] flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">👤</div>
                                {user.name.split(' ')[0]}
                            </Link>
                        ) : (
                            <Link href="/login" className="nav-link font-bold hover:text-[var(--brand-primary)]" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                        )}
                        <button onClick={() => { setIsCartOpen(true); setIsMobileMenuOpen(false); }} className="btn btn-primary md:hidden w-full mt-4">Cart ({cartCount})</button>
                        <a href="https://wa.me/919509913792" className="btn btn-primary hidden md:inline-flex shadow-lg shadow-orange-200 hover:shadow-orange-300 transform hover:-translate-y-0.5 transition-all" target="_blank">Order Now 🚀</a>
                    </nav>
                    <button className="mobile-menu-btn md:hidden" aria-label="Menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <span className="text-2xl">☰</span>
                    </button>
                </div>
            </header>

            <main>
                {/* Hero Section */}
                {/* Hero Section - Global Shudh Desi Style */}
                <section id="home" className={`hero min-h-[70vh] md:min-h-[85vh] flex items-center relative overflow-hidden ${visibleSections.has('home') ? 'animate-in' : ''}`}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-[#fff7ed] opacity-50 z-0">
                        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#991b1b 1px, transparent 1px)', backgroundSize: '30px 30px', opacity: 0.05 }}></div>
                    </div>

                    <div className="container relative z-10 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                        <div className="hero-content text-left" style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
                            <span className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-[#991b1b] px-4 py-2 rounded-full font-bold text-sm mb-6 shadow-sm">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                100% Pure Vegetarian
                            </span>
                            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 text-gray-900">
                                <span className="text-[#991b1b]">Best Restaurant</span> in <br />
                                Abu Road.
                            </h1>
                            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-lg font-medium">
                                Experience the <strong>Abu Road famous food</strong>. From spicy Chaats to rich Thalis, we serve tradition on a plate.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href="#menu" className="btn btn-primary text-lg px-8 py-4 rounded-full shadow-xl shadow-red-900/20 hover:shadow-2xl hover:scale-105 transition-all text-center">
                                    Order Now 🥘
                                </a>
                                <a href="#offers" className="btn btn-outline text-lg px-8 py-4 rounded-full border-2 hover:bg-red-50 transition-all text-center">
                                    View Offers %
                                </a>
                            </div>

                            <div className="mt-12 flex items-center gap-6">
                                <div className="flex -space-x-4">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-12 h-12 rounded-full border-4 border-white shadow-md overflow-hidden">
                                            <Image src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 5}`} alt="User" width={48} height={48} />
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <div className="flex text-yellow-500 text-lg">⭐⭐⭐⭐⭐</div>
                                    <p className="text-sm font-bold text-gray-500">Trusted by 5000+ Foodies</p>
                                </div>
                            </div>
                        </div>

                        <div className="hero-image relative h-[400px] md:h-[600px] flex items-center justify-center">
                            <div className="absolute inset-0 bg-gradient-to-tr from-red-100 to-transparent rounded-full filter blur-3xl opacity-40 animate-pulse"></div>

                            {/* Main Hero Image Composition */}
                            <div className="relative w-full h-full max-w-[500px] max-h-[500px] animate-float">
                                <div className="absolute inset-0 bg-[#991b1b]/5 rounded-full blur-2xl transform rotate-12"></div>
                                <div className="relative w-full h-full bg-white/40 backdrop-blur-md border border-white/60 p-6 rounded-[3rem] shadow-2xl flex items-center justify-center overflow-hidden">
                                    {/* Placeholder for a high-quality food image */}
                                    <div className="text-[10rem] md:text-[12rem] filter drop-shadow-2xl transform hover:scale-110 transition-transform duration-700 cursor-pointer">
                                        🍛
                                    </div>

                                    {/* Floating Badge 1 */}
                                    <div className="absolute top-8 right-8 bg-white p-3 rounded-2xl shadow-lg animate-bounce-subtle flex items-center gap-3">
                                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-xl">🥬</div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-bold uppercase">Pure</p>
                                            <p className="font-bold text-gray-900">Veg</p>
                                        </div>
                                    </div>

                                    {/* Floating Badge 2 */}
                                    <div className="absolute bottom-8 left-8 bg-white p-3 rounded-2xl shadow-lg animate-bounce-subtle" style={{ animationDelay: '1s' }}>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-yellow-500 font-black text-xl">4.9</span>
                                            <span className="text-xs text-gray-400">/ 5.0</span>
                                        </div>
                                        <p className="text-xs font-bold text-gray-900">Top Rated in Abu Road</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="py-8 md:py-20 bg-white relative overflow-hidden">
                    <div className="container">
                        <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                            {[
                                { icon: '🥗', title: 'Fresh Ingredients', desc: 'Locally sourced, farm-fresh veggies daily.' },
                                { icon: '🔥', title: 'Live Kitchen', desc: 'Watch your food being prepared with love.' },
                                { icon: '⭐', title: 'Top Rated', desc: 'Rated 5 Stars by our lovely customers.' },
                                { icon: '⚡', title: 'Fast Service', desc: 'Quick bites to satisfy your cravings instantly.' }
                            ].map((feature, idx) => (
                                <div key={idx} className="feature-card glass-card p-6 md:p-8 rounded-3xl border border-gray-100 hover:border-orange-200 transition-all duration-300 group">
                                    <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                        {feature.icon}
                                    </div>
                                    <h3 className="feature-title text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                                    <p className="feature-desc text-gray-500 leading-relaxed">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Special Offers Section */}
                <section id="offers" className={`section offers-section py-10 md:py-24 ${visibleSections.has('offers') ? 'animate-in' : ''}`}>
                    <div className="container">
                        <div className="section-header text-center mb-16">
                            <span className="text-orange-600 font-bold tracking-wider uppercase text-sm mb-2 block">Don't Miss Out</span>
                            <h2 className="section-title text-4xl md:text-5xl font-black mb-4">Special Offers 🎉</h2>
                            <p className="section-subtitle text-xl text-gray-500">Limited time deals curated just for you</p>
                        </div>

                        {/* Desktop Grid View */}
                        <div className="hidden md:grid offers-grid grid-cols-3 gap-8">
                            {activeOffers.map((offer, index) => (
                                <div key={offer.id} className="offer-card glass-card p-8 rounded-3xl relative overflow-hidden group hover:shadow-2xl transition-all duration-300 border border-white/50" style={{ animationDelay: `${index * 0.1}s` }}>
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400 to-red-500 opacity-10 rounded-bl-full group-hover:scale-150 transition-transform duration-500"></div>
                                    <div className="offer-badge bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold inline-block mb-4 shadow-md">{offer.discount} OFF</div>
                                    <h3 className="offer-title text-3xl font-black mb-2 text-gray-800">{offer.code}</h3>
                                    <p className="offer-desc text-gray-600 mb-6">{offer.description || 'Special discount'}</p>
                                    <div className="offer-footer flex justify-between items-center border-t pt-4 border-gray-100">
                                        <span className="offer-validity text-xs font-bold text-gray-400">Valid: {offer.expiry}</span>
                                        <a href="https://wa.me/919509913792" className="btn btn-sm btn-primary rounded-xl px-4 py-2 text-sm shadow-lg shadow-orange-100">Claim Now →</a>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Mobile Story-Style View */}
                        <div className="md:hidden overflow-x-auto snap-x snap-mandatory -mx-4 px-4 pb-8 no-scrollbar">
                            <div className="flex gap-4 w-max">
                                {activeOffers.map((offer, index) => (
                                    <div
                                        key={offer.id}
                                        className={`snap-center flex-shrink-0 w-[280px] h-[400px] rounded-3xl p-8 flex flex-col justify-between text-white shadow-2xl relative overflow-hidden bg-gradient-to-br ${offer.bgColor || 'from-orange-500 to-red-600'}`}
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        {/* Decorative circles */}
                                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
                                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

                                        <div className="relative z-10">
                                            <div className="inline-block bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold mb-6 border border-white/20">
                                                🔥 TRENDING
                                            </div>
                                            <div className="text-6xl font-black mb-4 drop-shadow-lg tracking-tighter">{offer.discount}</div>
                                            <h3 className="text-3xl font-bold mb-2 leading-tight">{offer.code}</h3>
                                            <p className="text-white/90 text-sm leading-relaxed font-medium">{offer.description || 'Special discount just for you!'}</p>
                                        </div>

                                        <div className="relative z-10">
                                            <a
                                                href="https://wa.me/919509913792"
                                                className="block w-full bg-white text-gray-900 text-center font-bold py-4 rounded-2xl shadow-xl hover:scale-105 transition-transform active:scale-95"
                                            >
                                                Order Now 🚀
                                            </a>
                                            <p className="text-white/60 text-xs mt-4 text-center font-medium">Valid until {offer.expiry}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {activeOffers.length === 0 && (
                            <div className="text-center py-12 text-gray-400 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                                <p className="text-lg font-medium">No active offers right now. Check back soon! 🎁</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Menu Section */}
                {/* Menu Section - Global Shudh Desi Style */}
                <section id="menu" className={`section menu-section py-12 md:py-20 bg-gray-50 ${visibleSections.has('menu') ? 'animate-in' : ''}`}>
                    <div className="container">
                        <div className="text-center mb-12">
                            <span className="text-[#991b1b] font-bold tracking-wider uppercase text-sm mb-2 block">Our Menu</span>
                            <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900">Explore Categories 🍽️</h2>
                            <p className="text-xl text-gray-500">Select a category to view delicious options</p>
                        </div>

                        {/* Circular Category Navigation */}
                        <div className="flex justify-start md:justify-center gap-6 mb-16 overflow-x-auto pb-8 no-scrollbar px-4 snap-x">
                            <button
                                onClick={() => setActiveCategory('all')}
                                className={`group flex flex-col items-center gap-3 min-w-[100px] transition-all duration-300 ${activeCategory === 'all' ? 'scale-110' : 'opacity-70 hover:opacity-100'}`}
                            >
                                <div className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl shadow-lg transition-all duration-300 ${activeCategory === 'all' ? 'bg-[#991b1b] text-white ring-4 ring-red-100' : 'bg-white text-gray-700 hover:bg-red-50'}`}>
                                    🍽️
                                </div>
                                <span className={`font-bold text-sm uppercase tracking-wide ${activeCategory === 'all' ? 'text-[#991b1b]' : 'text-gray-500'}`}>
                                    All
                                </span>
                            </button>

                            {dbCategories.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`snap-center group flex flex-col items-center gap-3 min-w-[100px] transition-all duration-300 ${activeCategory === cat.id ? 'scale-110' : 'opacity-70 hover:opacity-100'}`}
                                >
                                    <div className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl shadow-lg transition-all duration-300 ${activeCategory === cat.id ? 'bg-[#991b1b] text-white ring-4 ring-red-100' : 'bg-white text-gray-700 hover:bg-red-50'}`}>
                                        {getCategoryIcon(cat.name)}
                                    </div>
                                    <span className={`font-bold text-sm uppercase tracking-wide ${activeCategory === cat.id ? 'text-[#991b1b]' : 'text-gray-500'}`}>
                                        {cat.name}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Product Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {filteredMenu.map((item, index) => (
                                <div key={item.id} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-red-100 transition-all duration-300 flex flex-col h-full relative">
                                    {/* Image Area */}
                                    <div className="h-56 w-full relative overflow-hidden bg-gray-100">
                                        {item.image ? (
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-4xl bg-gray-50">🥘</div>
                                        )}

                                        {/* Veg Indicator */}
                                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm border border-green-100 flex items-center gap-1">
                                            <div className="w-3 h-3 border border-green-600 flex items-center justify-center rounded-[2px]">
                                                <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                                            </div>
                                            <span className="text-[10px] font-bold text-green-700 uppercase">
                                                Pure Veg
                                            </span>
                                        </div>

                                        {/* Favorite Button */}
                                        <button
                                            onClick={(e) => { e.stopPropagation(); toggleFavorite(item.name); }}
                                            className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full shadow-md transition-all ${favorites.includes(item.name) ? 'bg-red-50 text-red-500' : 'bg-white text-gray-400 hover:text-red-500'}`}
                                        >
                                            {favorites.includes(item.name) ? '❤️' : '🤍'}
                                        </button>

                                        {/* Best Seller Ribbon */}
                                        {item.isFeatured && (
                                            <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-700 to-orange-500 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase shadow-lg animate-pulse whitespace-nowrap">
                                                ⭐ {item.badge || 'Recommended'}
                                            </div>
                                        )}
                                    </div>

                                    {/* Content Area */}
                                    <div className="p-5 flex flex-col flex-1">
                                        <div className="mb-2">
                                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#991b1b] transition-colors line-clamp-1" title={item.name}>
                                                {item.name}
                                            </h3>
                                            <p className="text-xs text-gray-500 line-clamp-2 mt-1 h-8">{item.description}</p>
                                        </div>

                                        <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50">
                                            <div>
                                                <span className="text-xs text-gray-400 line-through block">₹{item.price + 50}</span>
                                                <span className="text-xl font-black text-[#991b1b]">₹{item.price}</span>
                                            </div>
                                            <button
                                                onClick={() => handleAddToCart(item)}
                                                className="bg-red-50 text-[#991b1b] border border-red-100 hover:bg-[#991b1b] hover:text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-sm hover:shadow-md active:scale-95"
                                            >
                                                ADD +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {hasMoreItems && (
                            <div className="text-center mt-12">
                                <p className="text-gray-500 mb-4">+{allFilteredMenu.length - 8} more items available</p>
                                <a href="/menu" className="btn btn-primary text-lg px-10 py-4 rounded-full shadow-xl shadow-red-900/20 hover:shadow-2xl hover:scale-105 transition-all font-bold">
                                    View Full Menu ({allFilteredMenu.length} Items) 📜
                                </a>
                            </div>
                        )}
                    </div>
                </section>

                {/* Reviews Section */}
                <section id="reviews" className={`section py-24 bg-white ${visibleSections.has('reviews') ? 'animate-in' : ''}`}>
                    <div className="container">
                        <div className="section-header text-center mb-16">
                            <h2 className="section-title text-4xl md:text-5xl font-black mb-4">Customer Love ❤️</h2>
                            <div className="flex items-center justify-center gap-4 mb-6 bg-orange-50 inline-flex px-6 py-3 rounded-2xl border border-orange-100">
                                <span className="text-4xl font-black text-gray-900">5.0</span>
                                <div className="text-2xl text-yellow-400">⭐⭐⭐⭐⭐</div>
                                <span className="text-gray-500 font-medium">(30+ Google Reviews)</span>
                            </div>
                            <p className="section-subtitle text-xl text-gray-500 mb-8">What people are saying about Oye Chatoro</p>
                            <a href="https://www.google.com/search?q=Oye+Chatoro+Abu+Road#lrd=0x395c5b0042401a9d:0x633535252873130,3,,,,"
                                target="_blank" className="btn btn-outline px-6 py-3 rounded-xl hover:bg-gray-50">Write a Review ✍️</a>
                        </div>

                        <div className="reviews-scroller flex gap-6 overflow-x-auto pb-8 px-4 snap-x snap-mandatory no-scrollbar">
                            {reviews.map((r, i) => (
                                <div key={i} className="review-card glass-card min-w-[350px] p-8 rounded-3xl border border-gray-100 snap-center hover:border-orange-200 transition-all duration-300 bg-white" style={{ animationDelay: `${i * 0.1}s` }}>
                                    <div className="review-header flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md overflow-hidden" style={{ background: r.avatar ? 'transparent' : getRandomColor() }}>
                                            {r.avatar ? (
                                                <Image src={r.avatar} alt={r.name} width={48} height={48} className="object-cover w-full h-full" />
                                            ) : (
                                                r.name.charAt(0).toUpperCase()
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-lg">{r.name}</h4>
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <span className="text-yellow-400">{'⭐'.repeat(r.rating)}</span>
                                                <span>• Verified</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed mb-6 italic">"{r.comment}"</p>
                                    <small className="block text-gray-400 font-medium">{new Date(r.date).toLocaleDateString()}</small>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Blog / Recent Stories */}
                <section id="blog" className="section py-12 md:py-24 bg-white">
                    <div className="container">
                        <div className="section-header text-center mb-16">
                            <h2 className="section-title text-4xl font-black mb-4">Stories from the Kitchen 🥘</h2>
                            <p className="section-subtitle text-xl text-gray-500">Food culture, recipes, and local guides.</p>
                        </div>

                        {/* Recent Posts Grid */}
                        <RecentBlogPosts />

                        <div className="text-center mt-12">
                            <a href="/blog" className="btn btn-outline rounded-full px-8 py-3 font-bold border-2 hover:bg-black hover:text-white hover:border-black transition-all">
                                Read All Stories →
                            </a>
                        </div>
                    </div>
                </section>

                {/* Contact / Location */}
                <section id="contact" className={`section py-12 md:py-24 bg-gray-50 ${visibleSections.has('contact') ? 'animate-in' : ''}`}>
                    <div className="container">
                        <div className="section-header text-center mb-16">
                            <h2 className="section-title text-4xl font-black mb-4">Visit the Best Restaurant in Abu Road 📍</h2>
                            <p className="section-subtitle text-xl text-gray-500">We are waiting to serve you!</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            <div className="feature-card glass-card p-8 rounded-3xl bg-white border border-gray-100 hover:shadow-xl transition-all text-left h-full flex flex-col justify-between">
                                <div>
                                    <h3 className="text-2xl font-bold text-[var(--brand-primary)] mb-6">Oye Chatoro</h3>
                                    <div className="space-y-4 text-gray-600">
                                        <p className="flex gap-3">
                                            <span className="text-xl">📍</span>
                                            <span>Abu Central Mall, G-5, Riico Check Post Road, Abu Road, Rajasthan 307026 (Near Abu Road Railway Station)</span>
                                        </p>
                                        <p className="flex gap-3">
                                            <span className="text-xl">🕒</span>
                                            <span>Daily 5:00 PM – 11:00 PM</span>
                                        </p>
                                        <p className="flex gap-3">
                                            <span className="text-xl">📞</span>
                                            <a href="tel:+919509913792" className="hover:text-[var(--brand-primary)] font-bold">+91-9509913792</a>
                                        </p>
                                    </div>
                                </div>
                                <a href="https://share.google/JVyw8Lyd9XfsMw3m1" target="_blank" className="btn btn-primary btn-glow w-full mt-8 rounded-xl py-4 shadow-lg shadow-orange-100">Get Directions 🗺️</a>
                            </div>

                            {/* Promo for Website Dev */}
                            <div className="feature-card glass-card p-8 rounded-3xl bg-gradient-to-br from-orange-50 to-white border border-orange-100 hover:shadow-xl transition-all text-left relative overflow-hidden">
                                <span className="absolute top-4 right-4 bg-black text-white px-2 py-1 rounded text-xs font-bold">AD</span>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Need a Website? 💻</h3>
                                <p className="text-gray-500 mb-6">Get a premium business website like this one.</p>
                                <div className="text-3xl font-black text-[var(--brand-secondary)] mb-6">
                                    ₹9,999 <span className="text-lg text-gray-400 line-through font-normal">₹24,999</span>
                                </div>
                                <a href="https://wa.me/919509913792?text=I am interested in Website Development" target="_blank" className="btn btn-outline w-full rounded-xl py-4 border-2 font-bold hover:bg-gray-900 hover:border-gray-900 hover:text-white">Contact Developer 👨‍💻</a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="footer bg-white border-t border-gray-100 pt-20 pb-32 md:pb-10">
                <div className="container">
                    <div className="grid md:grid-cols-4 gap-12 mb-16">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="relative w-10 h-10">
                                    <Image src="/logowhite.PNG" alt="Logo" fill className="object-contain" />
                                </div>
                                <span className="text-2xl font-black text-gray-900">Oye Chatoro</span>
                            </div>
                            <p className="text-gray-500 leading-relaxed max-w-sm">
                                Authentic Indian Vegetarian Street Food in Abu Road. Fresh, Hygienic, and Delicious. Serving happiness since 2024.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-6">Quick Links</h4>
                            <ul className="space-y-4">
                                {['Home', 'Menu', 'Reviews', 'Contact'].map(item => (
                                    <li key={item}><a href={`#${item.toLowerCase()}`} className="text-gray-500 hover:text-[var(--brand-primary)] transition-colors">{item}</a></li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-6">Connect</h4>
                            <ul className="space-y-4">
                                <li><a href="https://www.instagram.com/oyechatoro_/" target="_blank" className="text-gray-500 hover:text-pink-600 transition-colors flex items-center gap-2">📸 Instagram</a></li>

                                <li><a href="https://share.google/i1ls8jxzjEOxQ5gd8" target="_blank" className="text-gray-500 hover:text-green-600 transition-colors flex items-center gap-2">🗺️ Google Maps</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-100 pt-8 text-center text-gray-400 text-sm">
                        <p>&copy; <span id="year">{year}</span> Oye Chatoro. All rights reserved. • Website by Akshay Tiwari</p>
                        <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-4 opacity-90 hover:opacity-100 transition-opacity">
                            <div className="relative w-24 h-12 md:w-28 md:h-14">
                                <Image
                                    src="/fssai.png"
                                    alt="FSSAI"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="text-center md:text-left">
                                <p className="text-xs uppercase font-bold text-gray-500 tracking-wider mb-1">License No.</p>
                                <p className="font-mono text-lg font-bold text-gray-800 tracking-wide">22225023000513</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Cart UI */}
            <div className="cart-floating-btn shadow-2xl shadow-orange-500/50 hover:scale-110 transition-transform active:scale-95" onClick={() => setIsCartOpen(true)}>
                <span className="cart-icon">🛒</span>
                <span className="cart-count shadow-sm">{cartCount}</span>
            </div>

            <div className={`cart-modal-backdrop ${isCartOpen ? 'open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) setIsCartOpen(false) }}>
                <div className="cart-sidebar shadow-2xl">
                    <div className="cart-header bg-white border-b border-gray-100 p-6 flex justify-between items-center">
                        <h3 className="text-xl font-black text-gray-900">Your Order 🛍️</h3>
                        <button className="close-cart w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors" onClick={() => setIsCartOpen(false)}>×</button>
                    </div>
                    <div className="cart-items p-6 space-y-6 overflow-y-auto flex-1">
                        {cart.length === 0 ? (
                            <div className="empty-cart-msg flex flex-col items-center justify-center h-full text-gray-400">
                                <span className="text-6xl mb-4">🛒</span>
                                <p className="text-lg font-medium">Your cart is empty</p>
                                <p className="text-sm">Add some delicious items!</p>
                            </div>
                        ) : (
                            cart.map((item, index) => (
                                <div key={index} className="cart-item flex gap-4 items-center">
                                    <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 relative">
                                        {item.image ? (
                                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-2xl">🥘</div>
                                        )}
                                    </div>
                                    <div className="cart-item-details flex-1">
                                        <div className="cart-item-title font-bold text-gray-900 line-clamp-1">{item.name}</div>
                                        <div className="cart-item-price text-[var(--brand-primary)] font-bold">₹{item.price}</div>
                                        <div className="cart-item-controls flex items-center gap-3 mt-2">
                                            <button className="qty-btn w-6 h-6 rounded-full border flex items-center justify-center hover:bg-gray-50" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                            <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                            <button className="qty-btn w-6 h-6 rounded-full border flex items-center justify-center hover:bg-gray-50" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                        </div>
                                    </div>
                                    <div className="font-bold text-gray-900">₹{item.price * item.quantity}</div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Upsell Section */}
                    {cart.length > 0 && (
                        <div className="p-6 bg-orange-50 border-t border-orange-100">
                            <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                                <span>✨</span> Complete your meal with...
                            </h4>
                            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                                {activeItems
                                    .filter(item => item.price < 100 && !cart.find(c => c.name === item.name))
                                    .slice(0, 5)
                                    .map((item, i) => (
                                        <div key={i} className="min-w-[140px] bg-white p-3 rounded-xl border border-orange-100 shadow-sm flex flex-col items-center text-center">
                                            <div className="w-12 h-12 rounded-full bg-orange-100 mb-2 overflow-hidden relative">
                                                {item.image ? (
                                                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                                                ) : (
                                                    <span className="text-xl leading-[3rem]">🥘</span>
                                                )}
                                            </div>
                                            <div className="text-xs font-bold text-gray-800 line-clamp-1 mb-1">{item.name}</div>
                                            <div className="text-xs font-bold text-orange-600 mb-2">₹{item.price}</div>
                                            <button
                                                onClick={() => handleAddToCart(item)}
                                                className="text-xs bg-orange-100 text-orange-700 font-bold px-3 py-1 rounded-full hover:bg-orange-200 transition-colors w-full"
                                            >
                                                Add +
                                            </button>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}
                    <div className="cart-footer p-6 border-t border-gray-100 bg-gray-50">
                        {/* Mobile Number Input */}
                        <div className="mb-4">
                            <label className="text-sm font-bold text-gray-700 mb-2 block">📱 Mobile Number *</label>
                            <input
                                type="tel"
                                placeholder="Enter 10-digit mobile number"
                                value={customerMobile}
                                onChange={(e) => setCustomerMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[var(--brand-primary)] focus:outline-none text-lg font-medium"
                                maxLength={10}
                            />
                            {customerMobile && customerMobile.length < 10 && (
                                <p className="text-xs text-red-500 mt-1">Please enter 10 digits</p>
                            )}
                        </div>
                        {/* Payment Method Selection */}
                        <div className="mb-4">
                            <label className="text-sm font-bold text-gray-700 mb-2 block">Payment Method</label>
                            <div className="grid grid-cols-3 gap-2">
                                {['COD', 'UPI', 'Online'].map((method) => (
                                    <button
                                        key={method}
                                        onClick={() => setPaymentMethod(method as any)}
                                        className={`py-2 rounded-lg text-sm font-bold border-2 transition-all ${paymentMethod === method ? 'border-[var(--brand-primary)] bg-orange-50 text-[var(--brand-primary)]' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}
                                    >
                                        {method}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-between items-center mb-6">
                            <span className="text-lg font-bold text-gray-900">Total Amount</span>
                            <span className="text-3xl font-black text-[var(--brand-primary)]">₹{cartTotal}</span>
                        </div>
                        <button
                            onClick={checkout}
                            className="btn btn-primary w-full py-4 text-xl rounded-xl shadow-xl shadow-orange-200 hover:shadow-2xl hover:translate-y-[-2px] transition-all flex items-center justify-center gap-3"
                        >
                            <span>Place Order</span>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" /></svg>
                        </button>
                    </div>
                </div>
            </div>

            <MobileNav />
        </>
    );
}
