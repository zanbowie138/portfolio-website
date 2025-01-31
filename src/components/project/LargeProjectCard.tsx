'use client'
import Tag from "@/components/LargeTag";
import type { ProjectProps } from "@/config/types";
import { motion } from "motion/react";
import { MdArrowOutward } from "react-icons/md";

interface Props {
  project: ProjectProps;
}

import { useState } from 'react';

export default function LargeProjectCard({ project }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a 
      href={`/projects/${project.id}`} 
      className={`flex md:flex-row flex-col gap-5 p-4 rounded-md hover:shadow-lg bg-gray-100 hover:cursor-pointer ring-2 ring-gray-300`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img 
        className="object-contain rounded-md md:w-[400px] w-[200px]" 
        width={400} 
        height={200} 
        src={project.image_links[0]} 
        alt="logo" 
      />
      <div className="flex flex-col grow">
        <div className="flex items-center gap-1">
          <h3 className="text-3xl font-bold flex items-center">
            {project.title}
          </h3>
          <motion.div 
            animate={{ y: isHovered ? -2 : 3, x: isHovered ? -5 : -10 }} 
            initial={{ y: 3, x: -10 }}
            transition={{ type: "easeInOut", duration: 0.2 }} 
            className=""
          >
            <MdArrowOutward size={20} className="ml-2 text-black " />
          </motion.div>
        </div>
        <h2 className="text-md text-gray-700">{project.date_range}</h2>
        <p className="">{project.description}</p>
        {project.tags && project.tags.length > 0 && (
          <div className="flex gap-2 mt-4 flex-wrap">
            {project.tags.map((tag) => <Tag key={tag} text={tag} />)}
          </div>
        )}
      </div>
    </a>
  );
}