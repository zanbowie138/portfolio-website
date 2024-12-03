import React from "react";
import Image from "next/image";
import Tag from "@/components/Tag";

export interface ProjectCardProps {
  title: string;
  date: string;
  description: string;
  image_link: string;
  button_link?: string;
  tags?: string[];
}

export default function ProjectCard({
  title,
  date,
  description,
  image_link,
  tags,
}: ProjectCardProps) {
  return (
    <button className="bg-white rounded-md py-2 px-3 hover:shadow-md">
      <div className="md:flex items-center gap-2">
        <div className="overflow-none w-full md:w-[120px]  h-[90px] bg-black relative shrink-0 border-2 border-black">
          <Image
            src={image_link}
            alt="logo"
            fill={true}
            className="object-cover"
            priority={true}
          />
        </div>
        <div className="text-left grow">
          <h3 className="font-semibold text-lg">
            <a>{title}</a>
          </h3>
          <h2 className="text-gray-700 text-sm">{date}</h2>
          <p className="text-sm ">{description}</p>
          {tags && tags.length > 0 && (
            <div className="flex gap-1 mt-2 flex-wrap">
              {tags.map((tag, index) => (
                <Tag key={index} text={tag} />
              ))}
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
