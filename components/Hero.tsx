'use client';

import React, { useEffect, useState, memo } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaFacebook, FaEnvelope, FaChevronDown } from 'react-icons/fa';
import { personalInfo, userName } from '@/data/portfolio-data';
import Image from 'next/image';
import ParticleBackground from '@/components/ParticleBackground';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const [currentRole, setCurrentRole] = useState(0);

  const roles: string[] = [
    'Full Stack Developer(MERN)',
    'Mobile App Developer',
    'Team Lead',
    'Software Development Trainer',
    'JavaScript Enthusiast'
  ];

  useEffect(() => {
    let charIndex = 0;
    const currentText = roles[currentRole];

    const typeInterval = setInterval(() => {
      if (charIndex <= currentText.length) {
        setTypedText(currentText.substring(0, charIndex));
        charIndex++;
      }

      else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [currentRole]);

  const socialLinks = [
    { icon: FaLinkedin, url: personalInfo.social.linkedin, label: 'LinkedIn', color: '#0077b5' },
    { icon: FaGithub, url: personalInfo.social.github, label: 'GitHub', color: '#333' },
    { icon: FaFacebook, url: personalInfo.social.facebook, label: 'Facebook', color: '#E4405F' },
    { icon: FaEnvelope, url: `mailto:${personalInfo.email}`, label: 'Email', color: '#EA4335' },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-background to-surface"></div>

        {/* anime.js particle field */}
        <ParticleBackground />

        {/* Framer Motion ambient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.25, 0.5, 0.25],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-400 font-light"
            >
              Hi There, I&apos;m
            </motion.h2>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
              style={{ textTransform: "capitalize" }}
            >
              <span className="gradient-text">
                {userName?.myName}
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="h-12 md:h-16"
            >
              <p className="text-xl md:text-2xl text-gray-300">
                I&apos;m a <span className="text-primary-500 font-semibold">{typedText}</span>
                <span className="animate-pulse">|</span>
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-gray-400 text-lg max-w-xl"
            >
              {personalInfo.subtitle}
            </motion.p>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex gap-4 pt-4"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full glass-morphism flex items-center justify-center text-xl hover:text-primary-500 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon />
                </motion.a>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex flex-wrap gap-4 pt-6"
            >
              <a
                href="#about"
                className="btn-primary group"
              >
                About Me
                <FaChevronDown className="group-hover:animate-bounce" />
              </a>
              <a
                href={personalInfo?.resumeLink || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-full border-2 border-primary-500 text-primary-500 font-semibold hover:bg-primary-500 hover:text-white transition-all duration-300"
              >
                View Resume
              </a>
            </motion.div>
          </motion.div>

          {/* Right Side - 3D Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden md:block"
          >
            <div className="relative w-full h-96 lg:h-[500px]">
              {/* Animated Circle */}
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-0 rounded-full border-2 border-primary-500/30"
                style={{
                  borderStyle: 'dashed',
                }}
              />

              {/* Inner rotating element */}
              <motion.div
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-10 rounded-full bg-gradient-to-br from-primary-500/20 to-accent/20 blur-xl"
              />

              {/* Center image placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-64 h-64 lg:w-80 lg:h-80 rounded-full bg-gradient-to-br from-primary-600 to-accent overflow-hidden shadow-2xl"
                >
                  <div className="w-full h-full relative">
                    <Image
                      src="/images/SMA.png"
                      alt={personalInfo.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <FaChevronDown className="text-3xl text-primary-500" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default memo(Hero);