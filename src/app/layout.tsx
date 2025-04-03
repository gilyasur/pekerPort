import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { SectionProvider } from '@/context/SectionContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Roy Peker - Senior Digital Compositor",
  description: "A portfolio for Roy Peker, a senior digital compositor with a passion for creating stunning visual effects.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen overflow-hidden`}>
        <SectionProvider>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </SectionProvider>
      </body>
    </html>
  );
}
