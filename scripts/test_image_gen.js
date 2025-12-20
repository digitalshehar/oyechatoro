
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const key = process.env.GEMINI_API_KEY;

async function testImageGen() {
    if (!key) { console.error('No key'); return; }

    // Try Imagen 3 (standard verified model) or 4 if available
    // Based on previous list: models/imagen-4.0-fast-generate-001
    const model = 'models/imagen-4.0-fast-generate-001';
    // Using raw REST API as SDK support for Imagen can be version specific
    const url = `https://generativelanguage.googleapis.com/v1beta/${model}:predict?key=${key}`;

    const prompt = "A delicious cheesy pepperoni pizza on a wooden table, professional food photography, 4k";

    console.log(`Testing Image Gen with ${model}...`);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                instances: [
                    { prompt: prompt }
                ],
                parameters: {
                    sampleCount: 1,
                    aspectRatio: "1:1"
                }
            })
        });

        if (!response.ok) {
            console.error('Error Status:', response.status);
            console.error(await response.text());
            return;
        }

        const data = await response.json();
        const predictions = data.predictions;

        if (predictions && predictions[0]) {
            // Usually returns bytesBase64Encoded or similar
            const b64 = predictions[0].bytesBase64Encoded;
            if (b64) {
                const buffer = Buffer.from(b64, 'base64');
                fs.writeFileSync('test_pizza.png', buffer);
                console.log('✅ Image saved to test_pizza.png');
            } else {
                console.log('No base64 in response:', JSON.stringify(predictions[0]).substring(0, 200));
            }
        } else {
            console.log('No predictions:', JSON.stringify(data));
        }

    } catch (e) {
        console.error('Fetch error:', e);
    }
}

testImageGen();
