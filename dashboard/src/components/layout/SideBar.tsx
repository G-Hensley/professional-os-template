'use client';

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/dist/client/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
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
    { href: "/", label: "Home", icon: <Home className="text-orange-300" size={24} /> },
    { href: "/projects", label: "Projects", icon: <FolderKanban className="text-orange-300" size={24} /> },
    { href: "/automations", label: "Automations", icon: <Workflow className="text-orange-300" size={24} /> },
    { href: "/content", label: "Content", icon: <FileText className="text-orange-300" size={24} /> },
    { href: "/jobs", label: "Jobs", icon: <Briefcase className="text-orange-300" size={24} /> },
    { href: "/profile", label: "Profile", icon: <User className="text-orange-300" size={24} /> }
  ]

  return (
    <nav aria-label="Sidebar" className="neumorphic rounded-4xl w-fit relative h-fit">
      {/* SideBar content goes here */}
      <div className="flex flex-col">
        {links.map(({ href, label, icon }) => (
          <Link 
            key={href} 
            href={href}
            className={`px-5 py-3 first:rounded-t-4xl last:rounded-b-4xl hover:bg-cyan-900 
            hover:text-orange-500 transition-colors duration-300 ease-in-out flex items-center gap-2
            ${pathname === href ? 'bg-cyan-900 text-orange-500' : 'text-orange-400'}`}
          >
            {icon}
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
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-5 py-3 rounded-b-4xl hover:bg-cyan-900 transition-colors duration-300 ease-in-out
          text-cyan-400 hover:text-cyan-500 flex items-center gap-2 cursor-pointer"
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isOpen ? <SidebarClose size={24} /> : <SidebarOpen size={24} />}
        </button>
      </div>
    </nav>
  );
}

export { SideBar };