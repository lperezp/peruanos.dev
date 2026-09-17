export interface Startup {
    id: string;
    name: string;
    description: string;
    logo: string;
    website: string;
    industry: string[];       // e.g., ["Fintech", "Edtech", "E-commerce", "SaaS", "Logistics"]
    stage?: string;           // "Bootstrapped" | "Seed" | "Series A" | "Series B+"
    hiring: boolean;
    careersUrl?: string;
    location: string;         // e.g., "Lima, Perú" | "Remoto"
    socials?: {
        linkedin?: string;
        twitter?: string;
        github?: string;
    };
}
