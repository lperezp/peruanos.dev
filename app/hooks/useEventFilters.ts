import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { EVENTS } from '../data/events';
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

export function useEventFilters() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCities, setSelectedCities] = useState<string[]>([]);
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [isCityOpen, setIsCityOpen] = useState(false);
    const [isTopicOpen, setIsTopicOpen] = useState(false);
    const [isTypeOpen, setIsTypeOpen] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);
    const initialSearchRef = useRef(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const allCities = Array.from(new Set(EVENTS.map((e) => e.city)));
        const allTopics = Array.from(new Set(EVENTS.flatMap((e) => e.tags)));
        const allTypes = Array.from(new Set(EVENTS.map((e) => e.type)));

        const q = params.get('q') ?? params.get('search') ?? '';
        const matchedCities = matchParamValues(params.get('city'), allCities);
        const matchedTopics = matchParamValues(params.get('topic'), allTopics);
        const matchedTypes = matchParamValues(params.get('type'), allTypes);

        if (q) {
            initialSearchRef.current = true;
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSearchQuery(q);
        }
        if (matchedCities.length > 0) setSelectedCities(matchedCities);
        if (matchedTopics.length > 0) setSelectedTopics(matchedTopics);
        if (matchedTypes.length > 0) setSelectedTypes(matchedTypes);
        setIsHydrated(true);
    }, []);

    // Función para verificar si una fecha es hoy o futura
    const isUpcomingEvent = useCallback((dateString: string) => {
        const [year, month, day] = dateString.split('-').map(Number);
        const eventDate = new Date(year, month - 1, day);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate >= today;
    }, []);

    // Función helper para filtrar eventos válidos (solo próximos)
    const getFilteredEvents = useCallback((
        cityFilters: string[],
        topicFilters: string[],
        typeFilters: string[]
    ) => {
        return EVENTS.filter(event => {
            if (!isUpcomingEvent(event.date)) return false;
            if (cityFilters.length > 0 && !cityFilters.includes(event.city)) return false;
            if (topicFilters.length > 0 && !event.tags.some(tag => topicFilters.includes(tag))) return false;
            if (typeFilters.length > 0 && !typeFilters.includes(event.type)) return false;
            return true;
        });
    }, [isUpcomingEvent]);

    // Ciudades disponibles basadas en temas y tipos seleccionados
    const cities = useMemo(() => {
        const filtered = getFilteredEvents([], selectedTopics, selectedTypes);
        const citySet = new Set(filtered.map(event => event.city));
        return Array.from(citySet).sort();
    }, [selectedTopics, selectedTypes, getFilteredEvents]);

    // Temas disponibles basados en ciudades y tipos seleccionados
    const topics = useMemo(() => {
        const filtered = getFilteredEvents(selectedCities, [], selectedTypes);
        const allTags = new Set(filtered.flatMap(event => event.tags));
        return Array.from(allTags).sort();
    }, [selectedCities, selectedTypes, getFilteredEvents]);

    // Tipos disponibles basados en ciudades y temas seleccionados
    const availableTypes = useMemo(() => {
        const filtered = getFilteredEvents(selectedCities, selectedTopics, []);
        const typeSet = new Set(filtered.map(event => event.type));
        return Array.from(typeSet).sort();
    }, [selectedCities, selectedTopics, getFilteredEvents]);

    // Eventos filtrados
    const filteredEvents = useMemo(() => {
        return EVENTS
            .filter(event => isUpcomingEvent(event.date))
            .filter(event => {
                if (searchQuery &&
                    !event.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
                    !event.description.toLowerCase().includes(searchQuery.toLowerCase())) {
                    return false;
                }
                if (selectedCities.length > 0 && !selectedCities.includes(event.city)) return false;
                if (selectedTopics.length > 0 && !event.tags.some(tag => selectedTopics.includes(tag))) return false;
                if (selectedTypes.length > 0 && !selectedTypes.includes(event.type)) return false;
                return true;
            })
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }, [searchQuery, selectedCities, selectedTopics, selectedTypes, isUpcomingEvent]);

    // Toggle functions
    const toggleCity = useCallback((city: string) => {
        trackEvent('filter_events', { event_name: city, filter_type: 'city', section: 'Events' });
        setSelectedCities(prev =>
            prev.includes(city)
                ? prev.filter(c => c !== city)
                : [...prev, city]
        );
    }, []);

    const toggleTopic = useCallback((topic: string) => {
        trackEvent('filter_events', { event_name: topic, filter_type: 'topic', section: 'Events' });
        setSelectedTopics(prev =>
            prev.includes(topic)
                ? prev.filter(t => t !== topic)
                : [...prev, topic]
        );
    }, []);

    const toggleType = useCallback((type: string) => {
        trackEvent('filter_events', { event_name: type, filter_type: 'type', section: 'Events' });
        setSelectedTypes(prev =>
            prev.includes(type)
                ? prev.filter(t => t !== type)
                : [...prev, type]
        );
    }, []);

    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    useEffect(() => {
        if (initialSearchRef.current && debouncedSearchQuery) {
            initialSearchRef.current = false;
            return;
        }
        if (debouncedSearchQuery) trackEvent('filter_events', { event_name: debouncedSearchQuery, filter_type: 'search', section: 'Events' });
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

        if (selectedTypes.length > 0) {
            url.searchParams.set('type', selectedTypes.join(','));
        } else {
            url.searchParams.delete('type');
        }

        const nextUrl = url.pathname + url.search;
        if (nextUrl !== window.location.pathname + window.location.search) {
            window.history.replaceState(null, '', nextUrl);
        }
    }, [isHydrated, selectedCities, selectedTopics, selectedTypes, debouncedSearchQuery, searchQuery]);

    return {
        searchQuery,
        setSearchQuery,
        selectedCities,
        selectedTopics,
        selectedTypes,
        isCityOpen,
        setIsCityOpen,
        isTopicOpen,
        setIsTopicOpen,
        isTypeOpen,
        setIsTypeOpen,
        cities,
        topics,
        availableTypes,
        filteredEvents,
        toggleCity,
        toggleTopic,
        toggleType,
    };
}
