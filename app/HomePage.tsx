"use client";
import { ProjectCardProps } from "@/components/ProjectCard";
import Image from "next/image";
import ProjectCard from "@/components/ProjectCard";
import { ProjectProps } from "@/config/types";

export default function HomePage({
  projects,
}: {
  projects: ProjectProps[];
}) {
  return (
    <>
      <div className="md:flex md:flex-row text-black place-content-center p-5 gap-5">
        <div className="">
          <h1 className="text-4xl font-bold w-fit">Howdy!</h1>
          <p className="text-black text-lg">
            I'm Alexander Bui, a developer and student currently studying
            Computer Engineering at Texas A&M University, interested in graphics
            programming and the intersections of high-performance computing and
            hardware. I'm currently working on a few projects, including an
            OpenGL rendering engine and a crowdsourced event platform for the
            Texas A&M campus.
          </p>
        </div>
        <div className="w-full my-3 md:my-0">
          <Image
            src="/profile.jpg"
            alt="logo"
            width="200"
            height="200"
            className="rounded-2xl h-min bg-black p-1 m-auto"
            priority={true}
          />
        </div>
      </div>
      <div className="md:w-full flex my-3 justify-center">
        <div className="grow-0 py-3 px-5">
          <h3 className="text-3xl font-bold">Featured Projects</h3>
          <h4 className="text-gray-500 text-sm">
            Here are the projects I've worked on over the years that I am most
            proud of.
          </h4>
          <div className="md:grid md:grid-cols-3 md:items-start flex flex-col gap-2 w-full my-3">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project as ProjectCardProps} />
            ))}
          </div>
        </div>
        {/*<div className="basis-1/2 grow-0 shrink-0">*/}
        {/*  <h2 className="text-3xl text-center font-semibold">Blog</h2>*/}
        {/*</div>*/}
      </div>
    </>
  );
}