"use client";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { MdArrowOutward } from "react-icons/md";

interface OutwardArrowProps {
  className?: string;
  parentId: string;
}

export default function OutwardArrow({ 
  className = "ml-2 text-neutral-200",
  parentId
}: OutwardArrowProps) {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const parent = document.getElementById(parentId);
    if (!parent) return;

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    parent.addEventListener("mouseenter", handleMouseEnter);
    parent.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      parent.removeEventListener("mouseenter", handleMouseEnter);
      parent.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [parentId]);

  return (
    <motion.div
      animate={{ y: isHovered ? -2 : 3, x: isHovered ? -5 : -10 }}
      initial={{ y: 3, x: -10 }}
      transition={{ type: "tween", ease: "easeInOut", duration: 0.2 }}
    >
      <MdArrowOutward size={20} className={className} />
    </motion.div>
  );
}

