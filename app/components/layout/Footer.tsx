import Link from 'next/link';
import { addUTMParams } from '../../lib/utm';

export default function Footer() {
    return (
        <footer>
            <div className="footer mt-10 bg-[#0F0F11] text-white py-10 sm:py-16 px-8 sm:px-25 pb-0 sm:pb-0">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 sm:mb-13">
                    <div>
                        <p className="text-[20px] font-bold mb-3">peruanos<span className="text-primary-text">.dev</span></p>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Construyendo y conectando el ecosistema tech del Perú.
                        </p>
                    </div>

                    <nav aria-label="Explorar secciones" className="flex flex-col gap-2 text-sm">
                        <p className="font-semibold text-white mb-1">Explorar</p>
                        <Link href="/events" className="text-gray-300 hover:text-white transition-colors">
                            Eventos tecnológicos
                        </Link>
                        <Link href="/community" className="text-gray-300 hover:text-white transition-colors">
                            Comunidades tech
                        </Link>
                        <Link href="/cfs" className="text-gray-300 hover:text-white transition-colors">
                            Call for Speakers
                        </Link>
                        <Link href="/projects" className="text-gray-300 hover:text-white transition-colors">
                            Proyectos Open Source
                        </Link>
                        <Link href="/apis" className="text-gray-300 hover:text-white transition-colors">
                            API Pública
                        </Link>
                    </nav>

                    <nav aria-label="Recursos y comunidad" className="flex flex-col gap-2 text-sm">
                        <p className="font-semibold text-white mb-1">Comunidad</p>
                        <Link
                            href={addUTMParams('https://github.com/lperezp/peruanos.dev')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            GitHub
                        </Link>
                    </nav>
                </div>

                <div className="max-w-full mx-auto text-center p-6 sm:p-10 border-t border-accent">
                    <p>© {new Date().getFullYear()} Peruanos.dev. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
