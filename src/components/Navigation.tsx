'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useSection } from '@/context/SectionContext';
import Image from 'next/image';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { activeSection, setActiveSection } = useSection();

  const menuItems = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#355C7D] backdrop-blur-sm">
      <div className="flex items-center justify-between h-28">
        <div className="flex items-center">
          <Link 
            href="#" 
            className="h-28 flex items-center"
            onClick={() => handleSectionChange('home')}
          >
            <div className="relative w-[400px] h-[100px] flex items-center">
              <Image
                src="/For_Gilo/Footage/Logo/Animated_Large_Logo_GIF_2025_v001.gif"
                alt="Roy Peker Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
            <div className="relative w-[500px] h-[300px] -ml-80 flex items-center">
              <Image
                src="/For_Gilo/Footage/Name/Alpha_Large_NameTitle_2025_v001.png"
                alt="Roy Peker Name"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 px-8">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSectionChange(item.id)}
              className={`transition-all hover:opacity-75 ${
                activeSection === item.id
                  ? 'text-[#f2e3d5] font-medium'
                  : 'text-[#f2e3d5]/70'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-[#f2e3d5] hover:opacity-75 transition-opacity pr-4"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#32506C]/95 backdrop-blur-sm md:hidden"
            style={{ top: '64px' }}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSectionChange(item.id)}
                  className={`text-2xl transition-all hover:opacity-75 ${
                    activeSection === item.id
                      ? 'text-[#f2e3d5] font-medium'
                      : 'text-[#f2e3d5]/70'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation; 