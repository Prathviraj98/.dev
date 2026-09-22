'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, ChevronLeft, ChevronRight, Play, Pause, Sliders, Sparkles } from 'lucide-react';
import { Project } from '@/types';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

interface ProjectGridProps {
  projects: Project[];
}

const CATEGORIES = [
  'All',
  'Full-Stack',
  'AI / Machine Learning',
  'Mobile & PWA',
  'Cryptography',
  'IoT & Hardware',
];

const AUTO_PLAY_INTERVAL = 4500; // 4.5 seconds per slide

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCarouselIndex((prev) => (prev + 1) % Math.max(1, filteredProjects.length));
  }, [filteredProjects.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCarouselIndex((prev) => (prev - 1 + filteredProjects.length) % Math.max(1, filteredProjects.length));
  }, [filteredProjects.length]);

  // Auto-play interval effect (pauses when hovered or user pauses)
  useEffect(() => {
    if (!isPlaying || isHovered || filteredProjects.length <= 1) return;

    const timer = setInterval(() => {
      nextSlide();
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered, filteredProjects.length, nextSlide]);

  // Reset index when category changes
  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCarouselIndex(0);
  };

  return (
    <section id="portfolio" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative z-10 scroll-mt-16 sm:scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10">
        {/* Section Title Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
              <Briefcase className="w-3.5 h-3.5" />
              <span>FEATURED ENGINEERING WORK</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Featured <span className="text-gradient-cyan">Engineering Work</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-xl">
              Explore production deployments, high-scale backend engines, AI pipelines, and cryptographic mobile applications.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 glass-panel p-2 rounded-2xl border border-white/10 max-w-full">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-neon-cyan'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 🎠 Dedicated Auto-Scrolling 3D Carousel Container */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 overflow-hidden space-y-6 shadow-2xl"
        >
          {/* Animated Auto-Play Progress Bar */}
          {isPlaying && !isHovered && filteredProjects.length > 1 && (
            <motion.div
              key={carouselIndex}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: AUTO_PLAY_INTERVAL / 1000, ease: 'linear' }}
              className="absolute top-0 left-0 h-1 bg-gradient-to-r from-cyan-400 via-indigo-500 to-emerald-400 z-30"
            />
          )}

          {/* Carousel Top Navigation Bar */}
          <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4 gap-4">
            <div className="flex items-center space-x-3">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span>PROJECT <strong className="text-white">{String(carouselIndex + 1).padStart(2, '0')}</strong> / {String(filteredProjects.length).padStart(2, '0')}</span>
              </span>

              {isHovered && (
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  PAUSED ON HOVER
                </span>
              )}
            </div>

            {/* Controls: Prev / Play-Pause / Next */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-white border border-white/10 text-xs font-mono flex items-center gap-1.5 transition-colors"
                title={isPlaying ? 'Pause Auto-Play' : 'Resume Auto-Play'}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-amber-400" />
                    <span className="hidden sm:inline">Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="hidden sm:inline">Auto Play</span>
                  </>
                )}
              </button>

              <div className="flex items-center space-x-1">
                <button
                  onClick={prevSlide}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-white border border-white/10 hover:border-cyan-500/40 transition-colors"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-white border border-white/10 hover:border-cyan-500/40 transition-colors"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Carousel Slide Card */}
          {filteredProjects[carouselIndex] && (
            <AnimatePresence mode="wait">
              <motion.div
                key={filteredProjects[carouselIndex].id || filteredProjects[carouselIndex].slug}
                initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              >
                <ProjectCard
                  project={filteredProjects[carouselIndex]}
                  onSelect={setActiveProject}
                  index={0}
                  defaultMinimized={false}
                  hideMinimizeButton={true}
                />
              </motion.div>
            </AnimatePresence>
          )}

          {/* Bottom Dot Pagination & Live Status Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-white/10 gap-3 select-none">
            <div className="flex items-center space-x-2">
              {filteredProjects.map((p, idx) => (
                <button
                  key={p.id || p.slug}
                  onClick={() => {
                    setDirection(idx > carouselIndex ? 1 : -1);
                    setCarouselIndex(idx);
                  }}
                  className={`h-2.5 rounded-full transition-all ${
                    carouselIndex === idx ? 'w-10 bg-cyan-400 shadow-neon-cyan' : 'w-2.5 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center space-x-2 text-xs font-mono">
              {isHovered ? (
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 transition-all">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span>Auto-Play Paused on Hover</span>
                </span>
              ) : (
                <span className="text-slate-400 transition-colors">
                  Hover to pause • Click card to view project details
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Case Study Detailed Modal */}
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      </div>
    </section>
  );
}
