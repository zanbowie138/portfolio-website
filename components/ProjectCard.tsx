"use client";
import React, { useState } from "react";
import Image from "next/image";
import Tag from "@/components/Tag";
import { AnimatePresence, motion } from "framer";
import Link from "next/link";

export interface ProjectCardProps {
  id: string;
  title: string;
  date_range: string;
  description: string;
  image_links: string[];
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
      <motion.div
        className="rounded-md py-2 px-3 gap-2 border border-gray-300 hover:shadow-md h-full bg-white"
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
        layoutId={project.id}
      >
        <Link href={`/projects/${project.id}`}>
          <div className="flex items-center gap-2 w-full h-full md:flex-col">
              <motion.img
                className="object-cover w-[120px] h-[90px] md:w-full md:h-[150px] bg-black border-2 border-black"
                src={project.image_links[0]}
                alt="logo"
              />
            <div className="text-left flex flex-col grow">
              <div className="grow">
                <motion.h3
                  className="font-semibold text-lg my-0 py-0"
                >
                  {project.title}
                </motion.h3>
                <h2 className="text-gray-700 text-xs">{project.date_range}</h2>
                <p className="text-sm ">{project.description}</p>
              </div>
              <div>
                {project.tags && project.tags.length > 0 && (
                  <motion.div
                    className="flex gap-1 mt-2 flex-wrap"
                  >
                    {project.tags.map((tag, index) => (
                      <Tag key={index} text={tag} />
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
}
