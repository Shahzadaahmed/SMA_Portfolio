import React , { memo } from 'react';

import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import BusinessValue from '@/components/BusinessValue';
import Skills from '@/components/Skills';
import KnowledgeGraph from '@/components/KnowledgeGraph';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Projects from '@/components/Projects';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const App = () => {
  return (
    <main className="relative min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <BusinessValue />
      <Skills />
      <KnowledgeGraph />
      <Experience />
      <Education />
      <Projects />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
};

export default memo(App);