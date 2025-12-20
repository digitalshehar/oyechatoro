
import 'dotenv/config';

console.log('--- Auth.js Environment Check ---');

const authSecret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;
if (authSecret) {
    console.log('✅ AUTH_SECRET: Found (Length: ' + authSecret.length + ')');
    if (authSecret.length < 32) {
        console.warn('⚠️ WARNING: AUTH_SECRET is short. Recommended 32+ chars.');
    }
} else {
    console.error('❌ AUTH_SECRET: Missing! (Required for Auth.js v5)');
}

const authUrl = process.env.AUTH_URL || process.env.NEXTAUTH_URL;
if (authUrl) {
    console.log('✅ AUTH_URL: ' + authUrl);
    try {
        new URL(authUrl);
    } catch (e) {
        console.error('❌ AUTH_URL: Invalid URL format!');
    }
} else {
    console.log('ℹ️ AUTH_URL: Not set (Auth.js will attempt to use request origin)');
}

console.log('---------------------------------');
console.log('Next Steps: If AUTH_SECRET is missing, add it to your .env file.');
console.log('If you are using Turbopack, ensure variables are prefixed with NEXT_PUBLIC_ if accessed on client,');
console.log('though Auth.js usually handles this server-side.');
