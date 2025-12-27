'use client';

import { Search } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

function SearchInput({ value, onChange, placeholder = 'Search...', className }: SearchInputProps) {
  return (
    <label className={cn('relative flex items-center', className)}>
      <Search className="absolute left-3 h-4 w-4 text-cyan-300/70" aria-hidden="true" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-full border border-cyan-800/40 bg-slate-950/70 py-1.5 pl-9 pr-3 text-sm text-cyan-100 placeholder:text-cyan-400/70 transition-colors focus:border-cyan-400/70 focus:outline-none"
      />
    </label>
  );
}

export { SearchInput };
