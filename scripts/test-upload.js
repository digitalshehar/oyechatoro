import fs from 'fs';
import path from 'path';

async function testUpload() {
    const filePath = path.join(process.cwd(), 'public/favicon.ico'); // Use an existing small file
    const stats = fs.statSync(filePath);
    const fileContent = fs.readFileSync(filePath);

    // Create a mock File object or just use FormData with blob
    const formData = new FormData();
    const blob = new Blob([fileContent], { type: 'image/x-icon' });
    formData.append('file', blob, 'test-icon.ico');
    formData.append('type', 'test');

    try {
        console.log('Testing upload to http://localhost:3000/api/upload...');
        const res = await fetch('http://localhost:3000/api/upload', {
            method: 'POST',
            body: formData,
        });

        const data = await res.json();
        console.log('Response:', data);

        if (data.success && data.url) {
            console.log('✅ Upload successful!');
            console.log('Verification URL:', `http://localhost:3000${data.url}`);

            // Cleanup: remove the test directory if it was created
            const createdPath = path.join(process.cwd(), 'public', data.url);
            if (fs.existsSync(createdPath)) {
                console.log('✅ File exists on disk at:', createdPath);
            }
        } else {
            console.error('❌ Upload failed:', data);
        }
    } catch (err) {
        console.error('❌ Network error:', err);
    }
}

testUpload();
