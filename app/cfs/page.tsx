import type { Metadata } from 'next';
import CfsClient from '../components/cfs/CfsClient';
import TrackedLink from '../components/ui/TrackedLink';
import FaqSection from '../components/ui/FaqSection';
import { addUTMParams } from '../lib/utm';
import { CFS_LIST } from '../data/cfs';
import { breadcrumbSchema, cfsSchema, faqPageSchema, itemListSchema } from '../lib/structured-data';

export const metadata: Metadata = {
    title: 'Call for Speakers | Convocatorias para Speakers Tech en Perú',
    description: 'Directorio centralizado de Call for Speakers (CFS) y convocatorias de ponentes para eventos, conferencias y meetups de la comunidad tech en Perú.',
    keywords: ['call for speakers', 'cfs', 'speakers peru', 'conferencias tech', 'meetups peru', 'charlas tecnologia', 'comunidad tech', 'desarrolladores peru'],
    authors: [{ name: 'Luis Eduardo', url: 'https://lperezp.dev' }],
    alternates: {
        canonical: '/cfs',
    },
    openGraph: {
        title: 'Call for Speakers | Convocatorias Tech en Perú',
        description: 'Encuentra oportunidades para dar charlas y workshops en eventos y comunidades tecnológicas de Perú.',
        url: 'https://peruanos.dev/cfs',
        images: [
            {
                url: 'https://peruanos.dev/images/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Call for Speakers Tech en Perú - Peruanos.dev',
            }
        ],
        siteName: 'Peruanos.dev',
        locale: 'es_PE',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Call for Speakers | Convocatorias Tech en Perú',
        description: 'Encuentra oportunidades para dar charlas y workshops en eventos y comunidades tecnológicas de Perú.',
        images: ['https://peruanos.dev/images/og-image.png'],
        creator: '@lperezp_pe',
    },
};

export default function CfsPage() {
    const activeCfs = CFS_LIST.filter((cfs) => cfs.status !== 'closed');
    const jsonLdCfs = itemListSchema(activeCfs.map((cfs) => cfsSchema(cfs)));

    const jsonLdBreadcrumbs = breadcrumbSchema([
        { name: 'Inicio', url: 'https://peruanos.dev' },
        { name: 'Call for Speakers', url: 'https://peruanos.dev/cfs' },
    ]);

    const cfsFaqs = [
        {
            question: '¿Qué es un Call for Speakers (CFS) o Call for Papers?',
            answer: 'Es una convocatoria abierta en la que eventos y comunidades tecnológicas invitan a desarrolladores, diseñadores y especialistas a enviar propuestas de charlas o talleres para participar como ponentes.',
        },
        {
            question: '¿Cómo postular como speaker en conferencias tech en Perú?',
            answer: `Explora las ${activeCfs.length} convocatorias activas listadas en esta página, filtra por tu área de especialidad y haz clic en "Postular como Speaker" para enviar tu propuesta en la plataforma del evento (como Sessionize).`,
        },
        {
            question: '¿Necesito experiencia previa dando charlas para postular?',
            answer: 'No siempre. Muchos meetups y conferencias en Perú aceptan charlas introductorias y a nuevos speakers (first-time speakers), valorando casos prácticos reales y ganas de compartir.',
        },
        {
            question: '¿Cómo publicar una convocatoria de speakers de mi comunidad o evento?',
            answer: 'Haz clic en "Publicar un Call for Speakers" para enviar tu convocatoria vía GitHub Issues o abre un Pull Request en app/data/cfs.ts.',
        },
    ];

    const jsonLdFaq = faqPageSchema(cfsFaqs);

    return (
        <main className="flex w-full max-w-7xl flex-col items-center bg-background mx-auto">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdCfs) }}
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
                    Call for <span className="text-primary-text">Speakers</span>
                </h1>
                <p className="text-left mb-3 w-full sm:text-[20px] text-accent">
                    Directorio centralizado de convocatorias para speakers en el Perú. Si deseas compartir tus conocimientos, experiencias o proyectos con la comunidad tech, explora las convocatorias abiertas y postula a tu próximo evento o meetup.
                </p>
                <p className="text-left mb-6 w-full text-sm sm:text-base text-accent">
                    Actualmente hay {activeCfs.length} {activeCfs.length === 1 ? 'convocatoria activa' : 'convocatorias activas'} de {CFS_LIST.length} registradas en Perú.
                </p>
                <div className="flex flex-wrap gap-4 items-center">
                    <TrackedLink
                        className="px-6 py-3 text-center bg-primary text-white rounded-full hover:bg-primary-hover transition"
                        href={addUTMParams('https://github.com/lperezp/peruanos.dev/issues/new?template=cfs.yml')}
                        target='_blank'
                        rel="noopener noreferrer"
                        eventName="click_publish_cfs"
                        eventParams={{ event_name: 'Publicar un Call for Speakers', event_link: 'https://github.com/lperezp/peruanos.dev/issues/new?template=cfs.yml', section: 'CFS' }}
                    >
                        Publicar un Call for Speakers
                    </TrackedLink>
                </div>

                <CfsClient />

                <FaqSection title="Preguntas frecuentes sobre Call for Speakers" faqs={cfsFaqs} />
            </section>
        </main>
    );
}
