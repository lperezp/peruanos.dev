/* eslint-disable @next/next/no-img-element */
import { ExternalLink } from 'lucide-react';
import { ICommunity } from '@/app/models/community.model';
import Badge from '../ui/Badge';
import { addUTMParams } from '../../lib/utm';

export default function CardCommunity({ community }: { community: ICommunity }) {
    return (
        <div className="bg-background border border-accent rounded-lg overflow-hidden flex flex-col sm:flex-row sm:h-[250px] w-full">
            <div className="relative w-full sm:w-[250px] h-48 sm:h-full flex-shrink-0 p-10 flex items-center justify-center bg-background overflow-hidden">
                {community.logo_url ? (
                    <>
                        <img
                            src={community.logo_url}
                            alt=""
                            className="absolute inset-0 w-full h-full object-contain blur-2xl opacity-60 scale-75"
                            aria-hidden="true"
                        />
                        <img
                            src={community.logo_url}
                            alt={community.name}
                            className="relative w-full h-full object-contain drop-shadow-lg z-10"
                        />
                    </>
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 rounded-lg" />
                )}
            </div>
            <div className="p-6 flex-1">
                <p className="text-[20px] text-foreground font-bold mb-1">{community.name}</p>
                <p className="font-medium text-accent">{community.city}</p>
                <p className="font-medium my-4 text-accent line-clamp-2">{community.description}</p>
                <div className="flex gap-2 mb-3 flex-wrap">
                    {community.topics.map((topic) => (
                        <Badge key={topic} variant="outline">{topic}</Badge>
                    ))}
                </div>
                <a href={addUTMParams(community.contact.website)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-medium text-primary-text">
                    <span>Visitar sitio web</span>
                    <ExternalLink size={16} />
                </a>
            </div>
        </div>
    );
}