'use client';

import { motion } from "framer-motion";

function TopBar() {
  return (
    <motion.nav 
      aria-label="TopBar" 
      className="w-fit mx-auto py-2 px-6 fixed rounded-4xl surface-1 accent-glow left-1/2
      -translate-x-1/2 top-2"
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 280, damping: 16 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* TopBar content goes here */}
      <h2 className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
        <span className="text-lg title-gradient">
          Personal OS
        </span>
      </h2>
    </motion.nav>
  );
}

export { TopBar };
