import { NextResponse } from 'next/server';
import { PROJECTS } from '@/app/data/projects';
import { IGitHubRepo } from '@/app/models/project.model';

export const revalidate = 3600;

export async function GET() {
  try {
    const projectsData: IGitHubRepo[] = await Promise.all(
        PROJECTS.map(async (project) => {
            try {
                const response = await fetch(`https://api.github.com/repos/${project.owner}/${project.repo}`, {
                    next: { revalidate: 3600 }
                });
                if (!response.ok) {
                   console.error(`Failed to fetch ${project.owner}/${project.repo}: ${response.status}`);
                   return null;
                }
                return await response.json();
            } catch (error) {
                console.error(`Error fetching ${project.owner}/${project.repo}:`, error);
                return null;
            }
        })
    );

    const validProjects = projectsData.filter(Boolean);

    return NextResponse.json(validProjects, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener los proyectos" },
      { status: 500 }
    );
  }
}
