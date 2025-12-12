
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';
import 'dotenv/config';

// Configure WebSocket for Node.js environment
neonConfig.webSocketConstructor = ws;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    console.error('Error: DATABASE_URL environment variable is missing.');
    process.exit(1);
}

// Setup Neon Adapter
const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

const FALLBACK_REVIEWS = [
    {
        name: "Rahul Sharma",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 5,
        comment: "The Dahi Papdi Chaat is absolutely amazing! Best street food experience in Abu Road. The hygiene is top-notch.",
        date: "2024-02-15" // String to Date conversion needed
    },
    {
        name: "Priya Patel",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 5,
        comment: "Lovely ambiance and great food. The White Sauce Pasta was authentic and creamy. Highly recommended for families!",
        date: "2024-02-10"
    },
    {
        name: "Amit Verma",
        avatar: "https://randomuser.me/api/portraits/men/86.jpg",
        rating: 4,
        comment: "Great variety of options. The Tandoori Pizza is a must-try. Service is quick and staff is very polite.",
        date: "2024-02-05"
    }
];

async function main() {
    console.log('Start seeding reviews...');

    // Cleanup existing reviews if you want a clean slate, or just append
    // await prisma.review.deleteMany({}); 

    for (const review of FALLBACK_REVIEWS) {
        await prisma.review.create({
            data: {
                name: review.name,
                avatar: review.avatar,
                rating: review.rating,
                comment: review.comment,
                date: new Date(review.date),
                status: 'Approved'
            }
        });
        console.log(`Created review for: ${review.name}`);
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error('Seeding error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
