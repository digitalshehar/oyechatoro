import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_URL = 'http://localhost:3000/api/seo/ai/blog';

const BLOG_TOPICS = [
    '5 Must-Try Street Foods in Abu Road',
    'Why Oye Chatoro is the perfect hangout spot for friends',
    'The Secret Behind Our Signature Pizza Crust',
    'How to make the perfect thick shake at home (or just visit us!)',
    'Exploring the Flavors of Rajasthani Fast Food fusion'
];

async function generateBlogs() {
    console.log('🚀 Starting AI Blog Generation...\n');
    let report = `# 📝 AI Blog Generation Report\n\nGenerated on ${new Date().toLocaleDateString()}\n\n`;

    for (const topic of BLOG_TOPICS) {
        console.log(`Generating blog post for: ${topic}...`);

        // Delay to avoid overwhelming the API
        await new Promise(resolve => setTimeout(resolve, 5000));

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic })
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();

            if (data.error) {
                console.error(`AI Error for "${topic}":`, data.error);
                report += `## ❌ ${topic}\n**Error**: ${data.error}\n\n---\n\n`;
                continue;
            }

            // Save individual blog post to its own markdown file for review
            const safeFileName = topic.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 50);
            const blogFilePath = path.join(__dirname, '..', `blog_post_${safeFileName}.md`);

            const blogFileContent = `# ${data.title}\n\n` +
                `**Excerpt**: ${data.excerpt}\n\n` +
                `**SEO Meta Title**: ${data.seoMetadata.title}\n` +
                `**SEO Meta Description**: ${data.seoMetadata.description}\n\n` +
                `---\n\n` +
                `${data.content}`;

            fs.writeFileSync(blogFilePath, blogFileContent);
            console.log(`✅ Generated: ${blogFilePath}`);

            report += `## ✅ ${topic}\n**Title**: ${data.title}\n**File**: [${blogFilePath}](file://${blogFilePath})\n\n---\n\n`;

        } catch (error) {
            console.error(`Failed to generate for "${topic}":`, error.message);
            report += `## ❌ ${topic}\n**Error**: ${error.message}\n\n---\n\n`;
        }
    }

    const reportPath = path.join(__dirname, '..', 'ai_blog_generation_report.md');
    fs.writeFileSync(reportPath, report);
    console.log(`\n📄 Report generated at: ${reportPath}`);
}

generateBlogs();
