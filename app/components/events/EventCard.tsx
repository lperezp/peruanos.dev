'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { IEvent } from '../../models/event.model';
import Badge from '../ui/Badge';
import EventSideModal from './EventSideModal';
import ShareButton from '../ui/ShareButton';

interface Props {
    event: IEvent;
}

export default function CardEvent({ event }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Formatear la fecha para el badge
    const dateObj = new Date(event.date);
    const month = dateObj.toLocaleString('es-PE', { month: 'short', timeZone: 'UTC' }).toUpperCase();
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();

    const handleCardClick = (e: React.MouseEvent) => {
        // Prevent opening modal if clicking on a link
        if ((e.target as HTMLElement).closest('a')) {
            return;
        }
        setIsModalOpen(true);
    };

    return (
        <>
        <div
            className="bg-background border border-accent rounded-lg overflow-hidden flex flex-col sm:flex-row sm:h-[300px] transition-all duration-300"
        >
            <div className="relative w-full sm:w-[300px] h-64 sm:h-full flex-shrink-0">
                {event.image_url ? (
                    <Image
                        src={event.image_url}
                        alt={event.title}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400" />
                )}

                <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3 text-center min-w-[60px]">
                    <p className="text-xs font-semibold text-gray-600">{month}</p>
                    <p className="text-2xl font-bold text-gray-900">{day}</p>
                    <p className="text-xs font-medium text-gray-600">{year}</p>
                </div>
            </div>
            <div className="p-6 flex-1">
                <div className="flex mb-3 flex-wrap">
                    <Badge>{event.type}</Badge>
                    {event.tags.map((tag) => (
                        <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                </div>
                <p className="text-[20px] text-foreground font-bold mb-1">{event.title}</p>
                <p className="font-medium text-accent">{event.organizer}</p>
                <p className="font-medium my-4 text-accent line-clamp-2">{event.description.replace(/\*\*/g, '')}</p>
                <div className="flex items-center gap-2 font-medium text-accent">
                    <MapPin size={16} />
                    <span>{event.location}</span>
                </div>
                <button
                        className="flex items-center mt-4 gap-2 font-medium text-primary cursor-pointer"
                        onClick={handleCardClick}
                >
                    Ver detalles
                </button>
                    <ShareButton
                        title={event.title}
                        text={`¡Mira este evento en peruanos.dev! ${event.title}`}
                        url={event.registration_url}
                        eventName="click_share_event"
                        eventParams={{ event_name: event.title, event_link: event.registration_url, section: 'Events' }}
                    />
            </div>
        </div>
        <EventSideModal
            event={event}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
        />
        </>
    );
}