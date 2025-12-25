'use client';

import Link from 'next/link';
import { Card } from '../ui/Card';
import { ProgressBar, Skeleton } from '@/src/components/ui';
import { useActiveProjects } from '@/src/hooks';

function ProjectListSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading active projects"
      className="flex flex-col gap-2"
    >
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="rounded-lg py-2 px-3 neumorphic flex items-center justify-between gap-4"
        >
          <Skeleton width="w-24" height="h-5" />
          <Skeleton width="w-16" height="h-4" rounded />
        </div>
      ))}
      <span className="sr-only">Loading active projects...</span>
    </div>
  );
}

function ActiveProjectsMini() {
  const { data: activeProjects, isLoading, isError } = useActiveProjects();

  return (
    <Card className="w-fit" aria-labelledby="active-projects-heading">
      <h2
        id="active-projects-heading"
        className="text-lg font-bold text-orange-400 text-center"
      >
        Active Projects
      </h2>

      {isLoading ? (
        <ProjectListSkeleton />
      ) : isError ? (
        <p role="alert" className="text-red-400">
          Error loading active projects.
        </p>
      ) : activeProjects.length === 0 ? (
        <p className="text-cyan-200">No active projects found.</p>
      ) : (
        <ul className="flex flex-col gap-2" aria-label="Active projects list">
          {activeProjects.map((project) => (
            <li key={project.name}>
              <a
                href={project.repo_url}
                className="rounded-lg py-2 px-3 hover:bg-cyan-800/30 transition-colors duration-200 neumorphic flex items-center justify-between gap-4"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.name}${project.completion_percentage !== undefined ? `, ${project.completion_percentage}% complete` : `, status: ${project.status}`} (opens in new tab)`}
              >
                <span className="text-cyan-200 truncate">{project.name}</span>
                {project.completion_percentage !== undefined ? (
                  <ProgressBar value={project.completion_percentage} />
                ) : (
                  <span className="font-mono text-orange-400">{project.status}</span>
                )}
              </a>
            </li>
          ))}
        </ul>
      )}

      <Link
        href="/projects"
        className="text-orange-400 text-sm mt-2 font-mono block text-center w-fit mx-auto neumorphic px-3 py-1 rounded-4xl transition-all duration-300 hover:bg-cyan-900"
        aria-label="View all projects"
      >
        View All Projects
      </Link>
    </Card>
  );
}

export { ActiveProjectsMini };