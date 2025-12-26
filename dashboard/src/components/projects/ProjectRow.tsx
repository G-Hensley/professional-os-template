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

interface ProjectRowProps {
  project: Project;
  onClick: () => void;
}

function ProjectRow({ project, onClick }: ProjectRowProps) {
  return (
    <tr
      onClick={onClick}
      className="border-b border-slate-700/50 hover:bg-slate-700/30 cursor-pointer transition-colors"
    >
      <td className="py-3 pr-4 text-cyan-200 font-medium">
        {project.name}
      </td>
      <td className={`py-3 pr-4 ${getStatusColor(project.status)}`}>
        {getStatusDot(project.status)} {project.status}
      </td>
      <td className={`py-3 pr-4 ${getPriorityColor(project.priority)}`}>
        {getPriorityLabel(project.priority)}
      </td>
      <td className="py-3 pr-4 text-gray-400">
        {project.blocked_by || '—'}
      </td>
      <td className="py-3 text-gray-400">
        {project.due_date || '—'}
      </td>
    </tr>
  );
}

export { ProjectRow };
