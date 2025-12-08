'use client';

import React, { memo } from 'react';

interface SkeletonProps {
    type?: 'card' | 'text' | 'avatar' | 'button';
    count?: number;
}

const Skeleton = memo(function Skeleton({ type = 'card', count = 1 }: SkeletonProps) {
    const skeletons = Array(count).fill(0);

    const renderSkeleton = () => {
        switch (type) {
            case 'avatar':
                return <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />;
            case 'text':
                return <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />;
            case 'button':
                return <div className="h-10 bg-gray-200 rounded-lg animate-pulse w-24" />;
            case 'card':
            default:
                return (
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 animate-pulse">
                        <div className="h-40 bg-gray-200 rounded-xl mb-4" />
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                        <div className="h-4 bg-gray-200 rounded w-1/2" />
                    </div>
                );
        }
    };

    return (
        <>
            {skeletons.map((_, i) => (
                <div key={i}>{renderSkeleton()}</div>
            ))}
        </>
    );
});

export default Skeleton;
