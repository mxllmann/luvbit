'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';
import copy from 'copy-to-clipboard';

export default function WhisperCreatedModal({ isOpen, onClose, whisperLink }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    copy(whisperLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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

        <div className="fixed inset-0 flex items-center justify-center p-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="transition-transform duration-300"
            enterFrom="scale-95 opacity-0"
            enterTo="scale-100 opacity-100"
            leave="transition-transform duration-200"
            leaveFrom="scale-100 opacity-100"
            leaveTo="scale-95 opacity-0"
          >
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-zinc-900 border border-zinc-700 p-6 text-white shadow-xl transition-all">
              
              {/* Título */}
              <Dialog.Title
                className="text-xl font-bold mb-4 text-pink-400 text-center"
                style={{ fontFamily: '"VT323", monospace' }}
              >
                💌 Whisper criado com sucesso!
              </Dialog.Title>

              <p className="mb-4 text-sm text-center">
                Aqui está o link do seu Whisper:
              </p>

              {/* Caixa de link */}
              <div className="bg-zinc-800 p-3 rounded flex items-center justify-between gap-2 text-sm">
                <span className="truncate">{whisperLink}</span>
                <button
                  onClick={handleCopy}
                  className="text-pink-400 hover:text-purple-400 transition cursor-pointer"
                  title="Copiar"
                >
                  {copied ? <FiCheck className="text-green-400" /> : <FiCopy />}
                </button>
              </div>

              {/* Botão fechar */}
              <button
                onClick={onClose}
                className="mt-6 w-full px-4 py-2 bg-pink-600 hover:bg-purple-600 active:bg-blue-600 text-white rounded font-medium text-sm transition-all cursor-pointer"
              >
                Fechar
              </button>

            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
