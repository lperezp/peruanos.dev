import { MetadataRoute } from 'next';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { EVENTS } from './data/events';
import { COMMUNITIES } from './data/communities';
import { getCommunitySlug, getEventSlug } from './lib/slug';

function getFileLastModified(relativePath: string, fallback: Date): Date {
    try {
        const gitDate = execSync(`git log -1 --format=%cI -- "${relativePath}"`, {
            encoding: 'utf-8',
            stdio: ['ignore', 'pipe', 'ignore'],
        }).trim();
        if (gitDate) {
            const parsedDate = new Date(gitDate);
            if (!Number.isNaN(parsedDate.getTime())) {
                return parsedDate;
            }
        }
    } catch {
        // Fallback to filesystem mtime when git history is unavailable
    }

    try {
        const absolutePath = path.join(process.cwd(), relativePath);
        if (fs.existsSync(absolutePath)) {
            const stats = fs.statSync(absolutePath);
            return stats.mtime;
        }
    } catch (error) {
        console.error(`Error reading last modified for ${relativePath}:`, error);
    }
    return fallback;
}

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://peruanos.dev';
    const currentDate = new Date();

    // Obtener las fechas reales de modificación de cada sección
    const homeModified = getFileLastModified('app/page.tsx', currentDate);
    const eventsModified = getFileLastModified('app/data/events.ts', currentDate);
    const communityModified = getFileLastModified('app/data/communities.ts', currentDate);
    const cfsModified = getFileLastModified('app/data/cfs.ts', currentDate);
    const projectsModified = getFileLastModified('app/data/projects.ts', currentDate);
    const apisModified = getFileLastModified('app/apis/page.tsx', currentDate);

    // Para la raíz, determinar la fecha más reciente de los cambios del sitio
    const newestModification = new Date(
        Math.max(
            homeModified.getTime(),
            eventsModified.getTime(),
            communityModified.getTime(),
            cfsModified.getTime(),
            projectsModified.getTime(),
            apisModified.getTime()
        )
    );

    return [
        {
            url: baseUrl,
            lastModified: newestModification,
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/events`,
            lastModified: eventsModified,
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/community`,
            lastModified: communityModified,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/cfs`,
            lastModified: cfsModified,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/projects`,
            lastModified: projectsModified,
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/apis`,
            lastModified: apisModified,
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/llms.txt`,
            lastModified: newestModification,
            changeFrequency: 'daily',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/llms-full.txt`,
            lastModified: newestModification,
            changeFrequency: 'daily',
            priority: 0.6,
        },
        ...EVENTS.map((event) => ({
            url: `${baseUrl}/events/${getEventSlug(event)}`,
            lastModified: eventsModified,
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        })),
        ...COMMUNITIES.map((community) => ({
            url: `${baseUrl}/community/${getCommunitySlug(community)}`,
            lastModified: communityModified,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        })),
    ];
}
