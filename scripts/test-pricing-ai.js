const fetch = require('node-fetch');

async function testPricing() {
    console.log('--- Testing AI Pricing Suggestions ---');
    try {
        const res = await fetch('http://localhost:3000/api/seo/ai/pricing', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'suggest' })
        });
        const data = await res.json();
        console.log('Suggestions:', JSON.stringify(data.suggestions, null, 2));
    } catch (err) {
        console.error('Test Failed:', err);
    }
}

testPricing();
