'use client';

import React from 'react';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    text?: string;
}

export default function LoadingSpinner({ size = 'md', text }: LoadingSpinnerProps) {
    const sizes = {
        sm: 'w-6 h-6 border-2',
        md: 'w-10 h-10 border-3',
        lg: 'w-16 h-16 border-4'
    };

    return (
        <div className="flex flex-col items-center justify-center gap-3">
            <div className={`${sizes[size]} border-orange-200 border-t-orange-500 rounded-full animate-spin`}></div>
            {text && <p className="text-sm text-gray-500 animate-pulse">{text}</p>}
        </div>
    );
}
