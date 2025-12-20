import { google } from 'googleapis';

export async function getGoogleAuthClient(credentials: { clientEmail: string; privateKey: string }, scopes: string[]) {
    if (!credentials.clientEmail || !credentials.privateKey) {
        throw new Error('Missing Google Service Account credentials');
    }

    // Handle potential formatting issues with private key (newlines)
    const formattedPrivateKey = credentials.privateKey.replace(/\\n/g, '\n');

    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: credentials.clientEmail,
            private_key: formattedPrivateKey,
        },
        scopes: scopes
    });

    return auth.getClient() as any;
}
