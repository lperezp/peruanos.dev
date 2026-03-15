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
        'https://twitter.com/peruanosdev',
        'https://linkedin.com/company/peruanos-dev',
    ],
};

export const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Peruanos.dev',
    url: 'https://peruanos.dev',
    description: 'Conecta con la comunidad tech en el Perú. Descubre eventos, únete a comunidades y contribuye a proyectos de código abierto.',
    inLanguage: 'es-PE',
    potentialAction: {
        '@type': 'SearchAction',
        target: 'https://peruanos.dev/search?q={search_term_string}',
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
    location: string;
    organizer: string;
    url?: string;
}) => ({
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate || event.startDate,
    location: {
        '@type': 'Place',
        name: event.location,
        address: {
            '@type': 'PostalAddress',
            addressCountry: 'PE',
        },
    },
    organizer: {
        '@type': 'Organization',
        name: event.organizer,
    },
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    ...(event.url && { url: event.url }),
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
