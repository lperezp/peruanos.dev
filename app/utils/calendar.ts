import { IEvent } from '../models/event.model';

export function generateGoogleCalendarUrl(event: IEvent) {
  const startDate = new Date(`${event.date}T${event.time}:00-05:00`);
  const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);

  const startStr = startDate.toISOString().replace(/-|:|\.\d\d\d/g, '');
  const endStr = endDate.toISOString().replace(/-|:|\.\d\d\d/g, '');

  const url = new URL('https://calendar.google.com/calendar/render');
  url.searchParams.append('action', 'TEMPLATE');
  url.searchParams.append('text', event.title);
  url.searchParams.append('dates', `${startStr}/${endStr}`);
  url.searchParams.append('details', `${event.description}\n\nEnlace: ${event.registration_url}`);
  url.searchParams.append('location', `${event.location}, ${event.city}`);

  return url.toString();
}

export function generateIcsDataUrl(event: IEvent) {
  const startDate = new Date(`${event.date}T${event.time}:00-05:00`);
  const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);

  const startStr = startDate.toISOString().replace(/-|:|\.\d\d\d/g, '');
  const endStr = endDate.toISOString().replace(/-|:|\.\d\d\d/g, '');

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//peruanos.dev//ES',
    'BEGIN:VEVENT',
    `DTSTART:${startStr}`,
    `DTEND:${endStr}`,
    `SUMMARY:${event.title.replace(/,/g, '\\,')}`,
    `DESCRIPTION:${event.description.replace(/\n/g, '\\n').replace(/,/g, '\\,')}\\n\\nEnlace: ${event.registration_url}`,
    `LOCATION:${event.location.replace(/,/g, '\\,')}, ${event.city}`,
    `URL:${event.registration_url}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  return `data:text/calendar;charset=utf8,${encodeURIComponent(icsContent)}`;
}
