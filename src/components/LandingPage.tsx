'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useSection } from '@/context/SectionContext';
import { FaLinkedin, FaImdb, FaVimeoV, FaYoutube, FaInstagram } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { FaPlay } from 'react-icons/fa';
import { Montserrat } from 'next/font/google';
import { createPortal } from 'react-dom';

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
    videoUrl: 'https://vimeo.com/1074932894'
  },
  {
    id: 2,
    title: 'Digital Composition',
    thumbnail: 'For_Gilo/Footage/Covers/Ads_Cover_v001.png',
    videoUrl: 'https://vimeo.com/1074932475'
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

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;
  
  return createPortal(
    <div className="modal-container">
      <style jsx global>{`
        .modal-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }
        .modal-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
        }
        .modal-content {
          position: relative;
          background: rgba(53, 92, 125, 0.8);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-radius: 1rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          padding: 1.5rem;
          margin: 1rem;
          width: 100%;
          max-width: 42rem;
          z-index: 10;
          color: #F2E3D5;
        }
        .modal-header {
          color: #F2E3D5;
          font-weight: bold;
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }
        .form-row {
          display: flex;
          gap: 1rem;
        }
        .form-row > div {
          flex: 1;
        }
      `}</style>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
};

const LandingPage = () => {
  const { setActiveSection } = useSection();
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isBrowser, setIsBrowser] = useState(false);

  // Only execute on client side
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleVideoClick = (id: number) => {
    setActiveVideo(activeVideo === id ? null : id);
  };

  const handleOpenModal = () => {
    setShowContactModal(true);
  };

  const handleCloseModal = () => {
    setShowContactModal(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({
      name: '',
      email: '',
      message: ''
    });
    setShowContactModal(false);
  };

  return (
    <div className={`h-screen flex flex-col md:flex-row overflow-auto ${montserrat.className}`}>
      {/* Left side - Dark blue background */}
      <div className="w-full md:w-[40%] bg-[#32506C] flex flex-col p-1 md:p-2 lg:p-4 overflow-auto">
        <div className="w-full flex flex-col h-full p-1 md:p-2 lg:p-4 justify-start" style={{paddingRight: 0, gap: '8px'}}>
          {/* Logo and Name - Aligned to the left at top */}
          <div className="flex items-center m-0 p-0 mb-1">
            <div className="relative w-[180px] md:w-[220px] h-[110px] md:h-[130px] flex-shrink-0 p-0 m-0">
              <Image
                src="/For_Gilo/Footage/Logo/Alpha_Large_Logo_2025_v001.png"
                alt="Roy Peker Logo"
                fill
                className="object-contain object-left"
                priority
                unoptimized
              />
            </div>
            <div className="relative flex-1 h-[100px] md:h-[120px] ml-4 md:ml-8 overflow-hidden" style={{ marginLeft: "-10px" }}>
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
          <div className="mb-4 pl-8 md:pl-10 mt-6">
            <h1 className="text-[#F2E3D5] text-xl md:text-3xl font-bold">Hi! I'm Roy!</h1>
          </div>

          {/* Description text */}
          <div className="mb-8 pl-8 md:pl-10 pr-2 md:pr-4">
            <p className="text-[#F2E3D5]/90 max-w-lg text-base md:text-base leading-relaxed">
              <strong className="block mb-2">Feel free to check out my work! Do you have a project in mind that needs help in telling the story using VFX?</strong>
              <span className="block mt-3">Do not hesitate to reach out to me. I am always keen to hear regarding new & exciting projects to get involved with!</span>
            </p>
          </div>

          {/* Buttons */}
          <div className="flex justify-start gap-2 md:gap-4 mt-4 mb-0 pl-8 md:pl-10" style={{width: '300px'}}>
            <a 
              href="/projects/pdf/next.pdf" 
              className="bg-[#FF8080] text-white px-2 py-1 md:px-3 md:py-1 rounded-full hover:bg-[#FFB868]/90 transition-colors text-base"
              download="Roy_Peker_CV.pdf"
            >
              Download CV
            </a>
            <button 
              onClick={handleOpenModal}
              className="bg-[#FF8080] text-white px-2 py-1 md:px-3 md:py-1 rounded-full hover:bg-[#FFB868]/90 transition-colors text-base"
            >
              Say hello
            </button>
          </div>

          {/* Social Links */}
          <div className="mt-0 pl-8 md:pl-10" style={{width: '300px'}}>
            <div className="flex justify-between w-full">
              {socialLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[24px] h-[24px] md:w-[28px] md:h-[28px] flex items-center justify-center rounded-full bg-[#32506C] text-[#f2e3d5] hover:text-[#ffb868] transition-colors"
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
      <div className="w-full md:w-[60%] bg-[#F2E3D5] p-0 flex flex-col overflow-auto">
        <div className="w-full h-full flex flex-col p-0">
          <div className="flex w-full px-8 mx-0 pt-8 space-x-3" style={{paddingTop: '50px'}}>
            <div className="flex flex-col items-end w-1/2 p-0">
              {projects.slice(0, 3).map((project) => (
                <motion.div
                  key={project.id}
                  whileHover={{}}
                  className="overflow-hidden rounded-lg shadow-sm mb-2 w-[80%]"
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
            <div className="flex flex-col items-start w-1/2 p-0">
              {projects.slice(3, 6).map((project) => (
                <motion.div
                  key={project.id}
                  whileHover={{}}
                  className="overflow-hidden rounded-lg shadow-sm mb-2 w-[80%]"
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
          </div>
          
          {/* Copyright line */}
          <div className="pt-1 pb-2 text-center text-[#345a7c]/80 text-[10px] md:text-xs">
            Designed by Roy Peker © 2025. All Rights Reserved
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {isBrowser && (
        <Modal isOpen={showContactModal} onClose={handleCloseModal}>
          <button 
            onClick={handleCloseModal} 
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <h2 className="modal-header">Let's Talk</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-row">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#F2E3D5] mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 bg-transparent border-0 border-b-2 border-[#F2E3D5] focus:outline-none focus:border-[#FF8080] text-[#F2E3D5]"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#F2E3D5] mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 bg-transparent border-0 border-b-2 border-[#F2E3D5] focus:outline-none focus:border-[#FF8080] text-[#F2E3D5]"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[#F2E3D5] mb-1">A Few Words</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleFormChange}
                rows={4}
                className="w-full px-3 py-2 bg-transparent border-0 border-b-2 border-[#F2E3D5] focus:outline-none focus:border-[#FF8080] text-[#F2E3D5]"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#FF8080] hover:bg-[#FFB868] text-white font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF8080]"
            >
              Send Message
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default LandingPage; 