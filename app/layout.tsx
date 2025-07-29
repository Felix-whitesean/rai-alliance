import type { Metadata } from "next";
import "./globals.css";
import { Inter, Kode_Mono } from 'next/font/google'
import {getServerSession, Session} from "next-auth";
import {authOptions} from "@/lib/auth";
import ClientSessionProvider from "@/components/ClientSessionProvider";
import {ReactNode} from "react";

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

const RootLayout = async ({children}:{children:ReactNode}) =>{
    const session: Session | null = await getServerSession(authOptions);
    return (
    <html lang="en">
      <body className={`${inter.variable} ${kodeMono.variable} antialiased min-h-screen w-full`}>
      <ClientSessionProvider session={session}>
        {children}
      </ClientSessionProvider>
      </body>
    </html>
    );
}
export default RootLayout;