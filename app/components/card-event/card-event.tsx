/* eslint-disable @next/next/no-img-element */
import { Calendar, ExternalLink, MapPin } from 'lucide-react';
import { IEvent } from '../../models/event.model';
import Badge from '../badge/badge';
import Link from 'next/link';

interface Props {
    event: IEvent;
}

export default function CardEvent({ event }: Props) {
    // Formatear la fecha para el badge
    const dateObj = new Date(event.date);
    const month = dateObj.toLocaleString('es-ES', { month: 'short' }).toUpperCase();
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();

    return (
        <div className="bg-[var(--color-background)] border border-[var(--color-accent)] rounded-lg overflow-hidden flex flex-col sm:flex-row sm:h-[300px]">
            <div className="relative w-full sm:w-[300px] h-64 sm:h-full flex-shrink-0">
                {event.image_url ? (
                    <img
                        src={event.image_url}
                        alt={event.title}
                        className="w-full h-full object-cover"
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
                <div className="flex gap-2 mb-3 flex-wrap">
                    <Badge>{event.type}</Badge>
                    {event.tags.map((tag) => (
                        <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                </div>
                <p className="text-[20px] color-[var(--color-foreground)] font-bold mb-1">{event.title}</p>
                <p className="font-medium text-[var(--color-accent)]">{event.organizer}</p>
                <p className="font-medium my-4 text-[var(--color-accent)] line-clamp-2">{event.description}</p>
                <div className="flex items-center gap-2 font-medium text-[var(--color-accent)]">
                    <MapPin size={16} />
                    <span>{event.location}</span>
                </div>

                <Link href={event.registration_url} className="flex items-center mt-4 gap-2 font-medium text-[var(--color-primary)] font-semibold">
                    Registrarse
                    <ExternalLink size={16} />
                </Link>
            </div>
        </div>
    );
}