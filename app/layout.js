
import "./globals.css";

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
