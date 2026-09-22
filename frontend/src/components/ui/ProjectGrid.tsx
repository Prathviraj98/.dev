'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, ChevronLeft, ChevronRight, Maximize2, Minimize2, Grid, Rows, Sliders } from 'lucide-react';
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

export type ViewMode = 'minimized' | 'carousel' | 'maximized';

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('minimized');
  const [globalMinimized, setGlobalMinimized] = useState<boolean>(true);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  const nextCarousel = () => {
    setCarouselIndex((prev) => (prev + 1) % Math.max(1, filteredProjects.length));
  };

  const prevCarousel = () => {
    setCarouselIndex((prev) => (prev - 1 + filteredProjects.length) % Math.max(1, filteredProjects.length));
  };

  const toggleGlobalMinimize = () => {
    setGlobalMinimized((prev) => !prev);
  };

  return (
    <section id="portfolio" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
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

          {/* View Mode Switcher Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* View Layout Mode Buttons (Minimized vs Carousel vs Maximized Grid) */}
            <div className="flex items-center space-x-1 glass-panel p-1.5 rounded-2xl border border-white/10">
              <button
                onClick={() => {
                  setViewMode('minimized');
                  setGlobalMinimized(true);
                }}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                  viewMode === 'minimized'
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
                title="Minimized List View (Default)"
              >
                <Rows className="w-3.5 h-3.5" />
                <span>Minimized</span>
              </button>

              <button
                onClick={() => setViewMode('carousel')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                  viewMode === 'carousel'
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
                title="3D Carousel Slider View"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Carousel</span>
              </button>

              <button
                onClick={() => {
                  setViewMode('maximized');
                  setGlobalMinimized(false);
                }}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                  viewMode === 'maximized'
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
                title="Maximized Grid View"
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Maximized</span>
              </button>
            </div>

            {/* Quick Toggle: Minimize All / Maximize All (for list views) */}
            {viewMode !== 'carousel' && (
              <button
                onClick={toggleGlobalMinimize}
                className="flex items-center space-x-1.5 px-3.5 py-2 rounded-2xl glass-panel border border-white/10 text-xs font-mono text-cyan-300 hover:border-cyan-500/40 hover:text-white transition-all"
                title={globalMinimized ? 'Maximize All Projects' : 'Minimize All Projects'}
              >
                {globalMinimized ? (
                  <>
                    <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Maximize All</span>
                  </>
                ) : (
                  <>
                    <Minimize2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Minimize All</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 glass-panel p-2 rounded-2xl border border-white/10 max-w-full">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCarouselIndex(0);
              }}
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

        {/* Layout Render Modes */}
        {viewMode === 'carousel' ? (
          /* 🎠 Interactive 3D Carousel Slider Mode */
          <div className="relative glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 overflow-hidden space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span>SLIDE {String(carouselIndex + 1).padStart(2, '0')} / {String(filteredProjects.length).padStart(2, '0')}</span>
              </span>

              {/* Carousel Next / Prev Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={prevCarousel}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-white border border-white/10 hover:border-cyan-500/40 transition-colors"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextCarousel}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-white border border-white/10 hover:border-cyan-500/40 transition-colors"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Active Carousel Slide */}
            {filteredProjects[carouselIndex] && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={filteredProjects[carouselIndex].id || filteredProjects[carouselIndex].slug}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProjectCard
                    project={filteredProjects[carouselIndex]}
                    onSelect={setActiveProject}
                    index={0}
                    defaultMinimized={false}
                  />
                </motion.div>
              </AnimatePresence>
            )}

            {/* Pagination Dots */}
            <div className="flex items-center justify-center space-x-2 pt-2">
              {filteredProjects.map((p, idx) => (
                <button
                  key={p.id || p.slug}
                  onClick={() => setCarouselIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    carouselIndex === idx ? 'w-8 bg-cyan-400' : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          /* ▫️ Minimized List (Default) or Maximized Grid */
          <div
            className={
              viewMode === 'minimized' && globalMinimized
                ? 'space-y-4'
                : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            }
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id || project.slug}
                project={project}
                onSelect={setActiveProject}
                index={index}
                defaultMinimized={globalMinimized}
              />
            ))}
          </div>
        )}

        {/* Case Study Modal */}
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      </div>
    </section>
  );
}
