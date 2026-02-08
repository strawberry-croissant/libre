(() => {
    document.addEventListener('DOMContentLoaded', () => {
        const trackingUrl = LIBRE_CONFIG.BACKEND.INDEX_TRACKING_URL;

        fetch(trackingUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            keepalive: true,
            body: JSON.stringify({
                page: 'index',
                referrer: document.referrer,
                userAgent: navigator.userAgent,
                language: navigator.language,
                screen: `${screen.width}x${screen.height}`,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                timestamp: new Date().toISOString()
            })
        }).catch(err => console.warn('Tracking skipped.'));
    });
})();
