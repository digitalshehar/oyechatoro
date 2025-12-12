export const restaurantSchema = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': 'https://oyechatoro.com',
    name: 'Oye Chatoro',
    alternateName: 'Oye Chatoro Abu Road',
    description: 'Best vegetarian restaurant in Abu Road. Serving famous food of Abu Road like pizza, pasta, and chaat. Located near Abu Road Railway Station.',
    url: 'https://oyechatoro.com',
    telephone: '+91-9509913792',
    email: 'oyechatoro@gmail.com',
    priceRange: '₹₹',
    servesCuisine: ['Indian', 'Italian', 'Street Food', 'Fast Food'],
    acceptsReservations: false,
    hasMenu: 'https://oyechatoro.com/menu',
    address: {
        '@type': 'PostalAddress',
        streetAddress: 'Abu Central Mall, G-5, Riico Check Post Road',
        addressLocality: 'Abu Road',
        addressRegion: 'Rajasthan',
        postalCode: '307026',
        addressCountry: 'IN'
    },
    geo: {
        '@type': 'GeoCoordinates',
        latitude: 24.4759,
        longitude: 72.7846
    },
    openingHoursSpecification: [
        {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '17:00',
            closes: '23:00'
        }
    ],
    image: [
        'https://oyechatoro.com/og-image.jpg',
        'https://oyechatoro.com/logo.png'
    ],
    logo: 'https://oyechatoro.com/logo.png',
    aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5.0',
        reviewCount: '30',
        bestRating: '5',
        worstRating: '1'
    },
    sameAs: [
        'https://www.instagram.com/oyechatoro_/',

        'https://www.google.com/maps/place/Oye+Chatoro'
    ]
};

export const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Oye Chatoro',
    description: 'Best vegetarian restaurant in Abu Road. Serving famous food and located near Abu Road Railway Station.',
    url: 'https://oyechatoro.com',
    telephone: '+91-9509913792',
    address: {
        '@type': 'PostalAddress',
        streetAddress: 'Abu Central Mall, G-5, Riico Check Post Road',
        addressLocality: 'Abu Road',
        addressRegion: 'Rajasthan',
        postalCode: '307026',
        addressCountry: 'IN'
    },
    geo: {
        '@type': 'GeoCoordinates',
        latitude: 24.4759,
        longitude: 72.7846
    },
    image: 'https://oyechatoro.com/og-image.jpg',
    priceRange: '₹₹'
};

export const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Oye Chatoro',
    url: 'https://oyechatoro.com',
    potentialAction: {
        '@type': 'SearchAction',
        target: 'https://oyechatoro.com/menu?search={search_term_string}',
        'query-input': 'required name=search_term_string'
    }
};

export const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Oye Chatoro',
    url: 'https://oyechatoro.com',
    logo: 'https://oyechatoro.com/logo.png',
    contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+91-9509913792',
        contactType: 'customer service',
        availableLanguage: ['English', 'Hindi']
    },
    sameAs: [
        'https://www.instagram.com/oyechatoro_/',

    ]
};

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url
    }))
});
