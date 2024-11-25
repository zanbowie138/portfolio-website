import React from "react";
import Image from "next/image";
import ProjectCard, { ProjectCardProps } from "@/components/ProjectCard";

const projects: ProjectCardProps[] = [
  {
    title: "OpenGL Raytracing Engine",
    date: "2022 - Present",
    description:
      "A raytracing engine built with OpenGL and C++, featuring a custom scene format and a custom renderer.",
    image_link: "/phys_eng.png",
  },
  {
    title: "Aggie Events",
    date: "2024 - Present",
    description:
      "A crowdsourced event platform for the Texas A&M campus, featuring event creation, RSVPs, and a calendar view.",
    image_link: "/agev.png",
  },
];

export default function Home() {
  return (
    <>
      <div className="flex flex-row text-black place-content-center p-7 gap-5">
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
            className="rounded-full h-min bg-black p-1 m-auto"
            priority={true}
          />
        </div>
      </div>
      <div className="flex my-3">
        <div className="basis-1/2">
          <h2 className="text-3xl text-center">Projects</h2>
          <div className="flex flex-col gap-2 p-2">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                date={project.date}
                description={project.description}
                image_link={project.image_link}
              />
            ))}
          </div>
        </div>
        <div className="basis-1/2">
          <h2 className="text-3xl text-center">Blog</h2>
        </div>
      </div>
    </>
  );
}
