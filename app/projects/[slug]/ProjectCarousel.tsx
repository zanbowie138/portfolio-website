"use client";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export interface ProjectCarouselProps {}

export default function ProjectCarousel({}: ProjectCarouselProps) {
  return (
    <Carousel responsive={responsive}>
      <div>Item 1</div>
      {/*<div>Item 2</div>*/}
      {/*<div>Item 3</div>*/}
      {/*<div>Item 4</div>*/}
    </Carousel>
  );
}

function ProjectCarouselCard({
  image_link,
  alt,
  content,
}: {
  image_link: string;
  alt: string;
  content?: string;
}) {
  return (
    <div className="flex flex-col">
      <img src={image_link} alt={alt} />
      <h2>{alt}</h2>
      <p>{content}</p>
    </div>
  );
}
