'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { MapPin, Globe, Github, Twitter, Linkedin, Briefcase } from 'lucide-react';
import { Startup } from '@/app/models/startup.model';
import SideModal from '../ui/SideModal';
import Badge from '../ui/Badge';
import TrackedLink from '../ui/TrackedLink';
import { addUTMParams } from '@/app/lib/utm';
import { trackEvent } from '@/app/lib/analytics';

interface StartupSideModalProps {
    startup: Startup;
    isOpen: boolean;
    onClose: () => void;
}

export default function StartupSideModal({ startup, isOpen, onClose }: StartupSideModalProps) {
    useEffect(() => {
        if (isOpen) {
            trackEvent('view_startup', { event_name: startup.name, section: 'Startups' });

            const slug = encodeURIComponent(startup.name.toLowerCase().replace(/ /g, '-'));
            window.history.pushState(null, '', `?startup=${slug}`);
        } else {
            const url = new URL(window.location.href);
            if (url.searchParams.has('startup')) {
                url.searchParams.delete('startup');
                window.history.pushState(null, '', url.pathname + url.search);
            }
        }
    }, [isOpen, startup.name, startup.location]);

    const socialLinks = [
        { key: 'linkedin', icon: Linkedin, url: startup.socials?.linkedin },
        { key: 'twitter', icon: Twitter, url: startup.socials?.twitter },
        { key: 'github', icon: Github, url: startup.socials?.github },
    ].filter((link): link is { key: string; icon: typeof Linkedin; url: string } => Boolean(link.url));

    return (
        <SideModal isOpen={isOpen} onClose={onClose} title="Detalles de la Startup">
            <div className="flex flex-col gap-6 pb-28">
                <div className="relative w-full aspect-square h-auto rounded-lg overflow-hidden shrink-0 flex items-center justify-center bg-hover/50 p-6 border border-border">
                    {startup.logo ? (
                        <Image
                            src={startup.logo}
                            alt={startup.name}
                            fill
                            className="object-contain p-4"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 rounded-lg" />
                    )}
                </div>

                <div>
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h1 className="text-2xl font-bold text-foreground break-words">{startup.name}</h1>
                        {startup.hiring && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                Estamos Contratando
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-2 text-accent mb-4">
                        <MapPin size={18} className="shrink-0" />
                        <span className="font-medium break-words">{startup.location}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {startup.stage && (
                            <Badge variant="default" className="bg-primary/10 text-primary-text font-semibold">
                                {startup.stage}
                            </Badge>
                        )}
                        {startup.industry.map((ind) => (
                            <Badge key={ind} variant="outline">{ind}</Badge>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Acerca de la startup</h3>
                    <p className="text-accent whitespace-pre-wrap leading-relaxed break-words">
                        {startup.description}
                    </p>
                </div>

                {socialLinks.length > 0 && (
                    <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Redes Sociales</h3>
                        <div className="flex flex-wrap gap-3">
                            {socialLinks.map(({ key, icon: Icon, url }) => (
                                <TrackedLink
                                    key={key}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 bg-hover rounded-full hover:bg-primary hover:text-white transition-colors text-accent flex items-center justify-center"
                                    eventName="click_startup_social"
                                    eventParams={{ event_name: startup.name, event_link: url, section: 'Startups' }}
                                    aria-label={`Visitar ${key} de ${startup.name}`}
                                >
                                    <Icon size={20} />
                                </TrackedLink>
                            ))}
                        </div>
                    </div>
                )}

                <div className="fixed bottom-0 right-0 w-full max-w-md md:max-w-lg lg:max-w-xl bg-background border-t border-border p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex flex-col sm:flex-row gap-3">
                    {startup.careersUrl && startup.hiring && (
                        <TrackedLink
                            href={addUTMParams(startup.careersUrl)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 flex-1 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
                            eventName="click_startup_careers"
                            eventParams={{ event_name: startup.name, event_link: startup.careersUrl, section: 'Startups' }}
                        >
                            Ver Vacantes
                            <Briefcase size={18} />
                        </TrackedLink>
                    )}
                    <TrackedLink
                        href={addUTMParams(startup.website)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 flex-1 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover transition-colors"
                        eventName="click_visit_startup"
                        eventParams={{ event_name: startup.name, event_link: startup.website, section: 'Startups' }}
                    >
                        Visitar Sitio Web
                        <Globe size={18} />
                    </TrackedLink>
                </div>
            </div>
        </SideModal>
    );
}
