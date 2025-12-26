'use client';

import type { ProjectFilter } from '@/src/types/project';

interface ProjectFiltersProps {
  filter: ProjectFilter;
  onFilterChange: (filter: ProjectFilter) => void;
  search: string;
  onSearchChange: (search: string) => void;
}

const filters: { value: ProjectFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'planned', label: 'Planned' },
  { value: 'completed', label: 'Completed' },
];

function ProjectFilters({
  filter,
  onFilterChange,
  search,
  onSearchChange,
}: ProjectFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
      <div className="flex">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
            className={`px-3 py-1 text-xs first:rounded-l-md last:rounded-r-md transition-colors cursor-pointer ${
              filter === f.value
                ? 'bg-cyan-800 text-white'
                : 'bg-slate-700 text-cyan-300 hover:bg-slate-600'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="px-3 py-1 text-sm bg-slate-700 text-cyan-200 rounded border border-slate-600 focus:border-cyan-500 focus:outline-none w-full sm:w-40"
      />
    </div>
  );
}

export { ProjectFilters };
