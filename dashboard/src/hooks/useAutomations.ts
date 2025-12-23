import { useQuery } from '@tanstack/react-query';

interface Pipeline {
  name: string;
  schedule: string;
  type: 'daily' | 'weekly' | 'monthly';
}

interface AutomationRun {
  name: string;
  type: string;
  timestamp: string;
  status: 'success' | 'error';
  file: string;
  summary?: string;
}

interface AutomationsResponse {
  pipelines: Pipeline[];
  runs: AutomationRun[];
}

async function fetchAutomations(): Promise<AutomationsResponse> {
  const res = await fetch('/api/automations');
  if (!res.ok) throw new Error('Failed to fetch automations');
  return res.json();
}

export function useAutomations() {
  return useQuery({
    queryKey: ['automations'],
    queryFn: fetchAutomations,
  });
}

export function usePipelines() {
  const { data, ...rest } = useAutomations();
  return {
    data: data?.pipelines ?? [],
    ...rest,
  };
}

export function useAutomationRuns() {
  const { data, ...rest } = useAutomations();
  return {
    data: data?.runs ?? [],
    ...rest,
  };
}

export function useRecentAutomations(limit = 5) {
  const { data, ...rest } = useAutomations();
  return {
    data: (data?.runs ?? []).slice(0, limit),
    ...rest,
  };
}
