
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';

neonConfig.webSocketConstructor = ws;
const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

const CONTENT_DIR = path.join(process.cwd(), 'app/content');

function parseFrontmatter(content) {
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (!match) return { attributes: {}, body: content };

    const frontmatterRaw = match[1];
    const body = match[2];
    const attributes = {};

    frontmatterRaw.split('\n').forEach(line => {
        const parts = line.split(':');
        if (parts.length >= 2) {
            const key = parts[0].trim();
            let value = parts.slice(1).join(':').trim();
            // Remove wrapping quotes if present
            if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
            }
            attributes[key] = value;
        }
    });

    return { attributes, body };
}

async function main() {
    console.log('Starting migration of markdown posts...');

    // Ensure Categories exist
    const categoryName = 'Food Guide';
    const categorySlug = 'food-guide';

    let category = await prisma.blogCategory.findUnique({ where: { slug: categorySlug } });
    if (!category) {
        console.log(`Creating category: ${categoryName}`);
        category = await prisma.blogCategory.create({
            data: { name: categoryName, slug: categorySlug }
        });
    }

    const files = fs.readdirSync(CONTENT_DIR);

    for (const file of files) {
        if (!file.endsWith('.md')) continue;

        const filePath = path.join(CONTENT_DIR, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { attributes, body } = parseFrontmatter(fileContent);

        const slug = file.replace('.md', '');

        console.log(`Migrating: ${slug}`);

        try {
            await prisma.blogPost.upsert({
                where: { slug: slug },
                update: {
                    title: attributes.title || 'Untitled',
                    content: body,
                    excerpt: attributes.excerpt || '',
                    author: attributes.author || 'Oye Chatoro',
                    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1000', // Placeholder or from frontmatter if available
                    category: categoryName,
                    status: 'Published',
                    createdAt: new Date(attributes.date || Date.now())
                },
                create: {
                    slug: slug,
                    title: attributes.title || 'Untitled',
                    content: body,
                    excerpt: attributes.excerpt || '',
                    author: attributes.author || 'Oye Chatoro',
                    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1000',
                    category: categoryName,
                    status: 'Published',
                    tags: ['abu road', 'food', 'guide'],
                    createdAt: new Date(attributes.date || Date.now())
                }
            });
            console.log(`✓ Migrated ${slug}`);
        } catch (error) {
            console.error(`✗ Failed to migrate ${slug}:`, error);
        }
    }

    console.log('Migration complete.');
}

main()
    .catch(console.error)
    .finally(async () => await prisma.$disconnect());
