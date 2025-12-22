export interface Project {
  name: string;
  repo_url: string;
  type: 'SaaS' | 'Tool' | 'Library' | 'Website';
  description: string;
  technologies: string[];
  monetization_strategy: string;
  status: 'active' | 'planned' | 'completed' | 'blocked';
  problem: string;
  solution: string;
  target_audience: string;
  mission_statement: string;
  priority?: 'high' | 'medium' | 'low';
  due_date?: string;
  success_milestone?: string;
  tagline?: string;
  blocked_by?: string;
}

export type ProjectStatus = Project['status'];
export type ProjectPriority = NonNullable<Project['priority']>;
