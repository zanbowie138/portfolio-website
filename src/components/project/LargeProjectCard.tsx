"use client";
import Tag from "@/components/LargeTag";
import type { ProjectProps } from "@/config/types";
import { motion } from "motion/react";
import { MdArrowOutward } from "react-icons/md";

interface Props {
  project: ProjectProps;
}

import { useState } from "react";

export default function LargeProjectCard({ project }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={`/projects/${project.id}`}
      className={`flex md:flex-row flex-col gap-5 p-4 rounded-md hover:shadow-lg hover:cursor-pointer outline outline-1 outline-neutral-700`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        className="object-contain rounded-md w-full md:w-[400px]"
        src={project.image_links[0]}
        alt="Project Image"
      />
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-1">
            <h3
              className={`text-3xl font-bold flex items-center ${isHovered ? "text-slate-500" : "text-neutral-200"}`}
            >
              {project.title}
            </h3>
            <motion.div
              animate={{ y: isHovered ? -2 : 3, x: isHovered ? -5 : -10 }}
              initial={{ y: 3, x: -10 }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.2 }}
            >
              <MdArrowOutward size={20} className="ml-2 text-neutral-200 " />
            </motion.div>
          </div>
          <h2 className="text-md text-neutral-400 whitespace-nowrap">
            {project.date_range}
          </h2>
        </div>
        <p
          className="text-md"
          dangerouslySetInnerHTML={{ __html: project.description }}
        ></p>
        {project.tags && project.tags.length > 0 && (
          <div className="flex gap-2 mt-4 flex-wrap">
            {project.tags.map((tag) => (
              <Tag key={tag} text={tag} />
            ))}
          </div>
        )}
      </div>
    </a>
  );
}
