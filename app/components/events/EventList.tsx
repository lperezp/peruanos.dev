import { IEvent } from '@/app/models/event.model';
import CardEvent from './EventCard';

interface EventListProps {
    events: IEvent[];
}

export default function EventList({ events }: EventListProps) {
    if (events.length === 0) {
        return (
            <div className="text-center py-10" role="status" aria-live="polite">
                <p className="text-xl text-accent">
                    No se encontraron eventos con los filtros seleccionados.
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 w-full">
            {events.map((event: IEvent) => (
                <CardEvent key={`${event.title}-${event.date}`} event={event} />
            ))}
        </div>
    );
}
