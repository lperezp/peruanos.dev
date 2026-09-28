import Link from 'next/link';
import type { Metadata } from 'next';
import StartupClient from '../components/startups/StartupClient';
import { addUTMParams } from '../lib/utm';
import { STARTUPS } from '../data/startups';
import { startupSchema, itemListSchema } from '../lib/structured-data';

export const metadata: Metadata = {
    title: 'Startups Peruanas | Directorio de Startups de Tecnología',
    description: 'Descubre las startups tecnológicas del Perú. Encuentra empresas emergentes en Fintech, Edtech, E-commerce, SaaS, oportunidades laborales y más.',
    keywords: ['startups peru', 'tech startups peru', 'startups tecnologia lima', 'fintech peru', 'edtech peru', 'empleos tech peru'],
    authors: [{ name: 'Luis Eduardo', url: 'https://lperezp.dev' }],
    openGraph: {
        title: 'Startups Peruanas | Directorio de Startups de Tecnología',
        description: 'Descubre las startups tecnológicas que están transformando el ecosistema tech en el Perú.',
        url: 'https://peruanos.dev/startups',
        images: [
            {
                url: 'https://peruanos.dev/images/og-image.png',
            }
        ],
        siteName: 'Peruanos.dev',
        locale: 'es_PE',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Startups Peruanas | Directorio de Startups de Tecnología',
        description: 'Descubre las startups tecnológicas que están transformando el ecosistema tech en el Perú.',
        images: 'https://peruanos.dev/images/og-image.png',
        creator: '@lperezp_pe',
    },
};

export default function Startups() {
    const jsonLdStartups = itemListSchema(STARTUPS.map(startup => startupSchema({
        name: startup.name,
        description: startup.description,
        url: startup.website,
        logo: startup.logo,
        location: startup.location,
        industry: startup.industry,
    })));

    return (
        <main className="flex w-full max-w-7xl flex-col items-center bg-background mx-auto">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdStartups) }}
            />
            <section className="py-20 flex flex-col items-start w-full px-8 sm:px-10">
                <h1 className="text-4xl sm:text-6xl text-left font-bold mb-4 leading-[1.4] w-full">Startups</h1>
                <p className="text-left mb-4 w-full sm:text-[20px]">
                    Descubre las empresas tecnológicas e innovadoras que están transformando el ecosistema en el Perú. ¿Fundas u organizas una startup? ¡Agrégala a la lista!
                </p>
                <Link
                    className="px-6 py-3 text-center bg-primary text-white rounded-full hover:bg-primary-hover transition"
                    href={addUTMParams('https://github.com/lperezp/peruanos.dev/issues/new?template=startup.yml')}
                    target='_blank'
                    rel="noopener noreferrer"
                >
                    Publicar una startup
                </Link>

                <StartupClient />
            </section>
        </main>
    );
}
