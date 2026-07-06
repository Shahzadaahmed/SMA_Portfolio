'use client';

import { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { personalInfo } from '@/data/portfolio-data';
import { FaEnvelope, FaPhone, FaWhatsapp, FaPaperPlane } from 'react-icons/fa';
// emailjs-com is imported dynamically inside handleSubmit to avoid SSR crashes

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setErrorMessage('Please fill in all fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }

    try {
      // Open native email client with form data pre-filled
      const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      window.open(`mailto:${personalInfo.email}?subject=${subject}&body=${body}`, '_blank');

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus('idle');
      },
        5000);
    }

    catch (error) {
      console.error('Error opening mail client:', error);
      setStatus('error');
      setErrorMessage('Could not open email client. Please email directly.');
    };
  };

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent mx-auto mb-12"></div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Side - Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-2xl font-bold mb-4">Let&apos;s Connect</h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out through any of these channels.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-4">
                {/* Email 1 */}
                <motion.a
                  href={`mailto:${personalInfo.email}?subject=Approaching via Portfolio`}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 p-4 rounded-xl glass-morphism hover:border-primary-500/50 transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email (Primary)</p>
                    <p className="text-white font-medium">{personalInfo.email}</p>
                  </div>
                </motion.a>

                {/* Email 2 */}
                <motion.a
                  href={`mailto:${personalInfo.alternateEmail}?subject=Approaching via Portfolio`}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 p-4 rounded-xl glass-morphism hover:border-primary-500/50 transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email (Alternate)</p>
                    <p className="text-white font-medium">{personalInfo.alternateEmail}</p>
                  </div>
                </motion.a>

                {/* WhatsApp KSA */}
                <motion.a
                  href={`https://wa.me/${personalInfo.phone.ksa.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 p-4 rounded-xl glass-morphism hover:border-primary-500/50 transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center flex-shrink-0">
                    <FaWhatsapp className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">WhatsApp (KSA)</p>
                    <p className="text-white font-medium">{personalInfo.phone.ksa}</p>
                  </div>
                </motion.a>

                {/* WhatsApp PAK */}
                <motion.a
                  href={`https://wa.me/${personalInfo.phone.pak.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 p-4 rounded-xl glass-morphism hover:border-primary-500/50 transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center flex-shrink-0">
                    <FaWhatsapp className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">WhatsApp (PAK)</p>
                    <p className="text-white font-medium">{personalInfo.phone.pak}</p>
                  </div>
                </motion.a>
              </div>
            </motion.div>

            {/* Right Side - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-surface border border-gray-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-white"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-surface border border-gray-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-white"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg bg-surface border border-gray-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-white resize-none"
                    placeholder="Your message here..."
                  />
                </div>

                {/* Status Messages */}
                {status === 'success' && (
                  <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-500">
                    ✓ Your email client has opened with your message pre-filled. Please send it from there!
                  </div>
                )}

                {status === 'error' && (
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500">
                    ✗ {errorMessage || 'Something went wrong. Please try again.'}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full btn-primary justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? (
                    <>
                      <div className="loader"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(Contact);