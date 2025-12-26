'use client';

export type SkillLevel = 'none' | 'novice' | 'apprentice' | 'adept' | 'expert' | 'master';

const LEVEL_ORDER: SkillLevel[] = ['none', 'novice', 'apprentice', 'adept', 'expert', 'master'];

const LEVEL_COLORS: Record<SkillLevel, string> = {
  none: 'bg-gray-600',
  novice: 'bg-red-500',
  apprentice: 'bg-orange-500',
  adept: 'bg-yellow-500',
  expert: 'bg-cyan-500',
  master: 'bg-green-500',
};

function getLevelProgress(level: SkillLevel): number {
  const index = LEVEL_ORDER.indexOf(level);
  return ((index + 1) / LEVEL_ORDER.length) * 100;
}

interface SkillBarProps {
  name: string;
  level: SkillLevel;
}

function SkillBar({ name, level }: SkillBarProps) {
  const progress = getLevelProgress(level);
  const colorClass = LEVEL_COLORS[level];

  return (
    <div className="flex items-center gap-3 w-full border-b border-slate-700 pb-2 last:border-0 last:pb-0">
      <span className="text-cyan-200 text-sm w-36 min-w-36 truncate" title={name}>
        {name}
      </span>
      <div className="flex-1 min-w-24 h-2 bg-slate-700 rounded-full overflow-hidden neumorphic">
        <div
          className={`h-full rounded-full transition-all ${colorClass}`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className={`text-xs w-20 min-w-20 text-right capitalize
        ${level === 'none' ? 'text-gray-400' : 
        level === 'novice' ? 'text-red-400' :
        level === 'apprentice' ? 'text-orange-400' :
        level === 'adept' ? 'text-yellow-400' :
        level === 'expert' ? 'text-cyan-400' :
        'text-green-400'}`}>
        {level}
      </span>
    </div>
  );
}

export { SkillBar, LEVEL_ORDER };
