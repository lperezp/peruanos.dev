export interface ICommunity {
    name: string;
    description: string;
    logo_url: string;
    city: string;
    topics: string[];
    contact: {
        email: string;
        website: string;
        socialMedia: {
            github: string;
            twitter: string;
            linkedin: string;
            discord: string;
            facebook: string;
            youtube: string;
            instagram: string;
        };
    };
}