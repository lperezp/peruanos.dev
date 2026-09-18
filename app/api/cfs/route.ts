import { NextResponse } from 'next/server';
import { CFS_LIST } from '@/app/data/cfs';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const topic = searchParams.get('topic')?.toLowerCase();
    const type = searchParams.get('type')?.toLowerCase();
    const status = searchParams.get('status')?.toLowerCase();

    let filtered = CFS_LIST;

    if (topic) {
      filtered = filtered.filter((item) =>
        item.topics.some((t) => t.toLowerCase() === topic)
      );
    }

    if (type) {
      filtered = filtered.filter(
        (item) => item.type?.toLowerCase() === type
      );
    }

    if (status) {
      filtered = filtered.filter(
        (item) => item.status?.toLowerCase() === status
      );
    }

    return NextResponse.json(filtered, { status: 200 });
  } catch (error) {
    console.error("Error al obtener los Call for Speakers:", error);
    return NextResponse.json(
      { error: "Error al obtener los Call for Speakers" },
      { status: 500 }
    );
  }
}
