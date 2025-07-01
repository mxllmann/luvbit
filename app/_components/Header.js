'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const linkClasses = "px-3 py-1 rounded text-sm transition duration-200";
  const isActive = (path) => pathname === path;

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

      {/* Navegação */}
      <nav className="flex gap-4 items-center">
        <Link
          href="/whisper/create"
          className={`bg-pink-600 hover:bg-pink-500 text-white font-bold ${linkClasses} border-2 border-pink-500 shadow-md`}
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
    </header>
  );
}
