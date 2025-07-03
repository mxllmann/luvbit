'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function AboutCard({ title, color, image, children }) {
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
      transition={{ duration: 0.8 }}
      className={`relative w-full max-w-4xl h-[260px] bg-black rounded-lg overflow-hidden shadow-md flex items-center justify-center mx-auto border ${isOpen ? 'border-pink-500' : 'border-zinc-700'}`}
    >
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

      <AnimatePresence>
        {!isOpen && !isTransitioning && (
          <motion.div
            key="preview-image"
            className="z-10 cursor-pointer"
            onClick={handleClick}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
          >
            <Image src={image} alt="preview" width={64} height={64} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="content"
            className="absolute inset-0 z-10 flex flex-col items-start justify-center text-sm text-zinc-200 px-6 overflow-y-auto"
            initial={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }}
            animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
            transition={{ duration: 1 }}
          >
            <h2 className={`mb-2 ${color}`} style={{ fontFamily: '"Press Start 2P", monospace' }}>{title}</h2>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}