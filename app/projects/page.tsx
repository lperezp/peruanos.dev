import Link from 'next/link';
import type { Metadata } from 'next';
import ProjectsClient from '../components/projects-client/projects-client';

export const metadata: Metadata = {
    title: 'Proyectos Open Source peruanos | Peruanos.dev',
    description: 'Explora y contribuye a proyectos de código abierto creados por desarrolladores peruanos. Librerías, herramientas, aplicaciones y más.',
    keywords: ['open source peru', 'proyectos opensource peruanos', 'github peru', 'codigo abierto peru', 'desarrolladores peru'],
    openGraph: {
        title: 'Proyectos Open Source peruanos | Peruanos.dev',
        description: 'Explora y contribuye a proyectos de código abierto creados por desarrolladores peruanos.',
        url: 'https://peruanos.dev/projects',
        siteName: 'Peruanos.dev',
        locale: 'es_PE',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Proyectos Open Source peruanos | Peruanos.dev',
        description: 'Explora y contribuye a proyectos de código abierto creados por desarrolladores peruanos.',
    },
};

export default function Projects() {
    return (
        <main className="flex w-full max-w-7xl flex-col items-center bg-[var(--color-background)] mx-auto">
            <section className="py-20 flex flex-col items-start w-full px-8 sm:px-10">
                <h1 className="text-6xl text-left font-bold mb-4 leading-[1.4] w-full">
                    Proyectos <span className="text-[var(--color-primary-text)]">Open Source</span>
                </h1>
                <p className="text-left mb-4 w-full text-[20px]">
                    Descubre y contribuye a proyectos de código abierto creados por desarrolladores peruanos. ¿Tienes un proyecto? ¡Agrégalo a la lista!
                </p>
                <Link
                    className="px-6 py-3 text-center bg-[var(--color-primary)] text-white rounded-full hover:bg-[var(--color-primary-hover)] transition mb-8"
                    href='https://github.com/lperezp/peruanos.dev/issues/new?template=project.yml'
                    target='_blank'
                    rel="noopener noreferrer"
                >
                    Publicar un proyecto
                </Link>

                <ProjectsClient />
            </section>
        </main>
    );
}
