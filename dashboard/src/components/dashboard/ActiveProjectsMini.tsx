'use client';

import { Card } from '../ui/Card';
import { useActiveProjects } from "@/src/hooks";

function ActiveProjectsMini() {
  const { data: activeProjects, isLoading, isError } = useActiveProjects();

  console.log(activeProjects);

  return (
    <Card>
      <h2 className="text-lg font-bold text-orange-400 text-center">Active Projects</h2>
      {isLoading ? (
        <p className="text-cyan-200">Loading...</p>
      ) : isError ? (
        <p className="text-red-400">Error loading active projects.</p>
      ) : activeProjects.length === 0 ? (
        <p className="text-cyan-200">No active projects found.</p>
      ) : (
        <ul className="space-y-2">
          {activeProjects.map((project) => (
            <li
              key={project.name}
              className="rounded-lg py-2 px-3 hover:bg-cyan-800/30 transition-colors duration-200 neumorphic"
            >
              <a href={project.repo_url} target="_blank" rel="noopener noreferrer" className='text-cyan-200 truncate'>{project.name}</a>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}

export { ActiveProjectsMini };