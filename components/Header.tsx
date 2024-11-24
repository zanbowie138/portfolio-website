import Image from "next/image";

const links: { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
];

export default function Header() {
  return (
    <div className="flex bg-slate-800 p-3 rounded-t-md">
      <nav>
        <ul className="flex items-center">
          <li className="flex-auto">
            <a href="/">
              <Image
                src="/profile.jpg"
                alt="logo"
                width="40"
                height="40"
                className="rounded-full mr-5 bg-slate-400 p-0.5"
                priority={true}
              />
            </a>
          </li>
          {links.map((link, index) => (
            <li className="flex-auto" key={index}>
              <a href={link.href} className="text-white text-xl mr-7">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
