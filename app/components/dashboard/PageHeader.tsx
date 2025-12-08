'use client';

import React from 'react';

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    children?: React.ReactNode;
}

export default function PageHeader({ title, subtitle, children }: PageHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
                <h1 className="text-3xl font-bold text-[var(--brand-dark)]">{title}</h1>
                {subtitle && <p className="text-[var(--text-muted)]">{subtitle}</p>}
            </div>
            {children && <div className="flex gap-2 w-full md:w-auto">{children}</div>}
        </div>
    );
}
