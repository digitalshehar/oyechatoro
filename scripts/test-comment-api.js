
async function main() {
    console.log('Testing Comment API...');
    const url = 'http://localhost:3000/api/blog/comments';

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                slug: 'ultimate-guide-indian-spices',
                user: 'API Test User',
                text: 'Testing via API script with valid slug',
                rating: 5
            })
        });

        if (res.ok) {
            const data = await res.json();
            console.log('API Success:', data);
        } else {
            console.error('API Error:', res.status, res.statusText);
            const text = await res.text();
            console.error('Response:', text);
        }
    } catch (e) {
        console.error('Network Error:', e.message);
        console.log('Ensure the Next.js server is running on localhost:3000');
    }
}

main();
