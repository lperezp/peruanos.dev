'use client';

import Link from 'next/link';
import { useEventFilters } from '../hooks/useEventFilters';
import EventFilters from '../components/event-filters/event-filters';
import EventList from '../components/event-list/event-list';

export default function Events() {
    const {
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
    } = useEventFilters();

    return (
        <main className="flex w-full max-w-7xl flex-col items-center bg-[var(--color-background)] mx-auto">
            <section className={`py-20 flex flex-col items-start w-full px-8 sm:px-10`}>
                <h1 className="text-6xl text-left font-bold mb-4 leading-[1.4] w-full">Próximos <span className={`text-[var(--color-primary-text)]`}>eventos</span></h1>
                <p className="text-left mb-4 w-full text-[20px]">Conecta con la comunidad tech peruana en eventos, meetups y conferencias. ¿Organizas un evento? ¡Agrégalo a la lista!</p>
                <Link className="px-6 py-3 text-center bg-[var(--color-primary)] text-white rounded-full hover:bg-[var(--color-primary-hover)] transition" href='https://github.com/lperezp/peruanos.dev/pulls' target='_blank' rel="noopener noreferrer">
                    Publicar un evento
                </Link>

                <EventFilters
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    cities={cities}
                    selectedCities={selectedCities}
                    toggleCity={toggleCity}
                    isCityOpen={isCityOpen}
                    setIsCityOpen={setIsCityOpen}
                    topics={topics}
                    selectedTopics={selectedTopics}
                    toggleTopic={toggleTopic}
                    isTopicOpen={isTopicOpen}
                    setIsTopicOpen={setIsTopicOpen}
                    availableTypes={availableTypes}
                    selectedTypes={selectedTypes}
                    toggleType={toggleType}
                    isTypeOpen={isTypeOpen}
                    setIsTypeOpen={setIsTypeOpen}
                />

                <EventList events={filteredEvents} />
            </section>
        </main>
    );
}


