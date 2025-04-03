'use client';

import { motion } from 'framer-motion';

const skills = [
  { name: 'Nuke Compositing', percentage: 98 },
  { name: 'Rotoscoping & Paint', percentage: 95 },
  { name: 'Keying & Integration', percentage: 95 },
  { name: 'Color Correction', percentage: 92 },
  { name: '3D Camera Tracking', percentage: 90 },
  { name: 'Adobe After Effects', percentage: 88 }
];

const About = () => {
  return (
    <section className="h-full flex items-center justify-center bg-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Crafting Visual Magic
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              With over a decade of experience in the VFX industry, I specialize in creating seamless visual effects that enhance storytelling. 
              My expertise spans from complex compositing challenges to intricate rotoscoping and digital beauty work. 
              I've had the privilege of working on major film and television projects, collaborating with talented teams worldwide 
              to bring creative visions to life.
            </p>
            <p className="text-gray-600 max-w-3xl mx-auto mt-4">
              My approach combines technical precision with artistic sensibility, ensuring that every shot not only meets but exceeds 
              expectations. Whether it's integrating CG elements, performing complex clean-up work, or fine-tuning the final look, 
              I'm dedicated to achieving the highest quality in visual effects.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {skills.map((skill, index) => (
              <div key={skill.name} className="mb-8">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{skill.name}</span>
                  <span>{skill.percentage}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    className="h-full bg-[#32506c] rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 