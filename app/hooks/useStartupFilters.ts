import { useState, useMemo, useCallback, useEffect } from 'react';
import { Startup } from '../models/startup.model';
import { STARTUPS } from '../data/startups';
import { useDebounce } from './useDebounce';
import { trackEvent } from '../lib/analytics';

export const useStartupFilters = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
    const [selectedStages, setSelectedStages] = useState<string[]>([]);
    const [hiringOnly, setHiringOnly] = useState(false);
    const [isIndustryOpen, setIsIndustryOpen] = useState(false);
    const [isStageOpen, setIsStageOpen] = useState(false);

    const getFilteredStartups = useCallback((
        startups: Startup[],
        search: string,
        industries: string[],
        stages: string[],
        onlyHiring: boolean
    ): Startup[] => {
        return startups.filter((startup) => {
            const matchesSearch = search === '' ||
                startup.name.toLowerCase().includes(search.toLowerCase()) ||
                startup.description.toLowerCase().includes(search.toLowerCase());

            const matchesIndustry = industries.length === 0 ||
                industries.some((ind) => startup.industry.includes(ind));

            const matchesStage = stages.length === 0 ||
                (startup.stage && stages.includes(startup.stage));

            const matchesHiring = !onlyHiring || startup.hiring === true;

            return matchesSearch && matchesIndustry && matchesStage && matchesHiring;
        });
    }, []);

    const filteredStartups = useMemo(() => {
        return getFilteredStartups(STARTUPS, searchQuery, selectedIndustries, selectedStages, hiringOnly);
    }, [searchQuery, selectedIndustries, selectedStages, hiringOnly, getFilteredStartups]);

    const industries = useMemo(() => {
        const indSet = new Set(STARTUPS.flatMap((startup) => startup.industry));
        return Array.from(indSet).sort();
    }, []);

    const stages = useMemo(() => {
        const stageSet = new Set(STARTUPS.map((startup) => startup.stage).filter(Boolean) as string[]);
        return Array.from(stageSet).sort();
    }, []);

    const toggleIndustry = useCallback((industry: string) => {
        trackEvent('filter_startups', { event_name: industry, filter_type: 'industry', section: 'Startups' });
        setSelectedIndustries((prev) =>
            prev.includes(industry) ? prev.filter((i) => i !== industry) : [...prev, industry]
        );
    }, []);

    const toggleStage = useCallback((stage: string) => {
        trackEvent('filter_startups', { event_name: stage, filter_type: 'stage', section: 'Startups' });
        setSelectedStages((prev) =>
            prev.includes(stage) ? prev.filter((s) => s !== stage) : [...prev, stage]
        );
    }, []);

    const toggleHiringOnly = useCallback(() => {
        setHiringOnly((prev) => {
            const next = !prev;
            trackEvent('filter_startups', { event_name: String(next), filter_type: 'hiring', section: 'Startups' });
            return next;
        });
    }, []);

    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    useEffect(() => {
        if (debouncedSearchQuery) trackEvent('filter_startups', { event_name: debouncedSearchQuery, filter_type: 'search', section: 'Startups' });
    }, [debouncedSearchQuery]);

    return {
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
    };
};
