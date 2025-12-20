/**
 * SEO Utilities for Oye Chatoro
 * Handles PageSpeed fetches, WhatsApp link generation, and API validations.
 */

export const generateWhatsAppReviewLink = (phone: string, reviewLink: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    const message = encodeURIComponent(`Namaste! Oye Chatoro me aapka experience kaisa raha? Humne suna aapko food pasand aaya! Please humein Google par 5-star review dein aur support karein: ${reviewLink} 🙏🍕`);
    return `https://wa.me/${cleanPhone}?text=${message}`;
};

export const fetchPageSpeedData = async (url: string, apiKey: string) => {
    if (!apiKey) return null;
    try {
        const strategy = 'mobile';
        const response = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${apiKey}&strategy=${strategy}`);
        if (!response.ok) throw new Error('PageSpeed API request failed');
        const data = await response.json();

        const audit = data.lighthouseResult.audits;
        return {
            lcp: audit['largest-contentful-paint'].displayValue,
            fid: audit['max-potential-fid']?.displayValue || 'N/A',
            cls: audit['cumulative-layout-shift'].displayValue,
            ttfb: audit['server-response-time'].displayValue,
            score: (data.lighthouseResult.categories.performance.score * 100).toFixed(0)
        };
    } catch (error) {
        console.error('PageSpeed Fetch Error:', error);
        return null;
    }
};

import { GoogleGenerativeAI } from '@google/generative-ai';

export const getGeminiSeoCopy = async (prompt: string, apiKey: string) => {
    if (!apiKey) return null;

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const fullPrompt = `You are the expert social media manager for "Oye Chatoro", a popular fast-food brand in Abu Road, India. 
        Brand Voice: Energetic, fun, Hinglish (Hindi + English), appetizing, and engaging.
        Task: ${prompt}
        Output: Just the content requested, no explanations.`;

        let attempts = 0;
        while (attempts < 3) {
            try {
                const result = await model.generateContent(fullPrompt);
                const response = await result.response;
                return response.text().trim();
            } catch (err: any) {
                if (err.message.includes('503') || err.message.includes('429')) {
                    attempts++;
                    console.log(`Gemini Busy/RateLimit (Attempt ${attempts}/3). Retrying in 5s...`);
                    await new Promise(r => setTimeout(r, 5000 * attempts));
                    continue;
                }
                throw err;
            }
        }
        throw new Error('Max retries reached for Gemini API');

    } catch (error: any) {
        console.error('Gemini Generation Error:', error);
        return `ERROR: ${error.message}`;
    }
};

export const generateBlogPostContent = async (topic: string, apiKey: string) => {
    if (!apiKey) return null;

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `You are a professional food blogger and SEO expert writing for "Oye Chatoro", the best fast-food joint in Abu Road.
        Brand Voice: Friendly, slightly desi (Hinglish where appropriate), helpful, and very appetizing.
        
        Task: Write a complete blog post about "${topic}".
        
        The response MUST be a JSON object with the following structure:
        {
            "title": "Catchy SEO Title",
            "excerpt": "A short 2-line summary for the blog listing page",
            "content": "Full markdown content with H1, H2, H3 tags, bold text, and lists. Make it at least 500-700 words. Include a 'Call to Action' at the end to visit Oye Chatoro.",
            "seoMetadata": {
                "title": "Meta Title (max 60 chars)",
                "description": "Meta description (max 160 chars)"
            }
        }
        
        Output: ONLY the JSON object. No other text.`;

        let attempts = 0;
        while (attempts < 3) {
            try {
                const result = await model.generateContent(prompt);
                const response = await result.response;
                const text = response.text().trim();

                // Try to parse JSON
                const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
                return JSON.parse(cleanJson);
            } catch (err: any) {
                if (err.message.includes('503') || err.message.includes('429')) {
                    attempts++;
                    console.log(`Gemini Busy/RateLimit (Attempt ${attempts}/3). Retrying...`);
                    await new Promise(r => setTimeout(r, 5000 * attempts));
                    continue;
                }
                throw err;
            }
        }
        throw new Error('Max retries reached for Gemini Blog Generation');
    } catch (error: any) {
        console.error('Gemini Blog Error:', error);
        return { error: error.message };
    }
};

export const generateReviewResponse = async (reviewText: string, rating: number, apiKey: string) => {
    if (!apiKey) return null;

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `You are the manager of "Oye Chatoro", a popular fast-food restaurant in Abu Road.
        Brand Voice: Warm, appreciative (for good reviews), professional yet humble (for bad reviews), and personalized.
        
        Customer Review: "${reviewText}"
        Rating: ${rating}/5 stars.
        
        Task: Write a concise, polite, and personalized reply to this review in Hinglish (mix of Hindi and English).
        - If rating is 4-5: Thank them, mention their specific comment if any, and invite them back.
        - If rating is 1-3: Apologize sincerely, mention you take feedback seriously, and ask them to share more details so you can improve.
        
        Output: Just the response text, no explanations.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text().trim();
    } catch (error: any) {
        console.error('Gemini Review Response Error:', error);
        return `Namaste! Thank you for your feedback. We appreciate you choosing Oye Chatoro! 🙏`;
    }
};

