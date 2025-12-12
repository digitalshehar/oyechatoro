import Link from 'next/link';
import BlogImage from '../../components/ui/BlogImage';
import { notFound } from 'next/navigation';
import { prisma } from '@/app/lib/db';
import { Metadata } from 'next';
import { PrintButton, OrderCTA, CommentSection, TOC } from '../../components/blog/BlogClientComponents';
import NewsletterWidget from '../../components/blog/NewsletterWidget';
import SiteLayout from '../../components/layout/SiteLayout';

// 1. Generate Dynamic Metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = await prisma.blogPost.findUnique({
        where: { slug },
        include: { category: true, tags: true }
    });

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: post.seoTitle || `${post.title} | Oye Chatoro Blog`,
        description: post.seoDescription || post.excerpt || '',
        openGraph: {
            title: post.seoTitle || post.title,
            description: post.seoDescription || post.excerpt || '',
            images: post.image ? [{ url: post.image }] : [],
            type: 'article',
            publishedTime: post.createdAt.toISOString(),
            authors: [post.author],
            section: post.category?.name || 'General',
            tags: post.tags?.map((t: any) => t.name) || [],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.seoTitle || post.title,
            description: post.seoDescription || post.excerpt || '',
            images: post.image ? [post.image] : [],
        },
    };
}

