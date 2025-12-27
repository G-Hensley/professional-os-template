'use client';

import type { ProjectFilter } from '@/src/types/project';
import { Tabs, SearchInput } from '@/src/components/ui';

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
      <Tabs value={filter} options={filters} onChange={onFilterChange} />
      <SearchInput value={search} onChange={onSearchChange} className="w-full sm:w-52" />
    </div>
  );
}

export { ProjectFilters };
