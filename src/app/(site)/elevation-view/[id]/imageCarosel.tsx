"use client";

import React, { useCallback, useEffect, useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight,  Images, X,  } from "lucide-react";

interface ImageCarouselProps {
  images: string[];
  altText: string;
  showVideo?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}
export default function ImageCarousel({ 
  images, 
  altText, 
  autoPlay = true,
  autoPlayInterval = 5000 
}: ImageCarouselProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && images.length > 1 && !isModalOpen) {
      autoPlayRef.current = setInterval(() => {
        setCurrentImage(prev => (prev + 1) % images.length);
      }, autoPlayInterval);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [autoPlay, images.length, isModalOpen, autoPlayInterval]);

  const nextImage = useCallback(
    () => {
      setCurrentImage((prev) => (prev + 1) % images.length);
      // Reset auto-play timer when manually navigating
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        if (autoPlay) {
          autoPlayRef.current = setInterval(() => {
            setCurrentImage(prev => (prev + 1) % images.length);
          }, autoPlayInterval);
        }
      }
    },
    [images.length, autoPlay, autoPlayInterval]
  );
  
  const prevImage = useCallback(
    () => {
      setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
      // Reset auto-play timer when manually navigating
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        if (autoPlay) {
          autoPlayRef.current = setInterval(() => {
            setCurrentImage(prev => (prev + 1) % images.length);
          }, autoPlayInterval);
        }
      }
    },
    [images.length, autoPlay, autoPlayInterval]
  );

  const goToImage = useCallback((index: number) => {
    setCurrentImage(index);
    // Reset auto-play timer
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      if (autoPlay) {
        autoPlayRef.current = setInterval(() => {
          setCurrentImage(prev => (prev + 1) % images.length);
        }, autoPlayInterval);
      }
    }
  }, [autoPlay, autoPlayInterval, images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setIsModalOpen(true);
      }
    };
    
    if (isModalOpen) {
      window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
    }
  }, [isModalOpen, nextImage, prevImage]);

  // Handle image load errors
  const handleImageError = useCallback((index: number) => {
    setImageErrors(prev => new Set([...prev, index]));
  }, []);

  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Get images for grid display, excluding the current main image
  const getGridImages = () => {
    const otherImages = images
      .map((img, idx) => ({ img, idx }))
      .filter(({ idx }) => idx !== currentImage && !imageErrors.has(idx));
    return otherImages.slice(0, 3);
  };

  const gridImages = getGridImages();
  const remainingCount = Math.max(0, images.length - 4);

  // Filter out error images
  const validImages = images.filter((_, idx) => !imageErrors.has(idx));

  if (validImages.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-100 rounded-xl">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  // Single image layout
  if (images.length === 1) {
    return (
      <div className="flex justify-center">
        <div className="w-full">
          <div className="relative w-full h-[65vh] md:h-[80vh] rounded-xl overflow-hidden bg-gray-100">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            )}
            
            <div className="relative group cursor-pointer h-full" onClick={() => setIsModalOpen(true)}>
              <Image
                src={images[0]}
                alt={`${altText} 1`}
                fill
                className="object-cover transition-transform duration-300 "
                priority
                onLoad={handleImageLoad}
                onError={() => handleImageError(0)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              />
              
              {/* Hover overlay */}
              {/* <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300 flex items-center justify-center opacity-0 ">
                <ZoomIn className="h-8 w-8 text-white drop-shadow-lg" />
              </div> */}

              <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                Featured
              </div>
            </div>

            {/* Action buttons */}
            <div className="absolute bottom-6 left-6 flex gap-3 z-20">
              {/* {showVideo && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsModalOpen(true);
                  }}
                  className="bg-black/80 hover:bg-black text-white px-6 py-3 rounded-full flex items-center gap-2 font-medium transition-all duration-300 hover:scale-105 backdrop-blur-sm shadow-lg"
                >
                  <Play className="h-4 w-4" />
                  Play Video
                </button>
              )} */}
              {/* <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(true);
                }}
                className="bg-white/90 hover:bg-white text-black px-6 py-3 rounded-full flex items-center gap-2 font-medium transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20 shadow-lg"
              >
                <Images className="h-4 w-4" />
                View Photo
              </button> */}
            </div>

            <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm z-20 backdrop-blur-sm">
              1 / 1
            </div>
          </div>

          {/* Fullscreen Modal */}
          {isModalOpen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
              role="dialog"
              aria-modal="true"
              onClick={() => setIsModalOpen(false)}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(false);
                }}
                className="absolute top-6 right-6 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all duration-300 hover:scale-110 z-10"
                aria-label="Close fullscreen"
              >
                <X className="h-6 w-6 text-white" />
              </button>
              
              <div 
                className="relative w-[95vw] h-[85vh] max-w-7xl"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={images[0]}
                  alt={`${altText} fullscreen`}
                  fill
                  className="object-contain"
                  priority
                  sizes="95vw"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Multiple images layout
  return (
    <div className="flex justify-center">
      <div className="w-full">
        <div className="relative w-full h-[65vh] md:h-[80vh] rounded-xl overflow-hidden bg-gray-100">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          )}

          {/* Main grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-full">
            {/* Main large image */}
            <div className="relative group cursor-pointer" onClick={() => setIsModalOpen(true)}>
              <Image
                src={images[currentImage]}
                alt={`${altText} ${currentImage + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                priority
                onLoad={handleImageLoad}
                onError={() => handleImageError(currentImage)}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              {/* Hover overlay */}
              {/* <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <ZoomIn className="h-8 w-8 text-white drop-shadow-lg" />
              </div> */}

              <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                Featured
              </div>
            </div>

            {/* Grid of other images - only show on desktop */}
            <div className="hidden md:grid gap-2 grid-rows-3">
              {gridImages.slice(0, 3).map(({ img, idx }, gridIdx) => (
                <div
                  key={idx}
                  className="relative cursor-pointer group"
                  onClick={() => goToImage(idx)}
                >
                  <Image
                    src={img}
                    alt={`${altText} preview ${idx + 1}`}
                    fill
                    className="object-cover transition-all duration-300 "
                    onError={() => handleImageError(idx)}
                    sizes="25vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                  
                  {/* Show remaining count on last image */}
                  {gridIdx === 2 && remainingCount > 0 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center group-hover:bg-black/40 transition-all duration-300">
                      <span className="text-white text-lg font-bold drop-shadow-lg">
                        +{remainingCount}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>

          {/* Navigation buttons */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 backdrop-blur-sm p-3 rounded-full transition-all duration-300 hover:scale-110 z-20 shadow-lg"
            aria-label="Previous image"
            disabled={images.length <= 1}
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 backdrop-blur-sm p-3 rounded-full transition-all duration-300 hover:scale-110 z-20 shadow-lg"
            aria-label="Next image"
            disabled={images.length <= 1}
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>

          {/* Action buttons */}
          <div className="absolute bottom-6 left-6 flex gap-3 z-20">
            {/* {showVideo && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(true);
                }}
                className="bg-black/80 hover:bg-black text-white px-6 py-3 rounded-full flex items-center gap-2 font-medium transition-all duration-300 hover:scale-105 backdrop-blur-sm shadow-lg"
              >
                <Play className="h-4 w-4" />
                Play Video
              </button>
            )} */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
              className="bg-white/90 hover:bg-white text-black px-6 py-3 rounded-full flex items-center gap-2 font-medium transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20 shadow-lg"
            >
              <Images className="h-4 w-4" />
              View All Photos
            </button>
          </div>

          {/* Image counter */}
          <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm z-20 backdrop-blur-sm">
            {currentImage + 1} / {images.length}
          </div>

          {/* Progress indicator for auto-play */}
          {autoPlay && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {images.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1 w-8 rounded-full transition-all duration-300 ${
                    idx === currentImage ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Thumbnail strip */}
<div className="mt-4 flex justify-center">
  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
    {images.map((src, idx) => (
      <button
        key={idx}
        onClick={() => goToImage(idx)}
        className={`relative w-20 h-14 md:w-24 md:h-16 lg:w-28 lg:h-20 rounded-lg overflow-hidden border shrink-0 transition-all duration-300 hover:scale-105  ${
          idx === currentImage
            ? "  shadow-lg transform scale-105"
            : "border-gray-200 hover:border-gray-300"
        }`}
        aria-label={`Select image ${idx + 1}`}
        disabled={imageErrors.has(idx)}
      >
        <Image
          src={src}
          alt={`${altText} thumbnail ${idx + 1}`}
          fill
          className="object-cover"
          onError={() => handleImageError(idx)}
          sizes="(max-width: 768px) 80px, (max-width: 1024px) 96px, 112px"
        />

        {/* Active overlay */}
        {idx === currentImage && (
          <div className="absolute inset-0 bg-blue-500/20 border-2 border-blue-500"></div>
        )}

        {/* Error state */}
        {imageErrors.has(idx) && (
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-xs">Error</span>
          </div>
        )}
      </button>
    ))}
  </div>
</div>

        {/* Fullscreen Modal */}
        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            onClick={() => setIsModalOpen(false)}
          >
            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(false);
              }}
              className="absolute top-6 right-6 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all duration-300 hover:scale-110 z-10"
              aria-label="Close fullscreen"
            >
              <X className="h-6 w-6 text-white" />
            </button>

            <div 
              className="relative w-[95vw] h-[85vh] max-w-7xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[currentImage]}
                alt={`${altText} fullscreen ${currentImage + 1}`}
                fill
                className="object-contain"
                priority
                sizes="95vw"
              />

              {/* Modal navigation */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-300"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-6 w-6 text-gray-900" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-300"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-6 w-6 text-gray-900" />
                  </button>

                  {/* Modal counter */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                    {currentImage + 1} / {images.length}
                  </div>

                  {/* Modal thumbnail strip */}
                  <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 max-w-md overflow-x-auto">
                    {images.map((src, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          goToImage(idx);
                        }}
                        className={`relative w-12 h-8 rounded overflow-hidden border shrink-0 transition-all duration-300 ${
                          idx === currentImage
                            ? "border-white ring-1 ring-white"
                            : "border-white/30 hover:border-white/60"
                        }`}
                      >
                        <Image
                          src={src}
                          alt={`Thumbnail ${idx + 1}`}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}