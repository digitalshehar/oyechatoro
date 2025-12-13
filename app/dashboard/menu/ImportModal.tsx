'use client';

import React, { useState } from 'react';
import Papa from 'papaparse';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function ImportModal({ isOpen, onClose, onSuccess }: Props) {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<any[]>([]);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            Papa.parse(selectedFile, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    setPreview(results.data.slice(0, 5)); // Show first 5 rows
                },
                error: (err) => {
                    setError('Failed to parse CSV: ' + err.message);
                }
            });
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);
        setError('');

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: async (results) => {
                try {
                    const res = await fetch('/api/menu/import', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ items: results.data })
                    });

                    if (!res.ok) throw new Error('Upload failed');

                    onSuccess();
                    onClose();
                    alert('Menu Imported Successfully! 🚀');
                } catch (err) {
                    setError('Import failed. Please check CSV format.');
                    console.error(err);
                } finally {
                    setUploading(false);
                }
            }
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-lg animate-in">
                <h2 className="text-2xl font-bold mb-4">Import Menu (Excel/CSV)</h2>

                <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50">
                        <input
                            type="file"
                            accept=".csv"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        <p className="text-xs text-gray-400 mt-2">Upload .csv file generated from Export</p>
                    </div>

                    {preview.length > 0 && (
                        <div className="bg-gray-50 p-4 rounded-xl max-h-40 overflow-auto">
                            <h4 className="font-bold text-xs uppercase mb-2">Preview (First 5 items)</h4>
                            <table className="w-full text-xs text-left">
                                <thead>
                                    <tr>
                                        {Object.keys(preview[0]).slice(0, 3).map(header => (
                                            <th key={header} className="p-1">{header}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {preview.map((row, i) => (
                                        <tr key={i} className="border-t border-gray-200">
                                            {Object.values(row).slice(0, 3).map((val: any, j) => (
                                                <td key={j} className="p-1">{val}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {error && <div className="text-red-500 text-sm font-bold bg-red-50 p-2 rounded">{error}</div>}

                    <div className="flex justify-end gap-3 mt-4">
                        <button onClick={onClose} className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg">Cancel</button>
                        <button
                            onClick={handleUpload}
                            disabled={!file || uploading}
                            className="btn btn-primary disabled:opacity-50"
                        >
                            {uploading ? 'Importing...' : 'Start Import'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
