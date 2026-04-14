import { NextResponse } from 'next/server';
import { PROJECTS } from '@/app/data/projects';

export const revalidate = 3600;

export async function GET() {
  try {
    return NextResponse.json(PROJECTS, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener los proyectos" },
      { status: 500 }
    );
  }
}
