'use client';

import { useState, useMemo , memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaExternalLinkAlt, FaGithub, FaTimes, FaFilter } from 'react-icons/fa';
import { MdLayersClear } from 'react-icons/md';
import Image from 'next/image';
import rawProjects from '@/data/projects.json';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Project {
  title: string;
  description: string;
  image?: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: string;
  subCategory?: string;
};

// ─── Category metadata ────────────────────────────────────────────────────────
const CATEGORY_META: Record<string, { label: string; accent: string; ring: string; bg: string }> = {
  all: { label: 'All', accent: 'text-white', ring: 'border-white/40', bg: 'bg-white/10' },
  web: { label: 'Web', accent: 'text-violet-400', ring: 'border-violet-500/50', bg: 'bg-violet-500/10' },
  mobile_reactnative: { label: 'React Native', accent: 'text-cyan-400', ring: 'border-cyan-500/50', bg: 'bg-cyan-500/10' },
  mobile_native: { label: 'Native Mobile', accent: 'text-emerald-400', ring: 'border-emerald-500/50', bg: 'bg-emerald-500/10' },
  mobile_flutter: { label: 'Flutter', accent: 'text-blue-400', ring: 'border-blue-500/50', bg: 'bg-blue-500/10' },
  backend: { label: 'Backend', accent: 'text-orange-400', ring: 'border-orange-500/50', bg: 'bg-orange-500/10' },
  n8n: { label: 'Automation', accent: 'text-pink-400', ring: 'border-pink-500/50', bg: 'bg-pink-500/10' },
};

const getCategoryMeta = (cat: string) =>
  CATEGORY_META[cat] ?? { label: cat, accent: 'text-gray-400', ring: 'border-gray-600', bg: 'bg-gray-700/20' };

// ─── SubCategory display labels ───────────────────────────────────────────────
const SUBCATEGORY_LABEL: Record<string, string> = {
  fullstack_web_mobileapps: 'Fullstack · Web + Mobile',
  fullstack_mobileapps_adminportal: 'Fullstack · Mobile + Admin Portal',
  fullstack_web: 'Fullstack · Web',
  backend_microservices: 'Backend · Microservices',
  frontend_only_web: 'Frontend · Web',
  workflow_automation: 'Workflow Automation',
  frontend_only_mobileapp_native: 'Native App',
  frontend_only_mobileapp_hybrid: 'Hybrid App',
  fullstack_mobileapps: 'Fullstack · Mobile',
  fullstack_mobileapp: 'Fullstack · Mobile',
  fullstackfrontend_only_mobileapp_native_mobileapps: 'Native App · IoT',
};

const formatSubCategory = (sub: string) =>
  SUBCATEGORY_LABEL[sub] ?? sub.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

