import type { Metadata } from 'next';
import ProjectsClient from '../components/projects/ProjectsClient';
import TrackedLink from '../components/ui/TrackedLink';
import { addUTMParams } from '../lib/utm';
import { PROJECTS } from '../data/projects';
import { IGitHubRepo } from '../models/project.model';
import { breadcrumbSchema, itemListSchema, softwareSourceCodeSchema } from '../lib/structured-data';

export const metadata: Metadata = {
    title: 'Proyectos Open Source peruanos',
    description: 'Explora y contribuye a proyectos de código abierto creados por desarrolladores peruanos. Librerías, herramientas, aplicaciones y más.',
    keywords: ['open source peru', 'proyectos opensource peruanos', 'github peru', 'codigo abierto peru', 'desarrolladores peru'],
    authors: [{ name: 'Luis Eduardo', url: 'https://lperezp.dev' }],
    alternates: {
        canonical: '/projects',
    },
    openGraph: {
        title: 'Proyectos Open Source peruanos',
        description: 'Explora y contribuye a proyectos de código abierto creados por desarrolladores peruanos.',
        images: [
            {
                url: 'https://peruanos.dev/images/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Proyectos Open Source peruanos - Peruanos.dev',
            }
        ],
        url: 'https://peruanos.dev/projects',
        siteName: 'Peruanos.dev',
        locale: 'es_PE',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Proyectos Open Source peruanos',
        description: 'Explora y contribuye a proyectos de código abierto creados por desarrolladores peruanos.',
        images: ['https://peruanos.dev/images/og-image.png'],
        creator: '@lperezp_pe',
    },
};

export const revalidate = 3600;

function createFallbackRepo(owner: string, repo: string): IGitHubRepo {
    return {
        name: repo,
        full_name: `${owner}/${repo}`,
        description: `Proyecto open source ${repo} por ${owner}`,
        html_url: `https://github.com/${owner}/${repo}`,
        stargazers_count: 0,
        forks_count: 0,
        language: '',
        owner: {
            login: owner,
            avatar_url: `https://github.com/${owner}.png`,
        },
    };
}

export default async function Projects() {
    const projectsData: IGitHubRepo[] = await Promise.all(
        PROJECTS.map(async (project) => {
            try {
                const response = await fetch(`https://api.github.com/repos/${project.owner}/${project.repo}`, {
                    next: { revalidate: 3600 },
                });
                if (!response.ok) {
                    console.error(`Failed to fetch ${project.owner}/${project.repo}: ${response.status}`);
                    return createFallbackRepo(project.owner, project.repo);
                }
                return (await response.json()) as IGitHubRepo;
            } catch (error) {
                console.error(`Error fetching ${project.owner}/${project.repo}:`, error);
                return createFallbackRepo(project.owner, project.repo);
            }
        })
    );

    const jsonLdProjects = itemListSchema(projectsData.map(project => softwareSourceCodeSchema({
        name: project.name,
        description: project.description || `Proyecto open source ${project.name} por ${project.owner.login}`,
        codeRepository: project.html_url,
        author: project.owner.login,
    })));

    const jsonLdBreadcrumbs = breadcrumbSchema([
        { name: 'Inicio', url: 'https://peruanos.dev' },
        { name: 'Proyectos', url: 'https://peruanos.dev/projects' },
    ]);

    return (
        <main className="flex w-full max-w-7xl flex-col items-center bg-background mx-auto">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProjects) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumbs) }}
            />
            <section className="py-20 flex flex-col items-start w-full px-8 sm:px-10">
                <h1 className="text-4xl sm:text-6xl text-left font-bold mb-4 leading-[1.4] w-full">
                    Proyectos <span className="text-primary-text">Open Source</span>
                </h1>
                <p className="text-left mb-4 w-full sm:text-[20px]">
                    Descubre y contribuye a proyectos de código abierto creados por desarrolladores peruanos. ¿Tienes un proyecto? ¡Agrégalo a la lista!
                </p>
                <TrackedLink
                    className="px-6 py-3 text-center bg-primary text-white rounded-full hover:bg-primary-hover transition mb-8"
                    href={addUTMParams('https://github.com/lperezp/peruanos.dev/issues/new?template=project.yml')}
                    target='_blank'
                    rel="noopener noreferrer"
                    eventName="click_publish_project"
                    eventParams={{ event_name: 'Publicar un proyecto', event_link: 'https://github.com/lperezp/peruanos.dev/issues/new?template=project.yml', section: 'Projects' }}
                >
                    Publicar un proyecto
                </TrackedLink>

                <ProjectsClient initialProjects={projectsData} />
            </section>
        </main>
    );
}
