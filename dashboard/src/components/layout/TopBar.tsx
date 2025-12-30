'use client';

import { motion } from "framer-motion";
import { SearchInput } from "@/src/components/ui";
import { useState } from "react";

function TopBar() {
  const [search, setSearch] = useState('');

  return (
    <motion.nav 
      aria-label="TopBar" 
      className="w-full max-w-6xl mx-auto py-2 px-4 fixed rounded-4xl surface-1 accent-glow left-1/2
      -translate-x-1/2 top-2 z-50"
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 280, damping: 16 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* TopBar content goes here */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" aria-hidden="true"></span>
          <span className="text-lg title-gradient">
            Personal OS
          </span>
        </h2>
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search..."
          className="w-full sm:w-64"
        />
      </div>
    </motion.nav>
  );
}

export { TopBar };
