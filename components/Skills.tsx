'use client';

import { useEffect, useRef, memo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { skills, totalYearsOfExp } from '@/data/portfolio-data';
import Image from 'next/image';
import { animate, createScope } from 'animejs';

// ─── Stat data ────────────────────────────────────────────────────────────────
const STATS = [
  { target: totalYearsOfExp, suffix: '+', label: 'Years Experience' },
  { target: 6, suffix: '+', label: 'Technologies' },
  { target: 50, suffix: '+', label: 'Projects Completed' },
  { target: 90, suffix: '%', label: 'Client Satisfaction' },
];

// ─── Framer Motion variants ───────────────────────────────────────────────────
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

// ─── Component ────────────────────────────────────────────────────────────────
const Skills = () => {
  // Existing intersection observer (controls Framer Motion)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // anime.js scope for stats section
  const statsRef = useRef<HTMLDivElement>(null);
  const statsScope = useRef<any>(null);
  const [statsRef2, statsInView] = useInView({ triggerOnce: true, threshold: 0.3 });

  // Merge refs so both InView and the DOM ref point to the same element
  const setStatsRef = (el: HTMLDivElement | null) => {
    (statsRef as any).current = el;
    statsRef2(el);
  };

  // ── anime.js counter animation ────────────────────────────────────────────
  useEffect(() => {
    if (!statsInView || !statsRef.current) return;

    statsScope.current = createScope({ root: statsRef as any }).add(() => {
      STATS.forEach((stat, index) => {
        const obj = { value: 0 };
        animate(obj, {
          value: stat.target,
          duration: 1800,
          delay: 200 + index * 120,
          ease: 'out(4)',
          onUpdate: () => {
            const el = document.getElementById(`anime-stat-${index}`);
            if (el) el.textContent = `${Math.round(obj.value)}${stat.suffix}`;
          },
        });
      });

      // Subtle glow pulse on each stat heading
      animate('.anime-stat-value', {
        filter: ['brightness(1)', 'brightness(1.4)', 'brightness(1)'],
        delay: 2200,
        duration: 1200,
        ease: 'inOut(2)',
      });
    });

    return () => {
      statsScope.current?.revert();
      statsScope.current = null;
    };
  }, [statsInView]);

  return (
    <section id="skills" className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Skills &amp; <span className="gradient-text">Abilities</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent mx-auto mb-12"></div>

          {/* ── Skill cards (Framer Motion stagger) ─────────────────────── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{
                  scale: 1.05,
                  rotate: [0, -2, 2, 0],
                  transition: { duration: 0.3 },
                }}
                className="card group cursor-pointer"
              >
                <div className="flex flex-col items-center justify-center p-4 space-y-3">
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    {skill.icon.startsWith('http') ? (
                      <Image
                        src={skill.icon}
                        alt={skill.name}
                        width={48}
                        height={48}
                        className="object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300">
                        {skill.name.substring(0, 2)}
                      </div>
                    )}
                  </div>
                  <p className="text-center text-sm font-medium text-gray-300 group-hover:text-primary-500 transition-colors">
                    {skill.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* ── Stats (anime.js counter) ─────────────────────────────────── */}
          <div
            ref={setStatsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          >
            {STATS.map((stat, index) => (
              <div key={index} className="text-center">
                <h3
                  id={`anime-stat-${index}`}
                  className="anime-stat-value text-4xl md:text-5xl font-bold gradient-text mb-2"
                  aria-label={`${stat.target}${stat.suffix} ${stat.label}`}
                >
                  {/* Starts at 0; anime.js fills in the real value */}
                  0{stat.suffix}
                </h3>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(Skills);