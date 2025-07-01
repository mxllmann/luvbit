'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DefaultImageCarousel from '@/app/_components/DefaultImageCarousel';
import WhisperCreatedModal from '@/app/_components/WhisperCreatedModal';
import Header from '@/app/_components/Header';

export default function CreateWhisper() {
  const [creator, setCreator] = useState('');
  const [text, setText] = useState('');
  const [customImage, setCustomImage] = useState(null);
  const [defaultImages, setDefaultImages] = useState([]);
  const [selectedDefault, setSelectedDefault] = useState(null);
  const router = useRouter();
  const [createdLink, setCreatedLink] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

useEffect(() => {
  fetch('http://localhost:3001/image')
    .then((res) => res.json())
    .then((data) => setDefaultImages(data));
}, []);

const handleCustomImage = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onloadend = () => setCustomImage(reader.result);
  reader.readAsDataURL(file);
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const photo = customImage || selectedDefault?.data || null;

  if (!photo || !text.trim()) {
    alert('É necessário ao menos uma imagem e uma mensagem.');
    return;
  }

  try {
    const res = await fetch('http://localhost:3001/whisper', {
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
    alert('Houve um erro ao criar o whisper. Tente novamente.');
  }
};

  return (
    <>
      <Header />
      <main className="bg-black min-h-screen text-white flex items-start justify-center pt-12 px-4">
  <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-xl flex flex-col items-center gap-4 p-8 bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 overflow-visible"
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
      required
    />

    {/* Upload personalizado */}
    <label className="text-sm text-zinc-400">Choose a custom image:</label>
    <label className="w-full max-w-sm flex flex-col items-center justify-center bg-zinc-800 text-zinc-200 border border-zinc-600 rounded-md px-4 py-3 cursor-pointer hover:border-pink-500 transition">
      <span className="mb-1 text-sm font-medium">Select Image</span>
      <input type="file" accept="image/*" onChange={handleCustomImage} className="hidden" />
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
      Create Whisper
    </button>
  </form>

  <WhisperCreatedModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  whisperLink={createdLink}
/>

</main>
    </>
  );
}
