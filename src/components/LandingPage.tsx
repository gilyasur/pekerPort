'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useSection } from '@/context/SectionContext';
import { FaLinkedin, FaImdb, FaVimeoV, FaYoutube, FaInstagram } from 'react-icons/fa';
import { useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });

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
    thumbnail: 'For_Gilo/Footage/Covers/Film_Cover_v001.png',
    videoUrl: 'https://vimeo.com/1074932475'
  },
  {
    id: 2,
    title: 'Digital Composition',
    thumbnail: 'For_Gilo/Footage/Covers/Ads_Cover_v001.png',
    videoUrl: 'https://vimeo.com/1074932894'
  },
  {
    id: 3,
    title: 'VFX Integration',
    thumbnail: 'For_Gilo/Footage/Covers/VFX_Cover_v001.png',
    videoUrl: 'https://vimeo.com/202516691'
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
    thumbnail: 'For_Gilo/Footage/Covers/Lead_Cover_v001.png',
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
    <div className={`h-screen flex flex-col md:flex-row ${montserrat.className}`}>
      {/* Left side - Dark blue background */}
      <div className="w-full md:w-[40%] bg-[#32506C] flex flex-col p-4 md:p-6 lg:p-8">
        <div className="w-full flex flex-col h-full p-4 md:p-6 lg:p-8 justify-start" style={{paddingRight: 0, gap: '20px'}}>
          {/* Logo and Name - Aligned to the left at top */}
          <div className="flex items-center m-0 p-0 mb-4">
            <div className="relative w-[220px] h-[130px] flex-shrink-0 p-0 m-0">
              <Image
                src="/For_Gilo/Footage/Logo/Animated_Large_Logo_GIF_2025_v001-ezgif.com-loop-count.gif"
                alt="Roy Peker Logo"
                fill
                className="object-contain object-left"
                priority
                unoptimized
              />
            </div>
            <div className="relative flex-1 h-[140px] ml-2 overflow-hidden">
              <Image
                src="/For_Gilo/Footage/Name/Alpha_Large_NameTitle_2025_v001 copy.png"
                alt="Roy Peker Name"
                fill
                className="object-contain object-left"
                priority
                unoptimized
              />
            </div>
          </div>

          {/* Greeting header */}
          <div className="mb-2 pl-4">
            <h1 className="text-[#F2E3D5] text-2xl font-bold">Hi! I'm Roy!</h1>
          </div>

          {/* Description text */}
          <div className="mb-0 pl-4 pr-4">
            <p className="text-[#F2E3D5]/90 max-w-lg text-base">
              <strong>Feel free to check out my work! Do you have a project in mind that needs help in telling the story using VFX?</strong><br />
              <br></br>
              Do not hesitate to reach out to me. I am always keen to hear regarding new & exciting projects to get involved with!
            </p>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-8 mt-1 mb-1">
            <a 
              href="/projects/pdf/next.pdf" 
              className="bg-[#FF8080] text-white px-4 py-2 rounded-full hover:bg-[#FFB868]/90 transition-colors text-sm"
              download="Roy_Peker_CV.pdf"
            >
              Download CV
            </a>
            <button 
              onClick={() => setActiveSection('contact')}
              className="bg-[#FF8080] text-white px-4 py-2 rounded-full hover:bg-[#FFB868]/90 transition-colors text-sm"
            >
              Say hello
            </button>
          </div>

          {/* Social Links */}
          <div className="mt-0 flex justify-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.title}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-[#32506C] text-[#f2e3d5] hover:text-[#ffb868] transition-colors"
                title={link.title}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Right side - Cream background with projects */}
      <div className="w-full md:w-[60%] bg-[#F2E3D5] p-1 md:p-3 lg:p-4 flex flex-col">
        <div className="w-full h-full flex flex-col p-6 md:p-8 lg:p-10 justify-between">
          <div className="grid grid-cols-2 gap-3 md:gap-5 w-full pl-4 pr-6">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ scale: 1.02 }}
                className="overflow-hidden rounded-lg shadow-md mb-2"
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
                        src={`/For_Gilo/Footage/Covers/${project.thumbnail.split('/').pop()}`}
                        alt={project.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Copyright line */}
          <div className="pt-4 text-center text-[#345a7c]/80 text-xs">
            Designed by Roy Peker © 2025. All Rights Reserved
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 