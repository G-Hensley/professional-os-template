'use client';

import { useState } from 'react';
import { Card } from '@/src/components/ui';
import { useProjects } from '@/src/hooks';
import type { Project, ProjectFilter } from '@/src/types/project';
import { ProjectFilters } from './ProjectFilters';
import { ProjectRow } from './ProjectRow';
import { ProjectDetailPanel } from './ProjectDetailPanel';
import { ProjectsTableSkeleton } from './ProjectsTableSkeleton';

function ProjectsTable() {
  const { data, isLoading } = useProjects();
  const [filter, setFilter] = useState<ProjectFilter>('all');
  const [search, setSearch] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const allProjects = [
    ...(data?.active ?? []),
    ...(data?.planned ?? []),
    ...(data?.completed ?? []),
  ];

  const filteredProjects = allProjects
    .filter((project) => {
      if (filter === 'all') return true;
      if (filter === 'active') {
        return project.status === 'In Progress' || project.status === 'Planning';
      }
      if (filter === 'planned') {
        return project.status === 'Planned' || project.status === 'Blocked' || project.status === 'Not Started';
      }
      if (filter === 'completed') {
        return project.status === 'Completed';
      }
      return true;
    })
    .filter((project) => {
      if (!search) return true;
      const searchLower = search.toLowerCase();
      return (
        project.name.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.technologies.some((t) => t.toLowerCase().includes(searchLower))
      );
    })
    .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));

  return (
    <>
      <Card className="w-4xl min-w-sm" aria-labelledby="projects-heading">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <h2 id="projects-heading" className="text-lg font-bold text-orange-400">
            Projects
          </h2>
          <ProjectFilters
            filter={filter}
            onFilterChange={setFilter}
            search={search}
            onSearchChange={setSearch}
          />
        </div>

        {isLoading ? (
          <ProjectsTableSkeleton />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700 text-left">
                    <th className="py-2 pr-4 text-cyan-400 font-semibold">Name</th>
                    <th className="py-2 pr-4 text-cyan-400 font-semibold">Status</th>
                    <th className="py-2 pr-4 text-cyan-400 font-semibold">Priority</th>
                    <th className="py-2 pr-4 text-cyan-400 font-semibold">Blocked By</th>
                    <th className="py-2 text-cyan-400 font-semibold">Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.map((project) => (
                    <ProjectRow
                      key={project.name}
                      project={project}
                      onClick={() => setSelectedProject(project)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-4">
              Showing {filteredProjects.length} of {allProjects.length} projects
            </p>
          </>
        )}
      </Card>

      {selectedProject && (
        <ProjectDetailPanel
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}

export { ProjectsTable };
