'use client';

import { useEventFilters } from '../../hooks/useEventFilters';
import EventFilters from './EventFilters';
import EventList from './EventList';
import EventsMap from './EventsMap';

export default function EventsClient() {
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
                <div className="w-full">
                    <EventList events={filteredEvents} />
                </div>
                <div className="w-full hidden lg:block">
                    <EventsMap events={filteredEvents} />
                </div>
            </div>
        </>
    );
}
