'use client';

import { useState } from 'react';
import { Startup } from '@/app/models/startup.model';
import StartupSideModal from './StartupSideModal';
import { Briefcase, MapPin } from 'lucide-react';

export default function StartupCardHome({ startup }: { startup: Startup }) {
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
                className="p-6 bg-background border border-accent rounded-lg flex-1 max-w-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md hover:border-primary/50 cursor-pointer flex flex-col justify-between"
                onClick={handleCardClick}
            >
                <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                        <p className="text-[20px] text-foreground font-bold truncate">{startup.name}</p>
                        {startup.hiring && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 whitespace-nowrap shrink-0">
                                <Briefcase size={12} />
                                Hiring
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-accent mb-3">
                        <MapPin size={14} className="shrink-0" />
                        <span>{startup.location}</span>
                        {startup.stage && (
                            <>
                                <span>•</span>
                                <span className="font-semibold text-primary-text">{startup.stage}</span>
                            </>
                        )}
                    </div>
                    <p className="font-medium text-accent line-clamp-3 mb-4 leading-relaxed">{startup.description}</p>
                </div>
                <button
                    className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors cursor-pointer font-semibold"
                    onClick={handleCardClick}
                >
                    Ver detalles
                </button>
            </div>
            <StartupSideModal
                startup={startup}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}
