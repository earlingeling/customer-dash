import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from 'next/image';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NXT Play Dashboard",
  description: "Are you really reading this?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex items-center justify-center h-screen bg-gray-200">
          <div className="p-6 bg-white rounded shadow-md w-600">
            <div className="flex items-center justify-center">
              <Image src="/nxtplay.png" alt="Logo" width="200" height="100" priority={true} placeholder="empty" layout="fixed" />
            </div>
              {children}
            </div>        
          </div>
      </body>
    </html>
  );
}
