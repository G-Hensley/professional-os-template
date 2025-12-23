function Card({ children }: { children: React.ReactNode }) {
  return <div className="card neumorphic rounded-3xl p-4">{children}</div>;
}
export { Card };