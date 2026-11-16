import { NextResponse } from 'next/server';
import { COMMUNITIES } from '@/app/data/communities';
import { API_HEADERS } from '@/app/lib/api-utils';

export const revalidate = 3600;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city')?.toLowerCase();

    let filteredCommunities = COMMUNITIES;

    if (city) {
      filteredCommunities = filteredCommunities.filter(
        (community) => community.city?.toLowerCase() === city
      );
    }

    return NextResponse.json(filteredCommunities, { status: 200, headers: API_HEADERS });
  } catch {
    return NextResponse.json(
      { error: "Error al obtener las comunidades" },
      { status: 500 }
    );
  }
}
