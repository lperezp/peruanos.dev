import { Calendar, MapPin } from 'lucide-react';
import { IEvent } from '../../models/event.model';

interface Props {
    event: IEvent;
}

export default function CardEventHome({ event }: Props) {
    return (
        <div className="card-event-home p-6 bg-[var(--color-background)] border border-[var(--color-gray-light)] rounded-lg ">
            <p className="text-[20px] color-[var(--color-foreground)] font-bold mb-1">{event.title}</p>
            <p className="font-medium text-[var(--color-gray-light)]">{event.organizer}</p>
            <p className="font-medium my-4 text-[var(--color-gray-light)]">{event.description}</p>
            <div className="flex items-center gap-2 font-medium text-[var(--color-gray-light)] mb-1">
                <Calendar size={16} />
                <span>{event.date} - {event.time}</span>
            </div>
            <div className="flex items-center gap-2 font-medium text-[var(--color-gray-light)]">
                <MapPin size={16} />
                <span>{event.location}</span>
            </div>
        </div>
    );
}