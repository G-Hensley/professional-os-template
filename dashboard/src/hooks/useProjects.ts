import { useQuery } from '@tanstack/react-query';
import type { Project } from '@/types/project';

interface ProjectsResponse {
  active: Project[];
  planned: Project[];
  completed: Project[];
}

async function fetchProjects(): Promise<ProjectsResponse> {
  const res = await fetch('/api/projects');
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
}

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });
}

export function useActiveProjects() {
  const { data, ...rest } = useProjects();
  return {
    data: data?.active ?? [],
    ...rest,
  };
}

export function usePlannedProjects() {
  const { data, ...rest } = useProjects();
  return {
    data: data?.planned ?? [],
    ...rest,
  };
}

export function useCompletedProjects() {
  const { data, ...rest } = useProjects();
  return {
    data: data?.completed ?? [],
    ...rest,
  };
}
