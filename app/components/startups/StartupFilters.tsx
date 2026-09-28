import FilterDropdown from '../ui/FilterDropdown';
import { Briefcase } from 'lucide-react';

interface StartupFiltersProps {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
    industries: string[];
    selectedIndustries: string[];
    toggleIndustry: (industry: string) => void;
    isIndustryOpen: boolean;
    setIsIndustryOpen: (value: boolean) => void;
    stages: string[];
    selectedStages: string[];
    toggleStage: (stage: string) => void;
    isStageOpen: boolean;
    setIsStageOpen: (value: boolean) => void;
    hiringOnly: boolean;
    toggleHiringOnly: () => void;
}

export default function StartupFilters({
    searchQuery,
    setSearchQuery,
    industries,
    selectedIndustries,
    toggleIndustry,
    isIndustryOpen,
    setIsIndustryOpen,
    stages,
    selectedStages,
    toggleStage,
    isStageOpen,
    setIsStageOpen,
    hiringOnly,
    toggleHiringOnly,
}: StartupFiltersProps) {
    return (
        <div className="w-full my-8">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Buscar startups..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-2/5 h-[46px] px-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <div className="w-full sm:w-1/4">
                    <FilterDropdown
                        label="Industria"
                        items={industries}
                        selectedItems={selectedIndustries}
                        onToggle={toggleIndustry}
                        isOpen={isIndustryOpen}
                        setIsOpen={setIsIndustryOpen}
                        placeholder="Seleccionar industrias"
                    />
                </div>
                <div className="w-full sm:w-1/4">
                    <FilterDropdown
                        label="Etapa / Stage"
                        items={stages}
                        selectedItems={selectedStages}
                        onToggle={toggleStage}
                        isOpen={isStageOpen}
                        setIsOpen={setIsStageOpen}
                        placeholder="Seleccionar etapas"
                    />
                </div>
                <div className="flex items-center">
                    <button
                        type="button"
                        onClick={toggleHiringOnly}
                        className={`h-[46px] px-4 rounded-md border flex items-center gap-2 font-medium transition-colors cursor-pointer text-sm whitespace-nowrap ${
                            hiringOnly
                                ? 'bg-emerald-500/15 text-emerald-500 border-emerald-500/40'
                                : 'bg-background text-foreground border-border hover:bg-hover'
                        }`}
                    >
                        <Briefcase size={16} className={hiringOnly ? 'text-emerald-500' : 'text-accent'} />
                        <span>Contratando</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
