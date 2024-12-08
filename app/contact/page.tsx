import React from "react";
import SocialLink from "@/app/contact/SocialLink";
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

export default function Contact() {
  return (
    <div className="p-5">
      <h1 className="text-4xl font-bold">Contact Me</h1>
      <h3 className="text-lg">
        Feel free to reach out with any one of these following links:
      </h3>
      <div>
        <ul>
          <li>
            <SocialLink
              link={"mailto:alexanderbui180@gmail.com"}
              text={"alexanderbui180@gmail.com"}
              icon={<HiOutlineMail />}
            />
          </li>
          <li>
            <SocialLink
              link={"https://www.linkedin.com/in/alexander-bui-1b8b5b1b8/"}
              text={"LinkedIn"}
              icon={<FaLinkedin />}
            />
          </li>
          <li>
            <SocialLink
              link={"https://github.com/zanbowie138"}
              text={"zanbowie138"}
              icon={<FaGithub />}
            />
          </li>
        </ul>
      </div>
    </div>
  );
}
