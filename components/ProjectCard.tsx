"use client";
import React, { useState } from "react";
import Image from "next/image";
import Tag from "@/components/Tag";
import { AnimatePresence, motion } from "framer";
import { IoIosArrowForward } from "react-icons/io";

export interface ProjectCardProps {
  title: string;
  date: string;
  description: string;
  image_link: string;
  button_link?: string;
  tags?: string[];
}

export default function ProjectCard({
  project,
}: {
  project: ProjectCardProps;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      className="bg-white rounded-md py-2 px-3 flex items-center gap-2"
      whileHover={{
        scale: 1.05,
      }}
      onHoverStart={() => {
        setHovered(true);
      }}
      onHoverEnd={() => {
        setHovered(false);
      }}
      initial={{ scale: 1.0 }}
      whileTap={{ scale: 1.0 }}
      href={`projects/${project.title.replaceAll(" ", "-").toLowerCase()}`}
      onClick={() => {
        project.button_link && window.location.assign(project.button_link);
      }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <div className="md:flex items-center gap-2 shrink-0 w-full md:w-fit">
        <div className="overflow-none w-full h-[150px] md:w-[120px] md:h-[90px] bg-black relative shrink-0 border-2 border-black">
          <Image
            src={project.image_link}
            alt="logo"
            fill={true}
            className="object-cover"
            priority={true}
          />
        </div>
        <div className="text-left grow-0">
          <h3 className="font-semibold text-lg my-0 py-0">{project.title}</h3>
          <h2 className="text-gray-700 text-xs">{project.date}</h2>
          <p className="text-sm ">{project.description}</p>
          {project.tags && project.tags.length > 0 && (
            <div className="flex gap-1 mt-2 flex-wrap">
              {project.tags.map((tag, index) => (
                <Tag key={index} text={tag} />
              ))}
            </div>
          )}
        </div>
      </div>
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ x: -10 }}
            animate={{ x: 0 }}
            exit={{ x: -5, opacity: 0, transition: { duration: 0.1 } }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="hidden md:block"
          >
            <IoIosArrowForward size={25} className="text-slate-700" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.a>
  );
}
