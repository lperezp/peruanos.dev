'use client';

import { useState, useEffect } from 'react';

export function useGitHubStars(repo: string) {
    const [stars, setStars] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Solo ejecutar en el cliente
        if (typeof window === 'undefined') {
            setLoading(false);
            return;
        }

        async function fetchStars() {
            try {
                const response = await fetch(`https://api.github.com/repos/${repo}`);
                if (response.ok) {
                    const data = await response.json();
                    setStars(data.stargazers_count);
                }
            } catch (error) {
                console.error('Error fetching GitHub stars:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchStars();
    }, [repo]);

    return { stars, loading };
}