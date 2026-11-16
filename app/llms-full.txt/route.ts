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
    '# Peruanos.dev — Contexto Completo',
    '',
    '> Catálogo completo de eventos tecnológicos, convocatorias Call for Speakers (CFS), comunidades tech, proyectos open source y APIs públicas del ecosistema tecnológico en el Perú.',
    '',
    `- URL principal: https://peruanos.dev`,
    `- Última generación: ${today} (America/Lima)`,
    `- Índice resumido: https://peruanos.dev/llms.txt`,
    `- Repositorio: https://github.com/lperezp/peruanos.dev`,
    '',
    '---',
    '',
    `## Próximos Eventos Tecnológicos en Perú (${upcomingEvents.length})`,
    '',
  ];

  if (upcomingEvents.length === 0) {
    lines.push('Actualmente no hay eventos próximos futuros registrados en la cartelera.');
    lines.push('');
  } else {
    for (const event of upcomingEvents) {
      lines.push(`### ${event.title}`);
      lines.push(`- Fecha: ${event.date}${event.time ? ` a las ${event.time} (America/Lima)` : ''}`);
      lines.push(`- Ciudad: ${event.city}`);
      lines.push(`- Lugar: ${event.location}`);
      lines.push(`- Modalidad: ${event.type}`);
      lines.push(`- Organizador: ${event.organizer || 'Comunidad Tech Perú'}`);
      if (event.tags.length > 0) {
        lines.push(`- Etiquetas: ${event.tags.join(', ')}`);
      }
      lines.push(`- Registro: ${event.registration_url}`);
      lines.push(`- Descripción: ${cleanText(event.description)}`);
      lines.push('');
    }
  }

  lines.push('---', '', `## Call for Speakers Activos (${activeCfs.length})`, '');

  if (activeCfs.length === 0) {
    lines.push('Actualmente no hay convocatorias abiertas registradas.');
    lines.push('');
  } else {
    for (const cfs of activeCfs) {
      lines.push(`### ${cfs.title}`);
      lines.push(`- Comunidad: ${cfs.community}`);
      if (cfs.event_date) lines.push(`- Fecha del evento: ${cfs.event_date}`);
      lines.push(`- Cierre de postulaciones: ${cfs.deadline || 'Convocatoria continua'}`);
      lines.push(`- Estado: ${cfs.status}`);
      lines.push(`- Ciudad: ${cfs.city || 'Perú'}`);
      if (cfs.location) lines.push(`- Lugar: ${cfs.location}`);
      lines.push(`- Modalidad: ${cfs.type}`);
      lines.push(`- Temas: ${cfs.topics.join(', ')}`);
      lines.push(`- Enlace de postulación (CFS): ${cfs.cfs_url}`);
      if (cfs.website_url) lines.push(`- Sitio web del evento: ${cfs.website_url}`);
      lines.push(`- Descripción: ${cleanText(cfs.description)}`);
      lines.push('');
    }
  }

  lines.push('---', '', `## Directorio de Comunidades Tech en Perú (${COMMUNITIES.length})`, '');

  for (const community of COMMUNITIES) {
    lines.push(`### ${community.name}`);
    lines.push(`- Ciudad: ${community.city}`);
    lines.push(`- Temas: ${community.topics.join(', ')}`);
    lines.push(`- Sitio web: ${community.contact.website}`);
    if (community.contact.email) {
      lines.push(`- Correo: ${community.contact.email}`);
    }
    const socials = Object.entries(community.contact.socialMedia)
      .filter(([, value]) => Boolean(value))
      .map(([network, url]) => `${network}: ${url}`);
    if (socials.length > 0) {
      lines.push(`- Redes sociales: ${socials.join(' | ')}`);
    }
    lines.push(`- Descripción: ${cleanText(community.description)}`);
    lines.push('');
  }

  lines.push('---', '', `## Proyectos Open Source Peruanos (${PROJECTS.length})`, '');

  for (const project of PROJECTS) {
    lines.push(`- **${project.owner}/${project.repo}**: https://github.com/${project.owner}/${project.repo}`);
  }

  lines.push(
    '',
    '---',
    '',
    '## Documentación de Endpoints Públicos (JSON)',
    '',
    '1. `GET https://peruanos.dev/api/events` — Lista de eventos próximos vigentes. Parámetros opcionales: `city`, `type`.',
    '2. `GET https://peruanos.dev/api/communities` — Lista completa de comunidades tech en Perú. Parámetro opcional: `city`.',
    '3. `GET https://peruanos.dev/api/cfs` — Lista de convocatorias Call for Speakers ordenadas por prioridad y fecha límite. Parámetros opcionales: `topic`, `type`, `status`.',
    '4. `GET https://peruanos.dev/api/projects` — Lista de repositorios open source peruanos con datos en vivo de GitHub.',
    ''
  );

  return new NextResponse(lines.join('\n'), {
    status: 200,
    headers: {
      ...API_HEADERS,
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
