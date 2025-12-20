import { NextResponse } from 'next/server';
import { getGeminiSeoCopy } from '@/app/lib/seo-utils';

export async function POST(req: Request) {
    try {
        const { contentTitle, type } = await req.json();
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ error: 'Server configuration error: Gemini API Key missing' }, { status: 500 });
        }

        // Generate 3 variations
        // Generate Captions + Image Prompt
        const prompt = `You are a social media expert for "Oye Chatoro" (Fast Food). 
        Context: Post about "${contentTitle}" | Strategy: "${type}".
        Task: 
        1. Write 3 catchy, Hinglish captions (with emojis/hashtags).
        2. Write 1 detailed AI Image Generation Prompt (Photorealistic, food photography style) that describes the image to go with this post.
        
        Output format: JSON object with keys "captions" (array of strings) and "imagePrompt" (string).`;

        const aiResponse = await getGeminiSeoCopy(prompt, apiKey);

        let captions: string[] = [];
        let imagePrompt = "";

        if (aiResponse) {
            try {
                // cleanup markdown code blocks if present
                const cleanJson = aiResponse.replace(/```json/g, '').replace(/```/g, '').trim();
                const data = JSON.parse(cleanJson);
                captions = data.captions || [];
                imagePrompt = data.imagePrompt || "";
            } catch (e) {
                console.error("JSON Parse Error on AI response", e);
                // Try to recover text if JSON format failed (fallback)
                captions = [aiResponse];
            }
        }

        // Fallback if AI fails or returns empty
        if (captions.length === 0) {
            captions = [
                `Enjoy our delicious ${contentTitle}! 😋 #OyeChatoro`,
                `Have you tried the ${contentTitle} yet? It's amazing! 🍕`,
                `Best ${contentTitle} in Abu Road! Visit us today.`
            ];
        }

        return NextResponse.json({
            captions,
            imagePrompt,
            debugError: aiResponse ? null : 'AI returned null (Check server logs)'
        });
    } catch (e: any) {
        console.error('API Error:', e);
        return NextResponse.json({ error: 'Failed to generate captions', debug: e.message }, { status: 500 });
    }
}
