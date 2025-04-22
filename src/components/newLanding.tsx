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
    title: 'Film_Reel_2025_v007',
    category: 'Film_Reel_2025_v007',
    thumbnail: 'For_Gilo/Footage/Covers/Film_Cover_v001.png',
    videoUrl: 'https://vimeo.com/1074932894'
  },
  {
    id: 2,
    title: 'VFX Games - The Art of Compositing',
    category: 'VFX Games - The Art of Compositing',
    thumbnail: 'For_Gilo/Footage/Covers/VFX_Cover_v001.png',
    videoUrl: 'https://vimeo.com/202516691'
  },
  {
    id: 3,
    title: 'Lead_Reel_2025_v002',
    category: 'Lead_Reel_2025_v002',
    thumbnail: 'For_Gilo/Footage/Covers/Lead_Cover_v001.png',
    videoUrl: 'https://vimeo.com/1074936568'
  },
  {
    id: 4,
    title: 'Adverts_Reel_2025_v004',
    category: 'Adverts_Reel_2025_v004',
    thumbnail: 'For_Gilo/Footage/Covers/Ads_Cover_v001.png',
    videoUrl: 'https://vimeo.com/1074932475'
  },
  {
    id: 5,
    title: 'OnSet_Reel_2025_v001',
    category: 'OnSet_Reel_2025_v001',
    thumbnail: 'For_Gilo/Footage/Covers/Onset_Cover_v001.png',
    videoUrl: 'https://vimeo.com/1074933563'
  },
  {
    id: 6,
    title: 'AI- Coming Soon',
    category: 'Ai - Coming Soon',
    thumbnail: 'For_Gilo/Footage/Covers/AI_Cover_v001.jpg',
    videoUrl: '' // Keep as empty string if no video available
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
      {/* This is the overlay - kept at 70% opacity as requested */}
      <div className="absolute inset-0 bg-black bg-opacity-70" onClick={onClose}></div>
      {/* This is the modal content box - opacity changed to 80% */}
      <div
        className="relative bg-[#355c7d]/80 backdrop-blur-md rounded-xl p-6 w-full max-w-lg mx-4 shadow-2xl z-10 text-[#F2E3D5]" // Changed /95 to /80 here
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

// Video Modal Component for desktop view
const VideoModal = ({ isOpen, onClose, videoId }: { isOpen: boolean; onClose: () => void; videoId: string | null }) => {
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

  if (!isOpen || !videoId) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* This is the overlay - kept at 70% opacity as requested */}
      <div className="absolute inset-0 bg-black bg-opacity-70" onClick={onClose}></div>
      {/* This is the modal content box - sized to maintain 16:9 aspect ratio */}
      <div
        className="relative bg-transparent backdrop-blur-md rounded-xl w-[90%] max-w-[1600px] mx-auto shadow-2xl z-10 p-0 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-20"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {/* 16:9 aspect ratio container - no padding/margins */}
        <div className="aspect-video w-full overflow-hidden">
          <iframe
            src={`https://player.vimeo.com/video/${videoId}?h=0&title=0&byline=0&portrait=0&autoplay=1`}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0 outline-none" 
            title="Video Player"
            style={{ border: 'none', display: 'block' }}
          ></iframe>
        </div>
      </div>
    </div>,
    document.body
  );
};

