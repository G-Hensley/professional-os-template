"use client";

import { useEffect, useRef } from "react";
import { createSwapy } from "swapy";

interface ShellProps {
  children: React.ReactNode;
}

function Shell({ children }: ShellProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const swapy = createSwapy(containerRef.current, {
      animation: "dynamic",
    });

    return () => {
      swapy.destroy();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="neumorphic w-full h-full min-h-fit rounded-4xl px-8 py-6 overflow-y-auto
        columns-1 md:columns-2 2xl:columns-3 gap-6 [column-fill:balance]"
    >
      {children}
    </section>
  );
}

export { Shell };
