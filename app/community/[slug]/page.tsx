import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Facebook, Github, Globe, Instagram, Linkedin, Mail, MapPin, MessageSquare, Twitter, Youtube } from 'lucide-react';
import { COMMUNITIES } from '../../data/communities';
import { findCommunityBySlug, getCommunitySlug } from '../../lib/slug';
import { addUTMParams } from '../../lib/utm';
import { breadcrumbSchema, communitySchema } from '../../lib/structured-data';
import Badge from '../../components/ui/Badge';
import TrackedLink from '../../components/ui/TrackedLink';

export const revalidate = 3600;

interface CommunityDetailPageProps {
    params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
    return COMMUNITIES.map((community) => ({
        slug: getCommunitySlug(community),
    }));
}

export async function generateMetadata({ params }: CommunityDetailPageProps): Promise<Metadata> {
    const { slug } = await params;
    const community = findCommunityBySlug(COMMUNITIES, slug);

    if (!community) {
        return {
            title: 'Comunidad no encontrada',
        };
    }

    const canonicalSlug = getCommunitySlug(community);
    const shortDesc = community.description.length > 160
        ? `${community.description.slice(0, 157)}...`
        : community.description;
    const title = `${community.name} | Comunidad Tech en ${community.city}`;
    const ogImage = community.logo_url && !community.logo_url.endsWith('.svg')
        ? community.logo_url
        : 'https://peruanos.dev/images/og-image.png';

    return {
        title,
        description: shortDesc,
        keywords: [community.name, community.city, ...community.topics, 'comunidad tech peru'],
        alternates: {
            canonical: `/community/${canonicalSlug}`,
        },
        openGraph: {
            title,
            description: shortDesc,
            url: `https://peruanos.dev/community/${canonicalSlug}`,
            images: [
                {
                    url: ogImage,
                    alt: community.name,
                },
            ],
            siteName: 'Peruanos.dev',
            locale: 'es_PE',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description: shortDesc,
            images: [ogImage],
            creator: '@lperezp_pe',
        },
    };
}

export default async function CommunityDetailPage({ params }: CommunityDetailPageProps) {
    const { slug } = await params;
    const community = findCommunityBySlug(COMMUNITIES, slug);

    if (!community) {
        notFound();
    }

    const canonicalSlug = getCommunitySlug(community);
    const canonicalUrl = `https://peruanos.dev/community/${canonicalSlug}`;

    const socialLinks = [
        { key: 'github', icon: Github, url: community.contact.socialMedia.github },
        { key: 'twitter', icon: Twitter, url: community.contact.socialMedia.twitter },
        { key: 'linkedin', icon: Linkedin, url: community.contact.socialMedia.linkedin },
        { key: 'discord', icon: MessageSquare, url: community.contact.socialMedia.discord },
        { key: 'facebook', icon: Facebook, url: community.contact.socialMedia.facebook },
        { key: 'youtube', icon: Youtube, url: community.contact.socialMedia.youtube },
        { key: 'instagram', icon: Instagram, url: community.contact.socialMedia.instagram },
    ].filter((link) => Boolean(link.url));

    const otherCommunities = COMMUNITIES
        .filter((item) => item.name !== community.name)
        .sort((a, b) => Number(b.city === community.city) - Number(a.city === community.city))
        .slice(0, 3);

    const jsonLdCommunity = communitySchema({
        name: community.name,
        description: community.description,
        url: community.contact?.website || '',
        logo: community.logo_url || '',
        location: community.city || 'Perú',
    });

    const jsonLdBreadcrumbs = breadcrumbSchema([
        { name: 'Inicio', url: 'https://peruanos.dev' },
        { name: 'Comunidades', url: 'https://peruanos.dev/community' },
        { name: community.name, url: canonicalUrl },
    ]);

    return (
        <main className="flex w-full max-w-5xl flex-col bg-background mx-auto px-6 sm:px-10 py-12 sm:py-16">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdCommunity) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumbs) }}
            />

            <Link
                href="/community"
                className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-primary-text transition-colors mb-8 w-fit"
            >
                <ArrowLeft size={16} />
                Volver a todas las comunidades
            </Link>

            <article className="flex flex-col gap-8">
                <div className="flex flex-col sm:flex-row gap-8 items-start">
                    <div className="relative w-40 h-40 sm:w-52 sm:h-52 rounded-xl overflow-hidden shrink-0 border border-border bg-hover/40">
                        {community.logo_url ? (
                            <Image
                                src={community.logo_url}
                                alt={community.name}
                                fill
                                sizes="(max-width: 768px) 160px, 208px"
                                className="object-contain p-4"
                                priority
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400" />
                        )}
                    </div>

                    <div className="flex flex-col gap-4 flex-1">
                        <h1 className="text-3xl sm:text-5xl font-bold text-foreground leading-tight">
                            {community.name}
                        </h1>
                        <div className="flex items-center gap-2 text-accent">
                            <MapPin size={18} />
                            <span className="font-medium">{community.city}, Perú</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {community.topics.map((topic) => (
                                <Badge key={topic} variant="outline">{topic}</Badge>
                            ))}
                        </div>
                    </div>
                </div>

                <section>
                    <h2 className="text-xl font-semibold text-foreground mb-3">Acerca de la comunidad</h2>
                    <p className="text-accent whitespace-pre-wrap leading-relaxed">
                        {community.description}
                    </p>
                </section>

                {(socialLinks.length > 0 || community.contact.email) && (
                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-3">Canales y redes sociales</h2>
                        <div className="flex flex-wrap gap-3">
                            {socialLinks.map(({ key, icon: Icon, url }) => (
                                <TrackedLink
                                    key={key}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 bg-hover rounded-full hover:bg-primary hover:text-white transition-colors text-accent flex items-center justify-center"
                                    eventName="click_community_social"
                                    eventParams={{ event_name: community.name, event_link: url, section: 'CommunityDetail' }}
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
                                    eventParams={{ event_name: community.name, event_link: `mailto:${community.contact.email}`, section: 'CommunityDetail' }}
                                    aria-label={`Enviar correo a ${community.name}`}
                                >
                                    <Mail size={20} />
                                </TrackedLink>
                            )}
                        </div>
                    </section>
                )}

                {community.contact.website && (
                    <div className="pt-2">
                        <TrackedLink
                            href={addUTMParams(community.contact.website)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-white font-semibold rounded-full hover:bg-primary-hover transition-colors"
                            eventName="click_visit_community"
                            eventParams={{ event_name: community.name, event_link: community.contact.website, section: 'CommunityDetail' }}
                        >
                            <span>Visitar página de la comunidad</span>
                            <Globe size={18} />
                        </TrackedLink>
                    </div>
                )}
            </article>

            {otherCommunities.length > 0 && (
                <section className="mt-16 pt-10 border-t border-border">
                    <h2 className="text-2xl font-bold text-foreground mb-6">Otras comunidades tech en Perú</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        {otherCommunities.map((other) => (
                            <Link
                                key={other.name}
                                href={`/community/${getCommunitySlug(other)}`}
                                className="p-5 rounded-lg border border-border bg-background hover:border-primary/50 transition-colors flex flex-col gap-2"
                            >
                                <span className="text-xs font-semibold text-primary-text">{other.city}</span>
                                <h3 className="font-bold text-foreground">{other.name}</h3>
                                <p className="text-sm text-accent line-clamp-2">{other.description}</p>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}
