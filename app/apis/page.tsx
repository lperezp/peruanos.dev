import type { Metadata } from 'next';
import ApiDocsViewer from './ApiDocsViewer';

export const metadata: Metadata = {
    title: 'Documentación de la API',
    description: 'Documentación de las APIs públicas de Peruanos.dev para acceder a eventos, comunidades y proyectos de código abierto.',
    keywords: ['api peru', 'api eventos', 'api comunidades', 'api tech peru'],
    openGraph: {
        title: 'Documentación de la API | Peruanos.dev',
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
                    Documentación de la <span className="text-primary-text">API</span>
                </h1>
                <p className="text-left mb-10 w-full sm:text-[20px]">
                    peruanos.dev expone diferentes endpoints públicos para que puedas consumir la información en tus propios proyectos.
                </p>

                <ApiDocsViewer />
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
