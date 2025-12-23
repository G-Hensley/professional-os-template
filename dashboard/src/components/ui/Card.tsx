function Card({ children }: { children: React.ReactNode }) {
  return <div className="card neumorphic rounded-3xl px-6 py-4 w-fit flex flex-col gap-2">{children}</div>;
}
export { Card };