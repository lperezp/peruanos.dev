import { IEvent } from '@/app/models/event.model';
import CardEvent from '../card-event/card-event';

interface EventListProps {
    events: IEvent[];
}

export default function EventList({ events }: EventListProps) {
    if (events.length === 0) {
        return (
            <div className="text-center py-10">
                <p className="text-xl text-[var(--color-text-secondary)]">
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
