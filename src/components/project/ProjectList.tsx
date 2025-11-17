import { motion } from "motion/react";
import LargeProjectCard from "./LargeProjectCard";
import type { ProjectProps } from "@/config/types";

interface Props {
  projects: ProjectProps[];
}

export default function ProjectList({ projects }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {projects.map((project) => (
        <motion.div
          key={project.id}
        //   whileHover={{ opacity: 0.5 }}
          className="relative"
        >
          <LargeProjectCard project={project} />
        </motion.div>
      ))}
    </div>
  );
}