// ─── Tech tag colour map ──────────────────────────────────────────────────────
const TAG_COLOR: Record<string, string> = {
  react: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
  'react-native': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
  nextjs: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
  nestjs: 'bg-red-500/10 text-red-400 border-red-500/30',
  nodejs: 'bg-green-500/10 text-green-400 border-green-500/30',
  express: 'bg-green-500/10 text-green-400 border-green-500/30',
  mongodb: 'bg-green-600/10 text-green-500 border-green-600/30',
  postgresql: 'bg-blue-600/10 text-blue-400 border-blue-600/30',
  mysql: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  mssql: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  typescript: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  javascript: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
  tailwind: 'bg-teal-500/10 text-teal-400 border-teal-500/30',
  docker: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
  android: 'bg-lime-500/10 text-lime-400 border-lime-500/30',
  ios: 'bg-gray-500/10 text-gray-300 border-gray-500/30',
  hybrid: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  mobile: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  web: 'bg-violet-500/10 text-violet-400 border-violet-500/30',
  flutter: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  dart: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  kotlin: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
  java: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  native: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  rabbitmq: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
  'ci/cd': 'bg-pink-500/10 text-pink-400 border-pink-500/30',
  sentry: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
  n8n: 'bg-pink-500/10 text-pink-400 border-pink-500/30',
  ai: 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/30',
  chatbot: 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/30',
  ollama: 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/30',
  fintech: 'bg-emerald-600/10 text-emerald-400 border-emerald-600/30',
  payments: 'bg-emerald-600/10 text-emerald-400 border-emerald-600/30',
  ecommerce: 'bg-emerald-600/10 text-emerald-400 border-emerald-600/30',
  vpn: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
  security: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
  cybersecurity: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
  iot: 'bg-teal-600/10 text-teal-400 border-teal-600/30',
  rfid: 'bg-teal-600/10 text-teal-400 border-teal-600/30',
  azure: 'bg-sky-600/10 text-sky-400 border-sky-600/30',
  'c#': 'bg-purple-600/10 text-purple-400 border-purple-600/30',
  '.net': 'bg-purple-600/10 text-purple-400 border-purple-600/30',
  messaging: 'bg-blue-400/10 text-blue-300 border-blue-400/30',
  playstore: 'bg-lime-600/10 text-lime-400 border-lime-600/30',
  appstore: 'bg-gray-400/10 text-gray-300 border-gray-400/30',
  html: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
  css: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  js: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
  vapi: 'bg-indigo-600/10 text-indigo-400 border-indigo-600/30',
  mediapipe: 'bg-red-500/10 text-red-400 border-red-500/30',
  realm: 'bg-purple-600/10 text-purple-400 border-purple-600/30',
  websocket: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
  zustand: 'bg-amber-600/10 text-amber-400 border-amber-600/30',
};

const tagClass = (tag: string) =>
  TAG_COLOR[tag.toLowerCase()] ?? 'bg-gray-700/40 text-gray-400 border-gray-600/40';

// ─── Data mapping ─────────────────────────────────────────────────────────────
const ALL_PROJECTS: Project[] = rawProjects.map((p: any) => ({
  title: p.name || 'Untitled Project',
  description: p.desc || '',
  image: p.image && p.image_format ? `/images/projects/${p.image}.${p.image_format}` : undefined,
  tags: Array.from(new Set<string>((p.tags || []).map((t: string) => t.toLowerCase()))),
  category: p.category || 'other',
  subCategory: p.SubCategory,
  liveUrl: p.links?.view && !p.links.view.toLowerCase().includes("can't be viewed")
    ? p.links.view : undefined,
  githubUrl: p.links?.code && !p.links.code.toLowerCase().includes("can't be viewed")
    ? p.links.code : undefined,
}));

