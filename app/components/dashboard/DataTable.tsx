'use client';

import React from 'react';

interface TableColumn {
    key: string;
    header: string;
    align?: 'left' | 'center' | 'right';
    render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
    title?: string;
    columns: TableColumn[];
    data: any[];
    emptyMessage?: string;
}

export default function DataTable({ title, columns, data, emptyMessage = 'No data available' }: DataTableProps) {
    return (
        <div className="glass-card rounded-2xl overflow-hidden">
            {title && (
                <div className="p-6 border-b border-gray-100">
                    <h3 className="font-bold text-xl">{title}</h3>
                </div>
            )}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                        <tr>
                            {columns.map(col => (
                                <th key={col.key} className={`p-4 ${col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : ''}`}>
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {data.length > 0 ? data.map((row, i) => (
                            <tr key={i} className="hover:bg-gray-50 transition-colors">
                                {columns.map(col => (
                                    <td key={col.key} className={`p-4 ${col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : ''}`}>
                                        {col.render ? col.render(row[col.key], row) : row[col.key]}
                                    </td>
                                ))}
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={columns.length} className="p-8 text-center text-gray-400">
                                    {emptyMessage}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
