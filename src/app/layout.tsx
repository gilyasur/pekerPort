import type { Metadata } from "next";
import "./globals.css";
import { SectionProvider } from '@/context/SectionContext';

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
      <body className="min-h-screen overflow-hidden font-raleway">
        <SectionProvider>
          <main className="min-h-screen">
            {children}
          </main>
        </SectionProvider>
      </body>
    </html>
  );
}
