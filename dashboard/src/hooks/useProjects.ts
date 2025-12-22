import { useQuery } from '@tanstack/react-query';
import type { Project } from '@/types/project';

async function fetchProjects(): Promise<{
  active: Project[];
  planned: Project[];
  completed: Project[];
}> {
  // TODO: Fetch from actual JSON files
  return {
    active: [],
    planned: [],
    completed: [],
  };
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
