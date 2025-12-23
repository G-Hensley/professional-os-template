import { useQuery } from '@tanstack/react-query';

interface Application {
  id: string;
  company: string;
  role: string;
  status: 'applied' | 'interviewing' | 'offered' | 'rejected' | 'withdrawn';
  applied_date: string;
  salary_range?: string;
  source?: string;
  notes?: string;
}

interface Interview {
  id: string;
  company: string;
  role: string;
  stage: string;
  date: string;
  notes?: string;
}

interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  score?: number;
  url: string;
  source: string;
}

interface JobsResponse {
  applications: Application[];
  interviews: Interview[];
  opportunities: JobOpportunity[];
  lastMonitorRun: string | null;
}

async function fetchJobs(): Promise<JobsResponse> {
  const res = await fetch('/api/jobs');
  if (!res.ok) throw new Error('Failed to fetch jobs');
  return res.json();
}

export function useJobs() {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: fetchJobs,
  });
}

export function useApplications() {
  const { data, ...rest } = useJobs();
  return {
    data: data?.applications ?? [],
    ...rest,
  };
}

export function useInterviews() {
  const { data, ...rest } = useJobs();
  return {
    data: data?.interviews ?? [],
    ...rest,
  };
}

export function useJobOpportunities() {
  const { data, ...rest } = useJobs();
  return {
    data: data?.opportunities ?? [],
    lastMonitorRun: data?.lastMonitorRun ?? null,
    ...rest,
  };
}

export function useJobStats() {
  const { data, ...rest } = useJobs();

  const applications = data?.applications ?? [];
  const stats = {
    total: applications.length,
    applied: applications.filter(a => a.status === 'applied').length,
    interviewing: applications.filter(a => a.status === 'interviewing').length,
    offered: applications.filter(a => a.status === 'offered').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
    toApply: data?.opportunities?.length ?? 0,
  };

  return {
    data: stats,
    ...rest,
  };
}
