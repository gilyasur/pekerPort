'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useSection } from '@/context/SectionContext';
import LandingPage from '@/components/LandingPage';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';

export default function Home() {
  const { activeSection } = useSection();

  return (
    <div className="min-h-screen">
      <LandingPage />
    </div>
  );
}
