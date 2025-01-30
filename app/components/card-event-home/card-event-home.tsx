import { Calendar, MapPin } from 'lucide-react';

export default function CardEventHome() {
    return (
        <div className="card-event-home p-6 bg-[var(--color-background)] border border-[var(--color-gray-light)] rounded-lg ">
            <p className="text-[20px] color-[var(--color-foreground)] font-bold mb-1">LimaJS Meetup</p>
            <p className="font-medium text-[var(--color-gray-light)]">Lima JS</p>
            <p className="font-medium my-4 text-[var(--color-gray-light)]">Explora las últimas tendencias en React, Node.js y el ecosistema JavaScript.</p>
            <div className="flex items-center gap-2 font-medium text-[var(--color-gray-light)] mb-1">
                <Calendar size={16} />
                <span>15 de Julio, 2024 - 6:00 PM</span>
            </div>
            <div className="flex items-center gap-2 font-medium text-[var(--color-gray-light)]">
                <MapPin size={16} />
                <span>WeWork San Isidro</span>
            </div>
        </div>
    );
}