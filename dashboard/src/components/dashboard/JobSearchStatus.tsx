'use client';
import { Card } from "@components/ui";
import { useJobs } from "@/src/hooks";
import Link from "next/link";

function JobSearchStatus() {
  const { data: jobs, isLoading, isError } = useJobs();

  return (
    <Card className="w-fit">
      <h2 className="text-lg font-bold text-orange-400 text-center">Job Search Status</h2>
      {isLoading ? (
        <p className="text-cyan-200">Loading...</p>
      ) : isError ? (
        <p className="text-red-400">Error loading job search status.</p>
      ) : (
        <div className="flex flex-col gap-1 justify-center items-center">
          <div className="flex gap-3 justify-between w-3xs border-b border-cyan-600 pb-1 px-1">
            <span className="text-cyan-200">Applications:</span>
            <span className="font-mono text-cyan-100">{jobs?.applications.length ?? 0}</span>
          </div>
          <div className="flex gap-3 justify-between w-3xs border-b border-cyan-600 pb-1 px-1">
            <span className="text-cyan-200">Interviews:</span>
            <span className="font-mono text-cyan-100">{jobs?.interviews.length ?? 0}</span>
          </div>
          <div className="flex gap-3 justify-between w-3xs border-b border-cyan-600 pb-1 px-1">
            <span className="text-cyan-200">Opportunities:</span>
            <span className="font-mono text-cyan-100">{jobs?.opportunities.length ?? 0}</span>
          </div>
        </div>
      )}
      <Link
        href="/jobs" 
        className="neumorphic px-3 py-1 rounded-4xl w-fit mx-auto
        text-orange-400 text-sm mt-2 font-mono block text-center transition-all duration-300
        hover:bg-cyan-900"
      >
        View Job Dashboard
      </Link>
    </Card>
  )
}

export { JobSearchStatus };