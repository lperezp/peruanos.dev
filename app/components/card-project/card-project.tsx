import { ExternalLink, Star, GitFork, Github } from 'lucide-react';
import { IGitHubRepo } from '@/app/models/project.model';
import Badge from '../badge/badge';

interface Props {
    project: IGitHubRepo;
}

export default function CardProject({ project }: Props) {
    return (
        <div className="bg-[var(--color-background)] border border-[var(--color-accent)] rounded-lg p-6 flex-1 max-w-sm">
            {project.language && (
                <Badge variant="outline">{project.language}</Badge>
            )}
            <div className="flex items-center gap-2 mb-1">
                <Github size={24} />
                <p className="text-[20px] font-bold">{project.name}</p>
            </div>
            <p className="text-sm text-[var(--color-accent)] mb-4">por {project.owner.login}</p>
            <p className="font-medium my-4 text-[var(--color-accent)] line-clamp-2 overflow-hidden text-ellipsis">
                {project.description || 'Sin descripción disponible'}
            </p>

            <div className="flex items-center gap-4 mb-4 text-sm text-[var(--color-accent)]">
                <div className="flex items-center gap-1">
                    <Star size={16} />
                    <span>{project.stargazers_count}</span>
                </div>
                <div className="flex items-center gap-1">
                    <GitFork size={16} />
                    <span>{project.forks_count}</span>
                </div>
            </div>

            <a
                href={project.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-medium text-[var(--color-primary-text)]"
            >
                <span>Ver en GitHub</span>
                <ExternalLink size={16} />
            </a>
        </div>
    );
}
