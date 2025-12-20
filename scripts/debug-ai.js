import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

async function test() {
    const key = process.env.GEMINI_API_KEY;
    console.log("Key prefix:", key ? key.substring(0, 5) : 'MISSING');

    try {
        const genAI = new GoogleGenerativeAI(key);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
        const result = await model.generateContent("Hello?");
        console.log("Success:", result.response.text());
    } catch (err) {
        console.error("Error:", err);
    }
}

test();
