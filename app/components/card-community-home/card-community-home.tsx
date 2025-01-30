import { ExternalLink } from 'lucide-react';

export default function CardCommunityHome() {
    return (
        <div className="card-event-home p-6 bg-[var(--color-background)] border border-[var(--color-gray-light)] rounded-lg ">
            <p className="text-[20px] color-[var(--color-foreground)] font-bold mb-1">LimaJS Meetup</p>
            <p className="font-medium text-[var(--color-gray-light)]">Lima JS</p>
            <p className="font-medium my-4 text-[var(--color-gray-light)]">La comunidad más grande de JavaScript en Lima. Meetups mensuales sobre React, Node.js, TypeScript y más.</p>
            <div className="flex items-center gap-2 font-medium text-[var(--color-primary)] mb-1">
                <span>Visitar sitio web</span>
                <ExternalLink size={16} />
            </div>
        </div>
    );
}