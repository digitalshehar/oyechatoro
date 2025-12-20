const fetch = require('node-fetch');

async function testInventoryAI() {
    const mockInventory = [
        { id: 1, name: 'Potato', quantity: 50, unit: 'kg', minLevel: 20 },
        { id: 2, name: 'Paneer', quantity: 5, unit: 'kg', minLevel: 10 },
        { id: 3, name: 'Burger Buns', quantity: 12, unit: 'pcs', minLevel: 24 }
    ];

    try {
        console.log('Testing AI Inventory Prediction API...');
        const res = await fetch('http://localhost:3000/api/seo/ai/inventory/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ inventory: mockInventory })
        });
        const data = await res.json();
        console.log('AI Response:', JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Test Failed:', err);
    }
}

testInventoryAI();
