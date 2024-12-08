"use client";
import React, { useState } from "react";
import Image from "next/image";
import Tag from "@/components/Tag";
import { AnimatePresence, motion } from "framer";
import { IoIosArrowForward } from "react-icons/io";

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
    <motion.a
      className="rounded-md py-2 px-3 gap-2 border border-gray-300 hover:shadow-md h-full flex flex-col"
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
      href={`projects/${project.id}`}
      // onClick={() => {
      //   project.button_link && window.location.assign(project.button_link);
      // }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <div className="flex items-center gap-2 w-full h-full md:flex-col">
        <div className="overflow-none w-[120px] h-[90px] md:w-full md:h-[150px]  bg-black relative shrink-0 border-2 border-black">
          <Image
            src={project.image_link}
            alt="logo"
            fill={true}
            className="object-cover"
            priority={true}
          />
        </div>
        <div className="text-left flex flex-col grow">
          <div className="grow">
            <h3 className="font-semibold text-lg my-0 py-0">{project.title}</h3>
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
      {/*<AnimatePresence>*/}
      {/*  {hovered && (*/}
      {/*    <motion.div*/}
      {/*      initial={{ x: -10 }}*/}
      {/*      animate={{ x: 0 }}*/}
      {/*      exit={{ x: -5, opacity: 0, transition: { duration: 0.1 } }}*/}
      {/*      transition={{ type: "spring", stiffness: 300, damping: 20 }}*/}
      {/*      className="hidden"*/}
      {/*    >*/}
      {/*      <IoIosArrowForward size={25} className="text-slate-700" />*/}
      {/*    </motion.div>*/}
      {/*  )}*/}
      {/*</AnimatePresence>*/}
    </motion.a>
  );
}
