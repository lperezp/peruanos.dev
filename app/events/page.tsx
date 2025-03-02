'use client';

import Link from 'next/link';
import { IEvent } from '../models/event.model';
import { EVENTS } from '../data/events';
import CardEvent from '../components/card-event/card-event';
import { useState, useMemo } from 'react';

export default function Events() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCities, setSelectedCities] = useState<string[]>([]);
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [isCityOpen, setIsCityOpen] = useState(false);
    const [isTopicOpen, setIsTopicOpen] = useState(false);
    const [isTypeOpen, setIsTypeOpen] = useState(false);

    // Ciudades disponibles basadas en temas y tipos seleccionados
    const cities = useMemo(() => {
        let filtered = EVENTS;
        if (selectedTopics.length > 0) {
            filtered = filtered.filter(event => event.tags.some(tag => selectedTopics.includes(tag)));
        }
        if (selectedTypes.length > 0) {
            filtered = filtered.filter(event => selectedTypes.includes(event.type));
        }
        const citySet = new Set(filtered.map(event => event.city));
        return Array.from(citySet).sort();
    }, [selectedTopics, selectedTypes]);

    // Temas disponibles basados en ciudades y tipos seleccionados
    const topics = useMemo(() => {
        let filtered = EVENTS;
        if (selectedCities.length > 0) {
            filtered = filtered.filter(event => selectedCities.includes(event.city));
        }
        if (selectedTypes.length > 0) {
            filtered = filtered.filter(event => selectedTypes.includes(event.type));
        }
        const allTags = new Set(filtered.flatMap(event => event.tags));
        return Array.from(allTags).sort();
    }, [selectedCities, selectedTypes]);

    // Tipos disponibles basados en ciudades y temas seleccionados
    const availableTypes = useMemo(() => {
        let filtered = EVENTS;
        if (selectedCities.length > 0) {
            filtered = filtered.filter(event => selectedCities.includes(event.city));
        }
        if (selectedTopics.length > 0) {
            filtered = filtered.filter(event => event.tags.some(tag => selectedTopics.includes(tag)));
        }
        const typeSet = new Set(filtered.map(event => event.type));
        return Array.from(typeSet).sort();
    }, [selectedCities, selectedTopics]);

    const toggleCity = (city: string) => {
        setSelectedCities(prev =>
            prev.includes(city)
                ? prev.filter(c => c !== city)
                : [...prev, city]
        );
    };

    const toggleTopic = (topic: string) => {
        setSelectedTopics(prev =>
            prev.includes(topic)
                ? prev.filter(t => t !== topic)
                : [...prev, topic]
        );
    };

    const toggleType = (type: string) => {
        setSelectedTypes(prev =>
            prev.includes(type)
                ? prev.filter(t => t !== type)
                : [...prev, type]
        );
    };

    const upcomingEvents = EVENTS
        .filter((event) => {
            const [year, month, day] = event.date.split('-').map(Number);
            const eventDate = new Date(year, month - 1, day);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            eventDate.setHours(0, 0, 0, 0);
            return eventDate >= today;
        })
        .filter((event) => {
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

    return (
        <main className="flex w-full max-w-7xl flex-col items-center bg-[var(--color-background)] mx-auto">
            <section className={`py-20 flex flex-col items-start w-full px-8 sm:px-10`}>
                <h1 className="text-6xl text-left font-bold mb-4 leading-[1.4] w-full">Próximos <span className={`text-[var(--color-primary-text)]`}>eventos</span></h1>
                <p className="text-left mb-4 w-full text-[20px]">Conecta con la comunidad tech peruana en eventos, meetups y conferencias. ¿Organizas un evento? ¡Agrégalo a la lista!</p>
                <Link className="px-6 py-3 text-center bg-[var(--color-primary)] text-white rounded-full hover:bg-[var(--color-primary-hover)] transition" href='https://github.com/lperezp/peruanos.dev/pulls' target='_blank' rel="noopener noreferrer">
                    Publicar un evento
                </Link>

                <div className="w-full my-10">
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Buscar eventos..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full p-3 rounded-md border border-[var(--color-border)] bg-[var(--color-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="relative">
                            <label className="block text-sm font-medium mb-2">Ciudad</label>
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setIsCityOpen(!isCityOpen)}
                                    className="w-full p-3 rounded-md border border-[var(--color-border)] bg-[var(--color-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-left flex items-center justify-between"
                                >
                                    <span className="text-sm">
                                        {selectedCities.length > 0
                                            ? `${selectedCities.length} seleccionada${selectedCities.length > 1 ? 's' : ''}`
                                            : 'Seleccionar ciudad'}
                                    </span>
                                    <svg className={`w-4 h-4 transition-transform ${isCityOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {isCityOpen && (
                                    <div className="absolute z-10 w-full mt-1 bg-[var(--color-background)] border border-[var(--color-border)] rounded-md shadow-lg max-h-60 overflow-y-auto">
                                        {cities.map(city => (
                                            <label key={city} className="flex items-center cursor-pointer hover:bg-[var(--color-border)] p-3 transition">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedCities.includes(city)}
                                                    onChange={() => toggleCity(city)}
                                                    className="mr-2 w-4 h-4 accent-[var(--color-primary)]"
                                                />
                                                <span className="text-sm">{city}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="relative">
                            <label className="block text-sm font-medium mb-2">Tema</label>
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setIsTopicOpen(!isTopicOpen)}
                                    className="w-full p-3 rounded-md border border-[var(--color-border)] bg-[var(--color-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-left flex items-center justify-between"
                                >
                                    <span className="text-sm">
                                        {selectedTopics.length > 0
                                            ? `${selectedTopics.length} seleccionado${selectedTopics.length > 1 ? 's' : ''}`
                                            : 'Seleccionar tema'}
                                    </span>
                                    <svg className={`w-4 h-4 transition-transform ${isTopicOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {isTopicOpen && (
                                    <div className="absolute z-10 w-full mt-1 bg-[var(--color-background)] border border-[var(--color-border)] rounded-md shadow-lg max-h-60 overflow-y-auto">
                                        {topics.map(topic => (
                                            <label key={topic} className="flex items-center cursor-pointer hover:bg-[var(--color-border)] p-3 transition">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedTopics.includes(topic)}
                                                    onChange={() => toggleTopic(topic)}
                                                    className="mr-2 w-4 h-4 accent-[var(--color-primary)]"
                                                />
                                                <span className="text-sm">{topic}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="relative">
                            <label className="block text-sm font-medium mb-2">Tipo</label>
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setIsTypeOpen(!isTypeOpen)}
                                    className="w-full p-3 rounded-md border border-[var(--color-border)] bg-[var(--color-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-left flex items-center justify-between"
                                >
                                    <span className="text-sm">
                                        {selectedTypes.length > 0
                                            ? `${selectedTypes.length} seleccionado${selectedTypes.length > 1 ? 's' : ''}`
                                            : 'Seleccionar tipo'}
                                    </span>
                                    <svg className={`w-4 h-4 transition-transform ${isTypeOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {isTypeOpen && (
                                    <div className="absolute z-10 w-full mt-1 bg-[var(--color-background)] border border-[var(--color-border)] rounded-md shadow-lg">
                                        {availableTypes.map(type => (
                                            <label key={type} className="flex items-center cursor-pointer hover:bg-[var(--color-border)] p-3 transition">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedTypes.includes(type)}
                                                    onChange={() => toggleType(type)}
                                                    className="mr-2 w-4 h-4 accent-[var(--color-primary)]"
                                                />
                                                <span className="text-sm capitalize">{type}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="h-1 w-full mt-8 bg-[var(--color-border)]" />
                </div>
                <div className="flex flex-col gap-6 w-full">
                    {upcomingEvents.length > 0 ? (
                        upcomingEvents.map((event: IEvent) => (
                            <CardEvent key={event.title} event={event} />
                        ))
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-xl text-[var(--color-text-secondary)]">No se encontraron eventos con los filtros seleccionados.</p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}


