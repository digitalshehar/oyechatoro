import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const apiKey = searchParams.get('key');
    const targetUrl = searchParams.get('url') || 'https://oyechatoro.com';

    if (!apiKey) {
        return NextResponse.json({ error: 'API Key is required' }, { status: 400 });
    }

    try {
        // Call real Google PageSpeed Insights API
        const response = await fetch(
            `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(targetUrl)}&key=${apiKey}&strategy=mobile`
        );

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        const lighthouse = data.lighthouseResult;
        return NextResponse.json({
            score: Math.round(lighthouse.categories.performance.score * 100),
            metrics: {
                fcp: lighthouse.audits['first-contentful-paint'].displayValue,
                lcp: lighthouse.audits['largest-contentful-paint'].displayValue,
                cls: lighthouse.audits['cumulative-layout-shift'].displayValue,
                si: lighthouse.audits['speed-index'].displayValue,
                ti: lighthouse.audits['interactive'].displayValue,
            },
            auditDate: new Date().toISOString()
        });
    } catch (error: any) {
        console.error('PageSpeed API Error:', error);
        return NextResponse.json({ error: error.message || 'Failed to fetch PageSpeed data' }, { status: 500 });
    }
}
