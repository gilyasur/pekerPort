'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useSection } from '@/context/SectionContext';
import { FaLinkedin, FaImdb, FaVimeoV, FaYoutube, FaInstagram } from 'react-icons/fa';
import { useState } from 'react';
import { FaPlay } from 'react-icons/fa';

const socialLinks = [
  {
    title: 'LinkedIn',
    url: 'https://www.linkedin.com/in/roypeker/',
    icon: <FaLinkedin size={20} />
  },
  {
    title: 'IMDb',
    url: 'https://www.imdb.com/name/nm6738899/?ref_=nv_sr_1',
    icon: <FaImdb size={20} />
  },
  {
    title: 'Vimeo',
    url: 'https://vimeo.com/roypeker',
    icon: <FaVimeoV size={20} />
  },
  {
    title: 'YouTube',
    url: 'https://www.youtube.com/channel/UCHjdQOEuDRcT-uKj2OKRr0A',
    icon: <FaYoutube size={20} />
  },
  {
    title: 'Instagram',
    url: 'https://www.instagram.com/roy.peker/',
    icon: <FaInstagram size={20} />
  }
];

const projects = [
  {
    id: 1,
    title: 'VFX Showreel',
    thumbnail: 'For_Gilo/Footage/Covers/VFX_Cover_v001.png',
    videoUrl: 'https://vimeo.com/202516691'
  },
  {
    id: 2,
    title: 'Digital Composition',
    thumbnail: 'For_Gilo/Footage/Covers/Film_Cover_v001.png',
    videoUrl: 'https://vimeo.com/1074932894'
  },
  {
    id: 3,
    title: 'VFX Integration',
    thumbnail: 'For_Gilo/Footage/Covers/Lead_Cover_v001.png',
    videoUrl: 'https://vimeo.com/1074932475'
  },
  {
    id: 4,
    title: 'VFX Showreel 2',
    thumbnail: 'For_Gilo/Footage/Covers/Onset_Cover_v001.png',
    videoUrl: 'https://vimeo.com/1074933563'
  },
  {
    id: 5,
    title: 'Digital Composition 2',
    thumbnail: 'For_Gilo/Footage/Covers/Ads_Cover_v001.png',
    videoUrl: 'https://vimeo.com/1074936568'
  },
  {
    id: 6,
    title: 'VFX Integration 2',
    thumbnail: 'For_Gilo/Footage/Covers/AI_Cover_v001.jpg',
    videoUrl: 'https://vimeo.com/202516691'
  }
];

const LandingPage = () => {
  const { setActiveSection } = useSection();
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  const handleVideoClick = (id: number) => {
    setActiveVideo(activeVideo === id ? null : id);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Dark blue background */}
      <div className="w-full md:w-[40%] bg-[#345a7c] flex flex-col p-8 md:p-12 lg:p-8">
        <div className="w-full flex flex-col">
          {/* Logo and Name - Aligned to the left at top */}
          <div className="flex items-center m-0 p-0">
            <div className="relative w-[180px] h-[160px] p-0 m-0">
              <Image
                src="For_Gilo/Footage/Logo/Animated_Large_Logo_GIF_2025_v001.gif"
                alt="Roy Peker Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
            <div className="relative w-[250px] h-[140px] ml-3 overflow-hidden">
              <Image
                src="For_Gilo/Footage/Name/Alpha_Large_NameTitle_2025_v001.png"
                alt="Roy Peker Name"
                fill
                className="object-contain object-left scale-[2.0] origin-center"
                priority
              />
            </div>
          </div>

          {/* Greeting header */}
          <div className="mb-6">
            <h1 className="text-white text-3xl font-bold">Hi! I'm Roy!</h1>
          </div>

          {/* Description text */}
          <div className="mb-8">
            <p className="text-white/90 max-w-lg text-lg">
              <strong>Feel free to check out my work! Do you have a project in mind that needs help in telling the story using VFX?</strong><br />
              <br></br>
              Do not hesitate to reach out to me. I am always keen to hear regarding new & exciting projects to get involved with!
            </p>
          </div>

          {/* Center the buttons and social links */}
          <div className="flex-grow flex flex-col justify-center">
            {/* Buttons */}
            <div className="flex justify-center gap-16 mb-8">
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

            {/* Social Links */}
            <div className="mt-24 flex justify-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-[#f2e3d5] text-[#32506C] hover:bg-[#ffb868] transition-colors"
                  title={link.title}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Cream background with projects */}
      <div className="w-full md:w-[60%] bg-[#F2E3D5] p-1 md:p-4 lg:p-6 flex flex-col">
        <div className="grid grid-cols-2 gap-1 md:gap-2 w-full">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ scale: 1.02 }}
              className="overflow-hidden rounded-lg shadow-md mb-1"
            >
              <div className="relative aspect-[16/9]">
                {activeVideo === project.id ? (
                  <iframe
                    src={`https://player.vimeo.com/video/${project.videoUrl.split('/').pop()}?h=0&title=0&byline=0&portrait=0&autoplay=1`}
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full border-0"
                    title={project.title}
                  ></iframe>
                ) : (
                  <button 
                    onClick={() => handleVideoClick(project.id)}
                    className="absolute inset-0 w-full h-full p-0 border-0 bg-transparent cursor-pointer"
                  >
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Copyright line */}
        <div className="mt-auto pt-4 text-center text-[#345a7c]/80 text-sm">
          Designed by Roy Peker © 2025. All Rights Reserved
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 