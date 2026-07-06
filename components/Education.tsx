'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { education } from '@/data/portfolio-data';
import { FaGraduationCap } from 'react-icons/fa';

const Education = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="education" className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            My <span className="gradient-text">Education</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent mx-auto mb-6"></div>
          <p className="text-center text-gray-400 italic mb-12 text-lg">
            &ldquo;Education is not the learning of facts, but the training of the mind to think.&rdquo;
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="card group"
              >
                <div className="flex flex-col h-full">
                  {/* Icon */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-accent flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <FaGraduationCap className="text-white text-2xl" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white group-hover:text-primary-500 transition-colors">
                        {edu.degree}
                      </h3>
                    </div>
                  </div>

                  <p className="text-gray-400 mb-3">{edu.institution}</p>

                  <div className="mt-auto">
                    <div className="inline-block px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/30">
                      <p className="text-primary-500 font-semibold text-sm">
                        {edu.year || edu.period}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(Education);