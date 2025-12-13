'use client';

import React from 'react';
import Papa from 'papaparse';
import { MenuItem } from '@/app/lib/db-hooks';

interface Props {
    items: MenuItem[];
}

export default function ExportButton({ items }: Props) {
    const handleExport = () => {
        // Transform data for easy Excel editing
        const csvData = items.map(item => ({
            ID: item.id,
            Name: item.name,
            Category: item.category?.name || 'Uncategorized',
            Price: item.price,
            Description: item.description,
            Veg: item.veg ? 'Yes' : 'No',
            Status: item.status,
            Tags: (item.tags || []).join(', '),
            Image: item.image || ''
        }));

        const csv = Papa.unparse(csvData);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', `menu_export_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 hover:bg-green-100 rounded-xl font-bold transition-all border border-green-200"
        >
            <span>📊</span>
            Export CSV
        </button>
    );
}
