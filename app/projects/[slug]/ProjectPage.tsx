"use client";
import Markdown from "react-markdown";
import { AnimatePresence } from "framer";
import { ProjectProps } from "@/config/types";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ProjectPage({ project }: { project: ProjectProps }) {
  return (
    <AnimatePresence>
      <div className="p-3">
        <motion.img
          className="w-[120px] h-[90px] md:w-full md:h-[150px] bg-black border-2 border-black"
          // layoutId={`${project.id}-title`}
          src={project.image_link}
          alt="logo"
        />
        <motion.h3
          className="font-semibold text-4xl"
          layoutId={`${project.id}-title`}
        >
          {project.title}
        </motion.h3>
        <Markdown className="prose">{project.content}</Markdown>
      </div>
    </AnimatePresence>
  );
}
