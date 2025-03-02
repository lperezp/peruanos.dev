import { useState, useMemo, useCallback } from 'react';
import { EVENTS } from '../data/events';

export function useEventFilters() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCities, setSelectedCities] = useState<string[]>([]);
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [isCityOpen, setIsCityOpen] = useState(false);
    const [isTopicOpen, setIsTopicOpen] = useState(false);
    const [isTypeOpen, setIsTypeOpen] = useState(false);

    // Función helper para filtrar eventos
    const getFilteredEvents = useCallback((
        cityFilters: string[],
        topicFilters: string[],
        typeFilters: string[]
    ) => {
        return EVENTS.filter(event => {
            if (cityFilters.length > 0 && !cityFilters.includes(event.city)) return false;
            if (topicFilters.length > 0 && !event.tags.some(tag => topicFilters.includes(tag))) return false;
            if (typeFilters.length > 0 && !typeFilters.includes(event.type)) return false;
            return true;
        });
    }, []);

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

    // Función para verificar si una fecha es hoy o futura
    const isUpcomingEvent = useCallback((dateString: string) => {
        const [year, month, day] = dateString.split('-').map(Number);
        const eventDate = new Date(year, month - 1, day);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate >= today;
    }, []);

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
        setSelectedCities(prev =>
            prev.includes(city)
                ? prev.filter(c => c !== city)
                : [...prev, city]
        );
    }, []);

    const toggleTopic = useCallback((topic: string) => {
        setSelectedTopics(prev =>
            prev.includes(topic)
                ? prev.filter(t => t !== topic)
                : [...prev, topic]
        );
    }, []);

    const toggleType = useCallback((type: string) => {
        setSelectedTypes(prev =>
            prev.includes(type)
                ? prev.filter(t => t !== type)
                : [...prev, type]
        );
    }, []);

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
