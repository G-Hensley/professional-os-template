export const SKILL_LEVELS = [
  'none',
  'novice',
  'apprentice',
  'adept',
  'expert',
  'master',
] as const;

export type SkillLevel = (typeof SKILL_LEVELS)[number];

export const SKILL_LEVEL_VALUES: Record<SkillLevel, number> = {
  none: 0,
  novice: 1,
  apprentice: 2,
  adept: 3,
  expert: 4,
  master: 5,
};

export const PROJECT_STATUSES = ['active', 'planned', 'completed', 'blocked'] as const;
export const PROJECT_PRIORITIES = ['high', 'medium', 'low'] as const;

export const NAV_ITEMS = [
  { name: 'Home', href: '/', icon: 'Home' },
  { name: 'Projects', href: '/projects', icon: 'FolderKanban' },
  { name: 'Automations', href: '/automations', icon: 'Zap' },
  { name: 'Content', href: '/content', icon: 'PenLine' },
  { name: 'Jobs', href: '/jobs', icon: 'Briefcase' },
  { name: 'Profile', href: '/profile', icon: 'User' },
] as const;
