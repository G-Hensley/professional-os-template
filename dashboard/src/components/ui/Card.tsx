'use client';

import { motion } from "framer-motion";

function Card({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className={`card surface-2 rounded-3xl px-5 py-4 flex flex-col gap-2 ${className ?? ''}`}>
      {children}
    </motion.div>
  );
}
export { Card };
