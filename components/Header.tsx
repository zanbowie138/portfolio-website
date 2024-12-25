"use client";
import Image from "next/image";
import { IoMenu } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer";
import Link from "next/link";

const links: { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  // { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  // { href: "/about", label: "About" },
  { href: "/resume.pdf", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [nav, setNav] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setNav(false);
      }
    };

    if (nav) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("scroll", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("scroll", handleClickOutside);
    }
  }, [nav]);
  return (
    <div className="flex bg-slate-800 p-3 rounded-t-md">
      <nav className="flex items-center justify-between w-full px-2">
        <Link href="/">
          <Image
            src="/profile.jpg"
            alt="logo"
            width="40"
            height="40"
            className="rounded-full mr-5 bg-slate-600 p-0.5 hover:bg-slate-700"
            priority={true}
          />
        </Link>
        <ul className="hidden md:flex">
          {links.map((link, index) => (
            <li className="flex-auto" key={index}>
              <Link
                href={link.href}
                className="text-white text-xl mr-7 hover:underline underline-offset-4 font-semibold"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="md:hidden">
          <button className={"text-white text-xl"} onClick={() => setNav(!nav)}>
            <IoMenu size={30} />
          </button>
          <AnimatePresence>
            {nav && (
              <div>
                <motion.div
                  initial={{ x: 200 }}
                  animate={{ x: 0 }}
                  exit={{ x: 200 }}
                  transition={{
                    type: "easeInOut",
                    stiffness: 300,
                    damping: 50,
                    duration: 0.2,
                  }}
                  className="fixed bg-slate-800 text-white top-0 right-0 h-full py-3 px-5 rounded-l-lg z-[999]"
                  ref={menuRef}
                >
                  <ul className="flex flex-col">
                    <li>
                      <h1 className="text-3xl font-bold rounded-md my-2">
                        Alexander Bui
                      </h1>
                    </li>
                    {links.map((link, index) => (
                      <li className="flex-auto" key={index}>
                        <a
                          href={link.href}
                          className="text-3xl mr-7 hover:underline underline-offset-4 font-semibold"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
                <div className="fixed h-screen w-screen bg-black/20 top-0 left-0 z-[998]"></div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </div>
  );
}
