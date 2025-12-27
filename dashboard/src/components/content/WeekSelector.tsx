'use client';

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
    <nav aria-label="Week navigation" className="flex items-center gap-4">
      <button
        onClick={onPrevious}
        disabled={!hasPrevious}
        className={`px-3 py-1 text-sm rounded transition-colors ${
          hasPrevious
            ? 'bg-slate-700 text-cyan-300 hover:bg-slate-600 cursor-pointer'
            : 'bg-slate-800 text-gray-500 cursor-not-allowed'
        }`}
        aria-label="Previous week"
      >
        ←
      </button>
      <span className="text-cyan-200 font-medium min-w-fit text-center">
        {weekLabel}
      </span>
      <button
        onClick={onNext}
        disabled={!hasNext}
        className={`px-3 py-1 text-sm rounded transition-colors ${
          hasNext
            ? 'bg-slate-700 text-cyan-300 hover:bg-slate-600 cursor-pointer'
            : 'bg-slate-800 text-gray-500 cursor-not-allowed'
        }`}
        aria-label="Next week"
      >
        →
      </button>
    </nav>
  );
}

export { WeekSelector };
