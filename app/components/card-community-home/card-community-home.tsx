import { ExternalLink } from 'lucide-react';
import { ICommunity } from '@/app/models/community.model';

export default function CardCommunityHome({ community }: { community: ICommunity }) {
    return (
        <div className="card-event-home p-6 bg-[var(--color-background)] border border-[var(--color-gray-light)] rounded-lg flex-1 max-w-sm">
            <p className="text-[20px] color-[var(--color-foreground)] font-bold mb-1">{community.name}</p>
            <p className="font-medium text-[var(--color-gray-light)]">{community.city}</p>
            <p className="font-medium my-4 text-[var(--color-gray-light)] line-clamp-4">{community.description}</p>
            <a href={community.contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-medium text-[var(--color-primary)] mb-1">
                <span>Visitar sitio web</span>
                <ExternalLink size={16} />
            </a>
        </div>
    );
}