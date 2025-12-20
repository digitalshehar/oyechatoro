// Using global fetch (Node 18+)
async function testAllergyAI() {
    const note = "I am highly allergic to peanuts. Even a trace amount of nuts can be dangerous. Please ensure the kitchen is clean.";

    console.log("Testing AI Safety Detection for note:", note);

    try {
        const res = await fetch('http://localhost:3000/api/kitchen/safety', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ note })
        });

        if (res.ok) {
            const data = await res.json();
            console.log("\n✅ AI Safety Analysis Result:");
            console.log(JSON.stringify(data, null, 2));
        } else {
            console.error("❌ API Error:", res.status, await res.text());
        }
    } catch (err) {
        console.error("❌ Fetch Error:", err);
    }
}

testAllergyAI();
