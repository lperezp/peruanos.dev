import { useState, useMemo, useCallback, useEffect } from 'react';
import { ICommunity } from '../models/community.model';
import { COMMUNITIES } from '../data/communities';
import { useDebounce } from './useDebounce';

export const useCommunityFilters = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCities, setSelectedCities] = useState<string[]>([]);
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
    const [isCityOpen, setIsCityOpen] = useState(false);
    const [isTopicOpen, setIsTopicOpen] = useState(false);

    const getFilteredCommunities = useCallback((
        communities: ICommunity[],
        search: string,
        cities: string[],
        topics: string[]
    ): ICommunity[] => {
        return communities.filter((community) => {
            const matchesSearch = search === '' ||
                community.name.toLowerCase().includes(search.toLowerCase()) ||
                community.description.toLowerCase().includes(search.toLowerCase());

            const matchesCity = cities.length === 0 || cities.includes(community.city);
            const matchesTopics = topics.length === 0 || topics.some((topic) => community.topics.includes(topic));

            return matchesSearch && matchesCity && matchesTopics;
        });
    }, []);

    const filteredCommunities = useMemo(() => {
        return getFilteredCommunities(COMMUNITIES, searchQuery, selectedCities, selectedTopics);
    }, [searchQuery, selectedCities, selectedTopics, getFilteredCommunities]);

    const cities = useMemo(() => {
        const filteredByTopics = selectedTopics.length === 0
            ? COMMUNITIES
            : COMMUNITIES.filter((community) =>
                selectedTopics.some((topic) => community.topics.includes(topic))
            );

        const citySet = new Set(filteredByTopics.map((community) => community.city));
        return Array.from(citySet).sort();
    }, [selectedTopics]);

    const topics = useMemo(() => {
        const filteredByCities = selectedCities.length === 0
            ? COMMUNITIES
            : COMMUNITIES.filter((community) => selectedCities.includes(community.city));

        const topicSet = new Set(filteredByCities.flatMap((community) => community.topics));
        return Array.from(topicSet).sort();
    }, [selectedCities]);

    const toggleCity = useCallback((city: string) => {
        if (typeof window !== 'undefined' && 'gtag' in window && typeof window.gtag === 'function') {
            window.gtag('event', 'filter_communities', { filter_type: 'city', value: city });
        }
        setSelectedCities((prev) =>
            prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
        );
    }, []);

    const toggleTopic = useCallback((topic: string) => {
        if (typeof window !== 'undefined' && 'gtag' in window && typeof window.gtag === 'function') {
            window.gtag('event', 'filter_communities', { filter_type: 'topic', value: topic });
        }
        setSelectedTopics((prev) =>
            prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
        );
    }, []);

    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    useEffect(() => {
        if (debouncedSearchQuery && typeof window !== 'undefined' && 'gtag' in window && typeof window.gtag === 'function') {
            window.gtag('event', 'filter_communities', { filter_type: 'search', value: debouncedSearchQuery });
        }
    }, [debouncedSearchQuery]);

    return {
        searchQuery,
        setSearchQuery,
        selectedCities,
        selectedTopics,
        isCityOpen,
        setIsCityOpen,
        isTopicOpen,
        setIsTopicOpen,
        cities,
        topics,
        filteredCommunities,
        toggleCity,
        toggleTopic,
    };
};
