(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/dashboard/tables/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TablesPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jspdf/dist/jspdf.es.min.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function TablesPage() {
    _s();
    const [tableCount, setTableCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(10);
    const [isGenerating, setIsGenerating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const generateQRUrl = (tableNum)=>{
        const data = `https://oyechatoro.com/menu?table=${tableNum}`;
        return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(data)}&color=ea580c&bgcolor=ffffff&margin=10`;
    };
    const downloadQR = async (tableNum)=>{
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
    const generateAllPDF = async ()=>{
        setIsGenerating(true);
        try {
            const doc = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]();
            let x = 10;
            let y = 10;
            const size = 60; // QR code size in mm
            const gap = 10;
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            doc.setFontSize(20);
            doc.text("Oye Chatoro - Table QR Codes", pageWidth / 2, 15, {
                align: "center"
            });
            y += 20;
            for(let i = 1; i <= tableCount; i++){
                const url = generateQRUrl(i);
                // Fetch image to get base64
                const response = await fetch(url);
                const blob = await response.blob();
                const base64 = await new Promise((resolve)=>{
                    const reader = new FileReader();
                    reader.onloadend = ()=>resolve(reader.result);
                    reader.readAsDataURL(blob);
                });
                // Check if we need a new page
                if (y + size + 10 > pageHeight) {
                    doc.addPage();
                    y = 20;
                }
                doc.addImage(base64, 'PNG', x, y, size, size);
                doc.setFontSize(12);
                doc.text(`Table ${i}`, x + size / 2, y + size + 5, {
                    align: "center"
                });
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
        } finally{
            setIsGenerating(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-center mb-8 animate-in",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-bold text-[var(--brand-dark)]",
                        children: "Table Management"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/tables/page.tsx",
                        lineNumber: 90,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-[var(--text-muted)]",
                                children: "Total Tables:"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/tables/page.tsx",
                                lineNumber: 92,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 bg-white rounded-lg border border-[var(--border-light)] p-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setTableCount(Math.max(1, tableCount - 1)),
                                        className: "w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded font-bold",
                                        children: "-"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/tables/page.tsx",
                                        lineNumber: 94,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-8 text-center font-bold",
                                        children: tableCount
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/tables/page.tsx",
                                        lineNumber: 98,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setTableCount(tableCount + 1),
                                        className: "w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded font-bold",
                                        children: "+"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/tables/page.tsx",
                                        lineNumber: 99,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/tables/page.tsx",
                                lineNumber: 93,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/tables/page.tsx",
                        lineNumber: 91,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/tables/page.tsx",
                lineNumber: 89,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 animate-in",
                style: {
                    animationDelay: '0.1s'
                },
                children: Array.from({
                    length: tableCount
                }).map((_, i)=>{
                    const tableNum = i + 1;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass-card p-4 rounded-2xl flex flex-col items-center text-center hover:shadow-lg transition-all group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-12 h-12 rounded-full bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] flex items-center justify-center font-bold text-xl mb-3 group-hover:bg-[var(--brand-primary)] group-hover:text-white transition-colors",
                                children: tableNum
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/tables/page.tsx",
                                lineNumber: 112,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-bold text-[var(--text-main)] mb-2",
                                children: [
                                    "Table ",
                                    tableNum
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/tables/page.tsx",
                                lineNumber: 115,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white p-2 rounded-lg border border-[var(--border-light)] mb-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: generateQRUrl(tableNum),
                                    alt: `QR for Table ${tableNum}`,
                                    className: "w-24 h-24"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/tables/page.tsx",
                                    lineNumber: 118,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/tables/page.tsx",
                                lineNumber: 117,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>downloadQR(tableNum),
                                className: "text-xs font-bold text-[var(--brand-primary)] hover:underline flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "⬇️"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/tables/page.tsx",
                                        lineNumber: 129,
                                        columnNumber: 33
                                    }, this),
                                    " Download QR"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/tables/page.tsx",
                                lineNumber: 125,
                                columnNumber: 29
                            }, this)
                        ]
                    }, tableNum, true, {
                        fileName: "[project]/app/dashboard/tables/page.tsx",
                        lineNumber: 111,
                        columnNumber: 25
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/app/dashboard/tables/page.tsx",
                lineNumber: 107,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-12 glass-card p-8 rounded-2xl text-center animate-in",
                style: {
                    animationDelay: '0.2s'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-bold text-[var(--brand-dark)] mb-4",
                        children: "Need to print all QR codes?"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/tables/page.tsx",
                        lineNumber: 137,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[var(--text-muted)] mb-6 max-w-md mx-auto",
                        children: "Download a PDF containing all table QR codes formatted for printing stickers."
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/tables/page.tsx",
                        lineNumber: 138,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "btn btn-primary btn-glow",
                        onClick: generateAllPDF,
                        disabled: isGenerating,
                        children: isGenerating ? 'Generating PDF...' : 'Generate PDF for All Tables'
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/tables/page.tsx",
                        lineNumber: 139,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/tables/page.tsx",
                lineNumber: 136,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/tables/page.tsx",
        lineNumber: 88,
        columnNumber: 9
    }, this);
}
_s(TablesPage, "HJmhUfkg7XSjyQDjJgvbtlSGYBM=");
_c = TablesPage;
var _c;
__turbopack_context__.k.register(_c, "TablesPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_dashboard_tables_page_tsx_e88583ec._.js.map