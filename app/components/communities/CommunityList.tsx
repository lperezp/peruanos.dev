import { ICommunity } from '@/app/models/community.model';
import CardCommunity from './CommunityCard';

interface CommunityListProps {
    communities: ICommunity[];
}

export default function CommunityList({ communities }: CommunityListProps) {
    if (communities.length === 0) {
        return (
            <div className="w-full text-center py-8">
                <p className="text-accent">No se encontraron comunidades con los filtros seleccionados.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 w-full">
            {communities.map((community, index) => (
                <CardCommunity key={index} community={community} />
            ))}
        </div>
    );
}
