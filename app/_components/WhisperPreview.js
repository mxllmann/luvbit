'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function WhisperPreview({ image, text, author }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleClick = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
      setIsOpen(true);
    }, 500);
  };

  return (
    <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  className={`relative w-[320px] h-[280px] bg-black rounded-lg overflow-hidden shadow-md flex items-center justify-center mx-auto border ${
    isOpen ? 'border-pink-500' : 'border-zinc-700'
  }`}
    >
  {/* Blackout */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            key="blackout"
            className="absolute inset-0 bg-black z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>

      {/* Imagem inicial */}
      <AnimatePresence>
            {!isOpen && !isTransitioning && (
                <motion.img
                key="preview-image"
                src={image}
                alt="Preview"
                className="w-40 h-40 object-contain cursor-pointer z-10"
                onClick={handleClick}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                    opacity: 1,
                    scale: [1, 1.08, 1],
                    rotate: [0, 2, -2, 0]
                }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                    opacity: { duration: 0.4, ease: 'easeInOut' },
                    scale: {
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: 'mirror',
                    ease: 'easeInOut'
                    },
                    rotate: {
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: 'mirror',
                    ease: 'easeInOut'
                    }
                }}
                />
            )}
            </AnimatePresence>
      {/* Texto revelado */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
        key="preview-content"
        className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white text-center px-4"
        initial={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }}
        animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
        transition={{ duration: 1 }}
        >
        <p className="text-sm leading-relaxed max-w-[28ch] text-justify">
            {text}
        </p>
        {author && (
            <p className="text-xs opacity-60 mt-3">— {author}</p>
        )}
        </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
