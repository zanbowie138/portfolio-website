import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function ProjectCarousel({
  images,
  captions,
}: {
  images: string[];
  captions: string[] | undefined;
}) {
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <>
      <div className="relative w-full h-96 overflow-hidden bg-black rounded-md">
        
        <AnimatePresence initial={false}>
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="absolute top-0 left-0 w-full h-full flex justify-center items-center p-3"
          >
            <img src={images[current]} alt="slide" className="h-full object-contain" />
          </motion.div>
        </AnimatePresence>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-full flex justify-center">
          {captions && (
            <div
              className="w-full text-white p-3 text-center"
              dangerouslySetInnerHTML={{ __html: captions[current] }}
            ></div>
          )}
        </div>
        <motion.button
          initial={{ transform: "translate(0, -50%) scale(1)" }}
          whileHover={{ transform: "translate(0, -50%) scale(1.15)" }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          onClick={handlePrev}
          className="absolute left-4 top-1/2 bg-slate-600 bg-opacity-50 text-white p-2 rounded-full"
        >
          <IoIosArrowBack size={25} />
        </motion.button>
        <motion.button
          initial={{ transform: "translate(0, -50%) scale(1)" }}
          whileHover={{ transform: "translate(0, -50%) scale(1.15)" }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          onClick={handleNext}
          className="absolute right-4 top-1/2 bg-slate-600 bg-opacity-50 text-white p-2 rounded-full"
        >
          <IoIosArrowForward size={25} />
        </motion.button>
        
      </div>
      <div className="flex justify-center py-4">
        <div className="flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full ${
                current === index ? "bg-gray-700" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