// ─── Component ────────────────────────────────────────────────────────────────
const Projects = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // unique categories present in data, preserving defined order
  const categoryOrder = ['all', 'web', 'mobile_reactnative', 'mobile_native', 'mobile_flutter', 'backend', 'n8n'];
  const presentCategories = categoryOrder.filter(
    c => c === 'all' || ALL_PROJECTS.some(p => p.category === c)
  );

  // projects matching active category
  const categoryFiltered = useMemo(() =>
    activeCategory === 'all'
      ? ALL_PROJECTS
      : ALL_PROJECTS.filter(p => p.category === activeCategory),
    [activeCategory]
  );

  // available tags from category-filtered projects (sorted by frequency)
  const availableTags = useMemo(() => {
    const freq: Record<string, number> = {};
    categoryFiltered.forEach(p => p.tags.forEach(t => { freq[t] = (freq[t] ?? 0) + 1; }));
    return Object.entries(freq).sort((a, b) => b[1] - a[1]).map(([t]) => t);
  }, [categoryFiltered]);

  // final filtered list
  const filteredProjects = useMemo(() =>
    activeTags.length === 0
      ? categoryFiltered
      : categoryFiltered.filter(p => activeTags.every(t => p.tags.includes(t))),
    [categoryFiltered, activeTags]
  );

  const toggleTag = (tag: string) =>
    setActiveTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setActiveTags([]);
  };

  const clearFilters = () => {
    setActiveCategory('all');
    setActiveTags([]);
  };

  const hasActiveFilters = activeCategory !== 'all' || activeTags.length > 0;

  return (
    <section id="projects" className="section-padding bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            My <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent mx-auto mb-12" />

          {/* ── Category Tabs ── */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {presentCategories.map(cat => {
              const meta = getCategoryMeta(cat);
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  id={`filter-cat-${cat}`}
                  onClick={() => handleCategoryChange(cat)}
                  className={`
                    px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200
                    ${isActive
                      ? `${meta.bg} ${meta.accent} ${meta.ring} shadow-lg scale-105`
                      : 'bg-transparent text-gray-500 border-gray-700 hover:border-gray-500 hover:text-gray-300'}
                  `}
                >
                  {meta.label}
                </button>
              );
            })}
            {hasActiveFilters && (
              <button
                id="filter-clear-all"
                onClick={clearFilters}
                className="px-5 py-2 rounded-full text-sm font-semibold border border-rose-500/40 text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 transition-all duration-200 flex items-center gap-2"
              >
                <MdLayersClear className="text-base" />
                Clear
              </button>
            )}
          </div>

          {/* ── Tag Pills (secondary filter) ── */}
          <AnimatePresence>
            {availableTags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="mb-10"
              >
                <div className="flex items-center gap-2 mb-3 justify-center">
                  <FaFilter className="text-gray-600 text-xs" />
                  <span className="text-xs text-gray-500 font-medium tracking-wider uppercase">
                    Filter by tech / platform
                  </span>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {availableTags.map(tag => {
                    const active = activeTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        id={`filter-tag-${tag}`}
                        onClick={() => toggleTag(tag)}
                        className={`
                          px-3 py-1 rounded-full text-xs font-medium border transition-all duration-150
                          ${active
                            ? `${tagClass(tag)} ring-1 ring-offset-1 ring-offset-black/20 scale-105`
                            : 'bg-surface/60 text-gray-500 border-gray-700 hover:border-gray-500 hover:text-gray-300'}
                        `}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
                {activeTags.length > 0 && (
                  <p className="text-center text-xs text-gray-500 mt-3">
                    Showing <span className="text-white font-semibold">{filteredProjects.length}</span> project{filteredProjects.length !== 1 ? 's' : ''} matching all selected tags
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Projects Grid ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + activeTags.join(',')}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.length === 0 ? (
                <div className="col-span-full text-center py-16">
                  <p className="text-gray-500 text-lg">No projects match your current filters.</p>
                  <button onClick={clearFilters} className="mt-4 text-primary-500 text-sm underline">
                    Clear filters
                  </button>
                </div>
              ) : (
                filteredProjects.map((project, index) => {
                  const catMeta = getCategoryMeta(project.category);
                  return (
                    <motion.div
                      key={project.title + index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.06 }}
                      whileHover={{ y: -8 }}
                      className="card group overflow-hidden cursor-pointer flex flex-col"
                      onClick={() => setSelectedProject(project)}
                    >
                      {/* Image */}
                      <div className="relative h-44 mb-4 -mx-8 -mt-8 overflow-hidden bg-gradient-to-br from-primary-600/60 to-accent/60">
                        {project.image ? (
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-6xl font-black text-white/10 select-none">
                              {project.title.substring(0, 2).toUpperCase()}
                            </span>
                          </div>
                        )}

                        {/* Category badge overlay (top-left) */}
                        <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide border ${catMeta.bg} ${catMeta.accent} ${catMeta.ring} backdrop-blur-sm`}>
                          {catMeta.label}
                        </div>

                        {/* Hover overlay with links */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={e => e.stopPropagation()}
                              className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-primary-500 transition-colors"
                              aria-label="View Live"
                            >
                              <FaExternalLinkAlt className="text-white text-sm" />
                            </a>
                          )}
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={e => e.stopPropagation()}
                              className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-primary-500 transition-colors"
                              aria-label="View Code"
                            >
                              <FaGithub className="text-white text-sm" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Card body */}
                      <div className="flex flex-col flex-1 space-y-3">
                        {/* SubCategory badge */}
                        {project.subCategory && (
                          <span className={`self-start px-2.5 py-0.5 rounded-md text-[10px] font-semibold tracking-wide border ${catMeta.bg} ${catMeta.accent} ${catMeta.ring}`}>
                            {formatSubCategory(project.subCategory)}
                          </span>
                        )}

                        <h3 className="text-lg font-bold text-white group-hover:text-primary-500 transition-colors line-clamp-1">
                          {project.title}
                        </h3>

                        <p
                          className="text-gray-400 text-sm leading-relaxed line-clamp-2"
                          dangerouslySetInnerHTML={{ __html: project.description.replace(/<br\s*\/?>/gi, ' · ').replace(/<[^>]+>/g, '') }}
                        />

                        {/* Tags (first 4, rest as count) */}
                        {project.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                            {project.tags.slice(0, 4).map(tag => (
                              <span key={tag} className={`px-2 py-0.5 text-[10px] font-medium rounded-full border ${tagClass(tag)}`}>
                                {tag}
                              </span>
                            ))}
                            {project.tags.length > 4 && (
                              <span className="px-2 py-0.5 text-[10px] text-gray-500 border border-gray-700 rounded-full">
                                +{project.tags.length - 4}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })
              )}
            </motion.div>
          </AnimatePresence>

          {/* ── GitHub CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-16"
          >
            <p className="text-gray-400 mb-4">Want to see more of my work?</p>
            <a
              href="https://github.com/mharis404"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <FaGithub />
              Visit My GitHub
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Project Detail Modal ── */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 40 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="bg-surface border border-gray-700 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
              onClick={e => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 flex items-center justify-center hover:bg-primary-500 transition-colors z-10"
              >
                <FaTimes className="text-white text-sm" />
              </button>

              {/* Hero image */}
              {selectedProject.image && (
                <div className="relative w-full h-72 rounded-t-2xl overflow-hidden bg-gradient-to-br from-primary-600/60 to-accent/60">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              )}

              {/* Content */}
              <div className="p-8 space-y-5">
                {/* Header row */}
                <div className="flex flex-wrap items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-2xl font-bold gradient-text">{selectedProject.title}</h3>
                    {selectedProject.subCategory && (
                      <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-md text-xs font-semibold border ${getCategoryMeta(selectedProject.category).bg} ${getCategoryMeta(selectedProject.category).accent} ${getCategoryMeta(selectedProject.category).ring}`}>
                        {formatSubCategory(selectedProject.subCategory)}
                      </span>
                    )}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getCategoryMeta(selectedProject.category).bg} ${getCategoryMeta(selectedProject.category).accent} ${getCategoryMeta(selectedProject.category).ring}`}>
                    {getCategoryMeta(selectedProject.category).label}
                  </span>
                </div>

                {/* Description (renders HTML links safely) */}
                <p
                  className="text-gray-300 leading-relaxed [&_a]:text-primary-500 [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-primary-400"
                  dangerouslySetInnerHTML={{ __html: selectedProject.description }}
                />

                {/* All tags */}
                {selectedProject.tags.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-semibold">Tech Stack & Platforms</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map(tag => (
                        <span key={tag} className={`px-3 py-1 text-xs font-medium rounded-full border ${tagClass(tag)}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex flex-wrap gap-3 pt-2">
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      <FaExternalLinkAlt />
                      View Live
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-full border-2 border-primary-500 text-primary-500 font-semibold hover:bg-primary-500 hover:text-white transition-all duration-300 flex items-center gap-2 text-sm"
                    >
                      <FaGithub />
                      View Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default memo(Projects);