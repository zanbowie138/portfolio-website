import { useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { motion } from "framer-motion";

// Add the ContactLink interface
interface ContactLink {
  link: string;
  label: string;
  text: string;
  icon: React.ReactNode;
}

// Start of Selection
const ContactLinks: ContactLink[] = [
  {
    link: "mailto:alexanderbui180@gmail.com",
    label: "Email Me",
    text: "alexanderbui180@gmail.com",
    icon: <HiOutlineMail size={20} />,
  },
  {
    link: "https://github.com/zanbowie138",
    label: "GitHub",
    text: "View my GitHub",
    icon: <FaGithub size={20} />,
  },
  {
    link: "https://www.linkedin.com/in/alexanderbui28",
    label: "LinkedIn",
    text: "Connect on LinkedIn",
    icon: <FaLinkedin size={20} />,
  },
];

export default function Footer() {
  return (
    <div className="flex w-full justify-between px-5 border-t-[1px] border-neutral-700 py-3 mt-20">
      <div className="flex flex-row gap-2">
        {ContactLinks.map((link, index) => (
          <ContactButton key={index} {...link} />
        ))}
      </div>
      <div>
        <a
          href="https://github.com/zanbowie138/portfolio-website"
          className="text-blue-400 text-md"
        >
          <FaGithub className="inline mx-1 mb-1 w-4 h-4" />
          Website
        </a>
      </div>
    </div>
  );
}

function ContactButton({ link, label, text, icon }: ContactLink) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex items-center justify-center group border-[1px] border-gray-200 rounded-md p-1.5 shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{ scale: isHovered ? 1.2 : 1 }} // Grow entire button on hover
      transition={{ type: "easeInOut", duration: 0.2 }}
    >
      <div className="flex items-center">{icon}</div>
      <motion.div className="absolute bottom-full mb-1 bg-gray-700 text-neutral-200 text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
        {label}
      </motion.div>
    </motion.a>
  );
}
