import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import { motion } from "framer-motion";

export default function BackArrow() {
  const [arrowHover, setArrowHover] = useState(false);
  return (
    <div
      className="mt-1 mb-3 w-fit"
      onMouseEnter={() => setArrowHover(true)}
      onMouseLeave={() => setArrowHover(false)}
    >
      <button
        onClick={() => {
          const referrer = document.referrer;
          const isInSite =
            referrer && referrer.includes(window.location.origin);
          if (isInSite) {
            window.history.back();
          } else {
            window.location.href = "/projects";
          }
        }}
        className="flex items-center font-semibold gap-[4px] bg-neutral-300 px-3 py-1 rounded-md text-black"
        onMouseEnter={() => setArrowHover(true)}
        onMouseLeave={() => setArrowHover(false)}
      >
        <motion.div
          animate={{ x: arrowHover ? -3 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <FaArrowLeft size={15} />
        </motion.div>
        Back to projects
      </button>
    </div>
  );
}
