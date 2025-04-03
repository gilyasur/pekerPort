'use client';

import { motion } from 'framer-motion';
import { useSection } from '@/context/SectionContext';

const projects = [
  {
    id: 1,
    title: 'VFX Showreel',
    description: 'Visual effects and compositing work showcase',
    videoUrl: 'https://player.vimeo.com/video/292516098',
    thumbnail: 'https://www.roypeker.com/wp-content/uploads/2025/03/Screenshot-9.png'
  },
  {
    id: 2,
    title: 'Digital Composition',
    description: 'Advanced digital composition and effects',
    videoUrl: 'https://player.vimeo.com/video/202516691',
    thumbnail: 'https://www.roypeker.com/wp-content/uploads/2025/03/Screenshot-1.png'
  },
  {
    id: 3,
    title: 'VFX Integration',
    description: 'Seamless visual effects integration',
    videoUrl: 'https://player.vimeo.com/video/544297949',
    thumbnail: 'https://www.roypeker.com/wp-content/uploads/2025/03/Screenshot-16.png'
  },
  // Duplicating projects for demonstration of scroll
  {
    id: 4,
    title: 'VFX Showreel 2',
    description: 'Visual effects and compositing work showcase',
    videoUrl: 'https://player.vimeo.com/video/292516098',
    thumbnail: 'https://www.roypeker.com/wp-content/uploads/2025/03/Screenshot-9.png'
  },
  {
    id: 5,
    title: 'Digital Composition 2',
    description: 'Advanced digital composition and effects',
    videoUrl: 'https://player.vimeo.com/video/202516691',
    thumbnail: 'https://www.roypeker.com/wp-content/uploads/2025/03/Screenshot-1.png'
  },
  {
    id: 6,
    title: 'VFX Integration 2',
    description: 'Seamless visual effects integration',
    videoUrl: 'https://player.vimeo.com/video/544297949',
    thumbnail: 'https://www.roypeker.com/wp-content/uploads/2025/03/Screenshot-16.png'
  }
];

const Projects = () => {
  return (
    <section className="h-full flex items-start bg-white safe-area overflow-hidden">
      <div className="container mx-auto px-4 h-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row gap-12 h-full"
        >
          {/* Left side - Text content */}
          <div className="lg:w-1/3 lg:sticky lg:top-24">
            <h2 className="text-4xl font-bold mb-6">My Work</h2>
            <p className="text-gray-600 mb-8">A selection of my visual effects and compositing projects. Each piece demonstrates my expertise in digital composition, VFX integration, and creative storytelling through visual effects.</p>
            <div className="hidden lg:block">
              <h3 className="text-xl font-bold mb-4">Skills & Expertise</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Digital Composition</li>
                <li>• Visual Effects (VFX)</li>
                <li>• Motion Graphics</li>
                <li>• Color Grading</li>
                <li>• 3D Integration</li>
              </ul>
            </div>
          </div>

          {/* Right side - Video cards */}
          <div className="lg:w-2/3 overflow-y-auto" style={{ maxHeight: 'calc(100vh - var(--header-height) - var(--footer-height))' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-lg overflow-hidden shadow-lg"
                >
                  <div className="relative aspect-video">
                    <iframe
                      src={`${project.videoUrl}?autoplay=0&loop=0&title=0&byline=0&portrait=0`}
                      className="absolute inset-0 w-full h-full"
                      allow="autoplay; fullscreen; picture-in-picture"
                      style={{ border: 0 }}
                    ></iframe>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-600">{project.description}</p>
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