import React from "react";
import { projects } from "@/lib/projects";
import HomePage from "./HomePage";

export default function Home() {
  return (
    <div className="p-2">
      <HomePage projects={projects} />
    </div>
  );
}