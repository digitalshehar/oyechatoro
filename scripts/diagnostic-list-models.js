import 'dotenv/config';

const apiKey = process.env.GEMINI_API_KEY;

async function listModels() {
    console.log("Fetching available models from Google API...");
    const url = `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            console.log("Models found:");
            data.models.forEach(m => {
                console.log(`- ${m.name} (${m.displayName}) - Supported: ${m.supportedGenerationMethods}`);
            });
        } else {
            console.error("Error Listing Models:", JSON.stringify(data, null, 2));
        }
    } catch (err) {
        console.error("List Models failed:", err);
    }
}

listModels();
