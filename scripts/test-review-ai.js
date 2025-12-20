
const REVIEW_TESTS = [
    { text: "Best pizza in Abu Road! Loved the crust and the service was super fast.", rating: 5 },
    { text: "Burger was okay, but it took 40 minutes to arrive. Needs improvement in speed.", rating: 3 }
];

const BATCH_REVIEWS = [
    "Amazing food and vibe!",
    "Best coffee on the way to Mount Abu.",
    "Service is slow on weekends.",
    "Paneer pizza is a must try.",
    "No proper parking space near the shop.",
    "Very friendly staff and clean environment."
];

async function testReviewAI() {
    console.log('🚀 Testing AI Review Automation...\n');

    // 1. Test Single Review Response
    console.log('--- 1. Testing Review Response ---');
    for (const test of REVIEW_TESTS) {
        console.log(`Rating: ${test.rating} | Review: "${test.text}"`);
        try {
            const res = await fetch('http://localhost:3000/api/seo/ai/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reviewText: test.text, rating: test.rating })
            });
            if (!res.ok) {
                const errData = await res.json();
                console.error(`API Error:`, errData);
            } else {
                const data = await res.json();
                console.log(`AI Response: ${data.response}\n`);
            }
        } catch (e) {
            console.error('Response Error:', e.message);
        }
    }

    // 2. Test Sentiment Analysis
    console.log('--- 2. Testing Sentiment Analysis ---');
    try {
        const res = await fetch('http://localhost:3000/api/seo/ai/sentiment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reviews: BATCH_REVIEWS })
        });
        if (!res.ok) {
            const errData = await res.json();
            console.error(`API Error:`, errData);
        } else {
            const data = await res.json();
            console.log('Sentiment Analysis Result:');
            console.log(JSON.stringify(data, null, 2));
        }
    } catch (e) {
        console.error('Sentiment Error:', e.message);
    }
}

testReviewAI();
