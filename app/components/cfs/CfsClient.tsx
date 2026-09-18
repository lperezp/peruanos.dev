'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, Mic, X } from 'lucide-react';
import { CFS_LIST } from '../../data/cfs';
import CfsCard from './CfsCard';

export default function CfsClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string>('todos');
  const [selectedType, setSelectedType] = useState<string>('todos');
  const [selectedStatus, setSelectedStatus] = useState<string>('todos');

  // Extract all unique topics
  const allTopics = useMemo(() => {
    const topicsSet = new Set<string>();
    CFS_LIST.forEach((item) => {
      item.topics.forEach((topic) => topicsSet.add(topic));
    });
    return Array.from(topicsSet).sort();
  }, []);

  // Filter CFS list
  const filteredCfs = useMemo(() => {
    return CFS_LIST.filter((item) => {
      // Search term
      const matchesSearch =
        searchTerm === '' ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.community.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.topics.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

      // Topic filter
      const matchesTopic =
        selectedTopic === 'todos' ||
        item.topics.some((t) => t.toLowerCase() === selectedTopic.toLowerCase());

      // Type filter
      const matchesType =
        selectedType === 'todos' ||
        item.type.toLowerCase() === selectedType.toLowerCase();

      // Status filter
      const matchesStatus =
        selectedStatus === 'todos' ||
        (selectedStatus === 'open' && (item.status === 'open' || item.status === 'closing_soon' || item.status === 'always_open')) ||
        (selectedStatus === 'always_open' && item.status === 'always_open') ||
        (selectedStatus === 'closed' && item.status === 'closed');

      return matchesSearch && matchesTopic && matchesType && matchesStatus;
    });
  }, [searchTerm, selectedTopic, selectedType, selectedStatus]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTopic('todos');
    setSelectedType('todos');
    setSelectedStatus('todos');
  };

  const hasActiveFilters =
    searchTerm !== '' ||
    selectedTopic !== 'todos' ||
    selectedType !== 'todos' ||
    selectedStatus !== 'todos';

  return (
    <div className="w-full mt-8 flex flex-col gap-8">
      {/* Search and Filters Bar */}
      <div className="flex flex-col gap-4 bg-background/50 p-4 sm:p-6 border border-accent/60 rounded-xl shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-accent" size={18} />
            <input
              type="text"
              placeholder="Buscar por tema, comunidad, tecnología o título..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-accent hover:text-foreground"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Type Dropdown */}
          <div className="flex gap-3">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="py-2.5 px-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all cursor-pointer"
            >
              <option value="todos">Todas las modalidades</option>
              <option value="presencial">Presencial</option>
              <option value="virtual">Virtual</option>
              <option value="híbrido">Híbrido</option>
            </select>

            {/* Status Dropdown */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="py-2.5 px-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all cursor-pointer"
            >
              <option value="todos">Todos los estados</option>
              <option value="open">Convocatorias Abiertas</option>
              <option value="always_open">Abiertas Todo el Año</option>
              <option value="closed">Cerradas</option>
            </select>
          </div>
        </div>

        {/* Topic Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/40">
          <span className="text-xs font-semibold text-accent flex items-center gap-1 mr-1">
            <Filter size={14} />
            Tópicos:
          </span>

          <button
            onClick={() => setSelectedTopic('todos')}
            className={`px-3 py-1 text-xs rounded-full transition-colors cursor-pointer ${
              selectedTopic === 'todos'
                ? 'bg-primary text-white font-medium'
                : 'bg-hover text-foreground hover:bg-border'
            }`}
          >
            Todos
          </button>

          {allTopics.map((topic) => (
            <button
              key={topic}
              onClick={() => setSelectedTopic(topic)}
              className={`px-3 py-1 text-xs rounded-full transition-colors cursor-pointer ${
                selectedTopic.toLowerCase() === topic.toLowerCase()
                  ? 'bg-primary text-white font-medium'
                  : 'bg-hover text-foreground hover:bg-border'
              }`}
            >
              {topic}
            </button>
          ))}

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="ml-auto text-xs text-primary hover:underline flex items-center gap-1 cursor-pointer"
            >
              <X size={12} />
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex justify-between items-center px-1">
        <p className="text-sm font-medium text-accent">
          Mostrando <strong className="text-foreground">{filteredCfs.length}</strong> {filteredCfs.length === 1 ? 'convocatoria' : 'convocatorias'}
        </p>
      </div>

      {/* Grid of CFS Cards */}
      {filteredCfs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCfs.map((cfs) => (
            <CfsCard key={cfs.id} cfs={cfs} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-border rounded-xl bg-background">
          <Mic className="w-12 h-12 text-accent mb-4 opacity-50" />
          <h3 className="text-lg font-bold mb-1">No se encontraron convocatorias</h3>
          <p className="text-sm text-accent max-w-md mb-4">
            No encontramos ninguna convocatoria que coincida con los filtros seleccionados. Intenta ajustar tu búsqueda o limpiar los filtros.
          </p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-primary text-white text-sm rounded-full hover:bg-primary-hover transition-colors"
          >
            Restablecer filtros
          </button>
        </div>
      )}
    </div>
  );
}
