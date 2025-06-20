'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useThemeContext } from '../../context/ThemeContext';

export default function Header() {
    const { theme, toggleTheme, mounted } = useThemeContext();

    return (
        <header className="flex justify-between items-center h-[72px] bg-[var(--color-background)] px-8 shadow-[0_2px_10px_rgba(0,0,0,0.25)] z-[1] relative">
            <Link href="/" aria-label="Ir al inicio">
                <Image src={theme === 'light' ? './svg/logo-peruanos-dev-dark.svg' : './svg/logo-peruanos-dev.svg'} alt="Logo" width={31} height={44} />
            </Link>
            <nav className="flex items-center gap-3 text-[var(--color-foreground)]">
                {/* <Link className={styles.header__navItem} href="/events">Eventos</Link>
            <Link className={styles.header__navItem} href="/community">Comunidades</Link> 
            <Link className={styles.header__navItem} href="/projects">Proyectos Open Source</Link>*/}
                <button
                    className="h-10 w-10 flex justify-center items-center rounded bg-[var(--color-background)] cursor-pointer border-none hover:bg-[var(--color-hover)]"
                    onClick={toggleTheme}
                    aria-label={`Cambiar a tema ${theme === 'light' ? 'oscuro' : 'claro'}`}
                >
                    {mounted ? (
                        <Image
                            src={theme === 'light' ? './svg/icon-moon.svg' : './svg/icon-sun.svg'}
                            alt="Cambiar tema"
                            width={22}
                            height={22}
                        />
                    ) : (
                        <div style={{ width: 22, height: 22 }} />
                    )}
                </button>
                <Link href="https://github.com/lperezp/peruanos.dev" target='_blank' className="h-10 w-10 flex justify-center items-center rounded bg-[var(--color-background)] cursor-pointer border-none hover:bg-[var(--color-hover)]" aria-label="GitHub Repository">
                    <Image src={theme === 'light' ? './svg/icon-github-dark.svg' : './svg/icon-github.svg'} alt="Logo" width={22} height={22} />
                </Link>
            </nav>
        </header>
    );
}
