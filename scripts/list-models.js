import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';

const apiKey = process.env.GEMINI_API_KEY;

async function main() {
    if (!apiKey) {
        console.error('GEMINI_API_KEY is missing');
        return;
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        // The SDK doesn't have a direct listModels, but we can try to use a dummy prompt
        // to see if the model exists or check the error.

        const models = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro'];

        for (const m of models) {
            try {
                const model = genAI.getGenerativeModel({ model: m });
                console.log(`Checking model: ${m}...`);
                const result = await model.generateContent("Hello");
                console.log(`✅ ${m} is available.`);
            } catch (err) {
                console.error(`❌ ${m} failed:`, err.message);
            }
        }
    } catch (err) {
        console.error('List error:', err);
    }
}

main();
