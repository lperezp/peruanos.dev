import type { ICFS } from '../models/cfs.model';

function cleanSchemaText(text?: string | null): string {
    if (!text) return '';
    return text.replace(/\*\*/g, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
}

function buildAttendanceAndLocation(
    type: 'Presencial' | 'Virtual' | 'Híbrido' | undefined,
    locationName: string,
    city: string | undefined,
    fallbackUrl: string
) {
    let attendanceMode = 'https://schema.org/OfflineEventAttendanceMode';
    if (type === 'Virtual') {
        attendanceMode = 'https://schema.org/OnlineEventAttendanceMode';
    } else if (type === 'Híbrido') {
        attendanceMode = 'https://schema.org/MixedEventAttendanceMode';
    }

    const locality = city && city !== 'Virtual' ? city : 'Lima';
    const placeLocation = {
        '@type': 'Place',
        name: locationName,
        address: {
            '@type': 'PostalAddress',
            addressLocality: locality,
            addressCountry: 'PE',
        },
    };
    const virtualLocation = {
        '@type': 'VirtualLocation',
        url: fallbackUrl,
    };

    let locationData: Record<string, unknown> | Record<string, unknown>[] = placeLocation;
    if (type === 'Virtual') {
        locationData = virtualLocation;
    } else if (type === 'Híbrido') {
        locationData = [placeLocation, virtualLocation];
    }

    return { attendanceMode, locationData };
}

export const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://peruanos.dev/#organization',
    name: 'Peruanos.dev',
    url: 'https://peruanos.dev',
    logo: {
        '@type': 'ImageObject',
        url: 'https://peruanos.dev/images/icon-512.png',
        width: 512,
        height: 512,
    },
    description: 'Comunidad de tecnología en el Perú que conecta desarrolladores, organiza eventos y promueve proyectos de código abierto.',
    email: 'contact@peruanos.dev',
    address: {
        '@type': 'PostalAddress',
        addressCountry: 'PE',
        addressLocality: 'Lima',
    },
    sameAs: [
        'https://github.com/lperezp/peruanos.dev',
        'https://x.com/lperezp_pe',
    ],
};

export const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://peruanos.dev/#website',
    name: 'Peruanos.dev',
    url: 'https://peruanos.dev',
    description: 'Conecta con la comunidad tech en el Perú. Descubre eventos, únete a comunidades y contribuye a proyectos de código abierto.',
    inLanguage: 'es-PE',
    publisher: {
        '@id': 'https://peruanos.dev/#organization',
    },
    potentialAction: {
        '@type': 'SearchAction',
        target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://peruanos.dev/events?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
    },
};

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
    })),
});

export const eventSchema = (event: {
    name: string;
    description: string;
    startDate: string;
    endDate?: string;
    time?: string;
    location: string;
    city?: string;
    organizer: string;
    url?: string;
    image_url?: string;
    type?: 'Presencial' | 'Virtual' | 'Híbrido';
}) => {
    const eventUrl = event.url || 'https://peruanos.dev/events';
    const { attendanceMode, locationData } = buildAttendanceAndLocation(
        event.type,
        event.location,
        event.city,
        eventUrl
    );

    const startIsoDate = event.time ? `${event.startDate}T${event.time}:00-05:00` : event.startDate;
    const organizerName = event.organizer || 'Comunidad Tech Perú';

    return {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: event.name,
        description: cleanSchemaText(event.description),
        startDate: startIsoDate,
        endDate: event.endDate ? (event.time ? `${event.endDate}T${event.time}:00-05:00` : event.endDate) : startIsoDate,
        location: locationData,
        organizer: {
            '@type': 'Organization',
            name: organizerName,
        },
        performer: {
            '@type': 'Organization',
            name: organizerName,
        },
        eventAttendanceMode: attendanceMode,
        eventStatus: 'https://schema.org/EventScheduled',
        isAccessibleForFree: true,
        offers: {
            '@type': 'Offer',
            url: eventUrl,
            price: '0',
            priceCurrency: 'PEN',
            availability: 'https://schema.org/InStock',
        },
        ...(event.image_url && { image: [event.image_url] }),
        ...(event.url && { url: event.url }),
    };
};

export const communitySchema = (community: {
    name: string;
    description: string;
    url?: string;
    logo?: string;
    location: string;
}) => ({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: community.name,
    description: cleanSchemaText(community.description),
    ...(community.url && { url: community.url }),
    ...(community.logo && { logo: community.logo }),
    address: {
        '@type': 'PostalAddress',
        addressLocality: community.location,
        addressCountry: 'PE',
    },
});

export const softwareSourceCodeSchema = (project: {
    name: string;
    description: string;
    codeRepository: string;
    author: string;
    programmingLanguage?: string | null;
}) => ({
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: project.name,
    description: cleanSchemaText(project.description),
    codeRepository: project.codeRepository,
    ...(project.programmingLanguage && { programmingLanguage: project.programmingLanguage }),
    author: {
        '@type': 'Person',
        name: project.author,
    },
});

export const cfsSchema = (cfs: ICFS) => {
    const { attendanceMode, locationData } = buildAttendanceAndLocation(
        cfs.type,
        cfs.location || cfs.city || 'Perú',
        cfs.city,
        cfs.cfs_url
    );

    return {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: cfs.title,
        description: cleanSchemaText(cfs.description),
        ...(cfs.event_date || cfs.deadline ? { startDate: cfs.event_date || cfs.deadline } : {}),
        location: locationData,
        organizer: {
            '@type': 'Organization',
            name: cfs.community,
        },
        eventAttendanceMode: attendanceMode,
        eventStatus: 'https://schema.org/EventScheduled',
        isAccessibleForFree: true,
        url: cfs.cfs_url,
        ...(cfs.image_url && { image: [cfs.image_url] }),
    };
};

export const itemListSchema = (items: Record<string, unknown>[]) => ({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
            '@context': undefined,
            ...item
        },
    })),
});
