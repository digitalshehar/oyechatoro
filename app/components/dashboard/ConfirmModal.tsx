'use client';

import React from 'react';

interface ConfirmModalProps {
    show: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    confirmColor?: 'red' | 'green' | 'blue';
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmModal({ show, title, message, confirmText = 'Confirm', cancelText = 'Cancel', confirmColor = 'red', onConfirm, onCancel }: ConfirmModalProps) {
    if (!show) return null;

    const colors = {
        red: 'bg-red-500 hover:bg-red-600',
        green: 'bg-green-500 hover:bg-green-600',
        blue: 'bg-blue-500 hover:bg-blue-600'
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onCancel}>
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
                <h3 className="text-xl font-bold mb-4">{title}</h3>
                <p className="text-gray-600 mb-6">{message}</p>
                <div className="flex gap-3">
                    <button onClick={onCancel} className="flex-1 py-3 rounded-xl font-semibold bg-gray-100 hover:bg-gray-200">{cancelText}</button>
                    <button onClick={onConfirm} className={`flex-1 py-3 rounded-xl font-semibold text-white ${colors[confirmColor]}`}>{confirmText}</button>
                </div>
            </div>
        </div>
    );
}
