'use client';

import { Share2 } from 'lucide-react';
import { useState } from 'react';

interface ShareButtonProps {
    title: string;
    text?: string;
    url?: string;
    eventName?: string;
    eventParams?: Record<string, unknown>;
}

export default function ShareButton({ title, text, url, eventName, eventParams }: ShareButtonProps) {
    const [isSharing, setIsSharing] = useState(false);
    const [hasCopied, setHasCopied] = useState(false);

    const shareData = {
        title,
        text,
        url: url || (typeof window !== 'undefined' ? window.location.href : ''),
    };

    const handleShare = async () => {
        setIsSharing(true);

        if (eventName && typeof window !== 'undefined' && 'gtag' in window && typeof window.gtag === 'function') {
            window.gtag('event', eventName, eventParams);
        }

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                // Fallback to copy to clipboard
                await navigator.clipboard.writeText(`${title} - ${url}`);
                setHasCopied(true);
                setTimeout(() => setHasCopied(false), 2000);
            }
        } catch (error) {
            console.error('Error sharing:', error);
        } finally {
            setIsSharing(false);
        }
    };

    return (
        <button
            onClick={handleShare}
            disabled={isSharing}
            className="flex items-center gap-2 font-medium text-primary hover:text-primary/80 transition-colors"
            aria-label="Share event"
        >
            {hasCopied ? 'Copiado!' : 'Compartir'}
            <Share2 size={16} />
        </button>
    );
}
