import type { Metadata } from 'next';
import EventsClient from '../components/events/EventsClient';
import TrackedLink from '../components/ui/TrackedLink';
import FaqSection from '../components/ui/FaqSection';
import { addUTMParams } from '../lib/utm';
import { EVENTS } from '../data/events';
import { breadcrumbSchema, eventSchema, faqPageSchema, itemListSchema } from '../lib/structured-data';

export const metadata: Metadata = {
    title: 'Eventos tecnológicos en Perú',
    description: 'Descubre meetups, conferencias, workshops y hackathons organizados por la comunidad tech en Perú. Conecta con desarrolladores y aprende nuevas tecnologías.',
    keywords: ['eventos', 'tech', 'meetups', 'conferencias', 'tecnología', 'workshops', 'desarrollo', 'hackathons', 'peru', 'comunidad', 'desarrolladores'],
    authors: [{ name: 'Luis Eduardo', url: 'https://lperezp.dev' }],
    alternates: {
        canonical: '/events',
    },
    openGraph: {
        title: 'Eventos tecnológicos en Perú',
        description: 'Descubre meetups, conferencias, workshops y hackathons organizados por la comunidad tech en Perú.',
        url: 'https://peruanos.dev/events',
        images: [
            {
                url: 'https://peruanos.dev/images/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Eventos tecnológicos en Perú - Peruanos.dev',
            }
        ],
        siteName: 'Peruanos.dev',
        locale: 'es_PE',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Eventos tecnológicos en Perú',
        description: 'Descubre meetups, conferencias, workshops y hackathons organizados por la comunidad tech en Perú.',
        images: ['https://peruanos.dev/images/og-image.png'],
        creator: '@lperezp_pe',
    },
};

export const revalidate = 3600;

export default function Events() {
    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Lima' });
    const upcomingEvents = EVENTS.filter(event => event.date >= today);

    const jsonLdEvents = itemListSchema(upcomingEvents.map(event => eventSchema({
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
    })));

    const jsonLdBreadcrumbs = breadcrumbSchema([
        { name: 'Inicio', url: 'https://peruanos.dev' },
        { name: 'Eventos', url: 'https://peruanos.dev/events' },
    ]);

    const activeCities = Array.from(
        new Set((upcomingEvents.length > 0 ? upcomingEvents : EVENTS).map((event) => event.city).filter((city) => city !== 'Virtual'))
    ).sort();

    const eventFaqs = [
        {
            question: '¿Cómo encontrar eventos de tecnología en Perú?',
            answer: `En Peruanos.dev puedes filtrar eventos tecnológicos registrados (${upcomingEvents.length} próximos en cartelera) por ciudad, temática (IA, Cloud, DevOps, Web, Mobile, Ciberseguridad) y modalidad (Presencial, Virtual o Híbrido).`,
        },
        {
            question: '¿En qué ciudades del Perú hay meetups y conferencias tech?',
            answer: `Además de Lima y Callao, las comunidades organizan eventos presenciales e híbridos en regiones como ${activeCities.filter((c) => c !== 'Lima' && c !== 'Callao').slice(0, 6).join(', ') || 'Piura, Arequipa, Trujillo, Cusco y Chimbote'}.`,
        },
        {
            question: '¿Los eventos publicados en Peruanos.dev son gratuitos?',
            answer: 'La mayoría de meetups comunitarios y grupos de usuarios en Perú son gratuitos con registro previo. Algunas conferencias anuales como DevOpsDays Lima o F13 cuentan con entradas pagadas que se detallan en su página de registro.',
        },
        {
            question: '¿Cómo puedo publicar un evento tecnológico en Peruanos.dev?',
            answer: 'Haz clic en "Publicar un evento" para abrir la plantilla en GitHub o envía un Pull Request agregando los datos del evento en app/data/events.ts.',
        },
    ];

    const jsonLdFaq = faqPageSchema(eventFaqs);

    return (
        <main className="flex w-full max-w-7xl flex-col items-center bg-background mx-auto">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdEvents) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumbs) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
            />
            <section className="py-20 flex flex-col items-start w-full px-8 sm:px-10">
                <h1 className="text-4xl sm:text-6xl text-left font-bold mb-4 leading-[1.4] w-full">
                    Próximos <span className="text-primary-text">eventos</span>
                </h1>
                <p className="text-left mb-3 w-full sm:text-[20px]">
                    Conecta con la comunidad tech peruana en eventos, meetups y conferencias. ¿Organizas un evento? ¡Agrégalo a la lista!
                </p>
                <p className="text-left mb-6 w-full text-sm sm:text-base text-accent">
                    Cartelera actualizada con {upcomingEvents.length} eventos próximos y {EVENTS.length} eventos registrados en Perú en ciudades como {activeCities.slice(0, 6).join(', ')} y modalidad virtual.
                </p>
                <TrackedLink
                    className="px-6 py-3 text-center bg-primary text-white rounded-full hover:bg-primary-hover transition"
                    href={addUTMParams('https://github.com/lperezp/peruanos.dev/issues/new?template=event.yml')}
                    target='_blank'
                    rel="noopener noreferrer"
                    eventName="click_publish_event"
                    eventParams={{ event_name: 'Publicar un evento', event_link: 'https://github.com/lperezp/peruanos.dev/issues/new?template=event.yml', section: 'Events' }}
                >
                    Publicar un evento
                </TrackedLink>

                <EventsClient />

                <FaqSection title="Preguntas frecuentes sobre eventos tech en Perú" faqs={eventFaqs} />
            </section>
        </main>
    );
}


