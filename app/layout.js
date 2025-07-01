
import "./globals.css";
import { Press_Start_2P } from 'next/font/google';

const pixelFont = Press_Start_2P({ weight: '400', subsets: ['latin'], variable: '--font-pixel' });

export const metadata = {
  title: "Luvbit",
  description: "Send Whispers to the ones ypu love",
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
