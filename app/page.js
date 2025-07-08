'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import WhisperPreview from './_components/WhisperPreview';
import { useEffect, useState } from 'react';
import Header from './_components/Header';
import Footer from './_components/Footer';

export default function Home() {
   const router = useRouter();

  return (
    <>
    <Header />
    <main className="min-h-screen flex flex-col items-center justify-center text-white pt-18 text-center px-6 bg-black sm:pt-0">
      <motion.h1
        className="text-4xl md:text-6xl font-bold mb-4 mt-30"
        style={{ fontFamily: '"Press Start 2P", monospace' }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Welcome to <span className="text-pink-500">Luvbit</span>
      </motion.h1>

      <motion.p
      className="text-lg md:text-xl text-zinc-300 max-w-2xl mb-10  leading-relaxed"
      style={{ fontFamily: '"IBM Plex Mono", monospace' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      Pixelated whispers between hearts.<br />
      Each link, a secret waiting to be uncovered.
    </motion.p>


      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        
       <button
        onClick={() => router.push('/whisper/create')}
        data-state="default"
        onMouseEnter={(e) => e.currentTarget.dataset.state = 'hover'}
        onMouseLeave={(e) => e.currentTarget.dataset.state = 'default'}
        onMouseDown={(e) => e.currentTarget.dataset.state = 'active'}
        onMouseUp={(e) => e.currentTarget.dataset.state = 'hover'}
        className="neon-button group px-6 py-3 font-bold rounded-md text-white bg-pink-600
          border-2 border-pink-400 outline-none cursor-pointer
          transition-all duration-300 tracking-wide
          hover:scale-105
           hover:bg-purple-600
           hover:border-purple-400
           active:bg-blue-600
           active:border-blue-400
          active:scale-95"
        style={{ fontFamily: '"Press Start 2P", monospace' }}
      >
        Create Your Whisper
      </button>

      </motion.div>

    <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
    <WhisperPreview
    image="/cheers.png"
    text="It’s not cold, but it was made with care. Go ahead, open it."
    author="Pint"
  />
  <WhisperPreview
    image="/lock.png"
    text="I hid this where only you would know to look."
    author="Mary"
  />
  <WhisperPreview
    image="/heart.png"
    text="Maybe I don’t say it often, but this is just for you."
    author="J."
  />

  </section>
    </main>
    <Footer/>
    </>
  );
}
