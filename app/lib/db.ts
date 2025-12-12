import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

// Force WebSocket constructor for Neon (serverless driver)
neonConfig.webSocketConstructor = ws;

const connectionString = process.env.DATABASE_URL;

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

console.log("Initializing Prisma Client. DB_URL present:", !!connectionString);
const prisma = globalForPrisma.prisma ?? new PrismaClient({
    adapter: new PrismaNeon({ connectionString: connectionString! })
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export { prisma };
export default prisma;
