'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { testimonials } from '@/data/portfolio-data';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const Testimonials = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="testimonials" className="section-padding relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-500/10 blur-[120px] rounded-full -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              What Colleagues <span className="gradient-text">Say</span>
            </h2>
            <p className="text-xl text-gray-400">
              Professional recommendations from directors, team leads, and fellow engineers.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent mx-auto mt-8"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-morphism p-8 rounded-3xl relative border border-white/5 flex flex-col justify-between"
              >
                <div className="mb-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-500 text-sm" />
                    ))}
                  </div>
                  <FaQuoteLeft className="text-primary-500/20 text-4xl absolute top-8 right-8" />
                  <p className="text-gray-300 italic leading-relaxed relative z-10">
                    &quot;{testimonial.content}&quot;
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-6 pt-6 border-t border-white/5">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent flex items-center justify-center text-white font-bold shrink-0">
                    {testimonial.initials}
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="font-bold text-white truncate">{testimonial.name}</h4>
                    <p className="text-sm text-primary-500 truncate">{testimonial.role}</p>
                    <p className="text-[10px] text-gray-500 truncate">{testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
            className="text-center mt-12"
          >
            <p className="text-gray-500 text-sm">
              Reflecting 5+ years of consistent, high-quality delivery.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(Testimonials);