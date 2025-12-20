import type { Metadata, Viewport } from "next";
import { Inter, Poppins, Lato, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
    weight: ['400', '500', '600', '700', '800'],
    subsets: ["latin"],
    variable: "--font-poppins"
});
const lato = Lato({
    weight: ['300', '400', '700'],
    subsets: ["latin"],
    variable: "--font-lato"
});
const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair"
});

export const metadata: Metadata = {
    metadataBase: new URL('https://oyechatoro.com'),
    title: {
        default: 'Best Restaurant & Fast Food in Abu Road | Oye Chatoro - Pure Veg',
        template: '%s | Best Restaurants & Fast Food in Abu Road - Oye Chatoro'
    },
    description: 'Looking for the best restaurant and fast food in Abu Road? Oye Chatoro is the top-rated choice for 100% pure veg pizza, pasta, burgers, and street food. Discover why we are among the best restaurants in Abu Road.',
    keywords: [
        // Primary Keywords - Abu Road
        'best restaurant in Abu Road',
        'vegetarian restaurant Abu Road',
        'pure veg restaurant Abu Road',
        'food in Abu Road',
        'restaurants near me Abu Road',
        'Oye Chatoro Abu Road',

        // Food Keywords
        'pizza Abu Road',
        'pasta Abu Road',
        'chaat Abu Road',
        'burger Abu Road',
        'momos Abu Road',
        'fast food Abu Road',
        'street food Abu Road',
        'veg thali Abu Road',

        // Location Keywords - Nearby Areas
        'restaurant near Mount Abu',
        'food near Mount Abu',
        'vegetarian food Sirohi',
        'restaurant Sirohi district',
        'Abu Road Rajasthan restaurant',
        'Abu Central Mall food',

        // Long Tail Keywords
        'best pizza in Abu Road',
        'family restaurant Abu Road',
        'AC restaurant Abu Road',
        'online food order Abu Road',
        'food delivery Abu Road',
        'WhatsApp food order Abu Road',

        // Hindi Keywords (for local search)
        'Abu Road ka best restaurant',
        'pure veg food Abu Road',
        'Abu Road ka best restaurant',
        'pure veg food Abu Road',
        'shakahari restaurant Abu Road',

        // Target Keywords (High Volume)
        'best restaurants in abu road',
        'restaurants in abu road',
        'abu road famous food',
        'restaurants near abu road railway station',
        'best restaurants in mount abu'
    ],
    authors: [{ name: 'Oye Chatoro' }],
    creator: 'Oye Chatoro',
    publisher: 'Oye Chatoro',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    manifest: '/manifest.json',
    appleWebApp: {
        capable: true,
        statusBarStyle: 'default',
        title: 'Oye Chatoro',
    },
    openGraph: {
        type: 'website',
        locale: 'en_IN',
        url: 'https://oyechatoro.com',
        siteName: 'Oye Chatoro',
        title: 'Restaurant in Abu Road | Oye Chatoro - Best Pure Veg',
        description: 'Restaurant in Abu Road - Oye Chatoro offers authentic 100% vegetarian food. Pizzas, pastas, chaats & more at Abu Central Mall.',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Oye Chatoro - Vegetarian Restaurant',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Restaurant in Abu Road | Oye Chatoro - Pure Veg',
        description: 'Restaurant in Abu Road - Best pure veg food. Pizzas, Chaats, Pastas & more!',
        images: ['/og-image.jpg'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: 'your-google-verification-code',
    },
    alternates: {
        canonical: 'https://oyechatoro.com',
        languages: {
            'en-IN': 'https://oyechatoro.com/menu',
            'hi-IN': 'https://oyechatoro.com/menu?lang=hi',
        },
    },
};

export const viewport: Viewport = {
    themeColor: "#f97316",
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Restaurant',
                '@id': 'https://oyechatoro.com',
                name: 'Oye Chatoro - Best Restaurant & Fast Food in Abu Road',
                description: 'Oye Chatoro is the best restaurant and fast food junction in Abu Road serving famous pizza, pasta, burgers and chaat. Located near Abu Road Railway Station.',
                url: 'https://oyechatoro.com',
                telephone: '+91-9509913792',
                servesCuisine: ['North Indian', 'Italian', 'Fast Food', 'Street Food', 'Beverages'],
                priceRange: '₹₹ (200-500 per person)',
                address: {
                    '@type': 'PostalAddress',
                    streetAddress: 'Abu Central Mall, G-5, Riico Check Post Road',
                    addressLocality: 'Abu Road',
                    addressRegion: 'Rajasthan',
                    postalCode: '307026',
                    addressCountry: 'IN'
                },
                geo: { '@type': 'GeoCoordinates', latitude: 24.4759, longitude: 72.7846 },
                openingHoursSpecification: {
                    '@type': 'OpeningHoursSpecification',
                    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                    opens: '11:00',
                    closes: '23:00'
                },
                aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue: '4.8',
                    reviewCount: '150',
                    bestRating: '5',
                    worstRating: '1'
                }
            },
            {
                '@type': 'WebSite',
                name: 'Oye Chatoro',
                url: 'https://oyechatoro.com'
            }
        ]
    };

    return (
        <html lang="en" className={`${inter.variable} ${poppins.variable} ${lato.variable} ${playfair.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className={inter.className} suppressHydrationWarning>{children}</body>
        </html>
    );
}
