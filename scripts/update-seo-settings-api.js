async function update() {
    try {
        const baseUrl = 'http://localhost:3000';
        const geminiKey = 'AIzaSyA7KFKnWRZS7gUg5p_N7jI8C2drhTtFP4E';

        // 1. Fetch current settings
        const res = await fetch(`${baseUrl}/api/seo/settings`);
        let settings = {};
        if (res.ok) {
            settings = await res.json();
        }

        // 2. Update with new key
        settings.geminiKey = geminiKey;

        // 3. Save back
        const saveRes = await fetch(`${baseUrl}/api/seo/settings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(settings)
        });

        if (saveRes.ok) {
            console.log('SEO Settings updated via API successfully.');
        } else {
            console.error('Failed to update settings:', await saveRes.text());
        }
    } catch (e) {
        console.error('Error updating settings:', e);
    }
}

update();
