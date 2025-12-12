
'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface FallbackImageProps extends ImageProps {
    fallbackSrc?: string;
    fallbackGradient?: string;
}

export default function BlogImage({ src, alt, fallbackGradient = 'from-orange-400 to-red-600', className, ...props }: FallbackImageProps) {
    const [error, setError] = useState(false);

    if (error || !src) {
        return (
            <div className={`w-full h-full bg-gradient-to-br ${fallbackGradient} flex items-center justify-center text-white ${className}`}>
                <span className="text-4xl opacity-50">🥗</span>
            </div>
        );
    }

    return (
        <Image
            src={src}
            alt={alt}
            onError={() => setError(true)}
            className={className}
            {...props}
        />
    );
}
