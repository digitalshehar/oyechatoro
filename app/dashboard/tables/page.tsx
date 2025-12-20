'use client';

import React, { useState } from 'react';
import jsPDF from 'jspdf';

export default function TablesPage() {
    const [tableCount, setTableCount] = useState(10);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch initial config
    React.useEffect(() => {
        const fetchConfig = async () => {
            try {
                const res = await fetch('/api/tables');
                if (res.ok) {
                    const data = await res.json();
                    if (data.count) setTableCount(data.count);
                }
            } catch (error) {
                console.error('Failed to load table config', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchConfig();
    }, []);

    const updateTableCount = async (newCount: number) => {
        const count = Math.max(1, newCount);
        setTableCount(count);

        try {
            await fetch('/api/tables', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ count })
            });
        } catch (error) {
            console.error('Failed to save table count', error);
        }
    };

    const generateQRUrl = (tableNum: number) => {
        const data = `https://oyechatoro.com/menu?table=${tableNum}`;
        return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(data)}&color=ea580c&bgcolor=ffffff&margin=10`;
    };

    const downloadQR = async (tableNum: number) => {
        const url = generateQRUrl(tableNum);
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = `OyeChatoro-Table-${tableNum}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading QR:', error);
            alert('Failed to download QR code');
        }
    };

    const generateAllPDF = async () => {
        setIsGenerating(true);
        try {
            const doc = new jsPDF();
            let x = 10;
            let y = 10;
            const size = 60; // QR code size in mm
            const gap = 10;
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();

            doc.setFontSize(20);
            doc.text("Oye Chatoro - Table QR Codes", pageWidth / 2, 15, { align: "center" });
            y += 20;

            for (let i = 1; i <= tableCount; i++) {
                const url = generateQRUrl(i);

                // Fetch image to get base64
                const response = await fetch(url);
                const blob = await response.blob();
                const base64 = await new Promise<string>((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.readAsDataURL(blob);
                });

                // Check if we need a new page
                if (y + size + 10 > pageHeight) {
                    doc.addPage();
                    y = 20;
                }

                doc.addImage(base64, 'PNG', x, y, size, size);
                doc.setFontSize(12);
                doc.text(`Table ${i}`, x + size / 2, y + size + 5, { align: "center" });

                // Move to next position
                x += size + gap;
                if (x + size > pageWidth) {
                    x = 10;
                    y += size + 15;
                }
            }

            doc.save("OyeChatoro-All-Tables.pdf");
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Failed to generate PDF. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    if (isLoading) return <div className="p-8 text-center text-gray-500">Loading tables...</div>;

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-8 animate-in">
                <h1 className="text-3xl font-bold text-[var(--brand-dark)]">Table Management</h1>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-[var(--text-muted)]">Total Tables:</span>
                    <div className="flex items-center gap-2 bg-white rounded-lg border border-[var(--border-light)] p-1">
                        <button
                            onClick={() => updateTableCount(tableCount - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded font-bold"
                        >-</button>
                        <span className="w-8 text-center font-bold">{tableCount}</span>
                        <button
                            onClick={() => updateTableCount(tableCount + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded font-bold"
                        >+</button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 animate-in" style={{ animationDelay: '0.1s' }}>
                {Array.from({ length: tableCount }).map((_, i) => {
                    const tableNum = i + 1;
                    return (
                        <div key={tableNum} className="glass-card p-3 md:p-4 rounded-2xl flex flex-col items-center text-center hover:shadow-lg transition-all group">
                            <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] flex items-center justify-center font-bold text-base md:text-xl mb-2 md:mb-3 group-hover:bg-[var(--brand-primary)] group-hover:text-white transition-colors">
                                {tableNum}
                            </div>
                            <h3 className="font-bold text-[var(--text-main)] text-sm md:text-base mb-1 md:mb-2">Table {tableNum}</h3>

                            <div className="bg-white p-1.5 md:p-2 rounded-lg border border-[var(--border-light)] mb-2 md:mb-3">
                                <img
                                    src={generateQRUrl(tableNum)}
                                    alt={`QR for Table ${tableNum}`}
                                    className="w-20 h-20 md:w-24 md:h-24"
                                />
                            </div>

                            <button
                                onClick={() => downloadQR(tableNum)}
                                className="text-[10px] md:text-xs font-bold text-[var(--brand-primary)] hover:underline flex items-center gap-1"
                            >
                                <span>⬇️</span> <span className="hidden md:inline">Download</span> QR
                            </button>
                        </div>
                    );
                })}
            </div>

            <div className="mt-8 md:mt-12 glass-card p-6 md:p-8 rounded-2xl text-center animate-in" style={{ animationDelay: '0.2s' }}>
                <h2 className="text-lg md:text-xl font-bold text-[var(--brand-dark)] mb-2 md:mb-4">Need to print all QR codes?</h2>
                <p className="text-xs md:text-sm text-[var(--text-muted)] mb-4 md:mb-6 max-w-md mx-auto">Download a PDF containing all table QR codes formatted for printing stickers.</p>
                <button
                    className="btn btn-primary btn-glow w-full md:w-auto"
                    onClick={generateAllPDF}
                    disabled={isGenerating}
                >
                    {isGenerating ? 'Generating PDF...' : 'Generate PDF for All Tables'}
                </button>
            </div>
        </div>
    );
}
