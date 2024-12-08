import React from "react";
import { projects } from "@/lib/projects";

export default function Projects() {
  return (
    <div className="p-5">
      <h1 className="text-4xl font-bold">Projects</h1>
      <h3 className="">
        A full list of my projects can be found on my{" "}
        <a
          className="text-blue-500 underline"
          href="https://github.com/zanbowie138"
        >
          Github
        </a>
        .
      </h3>
      <div>
        {projects.map((project) => (
          <div key={project.id} className="my-2 bg-gray-100 rounded-md p-2">
            <div className="my-2">
              <h2 className="text-2xl font-semibold underline">
                <a href={`projects/${project.id}`}>{project.title}</a>
              </h2>
              <p>{project.description}</p>
            </div>
            <div className="flex flex-wrap">
              {project.tags &&
                project.tags.map((tag) => (
                  <div key={tag} className="mr-1 my-[1px]">
                    <div className="bg-slate-700 text-white rounded-md px-2 py-[2px] text-xs font-semibold">
                      {tag}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
