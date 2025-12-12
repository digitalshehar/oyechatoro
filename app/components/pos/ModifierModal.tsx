'use client';

import React, { useState } from 'react';

interface ModifierOption {
    name: string;
    price: number;
}

interface ModifierGroup {
    name: string;
    price: number; // Base price for the group if applicable (usually 0 if using options)
    type?: 'one' | 'many';
    options?: ModifierOption[];
}

interface ModifierModalProps {
    show: boolean;
    itemName: string;
    basePrice: number;
    modifiers: ModifierGroup[];
    onClose: () => void;
    onConfirm: (selectedModifiers: { name: string; price: number }[], notes: string) => void;
}

export default function ModifierModal({ show, itemName, basePrice, modifiers, onClose, onConfirm }: ModifierModalProps) {
    const [selectedMods, setSelectedMods] = useState<{ [groupName: string]: ModifierOption[] }>({});
    const [notes, setNotes] = useState('');

    if (!show) return null;

    const handleToggle = (group: ModifierGroup, option: ModifierOption) => {
        setSelectedMods(prev => {
            const current = prev[group.name] || [];

            if (group.type === 'one') {
                // Radio behavior: Replace existing
                return { ...prev, [group.name]: [option] };
            } else {
                // Checkbox behavior: Toggle
                const exists = current.find(o => o.name === option.name);
                if (exists) {
                    return { ...prev, [group.name]: current.filter(o => o.name !== option.name) };
                } else {
                    return { ...prev, [group.name]: [...current, option] };
                }
            }
        });
    };

    const getSelectedList = () => {
        return Object.values(selectedMods).flat();
    };

    const calculateTotal = () => {
        const modsTotal = getSelectedList().reduce((sum, m) => sum + m.price, 0);
        return basePrice + modsTotal;
    };

    const handleConfirm = () => {
        onConfirm(getSelectedList(), notes);
        setSelectedMods({});
        setNotes('');
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl flex flex-col max-h-[80vh]" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">{itemName}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-6 pr-2">
                    {modifiers.map((group, idx) => (
                        <div key={idx} className="border-b pb-4 last:border-0">
                            <h4 className="font-bold text-gray-700 mb-2 flex justify-between">
                                {group.name}
                                <span className="text-xs font-normal bg-gray-100 px-2 py-1 rounded text-gray-500">
                                    {group.type === 'one' ? 'Select 1' : 'Select Any'}
                                </span>
                            </h4>
                            <div className="space-y-2">
                                {group.options?.map((opt, optIdx) => {
                                    const isSelected = (selectedMods[group.name] || []).some(o => o.name === opt.name);
                                    return (
                                        <label key={optIdx} className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${isSelected ? 'border-orange-500 bg-orange-50' : 'border-gray-100 hover:bg-gray-50'}`}>
                                            <div className="flex items-center gap-3">
                                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'border-orange-500 bg-orange-500' : 'border-gray-300'}`}>
                                                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                                                </div>
                                                <span className={`${isSelected ? 'font-bold text-gray-800' : 'text-gray-600'}`}>{opt.name}</span>
                                            </div>
                                            {opt.price > 0 && <span className="text-sm font-semibold text-gray-600">+₹{opt.price}</span>}
                                            <input
                                                type="checkbox"
                                                className="hidden"
                                                checked={isSelected}
                                                onChange={() => handleToggle(group, opt)}
                                            />
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                    <div>
                        <h4 className="font-bold text-gray-700 mb-2">Special Instructions</h4>
                        <textarea
                            value={notes}
                            onChange={e => setNotes(e.target.value)}
                            placeholder="e.g., Less spicy, no onions..."
                            className="w-full border rounded-xl p-3 text-sm focus:border-orange-500 outline-none resize-none"
                            rows={3}
                        />
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                    <button
                        onClick={handleConfirm}
                        className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold flex justify-between px-6 shadow-lg shadow-orange-200"
                    >
                        <span>Add Item</span>
                        <span>₹{calculateTotal()}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
