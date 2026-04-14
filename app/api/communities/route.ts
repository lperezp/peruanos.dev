import { NextResponse } from 'next/server';
import { COMMUNITIES } from '@/app/data/communities';

export const revalidate = 3600;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city')?.toLowerCase();

    console.log(city);

    let filteredCommunities = COMMUNITIES;

    if (city) {
      filteredCommunities = filteredCommunities.filter(
        (community) => community.city?.toLowerCase() === city
      );
    }

    console.log(filteredCommunities);

    return NextResponse.json(filteredCommunities, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener las comunidades" },
      { status: 500 }
    );
  }
}
