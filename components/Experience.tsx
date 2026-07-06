'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { experience } from '@/data/portfolio-data';
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { animate, createScope, stagger } from 'animejs';

const Experience = () => {
  // Framer Motion inView (controls card entrance)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // anime.js scopes
  const timelineRef  = useRef<HTMLDivElement>(null);
  const timelineScope = useRef<any>(null);
  const [animeRef, animeInView] = useInView({ triggerOnce: true, threshold: 0.05 });

  // Merge refs for the timeline container
  const setTimelineRef = (el: HTMLDivElement | null) => {
    (timelineRef as any).current = el;
    animeRef(el);
  };

  // ── anime.js: draw timeline line + pulse dots ──────────────────────────────
  useEffect(() => {
    if (!animeInView || !timelineRef.current) return;

    timelineScope.current = createScope({ root: timelineRef as any }).add(() => {
      // 1. Draw the central gradient line from top to bottom
      animate('.timeline-line', {
        scaleY:          [0, 1],
        transformOrigin: 'top center',
        duration:        1400,
        ease:            'out(3)',
      });

      // 2. Pop in each timeline dot after the line starts drawing
      animate('.timeline-dot', {
        scale:   [0, 1.2, 1],
        opacity: [0, 1],
        delay:   stagger(200, { start: 400 }),
        duration: 500,
        ease:    'out(4)',
      });

      // 3. Subtle continuous glow pulse on the dots
      animate('.timeline-dot', {
        boxShadow: [
          '0 0 0px 0px rgba(99,102,241,0)',
          '0 0 12px 4px rgba(99,102,241,0.6)',
          '0 0 0px 0px rgba(99,102,241,0)',
        ],
        delay:     stagger(200, { start: 1200 }),
        duration:  2000,
        loop:      true,
        ease:      'inOut(2)',
      });
    });

    return () => {
      timelineScope.current?.revert();
      timelineScope.current = null;
    };
  }, [animeInView]);

  return (
    <section id="experience" className="section-padding bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent mx-auto mb-12"></div>

          {/* ── Timeline container (anime.js scope root) ───────────────── */}
          <div ref={setTimelineRef} className="relative">
            {/* Central vertical line — animated by anime.js (scaleY) */}
            <div
              className="timeline-line hidden md:block absolute left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-500 to-accent"
              style={{ transformOrigin: 'top center', transform: 'scaleY(0)' }}
            />

            <div className="space-y-12">
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative grid md:grid-cols-2 gap-8 items-center ${
                    index % 2 === 0 ? '' : 'md:direction-rtl'
                  }`}
                >
                  {/* Content card */}
                  <div className={`${index % 2 === 0 ? 'md:text-right' : 'md:text-left md:col-start-2'}`}>
                    <div className="card hover:shadow-2xl transition-all duration-300">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent flex items-center justify-center">
                          <FaBriefcase className="text-white text-xl" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white">{exp.company}</h3>
                          <p className="text-sm text-gray-400">{exp.type}</p>
                        </div>
                      </div>

                      <h4 className="text-lg font-semibold text-primary-500 mb-3">
                        {exp.position}
                      </h4>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-gray-400">
                          <FaCalendarAlt className="text-primary-500" />
                          <span className="text-sm">{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <FaMapMarkerAlt className="text-primary-500" />
                          <span className="text-sm">{exp.location}</span>
                        </div>
                      </div>

                      <p className="text-gray-400 leading-relaxed">{exp.description}</p>
                    </div>
                  </div>

                  {/* Timeline dot — popped in by anime.js */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
                    <div
                      className="timeline-dot w-6 h-6 rounded-full bg-gradient-to-br from-primary-500 to-accent border-4 border-background shadow-lg"
                      style={{ opacity: 0, scale: 0 }}
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

export default Experience;
