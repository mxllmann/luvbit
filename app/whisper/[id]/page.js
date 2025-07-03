'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function WhisperPage() {
  const { id } = useParams();
  const [whisper, setWhisper] = useState(null);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const fetchWhisper = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/whisper/${id}`);
        if (!res.ok) throw new Error('Whisper not found');
        const data = await res.json();
        setWhisper(data);
      } catch (err) {
        setError(err.message);
      }
    };
    if (id) fetchWhisper();
  }, [id]);

  const handleImageClick = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
      setIsOpen(true);
    }, 500); // 0.5s de "apagão"
  };

  if (error) return <div className="text-red-500">{error}</div>;
  if (!whisper) return <div className="text-white">Loading...</div>;

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Blackout effect */}
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

      {/* Initial image */}
      <AnimatePresence>
        {!isOpen && !isTransitioning && (
          <motion.img
            key="image"
            src={whisper.photo}
            alt="Whisper Image"
            className="w-60 h-60 object-contain cursor-pointer z-10"
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
            onClick={handleImageClick}
            />
        )}
      </AnimatePresence>

      {/* Whisper content */}
      <AnimatePresence>
        {isOpen && (
         <motion.div
        key="whisper"
        className="absolute inset-0 flex flex-col items-center justify-center text-white px-6 z-10"
        initial={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }}
        animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <motion.p
          className="text-base md:text-lg leading-relaxed text-justify mx-auto"
          style={{
            maxWidth: '60ch',
            wordBreak: 'break-word',
            textAlign: 'justify'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {whisper.text}
        </motion.p>

        {whisper.creator && (
          <motion.p
            className="text-sm opacity-60 mt-4 text-center w-full"
            style={{ maxWidth: '60ch' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            — {whisper.creator}
          </motion.p>
        )}
      </motion.div>

        )}
      </AnimatePresence>
    </div>
  );
}
