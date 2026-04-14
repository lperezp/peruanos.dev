import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'APIs Públicas',
    description: 'Documentación de las APIs públicas de Peruanos.dev para acceder a eventos, comunidades y proyectos de código abierto.',
    keywords: ['api peru', 'api eventos', 'api comunidades', 'api tech peru'],
    openGraph: {
        title: 'APIs Públicas | Peruanos.dev',
        description: 'Documentación de las APIs públicas de Peruanos.dev.',
        url: 'https://peruanos.dev/apis',
        siteName: 'Peruanos.dev',
        locale: 'es_PE',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'APIs Públicas | Peruanos.dev',
        description: 'Documentación de las APIs públicas de Peruanos.dev.',
    },
};

export default function APIs() {
    return (
        <main className="flex w-full max-w-7xl flex-col items-center bg-background mx-auto">
            <section className="py-20 flex flex-col items-start w-full px-8 sm:px-10">
                <h1 className="text-4xl sm:text-6xl text-left font-bold mb-4 leading-[1.4] w-full">
                    APIs <span className="text-primary-text">Públicas</span>
                </h1>
                <p className="text-left mb-10 w-full sm:text-[20px]">
                    peruanos.dev expone diferentes endpoints públicos (solo de lectura) para que puedas consumir la información en tus propios proyectos.
                </p>

                <div className="w-full flex flex-col gap-10">
                    {/* Eventos API */}
                    <div className="bg-background border border-accent rounded-lg p-6 sm:p-8 w-full shadow-sm hover:shadow-md transition-shadow">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <span className="bg-primary text-white text-sm px-3 py-1 rounded-md">GET</span>
                            /api/events
                        </h2>
                        <p className="mb-4 text-foreground/80">
                            Obtiene la lista de todos los eventos tecnológicos registrados, incluyendo meetups, conferencias, talleres y hackathons en Perú.
                        </p>
                        <div className="bg-hover p-4 rounded-md font-mono text-sm overflow-x-auto border border-border">
                            <Link href="/api/events" className="text-primary hover:underline" target="_blank">
                                https://peruanos.dev/api/events
                            </Link>
                        </div>
                    </div>

                    {/* Comunidades API */}
                    <div className="bg-background border border-accent rounded-lg p-6 sm:p-8 w-full shadow-sm hover:shadow-md transition-shadow">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <span className="bg-primary text-white text-sm px-3 py-1 rounded-md">GET</span>
                            /api/communities
                        </h2>
                        <p className="mb-4 text-foreground/80">
                            Obtiene el directorio completo de comunidades activas, grupos y organizaciones tech peruanas.
                        </p>
                        <div className="bg-hover p-4 rounded-md font-mono text-sm overflow-x-auto border border-border">
                            <Link href="/api/communities" className="text-primary hover:underline" target="_blank">
                                https://peruanos.dev/api/communities
                            </Link>
                        </div>
                    </div>

                    {/* Proyectos API */}
                    <div className="bg-background border border-accent rounded-lg p-6 sm:p-8 w-full shadow-sm hover:shadow-md transition-shadow">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <span className="bg-primary text-white text-sm px-3 py-1 rounded-md">GET</span>
                            /api/projects
                        </h2>
                        <p className="mb-4 text-foreground/80">
                            Obtiene el showcase de proyectos open source creados y mantenidos por desarrolladores peruanos.
                        </p>
                        <div className="bg-hover p-4 rounded-md font-mono text-sm overflow-x-auto border border-border">
                            <Link href="/api/projects" className="text-primary hover:underline" target="_blank">
                                https://peruanos.dev/api/projects
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-12 bg-hover border border-border rounded-lg p-6 sm:p-8 w-full">
                    <h3 className="font-bold text-xl mb-3 text-primary-text">Uso responsable</h3>
                    <p className="mb-0 text-foreground/80">
                        Agradecemos un uso responsable de estos endpoints para asegurar la disponibilidad y un buen rendimiento del servicio para toda la comunidad.
                    </p>
                </div>
            </section>
        </main>
    );
}
