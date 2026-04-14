import { NextResponse } from 'next/server';
import { COMMUNITIES } from '@/app/data/communities';

export const revalidate = 3600;

export async function GET() {
  try {
    return NextResponse.json(COMMUNITIES, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener las comunidades" },
      { status: 500 }
    );
  }
}