const NewLanding = () => {
  // State management
  const [activeSlide, setActiveSlide] = useState(0); // Note: This state seems unused in the current visible structure
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
  // New state for the video modal
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Check for browser environment
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  // Function to handle video clicks
  const handleVideoClick = (id: number) => {
     // Only try to play if there's a video URL
    const project = projects.find(p => p.id === id);
    if (project && project.videoUrl) {
      // For desktop, open the modal
      if (window.innerWidth >= 768) { // md breakpoint is 768px
        const videoId = project.videoUrl.split('/').pop() || null;
        setCurrentVideoId(videoId);
        setVideoModalOpen(true);
      } else {
        // For mobile, keep the old behavior
        if (activeVideo === id) {
          setActiveVideo(null);
        } else {
          setActiveVideo(id);
        }
      }
    } else if (activeVideo !== null) {
        // If clicking an item with no video while another is playing, close the active one
        setActiveVideo(null);
    }
    // If clicking an item with no video and nothing is playing, do nothing
  };

  // Close video modal
  const handleCloseVideoModal = () => {
    setVideoModalOpen(false);
    setCurrentVideoId(null);
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
    // Ensure these are securely handled, e.g., via environment variables in a real app
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
          // Keep modal open briefly to show success message, then close
          setTimeout(() => {
            setShowContactModal(false);
            setSubmitStatus(null); // Clear status after modal closes
          }, 3000); // Close after 3 seconds
          setIsSubmitting(false);
        })
        .catch((error) => {
          console.error('EmailJS Error:', error); // Log error for debugging
          setSubmitStatus({
            success: false,
            message: 'Failed to send message. Please try again later.'
          });
          // Keep modal open to show error message until user closes
          setIsSubmitting(false);
        });
    }
  };

  // Slide navigation (Note: This is for the mobile portfolio section,
  // but the mobile section currently just lists projects vertically,
  // so these functions are not used in the current layout).
  const nextSlide = () => {
    // This logic would be used if you had a carousel for mobile
    // setActiveSlide((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
     // This logic would be used if you had a carousel for mobile
    // setActiveSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <div className={`h-screen overflow-hidden ${montserrat.className}`}>
      <div className="flex h-full flex-col md:flex-row">
        {/* Left side - Profile section */}
        <div className="w-full md:w-[40%] bg-[#32506C] text-[#F2E3D5] relative flex flex-col p-8 md:p-8 lg:p-16">
          {/* Adjusted negative margin-top to control overall vertical position */}
          <div className="flex flex-col h-full justify-center -mt-0 md:-mt-0 lg:-mt-14 3xl:-mt-4">
            {/* Content container with proper spacing */}
            {/* Used space-y for gap between main sections (logo, intro, buttons, social) */}
            <div className="space-y-6 md:space-y-8 lg:space-y-4 3xl:space-y-2 pl-4 md:pl-6 lg:pl-8">
              {/* Logo */}
              {/* Adjusted negative margin-top to reduce pull-up effect */}
              <div className="relative w-[140%] h-[120px] md:h-[200px] lg:h-[200px] xl:h-[240px] 3xl:h-[300px] -mt-4 md:-mt-6 lg:-mt-8">
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
              {/* Gap above this is controlled by space-y on the parent */}
              <div className="space-y-3 md:space-y-8 3xl:space-y-8 pl-4 md:pl-6 lg:pl-8 3xl:pl-14 ">
                <h1 className="text-3xl md:text-4xl lg:text-5xl 3xl:text-6xl font-bold " >Hi! I'm Roy!</h1>
                <div className="text-[#F2E3D5]/90 text-base md:text-lg max-w-md space-y-8">
                  <p className="font-bold">Feel free to check out my work! Do you have a project in mind that needs help in telling the story using VFX?</p>
                  <p>Do not hesitate to reach out to me. I am always keen to hear regarding new & exciting projects to get involved with!</p>
                </div>
              </div>

              {/* Call to action buttons */}
              {/* Used pt- classes to add space above buttons */}
              <div className="flex space-x-4 pl-4 md:pl-6 lg:pl-8 3xl:pl-14 md:pt-8 lg:pt-12 xl:pt-16 3xl:pt-44">
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
              <div className="flex space-x-5 pl-4 md:pl-6 lg:pl-8 3xl:pl-14">
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
            {/* Note: This copyright is positioned absolutely, which can sometimes
                 conflict with flex/grid layouts. It might be better placed
                 statically in the mobile portfolio section instead. */}
            <div className="md:hidden mt-8 text-[#F2E3D5]/60 text-xs absolute bottom-4 left-8">
              © Roy Peker, 2025. All Rights Reserved
            </div>
          </div>
        </div>

        {/* Right side - Projects/Portfolio section (hidden on md and up) */}
        {/* NOTE: This div has hidden md:block, which means it's hidden on SMALLER screens */}
        {/* and displayed as block on md and UP. The MOBILE section below it is hidden on md and UP.
             This seems correct for showing the grid on desktop and list on mobile. */}
        <div className="hidden md:block w-[60%] bg-[#F2E3D5] relative">
          <div className="w-full h-full flex items-center justify-center p-6 lg:p-8 xl:p-10 md:pt-6 lg:pt-20 xl:pt-20 3xl:pt-20">
          <div className="w-full max-w-5xl">
              {/* Two column grid for projects */}
              <div className="grid grid-cols-2 gap-4 lg:gap-5 xl:gap-6">
                {/* Left column projects */}
                <div className="flex flex-col items-center justify-center space-y-4 lg:space-y-5 xl:space-y-6">
                  {projects.slice(0, 3).map((project) => (
                    <motion.div
                      key={project.id}
                      // Removed whileHover scale effect
                      transition={{ duration: 0.3 }}
                      className="relative rounded-lg overflow-hidden shadow-lg w-full"
                    >
                      <div className="relative aspect-video">
                        {activeVideo === project.id && project.videoUrl ? (
                          <iframe
                          // Added &muted=1 to the src URL
                          src={`https://player.vimeo.com/video/${project.videoUrl.split('/').pop()}?h=0&title=0&byline=0&portrait=0&autoplay=1`}
                          allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                            className="absolute top-0 left-0 w-full h-full border-0"
                            title={project.title}
                          ></iframe>
                        ) : (
                          // Render button/image if no active video or no video URL for this project
                          <button
                            onClick={() => handleVideoClick(project.id)}
                            // Kept group class if needed, but removed hover effects relying on it
                            className="absolute inset-0 w-full h-full p-0 border-0 bg-transparent cursor-pointer group"
                            // Disable button if no video URL
                            disabled={!project.videoUrl}
                          >
                            <Image
                              src={`/${project.thumbnail}`}
                              alt={project.title}
                              fill
                              // Removed group-hover:scale-105 class
                              className="object-cover transition-transform duration-500"
                              unoptimized
                            />
                            {/* Gradient Overlay - Removed hover opacity effect */}
                            {/* Opacity-0 means it's permanently hidden in this desktop view based on the original code */}
                            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0">
                               <div className="p-4">
                                 {/* Content here */}
                               </div>
                            </div>
                            {/* Optional: Add a visual indicator if there's no video */}
                            {!project.videoUrl && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-[#F2E3D5] text-2xl lg:text-4xl 3xl:text-5xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="text-white font-bold">Coming Soon</span>
                              </div>
                            )}
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Right column projects */}
                <div className="flex flex-col items-center justify-center space-y-4 lg:space-y-5 xl:space-y-6">
                  {projects.slice(3, 6).map((project) => (
                    <motion.div
                      key={project.id}
                       // Removed whileHover scale effect
                      transition={{ duration: 0.3 }}
                      className="relative rounded-lg overflow-hidden shadow-lg w-full"
                    >
                      <div className="relative aspect-video">
                         {activeVideo === project.id && project.videoUrl ? (
                          <iframe
                          // Added &muted=1 to the src URL
                          src={`https://player.vimeo.com/video/${project.videoUrl.split('/').pop()}?h=0&title=0&byline=0&portrait=0&autoplay=1`}
                          allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                            className="absolute top-0 left-0 w-full h-full border-0"
                            title={project.title}
                          ></iframe>
                        ) : (
                          // Render button/image if no active video or no video URL for this project
                          <button
                            onClick={() => handleVideoClick(project.id)}
                             // Kept group class if needed, but removed hover effects relying on it
                            className="absolute inset-0 w-full h-full p-0 border-0 bg-transparent cursor-pointer group"
                             // Disable button if no video URL
                            disabled={!project.videoUrl}
                          >
                            <Image
                              src={`/${project.thumbnail}`}
                              alt={project.title}
                              fill
                              // Removed group-hover:scale-105 class
                              className="object-cover transition-transform duration-500"
                              unoptimized
                            />
                            {/* Gradient Overlay - Removed hover opacity effect */}
                             {/* Opacity-0 means it's permanently hidden in this desktop view based on the original code */}
                            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0">
                               <div className="p-4">
                                 {/* Content here */}
                               </div>
                            </div>
                            {/* Optional: Add a visual indicator if there's no video */}
                            {!project.videoUrl && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-[#F2E3D5] text-2xl lg:text-4xl 3xl:text-5xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="text-white font-bold">Coming Soon</span>
                              </div>
                            )}
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Copyright */}
              <div className="mdlg:mt-16 xl:mt-16 3xl:mt-16 text-right text-[#32506C]/70 text-xs">
                © Roy Peker, 2025. All Rights Reserved
              </div>
            </div>
          </div>
        </div>

        {/* Mobile portfolio view (hidden on md and up) */}
        <div className="md:hidden w-full bg-[#F2E3D5] p-4 overflow-y-auto">
          <div className="space-y-4">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                // Removed whileHover scale effect from mobile items
                // whileHover={{ scale: 1.02 }}
                className="relative rounded-lg overflow-hidden shadow-md"
              >
                <div className="relative aspect-video">
                  {activeVideo === project.id && project.videoUrl ? (
                    <iframe
                       // Added &muted=1 to the src URL
                      src={`https://player.vimeo.com/video/${project.videoUrl.split('/').pop()}?h=0&title=0&byline=0&portrait=0&autoplay=1`}
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      className="absolute top-0 left-0 w-full h-full border-0"
                      title={project.title}
                    ></iframe>
                  ) : (
                    // Render button/image if no active video or no video URL for this project
                    <button
                      onClick={() => handleVideoClick(project.id)}
                      // For mobile we'll keep it visible all the time as hover doesn't work well on mobile
                      className="absolute inset-0 w-full h-full p-0 border-0 bg-transparent cursor-pointer group"
                       // Disable button if no video URL
                      disabled={!project.videoUrl}
                    >
                      <Image
                        src={`/${project.thumbnail}`}
                        alt={project.title}
                        fill
                        // Removed group-hover:scale-105 class from mobile items
                        className="object-cover transition-transform duration-300"
                        unoptimized
                      />
                       {/* Gradient overlay for mobile - no opacity control classes needed as per original code */}
                      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                        <div className="p-4">
                           {/* Keep category and title visible on mobile thumbnail */}
                          <span className="inline-block px-2 py-1 mb-1 bg-[#FF8080] text-white text-xs rounded-full">
                            {project.category}
                          </span>
                          <h3 className="text-white text-lg font-bold">
                            {project.title}
                          </h3>
                        </div>
                      </div>
                       {/* Optional: Add a visual indicator if there's no video */}
                        {!project.videoUrl && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-[#F2E3D5] text-2xl lg:text-4xl 3xl:text-5xl font-bold">
                                <span className="text-white font-bold">Coming Soon</span>
                            </div>
                        )}
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
             {/* Copyright mobile view - moved below the projects */}
            <div className="mt-6 text-center text-[#32506C]/70 text-xs">
              © Roy Peker, 2025. All Rights Reserved
            </div>
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

      {/* Video Modal - only for desktop */}
      {isBrowser && (
        <VideoModal 
          isOpen={videoModalOpen} 
          onClose={handleCloseVideoModal} 
          videoId={currentVideoId} 
        />
      )}
      
    </div>
  );
};

export default NewLanding;