import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const key = 'seo_settings';
    const geminiKey = 'AIzaSyA7KFKnWRZS7gUg5p_N7jI8C2drhTtFP4E';

    const existing = await prisma.setting.findUnique({
        where: { key }
    });

    let value = {};
    if (existing) {
        value = typeof existing.value === 'string' ? JSON.parse(existing.value) : existing.value;
    }

    value.geminiKey = geminiKey;

    await prisma.setting.upsert({
        where: { key },
        update: { value },
        create: { key, value }
    });

    console.log('SEO Settings updated with Gemini Key successfully.');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
