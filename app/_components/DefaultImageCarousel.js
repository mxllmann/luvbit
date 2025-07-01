'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { useEffect } from 'react';

export default function DefaultImageCarousel({ images, selectedImage, onSelect }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false });

  useEffect(() => {
    if (emblaApi) emblaApi.reInit();
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <div className="mb-6 w-full max-w-full">
      <label className="block mb-2 text-white text-sm">Or select a default image:</label>

      <div className="relative w-full max-w-full">
        <div
          className="overflow-hidden rounded"
          ref={emblaRef}
          style={{ maxHeight: '120px' }} // controla a altura total do carrossel
        >
          <div className="flex gap-4 px-2 py-1">
            {images.map((img) => (
              <div key={img._id} className="flex-shrink-0 w-24 h-24 relative">
                <img
                  src={img.data}
                  alt={img.name}
                  className={`w-full h-full object-contain rounded transition-all duration-200 cursor-pointer border-2 ${
                    selectedImage?._id === img._id
                      ? 'border-pink-500 scale-105 shadow-lg z-10'
                      : 'border-zinc-700 hover:scale-105'
                  }`}
                  onClick={() => onSelect(img)}
                  style={{ zIndex: selectedImage?._id === img._id ? 10 : 1 }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
