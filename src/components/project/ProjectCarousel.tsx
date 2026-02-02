import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdPause,
  IoMdPlay,
  IoMdClose,
} from "react-icons/io";
import { getImageUrl } from "@/utils/imageMap";
import ImageTransition from "@/components/ImageTransition";

interface ProjectCarouselProps {
  images: string[];
  captions: string[] | undefined;
  autoPlay?: boolean;
  interval?: number;
}

interface SlideshowState {
  current: number;
  isPlaying: boolean;
  isManuallyPaused: boolean;
  touchStart: number;
  touchEnd: number;
  transitionCount: number;
}

interface ModalState {
  isOpen: boolean;
  image: string;
  caption?: string;
}

export default function ProjectCarousel({
  images,
  captions,
  autoPlay = true,
  interval = 5000,
}: ProjectCarouselProps) {
  const imageUrls = images.map(getImageUrl);
  const [slideshowState, setSlideshowState] = useState<SlideshowState>({
    current: 0,
    isPlaying: autoPlay,
    isManuallyPaused: false,
    touchStart: 0,
    touchEnd: 0,
    transitionCount: 0,
  });

  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    image: "",
    caption: undefined,
  });

  const carouselRef = useRef<HTMLDivElement>(null);

  const closeModal = () => {
    setModalState({ isOpen: false, image: "", caption: undefined });
  };

  const handleNext = useCallback(() => {
    setSlideshowState((prev) => ({
      ...prev,
      current: (prev.current + 1) % imageUrls.length,
      transitionCount: prev.transitionCount + 1,
    }));
  }, [imageUrls.length]);

  const handlePrev = useCallback(() => {
    setSlideshowState((prev) => ({
      ...prev,
      current: (prev.current - 1 + imageUrls.length) % imageUrls.length,
      transitionCount: prev.transitionCount + 1,
    }));
  }, [imageUrls.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape" && modalState.isOpen) closeModal();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, modalState.isOpen]);

  // Auto-play functionality
  useEffect(() => {
    if (!slideshowState.isPlaying) return;

    const timer = setInterval(handleNext, interval);
    return () => clearInterval(timer);
  }, [slideshowState.isPlaying, handleNext, interval]);

  // Touch events for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setSlideshowState((prev) => ({
      ...prev,
      touchStart: e.targetTouches[0].clientX,
      touchEnd: 0,
    }));
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (slideshowState.touchStart === 0) return; // Only track if touch has started
    setSlideshowState((prev) => ({
      ...prev,
      touchEnd: e.targetTouches[0].clientX,
    }));
  };

  const handleTouchEnd = () => {
    if (slideshowState.touchStart === 0 || slideshowState.touchEnd === 0)
      return;

    const distance = slideshowState.touchStart - slideshowState.touchEnd;
    const swipeThreshold = 50; // Min distance for a swipe

    if (Math.abs(distance) > swipeThreshold) {
      if (distance > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setSlideshowState((prev) => ({ ...prev, touchStart: 0, touchEnd: 0 }));
  };

  const handleMouseEnter = () => {
    if (autoPlay && !slideshowState.isManuallyPaused) {
      setSlideshowState((prev) => ({ ...prev, isPlaying: false }));
    }
  };

  const handleMouseLeave = () => {
    if (autoPlay && !slideshowState.isManuallyPaused) {
      setSlideshowState((prev) => ({ ...prev, isPlaying: true }));
    }
  };

  useEffect(() => {
    document.body.style.overflow = modalState.isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalState.isOpen]);

  const { current, isPlaying, transitionCount } = slideshowState;

  return (
    <>
      <div
        ref={carouselRef}
        className="relative w-full aspect-[16/9] max-h-[500px] overflow-hidden bg-black rounded-md select-none outline-none focus:outline-none"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        tabIndex={0}
        role="region"
        aria-label="Project images carousel"
      >
        <div className="absolute inset-0">
          <ImageTransition
            images={imageUrls}
            currentIndex={current}
            width={100}
            height={60}
          />
        </div>

        {/* Clickable overlay for modal */}
        <div
          className="absolute inset-0 cursor-pointer"
          onClick={() =>
            setModalState({
              isOpen: true,
              image: imageUrls[current],
              caption: captions?.[current],
            })
          }
          aria-label="Open enlarged view"
        />

        {/* Gradient overlay for caption visibility */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />

        {captions?.[current] && (
          <div className="absolute bottom-0 left-0 w-full p-3 text-center text-neutral-200">
            <div dangerouslySetInnerHTML={{ __html: captions[current] }} />
          </div>
        )}

        {/* Navigation Buttons */}
        {imageUrls.length > 1 && (
          <>
            <motion.button
              initial={{ transform: "translateY(-50%) scale(1)" }}
              whileHover={{ scale: 1.15 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              onClick={handlePrev}
              className="absolute left-2 top-1/2 md:left-4 bg-neutral-900/50 hover:bg-neutral-900/80 text-neutral-200 p-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Previous image"
            >
              <IoIosArrowBack size={25} />
            </motion.button>

            <motion.button
              initial={{ transform: "translateY(-50%) scale(1)" }}
              whileHover={{ scale: 1.15 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              onClick={handleNext}
              className="absolute right-2 top-1/2 md:right-4 bg-neutral-900/50 hover:bg-neutral-900/80 text-neutral-200 p-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Next image"
            >
              <IoIosArrowForward size={25} />
            </motion.button>
          </>
        )}

        {/* Play/Pause Button */}
        {autoPlay && imageUrls.length > 1 && (
          <motion.button
            initial={{ opacity: 0.7 }}
            whileHover={{ opacity: 1 }}
            onClick={() =>
              setSlideshowState((prev) => ({
                ...prev,
                isPlaying: !prev.isPlaying,
                isManuallyPaused: prev.isPlaying,
              }))
            }
            className="absolute top-2 right-2 md:top-4 md:right-4 bg-neutral-900/50 hover:bg-neutral-900/80 text-neutral-200 p-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label={isPlaying ? "Pause carousel" : "Play carousel"}
          >
            {isPlaying ? <IoMdPause size={18} /> : <IoMdPlay size={18} />}
          </motion.button>
        )}
      </div>

      {/* Dots Indicator */}
      {imageUrls.length > 1 && (
        <div className="flex justify-center py-4">
          <div className="flex gap-2">
            {imageUrls.map((_, index) => (
              <button
                key={index}
                onClick={() =>
                  setSlideshowState((prev) => ({
                    ...prev,
                    current: index,
                    transitionCount: prev.transitionCount + 1,
                  }))
                }
                className={`w-3 h-3 rounded-full transition-colors duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  current === index
                    ? "bg-neutral-400 hover:bg-neutral-300"
                    : "bg-neutral-700 hover:bg-neutral-600"
                }`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={current === index}
              />
            ))}
          </div>
        </div>
      )}

      {/* Modal for Enlarged Image */}
      <AnimatePresence>
        {modalState.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-xl"
            onClick={closeModal}
            aria-modal="true"
            role="dialog"
            aria-labelledby="modal-caption"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative max-w-6xl w-full max-h-[95vh] p-4 md:p-8 flex flex-col items-center"
            >
              <div className="relative w-full flex justify-center">
                <img
                  src={modalState.image}
                  alt="Enlarged project image"
                  className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              {modalState.caption && (
                <div
                  id="modal-caption"
                  className="mt-4 text-center text-neutral-200 p-3 w-full max-w-3xl"
                  dangerouslySetInnerHTML={{ __html: modalState.caption }}
                  onClick={(e) => e.stopPropagation()}
                />
              )}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 }}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 0, 0, 0.7)" }}
                whileTap={{ scale: 0.95 }}
                onClick={closeModal}
                className="absolute -top-2 -right-2 md:top-4 md:right-4 text-white bg-black/50 hover:bg-black/70 p-2.5 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-lg"
                aria-label="Close enlarged image view"
              >
                <IoMdClose size={24} />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
