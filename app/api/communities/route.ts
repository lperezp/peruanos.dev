import { NextResponse } from 'next/server';
import { COMMUNITIES } from '@/app/data/communities';
import { API_HEADERS } from '@/app/lib/api-utils';

export function GET() {
    return NextResponse.json(COMMUNITIES, {
        headers: API_HEADERS,
    });
}

export function OPTIONS() {
    return new NextResponse(null, {
        status: 204,
        headers: API_HEADERS,
    });
}
