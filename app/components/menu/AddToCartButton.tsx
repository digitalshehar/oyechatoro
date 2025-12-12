'use client';

import React, { useState } from 'react';
import { useDbCart } from '@/app/lib/db-hooks';

interface AddToCartButtonProps {
    item: {
        id: string; // Keep as string to match CartItem
        name: string;
        price: number;
        image?: string | null;
        veg?: boolean;
    };
    className?: string;
}

export default function AddToCartButton({ item, className = "" }: AddToCartButtonProps) {
    const { addToCart } = useDbCart();
    const [showToast, setShowToast] = useState(false);

    const handleAdd = () => {
        addToCart({
            menuItemId: item.id,
            quantity: 1
        });
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
    };

    return (
        <>
            <button
                onClick={handleAdd}
                className={`flex items-center justify-center gap-2 transition-all active:scale-95 ${className}`}
            >
                <span>Add to Order</span>
            </button>

            {/* Local Toast for immediate feedback */}
            <div className={`fixed bottom-24 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full shadow-2xl shadow-green-500/30 flex items-center gap-2 z-[60] transition-all duration-300 pointer-events-none ${showToast ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}`}>
                <span className="text-xl">✓</span>
                <span className="font-bold text-sm">Added!</span>
            </div>
        </>
    );
}
