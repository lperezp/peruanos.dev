export interface IProject {
    owner: string;
    repo: string;
}

export interface IGitHubRepo {
    name: string;
    full_name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string;
    owner: {
        login: string;
        avatar_url: string;
    };
}
