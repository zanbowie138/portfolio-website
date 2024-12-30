"use client";
import Markdown from "react-markdown";
import { AnimatePresence } from "framer";
import { ProjectProps } from "@/config/types";
import { motion } from "framer-motion";
import Tag from "@/components/Tag";
import BackArrow from "@/components/BackArrow";
import { ProjectCarousel } from "@/app/projects/[slug]/ProjectCarousel";

export default function ProjectPage({ project }: { project: ProjectProps }) {
  return (
    <AnimatePresence>
      <motion.div className="p-5" layoutId={project.id}>
        <BackArrow />
        <ProjectCarousel
          images={project.image_links}
          captions={project.image_captions}
        />
        <div className="flex flex-col my-3">
          <motion.h3 className="font-semibold text-4xl grow">
            {project.title}
          </motion.h3>
          <h2 className="text-gray-700 text-lg">{project.date_range}</h2>
        </div>
        <div className="flex flex-col sm:flex-row-reverse gap-3 my-2">
        {project.tags && project.tags.length > 0 && (
            <div className="rounded-md p-3 font-semibold w-fit border-2 border-black">
              <span className="font-semibold text-xl">Technologies</span>
              <motion.div
                className="flex gap-1 mt-2 flex-wrap"
              >
                {project.tags.map((tag, index) => (
                  <Tag key={index} text={tag} />
                ))}
              </motion.div>
            </div>
          )}
          <div className="grow">
            <span className="font-semibold text-xl">Description</span>
            <motion.div className="text-black text-lg">
              {project.description}
            </motion.div>
          </div>
          
        </div>
        <Markdown className="prose">{project.content}</Markdown>
      </motion.div>
    </AnimatePresence>
  );
}
