import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Deutschlandfunk YouTube Transcriber",
  description: "Automated transcriptions for Deutschlandfunk YouTube playlist",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col relative overflow-x-hidden`}>
        {/* Background Gradients */}
        <div className="fixed inset-0 z-[-1] bg-slate-950">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-900 rounded-full mix-blend-screen filter blur-[128px] opacity-30" />
          <div className="absolute top-0 -right-4 w-96 h-96 bg-indigo-900 rounded-full mix-blend-screen filter blur-[128px] opacity-30" />
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-900 rounded-full mix-blend-screen filter blur-[128px] opacity-20" />
        </div>

        <nav className="border-b border-white/10 glass sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
              🎙️ DLF Transcriber
            </Link>
          </div>
        </nav>

        <main className="flex-grow max-w-6xl mx-auto px-6 py-12 w-full">
          {children}
        </main>
        
        <footer className="border-t border-white/10 mt-auto py-8 text-center text-slate-500 text-sm">
          <p>Automatisiert erstellt mit Gemini 3.1 Flash. Keine offizielle Website des Deutschlandfunks.</p>
        </footer>
      </body>
    </html>
  );
}
