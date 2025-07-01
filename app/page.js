'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import WhisperPreview from './_components/WhisperPreview';

export default function Home() {
  return (
    <>
    <main className="min-h-screen flex flex-col items-center justify-center text-white text-center px-6 bg-black pt-60 sm:pt-0">
      {/* Título */}
      <motion.h1
        className="text-4xl md:text-6xl font-bold mb-4"
        style={{ fontFamily: '"Press Start 2P", monospace' }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Welcome to <span className="text-pink-500">Luvbit</span>
      </motion.h1>

      {/* Subtítulo */}
      <motion.p
      className="text-lg md:text-xl text-zinc-300 max-w-2xl mb-10  leading-relaxed"
      style={{ fontFamily: '"IBM Plex Mono", monospace' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      Mensagens pixeladas, sussurradas entre corações.<br />
      Crie, compartilhe e emocione com estilo — onde cada link é um segredo revelado.
    </motion.p>


      {/* Botão CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Link
          href="/whisper/create"
          className="relative group px-6 py-3 font-bold rounded-md text-white bg-pink-600 
        hover:bg-purple-600 active:bg-blue-600
        transition-all duration-300 tracking-wide border-2 border-pink-400 outline-none cursor-pointer
        shadow-[0_0_8px_#f472b6,0_0_20px_#f472b6] 
        hover:shadow-[0_0_12px_#a855f7,0_0_30px_#a855f7] 
        active:shadow-[0_0_10px_#3b82f6,0_0_25px_#3b82f6] 
        active:scale-95
        before:absolute before:inset-0 before:rounded-md 
        before:shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] 
        before:opacity-0 group-hover:before:opacity-100 
        before:transition-opacity
        after:absolute after:-inset-1 after:rounded-md 
        after:animate-pulse after:bg-pink-500/20 after:z-[-1]"
      style={{ fontFamily: '"Press Start 2P", monospace' }}
        >
          Criar seu Whisper
        </Link>
      </motion.div>

    <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
    <WhisperPreview
      image="/default1.png"
      text="Mesmo em silêncio, você me diz tudo."
      author="Anônimo"
    />
    <WhisperPreview
      image="/default5.png"
      text="Guardei esse sentimento só para você descobrir."
      author="Camila R."
    />
    <WhisperPreview
      image="/default3.png"
      text="Às vezes um link diz mais que mil palavras."
      author="J."
    />
  </section>

    </main>
    </>
  );
}
