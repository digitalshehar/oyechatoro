import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

// Force WebSocket constructor for Neon (serverless driver)
if (typeof window === 'undefined') {
    neonConfig.webSocketConstructor = ws;
}

const prismaClientSingleton = () => {
    const connectionString = process.env.DATABASE_URL;
    console.log("Initializing New Prisma Client. DB_URL present:", !!connectionString);

    if (!connectionString) {
        console.warn("WARNING: DATABASE_URL is not defined. Prisma might fail.");
    }

    return new PrismaClient({
        adapter: new PrismaNeon({ connectionString: connectionString || "" })
    });
};

declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;

export { prisma };
export default prisma;
