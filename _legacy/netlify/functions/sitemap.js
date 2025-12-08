const zlib = require('zlib');

// Utility functions for sitemap generation
const getPriority = (path) => {
  const depth = path.split('/').length - 1;
  return Math.max(0.3, 1 - (depth * 0.2)).toFixed(1);
};

const getChangeFreq = (path) => {
  if (path === '/') return 'daily';
  if (path.includes('/menu/')) return 'daily';
  if (path.includes('/services/')) return 'monthly';
  return 'weekly';
};

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Main handler function
exports.handler = async function(event, context) {
  try {
    // Use environment-based origin URL
    const origin = process.env.URL || process.env.DEPLOY_URL || 'https://oyechatoro.com';
    
    // List of pages with their image data
    const pages = [
      {
        path: '/',
        images: [{ url: '/images/logo.png', caption: 'Oye Chatoro Logo' }]
      },
      {
        path: '/menu/',
        images: [{ url: '/images/menu-hero.jpg', caption: 'Our Menu' }]
      },
      {
        path: '/admin/',
        images: []
      },
      {
        path: '/menu/index.html',
        images: []
      },
      {
        path: '/services/website-development-abu-road.html',
        images: [{ url: '/images/abu-road.jpg', caption: 'Web Development in Abu Road' }]
      },
      {
        path: '/services/website-development-mount-abu.html',
        images: [{ url: '/images/mount-abu.jpg', caption: 'Web Development in Mount Abu' }]
      },
      {
        path: '/services/website-development-palanpur.html',
        images: [{ url: '/images/palanpur.jpg', caption: 'Web Development in Palanpur' }]
      },
      {
        path: '/services/website-development-sirohi.html',
        images: [{ url: '/images/sirohi.jpg', caption: 'Web Development in Sirohi' }]
      }
    ];

    const today = new Date().toISOString().split('T')[0];

    // Generate URL entries with all enhancements
    const urls = pages
      .filter(page => isValidUrl(`${origin}${page.path}`))
      .map(page => {
        const imageXml = page.images.map(img => 
          `    <image:image>\n      <image:loc>${origin}${img.url}</image:loc>\n      <image:caption>${img.caption}</image:caption>\n    </image:image>`
        ).join('\n');

        return `  <url>
    <loc>${origin}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${getChangeFreq(page.path)}</changefreq>
    <priority>${getPriority(page.path)}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${origin}${page.path}" />
    <xhtml:link rel="alternate" hreflang="hi" href="${origin}${page.path.replace('.html', '')}/hi" />
${imageXml}
  </url>`;
      })
      .join('\n');

    // Generate complete XML with all namespaces
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`;

    // Compress XML
    const compressedXml = zlib.gzipSync(xml);

    // Return response with cache headers
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Content-Encoding': 'gzip',
        'Cache-Control': 'public, max-age=3600',
        'X-Robots-Tag': 'noindex'
      },
      body: compressedXml.toString('base64'),
      isBase64Encoded: true
    };
  } catch (e) {
    // Enhanced error logging
    console.error('Sitemap generation failed:', e);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Error generating sitemap',
        details: e.message,
        timestamp: new Date().toISOString()
      })
    };
  }
};
