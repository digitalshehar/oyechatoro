const fetchData = async () => {
    const mockData = {
        summary: { totalRevenue: 10000, totalOrders: 50, avgOrderValue: 200 },
        topItems: [{ name: 'Vada Pav', sales: 30, revenue: 3000 }],
        menuEngineering: { stars: [1, 2], dogs: [5] },
        revenueTrend: [{ date: '1 Dec', amount: 1000 }, { date: '2 Dec', amount: 1200 }]
    };

    try {
        const response = await fetch('http://localhost:3000/api/seo/ai/analytics', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: mockData })
        });
        const result = await response.json();
        console.log('AI Insights Result:', JSON.stringify(result, null, 2));
    } catch (error) {
        console.error('Test Failed:', error);
    }
};

fetchData();
