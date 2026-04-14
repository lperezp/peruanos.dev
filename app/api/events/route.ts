import { NextResponse } from 'next/server';
import { EVENTS } from '@/app/data/events';

// Puedes configurar la caché estática para que la respuesta dure, por ejemplo, 1 hora (3600 segundos).
// Esto sirve como tu "Escudo de Caché" contra miles de peticiones.
export const revalidate = 3600;

export async function GET() {
  try {
    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Lima' });
    const activeEvents = EVENTS.filter(event => event.date >= today);
    return NextResponse.json(activeEvents, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener los eventos" },
      { status: 500 }
    );
  }
}
