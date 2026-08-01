export interface GAEventParams {
    event_name?: string;
    event_link?: string;
    section?: string;
    [key: string]: unknown;
}

export function trackEvent(name: string, params?: GAEventParams) {
    if (typeof window === 'undefined') return;
    if (!('gtag' in window) || typeof window.gtag !== 'function') return;
    window.gtag('event', name, params);
}
