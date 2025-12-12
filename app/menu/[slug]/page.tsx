
import { Metadata } from 'next';
import { prisma } from '@/app/lib/db';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import AddToCartButton from '@/app/components/menu/AddToCartButton';
import SiteLayout from '@/app/components/layout/SiteLayout';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const item = await prisma.menuItem.findUnique({
        where: { slug },
        select: { name: true, description: true, image: true }
    });

    if (!item) return { title: 'Item Not Found' };

    return {
        title: `${item.name} | Oye Chatoro Menu`,
        description: item.description || `Order ${item.name} from Oye Chatoro. Fresh, delicious, and made to order.`,
        openGraph: {
            images: item.image ? [item.image] : [],
        },
    };
}

export default async function MenuItemPage({ params }: Props) {
    const { slug } = await params;
    const item = await prisma.menuItem.findUnique({
        where: { slug },
        include: {
            category: true
        }
    });

    if (!item) notFound();

    // Fetch Related Items (same category, exclude current)
    const relatedItems = await prisma.menuItem.findMany({
        where: {
            categoryId: item.categoryId,
            id: { not: item.id },
            status: 'Active'
        },
        take: 3,
        select: { id: true, name: true, slug: true, price: true, image: true, veg: true }
    });

    // Mock Reviews (randomize slightly for effect)
    const MOCK_REVIEWS = [
        { id: 1, author: 'Pritam Yadav', rating: 5, date: '2 weeks ago', text: 'Hygiene is very good. Better food than others in Abu Road.' },
        { id: 2, author: 'Sagar Sachan', rating: 5, date: '1 month ago', text: 'Must visit place. Very tasty.' },
        { id: 3, author: 'Rider Boy', rating: 4, date: '3 weeks ago', text: 'Good food, worth the wait.' },
    ];

    return (
        <SiteLayout>
            <div className="min-h-screen bg-[var(--background-light)] pb-20">
                {/* Hero / Image Section */}
                <div className="relative h-64 md:h-96 w-full bg-gray-200">
                    {item.image ? (
                        <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            priority
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-400 bg-gray-100">
                            <span className="text-4xl">🍽️</span>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
                        <div className="p-6 md:p-12 text-white max-w-7xl mx-auto w-full">
                            <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-sm font-medium mb-3 shadow-sm border border-white/10">
                                {item.category.name}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-black mb-2 drop-shadow-lg tracking-tight text-white">{item.name}</h1>
                            <div className="flex items-center gap-4 mt-2">
                                <span className="text-3xl font-bold text-[var(--brand-primary)] drop-shadow-md">₹{item.price}</span>
                                <span className="px-2 py-1 bg-green-600/90 text-white text-xs font-bold rounded-md border border-green-400 shadow-sm backdrop-blur-sm">PURE VEG</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Container */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Details (Left Col) */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Description</h3>
                            <p className="text-lg text-gray-600 leading-relaxed mb-8">
                                {item.description || 'No description available for this delicious item.'}
                            </p>

                            {/* CTA */}
                            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-6 border-t border-gray-100">
                                <Link href="/menu" className="text-gray-500 hover:text-[var(--brand-primary)] font-medium transition-colors">
                                    ← Back to Menu
                                </Link>
                                <AddToCartButton
                                    item={{ id: item.id, name: item.name, price: item.price, image: item.image, veg: item.veg }}
                                    className="w-full sm:w-auto px-8 py-3 bg-[var(--brand-primary)] text-white font-bold rounded-xl shadow-lg shadow-orange-200 hover:scale-105 transition-all"
                                />
                            </div>
                        </div>

                        {/* Check Reviews */}
                        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-bold text-gray-800">Customer Reviews</h3>
                                <div className="flex items-center gap-1 text-sm bg-green-50 px-3 py-1 rounded-full text-green-700 font-bold">
                                    <span>4.8</span> <span>⭐</span>
                                </div>
                            </div>
                            <div className="space-y-6">
                                {MOCK_REVIEWS.map((review) => (
                                    <div key={review.id} className="pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">
                                                    {review.author.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-900 text-sm">{review.author}</div>
                                                    <div className="text-xs text-gray-400">{review.date}</div>
                                                </div>
                                            </div>
                                            <div className="flex text-yellow-400 text-xs">
                                                {[...Array(review.rating)].map((_, i) => <span key={i}>⭐</span>)}
                                            </div>
                                        </div>
                                        <p className="text-gray-600 text-sm ml-11">"{review.text}"</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Related Items (Right Col) */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 sticky top-24">
                            <h3 className="text-xl font-bold text-gray-800 mb-6">You Might Also Like</h3>
                            <div className="space-y-4">
                                {relatedItems.length > 0 ? relatedItems.map((related) => (
                                    <Link href={`/menu/${related.slug}`} key={related.id} className="flex gap-4 group cursor-pointer">
                                        <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                                            {related.image ? (
                                                <Image src={related.image} alt={related.name} fill className="object-cover group-hover:scale-110 transition-transform" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-xl">🍽️</div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-gray-800 group-hover:text-[var(--brand-primary)] transition-colors">
                                                {related.name}
                                            </h4>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-sm font-bold text-[var(--brand-primary)]">₹{related.price}</span>
                                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                            </div>
                                        </div>
                                    </Link>
                                )) : (
                                    <p className="text-gray-400 text-sm text-center py-4">No related items found.</p>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </SiteLayout>
    );
}
