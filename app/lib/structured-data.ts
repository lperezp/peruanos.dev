export const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Peruanos.dev',
    url: 'https://peruanos.dev',
    logo: 'https://peruanos.dev/svg/logo-peruanos-dev.svg',
    description: 'Comunidad de tecnología en el Perú que conecta desarrolladores, organiza eventos y promueve proyectos de código abierto.',
    email: 'contact@peruanos.dev',
    address: {
        '@type': 'PostalAddress',
        addressCountry: 'PE',
        addressLocality: 'Lima',
    },
    sameAs: [
        'https://github.com/lperezp/peruanos.dev',
        'https://peruanos.dev',
    ],
};

export const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Peruanos.dev',
    url: 'https://peruanos.dev',
    description: 'Conecta con la comunidad tech en el Perú. Descubre eventos, únete a comunidades y contribuye a proyectos de código abierto.',
    inLanguage: 'es-PE',
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
    organizer: string;
    url?: string;
    image_url?: string;
    type?: 'Presencial' | 'Virtual' | 'Híbrido';
}) => {
    let attendanceMode = 'https://schema.org/OfflineEventAttendanceMode';
    if (event.type === 'Virtual') {
        attendanceMode = 'https://schema.org/OnlineEventAttendanceMode';
    } else if (event.type === 'Híbrido') {
        attendanceMode = 'https://schema.org/MixedEventAttendanceMode';
    }

    let locationData: Record<string, unknown> | Record<string, unknown>[] = {
        '@type': 'Place',
        name: event.location,
        address: {
            '@type': 'PostalAddress',
            addressCountry: 'PE',
        },
    };

    if (event.type === 'Virtual') {
        locationData = {
            '@type': 'VirtualLocation',
            url: event.url || 'https://peruanos.dev/events',
        };
    } else if (event.type === 'Híbrido') {
        locationData = [
            {
                '@type': 'Place',
                name: event.location,
                address: {
                    '@type': 'PostalAddress',
                    addressCountry: 'PE',
                },
            },
            {
                '@type': 'VirtualLocation',
                url: event.url || 'https://peruanos.dev/events',
            },
        ];
    }

    const startIsoDate = event.time ? `${event.startDate}T${event.time}:00-05:00` : event.startDate;

    return {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: event.name,
        description: event.description,
        startDate: startIsoDate,
        endDate: event.endDate ? (event.time ? `${event.endDate}T${event.time}:00-05:00` : event.endDate) : startIsoDate,
        location: locationData,
        organizer: {
            '@type': 'Organization',
            name: event.organizer,
        },
        eventAttendanceMode: attendanceMode,
        eventStatus: 'https://schema.org/EventScheduled',
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
    description: community.description,
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
}) => ({
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: project.name,
    description: project.description,
    codeRepository: project.codeRepository,
    author: {
        '@type': 'Person',
        name: project.author,
    },
});

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
