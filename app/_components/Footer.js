'use client';

export default function Footer() {
  return (
    <footer className="bg-black text-zinc-400 border-t border-zinc-700 py-6 px-4 mt-20">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-mono">

        {/* Lado esquerdo */}
        <p className="text-center" style={{ fontFamily: '"VT323", monospace' }}>
          Luvbit — Where whispers become memories.
        </p>

        {/* Lado direito */}
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-xs text-center" style={{ fontFamily: '"VT323", monospace' }}>
          <a href="/about" className="hover:text-pink-400 transition">About</a>
          <a href="https://github.com/mxllmann/luvbit" target="_blank" className="hover:text-pink-400 transition">
            Site
          </a>
          <a href="https://github.com/mxllmann/api-luvbit" target="_blank" className="hover:text-pink-400 transition">
            API
          </a>
          <span className="text-zinc-600 hidden md:inline">|</span>
          <span className="text-pink-500">Developed Arthur Mallmann 💻</span>
        </div>

      </div>
    </footer>
  );
}
