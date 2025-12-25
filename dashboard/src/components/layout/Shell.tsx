"use client";

interface ShellProps {
  children: React.ReactNode;
}

function Shell({ children }: ShellProps) {
  return (
    <section className="neumorphic w-fit xl:max-h-[80vh] rounded-4xl
      overflow-y-scroll scrollbar-thin scrollbar-thumb-cyan-800 scrollbar-track-cyan-900
      relative"
    >
      <div className="px-8 py-6 flex flex-wrap gap-6 justify-center">
        {children}
      </div>
      <div
        className="sticky bottom-0 left-0 right-0 w-full h-36 z-10
          bg-linear-to-t from-black/50 to-transparent
          pointer-events-none rounded-b-4xl"
      />
    </section>
  );
}

export { Shell };
