import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

function getFileLastModified(relativePath: string, fallback: Date): Date {
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
    const projectsModified = getFileLastModified('app/data/projects.ts', currentDate);
    const apisModified = getFileLastModified('app/apis/page.tsx', currentDate);

    // Para la raíz, determinar la fecha más reciente de los cambios del sitio
    const newestModification = new Date(
        Math.max(
            homeModified.getTime(),
            eventsModified.getTime(),
            communityModified.getTime(),
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
    ];
}
