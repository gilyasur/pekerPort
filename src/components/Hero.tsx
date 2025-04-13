'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useSection } from '@/context/SectionContext';

const Hero = () => {
  const { setActiveSection } = useSection();

  return (
    <section className="relative min-h-screen flex items-center bg-[#f2e3d5]">
      {/* Background image that overlaps header and footer */}
      <div className="absolute inset-0 overlap-header overlap-footer">
        <div className="absolute inset-0 bg-black/20 z-0" />
        <div className="absolute inset-0 z-[-1]">
          <Image
            src="/For_Gilo/Footage/Name/Alpha_Large_NameTitle_2025_v001.png"
            alt="Roy Peker Hero"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
      
      {/* Content that stays within safe area */}
      <div className="container relative mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[#32506c] font-montserrat">
            I'm Roy Peker
          </h1>
          <div className="flex flex-col md:flex-row flex-wrap items-start gap-4 text-xl md:text-2xl mb-8 text-[#32506c]/90">
            <span>Senior Digital Compositor</span>
            <span className="hidden md:block text-[#32506c]/50">•</span>
            <span>VFX Specialist</span>
            <span className="hidden md:block text-[#32506c]/50">•</span>
            <span>and Much more</span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="https://www.roypeker.com/wp-content/uploads/2025/03/CV-Roy-Peker.pdf" 
              className="bg-[#FF8080] text-white px-6 py-3 rounded-full hover:bg-[#FF8080]/90 transition-colors"
              download
            >
              Download CV
            </a>
            <button 
              onClick={() => setActiveSection('contact')}
              className="bg-[#EE9B3D] text-white px-6 py-3 rounded-full hover:bg-[#EE9B3D]/90 transition-colors"
            >
              Say hello
            </button>
          </div>
        </motion.div>
      </div>

      {/* Decorative elements that can overlap */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f2e3d5] to-transparent overlap-footer" />
    </section>
  );
};

export default Hero; 