import 'dotenv/config';

const apiKey = process.env.GEMINI_API_KEY;

async function testFetch() {
    console.log("Testing direct fetch to Gemini API...");
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: "Translate 'Hello' to Hindi" }] }]
            })
        });

        const data = await response.json();
        console.log("Response Status:", response.status);
        if (response.ok) {
            console.log("Success:", JSON.stringify(data, null, 2));
        } else {
            console.error("Error Response:", JSON.stringify(data, null, 2));
        }
    } catch (err) {
        console.error("Fetch failed:", err);
    }
}

testFetch();
