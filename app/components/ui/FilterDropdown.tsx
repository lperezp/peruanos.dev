import { useEffect, useRef } from 'react';

interface FilterDropdownProps {
    label: string;
    items: string[];
    selectedItems: string[];
    onToggle: (item: string) => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    placeholder: string;
    capitalize?: boolean;
}

export default function FilterDropdown({
    label,
    items,
    selectedItems,
    onToggle,
    isOpen,
    setIsOpen,
    placeholder,
    capitalize = false
}: FilterDropdownProps) {
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, setIsOpen]);

    return (
        <div className="relative" ref={dropdownRef}>
            <label className="block text-sm font-medium mb-2">{label}</label>
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full p-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-left flex items-center justify-between"
                >
                    <span className="text-sm">
                        {selectedItems.length > 0
                            ? `${selectedItems.length} seleccionado${selectedItems.length > 1 ? 's' : ''}`
                            : placeholder}
                    </span>
                    <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                {isOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-background border border-border rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {items.length > 0 ? (
                            items.map(item => (
                                <label key={item} className="flex items-center cursor-pointer hover:bg-border p-3 transition">
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.includes(item)}
                                        onChange={() => onToggle(item)}
                                        className="mr-2 w-4 h-4 accent-primary"
                                    />
                                    <span className={`text-sm ${capitalize ? 'capitalize' : ''}`}>{item}</span>
                                </label>
                            ))
                        ) : (
                            <div className="p-3 text-sm text-accent">
                                No hay opciones disponibles
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
