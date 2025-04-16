'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useSection } from '@/context/SectionContext';
import { FaLinkedin, FaImdb, FaVimeoV, FaYoutube, FaInstagram } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import { FaPlay } from 'react-icons/fa';
import { Montserrat } from 'next/font/google';
import { createPortal } from 'react-dom';
import emailjs from '@emailjs/browser';

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
    thumbnail: 'For_Gilo/Footage/Covers/VFX_Cover_v001.png',
    videoUrl: 'https://vimeo.com/1074932475'
  },
  {
    id: 3,
    title: 'VFX Integration',
    thumbnail: 'For_Gilo/Footage/Covers/Lead_Cover_v001.png',
    videoUrl: 'https://vimeo.com/202516691'
  },
  {
    id: 4,
    title: 'VFX Showreel 2',
    thumbnail: 'For_Gilo/Footage/Covers/Ads_Cover_v001.png',
    videoUrl: 'https://vimeo.com/1074933563'
  },
  {
    id: 5,
    title: 'Digital Composition 2',
    thumbnail: 'For_Gilo/Footage/Covers/Onset_Cover_v001.png',
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

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
    // Map the EmailJS field names to our state properties
    const fieldMapping: {[key: string]: string} = {
      'user_name': 'name',
      'user_email': 'email',
      'message': 'message'
    };
    
    const stateField = fieldMapping[name] || name;
    
    setFormData(prev => ({
      ...prev,
      [stateField]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    // Replace these with your actual EmailJS credentials
    const serviceId = 'service_958ibxe';
    const templateId = 'template_5gfc4zi';
    const publicKey = 'EMvss3sajXe2nwsjP';
    
    // First try with form
    if (formRef.current) {
      emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
        .then((result) => {
          console.log('Email sent successfully:', result.text);
          handleEmailSuccess();
        })
        .catch((error) => {
          console.error('Failed to send email with form method, trying direct method:', error.text);
          
          // If form method fails, try direct method
          emailjs.send(serviceId, templateId, {
            user_name: formData.name,
            user_email: formData.email,
            message: formData.message
          }, publicKey)
            .then((result) => {
              console.log('Email sent successfully with direct method:', result.text);
              handleEmailSuccess();
            })
            .catch((directError) => {
              console.error('Failed to send email with direct method:', directError.text);
              handleEmailError(directError.text);
            });
        });
    } else {
      // Fallback to direct method if form ref is not available
      emailjs.send(serviceId, templateId, {
        user_name: formData.name,
        user_email: formData.email,
        message: formData.message
      }, publicKey)
        .then((result) => {
          console.log('Email sent successfully with direct method:', result.text);
          handleEmailSuccess();
        })
        .catch((error) => {
          console.error('Failed to send email with direct method:', error.text);
          handleEmailError(error.text);
        });
    }
  };
  
  // Helper functions to avoid code duplication
  const handleEmailSuccess = () => {
    setSubmitStatus({
      success: true,
      message: 'Message sent successfully! I will get back to you soon.'
    });
    setFormData({
      name: '',
      email: '',
      message: ''
    });
    // Close modal after 3 seconds of showing success message
    setTimeout(() => {
      setShowContactModal(false);
      setSubmitStatus(null);
    }, 3000);
    setIsSubmitting(false);
  };
  
  const handleEmailError = (errorText: string) => {
    setSubmitStatus({
      success: false,
      message: 'Failed to send message. Please try again later.'
    });
    setIsSubmitting(false);
  };

  return (
    <div className={`min-h-screen flex flex-col md:flex-row ${montserrat.className}`}>
      {/* Left side - Dark blue background */}
      <div className="w-full md:w-[40%] bg-[#32506C] flex flex-col p-1 md:p-2">
        <div className="w-full flex flex-col h-full p-1 md:p-2 items-start" style={{paddingRight: 0, gap: '4px', marginTop: '20px'}}>
          {/* Logo and Name - Aligned to the left at top */}
          <div className="flex items-center m-0 p-0 mb-1 w-full pr-4 md:pr-8">
            <div className="relative w-[320px] xs:w-[360px] sm:w-[400px] md:w-[420px] lg:w-[520px] xl:w-[600px] h-[120px] xs:h-[130px] sm:h-[140px] md:h-[150px] lg:h-[180px] xl:h-[210px] flex-shrink-0 p-0 m-0">
              <Image
                src="/For_Gilo/Footage/Logo/Combine_v002_00080.png"
                alt="Roy Peker Logo and Name"
                fill
                className="object-contain object-left"
                priority
                unoptimized
              />
            </div>
          </div>

          {/* Greeting header */}
          <div className="mb-2 pl-4 sm:pl-8 md:pl-10">
            <h1 className="text-[#F2E3D5] text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">Hi! I'm Roy!</h1>
          </div>

          {/* Description text */}
          <div className="mb-3 pl-4 sm:pl-8 md:pl-10 pr-2 md:pr-4">
            <p className="text-[#F2E3D5]/90 max-w-lg text-sm sm:text-base leading-tight sm:leading-relaxed">
              <strong className="block mb-1">Feel free to check out my work! Do you have a project in mind that needs help in telling the story using VFX?</strong>
              <span className="block mt-1 sm:mt-3">Do not hesitate to reach out to me. I am always keen to hear regarding new & exciting projects to get involved with!</span>
            </p>
          </div>

          {/* Buttons */}
          <div className="flex justify-start gap-2 md:gap-4 mt-2 mb-0 pl-4 sm:pl-8 md:pl-10" style={{width: '300px'}}>
            <a 
              href="/projects/pdf/next.pdf" 
              className="bg-[#FF8080] text-white px-2 py-0.5 sm:py-1 md:px-3 md:py-1 rounded-full hover:bg-[#FFB868]/90 transition-colors text-sm sm:text-base"
              download="Roy_Peker_CV.pdf"
            >
              Download CV
            </a>
            <button 
              onClick={handleOpenModal}
              className="bg-[#FF8080] text-white px-2 py-0.5 sm:py-1 md:px-3 md:py-1 rounded-full hover:bg-[#FFB868]/90 transition-colors text-sm sm:text-base"
            >
              Say hello
            </button>
          </div>

          {/* Social Links */}
          <div className="mt-0 pl-4 sm:pl-8 md:pl-10" style={{width: '300px'}}>
            <div className="flex justify-start gap-2 sm:gap-3.5 w-full">
              {socialLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] md:w-[28px] md:h-[28px] flex items-center justify-center rounded-full bg-[#32506C] text-[#f2e3d5] hover:text-[#ffb868] transition-colors"
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
      <div className="w-full md:w-[60%] bg-[#F2E3D5] p-0 flex flex-col">
        <div className="w-full h-full flex flex-col p-0 items-center">
          <div className="flex w-full max-w-4xl px-4 sm:px-8 mx-0 space-x-2 sm:space-x-3 justify-center" style={{ paddingTop: '40px', paddingBottom: '20px' }}>
            <div className="flex flex-col items-end w-1/2 p-0">
              {projects.slice(0, 3).map((project) => (
                <motion.div
                  key={project.id}
                  whileHover={{}}
                  className="overflow-hidden rounded-lg shadow-sm mb-1 w-[80%] max-w-xs"
                  style={{ width: 'calc(80% - 4px)', maxWidth: '280px' }}
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
                  className="overflow-hidden rounded-lg shadow-sm mb-1 w-[80%] max-w-xs"
                  style={{ width: 'calc(80% - 4px)', maxWidth: '280px' }}
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
              
              {/* Copyright line - aligned with right column */}
              <div className="w-[80%] mt-4 sm:mt-8 mb-1 sm:mb-2 text-right text-[#345a7c]/80 text-[8px] sm:text-[10px] md:text-xs whitespace-nowrap overflow-hidden">
                Designed by Roy Peker © 2025. All Rights Reserved
              </div>
            </div>
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
          
          {submitStatus && (
            <div className={`p-3 mb-4 rounded-md ${submitStatus.success ? 'bg-green-500/20 text-green-100' : 'bg-red-500/20 text-red-100'}`}>
              {submitStatus.message}
            </div>
          )}
          
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div className="form-row">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#F2E3D5] mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="user_name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 bg-transparent border-0 border-b-2 border-[#F2E3D5] focus:outline-none focus:border-[#FF8080] text-[#F2E3D5]"
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#F2E3D5] mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="user_email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 bg-transparent border-0 border-b-2 border-[#F2E3D5] focus:outline-none focus:border-[#FF8080] text-[#F2E3D5]"
                  required
                  disabled={isSubmitting}
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
                disabled={isSubmitting}
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#FF8080] hover:bg-[#FFB868] text-white font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF8080] disabled:opacity-50 disabled:cursor-not-allowed"
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

export default LandingPage; 