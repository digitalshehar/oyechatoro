import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';
import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

neonConfig.webSocketConstructor = ws;
const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

const apiKey = process.env.GEMINI_API_KEY;

async function translateContentAI(content, targetLang, key) {
    if (!key) return null;

    const prompt = `
    Translate the following restaurant menu item from English to ${targetLang}.
    
    Rules:
    1. Keep culinary terms like "Pizza", "Pasta", "Burger", "Chaat" in their original English sounds but written in the target script (transliteration vs translation where appropriate).
    2. Maintain a professional yet inviting tone.
    3. Return only a JSON object: { "name": "string", "description": "string" }
    
    Content:
    Name: ${content.name}
    Description: ${content.description || ''}
    `;

    let attempts = 0;
    while (attempts < 3) {
        try {
            const genAI = new GoogleGenerativeAI(key);
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            const cleaned = text.replace(/```json|```/g, '').trim();
            const parsed = JSON.parse(cleaned);
            if (parsed.name) return parsed;
            throw new Error("Invalid AI response structure");
        } catch (err) {
            attempts++;
            console.warn(`Attempt ${attempts} failed for "${content.name}":`, err.message);
            if (attempts >= 3) return null;
            await new Promise(r => setTimeout(r, 2000 * attempts));
        }
    }
}

async function main() {
    if (!apiKey) {
        console.error('GEMINI_API_KEY is missing');
        return;
    }

    console.log('--- Starting Menu Translation ---');

    // 1. Translate Categories
    const categories = await prisma.menuCategory.findMany();
    console.log(`Checking ${categories.length} categories...`);
    for (const cat of categories) {
        let trans = cat.translations;
        if (!trans || !trans.hi) {
            console.log(`Translating Category: ${cat.name}...`);
            const result = await translateContentAI({ name: cat.name }, 'Hindi', apiKey);
            if (result) {
                await prisma.menuCategory.update({
                    where: { id: cat.id },
                    data: {
                        translations: {
                            ...(typeof trans === 'object' ? trans : {}),
                            hi: { name: result.name }
                        }
                    }
                });
                console.log(`✅ Category: ${cat.name} -> ${result.name}`);
            }
            await new Promise(r => setTimeout(r, 1000)); // Rate limit buffer
        }
    }

    // 2. Translate Menu Items
    const items = await prisma.menuItem.findMany();
    console.log(`Checking ${items.length} menu items...`);
    for (const item of items) {
        let trans = item.translations;
        if (!trans || !trans.hi || !trans.hi.name) {
            console.log(`Translating Item: ${item.name}...`);
            const result = await translateContentAI({
                name: item.name,
                description: item.description
            }, 'Hindi', apiKey);

            if (result) {
                await prisma.menuItem.update({
                    where: { id: item.id },
                    data: {
                        translations: {
                            ...(typeof trans === 'object' ? trans : {}),
                            hi: {
                                name: result.name,
                                description: result.description
                            }
                        }
                    }
                });
                console.log(`✅ Item: ${item.name} -> ${result.name}`);
            } else {
                console.log(`❌ Failed: ${item.name}`);
            }
            await new Promise(r => setTimeout(r, 1000)); // Rate limit buffer
        }
    }

    console.log('--- Translation Finished ---');

    // Final Check
    const finalItems = await prisma.menuItem.findMany();
    const count = finalItems.filter(i => i.translations?.hi?.name).length;
    console.log(`Final Status: ${count}/${finalItems.length} items translated.`);
}

main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
