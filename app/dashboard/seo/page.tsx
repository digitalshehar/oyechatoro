'use client';

import React, { useState, useEffect } from 'react';
import { useDbBlog, useDbMenu, BlogTag } from '../../lib/db-hooks';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { generateWhatsAppReviewLink } from '../../lib/seo-utils';

// Mock Ranking Data
const rankingData = [
    { date: 'Nov 20', rank: 12, clicks: 120, impressions: 2400 },
    { date: 'Nov 27', rank: 8, clicks: 180, impressions: 3100 },
    { date: 'Dec 4', rank: 5, clicks: 310, impressions: 4800 },
    { date: 'Dec 11', rank: 2, clicks: 540, impressions: 6200 },
    { date: 'Dec 18', rank: 1, clicks: 890, impressions: 9400 },
];

export default function SeoDashboard() {
    const { posts } = useDbBlog();
    const [activeTab, setActiveTab] = useState('health');
    const [scanning, setScanning] = useState(false);
    const [healthScore, setHealthScore] = useState(0);
    const [aiGenerating, setAiGenerating] = useState(false);
    const [customerPhone, setCustomerPhone] = useState('');
    const [config, setConfig] = useState<any>({
        googleCloudKey: '',
        googleSearchConsole: { propertyUrl: '', connected: false },
        googleAnalytics: { measurementId: '', connected: false },
        googleBusinessProfile: { locationId: '', connected: false },
        geminiKey: '',
        whatsappNumber: '',
        gmbReviewLink: 'https://g.page/r/YOUR_LINK/review'
    });
    const [auditState, setAuditState] = useState<any>(null);
    const [citations, setCitations] = useState<any[]>([]);
    const [saving, setSaving] = useState(false);
    const [loadingCitations, setLoadingCitations] = useState(false);
    const [gmbPost, setGmbPost] = useState({ text: '', type: 'STANDARD', image: '' });
    const [competitors, setCompetitors] = useState<any[]>([]);
    const [postingToGmb, setPostingToGmb] = useState(false);
    const [sentimentData, setSentimentData] = useState<any>(null);
    const [analyzingSentiment, setAnalyzingSentiment] = useState(false);
    const [weeklyReport, setWeeklyReport] = useState<any>(null);
    const [loadingReport, setLoadingReport] = useState(false);
    const [serpPreview, setSerpPreview] = useState<any>(null);
    const [loadingVisibility, setLoadingVisibility] = useState(false);
    const [altAudit, setAltAudit] = useState<any>(null);
    const [runningAltAudit, setRunningAltAudit] = useState(false);
    const [socialCaptions, setSocialCaptions] = useState<string[]>([]);
    const [generatingCaptions, setGeneratingCaptions] = useState(false);
    const [captionTopic, setCaptionTopic] = useState('');
    const [reviewResponse, setReviewResponse] = useState('');
    const [generatingResponse, setGeneratingResponse] = useState(false);
    const [targetReview, setTargetReview] = useState({ text: '', rating: 5 });
    const [finalAudit, setFinalAudit] = useState<any>(null);
    const [runningFinalAudit, setRunningFinalAudit] = useState(false);
    const [gscData, setGscData] = useState<any>(null);
    const [ga4Data, setGa4Data] = useState<any>(null);
    const [loadingGsc, setLoadingGsc] = useState(false);
    const [loadingGa4, setLoadingGa4] = useState(false);

    useEffect(() => {
        const load = async () => {
            try {
                const cfgRes = await fetch('/api/seo/settings');
                if (cfgRes.ok) {
                    const data = await cfgRes.json();
                    if (data && Object.keys(data).length > 0) {
                        setConfig({
                            ...config,
                            ...data
                        });
                    }
                }
                const auditRes = await fetch('/api/seo/audit');
                if (auditRes.ok) setAuditState(await auditRes.json());
                fetchCitations();
                fetchCompetitors();
            } catch (e) {
                console.error('Failed to load SEO data');
            }
        };
        load();
    }, []);

    const fetchGscData = async () => {
        setLoadingGsc(true);
        try {
            const res = await fetch('/api/seo/gsc', { method: 'POST' });
            if (res.ok) setGscData(await res.json());
            else throw new Error('Refresh failed');
        } catch (e) {
            console.error(e);
        } finally {
            setLoadingGsc(false);
        }
    };

    const fetchGa4Data = async () => {
        setLoadingGa4(true);
        try {
            const res = await fetch('/api/seo/ga4', { method: 'POST' });
            if (res.ok) setGa4Data(await res.json());
            else throw new Error('Refresh failed');
        } catch (e) {
            console.error(e);
        } finally {
            setLoadingGa4(false);
        }
    };

    const fetchCitations = async () => {
        setLoadingCitations(true);
        try {
            const res = await fetch('/api/seo/citations');
            if (res.ok) setCitations(await res.json());
        } finally {
            setLoadingCitations(false);
        }
    };

    const fetchCompetitors = async () => {
        try {
            const res = await fetch('/api/seo/competitors');
            if (res.ok) setCompetitors(await res.json());
        } catch (e) { }
    };

    const toggleCitationStatus = async (id: string, currentStatus: string) => {
        const nextStatus = currentStatus === 'Verified' ? 'Not Verified' : 'Verified';
        try {
            const res = await fetch('/api/seo/citations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status: nextStatus })
            });
            if (res.ok) fetchCitations();
        } catch (e) {
            alert('Failed to update status');
        }
    };

    const saveConfig = async () => {
        setSaving(true);
        try {
            const res = await fetch('/api/seo/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(config)
            });
            if (res.ok) alert('Settings saved successfully!');
        } catch (e) {
            alert('Failed to save settings');
        } finally {
            setSaving(false);
        }
    };

    const runAudit = async () => {
        if (!config.googleCloudKey) return alert('Please add Google Cloud API Key.');
        setScanning(true);
        try {
            const res = await fetch(`/api/seo/audit/pagespeed?key=${config.googleCloudKey}&url=${window.location.origin}`);
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setAuditState({ ...auditState, speedStats: data });
            setHealthScore(data.score);
        } catch (e: any) {
            alert('Audit failed: ' + e.message);
        } finally {
            setScanning(false);
        }
    };

    const runSentimentAnalysis = async () => {
        if (!config.geminiKey) return alert('Gemini Key needed');
        setAnalyzingSentiment(true);
        try {
            const res = await fetch('/api/seo/ai/sentiment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ apiKey: config.geminiKey, reviews: [] })
            });
            const data = await res.json();
            setSentimentData(data);
        } catch (e) {
            alert('Sentiment analysis failed');
        } finally {
            setAnalyzingSentiment(false);
        }
    };

    const generateCaptions = async () => {
        if (!captionTopic) return alert('Enter a topic');
        setGeneratingCaptions(true);
        try {
            const res = await fetch('/api/seo/ai/social', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ apiKey: config.geminiKey, contentTitle: captionTopic })
            });
            const data = await res.json();
            setSocialCaptions(data.captions);
        } catch (e) {
            alert('Failed to generate captions');
        } finally {
            setGeneratingCaptions(false);
        }
    };

    const generateReviewResponse = async () => {
        if (!targetReview.text) return alert('Enter review text');
        setGeneratingResponse(true);
        try {
            const res = await fetch('/api/seo/ai/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ apiKey: config.geminiKey, reviewText: targetReview.text, rating: targetReview.rating })
            });
            const data = await res.json();
            setReviewResponse(data.response);
        } catch (e) {
            alert('Failed to generate response');
        } finally {
            setGeneratingResponse(false);
        }
    };

    const fetchWeeklyReport = async () => {
        setLoadingReport(true);
        try {
            const res = await fetch('/api/seo/reports/weekly');
            if (res.ok) setWeeklyReport(await res.json());
        } catch (e) { } finally {
            setLoadingReport(false);
        }
    };

    const fetchVisibility = async () => {
        setLoadingVisibility(true);
        try {
            const res = await fetch('/api/seo/serp/preview');
            setSerpPreview(await res.json());
        } catch (e) { } finally {
            setLoadingVisibility(false);
        }
    };

    const runAltAudit = async () => {
        setRunningAltAudit(true);
        try {
            const res = await fetch('/api/seo/audit/accessibility');
            setAltAudit(await res.json());
        } catch (e) { } finally {
            setRunningAltAudit(false);
        }
    };

    const runFinalAudit = async () => {
        setRunningFinalAudit(true);
        try {
            const res = await fetch('/api/seo/audit/final');
            setFinalAudit(await res.json());
        } catch (e) { } finally {
            setRunningFinalAudit(false);
        }
    };

    const handleWhatsApp = () => {
        if (!customerPhone) return alert('Enter phone number');
        const link = generateWhatsAppReviewLink(customerPhone, config.gmbReviewLink);
        window.open(link, '_blank');
    };

    const handleGmbPost = async () => {
        if (!gmbPost.text) return alert('Enter post content');
        setPostingToGmb(true);
        try {
            const res = await fetch('/api/seo/gmb/post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(gmbPost)
            });
            if (res.ok) {
                alert('Post live! 🚀');
                setGmbPost({ text: '', type: 'STANDARD', image: '' });
            }
        } finally {
            setPostingToGmb(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'visibility' && !serpPreview) fetchVisibility();
        if (activeTab === 'reports' && !weeklyReport) fetchWeeklyReport();
    }, [activeTab]);

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto pb-20">
            {/* Header */}
            <header className="mb-6 md:mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 md:gap-6">
                <div>
                    <h1 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight text-glow">Oye Chatoro SEO Hub 🚀</h1>
                    <p className="text-xs md:text-sm text-gray-500 font-medium italic">Powered by Real-World API Persistence.</p>
                </div>
                <div className="flex gap-3 md:gap-4 w-full md:w-auto">
                    <div className="flex-1 glass-card bg-white p-3 md:p-4 md:px-8 rounded-2xl md:rounded-3xl border border-gray-100 shadow-xl text-center transform md:hover:scale-105 transition-all">
                        <p className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest">Live Users</p>
                        <p className="text-xl md:text-3xl font-black text-blue-600">{auditState?.ga4Data?.realtimeUsers || '0'}</p>
                    </div>
                    <div className="flex-1 glass-card bg-black p-3 md:p-4 md:px-8 rounded-2xl md:rounded-3xl shadow-2xl text-center text-white transform md:hover:scale-105 transition-all">
                        <p className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest">Speed Score</p>
                        <p className="text-xl md:text-3xl font-black text-green-400">{auditState?.speedStats?.score || '95'}</p>
                    </div>
                </div>
            </header>

            {/* Tabs */}
            <nav className="flex gap-2 mb-6 md:mb-10 bg-gray-100/50 p-1.5 md:p-2 rounded-2xl md:rounded-[2.5rem] border border-gray-200/50 overflow-x-auto no-scrollbar backdrop-blur-md sticky top-0 md:top-4 z-40 shadow-sm">
                {[
                    { id: 'health', label: 'Speed', icon: '⚡' },
                    { id: 'gsc', label: 'Search', icon: '🔍' },
                    { id: 'ga', label: 'Analytics', icon: '📊' },
                    { id: 'visibility', label: 'Visibility', icon: '🖼️' },
                    { id: 'spy', label: 'Spy', icon: '🕵️' },
                    { id: 'reports', label: 'Reports', icon: '📈' },
                    { id: 'review', label: 'Booster', icon: '💬' },
                    { id: 'citations', label: 'Local', icon: '📍' },
                    { id: 'settings', label: 'Setup', icon: '⚙️' }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-1.5 md:gap-2 px-4 md:px-8 py-2 md:py-4 rounded-xl md:rounded-[2rem] font-black text-[10px] md:text-sm transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-black text-white shadow-2xl scale-105' : 'text-gray-500 hover:bg-gray-200/50'}`}
                    >
                        <span>{tab.icon}</span> {tab.label}
                    </button>
                ))}
            </nav>

            <div className="space-y-12">
                {/* SPEED TAB */}
                {activeTab === 'health' && (
                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="glass-card p-12 rounded-[4rem] bg-white border border-gray-100 shadow-2xl text-center relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                <span className="text-8xl">🏎️</span>
                            </div>
                            <div className="flex flex-col items-center relative z-10">
                                <span className="text-6xl md:text-9xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-500">{healthScore || auditState?.speedStats?.score || '95'}</span>
                                <span className="text-[10px] md:text-xs font-black text-blue-600 uppercase tracking-[0.2em] md:tracking-[0.3em] font-mono whitespace-nowrap">Performance Metric</span>
                            </div>
                            <div className="grid grid-cols-2 gap-3 md:gap-6 mt-8 md:mt-12">
                                <div className="p-4 md:p-8 bg-gray-50 rounded-2xl md:rounded-[2rem] border border-gray-100 transform md:hover:translate-y-[-4px] transition-all">
                                    <p className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase mb-1 md:mb-2 tracking-widest">LCP (Load)</p>
                                    <p className="text-lg md:text-2xl font-black text-gray-900">{auditState?.speedStats?.lcp || '0.8s'}</p>
                                </div>
                                <div className="p-4 md:p-8 bg-gray-50 rounded-2xl md:rounded-[2rem] border border-gray-100 transform md:hover:translate-y-[-4px] transition-all">
                                    <p className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase mb-1 md:mb-2 tracking-widest">CLS (Shift)</p>
                                    <p className="text-lg md:text-2xl font-black text-gray-900">{auditState?.speedStats?.cls || '0.01'}</p>
                                </div>
                            </div>
                            <button
                                onClick={runAudit}
                                disabled={scanning}
                                className={`w-full mt-10 py-6 rounded-3xl font-black uppercase text-sm tracking-widest transition-all ${scanning ? 'bg-gray-100 text-gray-400' : 'bg-black text-white hover:bg-blue-600 shadow-xl shadow-blue-100'}`}
                            >
                                {scanning ? '🤖 Analyzing Site Architecture...' : 'Trigger Real-time Audit'}
                            </button>
                        </div>
                        <div className="glass-card p-8 bg-black text-white rounded-[4rem] relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <span className="text-8xl">🔍</span>
                            </div>
                            <h3 className="text-2xl font-black mb-6">Final Global SEO Audit</h3>
                            <p className="text-gray-400 text-sm mb-10 italic">Checking for unresolved issues across technical, on-page, and local SEO...</p>
                            {!finalAudit ? (
                                <button
                                    onClick={runFinalAudit}
                                    disabled={runningFinalAudit}
                                    className="px-10 py-5 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all"
                                >
                                    {runningFinalAudit ? 'Generating Report...' : 'Launch Final Sweep'}
                                </button>
                            ) : (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                                            <p className="text-[8px] font-black uppercase text-gray-400">Resolved</p>
                                            <p className="text-2xl font-black text-green-400">{finalAudit.totalChecks}</p>
                                        </div>
                                        <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                                            <p className="text-[8px] font-black uppercase text-gray-400">Unresolved</p>
                                            <p className="text-2xl font-black text-red-500">{finalAudit.unresolvedIssues}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        {finalAudit.checks.map((check: any, i: number) => (
                                            <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/10">
                                                <span className="text-xs font-bold">{check.item}</span>
                                                <span className={`text-[10px] font-black uppercase ${check.status === 'Pass' ? 'text-green-400' : 'text-orange-400'}`}>{check.status}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* SEARCH CONSOLE TAB */}
                {activeTab === 'gsc' && (
                    <div className="glass-card p-12 rounded-[4rem] bg-white border border-blue-50 shadow-2xl">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-black">Search Performance 🔍</h2>
                            <button onClick={fetchGscData} disabled={loadingGsc} className="px-6 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold uppercase transition-all hover:bg-blue-700">
                                {loadingGsc ? 'Syncing...' : 'Refresh GSC'}
                            </button>
                        </div>
                        {gscData ? (
                            <div className="space-y-6">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                                        <p className="text-[10px] font-black uppercase text-gray-400">Total Rows</p>
                                        <p className="text-2xl font-black">{gscData.rows?.length || 0}</p>
                                    </div>
                                    <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                                        <p className="text-[10px] font-black uppercase text-gray-400">Date Range</p>
                                        <p className="text-sm font-bold">{gscData.rows?.[0]?.keys?.[0]} to {gscData.rows?.[gscData.rows.length - 1]?.keys?.[0]}</p>
                                    </div>
                                </div>
                                <div className="overflow-x-auto -mx-12 px-12 pb-4">
                                    <table className="w-full text-left text-xs min-w-[500px]">
                                        <thead>
                                            <tr className="border-b border-gray-100">
                                                <th className="py-4 font-black uppercase">Date</th>
                                                <th className="py-4 font-black uppercase">Clicks</th>
                                                <th className="py-4 font-black uppercase">Impressions</th>
                                                <th className="py-4 font-black uppercase">CTR</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {gscData.rows?.map((row: any, i: number) => (
                                                <tr key={i} className="border-b border-gray-50">
                                                    <td className="py-3 font-medium">{row.keys[0]}</td>
                                                    <td className="py-3 font-black text-blue-600">{row.clicks}</td>
                                                    <td className="py-3 font-bold">{row.impressions}</td>
                                                    <td className="py-3 font-bold text-green-500">{(row.ctr * 100).toFixed(2)}%</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
                                <span className="text-6xl mb-6 block">🔍</span>
                                <h3 className="text-lg font-black mb-2">GSC Not Synced</h3>
                                <p className="text-gray-400 text-sm max-w-xs mx-auto">Connect your Service Account in Setup to fetch live search performance data.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* ANALYTICS TAB */}
                {activeTab === 'ga' && (
                    <div className="glass-card p-12 rounded-[4rem] bg-white border border-gray-100 shadow-2xl">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-black">GA4 Real-time 📊</h2>
                            <button onClick={fetchGa4Data} disabled={loadingGa4} className="px-6 py-2 bg-orange-600 text-white rounded-xl text-xs font-bold uppercase transition-all hover:bg-orange-700">
                                {loadingGa4 ? 'Fetching...' : 'Fetch Real-time'}
                            </button>
                        </div>
                        {ga4Data ? (
                            <div className="space-y-12">
                                <div className="p-10 bg-black text-white rounded-[3rem] text-center">
                                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">Active Users (Last 30 Min)</p>
                                    <p className="text-7xl font-black text-green-400">{ga4Data.rows?.[0]?.metricValues?.[0]?.value || '0'}</p>
                                </div>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="p-8 bg-gray-50 rounded-[3rem] border border-gray-100">
                                        <h4 className="font-black mb-4">Users by Country</h4>
                                        <div className="space-y-3">
                                            {ga4Data.rows?.map((row: any, i: number) => (
                                                <div key={i} className="flex justify-between items-center text-sm">
                                                    <span className="font-bold">{row.dimensionValues[0].value}</span>
                                                    <span className="font-black text-blue-600">{row.metricValues[0].value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="p-8 bg-orange-50 rounded-[3rem] border border-orange-100 flex flex-col items-center justify-center text-center">
                                        <span className="text-5xl mb-4">🌎</span>
                                        <p className="text-xs font-bold text-orange-900 leading-relaxed font-serif italic">"Real-time monitoring enabled. GA4 property '{config.googleAnalytics?.propertyId}' is streaming live."</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
                                <span className="text-6xl mb-6 block">📊</span>
                                <h3 className="text-lg font-black mb-2">Analytics Not Synced</h3>
                                <p className="text-gray-400 text-sm max-w-xs mx-auto">Requires GA4 Property ID and Service Account JSON key in Setup.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* VISIBILITY TAB */}
                {activeTab === 'visibility' && serpPreview && (
                    <div className="glass-card p-12 rounded-[4rem] bg-white border border-gray-100 shadow-2xl">
                        <h2 className="text-4xl font-black mb-12">SERP Visibility Master 🖼️</h2>
                        <div className="grid lg:grid-cols-2 gap-12 text-left">
                            <div className="p-10 bg-gray-50 rounded-[4rem] border border-gray-100">
                                <div className="max-w-[340px] mx-auto bg-white rounded-[2.5rem] p-6 shadow-2xl border border-gray-100">
                                    <h3 className="text-blue-700 text-lg font-bold mb-2">{serpPreview.title}</h3>
                                    <p className="text-gray-600 text-[11px] leading-relaxed">{serpPreview.description}</p>
                                </div>
                            </div>
                            <div className="p-10 bg-white rounded-[3rem] border border-gray-100 shadow-xl">
                                <h3 className="text-2xl font-black mb-1">Oye Chatoro</h3>
                                <p className="text-xs font-bold text-gray-400 mb-6 font-serif">Restaurant in Abu Road</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-orange-50 rounded-2xl">
                                        <p className="text-[10px] font-black uppercase text-orange-400">Rating</p>
                                        <p className="text-xl font-black">★ {serpPreview.knowledgePanel.rating}</p>
                                    </div>
                                    <div className="p-4 bg-blue-50 rounded-2xl">
                                        <p className="text-[10px] font-black uppercase text-blue-400">Reviews</p>
                                        <p className="text-xl font-black">{serpPreview.knowledgePanel.reviews}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* SPY TOOL TAB */}
                {activeTab === 'spy' && (
                    <div className="glass-card p-12 rounded-[4rem] bg-white border border-gray-100 shadow-2xl">
                        <h2 className="text-4xl font-black mb-12">Competitor Intelligence 🕵️</h2>
                        <div className="space-y-6">
                            {competitors.map((comp) => (
                                <div key={comp.id} className={`p-8 rounded-[3rem] border flex justify-between items-center ${comp.isMain ? 'bg-black text-white' : 'bg-gray-50'}`}>
                                    <div className="text-left">
                                        <h4 className="font-black text-xl">{comp.name}</h4>
                                        <p className="text-[10px] uppercase opacity-50">{comp.reviews} Reviews • ★ {comp.rating}</p>
                                    </div>
                                    <div className="bg-blue-600 px-6 py-2 rounded-full font-black text-xs text-white uppercase tracking-widest">{comp.growth}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* REPORTS TAB */}
                {activeTab === 'reports' && weeklyReport && (
                    <div className="glass-card p-12 rounded-[4rem] bg-white border border-gray-100 shadow-2xl">
                        <h2 className="text-4xl font-black mb-12 text-left">Growth Intelligence 📈</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="p-8 bg-blue-50 rounded-3xl text-left border border-blue-100">
                                <p className="text-[10px] font-black uppercase text-blue-600 mb-2">Total Clicks</p>
                                <p className="text-3xl font-black">{weeklyReport.summary.totalClicks}</p>
                                <p className="text-xs font-bold text-green-500">{weeklyReport.summary.clickGrowth}</p>
                            </div>
                            <div className="p-8 bg-purple-50 rounded-3xl text-left border border-purple-100">
                                <p className="text-[10px] font-black uppercase text-purple-600 mb-2">Impressions</p>
                                <p className="text-3xl font-black">{weeklyReport.summary.impressions}</p>
                                <p className="text-xs font-bold text-green-500">{weeklyReport.summary.impressionGrowth}</p>
                            </div>
                            <div className="p-8 bg-black text-white rounded-3xl text-left border border-black transition-transform hover:scale-105">
                                <p className="text-[10px] font-black uppercase text-gray-400 mb-4">AI Top Insight 🤖</p>
                                <p className="text-xs font-medium italic opacity-90 leading-relaxed font-serif">"{weeklyReport.insights[0]}"</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* BOOSTER TAB */}
                {activeTab === 'review' && (
                    <div className="max-w-4xl mx-auto space-y-12">
                        <div className="glass-card p-12 rounded-[5rem] bg-white border border-green-50 shadow-2xl text-center">
                            <h2 className="text-4xl font-black mb-3 text-glow">Review Booster 🚀</h2>
                            <div className="space-y-8 mt-12 text-left">
                                <input
                                    type="text"
                                    value={customerPhone}
                                    onChange={(e) => setCustomerPhone(e.target.value)}
                                    placeholder="91XXXXXXXXXX"
                                    className="w-full p-8 bg-gray-50 border-2 border-gray-100 rounded-[2.5rem] font-black text-4xl text-center outline-none focus:ring-8 focus:ring-green-100 transition-all"
                                />
                                <button
                                    onClick={handleWhatsApp}
                                    className="w-full bg-[#25D366] text-white py-8 rounded-[3rem] font-black text-2xl shadow-3xl shadow-green-200 hover:scale-105 active:scale-95 transition-all"
                                >
                                    Send WhatsApp Request
                                </button>
                            </div>

                            {/* SENTIMENT */}
                            <div className="mt-16 p-10 bg-gradient-to-br from-green-50 to-blue-50 rounded-[3rem] text-left border border-green-100">
                                <h3 className="text-xl font-black mb-4">✨ AI Local Sentiment</h3>
                                {!sentimentData ? (
                                    <button onClick={runSentimentAnalysis} disabled={analyzingSentiment} className="px-8 py-4 bg-white border-2 border-green-200 text-green-700 rounded-2xl font-black text-xs transition-all uppercase tracking-widest hover:bg-green-50">
                                        {analyzingSentiment ? 'Analyzing...' : 'Analyze Market Sentiment'}
                                    </button>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="bg-white p-4 rounded-xl shadow-sm border border-green-200">
                                            <span className="text-green-600 font-black">{sentimentData.overallSentiment}</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-4 bg-white rounded-xl border border-blue-50">
                                                <p className="text-[10px] font-black text-blue-600 uppercase mb-2">High Points</p>
                                                <p className="text-xs font-bold">{sentimentData.topPros[0]}</p>
                                            </div>
                                            <div className="p-4 bg-white rounded-xl border border-red-50">
                                                <p className="text-[10px] font-black text-red-600 uppercase mb-2">Pain Areas</p>
                                                <p className="text-xs font-bold">{sentimentData.topCons[0]}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* SOCIAL CONTENT */}
                        <div className="p-12 bg-white rounded-[4rem] border border-gray-100 shadow-xl text-left relative overflow-hidden transition-all hover:border-pink-200">
                            <h3 className="text-2xl font-black mb-6">📸 Social Caption Gen</h3>
                            <div className="flex gap-4 mb-8">
                                <input
                                    type="text"
                                    value={captionTopic}
                                    onChange={(e) => setCaptionTopic(e.target.value)}
                                    placeholder="e.g. Maharaja Pizza..."
                                    className="flex-1 p-5 bg-gray-50 border border-gray-100 rounded-2xl font-black focus:ring-4 focus:ring-pink-100 transition-all font-mono"
                                />
                                <button onClick={generateCaptions} disabled={generatingCaptions} className="px-8 bg-pink-600 text-white rounded-2xl font-black text-xs uppercase hover:bg-pink-700 transition-all">
                                    {generatingCaptions ? 'Crafting...' : 'Generate'}
                                </button>
                            </div>
                            {socialCaptions.length > 0 && (
                                <div className="grid md:grid-cols-2 gap-4">
                                    {socialCaptions.slice(0, 2).map((cap, i) => (
                                        <div key={i} className="p-5 bg-gray-50 rounded-2xl border border-gray-200 text-xs italic font-serif leading-relaxed">"{cap}"</div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* REVIEW REPONSE */}
                        <div className="p-12 bg-black text-white rounded-[4rem] shadow-2xl text-left relative overflow-hidden group">
                            <h3 className="text-2xl font-black mb-6">📝 AI Review Responder</h3>
                            <textarea
                                value={targetReview.text}
                                onChange={(e) => setTargetReview({ ...targetReview, text: e.target.value })}
                                placeholder="Paste review..."
                                className="w-full p-6 bg-white/5 border border-white/10 rounded-2xl min-h-[120px] mb-4 text-sm font-medium"
                            />
                            <div className="flex justify-between items-center">
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map(s => (
                                        <button key={s} onClick={() => setTargetReview({ ...targetReview, rating: s })} className={`w-8 h-8 rounded-lg flex items-center justify-center font-black ${targetReview.rating >= s ? 'bg-orange-400 text-white' : 'bg-white/10 text-gray-500'}`}>★</button>
                                    ))}
                                </div>
                                <button onClick={generateReviewResponse} disabled={generatingResponse} className="px-8 py-3 bg-blue-600 rounded-xl font-black text-[10px] uppercase hover:bg-blue-700 transition-all">
                                    {generatingResponse ? 'Thinking...' : 'Draft Reply'}
                                </button>
                            </div>
                            {reviewResponse && (
                                <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-blue-500/20">
                                    <p className="text-sm font-medium text-blue-100 leading-relaxed">"{reviewResponse}"</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* DOMINANCE TAB */}
                {activeTab === 'citations' && (
                    <div className="glass-card p-12 rounded-[4rem] bg-white border border-gray-100 shadow-2xl">
                        <h2 className="text-4xl font-black mb-12 text-left">Local Dominance 📍</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {citations.map((cite: any) => (
                                <div key={cite.id} className="p-8 rounded-[3rem] border bg-gray-50 border-gray-100 text-left relative hover:scale-105 transition-all">
                                    <h4 className="font-black text-gray-900 mb-2">{cite.name}</h4>
                                    <p className={`text-[10px] font-black uppercase ${cite.status === 'Verified' ? 'text-green-500' : 'text-gray-400'}`}>{cite.status}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* SETUP TAB */}
                {activeTab === 'settings' && (
                    <div className="max-w-4xl mx-auto glass-card p-12 rounded-[5rem] bg-white border border-gray-100 shadow-2xl text-left">
                        <h2 className="text-4xl font-black mb-12">Master Integrations ⚙️</h2>
                        <div className="space-y-10">
                            {/* Service Account Section */}
                            <div className="p-8 bg-blue-50/30 rounded-[3rem] border border-blue-100 space-y-6">
                                <h3 className="text-xl font-black flex items-center gap-2">🔑 Google Service Account</h3>
                                <p className="text-xs font-bold text-blue-600 italic">"Standard industry practice for server-to-server data fetching."</p>
                                <input
                                    type="text"
                                    value={config.serviceAccountEmail}
                                    onChange={(e) => setConfig({ ...config, serviceAccountEmail: e.target.value })}
                                    className="w-full p-6 bg-white border-2 border-gray-100 rounded-3xl font-mono text-xs shadow-inner"
                                    placeholder="Service Account Email (e.g. oye-chatoro@pujit.iam.gserviceaccount.com)"
                                />
                                <textarea
                                    value={config.serviceAccountKey}
                                    onChange={(e) => setConfig({ ...config, serviceAccountKey: e.target.value })}
                                    className="w-full p-6 bg-white border-2 border-gray-100 rounded-3xl font-mono text-xs min-h-[150px]"
                                    placeholder="Private Key JSON (Paste the entire Private Key value here)..."
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <h4 className="text-xs font-black uppercase text-gray-400 ml-4">Search & Analytics</h4>
                                    <input
                                        type="text"
                                        value={config.googleSearchConsole?.propertyUrl}
                                        onChange={(e) => setConfig({ ...config, googleSearchConsole: { ...config.googleSearchConsole, propertyUrl: e.target.value } })}
                                        className="w-full p-6 bg-gray-50 border-2 border-gray-100 rounded-3xl font-mono text-xs"
                                        placeholder="GSC Property URL"
                                    />
                                    <input
                                        type="text"
                                        value={config.googleAnalytics?.propertyId}
                                        onChange={(e) => setConfig({ ...config, googleAnalytics: { ...config.googleAnalytics, propertyId: e.target.value } })}
                                        className="w-full p-6 bg-gray-50 border-2 border-gray-100 rounded-3xl font-mono text-xs"
                                        placeholder="GA4 Property ID"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-xs font-black uppercase text-gray-400 ml-4">API Keys</h4>
                                    <input
                                        type="password"
                                        value={config.googleCloudKey}
                                        onChange={(e) => setConfig({ ...config, googleCloudKey: e.target.value })}
                                        className="w-full p-6 bg-gray-50 border-2 border-gray-100 rounded-3xl font-mono text-xs"
                                        placeholder="Google Cloud API Key"
                                    />
                                    <input
                                        type="password"
                                        value={config.geminiKey}
                                        onChange={(e) => setConfig({ ...config, geminiKey: e.target.value })}
                                        className="w-full p-6 bg-gray-50 border-2 border-gray-100 rounded-3xl font-mono text-xs"
                                        placeholder="Gemini AI Key"
                                    />
                                </div>
                            </div>

                            <input
                                type="text"
                                value={config.gmbReviewLink}
                                onChange={(e) => setConfig({ ...config, gmbReviewLink: e.target.value })}
                                className="w-full p-6 bg-gray-50 border-2 border-gray-100 rounded-3xl font-mono text-xs"
                                placeholder="GMB Review URL"
                            />
                        </div>
                        <button
                            onClick={saveConfig}
                            disabled={saving}
                            className="w-full mt-16 bg-black text-white py-8 rounded-[3rem] font-black text-xl hover:bg-blue-600 transition-all shadow-3xl"
                        >
                            {saving ? 'Syncing...' : 'Lock & Sync Master Settings'}
                        </button>
                    </div>
                )}
            </div>

            <footer className="mt-24 py-12 text-center border-t border-gray-100 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all font-mono">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Hyper-Growth Infrastructure v5.0</p>
                <div className="flex justify-center gap-8 text-xs font-black uppercase italic">
                    <span>Google</span>
                    <span>Prisma</span>
                    <span>Next.js</span>
                    <span>AI-Gemini</span>
                </div>
            </footer>

            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .text-glow { text-shadow: 0 0 30px rgba(0,0,0,0.05); }
                .shadow-3xl { box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.2); }
                .glass-card { backdrop-filter: blur(20px); }
            `}</style>
        </div>
    );
}
