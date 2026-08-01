'use client';

import { useState } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { IEvent } from '../../models/event.model';
import EventSideModal from './EventSideModal';

interface Props {
    event: IEvent;
}

export default function CardEventHome({ event }: Props) {
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
            className="card-event-home p-6 bg-background border border-accent rounded-lg flex-1 max-w-sm transition-all duration-300"

        >
            <p className="text-[20px] text-foreground font-bold mb-1 line-clamp-1">{event.title}</p>
            <p className="font-medium text-accent">{event.organizer}</p>
            <p className="font-medium my-4 text-accent line-clamp-4 min-h-[6rem]">{event.description.replace(/\*\*/g, '')}</p>
            <div className="flex items-center gap-2 font-medium text-accent mb-1">
                <Calendar size={16} />
                <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2 font-medium text-accent">
                <MapPin size={16} className="shrink-0" />
                <span className="truncate">{event.location}</span>
            </div>
            <button
                className="flex items-center mt-4 gap-2 font-medium text-primary cursor-pointer"
                onClick={handleCardClick}
            >
                Ver detalles
            </button>
        </div>
        <EventSideModal
            event={event}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
        />
        </>
    );
}