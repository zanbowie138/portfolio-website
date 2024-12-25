"use client";
import React, { useState } from "react";
import Image from "next/image";
import Tag from "@/components/Tag";
import { AnimatePresence, motion } from "framer";
import Link from "next/link";

export interface ProjectCardProps {
  id: string;
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
    <AnimatePresence>
      <motion.button
        className="rounded-md py-2 px-3 gap-2 border border-gray-300 hover:shadow-md h-full"
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
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <Link href={`/projects/${project.id}`}>
          <div className="flex items-center gap-2 w-full h-full md:flex-col">
            <motion.img
              className="w-[120px] h-[90px] md:w-full md:h-[150px] bg-black border-2 border-black"
              // layoutId={`${project.id}-title`}
              src={project.image_link}
              alt="logo"
            />
            <div className="text-left flex flex-col grow">
              <div className="grow">
                <motion.h3
                  className="font-semibold text-lg my-0 py-0"
                  layoutId={`${project.id}-title`}
                >
                  {project.title}
                </motion.h3>
                <h2 className="text-gray-700 text-xs">{project.date}</h2>
                <p className="text-sm ">{project.description}</p>
              </div>
              <div>
                {project.tags && project.tags.length > 0 && (
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {project.tags.map((tag, index) => (
                      <Tag key={index} text={tag} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Link>
      </motion.button>
    </AnimatePresence>
  );
}
