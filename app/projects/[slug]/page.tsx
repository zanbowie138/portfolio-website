import React from "react";
import { projects } from "@/lib/projects";
import Markdown from "react-markdown";

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find(
    (p) => p.title.replaceAll(" ", "-").toLowerCase() === params.slug,
  );
  return project ? (
    <div className="p-3">
      <h1 className="font-semibold text-4xl">{project.title}</h1>
      <Markdown className="prose">{project.content}</Markdown>
    </div>
  ) : (
    <div></div>
  );
}

export const dynamicParams = false;
export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.id,
  }));
}
