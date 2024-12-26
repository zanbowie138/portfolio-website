"use client";
import Markdown from "react-markdown";
import { AnimatePresence } from "framer";
import { ProjectProps } from "@/config/types";
import { motion } from "framer-motion";
import Link from "next/link";
import Tag from "@/components/Tag";

export default function ProjectPage({ project }: { project: ProjectProps }) {
  return (
    <AnimatePresence>
      <motion.div
        className="p-3"
        // initial={{ opacity: 1 }}
        // animate={{ opacity: 1 }}
        // exit={{ opacity: 0 }}
        layoutId={project.id}
      >
        <Link href="/#projects" className="my-2">
          Back
        </Link>
        <motion.img
          className="w-[120px] h-[90px] md:w-full md:h-fit bg-black border-2 border-black"
          // layoutId={`${project.id}-title`}
          src={project.image_link}
          alt="logo"
        />
        <motion.h3
          className="font-semibold text-4xl"
          // layoutId={`${project.id}-title`}
        >
          {project.title}
        </motion.h3>
        <div className="flex">
          <div className="grow">
            <span className="font-semibold text-xl">Description</span>
            <motion.div className="text-black">
              {project.description}
            </motion.div>
          </div>
          {project.tags && project.tags.length > 0 && (
            <div className="bg-slate-200 rounded-md p-3 font-semibold">
              <span className="font-semibold text-xl">
                Tags:
              </span>
              <motion.div
                className="flex gap-1 mt-2 flex-wrap"
                // layoutId={`${project.id}-tags`}
              >
                {project.tags.map((tag, index) => (
                  <Tag key={index} text={tag} />
                ))}
              </motion.div>
            </div>
          )}
        </div>
        <Markdown className="prose">{project.content}</Markdown>
      </motion.div>
    </AnimatePresence>
  );
}
