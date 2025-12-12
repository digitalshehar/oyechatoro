import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

neonConfig.webSocketConstructor = ws;
const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

async function parseMarkdown(content) {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
    const match = content.match(frontmatterRegex);

    if (!match) return { attributes: {}, body: content };

    const frontmatterBlock = match[1];
    const body = content.replace(frontmatterRegex, '').trim();

    const attributes = {};
    frontmatterBlock.split('\n').forEach(line => {
        const parts = line.split(':');
        if (parts.length >= 2) {
            const key = parts[0].trim();
            let value = parts.slice(1).join(':').trim();
            // Remove quotes if present
            if (value.startsWith('"') && value.endsWith('"')) {
                value = value.slice(1, -1);
            }
            attributes[key] = value;
        }
    });

    return { attributes, body };
}

async function main() {
    const contentDir = path.join(__dirname, '../app/content');

    console.log(`Scanning content from: ${contentDir}`);

    try {
        const files = await fs.readdir(contentDir);

        for (const file of files) {
            if (!file.endsWith('.md')) continue;

            const filePath = path.join(contentDir, file);
            const rawContent = await fs.readFile(filePath, 'utf-8');
            const { attributes, body } = await parseMarkdown(rawContent);

            const slug = file.replace('.md', '');

            console.log(`Processing: ${attributes.title || slug}`);

            const categoryName = "Food Guide";
            const categorySlug = "food-guide";

            // Note: In a real script we might generate slug from title if missing
            await prisma.blogPost.upsert({
                where: { slug },
                update: {
                    title: attributes.title || slug,
                    content: body,
                    excerpt: attributes.excerpt,
                    // image: attributes.image, // removed as it might be missing
                    author: attributes.author || 'Admin',
                    readingTime: '10 min read', // Placeholder logic 
                    status: 'Published',
                    category: {
                        connectOrCreate: {
                            where: { name: categoryName },
                            create: { name: categoryName, slug: categorySlug }
                        }
                    },
                    tags: {
                        connectOrCreate: {
                            where: { name: 'Abu Road' },
                            create: { name: 'Abu Road', slug: 'abu-road' }
                        }
                    }
                },
                create: {
                    slug,
                    title: attributes.title || slug,
                    content: body,
                    excerpt: attributes.excerpt,
                    author: attributes.author || 'Admin',
                    readingTime: '10 min read',
                    status: 'Published',
                    category: {
                        connectOrCreate: {
                            where: { name: categoryName },
                            create: { name: categoryName, slug: categorySlug }
                        }
                    },
                    tags: {
                        connectOrCreate: {
                            where: { name: 'Abu Road' },
                            create: { name: 'Abu Road', slug: 'abu-road' }
                        }
                    }
                }
            });
            console.log(`Saved: ${slug}`);
        }
        console.log('Seeding complete.');
    } catch (e) {
        console.error('Seeding failed:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
