'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Startup } from '@/app/models/startup.model';
import Badge from '../ui/Badge';
import StartupSideModal from './StartupSideModal';
import { Briefcase, MapPin } from 'lucide-react';

export default function StartupCard({ startup }: { startup: Startup }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCardClick = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest('a')) {
            return;
        }
        setIsModalOpen(true);
    };

    return (
        <>
            <div
                className="bg-background border border-accent rounded-lg overflow-hidden flex flex-col sm:flex-row sm:h-[260px] w-full cursor-pointer transition-all duration-300 hover:shadow-md hover:border-primary/50 relative"
                onClick={handleCardClick}
            >
                <div className="relative w-full sm:w-[240px] h-48 sm:h-full flex-shrink-0 p-8 flex items-center justify-center bg-background overflow-hidden border-b sm:border-b-0 sm:border-r border-border">
                    {startup.logo ? (
                        <>
                            <Image
                                src={startup.logo}
                                alt=""
                                fill
                                className="object-contain blur-2xl opacity-40 scale-75"
                                aria-hidden="true"
                            />
                            <Image
                                src={startup.logo}
                                alt={startup.name}
                                fill
                                className="object-contain drop-shadow-md z-10 p-6"
                            />
                        </>
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 rounded-lg" />
                    )}
                </div>

                <div className="p-6 flex-1 flex flex-col min-w-0 justify-between">
                    <div>
                        <div className="flex items-center justify-between gap-2 mb-1">
                            <h3 className="text-xl font-bold text-foreground truncate">{startup.name}</h3>
                            {startup.hiring && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 whitespace-nowrap shrink-0">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    <Briefcase size={12} className="hidden sm:inline" />
                                    Hiring
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-accent mb-3">
                            <MapPin size={14} className="shrink-0" />
                            <span className="truncate">{startup.location}</span>
                            {startup.stage && (
                                <>
                                    <span>•</span>
                                    <span className="font-semibold text-primary-text">{startup.stage}</span>
                                </>
                            )}
                        </div>

                        <p className="text-sm text-accent line-clamp-2 mb-4 leading-relaxed">
                            {startup.description}
                        </p>
                    </div>

                    <div>
                        <div className="mb-3 overflow-x-auto overflow-y-hidden custom-scrollbar">
                            <div className="flex gap-1.5">
                                {startup.industry.map((ind) => (
                                    <Badge key={ind} variant="outline" className="whitespace-nowrap flex-shrink-0 text-xs py-0.5">
                                        {ind}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <button
                            className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors cursor-pointer"
                            onClick={handleCardClick}
                        >
                            Ver detalles
                        </button>
                    </div>
                </div>
            </div>

            <StartupSideModal
                startup={startup}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}
