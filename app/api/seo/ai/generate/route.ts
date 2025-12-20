import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { prompt, apiKey, type } = await req.json();

        if (!apiKey) {
            return NextResponse.json({ error: 'Gemini API Key is required' }, { status: 400 });
        }

        // Google Gemini API endpoint
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 500,
                }
            })
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

        return NextResponse.json({ text: aiResponse });
    } catch (error: any) {
        console.error('Gemini AI Error:', error);
        return NextResponse.json({ error: error.message || 'AI Generation failed' }, { status: 500 });
    }
}
