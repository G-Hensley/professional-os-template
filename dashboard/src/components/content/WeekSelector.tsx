'use client';

import { ChevronLeft, ChevronRight, CalendarRange } from 'lucide-react';

interface WeekSelectorProps {
  currentWeekStart: string;
  currentWeekEnd: string;
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
}

function formatWeekRange(weekStart: string, weekEnd: string): string {
  if (!weekStart || !weekEnd) return 'No dates available';

  const start = new Date(weekStart);
  const end = new Date(weekEnd);

  const startMonth = start.toLocaleDateString('en-US', { month: 'short' });
  const endMonth = end.toLocaleDateString('en-US', { month: 'short' });
  const startDay = start.getDate();
  const endDay = end.getDate();

  if (startMonth === endMonth) {
    return `${startMonth} ${startDay}-${endDay}`;
  }
  return `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
}

function WeekSelector({
  currentWeekStart,
  currentWeekEnd,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
}: WeekSelectorProps) {
  const weekLabel = formatWeekRange(currentWeekStart, currentWeekEnd);

  return (
    <nav aria-label="Week navigation" className="flex items-center gap-2">
      <button
        onClick={onPrevious}
        disabled={!hasPrevious}
        className={`px-3 py-1 text-xs rounded-full border transition-colors interactive ${
          hasPrevious
            ? 'bg-cyan-950/40 text-cyan-200 border-cyan-900/40 hover:bg-cyan-900/60 hover:border-cyan-400/60'
            : 'bg-cyan-950/20 text-cyan-400/50 border-cyan-900/20 cursor-not-allowed'
        }`}
        aria-label="Previous week"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
      </button>
      <span className="text-cyan-200 font-medium min-w-fit text-center flex items-center gap-2">
        <CalendarRange className="h-4 w-4 text-cyan-300/70" aria-hidden="true" />
        {weekLabel}
      </span>
      <button
        onClick={onNext}
        disabled={!hasNext}
        className={`px-3 py-1 text-xs rounded-full border transition-colors interactive ${
          hasNext
            ? 'bg-cyan-950/40 text-cyan-200 border-cyan-900/40 hover:bg-cyan-900/60 hover:border-cyan-400/60'
            : 'bg-cyan-950/20 text-cyan-400/50 border-cyan-900/20 cursor-not-allowed'
        }`}
        aria-label="Next week"
      >
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </nav>
  );
}

export { WeekSelector };