export const analyzeReviewSentiment = async (reviews: string[], apiKey: string) => {
    if (!apiKey || !reviews.length) return null;

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `You are a business consultant for "Oye Chatoro" (Fast Food Restaurant, Abu Road).
        Analyze the following customer reviews and provide a strategic summary.
        
        Reviews:
        ${reviews.map((r, i) => `${i + 1}. ${r}`).join('\n')}
        
        Output: JSON object with the following keys:
        - "overallSentiment": A short string like "Very Positive (90%)"
        - "topPros": Array of top 3 mentioned strengths
        - "topCons": Array of top 2-3 areas for improvement
        - "growthTips": Array of 3 specific, actionable business growth suggestions based on these reviews.
        - "score": A numeric overall rating out of 100.
        
        Output: ONLY the JSON object.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().trim();
        const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleanJson);
    } catch (error: any) {
        console.error('Gemini Sentiment Analysis Error:', error);
        return {
            overallSentiment: 'Analysis Failed',
            topPros: [],
            topCons: [],
            growthTips: ['Ensure Gemini API is correctly configured.'],
            score: 0
        };
    }
};

export async function analyzeBusinessPerformance(data: any, apiKey: string) {
    if (!apiKey) return [{ title: "Config Error", insight: "API Key missing", action: "Contact Admin", priority: "High" }];
    const prompt = `
    Analyze this restaurant business data and provide 3-5 high-impact, actionable insights.
    Focus on trends, menu engineering (Stars/Dogs), and peak hour optimization.
    Return ONLY a JSON array of objects: [{ title: string, insight: string, action: string, priority: 'High' | 'Medium' | 'Low' }]

    Data:
    - Summary: ${JSON.stringify(data.summary)}
    - Top Items: ${JSON.stringify(data.topItems)}
    - Menu Engineering: Stars: ${data.menuEngineering?.stars?.length}, Dogs: ${data.menuEngineering?.dogs?.length}
    - Revenue Trend: ${JSON.stringify(data.revenueTrend?.slice(-7))}
    `;

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean markdown if present
        const cleaned = text.replace(/```json|```/g, '').trim();
        return JSON.parse(cleaned);
    } catch (err) {
        console.error("AI Analytics Error:", err);
        return [{ title: "Analysis Offline", insight: "AI services are currently unavailable.", action: "Check API keys.", priority: "Low" }];
    }
}

export async function getInventoryPredictions(inventory: any[], orders: any[], apiKey: string) {
    if (!apiKey) return null;

    const prompt = `
    Analyze this restaurant inventory and recent order data.
    1. For each item, estimate "Days of Stock Left" based on current quantity vs depletion in the last ${orders.length} orders.
    2. Identify critical shortages.
    3. Return a JSON array of objects: [{ name: string, status: string, daysLeft: number, suggestedOrder: string }]

    Data:
    - Inventory: ${JSON.stringify(inventory.map(i => ({ name: i.name, qty: i.quantity, unit: i.unit, min: i.minLevel })))}
    - Recent Orders (Items Sold): ${JSON.stringify(orders.flatMap(o => o.items).map((i: any) => i.name))}
    `;

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const cleaned = text.replace(/```json|```/g, '').trim();
        return JSON.parse(cleaned);
    } catch (err) {
        console.error("AI Inventory Prediction Error:", err);
        return inventory.map(i => ({ name: i.name, status: "Unknown", daysLeft: 7, suggestedOrder: "Manual Check" }));
    }
}

export async function analyzeWastage(logs: any[], apiKey: string) {
    if (!apiKey) return null;

    const prompt = `
    Analyze these restaurant wastage logs and find 3-5 critical patterns.
    Look for specific items wasted repeatedly, common reasons, and total estimated loss.
    Return a JSON array of objects: [{ title: string, finding: string, recommendation: string, impact: 'High' | 'Medium' | 'Low' }]

    Logs: ${JSON.stringify(logs)}
    `;

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const cleaned = text.replace(/```json|```/g, '').trim();
        return JSON.parse(cleaned);
    } catch (err) {
        console.error("AI Wastage Error:", err);
        return [{ title: "Wastage Offline", finding: "Analysis failed.", recommendation: "Check logs.", impact: "Low" }];
    }
}

export async function analyzeCustomerSegments(customers: any[], apiKey: string) {
    if (!apiKey) return null;

    const prompt = `
    Analyze this list of customers and segment them into groups: "VIP", "Loyal", "Churn Risk", "New", and "Hibernating".
    Base it on:
    - VIP: High totalSpent (>2000) and high totalOrders.
    - Loyal: Frequent orders but moderate spending.
    - Churn Risk: High totalSpent/Orders but no visit in >30 days.
    - New: Recent visit but low totalOrders.
    - Hibernating: Low frequency and no visit in >60 days.

    Return a JSON object where keys are customer IDs and values are strings (the segment name).

    Data: ${JSON.stringify(customers.map(c => ({ id: c.id, orders: c.totalOrders, spent: c.totalSpent, lastVisit: c.lastVisit })))}
    `;

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const cleaned = text.replace(/```json|```/g, '').trim();
        return JSON.parse(cleaned);
    } catch (err) {
        console.error("AI CRM Analysis Error:", err);
        return {};
    }
}

export async function generatePersonalizedOffer(customer: any, menu: any[], apiKey: string) {
    if (!apiKey) return null;

    const prompt = `
    Generate a personalized WhatsApp marketing message for this customer.
    Customer: ${customer.name}, Segment: ${customer.segment}, Last Item: ${customer.lastItem}
    Menu: ${JSON.stringify(menu.map(m => m.name))}

    1. Recommend a dish they'll like (if they order X often, suggest Y or a variation).
    2. Write in a friendly, "street-food style" tone.
    3. Include a call to action.
    4. Format for WhatsApp (use *bold* and 🍕 icons).
    
    Return JSON: { dish: string, message: string }
    `;

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const cleaned = text.replace(/```json|```/g, '').trim();
        return JSON.parse(cleaned);
    } catch (err) {
        console.error("AI Personalization Error:", err);
        return { dish: "Chef's Special", message: "Hey! We miss you at Oye Chatoro. Come try our Chef's Special today! 🍟" };
    }
}

export async function getDynamicPricingSuggestions(menuItems: any[], orders: any[], apiKey: string) {
    if (!apiKey) return null;

    const currentHour = new Date().getHours();
    const ordersInLastHour = orders.filter(o => {
        const diff = Date.now() - new Date(o.createdAt).getTime();
        return diff < 60 * 60 * 1000;
    }).length;

    const prompt = `
    Analyze these restaurant menu items and recent order volume.
    Context:
    - Current Time: ${currentHour}:00
    - Orders in last hour: ${ordersInLastHour}
    - Kitchen Capacity Threshold: 10 orders/hour (Surge triggers above this)
    - Off-Peak: 14:00 - 17:00 (Happy Hour triggers)

    Strategy:
    1. If Surge: Recommend +10-15% on high-complexity items (Pizza, Pasta).
    2. If Off-Peak: Recommend -20% on appetizers/drinks to drive traffic.
    3. If Low Margin: Flag items where price < 2.5x costPrice and suggest increase.
    
    Return a JSON array: [{ id: string, name: string, currentPrice: number, suggestedPrice: number, reason: string, strategy: 'Surge' | 'HappyHour' | 'Margin' | 'Normal' }]

    Data: ${JSON.stringify(menuItems.map(m => ({ id: m.id, name: m.name, price: m.price, cost: m.costPrice, category: m.category?.name })))}
    `;

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const cleaned = text.replace(/```json|```/g, '').trim();
        return JSON.parse(cleaned);
    } catch (err) {
        console.error("AI Pricing Error:", err);
        return [];
    }
}

export async function translateContent(content: { name: string, description?: string }, targetLang: string, apiKey: string) {
    if (!apiKey) return null;

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

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const cleaned = text.replace(/```json|```/g, '').trim();
        return JSON.parse(cleaned);
    } catch (err) {
        console.error("AI Translation Error:", err);
        return null;
    }
}

export async function detectAllergens(note: string, apiKey: string) {
    if (!apiKey || !note) return null;

    const prompt = `
    Analyze this restaurant order note for allergies or special dietary restrictions.
    Note: "${note}"
    
    Rules:
    1. Identify specific allergies (Nuts, Dairy, Gluten, Soy, etc.).
    2. Identify dietary requirements (Jain, Vegan, Swaminarayan).
    3. Determine severity: "High" (Life-threatening allergy), "Medium" (Preference/Intolerance), "Low" (General request).
    4. Return ONLY a JSON object.
    
    Examples:
    - "No onion no garlic please" -> { "detected": true, "allergies": [], "dietary": ["Jain/No Onion Garlic"], "severity": "Medium", "summary": "No Onion-Garlic requested." }
    - "I am highly allergic to peanuts" -> { "detected": true, "allergies": ["Peanuts"], "dietary": [], "severity": "High", "summary": "SEVERE PEANUT ALLERGY" }
    
    Result:
    `;
    let attempts = 0;
    while (attempts < 3) {
        try {
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }, { apiVersion: 'v1' });

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            const cleaned = text.replace(/```json|```/g, '').trim();
            return JSON.parse(cleaned);
        } catch (err: any) {
            attempts++;
            console.error(`AI Allergen Attempt ${attempts} failed:`, err.message);
            if (attempts >= 3) {
                return { detected: false, allergies: [], dietary: [], severity: "Low", summary: "AI Error: " + err.message };
            }
            await new Promise(r => setTimeout(r, 2000 * attempts));
        }
    }
}

export async function getPrepForecasting(items: any[], orders: any[], apiKey: string) {
    if (!apiKey) return [];

    const prompt = `
    Based on the following last 100 orders and current menu items, suggest a Prep List (Mise-en-place) for the upcoming shift.
    
    Orders Data: ${JSON.stringify(orders.slice(0, 50))}
    
    Rules:
    1. Group by Ingredient/Task.
    2. Provide quantity estimates (e.g., "5kg", "2 Liters").
    3. Include a "Reason" based on order frequency.
    4. MUST include a "station" field (e.g., "Pizza", "Chaat", "Tandoor", "Chinese", "Main Course") based on the dishes likely to use that ingredient.
    5. Return only a JSON array of objects: [ { "task": "string", "qty": "string", "urgency": "High" | "Medium", "reason": "string", "station": "string" } ]
    `;

    let attempts = 0;
    while (attempts < 3) {
        try {
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            const cleaned = text.replace(/```json|```/g, '').trim();
            const suggestions = JSON.parse(cleaned);
            return suggestions;
        } catch (err: any) {
            attempts++;
            console.error(`AI Prep Attempt ${attempts} failed:`, err.message);
            if (attempts >= 3) return [];
            await new Promise(r => setTimeout(r, 2000 * attempts));
        }
    }
}
