export interface Project {
  name: string;
  repo_url: string;
  completion_percentage?: number;
  type: string;
  description: string;
  technologies: string[];
  monetization_strategy: string;
  status: 'In Progress' | 'Planning' | 'Planned' | 'Blocked' | 'Not Started' | 'Completed';
  problem: string;
  solution: string;
  target_audience: string[];
  mission_statement: string;
  priority?: number;
  due_date?: string;
  success_milestone?: string;
  tagline?: string;
  blocked_by?: string;
}

export type ProjectFilter = 'all' | 'active' | 'planned' | 'completed';
export type ProjectPriority = 'high' | 'medium' | 'low';
