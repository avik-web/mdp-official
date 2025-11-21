import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

type AreaType = {
  id: number;
  name: string;
  position: [number, number];
  images: (string | { url: string; description: string; price: string; title?: string })[];
  description: string;
};

type MapAreaPopupProps = {
  area: AreaType;
  carouselIndex: number;
  setCarouselIndex: React.Dispatch<React.SetStateAction<number>>;
  selectedArea: AreaType | null;
};

const MapAreaPopup: React.FC<MapAreaPopupProps> = ({ 
  area, 
  carouselIndex, 
  setCarouselIndex 
}) => {
  const currentImage = area.images[carouselIndex % area.images.length] as { 
    url: string; 
    description: string; 
    price: string; 
    title?: string;
  };
  
  const { url, title, description: imageDescription, price } = currentImage;

  const handlePreviousImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCarouselIndex((prev) => (prev - 1 + area.images.length) % area.images.length);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCarouselIndex((prev) => (prev + 1) % area.images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, type: "spring" }}
      className="relative flex flex-col items-center min-w-[180px] max-w-[240px] bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-3 border border-blue-100 overflow-hidden backdrop-blur-sm"
    >
      {/* Area Title */}
      <h2 className="text-xl font-bold text-blue-900 text-center mb-2 drop-shadow-sm tracking-wide">
        {area.name}
      </h2>
      
      {/* Image Container */}
      <div className="relative w-full mb-2 flex flex-col items-center">
        <Image
          src={url}
          alt={`${area.name} elevation`}
          width={170}
          height={90}
          className="w-full h-[72px] object-cover rounded border border-blue-200 shadow-sm"
          priority
        />
      </div>
      
      {/* Image Title */}
      {title && (
        <h3 className="text-base font-semibold text-blue-700 text-center mb-1 mt-1">
          {title}
        </h3>
      )}
      
      {/* Image Description */}
      <motion.p
        className="text-blue-800 mb-1 text-center font-medium text-sm leading-snug"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {imageDescription}
      </motion.p>
      
      {/* Area Description */}
      <motion.p
        className="text-blue-400 mb-2 text-center text-xs italic"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {area.description}
      </motion.p>
      
      {/* Carousel Controls */}
      {area.images.length > 1 && (
        <div className="flex items-center justify-center gap-2 mb-2 mt-1">
          <button
            className="bg-white bg-opacity-90 rounded-full p-1 shadow hover:bg-blue-100 border border-blue-200 transition-all duration-200 hover:shadow-md"
            onClick={handlePreviousImage}
            aria-label="Previous image"
            type="button"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2} 
              stroke="currentColor" 
              className="w-4 h-4 text-blue-600"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="flex gap-1">
            {area.images.map((_, idx) => (
              <span
                key={idx}
                className={`inline-block w-2 h-2 rounded-full transition-all duration-200 ${
                  carouselIndex % area.images.length === idx 
                    ? 'bg-blue-600 shadow-sm' 
                    : 'bg-blue-200 hover:bg-blue-300'
                }`}
              />
            ))}
          </div>
          
          <button
            className="bg-white bg-opacity-90 rounded-full p-1 shadow hover:bg-blue-100 border border-blue-200 transition-all duration-200 hover:shadow-md"
            onClick={handleNextImage}
            aria-label="Next image"
            type="button"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2} 
              stroke="currentColor" 
              className="w-4 h-4 text-blue-600"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
      
      {/* Price Badge */}
      <motion.span
        className="inline-block bg-blue-100 text-blue-800 font-bold rounded-full px-3 py-1 text-xs mb-2 shadow-sm border border-blue-200"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Price: <span className="italic">{price}</span>
      </motion.span>
      
      {/* Enquire Button */}
      <motion.button
        className="w-full px-3 py-1.5 bg-blue-600 text-white rounded font-bold shadow hover:bg-blue-700 transition-all duration-200 text-sm mt-1 hover:shadow-md active:transform active:scale-95"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
        type="button"
      >
        Enquire Now
      </motion.button>
    </motion.div>
  );
};

export default MapAreaPopup;