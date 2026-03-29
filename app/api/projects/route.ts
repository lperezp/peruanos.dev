import { NextResponse } from 'next/server';
import { PROJECTS } from '@/app/data/projects';
import { API_HEADERS } from '@/app/lib/api-utils';

export function GET() {
    return NextResponse.json(PROJECTS, {
        headers: API_HEADERS,
    });
}

export function OPTIONS() {
    return new NextResponse(null, {
        status: 204,
        headers: API_HEADERS,
    });
}
