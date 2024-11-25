import React from "react";
import Image from "next/image";

export interface ProjectCardProps {
  title: string;
  date: string;
  description: string;
  image_link: string;
}

export default function ProjectCard({
  title,
  date,
  description,
  image_link,
}: ProjectCardProps) {
  return (
    <div className="flex bg-white rounded-md py-2 px-3 items-center gap-2 hover:shadow-md">
      <div className="overflow-none w-[130px] h-[90px] bg-black relative rounded-sm shrink-0 border-2 border-black">
        <Image
          src={image_link}
          alt="logo"
          fill={true}
          className="object-cover rounded-sm"
          priority={true}
        />
      </div>
      <div>
        <h3 className="font-semibold text-lg">
          <a>{title}</a>
        </h3>
        <h2 className="text-gray-700 text-sm">{date}</h2>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
}
