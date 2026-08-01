import { useEffect } from 'react';
import Image from 'next/image';
import { MapPin, Globe, Github, Twitter, Linkedin, MessageSquare, Facebook, Youtube, Instagram, Mail } from 'lucide-react';
import { ICommunity } from '@/app/models/community.model';
import SideModal from '../ui/SideModal';
import Badge from '../ui/Badge';
import TrackedLink from '../ui/TrackedLink';
import { addUTMParams } from '@/app/lib/utm';

interface CommunitySideModalProps {
    community: ICommunity;
    isOpen: boolean;
    onClose: () => void;
}

export default function CommunitySideModal({ community, isOpen, onClose }: CommunitySideModalProps) {
    useEffect(() => {
        if (isOpen) {
            if (typeof window !== 'undefined' && 'gtag' in window && typeof window.gtag === 'function') {
                window.gtag('event', 'view_community', {
                    community_name: community.name,
                    community_city: community.city
                });
            }

            const slug = encodeURIComponent(community.name.toLowerCase().replace(/ /g, '-'));
            window.history.pushState(null, '', `?community=${slug}`);
        } else {
            // Restore URL if closed, ensuring we only do this if it was previously set by us
            const url = new URL(window.location.href);
            if (url.searchParams.has('community')) {
                url.searchParams.delete('community');
                window.history.pushState(null, '', url.pathname + url.search);
            }
        }
    }, [isOpen, community.name, community.city]);

    const socialLinks = [
        { key: 'github', icon: Github, url: community.contact.socialMedia.github },
        { key: 'twitter', icon: Twitter, url: community.contact.socialMedia.twitter },
        { key: 'linkedin', icon: Linkedin, url: community.contact.socialMedia.linkedin },
        { key: 'discord', icon: MessageSquare, url: community.contact.socialMedia.discord },
        { key: 'facebook', icon: Facebook, url: community.contact.socialMedia.facebook },
        { key: 'youtube', icon: Youtube, url: community.contact.socialMedia.youtube },
        { key: 'instagram', icon: Instagram, url: community.contact.socialMedia.instagram },
    ].filter(link => link.url);

    return (
        <SideModal isOpen={isOpen} onClose={onClose} title="Detalles de la Comunidad">
            <div className="flex flex-col gap-6 pb-20">
                <div className="relative w-full aspect-square h-auto rounded-lg overflow-hidden shrink-0 flex items-center justify-center bg-hover/50 p-6 border border-border">
                    {community.logo_url ? (
                        <Image
                            src={community.logo_url}
                            alt={community.name}
                            fill
                            className="object-contain p-4"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 rounded-lg" />
                    )}
                </div>

                <div>
                    <h1 className="text-2xl font-bold text-foreground mb-2 break-words">{community.name}</h1>
                    <div className="flex items-start gap-2 text-accent mb-4">
                        <MapPin size={18} className="shrink-0 mt-1" />
                        <span className="font-medium break-words">{community.city}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {community.topics.map((topic) => (
                            <Badge key={topic} variant="outline">{topic}</Badge>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Acerca de nosotros</h3>
                    <p className="text-accent whitespace-pre-wrap leading-relaxed break-words">
                        {community.description}
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
                                    eventName="click_community_social"
                                    eventParams={{ community_name: community.name, social_network: key }}
                                    aria-label={`Visitar ${key} de ${community.name}`}
                                >
                                    <Icon size={20} />
                                </TrackedLink>
                            ))}
                            {community.contact.email && (
                                <TrackedLink
                                    href={`mailto:${community.contact.email}`}
                                    className="p-3 bg-hover rounded-full hover:bg-primary hover:text-white transition-colors text-accent flex items-center justify-center"
                                    eventName="click_community_email"
                                    eventParams={{ community_name: community.name }}
                                    aria-label={`Enviar correo a ${community.name}`}
                                >
                                    <Mail size={20} />
                                </TrackedLink>
                            )}
                        </div>
                    </div>
                )}

                <div className="fixed bottom-0 right-0 w-full max-w-md md:max-w-lg lg:max-w-xl bg-background border-t border-border p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                    <TrackedLink
                        href={addUTMParams(community.contact.website)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover transition-colors"
                        eventName="click_visit_community"
                        eventParams={{ community_name: community.name, community_city: community.city }}
                    >
                        Página de la comunidad
                        <Globe size={18} />
                    </TrackedLink>
                </div>
            </div>
        </SideModal>
    );
}
