'use client';

import Image from 'next/image';
import styles from './header.module.scss';
import Link from 'next/link';
import { useThemeContext } from '../../context/ThemeContext';

export default function Header() {
    const { theme, toggleTheme, mounted } = useThemeContext();

    return (
        <header className={styles.header}>
            <Image src={theme === 'light' ? './svg/logo-peruanos-dev-dark.svg' : './svg/logo-peruanos-dev.svg'} alt="Logo" width={31} height={44} />
            <nav className={styles.header__nav}>
                {/* <Link className={styles.header__navItem} href="/events">Eventos</Link>
                <Link className={styles.header__navItem} href="/communities">Comunidades</Link> 
                <Link className={styles.header__navItem} href="/projects">Proyectos Open Source</Link>*/}
                <button
                    className={styles.header__navButton}
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
                <Link href="https://github.com/lperezp/peruanos.dev" target='_blank' className={styles.header__navButton} aria-label="GitHub Repository">
                    <Image src={theme === 'light' ? './svg/icon-github-dark.svg' : './svg/icon-github.svg'} alt="Logo" width={22} height={22} />
                </Link>
            </nav>
        </header>
    );
}
