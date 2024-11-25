import Image from "next/image";

const links: { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  // { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <div className="flex bg-slate-800 p-3 rounded-t-md">
      <nav className="flex items-center justify-between w-full px-2">
        <a href="/">
          <Image
            src="/profile.jpg"
            alt="logo"
            width="40"
            height="40"
            className="rounded-full mr-5 bg-slate-600 p-0.5"
            priority={true}
          />
        </a>
        <ul className="flex">
          {links.map((link, index) => (
            <li className="flex-auto" key={index}>
              <a
                href={link.href}
                className="text-white text-xl mr-7 hover:underline underline-offset-4 font-semibold"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
