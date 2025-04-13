'use client';

import { FaLinkedin, FaImdb, FaVimeoV, FaYoutube, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full bg-[#32506C] backdrop-blur-sm border-t border-gray-200/20 py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="text-sm text-[#f2e3d5]">
            © {new Date().getFullYear()} Roy Peker. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <a 
              href="https://www.linkedin.com/in/roypeker/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-[30px] h-[30px] flex items-center justify-center rounded-full bg-[#32506c] text-[#f2e3d5] hover:text-[#ffb868] transition-colors"
              title="LinkedIn"
            >
              <FaLinkedin size={16} />
            </a>
            <a 
              href="https://www.imdb.com/name/nm6738899/?ref_=nv_sr_1" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-[30px] h-[30px] flex items-center justify-center rounded-full bg-[#32506c] text-[#f2e3d5] hover:text-[#ffb868] transition-colors"
              title="IMDb"
            >
              <FaImdb size={16} />
            </a>
            <a 
              href="https://vimeo.com/roypeker" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-[30px] h-[30px] flex items-center justify-center rounded-full bg-[#32506c] text-[#f2e3d5] hover:text-[#ffb868] transition-colors"
              title="Vimeo"
            >
              <FaVimeoV size={16} />
            </a>
            <a 
              href="https://www.youtube.com/channel/UCHjdQOEuDRcT-uKj2OKRr0A" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-[30px] h-[30px] flex items-center justify-center rounded-full bg-[#32506c] text-[#f2e3d5] hover:text-[#ffb868] transition-colors"
              title="YouTube"
            >
              <FaYoutube size={16} />
            </a>
            <a 
              href="https://www.instagram.com/roy.peker/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-[30px] h-[30px] flex items-center justify-center rounded-full bg-[#32506c] text-[#f2e3d5] hover:text-[#ffb868] transition-colors"
              title="Instagram"
            >
              <FaInstagram size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 