import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ProjectProps } from "@/config/types";

const projDir = path.join(process.cwd(), "projects");

export function getProjectData(): ProjectProps[] {
  // Get file names under /projects
  const fileNames = fs.readdirSync(projDir);
  const projData = fileNames.map((fileName) => {
    // Read markdown file as string
    const fullPath = path.join(projDir, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the title
    const props = { ...matterResult.data };
    return {
      id: props.title.replaceAll(" ", "-").toLowerCase(),
      content: matterResult.content,
      ...props,
    } as ProjectProps;
  });

  // Sort by date
  return projData.sort((a, b) => {
    return (a.priority ?? 0) < (b.priority ?? 0) ? 1 : -1;
  });
}

export const projects = getProjectData();
