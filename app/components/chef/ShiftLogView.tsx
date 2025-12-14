'use client';
import React, { useState, useEffect } from 'react';

interface Log {
    id: string;
    content: string;
    author: string;
    type: 'Info' | 'Urgent';
    createdAt: string;
}

export default function ShiftLogView() {
    const [logs, setLogs] = useState<Log[]>([]);
    const [newLog, setNewLog] = useState('');
    const [logType, setLogType] = useState<'Info' | 'Urgent'>('Info');
    const [loading, setLoading] = useState(true);

    const fetchLogs = async () => {
        try {
            const res = await fetch('/api/kitchen/logs');
            if (res.ok) {
                const data = await res.json();
                setLogs(data);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newLog.trim()) return;

        try {
            const res = await fetch('/api/kitchen/logs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: newLog,
                    type: logType,
                    author: 'Staff' // Could be dynamic if we had auth context
                })
            });

            if (res.ok) {
                setNewLog('');
                fetchLogs();
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto h-full flex flex-col gap-6 animate-in">
            {/* Header */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">📓 Shift Handoff Log</h2>

                <form onSubmit={handleSubmit} className="flex gap-4">
                    <div className="flex-1">
                        <textarea
                            value={newLog}
                            onChange={(e) => setNewLog(e.target.value)}
                            placeholder="Write a note for next shift..."
                            className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-[var(--brand-primary)] outline-none resize-none h-24"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <button
                            type="button"
                            onClick={() => setLogType('Info')}
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${logType === 'Info' ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-400' : 'bg-gray-100 text-gray-400'}`}
                        >
                            ℹ️ Info
                        </button>
                        <button
                            type="button"
                            onClick={() => setLogType('Urgent')}
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${logType === 'Urgent' ? 'bg-red-100 text-red-600 ring-2 ring-red-400' : 'bg-gray-100 text-gray-400'}`}
                        >
                            🚨 Urgent
                        </button>
                        <button
                            type="submit"
                            className="mt-auto px-6 py-2 bg-[var(--brand-primary)] text-white font-bold rounded-xl hover:shadow-lg transition-all"
                        >
                            Post Note
                        </button>
                    </div>
                </form>
            </div>

            {/* Logs List */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {logs.length === 0 && !loading && (
                    <div className="text-center text-gray-400 py-12">
                        <div className="text-4xl mb-2">📝</div>
                        <p>No logs yet. Start the conversation!</p>
                    </div>
                )}

                {logs.map(log => (
                    <div
                        key={log.id}
                        className={`p-6 rounded-2xl border-l-4 shadow-sm bg-white ${log.type === 'Urgent' ? 'border-l-red-500 bg-red-50/50' : 'border-l-blue-500'}`}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-lg ${log.type === 'Urgent' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                                {log.type}
                            </span>
                            <span className="text-xs text-gray-400">
                                {new Date(log.createdAt).toLocaleString()}
                            </span>
                        </div>
                        <p className="text-gray-800 text-lg whitespace-pre-wrap">{log.content}</p>
                        <div className="mt-2 text-xs font-bold text-gray-400">
                            - {log.author}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
