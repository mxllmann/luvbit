'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Image from 'next/image';
import { warning } from 'framer-motion';

const iconMap = {
  success: '/icons/success.png',
  warning: '/icons/warning.png',
  erro: '/icons/error.png',
};

const colorMap = {
  success: 'text-green-400 border-green-500',
  warning: 'text-yellow-400 border-yellow-500',
  error: 'text-red-400 border-red-500',
};

export default function SystemMessageModal({ isOpen, onClose, texto, tipo = 'warning' }) {
  const iconSrc = iconMap[tipo.toLowerCase()] || iconMap.aviso;
  const borderColor = colorMap[tipo.toLowerCase()] || colorMap.aviso;

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-90"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-90"
          >
            <Dialog.Panel className={`bg-zinc-900 border rounded-2xl p-8 shadow-xl max-w-sm w-full text-white ${borderColor}`}>
              <div className="flex flex-col items-center gap-4 text-center">
                <Image src={iconSrc} alt={tipo} width={72} height={72} />
                <Dialog.Title className="text-2xl font-bold" style={{ fontFamily: '"Press Start 2P", monospace' }}>
                  {tipo.toUpperCase()}
                </Dialog.Title>
                <p className="text-base">{texto}</p>
                <button
              onClick={onClose}
              className=" cursor-pointer mt-5 px-6 py-3 rounded-md text-white bg-pink-600 hover:bg-pink-700 active:bg-pink-800
                border-2 border-pink-400 font-bold shadow-[0_0_8px_#ec4899,0_0_16px_#ec4899] 
                hover:shadow-[0_0_12px_#db2777,0_0_24px_#db2777] 
                active:shadow-[0_0_8px_#9d174d,0_0_16px_#9d174d] 
                transition-all duration-300 ease-in-out scale-100 hover:scale-105 active:scale-95
                before:content-[''] before:absolute before:inset-0 before:rounded-md before:opacity-0 
                before:transition-opacity before:shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] group-hover:before:opacity-100"
              style={{ fontFamily: '"Press Start 2P", monospace', position: 'relative', zIndex: 1 }}
            >
              CLOSE
            </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