// Generate TOC from Markdown
function generateTOC(content: string) {
    const lines = content.split('\n');
    const toc = [];
    for (const line of lines) {
        if (line.startsWith('## ')) {
            const text = line.replace('## ', '');
            toc.push({ id: text.toLowerCase().replace(/[^a-z0-9]+/g, '-'), text, level: 2 });
        } else if (line.startsWith('### ')) {
            const text = line.replace('### ', '');
            toc.push({ id: text.toLowerCase().replace(/[^a-z0-9]+/g, '-'), text, level: 3 });
        }
    }
    return toc;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // 1. Try DB
    const post: any = await prisma.blogPost.findUnique({
        where: { slug },
        include: { category: true, tags: true, comments: true }
    });

    if (!post) {
        notFound();
    }

    // Normalize DB data to UI shape if needed
    if (!post.readTime && post.readingTime) post.readTime = post.readingTime;

    // Generate real related posts
    const rawRelatedPosts = await prisma.blogPost.findMany({
        where: {
            slug: { not: slug },
            status: 'Published'
        },
        orderBy: { createdAt: 'desc' },
        take: 3,
        select: {
            id: true,
            title: true,
            slug: true,
            image: true,
            readingTime: true,
            isRecipe: true,
            createdAt: true
        }
    });

    // Map to UI friendly shape
    const relatedPosts = rawRelatedPosts.map(rp => ({
        ...rp,
        readTime: rp.readingTime || '5 min'
    }));

    const toc = generateTOC(post.content);

    // Schema: BlogPosting
    const blogSchema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        image: post.image,
        author: {
            '@type': 'Person',
            name: post.author
        },
        datePublished: post.createdAt,
        articleBody: post.excerpt
    };

    // Schema: BreadcrumbList
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [{
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://oyechatoro.com'
        }, {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: 'https://oyechatoro.com/blog'
        }, {
            '@type': 'ListItem',
            position: 3,
            name: post.title,
            item: `https://oyechatoro.com/blog/${slug}`
        }]
    };

    // Schema: FAQPage
    const faqSchema = post.faqs ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: post.faqs.map((faq: { question: string, answer: string }) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer
            }
        }))
    } : null;

    const shareUrl = `https://oyechatoro.com/blog/${slug}`;
    const shareText = `Check out this delicious story: ${post.title}`;

    return (
        <SiteLayout>
            <div className="min-h-screen bg-[var(--bg-body)] font-sans pb-20 selection:bg-orange-200">
                {/* Inject Schemas */}
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
                {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

                <article className="max-w-5xl mx-auto px-4 pt-4 animate-in">
                    {/* Immersive Hero */}
                    <div className="relative rounded-[3rem] overflow-hidden shadow-2xl h-[85vh] mb-[-100px] z-0 print:hidden">
                        <BlogImage
                            src={post.image || ''}
                            alt={post.title}
                            fill
                            className="object-cover brightness-75"
                            priority
                            fallbackGradient="from-orange-900 to-black"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex items-end p-8 md:p-20 pb-40">
                            <div className="w-full max-w-4xl mx-auto text-center md:text-left">
                                <div className="flex flex-wrap gap-3 mb-6 justify-center md:justify-start">
                                    <span className="px-5 py-2 bg-[var(--brand-primary)] text-white text-sm font-black rounded-full uppercase tracking-widest shadow-lg">
                                        {post.category?.name || 'Article'}
                                    </span>
                                    {post.isRecipe && (
                                        <span className="px-5 py-2 bg-yellow-400 text-yellow-900 text-sm font-black rounded-full flex items-center gap-2 shadow-lg">
                                            🍳 Recipe
                                        </span>
                                    )}
                                </div>
                                <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight drop-shadow-2xl">
                                    {post.title}
                                </h1>
                                <div className="flex flex-wrap items-center gap-6 text-white/90 text-base font-bold justify-center md:justify-start">
                                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur px-4 py-2 rounded-full border border-white/10">
                                        <div className="w-8 h-8 rounded-full bg-[var(--brand-primary)] flex items-center justify-center text-white border-2 border-white">
                                            {post.author.charAt(0)}
                                        </div>
                                        <span>{post.author}</span>
                                    </div>
                                    <span>•</span>
                                    <span>{new Date(post.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
                                    <span>•</span>
                                    <span>{post.readTime || '5 min'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Wrapper */}
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">

                        {/* Main Content Area */}
                        <div className="lg:col-span-8 bg-[var(--bg-body)] rounded-[3rem] p-6 md:p-12 shadow-[0_-20px_60px_rgba(0,0,0,0.1)] border border-white/50 backdrop-blur-sm">

                            {/* Breadcrumbs */}
                            <div className="text-sm font-medium text-gray-500 mb-8 flex flex-wrap gap-2 items-center print:hidden">
                                <Link href="/" className="hover:text-[var(--brand-primary)]">Home</Link>
                                <span>/</span>
                                <Link href="/blog" className="hover:text-[var(--brand-primary)]">Blog</Link>
                                <span>/</span>
                                <span className="text-gray-800 font-bold max-w-[150px] truncate md:max-w-none">{post.title}</span>
                            </div>

                            {/* Recipe Details Widget */}
                            {post.isRecipe && (
                                <div className="bg-white rounded-3xl p-8 shadow-xl border-l-8 border-orange-500 mb-16 transform -translate-y-8 md:-translate-y-16 print:shadow-none print:transform-none print:border-l-0 print:border-2">
                                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                                        <h2 className="text-3xl font-black text-[var(--brand-dark)] flex items-center gap-3">
                                            🥘 <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-yellow-600">The Secret Recipe</span>
                                        </h2>
                                        <div className="print:hidden">
                                            <PrintButton />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                                        {[
                                            { label: 'Prep', val: post.recipeDetails?.prepTime },
                                            { label: 'Cook', val: post.recipeDetails?.cookTime },
                                            { label: 'Serves', val: post.recipeDetails?.servings },
                                            { label: 'Cals', val: post.recipeDetails?.calories }
                                        ].map((item, i) => (
                                            <div key={i} className="bg-orange-50 p-4 rounded-2xl text-center border border-orange-100">
                                                <div className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-1">{item.label}</div>
                                                <div className="font-black text-gray-800 text-lg">{item.val || '-'}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="bg-gray-50 rounded-2xl p-8 border-2 border-dashed border-gray-200">
                                        <h3 className="font-bold text-xl text-gray-800 mb-6 flex items-center gap-2">
                                            🛒 Ingredients
                                        </h3>
                                        <div className="grid md:grid-cols-2 gap-x-8 gap-y-3">
                                            {post.recipeDetails?.ingredients?.map((ing: string, idx: number) => (
                                                <div key={idx} className="flex items-start gap-4 p-3 rounded-xl hover:bg-white transition-colors">
                                                    <div className="w-5 h-5 rounded-full bg-green-500/20 text-green-600 flex items-center justify-center text-xs mt-0.5">✓</div>
                                                    <span className="font-medium text-gray-700">{ing}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Article Body */}
                            <div className="prose prose-lg md:prose-xl max-w-none text-gray-600 prose-headings:font-black prose-headings:text-[var(--brand-dark)] prose-p:leading-relaxed prose-img:rounded-3xl prose-img:shadow-xl prose-a:text-orange-600 prose-blockquote:border-orange-500 prose-blockquote:bg-orange-50 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic prose-blockquote:px-8 prose-blockquote:py-6">
                                {post.content.split('\n').map((paragraph: string, idx: number) => {
                                    if (paragraph.startsWith('# ')) return <h1 key={idx} className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-primary)] to-orange-600 mb-8">{paragraph.replace('# ', '')}</h1>;
                                    if (paragraph.startsWith('## ')) {
                                        const text = paragraph.replace('## ', '');
                                        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                                        return <h2 key={idx} id={id} className="flex items-center gap-3 mt-12 mb-6 text-3xl scroll-mt-24">{text}</h2>;
                                    }
                                    if (paragraph.startsWith('### ')) {
                                        const text = paragraph.replace('### ', '');
                                        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                                        return <h3 key={idx} id={id} className="mt-8 mb-4 text-2xl font-bold scroll-mt-24">{text}</h3>;
                                    }
                                    if (paragraph.startsWith('> ')) return <blockquote key={idx} className="shadow-sm my-8 text-gray-700 font-medium">"{paragraph.replace('> ', '')}"</blockquote>;
                                    if (paragraph.startsWith('- ')) return <li key={idx} className="list-disc ml-6 my-2 marker:text-orange-500">{paragraph.replace('- ', '')}</li>;

                                    // Parse Image
                                    if (paragraph.startsWith('![')) {
                                        const match = paragraph.match(/!\[(.*?)\]\((.*?)\)/);
                                        if (match) return (
                                            <figure key={idx} className="my-10">
                                                <img src={match[2]} alt={match[1]} className="w-full rounded-3xl shadow-lg border border-gray-100" />
                                                <figcaption className="text-center text-sm text-gray-500 mt-3 font-medium">{match[1]}</figcaption>
                                            </figure>
                                        );
                                    }
                                    if (paragraph.trim() === '') return <div key={idx} className="h-4" />;
                                    return <p key={idx} className="mb-6">{paragraph}</p>;
                                })}
                            </div>

                            {/* FAQ Section (SEO) */}
                            {post.faqs && post.faqs.length > 0 && (
                                <div className="mt-16 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                                    <h3 className="font-black text-2xl text-[var(--brand-dark)] mb-6 flex items-center gap-2">
                                        🤔 Frequently Asked Questions
                                    </h3>
                                    <div className="space-y-4">
                                        {post.faqs.map((faq: { question: string, answer: string }, idx: number) => (
                                            <details key={idx} className="group bg-gray-50 rounded-2xl open:bg-white open:shadow-lg transition-all duration-300">
                                                <summary className="flex items-center justify-between p-5 font-bold text-gray-800 cursor-pointer list-none">
                                                    <span>{faq.question}</span>
                                                    <span className="transform transition-transform group-open:rotate-180">▼</span>
                                                </summary>
                                                <div className="px-5 pb-5 text-gray-600 leading-relaxed animate-in">
                                                    {faq.answer}
                                                </div>
                                            </details>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Comments & Ratings */}
                            <div className="print:hidden">
                                <CommentSection slug={post.slug} />
                            </div>

                            {/* Author Box */}
                            <div className="bg-[var(--bg-surface-glass)] rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 mt-16 shadow-lg border border-white/50 print:hidden">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center text-white font-black text-4xl shadow-lg ring-4 ring-white">
                                    {post.author.charAt(0)}
                                </div>
                                <div className="text-center md:text-left">
                                    <h3 className="font-bold text-2xl text-[var(--brand-dark)] mb-2">Written by {post.author}</h3>
                                    <p className="text-gray-600 font-medium max-w-lg">Passionate food lover and storyteller at Oye Chatoro. Sharing the best recipes and street food stories from our kitchen to yours.</p>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar / TOC */}
                        <div className="lg:col-span-4 space-y-8 mt-[100px] lg:mt-[200px] relative z-20 print:hidden">
                            {/* Table of Contents */}
                            <TOC headings={toc} />

                            {/* Newsletter Widget */}
                            <NewsletterWidget />

                            {/* Share Widget */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-4">Share this post</h3>
                                <div className="flex gap-2">
                                    <a href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`} target="_blank" className="flex-1 py-3 bg-[#25D366] text-white rounded-xl font-bold text-center hover:opacity-90 transition-opacity">
                                        WhatsApp
                                    </a>
                                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" className="flex-1 py-3 bg-[#1877F2] text-white rounded-xl font-bold text-center hover:opacity-90 transition-opacity">
                                        Facebook
                                    </a>
                                </div>
                            </div>

                            {/* Simple Ad/CTA */}
                            <div className="bg-[var(--brand-dark)] p-8 rounded-3xl text-center text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-orange-500 rounded-full opacity-20 blur-xl"></div>
                                <div className="relative z-10">
                                    <div className="text-4xl mb-4">😋</div>
                                    <h3 className="font-bold text-xl mb-2">Hungry?</h3>
                                    <p className="text-white/70 mb-6 text-sm">Don't just read about it. Order spicy deliciousness now!</p>
                                    <a href="/menu" className="block w-full py-3 bg-[var(--brand-primary)] text-white rounded-xl font-bold hover:bg-orange-600 transition-colors">
                                        View Menu
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Related Posts */}
                    {relatedPosts.length > 0 && (
                        <div className="mt-24 mb-12 max-w-7xl mx-auto print:hidden">
                            <h3 className="text-3xl font-black text-[var(--brand-dark)] mb-10 text-center">More to Devour</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {relatedPosts.map(rp => (
                                    <Link href={`/blog/${rp.slug}`} key={rp.id} className="group glass-card p-4 rounded-3xl hover:bg-white transition-all hover:scale-[1.02]">
                                        <div className="h-48 rounded-2xl overflow-hidden mb-4 relative shadow-md">
                                            <BlogImage
                                                src={rp.image || ''}
                                                alt={rp.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            {rp.isRecipe && <span className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-lg text-xs font-bold shadow-sm">煎 Recipe</span>}
                                        </div>
                                        <h4 className="font-bold text-lg text-[var(--brand-dark)] px-2 group-hover:text-[var(--brand-primary)] transition-colors line-clamp-2">{rp.title}</h4>
                                        <p className="text-sm font-medium text-gray-400 px-2 mt-2 flex items-center gap-2">
                                            <span>🕒 {rp.readTime || '5 min'}</span>
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </article>

                {/* Sticky Commercial CTA */}
                <OrderCTA itemName={post.title} />

            </div>
        </SiteLayout>
    );
}
