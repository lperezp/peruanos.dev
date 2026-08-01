import { NextResponse } from 'next/server';
import ical from 'ical-generator';
import { EVENTS } from '@/app/data/events';

export const revalidate = 3600;

export async function GET() {
  const calendar = ical({
    name: 'Eventos peruanos.dev',
    description: 'Calendario de eventos de la comunidad peruanos.dev',
    timezone: 'America/Lima'
  });

  EVENTS.forEach((event) => {
    // Basic date parsing. Note: time needs to be combined with date
    const startDate = new Date(`${event.date}T${event.time}:00-05:00`);

    // Default duration of 2 hours if not specified
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);

    calendar.createEvent({
      start: startDate,
      end: endDate,
      summary: event.title,
      description: `${event.description}\n\nEnlace: ${event.registration_url}`,
      location: `${event.location}, ${event.city}`,
      url: event.registration_url,
    });
  });

  return new NextResponse(calendar.toString(), {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="peruanos-dev-events.ics"',
    },
  });
}
