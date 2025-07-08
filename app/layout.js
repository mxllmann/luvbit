
import "./globals.css";
import { Press_Start_2P } from 'next/font/google';
import { VT323 } from 'next/font/google';

const pixelFont = Press_Start_2P({ weight: '400', subsets: ['latin'], variable: '--font-pixel' });
const vt323 = VT323({ weight: '400', subsets: ['latin'], variable: '--font-arcade' });

export const metadata = {
  title: "Luvbit",
  description: "Send Whispers to the ones you love",
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
