
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Basic .env loading attempt
import { config } from 'dotenv';
config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

neonConfig.webSocketConstructor = ws;
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    console.warn("DATABASE_URL not found in environment. Please ensure it is set.");
    // We will attempt to run, but it might fail.
}

const adapter = new PrismaNeon({ connectionString: connectionString! });
const prisma = new PrismaClient({ adapter });

async function parseMarkdown(content: string) {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
    const match = content.match(frontmatterRegex);

    if (!match) return { attributes: {} as Record<string, string>, body: content };

    const frontmatterBlock = match[1];
    const body = content.replace(frontmatterRegex, '').trim();

    const attributes: Record<string, string> = {};
    const lines = frontmatterBlock.split('\n');
    for (const line of lines) {
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
    }

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

            await prisma.blogPost.upsert({
                where: { slug },
                update: {
                    title: attributes.title || slug,
                    content: body,
                    excerpt: attributes.excerpt,
                    // image: attributes.image,
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
