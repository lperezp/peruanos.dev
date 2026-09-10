import { Startup } from '@/app/models/startup.model';
import StartupCard from './StartupCard';

interface StartupListProps {
    startups: Startup[];
}

export default function StartupList({ startups }: StartupListProps) {
    if (startups.length === 0) {
        return (
            <div className="w-full text-center py-8">
                <p className="text-accent">No se encontraron startups con los filtros seleccionados.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 w-full">
            {startups.map((startup) => (
                <StartupCard key={startup.id} startup={startup} />
            ))}
        </div>
    );
}
