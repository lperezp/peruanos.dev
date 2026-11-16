import { NextResponse } from 'next/server';
import { EVENTS } from '@/app/data/events';
import { COMMUNITIES } from '@/app/data/communities';
import { CFS_LIST } from '@/app/data/cfs';
import { PROJECTS } from '@/app/data/projects';
import { API_HEADERS } from '@/app/lib/api-utils';

export const revalidate = 3600;

function cleanText(text: string): string {
  return text.replace(/\*\*/g, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
}

export async function GET() {
  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Lima' });

  const upcomingEvents = EVENTS
    .filter((event) => event.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));

  const activeCfs = CFS_LIST.filter((cfs) => cfs.status !== 'closed');

  const lines: string[] = [
    '# Peruanos.dev',
    '',
    '> Portal abierto de la comunidad tecnológica en el Perú. Centraliza eventos tech (meetups, conferencias, workshops, hackathons), comunidades de desarrolladores por ciudad, convocatorias Call for Speakers (CFS), proyectos open source creados por peruanos y APIs públicas en JSON.',
    '',
    '- Sitio web: https://peruanos.dev',
    '- Repositorio Open Source: https://github.com/lperezp/peruanos.dev',
    '- Contexto completo para LLMs: https://peruanos.dev/llms-full.txt',
    '',
    '## Secciones Principales',
    '',
    '- [Inicio](https://peruanos.dev/): Resumen de próximos eventos, comunidades destacadas, proyectos open source y guía de contribución.',
    '- [Eventos](https://peruanos.dev/events): Directorio de eventos tecnológicos en Perú filtrable por ciudad, tópico y modalidad (Presencial, Virtual, Híbrido).',
    '- [Comunidades](https://peruanos.dev/community): Directorio de comunidades tech y grupos de usuarios en Lima, Piura, Arequipa, Trujillo, Cusco, Callao y más ciudades del Perú.',
    '- [Call for Speakers](https://peruanos.dev/cfs): Convocatorias abiertas para ponentes y speakers en conferencias y meetups tech en Perú.',
    '- [Proyectos Open Source](https://peruanos.dev/projects): Repositorios de código abierto creados por desarrolladores peruanos.',
    '- [Documentación de la API](https://peruanos.dev/apis): Documentación de endpoints públicos JSON.',
    '',
    '## APIs Públicas (JSON)',
    '',
    '- [GET /api/events](https://peruanos.dev/api/events): Eventos próximos vigentes (filtros opcionales: `?city=lima&type=presencial`).',
    '- [GET /api/communities](https://peruanos.dev/api/communities): Directorio de comunidades tech (filtro opcional: `?city=lima`).',
    '- [GET /api/cfs](https://peruanos.dev/api/cfs): Convocatorias Call for Speakers (filtros opcionales: `?topic=devops&type=presencial&status=open`).',
    '- [GET /api/projects](https://peruanos.dev/api/projects): Proyectos open source peruanos enriquecidos con metadata de GitHub.',
    '',
    `## Próximos Eventos (${upcomingEvents.length})`,
    '',
    ...(upcomingEvents.length > 0
      ? upcomingEvents.map(
          (event) =>
            `- [${event.title}](${event.registration_url}): ${event.date}${event.time ? ` ${event.time}` : ''} | ${event.city} (${event.type}) | Organiza: ${event.organizer || 'Comunidad Tech Perú'} — ${cleanText(event.description).slice(0, 160)}${cleanText(event.description).length > 160 ? '...' : ''}`
        )
      : ['- No hay próximos eventos programados en este momento. Revisa https://peruanos.dev/events o contribuye vía GitHub.']),
    '',
    `## Call for Speakers Activos (${activeCfs.length})`,
    '',
    ...(activeCfs.length > 0
      ? activeCfs.map(
          (cfs) =>
            `- [${cfs.title}](${cfs.cfs_url}): ${cfs.community} | Ciudad: ${cfs.city || 'Perú'} (${cfs.type}) | Cierre: ${cfs.deadline || 'Continuo'} | Temas: ${cfs.topics.join(', ')}`
        )
      : ['- No hay convocatorias activas en este momento.']),
    '',
    `## Comunidades Tech en Perú (${COMMUNITIES.length})`,
    '',
    ...COMMUNITIES.map(
      (community) =>
        `- [${community.name}](${community.contact.website}): ${community.city} | Temas: ${community.topics.join(', ')}`
    ),
    '',
    `## Proyectos Open Source (${PROJECTS.length})`,
    '',
    ...PROJECTS.map(
      (project) => `- [${project.owner}/${project.repo}](https://github.com/${project.owner}/${project.repo})`
    ),
    '',
  ];

  return new NextResponse(lines.join('\n'), {
    status: 200,
    headers: {
      ...API_HEADERS,
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
