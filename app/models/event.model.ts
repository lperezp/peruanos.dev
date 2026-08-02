export interface IEvent {
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    city: string;
    type: 'Presencial' | 'Virtual' | 'Híbrido';
    image_url: string;
    registration_url: string;
    tags: string[];
    organizer: string;
}
