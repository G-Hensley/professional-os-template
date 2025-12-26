'use client';

import { useState } from 'react';
import { Card, Skeleton } from '@/src/components/ui';
import { useSkills } from '@/src/hooks';
import { SkillBar, LEVEL_ORDER, type SkillLevel } from './SkillBar';

type FilterType = 'all' | 'gaps' | 'top';

function SkillsGridSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading skills"
      className="space-y-6"
    >
      {[1, 2, 3].map((category) => (
        <div key={category} className="space-y-3">
          <Skeleton width="w-32" height="h-5" />
          <div className="space-y-2">
            {[1, 2, 3, 4].map((skill) => (
              <div key={skill} className="flex items-center gap-3">
                <Skeleton width="w-36" height="h-4" />
                <Skeleton width="w-full" height="h-2" rounded />
                <Skeleton width="w-20" height="h-4" />
              </div>
            ))}
          </div>
        </div>
      ))}
      <span className="sr-only">Loading skills...</span>
    </div>
  );
}

function SkillsGrid() {
  const { data: skills, isLoading } = useSkills();
  const [filter, setFilter] = useState<FilterType>('all');

  const filterSkills = (skillList: { name: string; level: SkillLevel }[]) => {
    switch (filter) {
      case 'gaps':
        return skillList.filter((s) =>
          ['none', 'novice', 'apprentice'].includes(s.level)
        );
      case 'top':
        return skillList.filter((s) =>
          ['expert', 'master'].includes(s.level)
        );
      default:
        return skillList;
    }
  };

  const sortByLevel = (skillList: { name: string; level: SkillLevel }[]) => {
    return [...skillList].sort(
      (a, b) => LEVEL_ORDER.indexOf(b.level) - LEVEL_ORDER.indexOf(a.level)
    );
  };

  return (
    <Card className="w-full max-h-84 overflow-y-auto" aria-labelledby="skills-heading">
      <div className="flex items-center justify-between mb-4">
        <h2 id="skills-heading" className="text-lg font-bold text-orange-400">
          Skills
        </h2>
        <div className="flex">
          {(['all', 'gaps', 'top'] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 text-xs first:rounded-l-md last:rounded-r-md capitalize transition-colors
                cursor-pointer ${
                filter === f
                  ? 'bg-cyan-800 text-white'
                  : 'bg-slate-700 text-cyan-300 hover:bg-slate-600'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <SkillsGridSkeleton />
      ) : (
        <div className="space-y-6">
          {skills &&
            Object.entries(skills)
              .filter(([key]) => key !== 'skill_levels')
              .map(([category, categorySkills]) => {
                const skillsArray = Object.entries(
                  categorySkills as Record<string, SkillLevel>
                ).map(([name, level]) => ({ name, level }));

                const filtered = filterSkills(skillsArray);
                const sorted = sortByLevel(filtered);

                if (sorted.length === 0) return null;

                const displayName = category
                  .replace(/_/g, ' ')
                  .replace(/and/g, '&');

                return (
                  <div key={category}>
                    <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wide mb-3
                    text-center border-b pb-1">
                      {displayName}
                    </h3>
                    <div className="space-y-2">
                      {sorted.map((skill) => (
                        <SkillBar
                          key={skill.name}
                          name={skill.name}
                          level={skill.level}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
        </div>
      )}
    </Card>
  );
}

export { SkillsGrid };