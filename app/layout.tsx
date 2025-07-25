import type { Metadata } from "next";
import "./globals.css";
import { Inter, Kode_Mono } from 'next/font/google'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
})

// Configure Kode Mono
const kodeMono = Kode_Mono({
    subsets: ['latin'],
    variable: '--font-kode-mono',
    display: 'swap',
})

export const metadata: Metadata = {
  title: "RAI Alliance",
  description: "Responsible artificial intelligence Alliance. RAI Alliance, RAI-Alliance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${kodeMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
