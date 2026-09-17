import { NextResponse } from 'next/server';
import { STARTUPS } from '@/app/data/startups';

export const revalidate = 3600;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const industry = searchParams.get('industry')?.toLowerCase();
    const hiring = searchParams.get('hiring')?.toLowerCase();
    const stage = searchParams.get('stage')?.toLowerCase();
    const location = searchParams.get('location')?.toLowerCase();

    let filteredStartups = STARTUPS;

    if (industry) {
      filteredStartups = filteredStartups.filter(
        (s) => s.industry.some((ind) => ind.toLowerCase() === industry)
      );
    }

    if (hiring !== null && hiring !== undefined) {
      if (hiring === 'true' || hiring === '1') {
        filteredStartups = filteredStartups.filter((s) => s.hiring === true);
      } else if (hiring === 'false' || hiring === '0') {
        filteredStartups = filteredStartups.filter((s) => s.hiring === false);
      }
    }

    if (stage) {
      filteredStartups = filteredStartups.filter(
        (s) => s.stage?.toLowerCase() === stage
      );
    }

    if (location) {
      filteredStartups = filteredStartups.filter(
        (s) => s.location.toLowerCase().includes(location)
      );
    }

    return NextResponse.json(filteredStartups, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Error al obtener las startups" },
      { status: 500 }
    );
  }
}
