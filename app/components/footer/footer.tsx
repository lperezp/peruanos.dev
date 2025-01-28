export default function Footer() {
    return (
        <footer>
            <div className="footer bg-[var(--color-black)] text-[var(--color-white)] py-16 px-25 pb-0">
                <p className="text-[20px] font-bold mb-3">peruanos<span className="text-[var(--color-primary)]">.dev</span></p>
                <p className='mb-13'>Construyendo y conectando el ecosistema tech del Perú.</p>
                <div className="max-w-full mx-auto text-center p-10 border-t border-[var(--color-accent)]">
                    <p className='mb-3'>Hecho con ❤️ por la comunidad de desarrolladores peruanos.</p>
                    <p>© {new Date().getFullYear()} Peruanos.dev. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}