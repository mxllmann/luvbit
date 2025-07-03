'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DefaultImageCarousel from '@/app/_components/DefaultImageCarousel';
import WhisperCreatedModal from '@/app/_components/WhisperCreatedModal';
import Header from '@/app/_components/Header';
import {motion} from 'framer-motion'
import SystemMessageModal from '@/app/_components/SystemMessageModal';

export default function CreateWhisper() {
  const [creator, setCreator] = useState('');
  const [text, setText] = useState('');
  const [customImage, setCustomImage] = useState(null);
  const [defaultImages, setDefaultImages] = useState([]);
  const [selectedDefault, setSelectedDefault] = useState(null);
  const router = useRouter();
  const [createdLink, setCreatedLink] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [systemMessage, setSystemMessage] = useState({ open: false, texto: '', tipo: 'aviso' });


useEffect(() => {
  fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/image`)
    .then((res) => res.json())
    .then((data) => setDefaultImages(data));
}, []);

const handleCustomImage = (e) => {
  const file = e.target.files[0];
  const MAX_SIZE = 15 * 1024 * 1024; // 15 MB

  if (file.size > MAX_SIZE) {
   setSystemMessage({
     open: true,
    texto: 'The file is too Large. The biggest file size allowed is 15MB.',
    tipo: 'warning'
   });
   return;
 }

  const reader = new FileReader();
  reader.onloadend = () => setCustomImage(reader.result);
  reader.readAsDataURL(file);
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const photo = customImage || selectedDefault?.data || null;

if (!text.trim() && !photo) {
  setSystemMessage({
    open: true,
    texto: 'Please write a message and select an image before sending your Whisper.',
    tipo: 'warning',
  });
  return;
}

if (!text.trim()) {
  setSystemMessage({
    open: true,
    texto: 'Please write something before sending your Whisper.',
    tipo: 'warning',
  });
  return;
}

if (!photo) {
  setSystemMessage({
    open: true,
    texto: 'Please select an image before sending your Whisper.',
    tipo: 'warning',
  });
  return;
}


  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/whisper`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ creator, text, photo })
    });

    const { id } = await res.json();

    const fullLink = `${window.location.origin}/whisper/${id}`;
    setCreatedLink(fullLink);
    setIsModalOpen(true);
  } catch (err) {
      console.error('Erro ao criar whisper:', err);
      setSystemMessage({
        open: true,
        texto: 'An error occurred while creating your Whisper. Please try again.',
        tipo: 'error',
      });
      return;
    }

};

  return (
    <>
      <Header />
      <main className="pt-30 bg-black min-h-screen text-white flex items-start justify-center pt-12 px-4">
  <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative mt-8 w-full max-w-xl flex flex-col items-center gap-4 p-8 bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 overflow-visible"
    >
    <h1 className="text-2xl mb-2" style={{ fontFamily: '"Press Start 2P", monospace' }}>
      Create Your Whisper
    </h1>

    {/* Input nome */}
    <input
      type="text"
      value={creator}
      onChange={(e) => setCreator(e.target.value)}
      placeholder="Your name (optional)"
      className="w-full p-3 bg-zinc-800 text-white rounded-lg border border-zinc-700 placeholder:text-zinc-400 focus:outline-none"
    />

    {/* Textarea */}
    <textarea
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Write your message..."
      className="w-full h-32 p-3 bg-zinc-800 text-white rounded-lg border border-zinc-700 placeholder:text-zinc-400 resize-none focus:outline-none"
    />

    {/* Upload personalizado */}
    <label className="text-sm text-zinc-400">Choose a custom image:</label>
    <label className="w-full max-w-sm flex flex-col items-center justify-center bg-zinc-800 text-zinc-200 border border-zinc-600 rounded-md px-4 py-3 cursor-pointer hover:border-pink-500 transition">
      <span className="mb-1 text-sm font-medium">Select Image</span>
      <input type="file" accept="image/*" onChange={handleCustomImage} className="hidden" />
      <p className="text-xs text-gray-400 mt-1">
      Maximum allowed size is 15MB.
    </p>
    </label>

    {/* Preview da imagem customizada */}
    {customImage && (
        <div className="relative mt-4">
            <img
            src={customImage}
            alt="Selected preview"
            className="w-28 h-28 rounded-md border border-zinc-700 object-contain shadow-md"
            />
            <button
            type="button"
            onClick={() => setCustomImage(null)}
            className="absolute -top-2 -right-2 bg-pink-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-pink-500 transition"
            title="Remover imagem"
            >
            ✕
            </button>
        </div>
        )}


    {/* Carrossel */}
    <div
      className={`w-full max-w-full transition-all duration-300 ${
        customImage ? 'max-h-0 overflow-hidden opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
    >
      <DefaultImageCarousel
        images={defaultImages}
        selectedImage={selectedDefault}
        onSelect={(img) => {
          setCustomImage(null);
          setSelectedDefault(img);
        }}
      />
    </div>

    {/* Botão */}
     <button
        type="submit"
        data-state="default"
        onMouseEnter={(e) => e.currentTarget.dataset.state = 'hover'}
        onMouseLeave={(e) => e.currentTarget.dataset.state = 'default'}
        onMouseDown={(e) => e.currentTarget.dataset.state = 'active'}
        onMouseUp={(e) => e.currentTarget.dataset.state = 'hover'}
        className="neon-button group px-6 py-3 font-bold rounded-md text-white bg-pink-600
          border-2 border-pink-400 outline-none cursor-pointer
          transition-all dturation-400 tracking-wide
          hover:scale-105
           hover:bg-purple-600
           hover:border-purple-400
           active:bg-blue-600
           active:border-blue-400
          active:scale-95"
        style={{ fontFamily: '"Press Start 2P", monospace' }}
      >
        Create Whisper
      </button>

  </motion.form>

  <WhisperCreatedModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  whisperLink={createdLink}
  />

  
  <SystemMessageModal
  isOpen={systemMessage.open}
  texto={systemMessage.texto}
  tipo={systemMessage.tipo}
  onClose={() => setSystemMessage({ ...systemMessage, open: false })}
  />


</main>
    </>
  );
}
