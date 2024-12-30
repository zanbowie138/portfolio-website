"use client";
import { ProjectCardProps } from "@/components/ProjectCard";
import Image from "next/image";
import ProjectCard from "@/components/ProjectCard";
import { ProjectProps } from "@/config/types";
import SocialLink from "@/components/SocialLink";
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { AnimatePresence } from "framer";
import { motion } from "framer-motion";

export default function HomePage({ projects }: { projects: ProjectProps[] }) {
  return (
    <>
      <AnimatePresence>
        <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="md:flex md:flex-row text-black place-content-center m-5 gap-5 relative">
            <div className="">
              <h1 className="text-4xl font-bold w-fit">Howdy!</h1>
              <p className="text-black text-lg">
                I'm Alexander Bui, a developer and student currently studying
                Computer Engineering at{" "}
                <span className="font-bold text-maroon-400">
                  Texas A&M University
                </span>
                , interested in graphics programming and the intersections of
                high-performance computing and hardware. I'm currently working
                on a few projects, including an OpenGL rendering engine and a
                crowdsourced event platform for the Texas A&M campus.
              </p>
            </div>
            <div className="w-full my-3 md:my-0">
              <img
                src="/profile.jpg"
                alt="logo"
                className="rounded-2xl h-min bg-black p-1 m-auto md:w-[200px] md:h-[200px] w-[300px]"
              />
            </div>
          </div>
          <div className="md:w-full flex my-3 justify-center">
            <div className="grow-0 py-3 px-5" id="projects">
              <h3 className="text-3xl font-bold">Featured Projects</h3>
              <h4 className="text-gray-600 text-sm">
                Here are the projects I've worked on over the years that I am
                most proud of.
              </h4>
              <div className="md:grid md:grid-cols-3 md:items-start flex flex-col gap-2 w-full my-3">
                {projects.map((project, index) => (
                  <ProjectCard
                    key={index}
                    project={project as ProjectCardProps}
                  />
                ))}
              </div>
            </div>
            {/*<div className="basis-1/2 grow-0 shrink-0">*/}
            {/*  <h2 className="text-3xl text-center font-semibold">Blog</h2>*/}
            {/*</div>*/}
          </div>
          <div className="m-5" id="resume">
            <h1 className="text-3xl font-bold">Resume</h1>
            <object
              data="resume.pdf"
              type="application/pdf"
              className="w-full"
              height="750px"
            >
              <embed src="resume.pdf" type="application/pdf" />
              <p>
                This browser does not support PDFs. Please download the PDF to
                view it: <a href="resume.pdf">Download PDF</a>.
              </p>
            </object>
          </div>
          <div className="mx-5 p-4 rounded-xl bg-slate-800" id="contact">
            <h1 className="text-3xl font-bold text-white">Contact Me</h1>
            <h3 className="text-gray-400 text-sm">
              Feel free to reach out with any one of these following links:
            </h3>
            <ul className="text-white">
              <li>
                <SocialLink
                  link={"mailto:alexanderbui180@gmail.com"}
                  text={"alexanderbui180@gmail.com"}
                  icon={<HiOutlineMail />}
                />
              </li>
              <li>
                <SocialLink
                  link={"https://www.linkedin.com/in/alexander-bui-1b8b5b1b8/"}
                  text={"LinkedIn"}
                  icon={<FaLinkedin />}
                />
              </li>
              <li>
                <SocialLink
                  link={"https://github.com/zanbowie138"}
                  text={"zanbowie138"}
                  icon={<FaGithub />}
                />
              </li>
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
