## Repo snapshot (big picture)

- This is a small, static marketing/coming-soon website intended for Netlify deployment. The site is plain HTML/CSS/JS (no bundler or Node app) located at the repository root.
- Dynamic bits are provided via Netlify Functions in `netlify/functions/` and client-side JS in `script.js`.

## Primary components

- `index.html` — main landing page and the single-page content hub (countdown, CTA, reviews container).
- `styles.css`, `script.js` — core styling and behavior. The countdown state and review fetch live in `script.js`.
- `netlify/functions/reviews.js` — serverless function that proxies Google Places details (expects `GOOGLE_API_KEY` + optional `GOOGLE_PLACE_ID`). Client fetches this at `/api/reviews`.
- `netlify/functions/sitemap.js` — minimal sitemap generator; it lists a handful of static service pages under `/services/`.
- `services/*.html` — extra static pages included in the sitemap and site nav.
- `netlify.toml` and the README contain Netlify deployment notes (static site — no build command).

## What an AI coding agent should know (actionable rules)

1. Netlify-first deployment
   - There is no build pipeline. Deploy by publishing the repository as a static site on Netlify. The README explicitly notes setting the Base directory when importing.
   - Environment variables expected by runtime: `GOOGLE_API_KEY` (required by `reviews.js`) and optionally `GOOGLE_PLACE_ID`.

2. API / function mapping
   - Client code calls `/api/reviews` (see `script.js`). That maps to `netlify/functions/reviews.js`. Keep response shape unchanged: { name, rating, total, reviews }.
   - `sitemap.js` serves `/sitemap.xml`. If you add or remove pages under `services/`, update the `pages` array in `netlify/functions/sitemap.js`.

3. Editing content and behavior
   - Change launch date / countdown logic in `script.js` (search for the `launch` variable). The site uses a 7‑day persistent countdown stored in `localStorage`.
   - Static content (menus, copy, schema.org blocks) live inline in `index.html` and `services/*.html`. Edit those files directly; there is no templating engine.

4. Analytics, GTM and tracking
   - Multiple analytics and GTM snippets are in `index.html`. When modifying head content, preserve required async/load ordering for third-party tags.

5. Stability and safety
   - `script.js` contains some anti-inspect behavior and client-side html-escaping helpers. Avoid changing escapeHtml semantics unless you fully validate output.
   - `reviews.js` will return a 500 if `GOOGLE_API_KEY` is not set. Tests or local runs must supply this env var (or mock the response).

6. Patterns to follow when changing code
   - Keep changes small and local. Prefer editing the exact HTML/JS/CSS files over introducing build tooling.
   - Preserve asset query strings (e.g., `styles.css?v=5`, `script.js?v=5`) used for cache-busting unless you intentionally bump them.
   - When adding pages, update `netlify/functions/sitemap.js` and ensure any new URLs are canonicalized in their HTML head (`<link rel="canonical">`).

## Examples to cite in edits

- To fix missing reviews locally: simulate the reviews function by returning the same object shape as `netlify/functions/reviews.js` (name, rating, total, reviews). `script.js` expects `data.reviews` and `data.rating`/`data.total`.
- To add a service page to the sitemap, append the path to the `pages` array in `netlify/functions/sitemap.js`.
- To change the countdown, edit `const launch = parseInt(localStorage.getItem('launchTs')...)` in `script.js`.

## Debugging hints

- If `/api/reviews` returns 500: verify Netlify env var `GOOGLE_API_KEY` is set and valid. Local testing can be done by running a Node proxy or using Netlify CLI with envvars.
- If analytics or GTM appear broken after edits, check that duplicate GTM/gtag scripts were not accidentally added or removed — this repo intentionally includes several analytics tags; changes here impact privacy/consent.

## When to ask the human

- If you need to add new runtime dependencies or a build step — ask. The project intentionally avoids bundlers; adding one is a repo-level decision.
- If you plan to change the reviews response shape (for UX reasons), confirm that both `script.js` and `reviews.js` are updated together.

---
If anything in these instructions is unclear or you'd like a different tone/level of detail (e.g., more examples or a short checklist for PR reviewers), tell me which sections to expand and I'll iterate.
