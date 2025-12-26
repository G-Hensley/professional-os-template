'use client';

import type { Project } from '@/src/types/project';

function getStatusColor(status: Project['status']): string {
  switch (status) {
    case 'In Progress':
      return 'text-green-400';
    case 'Planning':
    case 'Planned':
      return 'text-yellow-400';
    case 'Blocked':
      return 'text-red-400';
    case 'Not Started':
      return 'text-gray-400';
    case 'Completed':
      return 'text-cyan-400';
    default:
      return 'text-gray-400';
  }
}

function getStatusDot(status: Project['status']): string {
  switch (status) {
    case 'In Progress':
    case 'Completed':
      return '●';
    default:
      return '○';
  }
}

function getPriorityLabel(priority?: number): string {
  if (!priority) return '—';
  if (priority >= 9) return 'High';
  if (priority >= 6) return 'Medium';
  return 'Low';
}

function getPriorityColor(priority?: number): string {
  if (!priority) return 'text-gray-400';
  if (priority >= 9) return 'text-red-400';
  if (priority >= 6) return 'text-yellow-400';
  return 'text-gray-400';
}

interface ProjectDetailPanelProps {
  project: Project;
  onClose: () => void;
}

function ProjectDetailPanel({ project, onClose }: ProjectDetailPanelProps) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-md bg-slate-800 h-full overflow-y-auto p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-orange-400">{project.name}</h2>
          <button
            onClick={onClose}
            className="text-cyan-400 hover:text-cyan-300 text-2xl cursor-pointer"
            aria-label="Close panel"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex gap-6 flex-wrap">
            <div>
              <span className="text-xs text-gray-400 uppercase">Status</span>
              <p className={`${getStatusColor(project.status)}`}>
                {getStatusDot(project.status)} {project.status}
              </p>
            </div>
            <div>
              <span className="text-xs text-gray-400 uppercase">Priority</span>
              <p className={getPriorityColor(project.priority)}>
                {getPriorityLabel(project.priority)}
              </p>
            </div>
              <div>
                <span className="text-xs text-gray-400 uppercase">Type</span>
                <p className="text-cyan-200">{project.type}</p>
              </div>
              <div>
                <span className="text-xs text-gray-400 uppercase">Progress</span>
                <p className="text-cyan-200">~{project.completion_percentage}%</p>
              </div>
            {project.completion_percentage !== undefined && (
              <div>
                <span className="text-xs text-gray-400 uppercase">Progress</span>
                <p className="text-cyan-200">~{project.completion_percentage}%</p>
              </div>
            )}
          </div>

          <div className="flex gap-6">
            {project.due_date && (
            <div>
              <span className="text-xs text-gray-400 uppercase">Due Date</span>
              <p className="text-cyan-200">{project.due_date}</p>
            </div>
          )}

          {project.blocked_by && (
            <div>
              <span className="text-xs text-gray-400 uppercase">Blocked By</span>
              <p className="text-red-400">{project.blocked_by}</p>
            </div>
          )}
          </div>

          <div>
            <span className="text-xs text-gray-400 uppercase">Problem</span>
            <p className="text-cyan-200 text-sm mt-1">{project.problem}</p>
          </div>

          <div>
            <span className="text-xs text-gray-400 uppercase">Solution</span>
            <p className="text-cyan-200 text-sm mt-1">{project.solution}</p>
          </div>

          <div>
            <span className="text-xs text-gray-400 uppercase">Tech Stack</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs bg-slate-700 text-cyan-300 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {project.success_milestone && (
            <div>
              <span className="text-xs text-gray-400 uppercase">Success Milestone</span>
              <p className="text-cyan-200 text-sm mt-1">{project.success_milestone}</p>
            </div>
          )}

          <div className="pt-4 border-t border-slate-700 flex gap-3">
            {project.repo_url && (
              <a
                href={project.repo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-slate-700 text-cyan-300 rounded hover:bg-slate-600 transition-colors text-sm"
              >
                Open in GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export { ProjectDetailPanel };
