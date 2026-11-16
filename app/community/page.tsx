import type { Metadata } from 'next';
import CommunityClient from '../components/communities/CommunityClient';
import TrackedLink from '../components/ui/TrackedLink';
import FaqSection from '../components/ui/FaqSection';
import { addUTMParams } from '../lib/utm';
import { COMMUNITIES } from '../data/communities';
import { breadcrumbSchema, communitySchema, faqPageSchema, itemListSchema } from '../lib/structured-data';

export const metadata: Metadata = {
    title: 'Comunidades tecnológicas en Perú',
    description: 'Únete a comunidades de desarrolladores, grupos de usuarios y espacios de aprendizaje tech en Perú. Descubre Angular Perú, GDG, Python Perú y más.',
    keywords: ['comunidades tech peru', 'grupos desarrolladores peru', 'comunidad programadores', 'user groups peru', 'tech communities lima'],
    authors: [{ name: 'Luis Eduardo', url: 'https://lperezp.dev' }],
    alternates: {
        canonical: '/community',
    },
    openGraph: {
        title: 'Comunidades tecnológicas en Perú',
        description: 'Únete a comunidades de desarrolladores, grupos de usuarios y espacios de aprendizaje tech en Perú.',
        url: 'https://peruanos.dev/community',
        images: [
            {
                url: 'https://peruanos.dev/images/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Comunidades tecnológicas en Perú - Peruanos.dev',
            }
        ],
        siteName: 'Peruanos.dev',
        locale: 'es_PE',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Comunidades tecnológicas en Perú',
        description: 'Únete a comunidades de desarrolladores, grupos de usuarios y espacios de aprendizaje tech en Perú.',
        images: ['https://peruanos.dev/images/og-image.png'],
        creator: '@lperezp_pe',
    },
};

export default function Community() {
    const jsonLdCommunities = itemListSchema(COMMUNITIES.map(community => communitySchema({
        name: community.name,
        description: community.description,
        url: community.contact?.website || '',
        logo: community.logo_url || '',
        location: community.city || 'Perú',
    })));

    const jsonLdBreadcrumbs = breadcrumbSchema([
        { name: 'Inicio', url: 'https://peruanos.dev' },
        { name: 'Comunidades', url: 'https://peruanos.dev/community' },
    ]);

    const communityCities = Array.from(new Set(COMMUNITIES.map((c) => c.city))).sort();

    const communityFaqs = [
        {
            question: '¿Cuáles son las principales comunidades de programación y tecnología en Perú?',
            answer: `El directorio reúne comunidades activas en Perú, incluyendo grupos de desarrolladores como Angular Perú, GDG Lima, GDG Callao, Python Perú, Flutter Lima, AWS User Group, comunidades universitarias y espacios de IA, Cloud y Ciberseguridad.`,
        },
        {
            question: '¿Cómo unirse a una comunidad tech en Perú?',
            answer: 'Puedes explorar cada comunidad en la lista o abrir su página de detalle para acceder directamente a su sitio web oficial, Meetup, Discord, GitHub o redes sociales.',
        },
        {
            question: '¿Hay comunidades tecnológicas fuera de Lima?',
            answer: `Sí. Actualmente hay comunidades registradas en ${communityCities.join(', ')}, además de grupos con actividades virtuales abiertas a todo el país.`,
        },
        {
            question: '¿Cómo registrar una nueva comunidad en Peruanos.dev?',
            answer: 'Usa el botón "Publicar una comunidad" para enviar un issue en GitHub con los datos de tu comunidad o abre un Pull Request editando app/data/communities.ts.',
        },
    ];

    const jsonLdFaq = faqPageSchema(communityFaqs);

    return (
        <main className="flex w-full max-w-7xl flex-col items-center bg-background mx-auto">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdCommunities) }}
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
                    Comunidades <span className="text-primary-text">tecnológicas</span>
                </h1>
                <p className="text-left mb-3 w-full sm:text-[20px]">
                    Descubre y únete a las comunidades que impulsan la tecnología en el Perú. ¿Organizas una comunidad? ¡Agrégala a la lista!
                </p>
                <p className="text-left mb-6 w-full text-sm sm:text-base text-accent">
                    Directorio con comunidades tecnológicas en {communityCities.join(', ')}.
                </p>
                <TrackedLink
                    className="px-6 py-3 text-center bg-primary text-white rounded-full hover:bg-primary-hover transition"
                    href={addUTMParams('https://github.com/lperezp/peruanos.dev/issues/new?template=community.yml')}
                    target='_blank'
                    rel="noopener noreferrer"
                    eventName="click_publish_community"
                    eventParams={{ event_name: 'Publicar una comunidad', event_link: 'https://github.com/lperezp/peruanos.dev/issues/new?template=community.yml', section: 'Community' }}
                >
                    Publicar una comunidad
                </TrackedLink>

                <CommunityClient />

                <FaqSection title="Preguntas frecuentes sobre comunidades tech en Perú" faqs={communityFaqs} />
            </section>
        </main>
    );
}


