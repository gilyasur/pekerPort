'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaLinkedin, FaImdb, FaVimeoV, FaYoutube, FaInstagram } from 'react-icons/fa';
import { Montserrat } from 'next/font/google';
import { createPortal } from 'react-dom';
import emailjs from '@emailjs/browser';

const montserrat = Montserrat({ subsets: ['latin'] });

// Social links from original component
const socialLinks = [
  {
    title: 'LinkedIn',
    url: 'https://www.linkedin.com/in/roypeker/',
    icon: <FaLinkedin className="w-5 h-5" />
  },
  {
    title: 'IMDb',
    url: 'https://www.imdb.com/name/nm6738899/?ref_=nv_sr_1',
    icon: <FaImdb className="w-5 h-5" />
  },
  {
    title: 'Vimeo',
    url: 'https://vimeo.com/roypeker',
    icon: <FaVimeoV className="w-5 h-5" />
  },
  {
    title: 'YouTube',
    url: 'https://www.youtube.com/channel/UCHjdQOEuDRcT-uKj2OKRr0A',
    icon: <FaYoutube className="w-5 h-5" />
  },
  {
    title: 'Instagram',
    url: 'https://www.instagram.com/roy.peker/',
    icon: <FaInstagram className="w-5 h-5" />
  }
];

// Projects from original component
const projects = [
  {
    id: 1,
    title: 'VFX Showreel',
    category: 'VFX',
    thumbnail: 'For_Gilo/Footage/Covers/Film_Cover_v001.png',
    videoUrl: 'https://vimeo.com/1074932894'
  },
  {
    id: 2,
    title: 'Digital Composition',
    category: 'Composition',
    thumbnail: 'For_Gilo/Footage/Covers/VFX_Cover_v001.png',
    videoUrl: 'https://vimeo.com/1074932475'
  },
  {
    id: 3,
    title: 'VFX Integration',
    category: 'Integration',
    thumbnail: 'For_Gilo/Footage/Covers/Lead_Cover_v001.png',
    videoUrl: 'https://vimeo.com/202516691'
  },
  {
    id: 4,
    title: 'VFX Showreel 2',
    category: 'VFX',
    thumbnail: 'For_Gilo/Footage/Covers/Ads_Cover_v001.png',
    videoUrl: 'https://vimeo.com/1074933563'
  },
  {
    id: 5,
    title: 'Digital Composition 2',
    category: 'Composition',
    thumbnail: 'For_Gilo/Footage/Covers/Onset_Cover_v001.png',
    videoUrl: 'https://vimeo.com/1074936568'
  },
  {
    id: 6,
    title: 'VFX Integration 2',
    category: 'Integration',
    thumbnail: 'For_Gilo/Footage/Covers/AI_Cover_v001.jpg',
    videoUrl: 'https://vimeo.com/202516691'
  }
];

// Modal Component for contact form
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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-70" onClick={onClose}></div>
      <div 
        className="relative bg-[#355c7d]/95 backdrop-blur-md rounded-xl p-6 w-full max-w-lg mx-4 shadow-2xl z-10 text-[#F2E3D5]"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

