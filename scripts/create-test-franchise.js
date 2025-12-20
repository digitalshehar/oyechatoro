import { Pool } from '@neondatabase/serverless';
import ws from 'ws';
import bcrypt from 'bcryptjs';

// Polyfill for Neon
if (!globalThis.WebSocket) globalThis.WebSocket = ws;

if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL not found");
    process.exit(1);
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function main() {
    console.log("🍔 Creating Test Franchise...");
    const client = await pool.connect();

    try {
        // 1. Create Test Store
        const storeUuid = crypto.randomUUID();
        const managerUuid = crypto.randomUUID();
        const hashedPassword = await bcrypt.hash('password123', 10);

        const insertStore = `
            INSERT INTO "Store" (id, name, code, address, phone, active, "createdAt", "updatedAt")
            VALUES ($1, 'Oye Chatoro - Bandra West', 'BANDRA01', 'Hill Road, Bandra', '9988776655', true, NOW(), NOW())
            RETURNING id;
        `;

        await client.query(insertStore, [storeUuid]);
        console.log(`✅ Created Store: Oye Chatoro - Bandra West (${storeUuid})`);

        // 2. Create Test Manager
        const insertStaff = `
            INSERT INTO "Staff" (id, name, email, phone, role, password, active, "storeId", "createdAt", "updatedAt")
            VALUES ($1, 'Bandra Manager', 'bandra@oyechatoro.com', '9988776655', 'Manager', $2, true, $3, NOW(), NOW())
            RETURNING id;
        `;

        await client.query(insertStaff, [managerUuid, hashedPassword, storeUuid]);
        console.log(`👤 Created User: bandra@oyechatoro.com / password123`);

    } catch (err) {
        console.error("❌ Failed:", err);
    } finally {
        client.release();
        await pool.end();
    }
}

main();
