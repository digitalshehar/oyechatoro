'use client';

import React, { useState } from 'react';
import { useDbAudit } from '../../lib/db-hooks';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const AuditPage = () => {
    const { logs, loading, fetchLogs } = useDbAudit();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredLogs = logs.filter(log =>
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (log.userId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (log.details ? JSON.stringify(log.details).toLowerCase().includes(searchTerm.toLowerCase()) : false)
    );

    if (loading && logs.length === 0) {
        return <div className="p-12 flex justify-center"><LoadingSpinner /></div>;
    }

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            <div className="mb-8 animate-in w-full">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <h1 className="text-3xl font-bold text-[var(--brand-dark)]">Audit Logs <span className="text-sm font-normal text-gray-400 bg-gray-100 px-2 py-1 rounded-full ml-2">Monitor</span></h1>
                    <div className="flex gap-3 w-full md:w-auto">
                        <div className="relative flex-1 w-full md:w-64">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                            <input
                                placeholder="Search logs..."
                                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button onClick={() => fetchLogs()} className="p-2 rounded-xl border bg-gray-100 text-gray-600 hover:bg-gray-200" title="Refresh">
                            🔄
                        </button>
                    </div>
                </div>

                <div className="glass-card rounded-2xl overflow-hidden border border-gray-100 bg-white/60">
                    {/* Desktop Table View */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100 text-left">
                                    <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Timestamp</th>
                                    <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
                                    <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
                                    <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Entity</th>
                                    <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Details</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredLogs.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-gray-400">No logs found</td>
                                    </tr>
                                ) : (
                                    filteredLogs.map((log) => (
                                        <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="p-4 text-sm text-gray-600 whitespace-nowrap">
                                                {new Date(log.timestamp).toLocaleString()}
                                            </td>
                                            <td className="p-4 text-sm font-medium text-[var(--brand-dark)]">
                                                {log.userId || 'System'}
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${log.action.includes('CREATE') ? 'bg-green-100 text-green-700' :
                                                    log.action.includes('UPDATE') ? 'bg-blue-100 text-blue-700' :
                                                        log.action.includes('DELETE') ? 'bg-red-100 text-red-700' :
                                                            'bg-gray-100 text-gray-700'
                                                    }`}>
                                                    {log.action}
                                                </span>
                                            </td>
                                            <td className="p-4 text-sm text-gray-600">
                                                {log.entity} <span className="text-xs text-gray-400">({log.entityId})</span>
                                            </td>
                                            <td className="p-4 text-sm text-gray-500 max-w-xs truncate font-mono text-xs">
                                                {log.details ? JSON.stringify(log.details) : '-'}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden divide-y divide-gray-100 bg-white">
                        {filteredLogs.length === 0 ? (
                            <div className="p-8 text-center text-gray-400">No logs found</div>
                        ) : (
                            filteredLogs.map((log) => (
                                <div key={log.id} className="p-4 space-y-3">
                                    <div className="flex justify-between items-start">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                                                {new Date(log.timestamp).toLocaleString()}
                                            </span>
                                            <span className="font-bold text-gray-800 text-sm">{log.userId || 'System'}</span>
                                        </div>
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${log.action.includes('CREATE') ? 'bg-green-100 text-green-700' :
                                            log.action.includes('UPDATE') ? 'bg-blue-100 text-blue-700' :
                                                log.action.includes('DELETE') ? 'bg-red-100 text-red-700' :
                                                    'bg-gray-100 text-gray-700'
                                            }`}>
                                            {log.action}
                                        </span>
                                    </div>
                                    <div className="text-sm">
                                        <span className="text-gray-500">Entity:</span> <span className="font-medium text-gray-700">{log.entity}</span>
                                        <span className="text-xs text-gray-400 ml-1">({log.entityId})</span>
                                    </div>
                                    {log.details && (
                                        <div className="bg-gray-50 p-2 rounded-lg border border-gray-100 font-mono text-[10px] text-gray-600 break-all overflow-hidden max-h-20 overflow-y-auto">
                                            {JSON.stringify(log.details, null, 2)}
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuditPage;
