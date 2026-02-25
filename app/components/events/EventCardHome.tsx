import { Calendar, ExternalLink, MapPin } from 'lucide-react';
import { IEvent } from '../../models/event.model';
import Link from 'next/link';
import { addUTMParams } from '../../lib/utm';

interface Props {
    event: IEvent;
}

export default function CardEventHome({ event }: Props) {
    return (
        <div className="card-event-home p-6 bg-background border border-accent rounded-lg flex-1 max-w-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md hover:border-primary/50">
            <p className="text-[20px] text-foreground font-bold mb-1 line-clamp-1">{event.title}</p>
            <p className="font-medium text-accent">{event.organizer}</p>
            <p className="font-medium my-4 text-accent line-clamp-4 min-h-[6rem]">{event.description}</p>
            <div className="flex items-center gap-2 font-medium text-accent mb-1">
                <Calendar size={16} />
                <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2 font-medium text-accent">
                <MapPin size={16} />
                <span>{event.location}</span>
            </div>
            <Link href={addUTMParams(event.registration_url)} target="_blank" rel="noopener noreferrer" className="flex items-center mt-4 gap-2 font-medium text-primary font-semibold">
                Registrarse
                <ExternalLink size={16} />
            </Link>
        </div>
    );
}