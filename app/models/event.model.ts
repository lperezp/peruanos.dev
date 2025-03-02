export interface IEvent {
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    city: string;
    type: 'presencial' | 'virtual' | 'híbrido';
    image_url?: string;
    registration_url: string;
    tags: string[];
    organizer?: string;
}
