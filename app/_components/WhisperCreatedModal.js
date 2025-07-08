'use client';

import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/react';
import { Fragment, useState } from 'react';
import Image from 'next/image';
import { FiCopy, FiCheck } from 'react-icons/fi';
import copy from 'copy-to-clipboard';
import {  EnvelopeIcon } from '@heroicons/react/24/solid';

export default function WhisperCreatedModal({ isOpen, onClose, whisperLink }) {
const [copied, setCopied] = useState(false);
const [email, setEmail] = useState('');
const [emailSent, setEmailSent] = useState(false);
const [emailError, setEmailError] = useState(false);

const handleSend = async () => {
  if (!email) return;
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, whisperId: whisperLink.split('/').pop() })
    });
    if (res.ok) {
      setEmailSent(true);
      setEmailError(false);
      setEmail('');
    } else {
      setEmailError(true);
      setEmailSent(false);
    }
  } catch {
    setEmailError(true);
    setEmailSent(false);
  }
};

  const handleCopy = () => {
    copy(whisperLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Fundo escuro com blur */}
        <Transition.Child
          as={Fragment}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
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
            <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-zinc-900 border-2 border-pink-400 p-8 text-white shadow-xl transition-all">
              <div className="flex flex-col items-center gap-4 text-center">
                
                <Image
                  src="/icons/success.png"
                  alt="Sucesso"
                  width={72}
                  height={72}
                  className="neon-glow"
                />

                <Dialog.Title
                  className="text-2xl font-bold text-pink-400"
                  style={{ fontFamily: '"Press Start 2P", monospace' }}
                >
                  WHISPER CREATED
                </Dialog.Title>

                <p className="text-base text-zinc-200">
                  Here is your Whisper link:
                </p>

                <div className="bg-zinc-800 px-4 py-3 rounded flex items-center justify-between w-full text-sm border border-zinc-700">
                  <span className="truncate">{whisperLink}</span>
                  <button
                    onClick={handleCopy}
                    className="text-pink-400 hover:text-purple-400 transition cursor-pointer"
                    title="Copiar"
                  >
                    {copied ? <FiCheck className="text-green-400" /> : <FiCopy />}
                  </button>
                </div>

                 <label className="text-xs text-zinc-400 block">Send it to someone (optional):</label> 
                              <div className='flex flex-row w-full gap-2'>
                                <input
                                      type="email"
                                      placeholder="name@example.com"
                                      value={email}
                                      onChange={(e) => setEmail(e.target.value)}
                                      className="flex-1 px-4 py-3 rounded bg-zinc-800 text-white border border-zinc-600 
                                      focus:outline-none focus:border-pink-400 text-sm"
                                    />
                                    <button
                                      onClick={handleSend}
                                      className="group
                                       cursor-pointer relative flex items-center justify-center px-4 py-3 rounded-md
                                       text-white bg-pink-600 hover:bg-pink-700 active:bg-pink-800
                                        border-2 border-pink-400 font-bold shadow-[0_0_8px_#ec4899,0_0_16px_#ec4899] 
                                        hover:shadow-[0_0_12px_#db2777,0_0_24px_#db2777] 
                                        active:shadow-[0_0_8px_#9d174d,0_0_16px_#9d174d] 
                                        transition-all duration-300 ease-in-out scale-100 hover:scale-105 active:scale-95
                                        before:content-[''] before:absolute before:inset-0 before:rounded-md before:opacity-0 
                                        before:transition-opacity before:shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] group-hover:before:opacity-100"
                                      title="Send via email"
                                      style={{ fontFamily: '"Press Start 2P", monospace', zIndex: 1 }}
                                    >
                                      <EnvelopeIcon style={{ width: '20px', height: '20px' }} className="text-white drop-shadow-[0_0_4px_#ec4899]" />
                                    </button>
                                
                </div>
                {emailSent && (
                                <p className="text-green-400 text-xs mt-1">Email sent!</p>
                              )}
                              {emailError && (
                                <p className="text-red-400 text-xs mt-1">Failed to send. Try again.</p>
                              )}
                              <p className="text-zinc-500 text-[10px] italic">This message is anonymous and not stored with the email.</p>

                <button
                  onClick={onClose}
                  className=" cursor-pointer mt-4 px-6 py-3 rounded-md text-white bg-pink-600 hover:bg-pink-700 active:bg-pink-800
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
    </Transition>
  );
}