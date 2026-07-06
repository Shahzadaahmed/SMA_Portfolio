'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { businessValue } from '@/data/portfolio-data';
import { FaBug, FaRocket, FaUsers, FaServer, FaMobileAlt, FaCloud } from 'react-icons/fa';

const iconMap: { [key: string]: any } = {
  Bug: FaBug,
  Rocket: FaRocket,
  Users: FaUsers,
  Server: FaServer,
  Smartphone: FaMobileAlt,
  Cloud: FaCloud,
};

const BusinessValue = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="value" className="section-padding bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Business <span className="gradient-text">Value</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Software engineering is a business function. Here&apos;s how I&apos;ve moved the needle and delivered real impact.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent mx-auto mt-8"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {businessValue.map((item, index) => {
              const Icon = iconMap[item.icon];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-morphism p-8 rounded-2xl border border-white/5 hover:border-primary-500/30 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 bg-primary-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="text-2xl text-primary-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-primary-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {item.impact}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(BusinessValue);