const NewLanding = () => {
  // State management
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Check for browser environment
  useEffect(() => {
    setIsBrowser(true);
  }, []);
  
  // Function to handle video clicks
  const handleVideoClick = (id: number) => {
    setActiveVideo(activeVideo === id ? null : id);
  };

  // Modal handlers
  const handleOpenModal = () => setShowContactModal(true);
  const handleCloseModal = () => setShowContactModal(false);
  
  // Form handlers
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const fieldMapping: {[key: string]: string} = {
      'user_name': 'name',
      'user_email': 'email',
      'message': 'message'
    };
    
    const stateField = fieldMapping[name] || name;
    setFormData(prev => ({ ...prev, [stateField]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    // Replace with your actual EmailJS credentials
    const serviceId = 'service_958ibxe';
    const templateId = 'template_5gfc4zi';
    const publicKey = 'EMvss3sajXe2nwsjP';
    
    if (formRef.current) {
      emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
        .then((result) => {
          setSubmitStatus({
            success: true,
            message: 'Message sent successfully! I will get back to you soon.'
          });
          setFormData({ name: '', email: '', message: '' });
          setTimeout(() => {
            setShowContactModal(false);
            setSubmitStatus(null);
          }, 3000);
          setIsSubmitting(false);
        })
        .catch((error) => {
          setSubmitStatus({
            success: false,
            message: 'Failed to send message. Please try again later.'
          });
          setIsSubmitting(false);
        });
    }
  };

  // Slide navigation
  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <div className={`h-screen overflow-hidden ${montserrat.className}`}>
      <div className="flex h-full flex-col md:flex-row">
        {/* Left side - Profile section */}
        <div className="w-full md:w-[45%] bg-[#32506C] text-[#F2E3D5] relative flex flex-col p-8 md:p-8 lg:p-16">
          <div className="flex flex-col h-full justify-center -mt-6">
            {/* Content container with proper spacing */}
            <div className="space-y-6 md:space-y-8 lg:space-y-10 pl-4 md:pl-6 lg:pl-8">
              {/* Logo */}
              <div className="relative w-[140%] h-[120px] md:h-[200px] lg:h-[200px] xl:h-[240px] -mt-8 md:-mt-10 lg:-mt-12">
                <Image
                  src="/For_Gilo/Footage/Logo/Combine_v003_00080.png"
                  alt="Roy Peker Logo"
                  fill
                  className="object-contain object-left"
                  priority
                  unoptimized
                />
              </div>
              
              {/* Intro text */}
              <div className="space-y-3 md:space-y-4 pl-4 md:pl-6 lg:pl-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Hi! I'm Roy!</h1>
                <div className="text-[#F2E3D5]/90 text-base md:text-lg max-w-md space-y-4">
                  <p className="font-bold">Feel free to check out my work! Do you have a project in mind that needs help in telling the story using VFX?</p>
                  <p>Do not hesitate to reach out to me. I am always keen to hear regarding new & exciting projects to get involved with!</p>
                </div>
              </div>
              
              {/* Call to action buttons */}
              <div className="flex space-x-4 pl-4 md:pl-6 lg:pl-8">
                <a
                  href="/projects/pdf/next.pdf"
                  className="bg-[#FF8080] hover:bg-[#FFB868] transition-colors duration-300 text-white px-6 py-3 rounded-full font-medium"
                  download="Roy_Peker_CV.pdf"
                >
                  Download CV
                </a>
                <button
                  onClick={handleOpenModal}
                  className="bg-[#FF8080] hover:bg-[#FFB868] transition-colors duration-300 text-white px-6 py-3 rounded-full font-medium"
                >
                  Say Hello
                </button>
              </div>
              
              {/* Social links moved into main content area */}
              <div className="flex space-x-5 pl-4 md:pl-6 lg:pl-8">
                {socialLinks.map((link) => (
                  <a
                    key={link.title}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={link.title}
                    className="text-[#F2E3D5] hover:text-[#FFB868] transition-colors duration-300"
                  >
                    {React.cloneElement(link.icon, {
                      className: "w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"
                    })}
                  </a>
                ))}
              </div> 
            </div>
            
            {/* Copyright mobile only at the bottom of screen */}
            <div className="md:hidden mt-8 text-[#F2E3D5]/60 text-xs absolute bottom-4 left-8">
              © Roy Peker, 2025. All Rights Reserved
            </div>
          </div>
        </div>
        
        {/* Right side - Projects/Portfolio section */}
        <div className="hidden md:block w-[55%] bg-[#F2E3D5] relative">
          <div className="w-full h-full flex items-center justify-center p-6 lg:p-8 xl:p-10">
            <div className="w-full max-w-4xl">
              {/* Two column grid for projects */}
              <div className="grid grid-cols-2 gap-4 lg:gap-5 xl:gap-6">
                {/* Left column projects - Updated to center content */}
                <div className="flex flex-col items-center justify-center space-y-4 lg:space-y-5 xl:space-y-6">
                  {projects.slice(0, 3).map((project) => (
                    <motion.div
                      key={project.id}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="relative rounded-lg overflow-hidden shadow-lg w-full"
                    >
                      <div className="relative aspect-video">
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
                            className="absolute inset-0 w-full h-full p-0 border-0 bg-transparent cursor-pointer group"
                          >
                            <Image
                              src={`/${project.thumbnail}`}
                              alt={project.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              unoptimized
                            />
                            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="p-4">
                                <span className="inline-block px-2 py-1 mb-1 bg-[#FF8080] text-white text-xs rounded-full">
                                  {project.category}
                                </span>
                                <h3 className="text-white text-base md:text-lg font-bold">
                                  {project.title}
                                </h3>
                              </div>
                            </div>
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Right column projects - Also ensure centered */}
                <div className="flex flex-col items-center justify-center space-y-4 lg:space-y-5 xl:space-y-6">
                  {projects.slice(3, 6).map((project) => (
                    <motion.div
                      key={project.id}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="relative rounded-lg overflow-hidden shadow-lg w-full"
                    >
                      <div className="relative aspect-video">
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
                            className="absolute inset-0 w-full h-full p-0 border-0 bg-transparent cursor-pointer group"
                          >
                            <Image
                              src={`/${project.thumbnail}`}
                              alt={project.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              unoptimized
                            />
                            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="p-4">
                                <span className="inline-block px-2 py-1 mb-1 bg-[#FF8080] text-white text-xs rounded-full">
                                  {project.category}
                                </span>
                                <h3 className="text-white text-base md:text-lg font-bold">
                                  {project.title}
                                </h3>
                              </div>
                            </div>
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Copyright */}
              <div className="mt-6 text-right text-[#32506C]/70 text-xs">
                © Roy Peker, 2025. All Rights Reserved
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile portfolio view */}
        <div className="md:hidden w-full bg-[#F2E3D5] p-4 overflow-y-auto">
          <div className="space-y-4">
            {projects.map((project) => (
              <motion.div 
                key={project.id}
                whileHover={{ scale: 1.02 }}
                className="relative rounded-lg overflow-hidden shadow-md"
              >
                <div className="relative aspect-video">
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
                      className="absolute inset-0 w-full h-full p-0 border-0 bg-transparent cursor-pointer group"
                    >
                      <Image
                        src={`/${project.thumbnail}`}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        unoptimized
                      />
                      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                        <div className="p-4">
                          <span className="inline-block px-2 py-1 mb-1 bg-[#FF8080] text-white text-xs rounded-full">
                            {project.category}
                          </span>
                          <h3 className="text-white text-lg font-bold">
                            {project.title}
                          </h3>
                        </div>
                      </div>
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Contact Form Modal */}
      {isBrowser && (
        <Modal isOpen={showContactModal} onClose={handleCloseModal}>
          <h2 className="text-2xl font-bold mb-6 text-[#F2E3D5]">Let's Talk</h2>
          
          {submitStatus && (
            <div className={`p-4 mb-6 rounded-md ${
              submitStatus.success 
                ? 'bg-green-500/20 text-green-100' 
                : 'bg-red-500/20 text-red-100'
            }`}>
              {submitStatus.message}
            </div>
          )}
          
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1 text-[#F2E3D5]">Name</label>
                <input
                  type="text"
                  id="name"
                  name="user_name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full bg-white/10 border-0 border-b-2 border-[#F2E3D5] px-3 py-2 focus:outline-none focus:border-[#FF8080] text-[#F2E3D5] placeholder-[#F2E3D5]/50 rounded-sm"
                  required
                  disabled={isSubmitting}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1 text-[#F2E3D5]">Email</label>
                <input
                  type="email"
                  id="email"
                  name="user_email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="w-full bg-white/10 border-0 border-b-2 border-[#F2E3D5] px-3 py-2 focus:outline-none focus:border-[#FF8080] text-[#F2E3D5] placeholder-[#F2E3D5]/50 rounded-sm"
                  required
                  disabled={isSubmitting}
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1 text-[#F2E3D5]">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleFormChange}
                rows={4}
                className="w-full bg-white/10 border-0 border-b-2 border-[#F2E3D5] px-3 py-2 focus:outline-none focus:border-[#FF8080] text-[#F2E3D5] placeholder-[#F2E3D5]/50 rounded-sm resize-none"
                required
                disabled={isSubmitting}
                placeholder="Tell me about your project..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#FF8080] hover:bg-[#FFB868] text-white font-medium py-3 px-4 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default NewLanding;
