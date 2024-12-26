import React from "react";
import { projects } from "@/lib/projects";
import ProjectPage from "./ProjectPage";

export default function DynamicProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find(
    (p) => p.title.replaceAll(" ", "-").toLowerCase() === params.slug,
  );
  return project ? (
    <ProjectPage project={project} />
  ) : (
    <div>
      <h1>404: Project Not Found</h1>
    </div>
  );
}

export const dynamicParams = false;
export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.id,
  }));
}
