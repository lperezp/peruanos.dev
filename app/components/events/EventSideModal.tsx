import { useEffect } from 'react';
import Image from 'next/image';
import { ExternalLink, MapPin, Calendar, Clock, User } from 'lucide-react';
import { IEvent } from '@/app/models/event.model';
import SideModal from '../ui/SideModal';
import Badge from '../ui/Badge';
import TrackedLink from '../ui/TrackedLink';
import { addUTMParams } from '@/app/lib/utm';
import { trackEvent } from '@/app/lib/analytics';

interface EventSideModalProps {
    event: IEvent;
    isOpen: boolean;
    onClose: () => void;
}

export default function EventSideModal({ event, isOpen, onClose }: EventSideModalProps) {
    useEffect(() => {
        if (!isOpen) return;
        trackEvent('view_event', { event_title: event.title, event_type: event.type });
    }, [isOpen, event.title, event.type]);

    const dateObj = new Date(event.date);
    const formattedDate = dateObj.toLocaleDateString('es-PE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC'
    });

    return (
        <SideModal isOpen={isOpen} onClose={onClose} title="Detalles del Evento">
            <div className="flex flex-col gap-6 pb-20">
                <div className="relative w-full aspect-square h-auto rounded-lg overflow-hidden shrink-0">
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
                </div>

                <div>
                    <div className="flex flex-wrap gap-2 mb-3">
                        <Badge>{event.type}</Badge>
                        {event.tags.map((tag) => (
                            <Badge key={tag} variant="outline">{tag}</Badge>
                        ))}
                    </div>
                    <h1 className="text-2xl font-bold text-foreground mb-2 break-words">{event.title}</h1>
                    {event.organizer && (
                        <div className="flex items-center gap-2 text-accent mb-4">
                            <User size={18} />
                            <span className="font-medium break-words">{event.organizer}</span>
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-3 bg-hover/50 p-4 rounded-lg border border-border">
                    <div className="flex items-center gap-3 text-foreground">
                        <Calendar size={20} className="text-primary shrink-0" />
                        <span className="capitalize break-words">{formattedDate}</span>
                    </div>
                    {event.time && (
                        <div className="flex items-center gap-3 text-foreground">
                            <Clock size={20} className="text-primary shrink-0" />
                            <span className="break-words">{event.time}</span>
                        </div>
                    )}
                    <div className="flex items-start gap-3 text-foreground">
                        <MapPin size={20} className="text-primary shrink-0 mt-1" />
                        <span className="flex-1 break-words">{event.location} - {event.city}</span>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Acerca de este evento</h3>
                    <p className="text-accent whitespace-pre-wrap leading-relaxed break-words">
                        {event.description.replace(/\*\*/g, '')}
                    </p>
                </div>

                <div className="fixed bottom-0 right-0 w-full max-w-md md:max-w-lg lg:max-w-xl bg-background border-t border-border p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                    <TrackedLink
                        href={addUTMParams(event.registration_url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover transition-colors"
                        eventName="click_register_event"
                        eventParams={{ event_title: event.title, event_type: event.type }}
                    >
                        Página del evento
                        <ExternalLink size={18} />
                    </TrackedLink>
                </div>
            </div>
        </SideModal>
    );
}
