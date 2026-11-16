'use client';

import { useEventFilters } from '../../hooks/useEventFilters';
import EventFilters from './EventFilters';
import EventList from './EventList';

export default function EventsClient() {
    const {
        searchQuery,
        setSearchQuery,
        selectedCities,
        selectedTopics,
        selectedTypes,
        timeFilter,
        setTimeFilter,
        upcomingCount,
        pastCount,
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
        <>
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

            <div className="flex flex-wrap items-center gap-3 mb-8 w-full" role="tablist" aria-label="Filtrar por vigencia del evento">
                <button
                    type="button"
                    role="tab"
                    aria-selected={timeFilter === 'upcoming'}
                    onClick={() => setTimeFilter('upcoming')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                        timeFilter === 'upcoming'
                            ? 'bg-primary text-white'
                            : 'bg-hover text-foreground hover:bg-border'
                    }`}
                >
                    Próximos eventos ({upcomingCount})
                </button>
                <button
                    type="button"
                    role="tab"
                    aria-selected={timeFilter === 'past'}
                    onClick={() => setTimeFilter('past')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                        timeFilter === 'past'
                            ? 'bg-primary text-white'
                            : 'bg-hover text-foreground hover:bg-border'
                    }`}
                >
                    Eventos pasados ({pastCount})
                </button>
            </div>

            <EventList events={filteredEvents} />
        </>
    );
}
