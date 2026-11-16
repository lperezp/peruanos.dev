import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { ICommunity } from '../models/community.model';
import { COMMUNITIES } from '../data/communities';
import { useDebounce } from './useDebounce';
import { trackEvent } from '../lib/analytics';

function matchParamValues(paramValue: string | null, candidates: string[]): string[] {
    if (!paramValue) return [];
    const requested = paramValue
        .split(',')
        .map((v) => v.trim().toLowerCase())
        .filter(Boolean);
    return candidates.filter((candidate) => requested.includes(candidate.toLowerCase()));
}

export const useCommunityFilters = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCities, setSelectedCities] = useState<string[]>([]);
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
    const [isCityOpen, setIsCityOpen] = useState(false);
    const [isTopicOpen, setIsTopicOpen] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);
    const initialSearchRef = useRef(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const allCities = Array.from(new Set(COMMUNITIES.map((c) => c.city)));
        const allTopics = Array.from(new Set(COMMUNITIES.flatMap((c) => c.topics)));

        const q = params.get('q') ?? params.get('search') ?? '';
        const matchedCities = matchParamValues(params.get('city'), allCities);
        const matchedTopics = matchParamValues(params.get('topic'), allTopics);

        if (q) {
            initialSearchRef.current = true;
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSearchQuery(q);
        }
        if (matchedCities.length > 0) setSelectedCities(matchedCities);
        if (matchedTopics.length > 0) setSelectedTopics(matchedTopics);
        setIsHydrated(true);
    }, []);

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
        trackEvent('filter_communities', { event_name: city, filter_type: 'city', section: 'Community' });
        setSelectedCities((prev) =>
            prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
        );
    }, []);

    const toggleTopic = useCallback((topic: string) => {
        trackEvent('filter_communities', { event_name: topic, filter_type: 'topic', section: 'Community' });
        setSelectedTopics((prev) =>
            prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
        );
    }, []);

    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    useEffect(() => {
        if (initialSearchRef.current && debouncedSearchQuery) {
            initialSearchRef.current = false;
            return;
        }
        if (debouncedSearchQuery) trackEvent('filter_communities', { event_name: debouncedSearchQuery, filter_type: 'search', section: 'Community' });
    }, [debouncedSearchQuery]);

    useEffect(() => {
        if (!isHydrated) return;

        const url = new URL(window.location.href);
        url.searchParams.delete('search');

        if (debouncedSearchQuery === searchQuery) {
            if (debouncedSearchQuery) {
                url.searchParams.set('q', debouncedSearchQuery);
            } else {
                url.searchParams.delete('q');
            }
        }

        if (selectedCities.length > 0) {
            url.searchParams.set('city', selectedCities.join(','));
        } else {
            url.searchParams.delete('city');
        }

        if (selectedTopics.length > 0) {
            url.searchParams.set('topic', selectedTopics.join(','));
        } else {
            url.searchParams.delete('topic');
        }

        const nextUrl = url.pathname + url.search;
        if (nextUrl !== window.location.pathname + window.location.search) {
            window.history.replaceState(null, '', nextUrl);
        }
    }, [isHydrated, selectedCities, selectedTopics, debouncedSearchQuery, searchQuery]);

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
