
import { config } from 'dotenv';
config();
console.log("DB URL:", process.env.DATABASE_URL ? "Loaded" : "MISSING");

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
});

async function checkUsers() {
    console.log("🔍 Checking Users...");

    // Check Staff/Admin
    const staff = await prisma.staff.findMany();
    console.log("\n--- STAFF MEMBERS ---");
    staff.forEach(s => {
        console.log(`Name: ${s.name}, Email: ${s.email}, Role: ${s.role}, Active: ${s.active}`);
    });

    if (staff.length === 0) console.log("❌ No Staff found!");

    await prisma.$disconnect();
}

checkUsers().catch(console.error);
