import { useState } from 'react';

interface ImageSuspenseProps {
  src: string;
  alt: string;
}

const ImageSuspense: React.FC<ImageSuspenseProps> = ({ src, alt }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
    console.log("Image loaded");
  };

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <span className="text-lg text-gray-500">Loading...</span>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`object-cover rounded-md transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={handleImageLoad}
      />
    </div>
  );
};

export default ImageSuspense;
