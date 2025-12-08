exports.handler = async function(event) {
  // Prefer explicit query param, then env var, then fallback constant
  const FALLBACK_PLACE_ID = 'ChIJlzHZlW0nXTkRCsdLKbL9Hbk';
  const placeId = (event.queryStringParameters && event.queryStringParameters.place_id) || process.env.GOOGLE_PLACE_ID || FALLBACK_PLACE_ID;
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Missing GOOGLE_API_KEY' }) };
  }
  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=rating,reviews,user_ratings_total,name&key=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    const reviews = (data.result && data.result.reviews) ? data.result.reviews.map(r => ({
      author_name: r.author_name,
      profile_photo_url: r.profile_photo_url,
      rating: r.rating,
      relative_time_description: r.relative_time_description,
      text: r.text
    })) : [];
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=3600' },
      body: JSON.stringify({ name: data.result?.name, rating: data.result?.rating, total: data.result?.user_ratings_total, reviews })
    };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to fetch', details: String(e) }) };
  }
}


