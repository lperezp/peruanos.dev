'use client';

import { useStartupFilters } from '../../hooks/useStartupFilters';
import StartupFilters from './StartupFilters';
import StartupList from './StartupList';

export default function StartupClient() {
    const {
        searchQuery,
        setSearchQuery,
        selectedIndustries,
        selectedStages,
        hiringOnly,
        toggleHiringOnly,
        isIndustryOpen,
        setIsIndustryOpen,
        isStageOpen,
        setIsStageOpen,
        industries,
        stages,
        filteredStartups,
        toggleIndustry,
        toggleStage,
    } = useStartupFilters();

    return (
        <>
            <StartupFilters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                industries={industries}
                selectedIndustries={selectedIndustries}
                toggleIndustry={toggleIndustry}
                isIndustryOpen={isIndustryOpen}
                setIsIndustryOpen={setIsIndustryOpen}
                stages={stages}
                selectedStages={selectedStages}
                toggleStage={toggleStage}
                isStageOpen={isStageOpen}
                setIsStageOpen={setIsStageOpen}
                hiringOnly={hiringOnly}
                toggleHiringOnly={toggleHiringOnly}
            />

            <StartupList startups={filteredStartups} />
        </>
    );
}
