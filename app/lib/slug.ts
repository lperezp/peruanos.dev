import type { IEvent } from '../models/event.model';
import type { ICommunity } from '../models/community.model';

export function slugify(text: string): string {
    return text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function safeDecode(value: string): string {
    try {
        return decodeURIComponent(value);
    } catch {
        return value;
    }
}

export function getEventSlug(event: Pick<IEvent, 'title'>): string {
    return slugify(event.title);
}

export function getCommunitySlug(community: Pick<ICommunity, 'name'>): string {
    return slugify(community.name);
}

export function findEventBySlug(events: IEvent[], slug: string): IEvent | undefined {
    const normalized = slugify(safeDecode(slug));
    return events.find(
        (event) =>
            getEventSlug(event) === slug ||
            getEventSlug(event) === normalized ||
            slugify(`${event.title}-${event.date}`) === slug ||
            slugify(`${event.title}-${event.date}`) === normalized
    );
}

export function findCommunityBySlug(communities: ICommunity[], slug: string): ICommunity | undefined {
    const decodedLower = safeDecode(slug).toLowerCase();
    const normalized = slugify(decodedLower);
    return communities.find(
        (community) =>
            getCommunitySlug(community) === slug ||
            getCommunitySlug(community) === normalized ||
            community.name.toLowerCase().replace(/ /g, '-') === decodedLower
    );
}
