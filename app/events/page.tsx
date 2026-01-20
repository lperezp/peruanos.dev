import Link from 'next/link';
import type { Metadata } from 'next';
import EventsClient from '../components/events/EventsClient';
import { addUTMParams } from '../lib/utm';

export const metadata: Metadata = {
    title: 'Eventos tecnológicos en Perú | Peruanos.dev',
    description: 'Descubre meetups, conferencias, workshops y hackathons organizados por la comunidad tech en Perú. Conecta con desarrolladores y aprende nuevas tecnologías.',
    keywords: ['eventos tech peru', 'meetups peru', 'conferencias tecnología', 'workshops desarrollo', 'hackathons peru', 'comunidad desarrolladores peru'],
    openGraph: {
        title: 'Eventos tecnológicos en Perú | Peruanos.dev',
        description: 'Descubre meetups, conferencias, workshops y hackathons organizados por la comunidad tech en Perú.',
        url: 'https://peruanos.dev/events',
        siteName: 'Peruanos.dev',
        locale: 'es_PE',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Eventos tecnológicos en Perú | Peruanos.dev',
        description: 'Descubre meetups, conferencias, workshops y hackathons organizados por la comunidad tech en Perú.',
    },
};

export default function Events() {
    return (
        <main className="flex w-full max-w-7xl flex-col items-center bg-background mx-auto">
            <section className="py-20 flex flex-col items-start w-full px-8 sm:px-10">
                <h1 className="text-4xl sm:text-6xl text-left font-bold mb-4 leading-[1.4] w-full">
                    Próximos <span className="text-primary-text">eventos</span>
                </h1>
                <p className="text-left mb-4 w-full sm:text-[20px]">
                    Conecta con la comunidad tech peruana en eventos, meetups y conferencias. ¿Organizas un evento? ¡Agrégalo a la lista!
                </p>
                <Link
                    className="px-6 py-3 text-center bg-primary text-white rounded-full hover:bg-primary-hover transition"
                    href={addUTMParams('https://github.com/lperezp/peruanos.dev/issues/new?template=event.yml')}
                    target='_blank'
                    rel="noopener noreferrer"
                >
                    Publicar un evento
                </Link>

                <EventsClient />
            </section>
        </main>
    );
}


