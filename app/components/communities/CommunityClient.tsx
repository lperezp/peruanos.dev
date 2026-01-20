'use client';

import { useCommunityFilters } from '../../hooks/useCommunityFilters';
import CommunityFilters from './CommunityFilters';
import CommunityList from './CommunityList';

export default function CommunityClient() {
    const {
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
    } = useCommunityFilters();

    return (
        <>
            <CommunityFilters
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
            />

            <CommunityList communities={filteredCommunities} />
        </>
    );
}
