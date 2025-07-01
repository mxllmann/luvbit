'use client';

import { useState, Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Dialog, Transition } from '@headlessui/react';

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => pathname === path;
  const linkClasses = "px-3 py-1 rounded text-sm transition duration-200";

  return (
    <header className="bg-black text-white px-6 py-4 flex items-center justify-between border-b border-gray-800 shadow-md z-50 relative">
      {/* Logo e título */}
      <div className="flex items-center gap-4">
        <Link href="/">
          <Image src="/logo.png" alt="Luvbit Logo" width={40} height={40} />
        </Link>
        <Link
          href="/"
          className="text-xl tracking-wider"
          style={{ fontFamily: '"Press Start 2P", monospace' }}
        >
          Luvbit
        </Link>
      </div>

      {/* Menu desktop */}
      <nav className="hidden md:flex gap-4 items-center">

        <Link
          href="/"
          className={`${linkClasses} ${
            isActive('/whisper') ? 'text-pink-400 underline' : 'hover:text-pink-300'
          }`}
        >
          Home
        </Link>

        <Link
          href="/whisper/create"
          className={`relative group px-3 py-1.5 text-sm font-medium rounded text-white bg-pink-600 
            hover:bg-purple-600 active:bg-blue-600 
            transition-all duration-300 tracking-normal border border-pink-400 cursor-pointer
            shadow-[0_0_2px_#f472b6] 
            hover:shadow-[0_0_4px_#a855f7] 
            active:shadow-[0_0_4px_#3b82f6] 
            active:scale-95
            before:absolute before:inset-0 before:rounded 
            before:shadow-[inset_0_0_8px_rgba(255,255,255,0.04)] 
            before:opacity-0 group-hover:before:opacity-100 
            before:transition-opacity
            after:absolute after:-inset-1 after:rounded 
            after:bg-pink-500/5 after:z-[-1]`}
          style={{ fontFamily: '"VT323", monospace' }}
        >
          Criar Whispler
        </Link>

        <Link
          href="/whisper"
          className={`${linkClasses} ${
            isActive('/whisper') ? 'text-pink-400 underline' : 'hover:text-pink-300'
          }`}
        >
          Sobre
        </Link>
      </nav>

      {/* Menu mobile */}
      <button onClick={() => setIsOpen(true)} className="md:hidden focus:outline-none">
        <span className="block w-6 h-0.5 bg-white mb-1" />
        <span className="block w-6 h-0.5 bg-white mb-1" />
        <span className="block w-6 h-0.5 bg-white" />
      </button>

      <Transition show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 md:hidden" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/80" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition-transform duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-transform duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <div className="fixed top-0 right-0 w-64 h-full bg-zinc-900 shadow-lg p-6">
              <button
                onClick={() => setIsOpen(false)}
                className="text-white text-xl absolute top-4 right-6"
              >
                ✕
              </button>

              <nav className="mt-12 flex flex-col gap-4 px-1 text-sm" style={{ fontFamily: '"VT323", monospace' }}>

               <Link
                href="/"
                onClick={() => setOpen(false)}
                className="text-white hover:text-pink-300 px-4 py-1 text-center transition-all duration-200"
              >
                Home
              </Link>

            <div className="border-t border-zinc-700 my-2 w-full" />

              <Link
                href="/whisper/create"
                onClick={() => setOpen(false)}
                className="bg-pink-600 hover:bg-purple-600 active:bg-blue-600 text-white px-4 py-2 rounded text-center transition-all duration-200"
              >
                Criar Whispler
              </Link>

              <div className="border-t border-zinc-700 my-2 w-full" />

              <Link
                href="/whisper"
                onClick={() => setOpen(false)}
                className="text-white hover:text-pink-300 px-4 py-1 text-center transition-all duration-200"
              >
                Sobre
              </Link>
            </nav>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </header>
  );
}
