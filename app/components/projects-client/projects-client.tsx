'use client';

import { useEffect, useState } from 'react';
import CardProject from '../card-project/card-project';
import { PROJECTS } from '../../data/projects';
import { IGitHubRepo } from '../../models/project.model';

export default function ProjectsClient() {
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

    if (loading) {
        return (
            <div className="w-full text-center py-8">
                <p className="text-[var(--color-accent)]">Cargando proyectos...</p>
            </div>
        );
    }

    if (projects.length === 0) {
        return (
            <div className="w-full text-center py-8">
                <p className="text-[var(--color-accent)]">No se encontraron proyectos.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {projects.map((project) => (
                <CardProject key={project.full_name} project={project} />
            ))}
        </div>
    );
}
