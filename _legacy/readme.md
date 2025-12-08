# Oye Chatoro – Coming Soon (Static)

This is a small, standalone static site for Netlify. It is safe to deploy independently without touching your main Next.js app.

## Files
- index.html – Markup with countdown and Netlify email form (name="notify")
- styles.css – Minimal, responsive styles
- script.js – Countdown logic (change launch date inside)
- netlify.toml – Netlify configuration

## How to Deploy on Netlify
1. Zip the `coming-soon` folder or push it to a repository.
2. On Netlify, choose "Import an existing project".
3. Set the Base directory to `coming-soon` (important).
4. Build command: none (static site).
5. Publish directory: `coming-soon` or `.` if you set base to that folder.
6. Click Deploy.

## Customization
- Update launch date in `script.js`:
```js
const launch = new Date('2025-08-15T12:00:00').getTime();
```
- Replace logo.png with your logo (place file inside this folder and keep same name or update index.html).
- The form uses Netlify Forms – submissions will appear in your Netlify dashboard under "Forms".

## Notes
- This folder is isolated; it won’t interfere with the Next.js project.
- You can point your domain to the Netlify site now and later switch to the full site when ready.
