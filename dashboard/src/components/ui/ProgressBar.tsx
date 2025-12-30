function ProgressBar({ value }: { value: number }) {
  const clampedValue = Math.max(0, Math.min(100, value));

  return (
    <div
      className="w-20 h-4 rounded-full bg-slate-950/70 border border-cyan-800/40"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clampedValue}
    >
      <div
        className={`h-4 rounded-full transition-all duration-500 ease-in-out
          ${clampedValue < 50 ? 'bg-red-500' : clampedValue < 100 ? 'bg-orange-500' : 'bg-green-500'}`}
        style={{ width: `${clampedValue}%` }}
      />
    </div>
  );
}

export { ProgressBar };
