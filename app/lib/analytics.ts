export function trackEvent(name: string, params?: Record<string, unknown>) {
    if (typeof window === 'undefined') return;
    if (!('gtag' in window) || typeof window.gtag !== 'function') return;
    window.gtag('event', name, params);
}
