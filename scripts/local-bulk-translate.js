import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';
import 'dotenv/config';
import { translateToHindi } from '../app/lib/local-translator.js';

neonConfig.webSocketConstructor = ws;
const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('--- Starting Local Menu Translation ---');

    // 1. Translate Categories
    const categories = await prisma.menuCategory.findMany();
    for (const cat of categories) {
        const hindiName = translateToHindi(cat.name);
        await prisma.menuCategory.update({
            where: { id: cat.id },
            data: {
                translations: {
                    ...(cat.translations || {}),
                    hi: { name: hindiName }
                }
            }
        });
        console.log(`✅ Category: ${cat.name} -> ${hindiName}`);
    }

    // 2. Translate Menu Items
    const items = await prisma.menuItem.findMany();
    for (const item of items) {
        const existingTranslations = item.translations || {};
        const hiNamespace = existingTranslations.hi || {};

        hiNamespace.name = translateToHindi(item.name);
        if (item.description) {
            hiNamespace.description = translateToHindi(item.description);
        }

        await prisma.menuItem.update({
            where: { id: item.id },
            data: {
                translations: {
                    ...existingTranslations,
                    hi: hiNamespace
                }
            }
        });
        console.log(`✅ Item: ${item.name} -> ${hiNamespace.name}`);
    }

    console.log('--- Local Translation Finished ---');
}

main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
