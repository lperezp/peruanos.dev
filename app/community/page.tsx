import Link from 'next/link';
import type { Metadata } from 'next';
import CommunityClient from '../components/communities/CommunityClient';
import { addUTMParams } from '../lib/utm';

export const metadata: Metadata = {
    title: 'Comunidades tecnológicas en Perú | Peruanos.dev',
    description: 'Únete a comunidades de desarrolladores, grupos de usuarios y espacios de aprendizaje tech en Perú. Descubre Angular Perú, GDG, Python Perú y más.',
    keywords: ['comunidades tech peru', 'grupos desarrolladores peru', 'comunidad programadores', 'user groups peru', 'tech communities lima'],
    openGraph: {
        title: 'Comunidades tecnológicas en Perú | Peruanos.dev',
        description: 'Únete a comunidades de desarrolladores, grupos de usuarios y espacios de aprendizaje tech en Perú.',
        url: 'https://peruanos.dev/community',
        siteName: 'Peruanos.dev',
        locale: 'es_PE',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Comunidades tecnológicas en Perú | Peruanos.dev',
        description: 'Únete a comunidades de desarrolladores, grupos de usuarios y espacios de aprendizaje tech en Perú.',
    },
};

export default function Community() {
    return (
        <main className="flex w-full max-w-7xl flex-col items-center bg-background mx-auto">
            <section className="py-20 flex flex-col items-start w-full px-8 sm:px-10">
                <h1 className="text-4xl sm:text-6xl text-left font-bold mb-4 leading-[1.4] w-full">Comunidades</h1>
                <p className="text-left mb-4 w-full sm:text-[20px]">
                    Descubre y únete a las comunidades que impulsan la tecnología en el Perú. ¿Organizas una comunidad? ¡Agrégala a la lista!
                </p>
                <Link
                    className="px-6 py-3 text-center bg-primary text-white rounded-full hover:bg-primary-hover transition"
                    href={addUTMParams('https://github.com/lperezp/peruanos.dev/issues/new?template=community.yml')}
                    target='_blank'
                    rel="noopener noreferrer"
                >
                    Publicar una comunidad
                </Link>

                <CommunityClient />
            </section>
        </main>
    );
}


