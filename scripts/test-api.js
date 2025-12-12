import http from 'http';

const data = JSON.stringify({
    slug: 'ultimate-guide-abu-road-food',
    user: 'AICheck',
    text: 'Live verification test',
    rating: 5
});

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/blog/comments',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    res.setEncoding('utf8');
    let responseBody = '';
    res.on('data', (chunk) => {
        responseBody += chunk;
    });
    res.on('end', () => {
        console.log('BODY:', responseBody);
    });
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

req.write(data);
req.end();
