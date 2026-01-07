'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useThemeContext } from '../../context/ThemeContext';
import { useGitHubStars } from '../../hooks/useGitHubStars';
import { useState } from 'react';
import { Menu, X, Github, Star } from 'lucide-react';
import { addUTMParams } from '../../lib/utm';

export default function Header() {
    const { theme, toggleTheme, mounted } = useThemeContext();
    const { stars } = useGitHubStars('lperezp/peruanos.dev');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <header className="flex justify-between items-center h-[72px] bg-[var(--color-background)] px-8 shadow-[0_2px_10px_rgba(0,0,0,0.25)] z-[50] relative">
                <Link href="/" aria-label="Ir al inicio">
                    <Image src={theme === 'light' ? './svg/logo-peruanos-dev-dark.svg' : './svg/logo-peruanos-dev.svg'} alt="Logo" width={31} height={44} />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-7 text-[var(--color-foreground)]">
                    <Link className="hover:text-[var(--color-primary)] transition-colors" href="/events">Eventos</Link>
                    <Link className="hover:text-[var(--color-primary)] transition-colors" href="/community">Comunidades</Link>
                    <Link className="hover:text-[var(--color-primary)] transition-colors" href="/projects">Proyectos Open Source</Link>
                </nav>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-3 text-[var(--color-foreground)]">
                    <button
                        className="h-10 px-3 flex justify-center items-center rounded bg-[var(--color-background)] cursor-pointer border-none hover:bg-[var(--color-hover)]"
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

                    <Link
                        href={addUTMParams('https://github.com/lperezp/peruanos.dev')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:flex h-10 px-3 justify-center items-center rounded bg-[var(--color-background)] cursor-pointer border-none hover:bg-[var(--color-hover)]"
                        aria-label="GitHub Repository"
                        title={mounted ? `${stars || 0} estrellas` : "GitHub Repository"}
                    >
                        <div className="flex items-center justify-center gap-2">
                            <Github size={16} />
                            <span className="text-xs font-medium">{mounted ? (stars || '0') : '0'}</span>
                            <Star size={16} />
                        </div>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden h-10 w-10 flex justify-center items-center rounded bg-[var(--color-background)] cursor-pointer border-none hover:bg-[var(--color-hover)]"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </header>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden fixed inset-0 top-[72px] bg-[var(--color-background)] z-40 px-8 py-6 shadow-lg">
                    <nav className="flex flex-col gap-6">
                        <Link
                            className="text-lg hover:text-[var(--color-primary)] transition-colors"
                            href="/events"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Eventos
                        </Link>
                        <Link
                            className="text-lg hover:text-[var(--color-primary)] transition-colors"
                            href="/community"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Comunidades
                        </Link>
                        <Link
                            className="text-lg hover:text-[var(--color-primary)] transition-colors"
                            href="/projects"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Proyectos Open Source
                        </Link>

                        <div className="flex items-center gap-3 mt-4 pt-6 border-t border-[var(--color-border)]">
                            <button
                                className="h-10 px-3 flex justify-center items-center rounded bg-[var(--color-background)] cursor-pointer border border-[var(--color-border)] hover:bg-[var(--color-hover)]"
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

                            <Link
                                href={addUTMParams('https://github.com/lperezp/peruanos.dev')}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="h-10 px-3 flex justify-center items-center rounded bg-[var(--color-background)] cursor-pointer border border-[var(--color-border)] hover:bg-[var(--color-hover)]"
                                aria-label="GitHub Repository"
                                title={mounted ? `${stars || 0} estrellas` : "GitHub Repository"}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <Github size={22} />
                                    <span className="text-xs font-medium">{mounted ? (stars || '0') : '0'}</span>
                                    <Star size={22} />
                                </div>
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </>
    );
}
