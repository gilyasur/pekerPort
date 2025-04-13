'use client';

import { motion } from 'framer-motion';
import { useSection } from '@/context/SectionContext';
import Image from 'next/image';

const projects = [
  {
    id: 1,
    title: 'VFX Showreel',
    description: 'Visual effects and compositing work showcase',
    videoUrl: 'https://player.vimeo.com/video/292516098',
    thumbnail: '/For_Gilo/Footage/Covers/Film_Cover_v001.png'
  },
  {
    id: 2,
    title: 'Digital Composition',
    description: 'Advanced digital composition and effects',
    videoUrl: 'https://player.vimeo.com/video/202516691',
    thumbnail: '/For_Gilo/Footage/Covers/Ads_Cover_v001.png'
  },
  {
    id: 3,
    title: 'VFX Integration',
    description: 'Seamless visual effects integration',
    videoUrl: 'https://player.vimeo.com/video/544297949',
    thumbnail: '/For_Gilo/Footage/Covers/VFX_Cover_v001.png'
  },
  // Duplicating projects for demonstration of scroll
  {
    id: 4,
    title: 'VFX Showreel 2',
    description: 'Visual effects and compositing work showcase',
    videoUrl: 'https://player.vimeo.com/video/292516098',
    thumbnail: '/For_Gilo/Footage/Covers/Onset_Cover_v001.png'
  },
  {
    id: 5,
    title: 'Digital Composition 2',
    description: 'Advanced digital composition and effects',
    videoUrl: 'https://player.vimeo.com/video/202516691',
    thumbnail: '/For_Gilo/Footage/Covers/Lead_Cover_v001.png'
  },
  {
    id: 6,
    title: 'VFX Integration 2',
    description: 'Seamless visual effects integration',
    videoUrl: 'https://player.vimeo.com/video/544297949',
    thumbnail: '/For_Gilo/Footage/Covers/AI_Cover_v001.jpg'
  }
];

const Projects = () => {
  return (
    <section className="min-h-screen flex items-start bg-[#F2E3D5] overflow-hidden pb-20">
      <div className="container mx-auto px-4 pt-28 h-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row gap-12 h-full"
        >
          {/* Left side - Text content */}
          <div className="lg:w-1/3 lg:sticky lg:top-24">
            <h2 className="text-4xl font-bold mb-6 text-[#32506c] font-montserrat">My Work</h2>
            <p className="text-[#32506c]/80 mb-8">A selection of my visual effects and compositing projects. Each piece demonstrates my expertise in digital composition, VFX integration, and creative storytelling through visual effects.</p>
            <div className="hidden lg:block">
              <h3 className="text-xl font-bold mb-4 text-[#32506c] font-montserrat">Skills & Expertise</h3>
              <ul className="space-y-2 text-[#32506c]/80">
                <li>• Digital Composition</li>
                <li>• Visual Effects (VFX)</li>
                <li>• Motion Graphics</li>
                <li>• Color Grading</li>
                <li>• 3D Integration</li>
              </ul>
            </div>
          </div>

          {/* Right side - Project cards */}
          <div className="lg:w-2/3 flex-grow">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 h-full">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-lg overflow-hidden shadow-md h-full"
                >
                  <div className="relative aspect-[4/3] bg-black">
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects; 