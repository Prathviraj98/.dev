'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  Search,
  Sparkles,
  Cpu,
  ShieldCheck,
  Smartphone,
  Server,
  Activity,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Maximize2,
  Code2,
  ExternalLink,
  Github,
} from 'lucide-react';
import { Project } from '@/types';
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

function getProjectIcon(project: Project) {
  const cat = (project.category || '').toLowerCase();
  const title = (project.title || '').toLowerCase();

  if (cat.includes('ai') || title.includes('symbot') || title.includes('kaes') || title.includes('mouse')) {
    return { icon: Cpu, accent: 'from-cyan-500 to-blue-600', border: 'border-cyan-500/40', glow: 'shadow-neon-cyan' };
  }
  if (cat.includes('crypto') || title.includes('spam') || title.includes('shield')) {
    return { icon: ShieldCheck, accent: 'from-emerald-500 to-teal-600', border: 'border-emerald-500/40', glow: 'shadow-[0_0_20px_rgba(16,185,129,0.35)]' };
  }
  if (cat.includes('mobile') || title.includes('flutter') || title.includes('anvesana')) {
    return { icon: Smartphone, accent: 'from-purple-500 to-pink-600', border: 'border-purple-500/40', glow: 'shadow-[0_0_20px_rgba(168,85,247,0.35)]' };
  }
  if (cat.includes('iot') || title.includes('medical') || title.includes('sensor')) {
    return { icon: Activity, accent: 'from-amber-500 to-rose-600', border: 'border-amber-500/40', glow: 'shadow-[0_0_20px_rgba(245,158,11,0.35)]' };
  }
  return { icon: Server, accent: 'from-indigo-500 to-cyan-600', border: 'border-indigo-500/40', glow: 'shadow-neon-indigo' };
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hoveredDockIndex, setHoveredDockIndex] = useState<number | null>(null);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.summary.toLowerCase().includes(query) ||
        p.tech_stack.some((tech) => tech.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  // Keep selected index within bounds when filters change
  useEffect(() => {
    if (selectedIndex >= filteredProjects.length) {
      setSelectedIndex(Math.max(0, filteredProjects.length - 1));
    }
  }, [filteredProjects.length, selectedIndex]);

  const currentProject = filteredProjects[selectedIndex] || filteredProjects[0] || null;

  const handleNext = () => {
    if (filteredProjects.length <= 1) return;
    setSelectedIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const handlePrev = () => {
    if (filteredProjects.length <= 1) return;
    setSelectedIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
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
              Interactive <span className="text-gradient-cyan">Project Dock</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-xl">
              Dock into production deployments, AI pipelines, cryptographic engines, and microservices. Hover & click dock items to inspect live specs.
            </p>
          </div>

          {/* Category Filter Pills & Live Search Input */}
          <div className="space-y-3">
            {/* Search Bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Search projects, technologies (e.g. PyTorch, FastAPI)..."
                className="w-full sm:w-80 pl-10 pr-4 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 glass-panel p-2 rounded-2xl border border-white/10 max-w-full">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSelectedIndex(0);
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
          </div>
        </div>

        {/* 🚀 Main Project Stage Showcase Container */}
        {currentProject ? (
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProject.id || currentProject.slug}
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative min-h-[500px] lg:h-[480px]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 h-full">
                  {/* Left Thumbnail Banner */}
                  <div className="lg:col-span-6 relative h-64 sm:h-72 lg:h-full min-h-[260px] overflow-hidden bg-slate-950">
                    <img
                      src={currentProject.image_url}
                      alt={currentProject.title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80';
                      }}
                      className="w-full h-full object-cover object-center opacity-85 hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-slate-950/20 lg:to-slate-950" />

                    {/* Category Badge Pill */}
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-slate-950/80 backdrop-blur-md text-cyan-300 border border-cyan-500/30">
                        {currentProject.category}
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono text-slate-300 bg-slate-900/80 border border-white/10">
                        ID: {currentProject.slug}
                      </span>
                    </div>

                    {/* Prev / Next Stage Nav Buttons */}
                    <div className="absolute bottom-4 right-4 z-20 flex items-center space-x-2">
                      <button
                        onClick={handlePrev}
                        disabled={filteredProjects.length <= 1}
                        className="p-2.5 rounded-xl bg-slate-950/80 backdrop-blur-md hover:bg-cyan-500/20 text-white border border-white/20 hover:border-cyan-500/40 disabled:opacity-40 transition-colors"
                        title="Previous Project"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleNext}
                        disabled={filteredProjects.length <= 1}
                        className="p-2.5 rounded-xl bg-slate-950/80 backdrop-blur-md hover:bg-cyan-500/20 text-white border border-white/20 hover:border-cyan-500/40 disabled:opacity-40 transition-colors"
                        title="Next Project"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Right Content Specs Panel (Uniform Height Layout) */}
                  <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between h-full space-y-4 overflow-hidden">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400">
                        <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span className="truncate">{currentProject.tagline}</span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight line-clamp-1">
                        {currentProject.title}
                      </h3>

                      <p className="text-slate-300 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                        {currentProject.summary}
                      </p>
                    </div>

                    {/* Key Metrics Breakdown (Uniform Slot Height) */}
                    <div className="h-16 flex items-center">
                      {(() => {
                        const displayMetrics = (currentProject.key_metrics || []).filter(
                          (m) => !['stars', 'forks', 'open issues'].includes(m.label.toLowerCase())
                        );
                        if (displayMetrics.length === 0) {
                          return (
                            <div className="w-full py-2.5 px-4 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                              <span>Architecture Verified</span>
                              <span className="text-cyan-400 font-bold">100% Production Ready</span>
                            </div>
                          );
                        }
                        return (
                          <div className="w-full grid grid-cols-3 gap-2 py-2 px-3 bg-white/5 rounded-2xl border border-white/10">
                            {displayMetrics.slice(0, 3).map((metric, idx) => (
                              <div key={idx} className="text-center">
                                <span className="block text-xs sm:text-sm font-extrabold font-mono text-cyan-300 truncate">
                                  {metric.value}
                                </span>
                                <span className="block text-[10px] text-slate-400 truncate">
                                  {metric.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        );
                      })()}
                    </div>

                    {/* Tech Stack Chips */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                        ARCHITECTURE & TECH STACK
                      </span>
                      <div className="flex flex-wrap gap-1.5 h-12 overflow-hidden">
                        {currentProject.tech_stack.slice(0, 5).map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-slate-200"
                          >
                            {tech}
                          </span>
                        ))}
                        {currentProject.tech_stack.length > 5 && (
                          <span className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-slate-400">
                            +{currentProject.tech_stack.length - 5}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action CTA Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-white/10">
                      <button
                        onClick={() => setActiveProject(currentProject)}
                        className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-mono text-xs font-semibold flex items-center space-x-2 shadow-neon-cyan hover:brightness-110 transition-all transform hover:-translate-y-0.5"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Inspect Architecture & Specs</span>
                      </button>

                      {currentProject.github_url && (
                        <a
                          href={currentProject.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-mono font-medium flex items-center space-x-1.5 transition-colors"
                        >
                          <Github className="w-3.5 h-3.5 text-slate-300" />
                          <span>Source</span>
                          <ExternalLink className="w-3 h-3 text-slate-400" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* 🖥️ macOS Interactive Floating Dock Bar */}
            <div className="pt-4 flex flex-col items-center justify-center space-y-2">
              <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 mb-1 select-none">
                <span>PROJECT DOCK</span>
                <span className="text-slate-600">•</span>
                <span className="text-cyan-400">
                  {selectedIndex + 1} of {filteredProjects.length} docked
                </span>
              </div>

              {/* Floating Dock Container */}
              <div className="glass-panel px-4 py-3 rounded-3xl border border-white/15 flex items-center space-x-2 sm:space-x-3 shadow-2xl relative backdrop-blur-2xl">
                {filteredProjects.map((project, idx) => {
                  const { icon: Icon, accent, border, glow } = getProjectIcon(project);
                  const isSelected = selectedIndex === idx;
                  const isHovered = hoveredDockIndex === idx;

                  // macOS magnification scale math
                  let scale = 1;
                  if (hoveredDockIndex !== null) {
                    const distance = Math.abs(hoveredDockIndex - idx);
                    if (distance === 0) scale = 1.35;
                    else if (distance === 1) scale = 1.15;
                  } else if (isSelected) {
                    scale = 1.12;
                  }

                  return (
                    <div
                      key={project.id || project.slug}
                      className="relative group flex flex-col items-center"
                    >
                      {/* Hover Tooltip Label */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 5, scale: 0.9 }}
                            className="absolute -top-11 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-xl bg-slate-950/90 backdrop-blur-md text-white border border-white/20 text-[11px] font-mono shadow-xl pointer-events-none z-30"
                          >
                            <span className="text-cyan-400 font-bold">{project.title}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Dock Icon Button */}
                      <button
                        onClick={() => setSelectedIndex(idx)}
                        onMouseEnter={() => setHoveredDockIndex(idx)}
                        onMouseLeave={() => setHoveredDockIndex(null)}
                        style={{ transform: `scale(${scale})` }}
                        className={`w-11 h-11 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center transition-all duration-200 relative ${
                          isSelected
                            ? `bg-gradient-to-br ${accent} text-white border ${border} ${glow}`
                            : 'bg-slate-900/90 text-slate-300 border border-white/10 hover:border-white/30 hover:bg-slate-800/90'
                        }`}
                        aria-label={project.title}
                      >
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />

                        {/* Active Dock Pulse Glow */}
                        {isSelected && (
                          <span className="absolute inset-0 rounded-2xl bg-white/20 animate-ping opacity-25" />
                        )}
                      </button>

                      {/* macOS Active LED Indicator Dot */}
                      <div className="h-2 flex items-center justify-center mt-1">
                        {isSelected ? (
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-neon-cyan animate-pulse" />
                        ) : (
                          <span className="w-1 h-1 rounded-full bg-white/10 group-hover:bg-white/40 transition-colors" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="glass-panel p-12 rounded-3xl text-center space-y-3 border border-white/10">
            <p className="text-slate-300 text-sm font-mono">No engineering projects found matching your search.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setSelectedIndex(0);
              }}
              className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-mono"
            >
              Reset Search Filters
            </button>
          </div>
        )}

        {/* Detailed Modal */}
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      </div>
    </section>
  );
}
