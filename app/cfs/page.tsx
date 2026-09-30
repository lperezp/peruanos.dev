import Link from 'next/link';
import type { Metadata } from 'next';
import CfsClient from '../components/cfs/CfsClient';
import { addUTMParams } from '../lib/utm';

export const metadata: Metadata = {
    title: 'Call for Speakers | Convocatorias para Speakers Tech en Perú',
    description: 'Directorio centralizado de Call for Speakers (CFS) y convocatorias de ponentes para eventos, conferencias y meetups de la comunidad tech en Perú.',
    keywords: ['call for speakers', 'cfs', 'speakers peru', 'conferencias tech', 'meetups peru', 'charlas tecnologia', 'comunidad tech', 'desarrolladores peru'],
    authors: [{ name: 'Luis Eduardo', url: 'https://lperezp.dev' }],
    openGraph: {
        title: 'Call for Speakers | Convocatorias Tech en Perú',
        description: 'Encuentra oportunidades para dar charlas y workshops en eventos y comunidades tecnológicas de Perú.',
        url: 'https://peruanos.dev/cfs',
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
        title: 'Call for Speakers | Convocatorias Tech en Perú',
        description: 'Encuentra oportunidades para dar charlas y workshops en eventos y comunidades tecnológicas de Perú.',
        images: 'https://peruanos.dev/images/og-image.png',
        creator: '@lperezp_pe',
    },
};

export default function CfsPage() {
    return (
        <main className="flex w-full max-w-7xl flex-col items-center bg-background mx-auto">
            <section className="py-20 flex flex-col items-start w-full px-8 sm:px-10">
                <h1 className="text-4xl sm:text-6xl text-left font-bold mb-4 leading-[1.4] w-full">
                    Call for <span className="text-primary-text">Speakers</span>
                </h1>
                <p className="text-left mb-6 w-full sm:text-[20px] text-accent">
                    Directorio centralizado de convocatorias para speakers en el Perú. Si deseas compartir tus conocimientos, experiencias o proyectos con la comunidad tech, explora las convocatorias abiertas y postula a tu próximo evento o meetup.
                </p>
                <div className="flex flex-wrap gap-4 items-center">
                    <Link
                        className="px-6 py-3 text-center bg-primary text-white rounded-full hover:bg-primary-hover transition"
                        href={addUTMParams('https://github.com/lperezp/peruanos.dev/issues/new?template=cfs.yml')}
                        target='_blank'
                        rel="noopener noreferrer"
                    >
                        Publicar un Call for Speakers
                    </Link>
                </div>

                <CfsClient />
            </section>
        </main>
    );
}
