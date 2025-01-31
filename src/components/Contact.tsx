import { FaLinkedin } from "react-icons/fa";

import { HiOutlineMail } from "react-icons/hi";
import SocialLink from "./SocialLink";
import { FaGithub } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="mx-5 p-4 rounded-xl bg-slate-800" id="contact">
      <h1 className="text-3xl font-bold text-white">Contact Me</h1>
      <h3 className="text-gray-400 text-sm">
        Feel free to reach out with any one of these following links:
      </h3>
      <ul className="text-white">
        <li>
          <SocialLink
            link={"mailto:alexanderbui180@gmail.com"}
            text={"alexanderbui180@gmail.com"}
            icon={<HiOutlineMail />}
          /> 
        </li>
        <li>
          <SocialLink
            link={"https://www.linkedin.com/in/alexanderbui28/"}
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
  );
}
