import { NextResponse } from 'next/server';
import { EVENTS } from '@/app/data/events';
import { API_HEADERS } from '@/app/lib/api-utils';

export function GET() {
    return NextResponse.json(EVENTS, {
        headers: API_HEADERS,
    });
}

export function OPTIONS() {
    return new NextResponse(null, {
        status: 204,
        headers: API_HEADERS,
    });
}
