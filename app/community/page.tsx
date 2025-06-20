'use client';

import Link from 'next/link';
import { useCommunityFilters } from '../hooks/useCommunityFilters';
import CommunityFilters from '../components/community-filters/community-filters';
import CommunityList from '../components/community-list/community-list';

export default function Community() {
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
        <main className="flex w-full max-w-7xl flex-col items-center bg-[var(--color-background)] mx-auto">
            <section className={`py-20 flex flex-col items-start w-full px-8 sm:px-10`}>
                <h1 className="text-6xl text-left font-bold mb-4 leading-[1.4] w-full">Comunidades</h1>
                <p className="text-left mb-4 w-full text-[20px]">Descubre y únete a las comunidades que impulsan la tecnología en el Perú. ¿Organizas una comunidad? ¡Agrégala a la lista!</p>
                <Link className="px-6 py-3 text-center bg-[var(--color-primary)] text-white rounded-full hover:bg-[var(--color-primary-hover)] transition" href='https://github.com/lperezp/peruanos.dev/pulls' target='_blank' rel="noopener noreferrer">
                    Publicar una comunidad
                </Link>

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
            </section>
        </main>
    );
}


