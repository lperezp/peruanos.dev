import FilterDropdown from '../filter-dropdown/filter-dropdown';

interface CommunityFiltersProps {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
    cities: string[];
    selectedCities: string[];
    toggleCity: (city: string) => void;
    isCityOpen: boolean;
    setIsCityOpen: (value: boolean) => void;
    topics: string[];
    selectedTopics: string[];
    toggleTopic: (topic: string) => void;
    isTopicOpen: boolean;
    setIsTopicOpen: (value: boolean) => void;
}

export default function CommunityFilters({
    searchQuery,
    setSearchQuery,
    cities,
    selectedCities,
    toggleCity,
    isCityOpen,
    setIsCityOpen,
    topics,
    selectedTopics,
    toggleTopic,
    isTopicOpen,
    setIsTopicOpen,
}: CommunityFiltersProps) {
    return (
        <div className="w-full my-8">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Buscar comunidades..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-1/2 px-4 py-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-background)] text-[var(--color-foreground)]"
                />
                <div className="w-full sm:w-1/4">
                    <FilterDropdown
                        label="Ciudad"
                        items={cities}
                        selectedItems={selectedCities}
                        onToggle={toggleCity}
                        isOpen={isCityOpen}
                        setIsOpen={setIsCityOpen}
                        placeholder="Seleccionar ciudades"
                    />
                </div>
                <div className="w-full sm:w-1/4">
                    <FilterDropdown
                        label="Temas"
                        items={topics}
                        selectedItems={selectedTopics}
                        onToggle={toggleTopic}
                        isOpen={isTopicOpen}
                        setIsOpen={setIsTopicOpen}
                        placeholder="Seleccionar temas"
                    />
                </div>
            </div>
        </div>
    );
}
