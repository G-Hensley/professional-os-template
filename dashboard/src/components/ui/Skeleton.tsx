interface SkeletonProps {
  className?: string;
  /** Width of the skeleton (e.g., 'w-24', 'w-full') */
  width?: string;
  /** Height of the skeleton (e.g., 'h-4', 'h-6') */
  height?: string;
  /** Whether to use rounded-full for circular/pill shapes */
  rounded?: boolean;
}

function Skeleton({
  className = '',
  width = 'w-full',
  height = 'h-4',
  rounded = false,
}: SkeletonProps) {
  return (
    <div
      className={`
        ${width} ${height}
        ${rounded ? 'rounded-full' : 'rounded'}
        bg-cyan-700/50 animate-pulse
        ${className}
      `.trim()}
      aria-hidden="true"
    />
  );
}

export { Skeleton };
