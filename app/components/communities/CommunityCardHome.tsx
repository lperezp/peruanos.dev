'use client';

import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { ICommunity } from '@/app/models/community.model';
import TrackedLink from '../ui/TrackedLink';
import { addUTMParams } from '../../lib/utm';
import CommunitySideModal from './CommunitySideModal';

export default function CardCommunityHome({ community }: { community: ICommunity }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCardClick = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest('a')) {
            return;
        }
        setIsModalOpen(true);
    };

    return (
        <>
        <div
            className="card-event-home p-6 bg-background border border-accent rounded-lg flex-1 max-w-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md hover:border-primary/50 cursor-pointer"
            onClick={handleCardClick}
        >
            <p className="text-[20px] text-foreground font-bold mb-1">{community.name}</p>
            <p className="font-medium text-accent">{community.city}</p>
            <p className="font-medium my-4 text-accent line-clamp-4">{community.description}</p>
            <TrackedLink
                href={addUTMParams(community.contact.website)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-medium text-primary-text mb-1"
                eventName="click_visit_community"
                eventParams={{ event_name: community.name, event_link: community.contact.website, section: 'Home' }}
            >
                <span>Visitar sitio web</span>
                <ExternalLink size={16} />
            </TrackedLink>
        </div>
        <CommunitySideModal
            community={community}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
        />
        </>
    );
}