function Card({ children, className }: { children: React.ReactNode, className?: string }) {
  return <div className={`card neumorphic rounded-3xl px-6 py-4 h-fit w-fit flex flex-col gap-2 ${className ?? ''}`}>{children}</div>;
}
export { Card };