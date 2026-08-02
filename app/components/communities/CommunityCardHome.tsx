'use client';

import { useState } from 'react';
import { ICommunity } from '@/app/models/community.model';
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
        >
            <p className="text-[20px] text-foreground font-bold mb-1">{community.name}</p>
            <p className="font-medium text-accent">{community.city}</p>
            <p className="font-medium my-4 text-accent line-clamp-4">{community.description}</p>
            <button
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors cursor-pointer"
                onClick={handleCardClick}   
            >
                Ver detalles
            </button>
        </div>
        <CommunitySideModal
            community={community}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
        />
        </>
    );
}