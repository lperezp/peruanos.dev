import { ExternalLink, Star, GitFork, Github } from 'lucide-react';
import { IGitHubRepo } from '@/app/models/project.model';
import Badge from '../ui/Badge';
import { addUTMParams } from '../../lib/utm';
import Link from 'next/link';

interface Props {
    project: IGitHubRepo;
}

export default function CardProject({ project }: Props) {
    return (
        <div className="bg-background border border-accent rounded-lg p-6 flex-1 max-w-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md hover:border-primary/50">
            {project.language && (
                <Badge variant="outline">{project.language}</Badge>
            )}
            <div className="flex items-center gap-2 mb-1">
                <Github size={24} />
                <p className="text-[20px] font-bold">{project.name}</p>
            </div>
            <p className="text-sm text-accent mb-4">por {project.owner.login}</p>
            <p className="font-medium my-4 text-accent line-clamp-2 overflow-hidden text-ellipsis">
                {project.description || 'Sin descripción disponible'}
            </p>

            <div className="flex items-center gap-4 mb-4 text-sm text-accent">
                <div className="flex items-center gap-1">
                    <Star size={16} />
                    <span>{project.stargazers_count}</span>
                </div>
                <div className="flex items-center gap-1">
                    <GitFork size={16} />
                    <span>{project.forks_count}</span>
                </div>
            </div>

            <Link
                href={addUTMParams(project.html_url)}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 font-medium text-primary-text"
            >
                <span>Ver en GitHub</span>
                <ExternalLink size={16} />
            </Link>
        </div>
    );
}
