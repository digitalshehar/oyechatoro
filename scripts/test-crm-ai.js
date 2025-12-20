const fetch = require('node-fetch');

async function testCRM() {
    const mockCustomers = [
        { id: '1', name: 'Akshay', totalOrders: 15, totalSpent: 3500, lastVisit: new Date().toISOString() },
        { id: '2', name: 'John', totalOrders: 2, totalSpent: 400, lastVisit: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString() },
        { id: '3', name: 'Sara', totalOrders: 8, totalSpent: 1200, lastVisit: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() }
    ];

    try {
        console.log('--- Testing AI Segmentation ---');
        const segRes = await fetch('http://localhost:3000/api/seo/ai/customers/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ customers: mockCustomers })
        });
        const segData = await segRes.json();
        console.log('Segments:', JSON.stringify(segData, null, 2));

        console.log('\n--- Testing AI Personalized Offer ---');
        const offerRes = await fetch('http://localhost:3000/api/seo/ai/customers/offer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                customerData: {
                    name: 'Akshay',
                    segment: 'VIP',
                    lastItem: 'Paneer Tikka'
                }
            })
        });
        const offerData = await offerRes.json();
        console.log('Offer:', JSON.stringify(offerData, null, 2));

    } catch (err) {
        console.error('Test Failed:', err);
    }
}

testCRM();
