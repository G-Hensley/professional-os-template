'use client';

import { useMemo, useState } from 'react';
import { Card, Tabs, SearchInput, Skeleton } from '@/src/components/ui';
import { useApplications } from '@/src/hooks';
import { formatDate } from '@/src/lib/utils';
import { Briefcase, CheckCircle2, Clock, XCircle } from 'lucide-react';

type FilterType = 'all' | 'applied' | 'interviewing' | 'offered' | 'rejected' | 'withdrawn';

const FILTER_OPTIONS = [
  { value: 'all', label: 'All', icon: <Briefcase className="h-3.5 w-3.5" aria-hidden="true" /> },
  { value: 'applied', label: 'Applied', icon: <Clock className="h-3.5 w-3.5" aria-hidden="true" /> },
  { value: 'interviewing', label: 'Interviewing', icon: <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" /> },
  { value: 'offered', label: 'Offered', icon: <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" /> },
  { value: 'rejected', label: 'Rejected', icon: <XCircle className="h-3.5 w-3.5" aria-hidden="true" /> },
  { value: 'withdrawn', label: 'Withdrawn', icon: <XCircle className="h-3.5 w-3.5" aria-hidden="true" /> },
];

function ApplicationsSkeleton() {
  return (
    <div role="status" aria-label="Loading applications" className="space-y-3">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center gap-4 py-2">
          <Skeleton width="w-28" height="h-4" />
          <Skeleton width="w-32" height="h-4" />
          <Skeleton width="w-20" height="h-4" />
        </div>
      ))}
    </div>
  );
}

function ApplicationsTable() {
  const { data: applications, isLoading } = useApplications();
  const [filter, setFilter] = useState<FilterType>('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return applications
      .filter((app) => (filter === 'all' ? true : app.status === filter))
      .filter((app) => {
        if (!search) return true;
        const query = search.toLowerCase();
        return (
          app.company.toLowerCase().includes(query) ||
          app.role.toLowerCase().includes(query) ||
          (app.source ?? '').toLowerCase().includes(query)
        );
      });
  }, [applications, filter, search]);

  return (
    <Card className="w-full max-h-112 h-fit scroll-fade" aria-labelledby="applications-heading">
      <div className="flex h-full flex-col">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <h2 id="applications-heading" className="text-lg font-semibold text-accent-strong">
            Applications
          </h2>
          <div className="flex flex-wrap gap-3">
            <Tabs value={filter} options={FILTER_OPTIONS} onChange={(value) => setFilter(value as FilterType)} />
            <SearchInput value={search} onChange={setSearch} className="w-full sm:w-52" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-1 pb-8">
          {isLoading ? (
            <ApplicationsSkeleton />
          ) : filtered.length === 0 ? (
            <p className="text-muted text-sm">No applications found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-cyan-800/40 text-left">
                    <th className="py-2 pr-4 text-cyan-200 font-semibold">Company</th>
                    <th className="py-2 pr-4 text-cyan-200 font-semibold">Role</th>
                    <th className="py-2 pr-4 text-cyan-200 font-semibold">Status</th>
                    <th className="py-2 pr-4 text-cyan-200 font-semibold">Applied</th>
                    <th className="py-2 text-cyan-200 font-semibold">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((app) => (
                    <tr
                      key={app.id}
                      className="border-b border-cyan-900/40 hover:bg-cyan-900/30 transition-colors interactive"
                    >
                      <td className="py-2 pr-4 text-cyan-200 font-medium">{app.company}</td>
                      <td className="py-2 pr-4 text-cyan-200">{app.role}</td>
                      <td className="py-2 pr-4 text-cyan-200 capitalize">{app.status}</td>
                      <td className="py-2 pr-4 text-muted">{formatDate(app.applied_date)}</td>
                      <td className="py-2 text-muted">{app.source ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

export { ApplicationsTable };
