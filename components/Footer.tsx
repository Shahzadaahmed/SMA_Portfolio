'use client';

import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope, FaHeart, FaArrowUp } from 'react-icons/fa';
import { personalInfo } from '@/data/portfolio-data';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: FaLinkedin, url: personalInfo.social.linkedin, label: 'LinkedIn' },
    { icon: FaGithub, url: personalInfo.social.github, label: 'GitHub' },
    { icon: FaInstagram, url: personalInfo.social.instagram, label: 'Instagram' },
    { icon: FaEnvelope, url: `mailto:${personalInfo.email}`, label: 'Email' },
  ];

  return (
    <footer className="relative bg-surface/50 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold gradient-text">Muhammad Haris</h3>
            <p className="text-gray-400 leading-relaxed">
              Thank you for visiting my portfolio. Connect with me on social media or reach out for collaboration opportunities.
            </p>
            <p className="text-primary-500 font-semibold">Keep Rising 🚀</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-primary-500 transition-colors inline-flex items-center gap-2"
                  >
                    <span className="text-primary-500">›</span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Info</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-primary-500 mt-1">📞</span>
                <span>{personalInfo.phone.ksa}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-500 mt-1">✉️</span>
                <span className="break-all">{personalInfo.email}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-500 mt-1">📍</span>
                <span>{personalInfo.location.current}</span>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full glass-morphism flex items-center justify-center hover:bg-primary-500 hover:scale-110 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="text-lg" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-center md:text-left">
              © {new Date().getFullYear()} Muhammad Haris. Designed with{' '}
              <FaHeart className="inline text-red-500 animate-pulse" /> by{' '}
              <a
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-500 hover:underline"
              >
                Muhammad Haris
              </a>
            </p>

            <p className="text-gray-500 text-sm">
              Built with Next.js, React, TailwindCSS & Framer Motion
            </p>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent flex items-center justify-center shadow-lg hover:shadow-2xl transition-all z-50"
        aria-label="Scroll to top"
      >
        <FaArrowUp className="text-white text-lg" />
      </motion.button>
    </footer>
  );
};

export default Footer;
