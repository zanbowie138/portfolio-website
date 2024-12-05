import React from "react";
import Image from "next/image";
import ProjectCard, { ProjectCardProps } from "@/components/ProjectCard";
import { projects } from "@/lib/projects";

export default function Home() {
  return (
    <>
      <div className="md:flex flex-row text-black place-content-center p-7 gap-5">
        <div className="basis-3/5">
          <h1 className="text-4xl font-bold w-fit">Howdy!</h1>
          <p className="text-black text-lg">
            I'm Alexander Bui, a student currently attending Texas A&M
            University, interested in computer engineering, graphics
            programming, and the intersections of high-performance computing and
            hardware. I'm currently working on a few projects, including an
            OpenGL rendering engine and a crowdsourced event platform for the
            Texas A&M campus.
          </p>
        </div>
        <div className="flex basis-1/3 mr-5">
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
      <div className="md:w-full flex my-3">
        <div className="basis-1/2 grow-0 shrink-0 ">
          <h2 className="text-3xl text-center font-semibold">Projects</h2>
          <div className="flex flex-col gap-2 p-2 w-full">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project as ProjectCardProps} />
            ))}
          </div>
        </div>
        <div className="basis-1/2 grow-0 shrink-0">
          <h2 className="text-3xl text-center font-semibold">Blog</h2>
        </div>
      </div>
    </>
  );
}
