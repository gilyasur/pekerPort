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
    thumbnail: 'For_Gilo/Footage/Latest TinyPNG/Film_Cover_v001.png',
    videoUrl: 'https://vimeo.com/1074932894',
    hoverUrl: 'For_Gilo/Footage/Latest TinyPNG/Film_Hover_v002.jpg'
  },
  {
    id: 2,
    title: 'VFX Games - The Art of Compositing',
    category: 'VFX Games - The Art of Compositing',
    thumbnail: 'For_Gilo/Footage/Latest TinyPNG/VFX_Cover_v001.png',
    videoUrl: 'https://vimeo.com/202516691',
    hoverUrl: 'For_Gilo/Footage/Latest TinyPNG/VFX_Hover_v002.jpg'
  },
  {
    id: 3,
    title: 'Lead_Reel_2025_v002',
    category: 'Lead_Reel_2025_v002',
    thumbnail: 'For_Gilo/Footage/Latest TinyPNG/Lead_Cover_v001.png',
    videoUrl: 'https://vimeo.com/1074936568',
    hoverUrl: 'For_Gilo/Footage/Latest TinyPNG/Lead_Hover_v002.jpg'
  },
  {
    id: 4,
    title: 'Adverts_Reel_2025_v004',
    category: 'Adverts_Reel_2025_v004',
    thumbnail: 'For_Gilo/Footage/Latest TinyPNG/Ads_Cover_v001.png',
    videoUrl: 'https://vimeo.com/1074932475',
    hoverUrl: 'For_Gilo/Footage/Latest TinyPNG/Ads_Hover_v002.jpg'
  },
  {
    id: 5,
    title: 'OnSet_Reel_2025_v001',
    category: 'OnSet_Reel_2025_v001',
    thumbnail: 'For_Gilo/Footage/Latest TinyPNG/Onset_Cover_v001.png',
    videoUrl: 'https://vimeo.com/1074933563',
    hoverUrl: 'For_Gilo/Footage/Latest TinyPNG/Onset_Hover_v002.jpg'
  },
  {
    id: 6,
    title: 'AI- Coming Soon',
    category: 'Ai - Coming Soon',
    thumbnail: 'For_Gilo/Footage/Latest TinyPNG/AI_Cover_v002.jpg',
    videoUrl: '', // Keep as empty string if no video available,
    hoverUrl: 'For_Gilo/Footage/Latest TinyPNG/AI_Hover_v002.jpg'
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
      // Preserve body scroll position before hiding
      // document.body.dataset.scrollLock = window.scrollY.toString();
      document.body.style.overflow = 'hidden';
      // document.body.style.position = 'fixed';
      // document.body.style.top = `-${document.body.dataset.scrollLock}px`;
      // document.body.style.width = '100%'; // Prevent layout shift from scrollbar disappearing

    } else {
      // Restore body scroll position
      // const scrollY = document.body.dataset.scrollLock ? parseInt(document.body.dataset.scrollLock, 10) : 0;
      document.body.style.overflow = 'unset';
      // document.body.style.position = '';
      // document.body.style.top = '';
      // document.body.style.width = '';
      // window.scrollTo(0, scrollY);
    }
    // Cleanup function runs on unmount or when isOpen changes
    return () => {
      document.body.style.overflow = 'unset';
      // document.body.style.position = '';
      // document.body.style.top = '';
      // document.body.style.width = '';
      // const scrollY = document.body.dataset.scrollLock ? parseInt(document.body.dataset.scrollLock, 10) : 0;
      // window.scrollTo(0, scrollY);
      // delete document.body.dataset.scrollLock;
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
          className="absolute top-3 right-12 text-white/80 hover:text-white transition-colors"
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
      // Preserve body scroll position before hiding
      // document.body.dataset.scrollLock = window.scrollY.toString();
      document.body.style.overflow = 'hidden';
      // document.body.style.position = 'fixed';
      // document.body.style.top = `-${document.body.dataset.scrollLock}px`;
      // document.body.style.width = '100%'; // Prevent layout shift from scrollbar disappearing

    } else {
      // Restore body scroll position
      // const scrollY = document.body.dataset.scrollLock ? parseInt(document.body.dataset.scrollLock, 10) : 0;
      document.body.style.overflow = 'unset';
      // document.body.style.position = '';
      // document.body.style.top = '';
      // document.body.style.width = '';
      // window.scrollTo(0, scrollY);
    }
    // Cleanup function runs on unmount or when isOpen changes
    return () => {
      document.body.style.overflow = 'unset';
      // document.body.style.position = '';
      // document.body.style.top = '';
      // document.body.style.width = '';
      // const scrollY = document.body.dataset.scrollLock ? parseInt(document.body.dataset.scrollLock, 10) : 0;
      // window.scrollTo(0, scrollY);
      // delete document.body.dataset.scrollLock;
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
          className="absolute top-3 right-12 text-white/80 hover:text-white transition-colors z-20"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
        // For mobile, keep the old behavior (embedding in the card)
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

    // Get environment variables from either Next.js or the runtime config
    const getEnv = (key: string, fallback: string = '') => {
      // Check if window.ENV exists (for drag-and-drop deployment)
      if (typeof window !== 'undefined' && window.ENV && window.ENV[key]) {
        return window.ENV[key];
      }
      // Otherwise use Next.js env vars
      return process.env[key] || fallback;
    };

    // Use environment variables for EmailJS credentials
    const serviceId = getEnv('NEXT_PUBLIC_EMAILJS_SERVICE_ID');
    const templateId = getEnv('NEXT_PUBLIC_EMAILJS_TEMPLATE_ID');
    const publicKey = getEnv('NEXT_PUBLIC_EMAILJS_PUBLIC_KEY');

    // Check if any credentials are missing
    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS configuration is incomplete');
      setSubmitStatus({
        success: false,
        message: 'Contact form is not properly configured. Please notify the site administrator.'
      });
      setIsSubmitting(false);
      return;
    }

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
    // Modified this line: Removed h-screen and overflow-hidden for mobile, keep for md+
    <div className={`md:h-screen md:overflow-hidden ${montserrat.className}`}>
      <div className="flex h-full flex-col md:flex-row">
        {/* Left side - Profile section */}
        {/* This section's height will now be determined by its content on mobile */}
        <div className="w-full md:w-[40%] bg-[#32506C] text-[#F2E3D5] relative flex flex-col p-8 md:p-8 lg:p-16">
          {/* Adjusted negative margin-top to control overall vertical position */}
          {/* This div's height will be based on its content now */}
          <div className="flex flex-col h-full justify-center -mt-0 md:-mt-0 lg:-mt-14 3xl:-mt-4">
            {/* Content container with proper spacing */}
            {/* Used space-y for gap between main sections (logo, intro, buttons, social) */}
            <div className="space-y-6 md:space-y-8 lg:space-y-4 3xl:space-y-2 pl-4 md:pl-6 lg:pl-8">
              {/* Logo */}
              {/* Adjusted negative margin-top to reduce pull-up effect */}
              <div className="relative w-[140%] h-[120px] md:h-[200px] lg:h-[200px] xl:h-[240px] 3xl:h-[300px] -mt-4 md:-mt-6 lg:-mt-8">
                <Image
                  src="/For_Gilo/Footage/Latest TinyPNG/Combine_v005_00080.png"
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
            {/* This absolute positioning might still cause issues if the left content is very tall on mobile.
                Consider placing it statically *after* the social links for a cleaner flow on mobile.
                For now, leaving it as is, but be aware. */}
             <div className="md:hidden mt-8 text-[#F2E3D5]/60 text-xs absolute bottom-4 left-8">
              © Roy Peker, 2025. All Rights Reserved
              
            </div>
          </div>
        </div>

        {/* Right side - Projects/Portfolio section (hidden on md and up) */}
        {/* Desktop view - This div now contributes to overall page height */}
        <div className="hidden md:block w-[60%] bg-[#F2E3D5] relative">
          {/* Inner container for spacing and centering content */}
          {/* No overflow style needed here, content pushes height */}
          <div className="w-full h-full flex items-center justify-center p-6 lg:p-8 xl:p-10 md:pt-6 lg:pt-20 xl:pt-20 3xl:pt-20">
          <div className="w-full max-w-5xl">
              {/* Two column grid for projects */}
              {/* No overflow style needed here, content pushes height */}
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
                        {/* Desktop uses modal, so embedded video here is not used */}
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
                              className="object-cover transition-opacity duration-500 group-hover:opacity-0"
                              unoptimized
                            />
                            {/* Hover image - visible only on hover */}
                            <Image
                              src={`/${project.hoverUrl}`}
                              alt={`${project.title} hover`}
                              fill
                              className="object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                              unoptimized
                            />
                            {/* Removed gradient overlay and play button */}
                            {/* Optional: Add a visual indicator if there's no video */}
                            {!project.videoUrl && (
                              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#32506C]/70 text-[#F2E3D5] text-2xl lg:text-4xl 3xl:text-5xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                <Image 
                                  src="/For_Gilo/Footage/Covers/Website_CoverTitles_2025_v002_00080.png" 
                                  alt="Coming Soon" 
                                  width={150}
                                  height={150}
                                  className="object-contain"
                                  unoptimized
                                />
                              </div>
                            )}
                          </button>
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
                         {/* Desktop uses modal, so embedded video here is not used */}
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
                              className="object-cover transition-opacity duration-500 group-hover:opacity-0"
                              unoptimized
                            />
                            {/* Hover image - visible only on hover */}
                            <Image
                              src={`/${project.hoverUrl}`}
                              alt={`${project.title} hover`}
                              fill
                              className="object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                              unoptimized
                            />
                            {/* Removed gradient overlay and play button */}
                            {/* Optional: Add a visual indicator if there's no video */}
                            {!project.videoUrl && (
                              <div className="absolute inset-0 flex flex-col items-center justify-center text-[#F2E3D5] text-2xl lg:text-4xl 3xl:text-5xl font-bold   z-10">
                                {/* <Image 
                                  src="/For_Gilo/Footage/Covers/Website_CoverTitles_2025_v002_00080.png" 
                                  alt="Coming Soon" 
                                  width={400}
                                  height={650}
                                  className="object-contain "
                                  unoptimized
                                /> */}
                              </div>
                            )}
                          </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Copyright */}
               {/* This div now simply appears after the grid */}
              <div className="mdlg:mt-10 xl:mt-12 3xl:mt-12 text-right text-[#32506C]/70 text-xs">
                © Roy Peker, 2025. All Rights Reserved
              </div>
            </div>
          </div>
        </div>

        {/* Mobile portfolio view (hidden on md and up) */}
        {/* Modified this line: Removed overflow-y-auto */}
        <div className="md:hidden w-full bg-[#F2E3D5] p-4">
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
                      className="absolute inset-0 w-full h-full p-0 border-0 bg-transparent cursor-pointer"
                       // Disable button if no video URL
                      disabled={!project.videoUrl}
                    >
                      {/* For mobile, always show the hover image by default */}
                      <Image
                        src={`/${project.hoverUrl}`}
                        alt={project.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                       {/* Removed gradient overlay */}
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