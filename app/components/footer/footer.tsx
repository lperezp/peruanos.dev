export default function Footer() {
    return (
        <footer>
            <div className="footer mt-10 bg-[var(--color-black)] text-[var(--color-white)] py-10 sm:py-16 px-8 sm:px-25 pb-0 sm:pb-0">
                <p className="text-[20px] font-bold mb-3">peruanos<span className="text-[var(--color-primary-text)]">.dev</span></p>
                <p className='mb-10 sm:mb-13'>Construyendo y conectando el ecosistema tech del Perú.</p>
                <div className="max-w-full mx-auto text-center p-6 sm:p-10 border-t border-[var(--color-accent)]">
                    <p>© {new Date().getFullYear()} Peruanos.dev. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}