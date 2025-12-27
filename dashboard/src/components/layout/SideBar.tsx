'use client';

import React from "react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/dist/client/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FolderKanban,
  Workflow,
  FileText,
  Briefcase,
  User,
  SidebarClose,
  SidebarOpen
} from "lucide-react";

function SideBar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/projects", label: "Projects", icon: FolderKanban },
    { href: "/automations", label: "Automations", icon: Workflow },
    { href: "/content", label: "Content", icon: FileText },
    { href: "/jobs", label: "Jobs", icon: Briefcase },
    { href: "/profile", label: "Profile", icon: User }
  ]

  return (
    <nav aria-label="Sidebar" className="w-fit relative h-fit flex flex-col gap-4 items-center">
      {/* SideBar content goes here */}
      <div className="flex flex-col surface-1 rounded-4xl">
        {links.map(({ href, label, icon }) => (
          <Link 
            key={href} 
            href={href}
            className={`px-5 py-3 first:rounded-t-4xl last:rounded-b-4xl hover:bg-cyan-950/60
            hover:text-orange-500 transition-colors duration-300 ease-in-out flex items-center gap-2 interactive
            ${pathname === href ? 'bg-cyan-900/70 text-orange-500 relative' : 'text-orange-300'} group`}
          >
            {React.createElement(icon, { size: 24, className: `${pathname === href ? 'text-orange-500' : 'text-orange-300'} group-hover:text-orange-500` })}
            <AnimatePresence>
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="overflow-hidden whitespace-nowrap"
                >
                  {label}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        ))}
        
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 surface-2 py-4 rounded-full hover:bg-cyan-900/60 transition-colors duration-300 ease-in-out
        text-cyan-200 hover:text-cyan-100 flex items-center gap-2 interactive"
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? <SidebarClose size={24} /> : <SidebarOpen size={24} />}
      </button>
    </nav>
  );
}

export { SideBar };
