import Link from "next/dist/client/link";

function SideBar() {
  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <nav aria-label="Sidebar" className="neumorphic rounded-4xl w-fit relative h-fit">
      {/* SideBar content goes here */}
      <div className="flex flex-col">
        {links.map(({ href, label }) => (
          <Link 
            key={href} 
            href={href} 
            className="p-3 text-orange-400 text-center first:rounded-t-4xl last:rounded-b-4xl hover:bg-teal-900 hover:text-orange-500 transition-colors duration-300 ease-in-out"
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export { SideBar };