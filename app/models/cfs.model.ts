export interface ICFS {
    id: string;
    title: string;
    community: string;
    description: string;
    event_date?: string;
    deadline?: string;
    cfs_url: string;
    image_url?: string;
    location?: string;
    city?: string;
    type: 'Presencial' | 'Virtual' | 'Híbrido';
    topics: string[];
    status: 'open' | 'closing_soon' | 'always_open' | 'closed';
}
