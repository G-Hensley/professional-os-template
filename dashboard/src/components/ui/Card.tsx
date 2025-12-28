'use client';

function Card({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div
      className={`transition-all duration-300 ease-in-out hover:border-cyan-700 card surface-2 rounded-3xl px-5 py-4 flex flex-col gap-2 ${className ?? ''}`}>
      {children}
    </div>
  );
}
export { Card };
