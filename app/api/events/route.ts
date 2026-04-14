import { NextResponse } from 'next/server';
import { EVENTS } from '@/app/data/events';

export const revalidate = 3600;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city')?.toLowerCase();
    const type = searchParams.get('type')?.toLowerCase();
    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Lima' });

    let filteredEvents = EVENTS;

    if (city) {
      filteredEvents = filteredEvents.filter(
        (event) => event.city?.toLowerCase() === city
      );
    }

    if (type) {
      filteredEvents = filteredEvents.filter(
        (event) => event.type?.toLowerCase() === type
      );
    }

    const activeEvents = filteredEvents.filter(event => event.date >= today);

    return NextResponse.json(filteredEvents, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener los eventos" },
      { status: 500 }
    );
  }
}
