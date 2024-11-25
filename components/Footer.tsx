import React from "react";
import { FaGithub } from "react-icons/fa6";

export default function Footer() {
  return (
    <div className="flex w-full justify-between px-9 border-t-2 border-gray-200 py-2 mt-20">
      <h3 className="text-black font-semibold text-lg">Alexander Bui</h3>
      <a
        href="https://github.com/zanbowie138/portfolio-website"
        className="text-blue-600 text-sm"
      >
        <FaGithub className="inline mx-1 mb-1" />
        Source code
      </a>
    </div>
  );
}
