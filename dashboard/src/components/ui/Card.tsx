'use client';

import { motion } from "framer-motion";

function Card({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.div
      whileHover={{ scaleX: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className={`card neumorphic rounded-3xl px-6 py-4 flex flex-col gap-2 ${className ?? ''}`}>
      {children}
    </motion.div>
  );
}
export { Card };