import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, ExternalLink, MapPin, User } from 'lucide-react';
import { EVENTS } from '../../data/events';
import { getEventSlug, findEventBySlug } from '../../lib/slug';
import { addUTMParams } from '../../lib/utm';
import { breadcrumbSchema, eventSchema } from '../../lib/structured-data';
import Badge from '../../components/ui/Badge';
import TrackedLink from '../../components/ui/TrackedLink';
import ShareButton from '../../components/ui/ShareButton';

export const revalidate = 3600;

interface EventDetailPageProps {
    params: Promise<{ slug: string }>;
}

function cleanDescription(description: string): string {
    return description.replace(/\*\*/g, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
}

export function generateStaticParams() {
    return EVENTS.map((event) => ({
        slug: getEventSlug(event),
    }));
}

export async function generateMetadata({ params }: EventDetailPageProps): Promise<Metadata> {
    const { slug } = await params;
    const event = findEventBySlug(EVENTS, slug);

    if (!event) {
        return {
            title: 'Evento no encontrado',
        };
    }

    const canonicalSlug = getEventSlug(event);
    const cleanedDesc = cleanDescription(event.description);
    const shortDesc = cleanedDesc.length > 160 ? `${cleanedDesc.slice(0, 157)}...` : cleanedDesc;
    const title = `${event.title} | Evento Tech en ${event.city}`;
    const ogImage = event.image_url || 'https://peruanos.dev/images/og-image.png';

    return {
        title,
        description: shortDesc,
        keywords: [event.title, event.city, event.type, event.organizer, ...event.tags, 'eventos tech peru'],
        authors: [{ name: event.organizer || 'Peruanos.dev' }],
        alternates: {
            canonical: `/events/${canonicalSlug}`,
        },
        openGraph: {
            title,
            description: shortDesc,
            url: `https://peruanos.dev/events/${canonicalSlug}`,
            images: [
                {
                    url: ogImage,
                    alt: event.title,
                },
            ],
            siteName: 'Peruanos.dev',
            locale: 'es_PE',
            type: 'article',
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

export default async function EventDetailPage({ params }: EventDetailPageProps) {
    const { slug } = await params;
    const event = findEventBySlug(EVENTS, slug);

    if (!event) {
        notFound();
    }

    const canonicalSlug = getEventSlug(event);
    const canonicalUrl = `https://peruanos.dev/events/${canonicalSlug}`;

    const dateObj = new Date(event.date);
    const formattedDate = dateObj.toLocaleDateString('es-PE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
    });

    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Lima' });
    const relatedEvents = EVENTS
        .filter((item) => item.title !== event.title && item.date >= today)
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(0, 3);

    const jsonLdEvent = eventSchema({
        name: event.title,
        description: event.description,
        startDate: event.date,
        time: event.time,
        location: event.location,
        city: event.city,
        organizer: event.organizer || '',
        url: event.registration_url,
        image_url: event.image_url,
        type: event.type,
    });

    const jsonLdBreadcrumbs = breadcrumbSchema([
        { name: 'Inicio', url: 'https://peruanos.dev' },
        { name: 'Eventos', url: 'https://peruanos.dev/events' },
        { name: event.title, url: canonicalUrl },
    ]);

    return (
        <main className="flex w-full max-w-5xl flex-col bg-background mx-auto px-6 sm:px-10 py-12 sm:py-16">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdEvent) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumbs) }}
            />

            <Link
                href="/events"
                className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-primary-text transition-colors mb-8 w-fit"
            >
                <ArrowLeft size={16} />
                Volver a todos los eventos
            </Link>

            <article className="flex flex-col gap-8">
                <div className="relative w-full h-64 sm:h-96 rounded-xl overflow-hidden border border-border">
                    {event.image_url ? (
                        <Image
                            src={event.image_url}
                            alt={event.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 896px"
                            className="object-cover"
                            priority
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400" />
                    )}
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap gap-2">
                            <Badge>{event.type}</Badge>
                            {event.tags.map((tag) => (
                                <Badge key={tag} variant="outline">{tag}</Badge>
                            ))}
                        </div>
                        <ShareButton
                            title={event.title}
                            text={`¡Mira este evento en peruanos.dev! ${event.title}`}
                            url={canonicalUrl}
                            eventName="click_share_event"
                            eventParams={{ event_name: event.title, event_link: canonicalUrl, section: 'EventDetail' }}
                        />
                    </div>

                    <h1 className="text-3xl sm:text-5xl font-bold text-foreground leading-tight">
                        {event.title}
                    </h1>

                    {event.organizer && (
                        <div className="flex items-center gap-2 text-accent">
                            <User size={18} />
                            <span className="font-medium">Organizado por {event.organizer}</span>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-xl border border-border bg-hover/30">
                    <div className="flex items-center gap-3 text-foreground">
                        <Calendar size={20} className="text-primary shrink-0" />
                        <span className="capitalize text-sm sm:text-base">{formattedDate}</span>
                    </div>
                    {event.time && (
                        <div className="flex items-center gap-3 text-foreground">
                            <Clock size={20} className="text-primary shrink-0" />
                            <span className="text-sm sm:text-base">{event.time} (hora Perú)</span>
                        </div>
                    )}
                    <div className="flex items-start gap-3 text-foreground">
                        <MapPin size={20} className="text-primary shrink-0 mt-0.5" />
                        <span className="text-sm sm:text-base">{event.location} - {event.city}</span>
                    </div>
                </div>

                <section>
                    <h2 className="text-xl font-semibold text-foreground mb-3">Acerca de este evento</h2>
                    <p className="text-accent whitespace-pre-wrap leading-relaxed">
                        {event.description.replace(/\*\*/g, '')}
                    </p>
                </section>

                <div className="pt-2">
                    <TrackedLink
                        href={addUTMParams(event.registration_url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-white font-semibold rounded-full hover:bg-primary-hover transition-colors"
                        eventName="click_register_event"
                        eventParams={{ event_name: event.title, event_link: event.registration_url, section: 'EventDetail' }}
                    >
                        <span>Ir a la página del evento</span>
                        <ExternalLink size={18} />
                    </TrackedLink>
                </div>
            </article>

            {relatedEvents.length > 0 && (
                <section className="mt-16 pt-10 border-t border-border">
                    <h2 className="text-2xl font-bold text-foreground mb-6">Más eventos tecnológicos</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        {relatedEvents.map((related) => (
                            <Link
                                key={`${related.title}-${related.date}`}
                                href={`/events/${getEventSlug(related)}`}
                                className="p-5 rounded-lg border border-border bg-background hover:border-primary/50 transition-colors flex flex-col gap-2"
                            >
                                <span className="text-xs font-semibold text-primary-text">
                                    {related.date} · {related.city}
                                </span>
                                <h3 className="font-bold text-foreground line-clamp-2">{related.title}</h3>
                                <p className="text-sm text-accent line-clamp-2">
                                    {cleanDescription(related.description)}
                                </p>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}
