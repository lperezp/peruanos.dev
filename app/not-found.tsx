import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Página no encontrada',
    description: 'La ruta que buscas no existe o fue movida. Explora eventos, comunidades, Call for Speakers y proyectos open source en Peruanos.dev.',
    robots: {
        index: false,
        follow: true,
    },
};

export default function NotFound() {
    return (
        <main className="flex w-full max-w-4xl flex-col items-center justify-center text-center bg-background mx-auto px-6 py-24 sm:py-32">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary-text mb-3">
                Error 404
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                Página no encontrada
            </h1>
            <p className="text-accent text-lg max-w-xl mb-10">
                La página que buscas no existe o fue movida. Puedes continuar explorando el ecosistema tech del Perú desde nuestras secciones principales:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
                <Link
                    href="/"
                    className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-hover transition font-medium"
                >
                    Ir al inicio
                </Link>
                <Link
                    href="/events"
                    className="px-6 py-3 bg-background text-foreground rounded-full border border-border hover:bg-hover transition font-medium"
                >
                    Eventos
                </Link>
                <Link
                    href="/community"
                    className="px-6 py-3 bg-background text-foreground rounded-full border border-border hover:bg-hover transition font-medium"
                >
                    Comunidades
                </Link>
                <Link
                    href="/cfs"
                    className="px-6 py-3 bg-background text-foreground rounded-full border border-border hover:bg-hover transition font-medium"
                >
                    Call for Speakers
                </Link>
                <Link
                    href="/projects"
                    className="px-6 py-3 bg-background text-foreground rounded-full border border-border hover:bg-hover transition font-medium"
                >
                    Proyectos
                </Link>
            </div>
        </main>
    );
}
