import FilterDropdown from '../ui/FilterDropdown';

interface EventFiltersProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    cities: string[];
    selectedCities: string[];
    toggleCity: (city: string) => void;
    isCityOpen: boolean;
    setIsCityOpen: (isOpen: boolean) => void;
    topics: string[];
    selectedTopics: string[];
    toggleTopic: (topic: string) => void;
    isTopicOpen: boolean;
    setIsTopicOpen: (isOpen: boolean) => void;
    availableTypes: string[];
    selectedTypes: string[];
    toggleType: (type: string) => void;
    isTypeOpen: boolean;
    setIsTypeOpen: (isOpen: boolean) => void;
}

export default function EventFilters({
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
    availableTypes,
    selectedTypes,
    toggleType,
    isTypeOpen,
    setIsTypeOpen,
}: EventFiltersProps) {
    return (
        <div className="w-full my-10">
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Buscar eventos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-[46px] px-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <FilterDropdown
                    label="Ciudad"
                    items={cities}
                    selectedItems={selectedCities}
                    onToggle={toggleCity}
                    isOpen={isCityOpen}
                    setIsOpen={setIsCityOpen}
                    placeholder="Seleccionar ciudad"
                />

                <FilterDropdown
                    label="Tema"
                    items={topics}
                    selectedItems={selectedTopics}
                    onToggle={toggleTopic}
                    isOpen={isTopicOpen}
                    setIsOpen={setIsTopicOpen}
                    placeholder="Seleccionar tema"
                />

                <FilterDropdown
                    label="Tipo"
                    items={availableTypes}
                    selectedItems={selectedTypes}
                    onToggle={toggleType}
                    isOpen={isTypeOpen}
                    setIsOpen={setIsTypeOpen}
                    placeholder="Seleccionar tipo"
                    capitalize={true}
                />
            </div>

            <div className="h-1 w-full mt-8 bg-border" />
        </div>
    );
}
