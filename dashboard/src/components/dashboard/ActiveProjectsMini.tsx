'use client';

import { Card } from '../ui/Card';
import { useActiveProjects } from "@/src/hooks";
import { ProgressBar } from '@/src/components/ui';
import Link from 'next/dist/client/link';

function ActiveProjectsMini() {
  const { data: activeProjects, isLoading, isError } = useActiveProjects();

  console.log(activeProjects);

  return (
    <Card className='w-fit'>
      <h2 className="text-lg font-bold text-orange-400 text-center">Active Projects</h2>
      {isLoading ? (
        <p className="text-cyan-200">Loading...</p>
      ) : isError ? (
        <p className="text-red-400">Error loading active projects.</p>
      ) : activeProjects.length === 0 ? (
        <p className="text-cyan-200">No active projects found.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {activeProjects.map((project) => (
            <a
              href={project.repo_url}
              key={project.name}
              className="rounded-lg py-2 px-3 hover:bg-cyan-800/30 transition-colors duration-200 neumorphic flex items-center
              justify-between gap-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className='text-cyan-200 truncate'>{project.name}</span>
              {project.completion_percentage !== undefined ? (
                <ProgressBar value={project.completion_percentage} />
              ) : (
                <span className="font-mono text-orange-400">{project.status}</span>
              )}
            </a>
          ))}
        </div>
      )}
      <Link href="/projects" className="text-orange-400 hover:underline text-sm mt-2 font-mono block text-center">
        View All Projects
      </Link>
    </Card>
  )
}

export { ActiveProjectsMini };