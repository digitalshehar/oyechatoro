import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';

// Prisma Client singleton for Next.js
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

// Lazy initialization function
function createPrismaClient(): PrismaClient {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
        throw new Error('DATABASE_URL environment variable is not set');
    }

    // Only configure WebSocket in Node.js environment (not edge/browser)
    if (typeof window === 'undefined') {
        // Dynamic import ws only on server
        try {
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            const ws = require('ws');
            neonConfig.webSocketConstructor = ws;
        } catch {
            // In edge runtime, ws is not available - use fetch instead
            neonConfig.poolQueryViaFetch = true;
        }
    }

    const adapter = new PrismaNeon({ connectionString });
    return new PrismaClient({ adapter });
}

// Get or create Prisma client
export function getPrisma(): PrismaClient {
    if (!globalForPrisma.prisma) {
        globalForPrisma.prisma = createPrismaClient();
    }
    return globalForPrisma.prisma;
}

// Export a getter that lazily creates the client
export const prisma = new Proxy({} as PrismaClient, {
    get(_target, prop) {
        return getPrisma()[prop as keyof PrismaClient];
    },
});

export default prisma;

