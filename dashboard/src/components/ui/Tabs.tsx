'use client';

import { cn } from '@/src/lib/utils';

interface TabOption<T extends string = string> {
  value: T;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps<T extends string = string> {
  value: T;
  options: TabOption<T>[];
  onChange: (value: T) => void;
  className?: string;
}

function Tabs<T extends string = string>({ value, options, onChange, className }: TabsProps<T>) {
  return (
    <div role="tablist" className={cn('flex flex-wrap gap-2', className)}>
      {options.map((option) => {
        const isActive = option.value === value;

        return (
          <button
            key={option.value}
            role="tab"
            type="button"
            aria-selected={isActive}
            onClick={() => onChange(option.value)}
            className={cn(
              'px-3 py-1 text-xs rounded-full border interactive flex items-center gap-2',
              isActive
                ? 'bg-cyan-900/70 text-cyan-100 border-cyan-400/60'
                : 'bg-cyan-950/40 text-cyan-200 border-cyan-900/40 hover:bg-cyan-900/60 hover:border-cyan-400/60'
            )}
          >
            {option.icon}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export { Tabs };
