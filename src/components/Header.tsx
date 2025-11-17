import { IoMenu } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const links: { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  // { href: "/blog", label: "Blog" },
  // { href: "/about", label: "About" },
  { href: "/resume.pdf", label: "Resume" },
  // { href: "/#contact", label: "Contact" },
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

    console.log(nav);

    if (nav) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("scroll", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("scroll", handleClickOutside);
    }
  }, [nav]);

  useEffect(() => {
    console.log(nav);
  }, [nav]);

  return (
    <div className="flex p-3">
      <nav className="flex items-center justify-between w-full px-2">
        <div>
          <div className="flex items-center">
            <a href="/">
              <img
                src="/profile.jpg"
                alt="Alexander Bui"
                className="rounded-full h-14 w-14 p-1 hover:outline outline-neutral-800"
              />
            </a>
            <div className="flex flex-col ml-4">
              <div className="font-bold text-md">Alexander Bui</div>
              <div className="text-gray-500 text-sm">
                Computer Engineering Sophmore
              </div>
            </div>
          </div>
        </div>

        <ul className="hidden md:flex">
          {links.map((link, index) => (
            <li className="flex-auto" key={index}>
              <a
                href={link.href}
                className="text-neutral-200 text-xl mr-7 hover:text-neutral-400 font-semibold"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="md:hidden">
          <button
            className={"text-neutral-200 text-xl z-50"}
            onClick={() => setNav(true)}
          >
            <IoMenu size={30} />
          </button>
          <AnimatePresence>
            {nav && (
              <div>
                <motion.div
                  initial={{ x: 300 }}
                  animate={{ x: 0 }}
                  exit={{ x: 300 }}
                  transition={{
                    type: "tween",
                    ease: "easeInOut",
                    duration: 0.2,
                  }}
                  className="fixed bg-neutral-800 text-neutral-200 top-0 right-0 h-full py-3 px-5 rounded-l-lg z-[999]"
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
