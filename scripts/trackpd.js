/**
 * Tracking script for specific links and actions
 */
(() => {
    document.addEventListener('DOMContentLoaded', () => {
        const link = document.getElementById('sixSevenLink');
        const trackingUrl = LIBRE_CONFIG.BACKEND.TRACKING_URL;

        if (!link) return;

        link.addEventListener('click', () => {
            fetch(trackingUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                keepalive: true,
                body: JSON.stringify({
                    action: 'click',
                    element: 'sixSevenLink',
                    page: location.pathname,
                    referrer: document.referrer,
                    userAgent: navigator.userAgent,
                    timestamp: new Date().toISOString()
                })
            }).catch(() => {}); // silent fail
        });
    });
})();
