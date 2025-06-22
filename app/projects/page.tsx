'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import CardProject from '../components/card-project/card-project';
import { PROJECTS } from '../data/projects';
import { IGitHubRepo } from '../models/project.model';

export default function Projects() {
    const [projects, setProjects] = useState<IGitHubRepo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projectsData: IGitHubRepo[] = await Promise.all(
                    PROJECTS.map(async (project) => {
                        try {
                            const response = await fetch(`https://api.github.com/repos/${project.owner}/${project.repo}`);
                            if (!response.ok) throw new Error('Failed to fetch');
                            return await response.json();
                        } catch (error) {
                            console.error(`Error fetching ${project.owner}/${project.repo}:`, error);
                            return null;
                        }
                    })
                );
                setProjects(projectsData.filter(Boolean));
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

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
                    href='https://github.com/lperezp/peruanos.dev/pulls'
                    target='_blank'
                    rel="noopener noreferrer"
                >
                    Publicar un proyecto
                </Link>

                {loading ? (
                    <div className="w-full text-center py-8">
                        <p className="text-[var(--color-accent)]">Cargando proyectos...</p>
                    </div>
                ) : projects.length === 0 ? (
                    <div className="w-full text-center py-8">
                        <p className="text-[var(--color-accent)]">No se encontraron proyectos.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                        {projects.map((project) => (
                            <CardProject key={project.full_name} project={project} />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
