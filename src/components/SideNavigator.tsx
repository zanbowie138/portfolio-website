import { useState, useEffect, useRef } from "react";
import { FaTimes, FaBars } from "react-icons/fa";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function SideNavigator() {
  const [nav, setNav] = useState(false);
  const [currentSection, setCurrentSection] = useState<string>("");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setNav(false);
      }
    };

    const handleScroll = () => {
      const sections = links.map((link) => document.querySelector(link.href));
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        if (
          section instanceof HTMLElement &&
          section.offsetTop <= scrollPosition &&
          section.offsetTop + section.clientHeight > scrollPosition
        ) {
          setCurrentSection(section.id);
          break;
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={menuRef}
      className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white"
    >
      <button onClick={() => setNav(!nav)} className="p-4">
        {nav ? <FaTimes /> : <FaBars />}
      </button>
      <nav className={`flex flex-col ${nav ? "block" : "hidden"}`}>
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`p-4 ${currentSection === link.href.substring(1) ? "bg-gray-700" : ""}`}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
