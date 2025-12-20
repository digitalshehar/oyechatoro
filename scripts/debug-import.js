
import { prisma } from '../app/lib/db.js';

async function test() {
    console.log('Testing Prisma Import...');
    try {
        console.log('Prisma instance type:', typeof prisma);
        if (prisma === null) {
            console.log('Prisma is NULL!');
        } else {
            const count = await prisma.review.count();
            console.log('Review count:', count);
        }
    } catch (e) {
        console.error('Import/Usage Error:', e);
    }
}

test();
