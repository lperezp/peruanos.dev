'use client';

import { useEffect, useState } from 'react';
import CardProject from './ProjectCard';
import { IGitHubRepo } from '../../models/project.model';

interface ProjectsClientProps {
    initialProjects?: IGitHubRepo[];
}

export default function ProjectsClient({ initialProjects = [] }: ProjectsClientProps) {
    const [projects, setProjects] = useState<IGitHubRepo[]>(initialProjects);
    const [loading, setLoading] = useState(initialProjects.length === 0);

    useEffect(() => {
        if (initialProjects.length > 0) return;

        const fetchProjects = async () => {
            try {
                const response = await fetch('/api/projects');
                if (!response.ok) throw new Error('Failed to fetch from API');
                const projectsData = await response.json();
                setProjects(projectsData);
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [initialProjects.length]);

    if (loading) {
        return (
            <div className="w-full text-center py-8">
                <p className="text-accent">Cargando proyectos...</p>
            </div>
        );
    }

    if (projects.length === 0) {
        return (
            <div className="w-full text-center py-8">
                <p className="text-accent">No se encontraron proyectos.</p>
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
